import React from 'react'
import CommonSection from '../ui/CommonSection'
import { Container, Row, Col } from 'reactstrap'

const Profile = () => {
  return <>
    <CommonSection title='Profile'/>
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5 text-center'>
            <div className="w-50 m-auto"></div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, dolores!</p>
          </Col>
        </Row>
      </Container>
    </section>
  </>
}

export default Profile