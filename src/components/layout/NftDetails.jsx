import React, { useEffect, useState } from 'react'
import CommonSeciton from '../ui/CommonSection'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import '../../style/nft-details.css'
import LiveAuction from '../ui/LiveAuction'
import '../ui/live-auction.css'
import Modal from '../ui/Modal'
import Loader from '../ui/Loader'

const NftDetails = () => {
  
  const { _id } = useParams()
  
  const [singleNft, setSingleNft] = useState()
  const [showModal, setShowModal] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const [_img, _setImg] = useState()

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
      let nft = nfts.find(item => item._id === _id)
      setSingleNft(nft)
      
      if(nft.img === null) return
      var base64String = btoa(
          new Uint8Array(nft.img.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      _setImg(base64String)
      setIsPending(false)
    })
  }, [])


  return <>
  {isPending && <>
    <CommonSeciton />
    <section>
      <Loader />
    </section>
  </>}
  {singleNft && <>
    <CommonSeciton />
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='6'>
            <img src={`data:${singleNft.imgFormat};base64,${_img}`} alt="" className='w-100 single__nft-img' />
          </Col>
          <Col lg='6'>
            <div className="single__nft__content">
              <h2>{singleNft.title}</h2>
  
              <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                <div className="d-flex align-items-center gap-5 single__nft-seen">
                  <span><i class="ri-eye-line"></i>123</span>
                  <span><i class="ri-heart-line"></i>312</span>
                </div>
              </div>
  
              <div className="nft__creator  d-flex gap-5">
                <div className="creator__detail">
                  <p>Created By</p>
                  <h6>{singleNft.creator}</h6>
                </div>
              </div>
              <p className='my-4'>{singleNft.desc}</p>
              <div className="bid__btn d-flex align-items-center justify-content-between">
              <button className="btn d-flex align-items-center gap-2" onClick={() => {setShowModal(true)}}>
                  <i class="ri-shopping-bag-line"></i>
                  Place Bid
              </button>
              {showModal && <Modal setShowModal={setShowModal} />}
          </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <LiveAuction />
  </>
  }
</>
}

export default NftDetails