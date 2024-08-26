# Student Crowd Funding Blockchain 
Welcome to the **Student Crowdfunding Platform**! This project is a decentralized application (DApp) built using Solidity smart contracts for the backend and Next.js for the frontend. It allows students to create and manage fundraising campaigns, with contributions tracked and verified on blockchain .

## 🚀 Features

- **Smart Contracts**: Written in Solidity, these contracts manage campaigns, track funds raised, and ensure transparency.
- **Next.js Frontend**: A responsive and interactive web interface built with Next.js and Material-UI for a seamless user experience.
- **Blockchain Integration**: Interaction with opencampus using ethers.js to handle blockchain transactions.

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Solidity](https://soliditylang.org/) (^0.8.0)
- [MetaMask](https://metamask.io/)
- [Nextjs](https://nextjs.org/) (v14.2.6)
- [web3.js](https://docs.web3js.org/)(^4.12.1)
- [ethers](https://docs.ethers.org/v6/)(^6.13.2)
- [dotenv](^16.4.5)

#### You can see the other material UI libraries in package.json

### Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-crowdfunding-blockchain.git
cd student-crowdfunding-blockchain
```
#### 2. Setting up the folder inside /frontend/src/utils
- Compile the smart contract and inside the utils folder create abis folder and store the EducationCrowdFunding.js
- Inside this add DEPLOYED_CONTRACT_ADDRESS variable and contractABI and export them

#### 3. Setting up the frontend 
```bash
cd frontend
npm run dev
```
- The project will start at http://localhost:3000

