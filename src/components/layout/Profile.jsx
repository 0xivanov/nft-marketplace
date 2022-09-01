import React, { useEffect, useState } from 'react'
import CommonSection from '../ui/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../style/profile.css'
import metamask from '../../public/img/metamask.svg'
import phantom from '../../public/img/phantom.svg'
import coinbase from '../../public/img/coinbase.webp'
import ProfileCard from '../ui/ProfileCard';
import Loader from '../ui/Loader';
import NftCard from '../ui/NftCard';
import { ethers } from "ethers"
import axios from 'axios'
import NFT from '../../abis/NFT.json'
import NFTMarket from '../../abis/NFTMarket.json'

const Profile = ({ provider, profile, isPending, token, connectAccount }) => {


  const [nftData, setnftData] = useState(null)
  const [isDataPending, setIsDataPending] = useState(true)

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
    let nfts = await marketContract.fetchMyNFTs()

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

  useEffect(() => {
    (async () => {
      console.log(provider)
      if (provider) {
        const nfts = await getNfts()
        setnftData(nfts)
        setIsDataPending(false)
      }
    })()
  }, [provider])

  return <>
    {!token && <><CommonSection title='Profile' />
      <section>
        <Col lg='12' className='mb-5 text-center'>
          <h2 className="w-50 m-auto">Connect your wallet.</h2>
          <p>If you don't have a wallet yet, you can select a provider and create one now.</p>
        </Col>
        <Container>
          <div className='wrapper'>
            <Row>
              <div className="connect ">
                <button className="btn" onClick={() => { connectAccount() }}>
                  <Row>
                    <Col className='d-flex gap-3'><img className='icon' src={metamask}></img>Metamask</Col>
                    <Col xs='3' className='popular'>Popular</Col>
                  </Row>
                </button>
              </div>
              <div className="connect">
                <button className="btn">
                  <Row>
                    <Col className='d-flex gap-3'><img className='icon' src={phantom}></img>Phantom</Col>
                    <Col xs='3' className='solana'>Solana</Col>
                  </Row>
                </button>
              </div>
              <div className="connect ">
                <button className="btn">
                  <div className='d-flex gap-3'><img className='icon' src={coinbase}></img>Coinbase</div>
                </button>
              </div>
            </Row>
          </div>
        </Container>
      </section></>}

    {token && <><CommonSection title='Profile' />
      <section>
        <Container>
          <Row>
            <Col lg='5' mb='4' ms='6'>
              {profile && <ProfileCard profile={profile} isInCreation={false} />}
              {isPending && <Loader />}
            </Col>
          </Row>
          <Row>
            <Col lg='12' className='mb-4'>
              <div className="live__auction d-flex align-items-center justify-content-between">
                <h3>Your NFTS</h3>
                <span><Link to='/market'>Explore more</Link></span>
              </div>
            </Col>
            {isDataPending && <Loader />}
            {
              nftData && profile && nftData.map((nft) => (
                nft && <Col key={nft.tokenId} lg='3' md='4' sm='6'><NftCard token={token} showLink={true} nft={nft} /></Col>
              ))
            }
          </Row>
        </Container>
      </section></>}
  </>

}

Profile.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Profile