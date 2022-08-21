import React, { useEffect, useState } from 'react'
import CommonSection from '../ui/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types';
import '../../style/profile.css'
import metamask from '../../img/metamask.svg'
import phantom from '../../img/phantom.svg'
import coinbase from '../../img/coinbase.webp'
import ProfileCard from '../ui/ProfileCard';
import Loader from '../ui/Loader';

const Profile = ({token, connectAccount}) => {

  const [profile, setProfile] = useState()
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    if(token) {
      getProfile().then((profile) => {
        console.log(profile)
        setProfile(profile)
        setIsPending(false)
      })
    }
  }, [token])

  const getProfile = async () => {
    const response = await fetch('/profile', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token})
    });
  
    let data = await response.json();
    return data
  }

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
      {profile && <ProfileCard profile={profile} isInCreation={false}/>}
      {isPending && <Loader />}
    </section></>}
  </>
  
}

Profile.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Profile