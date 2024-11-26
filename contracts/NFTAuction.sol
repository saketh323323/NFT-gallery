// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTAuction is ERC721, Ownable {
    struct Auction {
        address payable seller;
        uint256 startingPrice;
        uint256 highestBid;
        address highestBidder;
        uint256 endTime;
        bool ended;
    }

    mapping(uint256 => Auction) public auctions;

    // Constructor to initialize the ERC721 token with a name, symbol, and initial owner
    constructor(address initialOwner) ERC721("NFTArtGallery", "NFTAG") Ownable(initialOwner) {}

    // Mint an NFT
    function mintNFT(address recipient, uint256 tokenId) public onlyOwner {
        _mint(recipient, tokenId);
    }

    // Start an auction
    function startAuction(
        uint256 tokenId,
        uint256 startingPrice,
        uint256 duration
    ) public {
        require(ownerOf(tokenId) == msg.sender, "You do not own this NFT.");
        require(auctions[tokenId].endTime == 0, "Auction already exists.");

        auctions[tokenId] = Auction({
            seller: payable(msg.sender),
            startingPrice: startingPrice,
            highestBid: 0,
            highestBidder: address(0),
            endTime: block.timestamp + duration,
            ended: false
        });

        transferFrom(msg.sender, address(this), tokenId);
    }

    // Place a bid
    function placeBid(uint256 tokenId) public payable {
        Auction storage auction = auctions[tokenId];
        require(block.timestamp < auction.endTime, "Auction has ended.");
        require(msg.value > auction.highestBid, "Bid is too low.");

        if (auction.highestBid > 0) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;
    }

    // End the auction
    function endAuction(uint256 tokenId) public {
        Auction storage auction = auctions[tokenId];
        require(block.timestamp >= auction.endTime, "Auction is still ongoing.");
        require(!auction.ended, "Auction already ended.");

        auction.ended = true;

        if (auction.highestBid > 0) {
            auction.seller.transfer(auction.highestBid);
            _transfer(address(this), auction.highestBidder, tokenId);
        } else {
            _transfer(address(this), auction.seller, tokenId);
        }
    }
}
