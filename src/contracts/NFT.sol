// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;
    address public owner;

    constructor(address auction) ERC721("MyNFT", "MNFT") {
      owner = auction;
    }

    event Approving(address approved);

    modifier onlyOwner() {
      require(msg.sender == owner, "not owner");
      _;
    }

    function mint(string memory _tokenURI, address test) external returns (uint256) {
        tokenIds.increment();
        _safeMint(msg.sender, tokenIds.current());
        _setTokenURI(tokenIds.current(), _tokenURI);
        setApprovalForAll(test, true);
        return tokenIds.current();
    }
}
