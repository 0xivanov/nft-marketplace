import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from './Modal'


const NftCard = (props) => {

  const { tokenId, title, currentBid, expirationDate, image, imgUrl, sellerName } = props.nft
  const [showModal, setShowModal] = useState(false)
  const [_img, _setImg] = useState()
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const timeLeft = (strDate) => {
    const dt = new Date(strDate * 1000);
    const now = new Date()
    return Math.round((dt - now) / 36e5);
  }

  return <>
    {isPending && <div>Loading</div>}
    {!isPending && <div className="single__nft__card">
      <div className="nft__img">
        {!props.showLink && <img src={imgUrl} alt="" className='w-100' />}
        {props.showLink && <img src={image} alt="" className='w-100' />}
      </div>
      <div className="nft__content">
        <h5 className="nft__title">
          {props.showLink && <Link to={`/market/${tokenId}`}>{title}</Link>}
          {!props.showLink && <div>{title}</div>}
        </h5>
        <div className="creator__info__wrapper d-flex gap-3">
          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{sellerName}</p>
            </div>
            <div>
              <h6>Expiration time</h6>
              <p>{`Time Left: ${timeLeft(expirationDate)} hours`}</p>
            </div>
            <div>
              <h6>Current Bid</h6>
              <p>{currentBid} ETH</p>
            </div>
          </div>
        </div>
        <div className="bid__btn d-flex align-items-center justify-content-between">
          <button disabled={props.isInCreation} className="btn d-flex align-items-center gap-2" onClick={() => {
            if (!props.token) navigate('/profile')
            else setShowModal(true)
          }}>
            <i className="ri-shopping-bag-line"></i>
            Place Bid
          </button>

          {showModal && <Modal balance={props.balance} profile={props.profile} buyNft={props.buyNft} nft={props.nft} setShowModal={setShowModal} />}
        </div>
      </div>
    </div>}
  </>

}

export default NftCard