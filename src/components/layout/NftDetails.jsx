import React, { useState } from 'react'
import CommonSeciton from '../ui/CommonSection'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import '../../style/nft-details.css'
import LiveAuction from '../ui/LiveAuction'
import '../ui/live-auction.css'
import Modal from '../ui/Modal'

const NftDetails = () => {

  return <div>
    sd;lkfj
  </div>
  
  // const { id } = useParams()

  // const singleNft = NFT__DATA.find(item => item.id === id)
  
  // const [showModal, setShowModal] = useState(false)

  // return <>
  // <CommonSeciton />
  // <section>
  //   <Container>
  //     <Row>
  //       <Col lg='6' md='6' sm='6'>
  //         <img src={singleNft.imgUrl} alt="" className='w-100 single__nft-img' />
  //       </Col>
  //       <Col lg='6'>
  //         <div className="single__nft__content">
  //           <h2>{singleNft.title}</h2>

  //           <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
  //             <div className="d-flex align-items-center gap-5 single__nft-seen">
  //               <span><i class="ri-eye-line"></i>123</span>
  //               <span><i class="ri-heart-line"></i>312</span>
  //             </div>
  //           </div>

  //           <div className="nft__creator  d-flex gap-5">
  //             <div className="creator__img">
  //               <img src={singleNft.creatorImg} alt="creator" className='w-100' />
  //             </div>
  //             <div className="creator__detail">
  //               <p>Created By</p>
  //               <h6>{singleNft.creator}</h6>
  //             </div>
  //           </div>
  //           <p className='my-4'>{singleNft.desc}</p>
  //           <div className="bid__btn d-flex align-items-center justify-content-between">
  //           <button className="btn d-flex align-items-center gap-2" onClick={() => {setShowModal(true)}}>
  //               <i class="ri-shopping-bag-line"></i>
  //               Place Bid
  //           </button>
  //           {showModal && <Modal setShowModal={setShowModal} />}
  //       </div>
  //         </div>
  //       </Col>
  //     </Row>
  //   </Container>
  // </section>

  // <LiveAuction />
  // </>
}

export default NftDetails