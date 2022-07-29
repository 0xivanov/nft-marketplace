import React from 'react'
import './seller.css'
import { Container, Row, Col } from 'reactstrap'


const Seller = () => {
  return (
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <div className="seller__section-title">
                        <h3>Top seller</h3>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Seller