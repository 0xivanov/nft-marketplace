import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../ui/CommonSection'
import NftCard from '../ui/NftCard'
import '../../style/market.css'

const Market = () => {
  
const [data, setData] = useState(null)
const [isPending, setIsPending] = useState(true)

const handleCategory = (input) => {
  const filteredData = data.filter(item => item.category === input)
  setData(filteredData)
}

useEffect(() => {
  (async () => {
    const response = await fetch('/market', {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    });
  
    const data = await response.json();
    setData(data)
    setIsPending(false)
  })()
},[])

  return <>
    {isPending && <div>Loading</div>}
    {data && <>
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
              item && <Col lg='3' md='4' sm='6'><NftCard key={item.id} item={item} /></Col>
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