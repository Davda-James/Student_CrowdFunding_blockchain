import React, { useState } from 'react';
import { getContract } from '../utils/web3';
import { ethers } from 'ethers';

export default function Create() {
  const [goal, setGoal] = useState('');

  const createCampaign = async () => {
    try {
      if (!goal || isNaN(goal) || parseFloat(goal) <= 0) {
        alert('Please enter a valid goal in ETH.');
        return;
      }

      // Get the contract instance
      const contract = await getContract();
      
      // Convert goal to wei
      const goalInWei = ethers.parseEther(goal);
      
      // Call the contract method
      const tx = await contract.createCampaign(goalInWei);
      
      // Wait for the transaction to be mined
      await tx.wait();
      
      // Success message
      alert('Campaign created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create campaign.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 style={{
        width:"600px",
        textAlign:"center"
      }} className="text-4xl font-extrabold text-white text-center mb-6">Create Campaign</h1>
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl flex flex-col">
      <input
  type="number"
  placeholder="Enter goal in ETH"
  value={goal}
  onChange={(e) => setGoal(e.target.value)}
  style={{
    border: '1px solid #374151',  // Equivalent to 'border-gray-700'
    backgroundColor: '#1f2937',    // Equivalent to 'bg-gray-800'
    color: 'white',
    padding: '1rem',               // Equivalent to 'p-4'
    borderRadius: '0.5rem',        // Equivalent to 'rounded-lg'
    width: '300px',                 // Equivalent to 'w-full'
    marginBottom: '1.5rem',        // Equivalent to 'mb-6'
    marginRight:"5px",
    outline: 'none',
    fontSize:"1rem",
    transition: 'box-shadow 0.3s, border-color 0.3s', // Equivalent to 'transition duration-300'
  }}
  onFocus={(e) => {
    e.currentTarget.style.boxShadow = '0 0 0 4px #2563eb'; // Equivalent to 'focus:ring-2 focus:ring-blue-600'
    e.currentTarget.style.borderColor = '#2563eb';
  }}
  onBlur={(e) => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = '#374151';
  }}
/>

<button
  onClick={createCampaign}
  style={{
    width: '300px',
    background: 'linear-gradient(to right, #3b82f6, #2563eb, #1d4ed8)',
    color: 'white',
    padding: '1rem',
    marginTop:"1rem",
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize:'1rem',
    transition: 'background 0.3s',
    backgroundSize: '200% auto',
    backgroundPosition: '0% 0%',
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8, #1e40af)';
    e.currentTarget.style.backgroundPosition = '100% 0%';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #2563eb, #1d4ed8)';
    e.currentTarget.style.backgroundPosition = '0% 0%';
  }}
>
  Create Campaign
</button>

      </div>
    </div>
  );
}
