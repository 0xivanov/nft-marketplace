import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../ui/CommonSection'
import NftCard from '../ui/NftCard'
import '../../style/market.css'
import Loader from '../ui/Loader'
import { ethers } from "ethers"
import axios from 'axios'
import NFT from '../../abis/NFT.json'
import Auction from '../../abis/Auction.json'
import AuctionFactory from '../../abis/AuctionFactory.json'

const Market = ({ profile, isPending, provider, token }) => {

  const [nftData, setnftData] = useState(null)
  const [filteredData, setfilteredData] = useState(null)
  const [isDataPending, setIsDataPending] = useState(true)
  const [balance, setBalance] = useState(0)

  const handleCategory = (input) => {
    if (input === 'all') {
      setfilteredData(nftData)
    } else {
      const filteredData = nftData.filter(nft => nft.category === input)
      setfilteredData(filteredData)
    }
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
        let { creator, category } = data[index]

        nfts.push({
          creator,
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

  const buyNft = async (nft) => {
    const [marketContract, nftContract] = await loadContracts()
    let price = ethers.utils.parseUnits(nft.price, 'ether')
    const transaction = await marketContract.createMarketSale(nftContract.address, nft.tokenId, { value: price })
    await transaction.wait()
    getNfts()
  }

  useEffect(() => {
    (async () => {
      if (provider) {
        const nfts = await getNfts()
        console.log(nfts.at(0))
        setnftData(nfts)
        setfilteredData(nfts)
        setIsDataPending(false)
      }
    })()
  }, [provider])

  useEffect(() => {
    (async () => {
      if (profile) {
        const balance = await provider.getBalance(profile.pubkey)
        const balanceInEther = ethers.utils.formatUnits(balance, 'ether')
        setBalance(balanceInEther)
      }
    })()
  }, [[profile]])


  return <>
    {isPending && isDataPending && <>
      <CommonSection title={'MarketPlace'} />
      <section className='main__section'>
        <Container>
          <Loader />
        </Container>
      </section>
    </>}
    {filteredData && <>
      <CommonSection title={'MarketPlace'} />
      <section className='main__section'>
        <Container>
          <Row>
            <Col lg='12' className='categories'>
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={(input) => { handleCategory(input.target.value) }}>
                      <option value="all">All Categories</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="collectable">Collectable</option>
                      <option value="domain">Domain</option>
                    </select>
                  </div>
                </div>
              </div>
            </Col>
            {
              filteredData.map((nft) => (
                <Col key={nft.tokenId} lg='3' md='4' sm='6'><NftCard balance={balance} profile={profile} buyNft={buyNft} token={token} showLink={true} nft={nft} /></Col>
              ))
            }
          </Row>
        </Container>
      </section>
    </>
    }
  </>
}

export default Market