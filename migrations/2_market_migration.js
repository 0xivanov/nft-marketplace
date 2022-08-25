const NFTMarket = artifacts.require("NFTMarket");

module.exports = function (deployer) {
  deployer.deploy(NFTMarket)
};