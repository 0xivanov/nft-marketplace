import React, {useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import CommonSection from '../ui/CommonSection'
import Loader from '../ui/Loader';
import NftCard from '../ui/NftCard'
import '../../style/create-nft.css'
import '../ui/live-auction.css'

const Create = ({profile, isPending}) => {

  const navigate = useNavigate()

  const [nft, setNft] = useState({
    title: "Travel Monkey Club",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: null,
    creator: "Trista Francis",
    currentBid: 4.89,
    category: 'art',
    expirationDate: new Date(),
    img: null,
    imgFormat: null,
    owner: null
  })

  const onImageChange = (event) => {
    console.log(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      nft.imgUrl = URL.createObjectURL(event.target.files[0])
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {nft.img = Buffer(reader.result, 'base64')}
      nft.imgFormat = event.target.files[0].type
    }
  }

  const createPost = async () => {
    try {
      const ownerId = profile._id
      const response = await fetch('/create', {
        method: 'post',
        body: JSON.stringify({nft, ownerId}),
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
  {isPending && <>
    <CommonSection title='Create nft' />
    <Loader />
  </>}
  {!isPending &&   <>
  <CommonSection title='Create nft' />
  <section>
    <Container>
      <Row>
        <Col lg='4' mb='4' ms='6'>
          <h5 className='mb-4 text-light'>Preview nft</h5>
          <NftCard className='preview__card' nft={nft} isInCreation={true} />
        </Col>
        <Col>
          <div className="create__nft">
              <form action="">
                <div className="form__input w-50">
                  <label>Title</label>
                  <input type="text" placeholder='Title' className='upload__input' onChange={input => nft.title = input.target.value}/>
                </div>

                <div className="form__input w-50">
                  <label>Category</label>
                  <select className='w-100' onChange={input => nft.category = input.target.value}>
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                    <option value="collectable">Collectable</option>
                    <option value="domain">Domain</option>
                  </select>
                </div>

                <div className="form__input w-50">
                  <label>Description</label>
                  <textarea name='' id=''  cols='30' rows='10' placeholder='Enter description' className='w-100' onChange={input => nft.desc = input.target.value}/>
                </div>

                <div className="form__input w-50">
                  <label>Upload File</label>
                  <input type="file" className='upload__input' onChange={onImageChange}/>
                </div>

                <div className="form__input w-50">
                  <label>Minimum Bid</label>
                  <input type="number" placeholder='Enter minimum bid' className='upload__input' onChange={input => nft.currentBid = input.target.value}/>
                </div>

                <div className="d-flex align-nfts-center justify-content-between">
                  <div className="form__input w-50">
                    <label>Expiration Date</label>
                    <input type="date" className='upload__input' onKeyDown={(e) => e.preventDefault()} min={new Date().toLocaleDateString('en-ca')} max={new Date(Date.now() + 10 * 86400000).toLocaleDateString('en-ca')} onChange={input => nft.expirationDate = new Date(input.target.value)}/>
                  </div>
                </div>

                <div className="form__input w-50 d-flex align-nfts-center justify-content-between">
                  <div className="bid__btn">
                    <button type='button' className="btn d-flex align-nfts-center gap-2" onClick={() => {
                      nft.owner = profile
                      nft.creator = profile.name
                      let updatednft = nft
                      setNft(nft => ({...nft, ...updatednft}))
                      window.scrollTo(0, 0)
                    }}>
                        <i className="ri-search-eye-line"></i>
                        Preview
                    </button>
                  </div>
                  <div className="bid__btn">
                    <button type='button' className="btn d-flex align-nfts-center gap-2" onClick={() => {
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
  </>}

  </>
}

export default Create