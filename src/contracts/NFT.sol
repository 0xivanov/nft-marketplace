// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIdss;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("MyNFT", "MNFT") {
        contractAddress = marketplaceAddress;
    }

    function mint(string memory _tokenURI) external returns (uint256) {
        tokenIdss.increment();
        _safeMint(msg.sender, tokenIdss.current());
        _setTokenURI(tokenIdss.current(), _tokenURI);
        setApprovalForAll(contractAddress, true);
        return tokenIdss.current();
    }
}
