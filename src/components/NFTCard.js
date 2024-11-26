import React from 'react';

function NFTCard({ nft }) {
  return (
    <div className="nft-card">
      <img src={nft.image} alt={nft.name} />
      <h2>{nft.name}</h2>
      <p>Artist: {nft.artist}</p>
      <p>Price: {nft.price} ETH</p>
      <p>Owner: {nft.owner}</p>
    </div>
  );
}

export default NFTCard;
