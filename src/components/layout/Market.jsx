import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../ui/CommonSection'
import NftCard from '../ui/NftCard'
import '../../style/market.css'
import Loader from '../ui/Loader'
import { ethers } from "ethers"
import axios from 'axios'
import NFT from '../../abis/NFT.json'
import NFTMarket from '../../abis/NFTMarket.json'

const Market = ({ provider, token }) => {

  const [nftData, setnftData] = useState(null)
  const [filteredData, setfilteredData] = useState(null)
  const [isPending, setIsPending] = useState(true)


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
      console.log(tokenURI)
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

    console.log(nfts)
    return nfts
  }

  const buyNft = async (nft) => {
    const [marketContract, nftContract] = await loadContracts()
    let price = ethers.utils.formatUnits(nft.price, 'ether')
    const transaction = await marketContract.createMarketSale(nftContract.address, nft.tokenId, { value: price })
    await transaction.wait()
    getNfts()
  }

  useEffect(() => {
    (async () => {
      if (provider) {
        const nfts = await getNfts()
        setnftData(nfts)
        setfilteredData(nfts)
        setIsPending(false)
      }
    })()
  }, [provider])

  return <>
    {isPending && <>
      <CommonSection title={'MarketPlace'} />
      <section className='main__section'>
        <Container>
          <Loader />
        </Container>
      </section>
    </>}
    {nftData && <>
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
                nft && <Col key={nft.tokenId} lg='3' md='4' sm='6'><NftCard token={token} showLink={true} nft={nft} /></Col>
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