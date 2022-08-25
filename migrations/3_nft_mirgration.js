const NFTMarket = artifacts.require("NFTMarket");
const NFT = artifacts.require("NFT");

module.exports = async function (deployer) {
  await NFTMarket.deployed()
  await deployer.deploy(NFT, NFTMarket.address);
};