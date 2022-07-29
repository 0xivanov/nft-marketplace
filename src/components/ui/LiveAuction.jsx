import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import './live-auction.css'
import NftCard from './NftCard'
import { NFT__DATA } from '../../testdata/data.js'

const LiveAuction = () => {
  return (
    <section>
        <Container>
            <Row>
                <Col lg='12' className='mb-4'>
                    <div className="live__auction d-flex align-items-center justify-content-between">
                        <h3>Live auction</h3>
                        <span><Link to='/market'>Explore more</Link></span>
                    </div>
                </Col>
                {
                    NFT__DATA.slice(0,4).map((item) => (
                        <Col lg='3'>
                            <NftCard key={item.id} item={item} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </section>
  )
}

export default LiveAuction