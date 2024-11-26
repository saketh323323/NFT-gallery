const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const NFTAuction = await hre.ethers.getContractFactory("NFTAuction");
  const nftAuction = await NFTAuction.deploy(deployer.address); // Pass the deployer's address

  await nftAuction.deployed();
  console.log("NFTAuction deployed to:", nftAuction.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
