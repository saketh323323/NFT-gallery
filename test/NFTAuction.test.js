const NFTAuction = artifacts.require("NFTAuction");

contract("NFTAuction", (accounts) => {
  let nftAuction;

  beforeEach(async () => {
    nftAuction = await NFTAuction.new();
  });

  it("should mint an NFT", async () => {
    await nftAuction.mintNFT(accounts[0], 1);
    const owner = await nftAuction.ownerOf(1);
    assert.equal(owner, accounts[0], "Owner of the NFT should be the minter.");
  });

  it("should start an auction", async () => {
    await nftAuction.mintNFT(accounts[0], 2);
    await nftAuction.startAuction(2, web3.utils.toWei("1", "ether"), 60, { from: accounts[0] });

    const auction = await nftAuction.auctions(2);
    assert.equal(auction.seller, accounts[0], "Auction seller should be the NFT owner.");
  });
});
