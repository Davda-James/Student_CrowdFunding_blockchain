import React, { useState } from 'react';
import { getContract } from '../utils/web3';
import { ethers } from 'ethers';

export default function Contribute() {
  const [campaignId, setCampaignId] = useState('');
  const [amount, setAmount] = useState('');

  const contribute = async () => {
    try {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please enter a valid amount in ETH.');
            return;
        }
      const contract = await getContract();
      const tx = await contract.contributeToCampaign(campaignId, {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      alert('Contribution successful!');
    } catch (error) {
      console.error(error);
      alert('Failed to contribute.');
    }
  };

  return (
<div
  style={{
    maxWidth: '100%',
    margin: '0 auto',          // Equivalent to 'mx-auto'
    padding: '2rem 1rem',      // Equivalent to 'px-4 py-8'
  }}
>
  <h1
    style={{
      fontSize: '2.25rem',      // Equivalent to 'text-4xl'
      fontWeight: 'bold',       // Equivalent to 'font-bold'
      margin: '1rem 0',         // Equivalent to 'my-4'
      color: 'white',           // Equivalent to 'text-white'
    }}
  >
    Contribute to Campaign
  </h1>
  <input
    type="number"
    placeholder="Enter campaign ID"
    value={campaignId}
    onChange={(e) => setCampaignId(e.target.value)}
    style={{
      border: '1px solid #374151',   // Equivalent to 'border-gray-700'
      backgroundColor: '#1f2937',    // Equivalent to 'bg-gray-800'
      color: 'white',
      padding: '0.5rem',             // Equivalent to 'p-2'
      borderRadius: '0.25rem',       // Equivalent to 'rounded'
      width: '300px',                 // Equivalent to 'w-full'
      marginBottom: '0.5rem',        // For spacing between inputs
      marginRight:"0.5rem"
    }}
  />
  <input
    type="number"
    placeholder="Enter amount in ETH"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    style={{
      border: '1px solid #374151',   // Equivalent to 'border-gray-700'
      backgroundColor: '#1f2937',    // Equivalent to 'bg-gray-800'
      color: 'white',
      padding: '0.5rem',             // Equivalent to 'p-2'
      borderRadius: '0.25rem',       // Equivalent to 'rounded'
      width: '300px',                 // Equivalent to 'w-full'
      marginTop: '0.5rem',           // Equivalent to 'mt-2'
       marginRight:"0.5rem"
    }}
  />
  <button
    onClick={contribute}
    style={{
      marginTop: '1rem',             // Equivalent to 'mt-4'
      backgroundColor: '#047857',    // Equivalent to 'bg-green-700'
      color: 'white',
      padding: '0.5rem',             // Equivalent to 'p-2'
      borderRadius: '0.25rem',       // Equivalent to 'rounded'
      cursor: 'pointer',
    }}
  >
    Contribute
  </button>
</div>

  );
}
