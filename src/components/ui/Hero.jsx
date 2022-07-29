import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import './hero.css'
import heroImg from '../../img/hero.jpg'

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
                        <button className='btn explore__btn d-flex align-items-center gap-2'>
                            <i class="ri-rocket-line"></i>
                            <Link to='/market'>Explore</Link>
                        </button>
                        <button className='btn create__btn d-flex align-items-center gap-2'>
                            <i class="ri-ball-pen-line"></i>
                            <Link to='/create'>Create</Link>
                        </button>
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