const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const Profile = mongoose.model('Profile', {
  pubkey: {
    type: String
  },
  name: {
    type: String
  },
  proficiency: {
    type: String
  },
  email: {
    type: String
  },
  facebook: {
    type: String
  },
  instagram: {
    type: String
  },
  twitter: {
    type: String
  },
  img: {
    type: Buffer
  },
  imgUrl: {
    type: String
  },
  imgFormat: {
    type: String
  },
  likedNfts: [{ type: Schema.Types.ObjectId, ref: 'NFT' }],
  ownedNfts: [{ type: Schema.Types.ObjectId, ref: 'NFT' }]
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
  },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
})

const createNft = async (nft, ownerId) => {

  const _nft = new NFT(nft)
  return _nft.save().then((nft) => {
    console.log("created new nft")
    let _id = ownerId
    Profile.findByIdAndUpdate({_id}, { $push: { ownedNfts: nft } }, {new: true}).then((profile) => {
      console.log("profile updated")
    }).catch(e => console.log(e))
    return nft
  }).catch(e => console.log(e))
}

const getAllNfts = async () => {
  return NFT.find({}).then(nfts => {return nfts}).catch(e => console.log(e))
}

const likeNft = (isLiked, _id) => {
  console.log(isLiked.isLiked)
  if(isLiked.isLiked) NFT.findOneAndUpdate({_id: _id}, {$inc : {'likes' : -1}}).exec()
  else NFT.findOneAndUpdate({_id: _id}, {$inc : {'likes' : 1}}).exec()
}

const createProfile = async (profile) => {
  const _profile = new Profile(profile)
  return _profile.save().then((profile) => {
    console.log("created new proifle")
    return profile
  }).catch(e => console.log(e))
}

const getProfile = async (token) => {
  return Profile.findOne({pubkey: token.token}).then(profile => {return profile}).catch(e => console.log(e))
}

const editProfile = async (profile, _id) => {
  return Profile.findByIdAndUpdate({_id}, profile, {new: true}).then((profile) => {
    console.log("profile updated")
    return profile
  }).catch(e => console.log(e))
}

export default { createNft, getAllNfts, likeNft, createProfile, editProfile, getProfile };