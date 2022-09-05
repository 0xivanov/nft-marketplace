import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './modal.css'

const Modal = ({balance, profile, nft, buyNft, setShowModal }) => {

  const [bid, setBid] = useState(0)

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-circle-line" onClick={() => { setShowModal(false) }}></i>
        </span>
        <h6 className='text-center text-light'>Place Bid</h6>
        <p className='text-center text-light'> You must bid at least <span className='money'>{nft.price} ETH</span></p>

        <div className="input__item mb-3">
          <h6>Enter Quantity, {balance} available</h6>
          <input type="number" placeholder='Enter quantity' onChange={input => setBid(input.target.value)} />
        </div>

        <div className='d-flex align-items-center justify-content-between gap-3'>
          <p>Minimum bid</p>
          <span className='money'>0.001 ETH</span>
        </div>

        <div className='d-flex align-items-center justify-content-between gap-3'>
          <p>Service Fee</p>
          <span className='money'>0.001 ETH</span>
        </div>

        <div className='d-flex align-items-center justify-content-between gap-3'>
          <p>Total Bid Ammount</p>
          <span className='money'>324 ETH</span>
        </div>

        <div>
          <button onClick={() => { buyNft(nft, bid) }} className="place__bid-btn">Place Bid</button>
        </div>
      </div>
    </div>
  )
}

export default Modal