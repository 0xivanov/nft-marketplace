const { expect } = require('chai');
const { ethers, providers } = require('ethers');
const { matchRoutes } = require('react-router-dom');
const NFTMarket = artifacts.require('./NFTMarket');
const NFT = artifacts.require('NFT');

contract('NFTMarket', (accounts) => {
    it('Should create and execute market sales', async () => {
        const marketInstance =  await NFTMarket.deployed()
        const nftInstance = await NFT.deployed()

        let listingPrice = await marketInstance.getListingPrice()
        listingPrice = listingPrice.toString()

        const auctionPrice = ethers.utils.parseUnits('1', 'ether')

        await nftInstance.mint('https://www.test.com')
        await nftInstance.mint('https://www.test2.com')
        await nftInstance.mint('https://www.test3.com')
        await nftInstance.mint('https://www.test4.com')

        await marketInstance.createMarketItem(nftInstance.address, 1, auctionPrice, {value: listingPrice})
        await marketInstance.createMarketItem(nftInstance.address, 2, auctionPrice, {value: listingPrice})
        await marketInstance.createMarketItem(nftInstance.address, 3, auctionPrice, {value: listingPrice})
        await marketInstance.createMarketItem(nftInstance.address, 4, auctionPrice, {value: listingPrice})


        //const [_, buyerAddress] = accounts
        
        //await marketInstance.createMarketSale(nftInstance.address, 1, {value: auctionPrice, from: buyerAddress})

        const items = await marketInstance.fetchMarketItems()

        console.log("items: ", items)
    })
})