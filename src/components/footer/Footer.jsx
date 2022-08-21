import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'


const MY_ACCOUNT = [
  {
    display: 'Author Profile',
    url: '/seller'
  },
  {
    display: 'Create Item',
    url: '/create'
  },
  {
    display: 'Collection',
    url: '/market'
  },
  {
    display: 'Edit Profile',
    url: '/profile'
  }
]

const RESOURCES = [
  {
    display: 'Help Center',
    url: '#'
  },
  {
    display: 'Partners',
    url: '#'
  },
  {
    display: 'Community',
    url: '#'
  }
]

const COMPANY = [
  {
    display: 'About',
    url: '#'
  },
  {
    display: 'Career',
    url: '#'
  },
  {
    display: 'Contact us',
    url: '#'
  }
]

const Footer = () => {
  return (
    <footer className="footer">
        <Container>
          <Row>
            <Col lg='3' md='6' sm='6'>
            <div className="logo">
              <h2 className='d-flex gap-2 align-items-center'>
                  <span><i className="ri-fire-line"></i></span>
                  NFTs
              </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui assumenda quibusdam provident saepe error, dolorum alias rem. Quibusdam, eius perferendis.</p>
            </div>
            </Col>
            <Col lg='2' md='6' sm='6'>
              <h5>My account</h5>
              <ListGroup className='list__group'>
                {
                  MY_ACCOUNT.map((item, index) => (
                    <ListGroupItem key={index} className='list__item'>
                      <Link to={item.url}>{item.display}</Link>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </Col>
            <Col lg='2' md='6' sm='6'>
            <h5>Resources</h5>
              <ListGroup className='list__group'>
                {
                  RESOURCES.map((item, index) => (
                    <ListGroupItem key={index} className='list__item'>
                      <Link to={item.url}>{item.display}</Link>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </Col>
            <Col lg='2' md='6' sm='6'>
            <h5>Company</h5>
              <ListGroup className='list__group'>
                {
                  COMPANY.map((item, index) => (
                    <ListGroupItem key={index} className='list__item'>
                      <Link to={item.url}>{item.display}</Link>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </Col>
            <Col lg='3' md='6' sm='6'>
              <h5>Newsletter</h5>
              <input type="text" className="newsletter" placeholder='Email'/>
              <div className="social__links d-flex gap-3">
                <span><Link to='#'><i className="ri-facebook-circle-fill"></i></Link></span>
                <span><Link to='#'><i className="ri-instagram-line"></i></Link></span>
                <span><Link to='#'><i className="ri-twitter-line"></i></Link></span>
              </div>
            </Col>
            <Col lg='12' className='mt-4 text-center'>
              <p className="copyright">Copyrights 2022, Developed by Ivan Ivanov. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer