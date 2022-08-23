import React from 'react'
import { useState, useEffect } from 'react'
import {Container, Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import './live-auction.css'
import NftCard from './NftCard'
import Loader from './Loader'

const LiveAuction = () => {


const [nftData, setnftData] = useState(null)
const [isPending, setIsPending] = useState(true)

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
        setIsPending(false)
    })
    }, [])

  return <>
      {isPending && <section>
        <Container>
            <Loader />
        </Container>
        </section>}
      {nftData && <section>
        <Container>
            <Row>
                <Col lg='12' className='mb-4'>
                    <div className="live__auction d-flex align-items-center justify-content-between">
                        <h3>Live auction</h3>
                        <span><Link to='/market'>Explore more</Link></span>
                    </div>
                </Col>
                {
                    nftData.slice(0,4).map((nft) => (
                        nft && <Col key={nft._id} lg='3' md='4' sm='6'><NftCard showLink={true} nft={nft} /></Col>
                    ))
                }
            </Row>
        </Container>
    </section>
    }
  </>
}

export default LiveAuction