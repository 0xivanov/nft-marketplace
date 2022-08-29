import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import './hero.css'
import heroImg from '../../public/img/hero.jpg'

const Hero = () => {
  return (
    <section className="hero">
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero__content">
              <h2>Discover rare digital art and collect <span>extraordinary</span> NFTs</h2>
              <p>Lorem  ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, placeat.</p>
              <div className="hero__btns d-flex align-items-center gap-4">
                <Link className='btn' to='/market'>
                  <div className='explore__btn d-flex align-items-center gap-2'>
                    <i className="ri-rocket-line"></i>
                    <div>Explore</div>
                  </div>
                </Link>

                <Link className='btn' to='/create'>
                  <div className='create__btn d-flex align-items-center gap-2'>
                    <i className="ri-ball-pen-line"></i>
                    Create
                  </div>
                </Link>
              </div>
            </div>
          </Col>

          <Col lg='6' md='6'>
            <div className="hero__image">
              <img src={heroImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero