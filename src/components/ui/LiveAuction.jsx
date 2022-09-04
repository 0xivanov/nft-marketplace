import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import './live-auction.css'
import NftCard from './NftCard'
import Loader from './Loader'
import axios from 'axios'
import { ethers } from "ethers"
import NFT from '../../abis/NFT.json'
import Auction from '../../abis/Auction.json'
import AuctionFactory from '../../abis/AuctionFactory.json'

const LiveAuction = ({ provider }) => {

  const [nfts, setnfts] = useState(null)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    (async () => {
      console.log(provider)
      if (provider) {
        const nfts = await getNfts()
        setnfts(nfts)
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

  return <>
    {isPending && <section>
      <Container>
        <Loader />
      </Container>
    </section>}
    {nfts && <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-4'>
            <div className="live__auction d-flex align-items-center justify-content-between">
              <h3>Live auction</h3>
              <span><Link to='/market'>Explore more</Link></span>
            </div>
          </Col>
          {
            nfts.slice(0, 4).map((nft) => (
              nft && <Col key={nft.tokenId} lg='3' md='4' sm='6'><NftCard showLink={true} nft={nft} /></Col>
            ))
          }
        </Row>
      </Container>
    </section>
    }
  </>
}

export default LiveAuction