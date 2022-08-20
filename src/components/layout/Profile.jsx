import React, { useState } from 'react'
import CommonSection from '../ui/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types';
import '../../style/profile.css'
import metamask from '../../img/metamask.svg'
import phantom from '../../img/phantom.svg'
import coinbase from '../../img/coinbase.webp'
import {Link} from 'react-router-dom'
import Modal from '../ui/Modal';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardLink , MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const Profile = ({token, connectAccount, user}) => {

  const [showModal, setShowModal] = useState(false)

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
    <MDBContainer className="h-100">
        <MDBRow className="h-100">
          <MDBCol lg="6" className="mb-2 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px'}} fluid />
                    <div className="edit__profile">
                      <button className="btn " onClick={() => {setShowModal(true)}}>
                          <i class="ri-edit-2-line"></i>
                          Edit
                      </button>

                      {showModal && <Modal setShowModal={setShowModal} />}
                  </div>
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBRow size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBRow>
                      <MDBRow size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBRow>
                    </MDBRow>
                    <div className="social__links__user d-flex gap-3">
                      <span><Link to='#'><i class="ri-facebook-circle-fill"></i></Link></span>
                      <span><Link to='#'><i class="ri-instagram-line"></i></Link></span>
                      <span><Link to='#'><i class="ri-twitter-line"></i></Link></span>
                    </div>
                    </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section></>}
  </>
  
}

Profile.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Profile