const mongoose = require('mongoose');
const { Schema } = mongoose;
const jdenticon = require("jdenticon");
const fs = require("fs");


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

const profile = {
  pubkey: null,
  name: "Marie Horwitz",
  proficiency: "Web Designer",
  email: "info@gmail.com",
  facebook: "#",
  instagram: "#",
  twitter: "#",
  img: null,
  imgFormat: null,
  imgUrl: null,
  likedNfts: null
}

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
})

const NFT = mongoose.model('NFT', {
  sellerName: {
    type: String
  },
  auctionAddress: {
    type: String
  },
  category: {
    type: String
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  }
})

const createNft = async (nft) => {
  console.log(nft)
  const _nft = new NFT(nft)
  return _nft.save().then((nft) => {
    console.log("created new nft")
    return nft
  }).catch(e => console.log(e))
}

const getAllNfts = async () => {
  return NFT.find({}).then(nfts => {return nfts}).catch(e => console.log(e))
}

const likeNft = (isLiked, _id) => {
  if(isLiked.isLiked) NFT.findOneAndUpdate({_id: _id}, {$inc : {'likes' : -1}}).exec()
  else NFT.findOneAndUpdate({_id: _id}, {$inc : {'likes' : 1}}).exec()
}

const createProfile = async (token) => {
  profile.pubkey = token.token

  const size = 80;
  const value = token.token; 
  const png = jdenticon.toPng(value, size);
  profile.img = png
  profile.imgFormat = "image/png"
  const _profile = new Profile(profile)
  return _profile.save().then((profile) => {
    console.log("created new proifle")
    return profile
  }).catch(e => console.log(e))
}

const getProfile = async (token) => {
  let _profile = await Profile.findOne({pubkey: token.token})
  if(_profile === null) {
    console.log("gettingPRoifle")
    return createProfile(token)
  } else {
    return _profile
  }
}

const editProfile = async (profile, _id) => {
  return Profile.findByIdAndUpdate({_id}, profile, {new: true}).then((profile) => {
    console.log("profile updated")
    NFT.findById
    return profile
  }).catch(e => console.log(e))
}

export default { createNft, getAllNfts, likeNft, createProfile, editProfile, getProfile };