# NFT marketplace

•	“English” auction web app. The basic functionality is that users can mint erc721 tokens and start auction for the item. After the expiration date the seller ends the auction. The user with highest bid gets transferred the token, seller gets the currency from the smart contract and the contract owner (in this case me) gets some fee for the platform. The outbid users can withdraw their currency off the contract.<br>
•	Technologies: Solidity, Node.js, React.js, Ethers.js, Truffle, IPFS, MongoDb, ChainLink. The nft’s meta-data is uploaded to IPFS through my local node. Authentication is achieved with web3 wallet. Off-chain data is stored in MongoDb database and served by Express server in Nodejs. Using ChainLink to show real-time value of the items in USD/EURO. Used factory/clone pattern to create multiple proxy contracts and make delegate calls to the implementation in order to save gas.


<hr>

![image](https://user-images.githubusercontent.com/56980328/188326504-76f284fe-e89d-4909-a0e7-5a2efe09e7de.png)

<hr>

![image](https://user-images.githubusercontent.com/56980328/188326690-925df46d-0933-424d-bcbd-e54c2cc69c04.png)

<hr>

![image](https://user-images.githubusercontent.com/56980328/188326725-6ab04a2e-7119-432c-8957-5e6fd46d0b06.png)

<hr>

![image](https://user-images.githubusercontent.com/56980328/188326738-af52897a-3015-4957-82c1-52f33ae1286e.png)

<hr>
