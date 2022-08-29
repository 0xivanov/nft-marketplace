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

const Profile = ({profile, isPending, token, connectAccount}) => {

  
  const [nftData, setnftData] = useState(null)
  const [isNftPending, setIsNftPending] = useState(true)
  
  const getNfts = async () => {
    const response = await fetch('/market', {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    });
    
    let data = await response.json();
    return data
    }
    
  useEffect(() => {
    getNfts().then((nfts) => {
        setnftData(nfts)
        setIsNftPending(false)
    })
  }, [])

  return <>
    {!token && <><CommonSection title='Profile'/>
    <section>
    <Col lg='12' className='mb-5 text-center'>
            <h2 className="w-50 m-auto">Connect your wallet.</h2>
            <p>If you don't have a wallet yet, you can select a provider and create one now.</p>
      </Col>
      <Container>
      <div className='wrapper'>
        <Row>
          <div className="connect ">
            <button className="btn" onClick={() => {connectAccount()}}>
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

    {token && <><CommonSection title='Profile'/>
    <section>
      <Container>
      <Row>
        <Col lg='5' mb='4' ms='6'>
          {profile && <ProfileCard profile={profile} isInCreation={false}/>}
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
        {isNftPending && <Loader />}
        {
          nftData && profile && nftData.filter(nft => nft.owner == profile._id).map((nft) => (
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