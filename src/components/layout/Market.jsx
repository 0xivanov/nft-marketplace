import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../ui/CommonSection'
import NftCard from '../ui/NftCard'
import '../../style/market.css'
import Loader from '../ui/Loader'

const Market = ({token}) => {
  
const [nftData, setnftData] = useState(null)
const [filteredData, setfilteredData] = useState(null)
const [isPending, setIsPending] = useState(true)

const handleCategory = (input) => {
  if(input === 'all') {
    setfilteredData(nftData)
  } else {
    const filteredData = nftData.filter(item => item.category === input)
    setfilteredData(filteredData)
  }
}

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
    setfilteredData(nfts)
    setIsPending(false)
  })
}, [])

  return <>
    {isPending && <>
    <CommonSection title={'MarketPlace'}/>
    <section className='main__section'>
      <Container>
        <Loader/>
      </Container>
    </section>
    </>}
    {nftData && <>
    <CommonSection title={'MarketPlace'}/>
    <section className='main__section'>
      <Container>
        <Row>
          <Col lg='12' className='categories'>
            <div className="market__product__filter d-flex align-items-center justify-content-between">
              <div className="filter__left align-items-center gap-5">
                <div className="all__category__filter">
                  <select onChange={(input) => {handleCategory(input.target.value)}}>
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
            filteredData.map((item) => (
              item && <Col key={item._id} lg='3' md='4' sm='6'><NftCard token={token} showLink={true} item={item} /></Col>
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