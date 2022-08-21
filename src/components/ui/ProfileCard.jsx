import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody , MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import './profile-card.css'

const ProfileCard = (props) => {
    
    const {_id, name, proficiency, email, facebook, instagram, twitter, img, imgUrl, imgFormat} = props.profile
    const navigate = useNavigate()
    const [_img, _setImg] = useState()
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        console.log(props.profile)
        if(name === 'Marie Horwitz') setIsPending(false)
        if(img === null) return
        var base64String = btoa(
            new Uint8Array(img.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        _setImg(base64String)
        setIsPending(false)
    }, [])
  return (
    <MDBContainer className="h-100 profile__card">
        <MDBRow className="h-100">
          <MDBCol>
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  
                  {props.isInCreation && <MDBCardImage src={imgUrl} alt="Avatar" className="my-1" style={{ width: '80px'}} fluid />}
                  {!props.isInCreation && <MDBCardImage src={`data:${imgFormat};base64,${_img}`} alt="Avatar" className="my-1" style={{ width: '80px'}} fluid />}
                {!props.isInCreation && <div className="edit__profile">
                    <button className="btn " disabled={props.isInCreation} onClick={() => {navigate("/profile/edit")}}>
                        <i className="ri-edit-2-line"></i>
                        Edit
                    </button>
                </div>}
                  <MDBTypography tag="h5">{name}</MDBTypography>
                  <MDBCardText>{proficiency}</MDBCardText>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBRow size="6" className="mb-3">
                        <MDBTypography tag="h6">sdf</MDBTypography>
                        <MDBCardText className="text-muted">{email}</MDBCardText>
                      </MDBRow>
                    </MDBRow>
                    <div className="social__links__user d-flex gap-3">
                      <span><Link to={facebook}><i className="ri-facebook-circle-fill"></i></Link></span>
                      <span><Link to={instagram}><i className="ri-instagram-line"></i></Link></span>
                      <span><Link to={twitter}><i className="ri-twitter-line"></i></Link></span>
                    </div>
                    </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
  )
}

export default ProfileCard