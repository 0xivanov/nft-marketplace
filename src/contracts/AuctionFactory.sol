// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import "./Auction.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract AuctionFactory {

  address public implementation;
  
  mapping(address=>address[]) public clones;
  address[] public sellerAddresses;

  event AuctionCreated(address auction, address owner);

  constructor (address _implementation) {
    implementation = _implementation;
  }

  function createAuction(uint _startingBid) external {
    address clone = Clones.clone(implementation);
    clones[msg.sender].push(clone);
    sellerAddresses.push(msg.sender);
    Auction(clone).initialize(_startingBid, msg.sender);
    emit AuctionCreated(clone, msg.sender);
  }

  function getSellerAddresses() external view returns (address[] memory) {
    return sellerAddresses;
  }

  function getAuctions(address seller) external view returns (address[] memory) {
    return clones[seller];
  }
}