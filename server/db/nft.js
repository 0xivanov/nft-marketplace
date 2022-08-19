const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/123', {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
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
  likes: {
    type: Number,
    required: false,
    default: 0
  }
})

const create = async (nft) => {

  const _nft = new NFT(nft)
  _nft.save().then(() => { console.log("created new nft") }).catch((e) => { console.log(e) })
}

const getAll = (fn) => {
  NFT.find({}).then((nfts) => {
    fn(nfts)
  }).catch((e) => { console.log(e) })
}

const like = (isLiked, _id) => {
  console.log(isLiked.isLiked)
  if(isLiked.isLiked) NFT.findOneAndUpdate({_id: _id}, {$inc : {'likes' : -1}}).exec()
  else NFT.findOneAndUpdate({_id: _id}, {$inc : {'likes' : 1}}).exec()
}

export default { create, getAll, like };