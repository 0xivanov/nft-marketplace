const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
})

const NFT = mongoose.model('NFT', {
  title: {
    type: String
  },
  desc: {
    type: String
  },
  imgFormat: {
    type: String
  },
  img: {
    type: Buffer
  },
  creator: {
    type: String
  },
  creatorImg : {
    type: String
  },
  currentBid: {
    type: Number
  },
  category: {
    type: String
  },
  expirationDate: {
    type: Date
  },
  views: {
    type: Number,
    required: false,
    default: 0
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  }
})

const create = async (nft) => {

  const _nft = new NFT(nft)
  _nft.save().then(() => { console.log(NFT) }).catch((e) => { console.log(e) })
}

const getAll = (fn) => {
  NFT.find({}).then((nfts) => {
    fn(nfts)
  }).catch((e) => { console.log(e) })
}

export default { create, getAll };