import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../ui/CommonSection'
import NftCard from '../ui/NftCard'
import img05 from '../../img/img-05.jpg'
import ava05 from '../../img/ava-05.png'
import '../../style/create-item.css'
import '../ui/live-auction.css'

const Create = () => {

  const [item, setItem] = useState({
    id: "05",
    title: "Travel Monkey Club",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img05,
    creator: "Trista Francis",
    creatorImg: ava05,
    currentBid: 4.89,
    category: 'art'
  })

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setItem({image: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return <>
  <CommonSection title='Create Item' />

  <section>
    <Container>
      <Row>
        <Col lg='4' mb='4' ms='6'>
          <h5 className='mb-4 text-light'>Preview Item</h5>
          <NftCard className='preview__card' item={item} />
        </Col>
        <Col>
          <div className="create__item">
              <form action="">
                <div className="form__input w-50">
                  <label>Title</label>
                  <input type="text" placeholder='Title' className='upload__input' onChange={input => item.title = input.target.value}/>
                </div>

                <div className="form__input w-50">
                  <label>Description</label>
                  <textarea name='' id=''  cols='30' rows='10' placeholder='Enter description' className='w-100' onChange={input => item.desc = input.target.value}/>
                </div>

                <div className="form__input w-50">
                  <label>Upload File</label>
                  <input type="file" className='upload__input' onChange={(value) => {onImageChange()}}/>
                </div>

                <div className="form__input w-50">
                  <label>Minimum Bid</label>
                  <input type="number" placeholder='Enter minimum bid' className='upload__input' onChange={input => item.currentBid = input.target.value}/>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="form__input w-50">
                    <label>Expiration Date</label>
                    <input type="date" className='upload__input'/>
                  </div>
                </div>

                <div className="form__input w-50">
                  <div className="bid__btn d-flex align-items-center justify-content-between">
                    <button type='button' className="btn d-flex align-items-center gap-2" onClick={() => {
                      let updatedItem = item
                      setItem(item => ({...item, ...updatedItem}))
                    }}>
                        <i class="ri-shopping-bag-line"></i>
                        Place Bid
                    </button>
                  </div>
                </div>
              </form>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  </>
}

export default Create