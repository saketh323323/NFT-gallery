import React, { useState } from 'react';

function Auction({ nft }) {
  const [bid, setBid] = useState('');
  const [highestBid, setHighestBid] = useState(0);

  const placeBid = () => {
    if (parseFloat(bid) > highestBid) {
      setHighestBid(parseFloat(bid));
      alert('Bid placed successfully!');
    } else {
      alert('Bid must be higher than the current highest bid.');
    }
  };

  return (
    <div>
      <h3>Auction for: {nft.name}</h3>
      <p>Highest Bid: {highestBid} ETH</p>
      <input
        type="number"
        placeholder="Enter your bid"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
      />
      <button onClick={placeBid}>Place Bid</button>
    </div>
  );
}

export default Auction;
