import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../ui/CommonSection'
import NftCard from '../ui/NftCard'
import {NFT__DATA} from '../../testdata/data'
import '../../style/market.css'

const Market = () => {

const [data, setData] = useState(NFT__DATA)

const handleCategory = (input) => {
  const filteredData = NFT__DATA.filter(item => item.category === input)
  setData(filteredData)
}

  return <>
  <CommonSection title={'MarketPlace'}/>
  <section className='main__section'>
    <Container>
      <Row>
        <Col lg='12' className='categories'>
          <div className="market__product__filter d-flex align-items-center justify-content-between">
            <div className="filter__left align-items-center gap-5">
              <div className="all__category__filter">
                <select onChange={(input) => {handleCategory(input.target.value)}}>
                  <option value="">All Categories</option>
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
          data.map((item) => (
              <Col lg='3' md='4' sm='6'>
                  <NftCard key={item.id} item={item} />
              </Col>
          ))
        }
      </Row>
    </Container>
  </section>
  </>
}

export default Market