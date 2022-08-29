import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import './live-auction.css'
import NftCard from './NftCard'
import Loader from './Loader'
import NFT from '../../abis/NFT.json'
import NFTMarket from '../../abis/NFTMarket.json'
import axios from 'axios'
import { ethers } from "ethers"

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
    const marketNetworkData = NFTMarket.networks[networkId.chainId]
    const nftNetworkData = NFT.networks[networkId.chainId]
    if (marketNetworkData && nftNetworkData) {
      // Assign contract
      const signer = provider.getSigner()
      return [new ethers.Contract(marketNetworkData.address, NFTMarket.abi, signer), new ethers.Contract(nftNetworkData.address, NFT.abi, signer)]
    } else {
      window.alert('NFTMarket contract not deployed to detected network.')
    }
  }

  const getNfts = async () => {
    const [marketContract, nftContract] = await loadContracts()
    let nfts = await marketContract.fetchMarketItems()

    const response = await fetch('/market', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await response.json();
    let index = 0
    nfts = await Promise.all(nfts.map(async (nft) => {
      let tokenURI = await nftContract.tokenURI(nft.tokenId)
      const meta = await axios.get(tokenURI)
      let price = ethers.utils.formatUnits(nft.price, 'ether')
      let { creator, currentBid, category, expirationDate } = data[index]
      index++
      return {
        creator,
        category,
        expirationDate,
        currentBid,
        tokenId: nft.tokenId.toNumber(),
        price,
        seller: nft.seller,
        owner: nft.owner,
        image: meta.data.image,
        title: meta.data.title,
        description: meta.data.description
      }
    }))
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