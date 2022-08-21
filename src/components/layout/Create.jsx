import React, {useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import fetch from 'node-fetch'
import CommonSection from '../ui/CommonSection'
import NftCard from '../ui/NftCard'
import '../../style/create-item.css'
import '../ui/live-auction.css'

const Create = () => {

  const navigate = useNavigate()

  const [item, setItem] = useState({
    title: "Travel Monkey Club",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: null,
    creator: "Trista Francis",
    currentBid: 4.89,
    category: 'art',
    expirationDate: new Date(),
    img: null,
    imgFormat: null
  })

  const onImageChange = (event) => {
    console.log(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      item.imgUrl = URL.createObjectURL(event.target.files[0])
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {item.img = Buffer(reader.result, 'base64')}
      item.imgFormat = event.target.files[0].type
    }
  }

  const createPost = async () => {
    try {
      const response = await fetch('/create', {
        method: 'post',
        body: JSON.stringify(item),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json()
      console.log(data);
      navigate('/market')
    } catch (error) {
      console.log(error)
    }
  }

  return <>
  <CommonSection title='Create Item' />

  <section>
    <Container>
      <Row>
        <Col lg='4' mb='4' ms='6'>
          <h5 className='mb-4 text-light'>Preview Item</h5>
          <NftCard className='preview__card' item={item} isInCreation={true} />
        </Col>
        <Col>
          <div className="create__item">
              <form action="">
                <div className="form__input w-50">
                  <label>Title</label>
                  <input type="text" placeholder='Title' className='upload__input' onChange={input => item.title = input.target.value}/>
                </div>

                <div className="form__input w-50">
                  <label>Category</label>
                  <select className='w-100' onChange={input => item.category = input.target.value}>
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                    <option value="collectable">Collectable</option>
                    <option value="domain">Domain</option>
                  </select>
                </div>

                <div className="form__input w-50">
                  <label>Description</label>
                  <textarea name='' id=''  cols='30' rows='10' placeholder='Enter description' className='w-100' onChange={input => item.desc = input.target.value}/>
                </div>

                <div className="form__input w-50">
                  <label>Upload File</label>
                  <input type="file" className='upload__input' onChange={onImageChange}/>
                </div>

                <div className="form__input w-50">
                  <label>Minimum Bid</label>
                  <input type="number" placeholder='Enter minimum bid' className='upload__input' onChange={input => item.currentBid = input.target.value}/>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="form__input w-50">
                    <label>Expiration Date</label>
                    <input type="date" className='upload__input' onKeyDown={(e) => e.preventDefault()} min={new Date().toLocaleDateString('en-ca')} max={new Date(Date.now() + 10 * 86400000).toLocaleDateString('en-ca')} onChange={input => item.expirationDate = new Date(input.target.value)}/>
                  </div>
                </div>

                <div className="form__input w-50 d-flex align-items-center justify-content-between">
                  <div className="bid__btn">
                    <button type='button' className="btn d-flex align-items-center gap-2" onClick={() => {
                      let updatedItem = item
                      setItem(item => ({...item, ...updatedItem}))
                    }}>
                        <i className="ri-search-eye-line"></i>
                        Preview
                    </button>
                  </div>
                  <div className="bid__btn">
                    <button type='button' className="btn d-flex align-items-center gap-2" onClick={() => {
                      createPost()
                    }}>
                        <i className="ri-building-3-line"></i>
                        Create
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