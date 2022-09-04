// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Auction {
  
  bool public isBase;

  event Start();
  event End(address bidWinner, uint finalBid);
  event Bid(address indexed sender, uint amount);
  event Withdraw(address indexed bidder, uint amount);

  struct MarketItem {
      uint256 itemId;
      address nftContract;
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
  }

  IERC721 public nft;
  uint public nftId;
  address payable public seller;

  bool private started;
  bool private ended;
  uint32 public startedAt;
  uint32 public expireAt;

  mapping(address=>uint) public bids;
  uint public highestBid;
  address public highestBidder;

  constructor() {
    isBase = true;
  }

  function initialize(uint _startingBid, address _seller) external {
    require(isBase == false, "cannot initialize base contract");
    require(seller == address(0), "already initilized");
    seller = payable(_seller);
    highestBid = _startingBid;
  }

  function start(address _nft, uint _nftId) external {
    require(msg.sender == seller, "not seller");
    require(!started, "started");
    nftId = _nftId;
    nft = IERC721(_nft);
    started = true;
    expireAt = uint32(block.timestamp + 2 hours);
    nft.transferFrom(msg.sender, address(this), _nftId);
    emit Start();
  }

  function end() external {
    require(started, "not started");
    require(!ended, "already ended");
    require(msg.sender == seller);
    require(block.timestamp > expireAt);

    if(highestBidder != address(0)) {
      nft.transferFrom(address(this), highestBidder, nftId);
    } else {
      nft.transferFrom(address(this), seller, nftId);
    }
    seller.transfer(highestBid);
    started = false;
    ended = true;

    emit End(highestBidder, highestBid);
  }

  function bid() external payable {
    require(started, "not started");
    require(block.timestamp < expireAt, "this auction ended");

    bids[msg.sender] += msg.value;
    assert(bids[msg.sender] > highestBid);

    highestBidder = msg.sender;
    highestBid = msg.value;

    emit Bid(msg.sender, msg.value);
  }

  function withdraw() external {
    uint balance = bids[msg.sender];
    bids[msg.sender] = 0;
    payable(msg.sender).transfer(balance);
    emit Withdraw(msg.sender, balance);
  }
}