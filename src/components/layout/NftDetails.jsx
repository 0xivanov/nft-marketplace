import React, { useEffect, useState, useRef } from 'react'
import CommonSeciton from '../ui/CommonSection'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import '../../style/nft-details.css'
import LiveAuction from '../ui/LiveAuction'
import '../ui/live-auction.css'
import Modal from '../ui/Modal'
import Loader from '../ui/Loader'
import axios from 'axios'
import { ethers } from "ethers"
import NFT from '../../abis/NFT.json'
import Auction from '../../abis/Auction.json'
import AuctionFactory from '../../abis/AuctionFactory.json'

const NftDetails = ({provider, token}) => {
  
  const { tokenId } = useParams()

  const likeRef = useRef(null);
  const toggleLike = () => likeRef.current.classList.toggle('liked')
  
  const [singleNft, setSingleNft] = useState()
  const [showModal, setShowModal] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      if(provider) {
        const nfts = await getNfts()
        setSingleNft(nfts.filter(nft => {return nft.tokenId == tokenId})[0])
        setIsPending(false)
      }
    })()
  }, [provider])

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

  const getNfts = async () => {
    const [auctionContract, nftContract, auctionFactoryContract] = await loadContracts()

    const response = await fetch('/market', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await response.json();
    let index = 0

    let nfts = []
    let addresses = await auctionFactoryContract.getSellerAddresses();
    let uniqueAddresses = [...new Set(addresses)];
    for (const address of uniqueAddresses) {
      let clones = await auctionFactoryContract.getAuctions(address)
      console.log(address, clones)
      for (const clone of clones) {
        const Proxy = new ethers.ContractFactory(Auction.abi, Auction.bytecode, provider.getSigner())
        let auctionClone = await Proxy.attach(clone)

        let nftAddress = await auctionClone.nft()
        let nftId = await auctionClone.nftId()
        let highestBid = await auctionClone.highestBid()
        let highestBidder = await auctionClone.highestBidder()
        let seller = await auctionClone.seller()
        let expireAt = await auctionClone.expireAt()
        let tokenURI = await nftContract.tokenURI(nftId)
        const meta = await axios.get(tokenURI)
        let { sellerName, category } = data[index]

        nfts.push({
          sellerName,
          category,
          expirationDate: expireAt,
          currentBid: ethers.utils.formatUnits(highestBid, 'ether'),
          tokenId: nftId.toNumber(),
          seller,
          image: meta.data.image,
          title: meta.data.title,
          description: meta.data.description
        })
        console.log("sdf")
      }
    }

    console.log(nfts)
    return nfts
  }

  const like = async () => {
    try {
      var updatedItem = singleNft
      if(isLiked) {
        await fetch(`/market/${encodeURIComponent(tokenId)}`, {
          method: 'post',
          body: JSON.stringify({isLiked: true}),
          headers: {'Content-Type': 'application/json'}
        });
        setIsLiked(false)
        updatedItem.likes--
        setSingleNft(item => ({...item, ...updatedItem}))
      } else {
        await fetch(`/market/${encodeURIComponent(tokenId)}`, {
          method: 'post',
          body: JSON.stringify({isLiked: false}),
          headers: {'Content-Type': 'application/json'}
        });
        setIsLiked(true)
        updatedItem.likes++
        setSingleNft(item => ({...item, ...updatedItem}))
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return <>
  {isPending && <>
    <CommonSeciton />
    <section>
      <Loader />
    </section>
  </>}
  {singleNft && <>
    <CommonSeciton />
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='6'>
            <img src={singleNft.image} alt="" className='w-100 single__nft-img' />
          </Col>
          <Col lg='6'>
            <div className="single__nft__content">
              <h2>{singleNft.title}</h2>
  
              <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                <div className="d-flex align-items-center gap-5 single__nft-like">
                  <span><i ref={likeRef} onClick={() => {
                    like()
                    toggleLike()
                  }} className="ri-heart-line"></i>{singleNft.likes}</span>
                </div>
              </div>
  
              <div className="nft__creator  d-flex gap-5">
                <div className="creator__detail">
                  <p>Created By</p>
                  <h6>{singleNft.creator}</h6>
                </div>
              </div>
              <p className='my-4'>{singleNft.description}</p>
              <div className="bid__btn d-flex align-items-center justify-content-between">
              <button className="btn d-flex align-items-center gap-2" onClick={() => {
                if(!token) navigate('/profile')
                else setShowModal(true)
              }}>
                  <i className="ri-shopping-bag-line"></i>
                  Place Bid
              </button>
              {showModal && <Modal setShowModal={setShowModal} />}
          </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <LiveAuction provider={provider} />
  </>
  }
</>
}

export default NftDetails