import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFTAuctionABI from "./NFTAuction.json"; // ABI from compilation

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with the deployed contract address

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const nftAuctionContract = new ethers.Contract(contractAddress, NFTAuctionABI, signer);

        setContract(nftAuctionContract);

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } else {
        alert("Metamask not found!");
      }
    };

    connectWallet();
  }, []);

  const mintNFT = async () => {
    if (contract) {
      const tokenId = Math.floor(Math.random() * 1000);
      await contract.mintNFT(account, tokenId);
      alert(`Minted NFT with ID: ${tokenId}`);
    }
  };

  return (
    <div>
      <h1>NFT Auction</h1>
      <p>Connected Account: {account}</p>
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
}

export default App;
