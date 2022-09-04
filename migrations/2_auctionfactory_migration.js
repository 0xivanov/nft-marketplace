const AuctionFactory = artifacts.require("AuctionFactory");
const Auction = artifacts.require("Auction");

module.exports = async function (deployer) {
  await Auction.deployed()
  await deployer.deploy(AuctionFactory, Auction.address)
};