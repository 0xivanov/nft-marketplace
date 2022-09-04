import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import CommonSection from '../ui/CommonSection'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Loader from '../ui/Loader';
import NftCard from '../ui/NftCard'
import '../../style/create-nft.css'
import '../ui/live-auction.css'
import NFT from '../../abis/NFT.json'
import Auction from '../../abis/Auction.json'
import AuctionFactory from '../../abis/AuctionFactory.json'

const Create = ({ provider, profile, isPending }) => {

  const navigate = useNavigate()
  const client = ipfsHttpClient({ host: 'localhost', port: '5001', protocol: 'http' })

  const [nft, setNft] = useState({
    title: "Travel Monkey Club",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    creator: "",
    currentBid: 4.89,
    category: 'art',
    expirationDate: new Date(),
    imgIpfsUrl: null,
    img: null,
    file: null
  })


  useEffect(() => {
    if (profile != null) nft.creator = profile.name
  }, [profile])

  const onImageChange = async (event) => {
    try {
      const file = event.target.files[0]
      nft.file = file
      nft.imgUrl = URL.createObjectURL(file)
    } catch (e) {
      console.log(e)
    }
    console.log(nft)
  }

  const loadContracts = async () => {
    const networkId = await provider.getNetwork()
    console.log(networkId)
    const auctionNetworkData = Auction.networks[networkId.chainId]
    const auctionFactoryData = AuctionFactory.networks[networkId.chainId]
    const nftNetworkData = NFT.networks[networkId.chainId]
    if (auctionNetworkData && nftNetworkData && auctionFactoryData) {
      const signer = provider.getSigner()
      return [new ethers.Contract(auctionNetworkData.address, Auction.abi, signer), 
          new ethers.Contract(nftNetworkData.address, NFT.abi, signer), 
          new ethers.Contract(auctionFactoryData.address, AuctionFactory.abi, signer)]
    } else {
      window.alert('contracts not deployed to detected network.')
    }
  }

  const createItem = async () => {

    const { title, description, currentBid, imgIpfsUrl } = nft
    const data = JSON.stringify({
      title, description, image: imgIpfsUrl
    })
    
    try {
      const result = await client.add(data)
      const url = `http://localhost:8080/ipfs/${result.cid.toV1().toString()}`

      const [auctionContract, nftContract, auctionFactoryContract] = await loadContracts()

      const startingBid = ethers.utils.parseUnits(currentBid.toString(), 'ether')

      //create clone auction address
      let createAuctionClone = await auctionFactoryContract.createAuction(startingBid)
      let tx = await createAuctionClone.wait()
      let cloneAddress = tx.events[0].args.auction //get clone address

      //mint nft
      let mint = await nftContract.mint(url, cloneAddress)
      tx = await mint.wait()
      //extract event data
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()

      //create proxy from clone address
      const Proxy = new ethers.ContractFactory(Auction.abi, Auction.bytecode, provider.getSigner())
      let auctionClone = await Proxy.attach(cloneAddress)

      let startAuction = await auctionClone.start(nftContract.address, tokenId)
      tx = await startAuction.wait()
    } catch (e) {
      console.log(e)
    }

    try {
      const response = await fetch('/create', {
        method: 'post',
        body: JSON.stringify(nft),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json()
      console.log(data);
      navigate('/market')
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    {isPending && <>
      <CommonSection title='Create nft' />
      <Loader />
    </>}
    {!isPending && <>
      <CommonSection title='Create nft' />
      <section>
        <Container>
          <Row>
            <Col lg='4' mb='4' ms='6'>
              <h5 className='mb-4 text-light'>Preview nft</h5>
              <NftCard className='preview__card' nft={nft} isInCreation={true} />
            </Col>
            <Col>
              <div className="create__nft">
                <form action="">
                  <div className="form__input w-50">
                    <label>Title</label>
                    <input type="text" placeholder='Title' className='upload__input' onChange={input => nft.title = input.target.value} />
                  </div>

                  <div className="form__input w-50">
                    <label>Category</label>
                    <select className='w-100' onChange={input => nft.category = input.target.value}>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="collectable">Collectable</option>
                      <option value="domain">Domain</option>
                    </select>
                  </div>

                  <div className="form__input w-50">
                    <label>Description</label>
                    <textarea name='' id='' cols='30' rows='10' placeholder='Enter description' className='w-100' onChange={input => nft.desc = input.target.value} />
                  </div>

                  <div className="form__input w-50">
                    <label>Upload File</label>
                    <input type="file" className='upload__input' onChange={onImageChange} />
                  </div>

                  <div className="form__input w-50">
                    <label>Minimum Bid</label>
                    <input type="number" placeholder='Enter minimum bid' className='upload__input' onChange={input => nft.currentBid = input.target.value} />
                  </div>

                  <div className="d-flex align-nfts-center justify-content-between">
                    <div className="form__input w-50">
                      <label>Expiration Date</label>
                      <input type="date" className='upload__input' onKeyDown={(e) => e.preventDefault()} min={new Date().toLocaleDateString('en-ca')} max={new Date(Date.now() + 10 * 86400000).toLocaleDateString('en-ca')} onChange={input => nft.expirationDate = new Date(input.target.value)} />
                    </div>
                  </div>

                  <div className="form__input w-50 d-flex align-nfts-center justify-content-between">
                    <div className="bid__btn">
                      <button type='button' className="btn d-flex align-nfts-center gap-2" onClick={async () => {
                        nft.creator = profile.name
                        try {
                          const result = await client.add(nft.file)
                          nft.imgIpfsUrl = `http://localhost:8080/ipfs/${result.cid.toV1().toString()}`
                        } catch (e) {
                          console.log(e)
                        }
                        let updatednft = nft
                        setNft(nft => ({ ...nft, ...updatednft }))
                        window.scrollTo(0, 0)
                      }}>
                        <i className="ri-search-eye-line"></i>
                        Preview
                      </button>
                    </div>
                    <div className="bid__btn">
                      <button type='button' className="btn d-flex align-nfts-center gap-2" onClick={() => {
                        createItem()
                      }}>
                        <i className="ri-building-3-line"></i>
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>}

  </>
}

export default Create