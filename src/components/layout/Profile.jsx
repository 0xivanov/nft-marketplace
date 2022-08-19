import React, { useState } from 'react'
import CommonSection from '../ui/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types';
import '../../style/profile.css'
import metamask from '../../img/metamask.svg'

const Profile = ({setToken}) => {

  const [username, setUserName] = useState();
  const [publicKey, setPublicKey] = useState();

  return <>
    <CommonSection title='Profile'/>
    <section>
      <Container>
      <div className='wrapper'>
        <Row>

          <div className="connect ">
              <button className="btn">
                  <div className='d-flex gap-2 align-items-center'><img src={metamask}/>Connect
                  </div>
              </button>
          </div>
        </Row>
        </div>
      </Container>
    </section>
  </>
  
}

Profile.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Profile