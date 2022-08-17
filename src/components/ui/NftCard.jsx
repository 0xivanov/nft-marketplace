import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'


const NftCard = (props) => {

    const {title, _id, currentBid, expirationDate, img, imgUrl, imgFormat, creator} = props.item
    const [showModal, setShowModal] = useState(false)
    const [_img, _setImg] = useState()
    const [isPending, setIsPending] = useState(true)

    const timeLeft = (strDate) => {  
        const dt = new Date(strDate);  
        const now = new Date()
        return Math.round((dt - now) / 36e5);
    }  

    useEffect(() => {
        if(title === 'Travel Monkey Club') setIsPending(false)
        if(img === null) return
        var base64String = btoa(
            new Uint8Array(img.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        _setImg(base64String)
        setIsPending(false)
    }, [])

  return <>
  {isPending && <div>Loading</div>}
  {!isPending && <div className="single__nft__card">
    <div className="nft__img">
        {!props.showLink && <img src={imgUrl} alt="" className='w-100' />}
        {props.showLink && <img src={`data:${imgFormat};base64,${_img}`} alt="" className='w-100' />}
    </div>
    <div className="nft__content">
        <h5 className="nft__title">
            {props.showLink && <Link to={`/market/${_id}`}>{title}</Link>}
            {!props.showLink && <div>{title}</div>}
            </h5>
        <div className="creator__info__wrapper d-flex gap-3">
            <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                <div>
                    <h6>Created By</h6>
                    <p>{creator}</p> 
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
            <button disabled={props.isInCreation} className="btn d-flex align-items-center gap-2" onClick={() => {setShowModal(true)}}>
                <i class="ri-shopping-bag-line"></i>
                Place Bid
            </button>

            {showModal && <Modal setShowModal={setShowModal} />}
        </div>
    </div>
</div>}
  </>

}

export default NftCard