import React from 'react'
import './modal.css'

const Modal = ({setShowModal}) => {
  return (
    <div className="modal__wrapper">
        <div className="single__modal">
            <span className="close__modal">
                <i class="ri-close-circle-line" onClick={() => {setShowModal(false)}}></i>
                </span>
            <h6 className='text-center text-light'>Place Bid</h6>
            <p className='text-center text-light'> You must bid at least <span className='money'>5 ETH</span></p>

            <div className="input__item mb-3">
                <h6>Enter Quantity, 3 available</h6>
                <input type="number" placeholder='Enter quantity'/>
            </div>

            <div className='d-flex align-items-center justify-content-between'>
                <p>Minimum bid</p>
                <span className='money'>0.001 ETH</span>
            </div>

            <div className='d-flex align-items-center justify-content-between'>
                <p>Service Fee</p>
                <span className='money'>0.001 ETH</span>
            </div>

            <div className='d-flex align-items-center justify-content-between'>
                <p>Total Bid Ammount</p>
                <span className='money'>324 ETH</span>
            </div>

            <div>
                <button className="place__bid-btn">Place Bid</button>
            </div>
        </div>
    </div>
  )
}

export default Modal