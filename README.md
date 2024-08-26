# Student Crowd Funding Blockchain 
Welcome to the **Student Crowdfunding Platform**! This project is a decentralized application (DApp) built using Solidity smart contracts for the backend and Next.js for the frontend. It allows students to create and manage fundraising campaigns, with contributions tracked and verified on blockchain .

#### Tech Stacks
![NextJs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Remix IDE](https://img.shields.io/badge/Remix_IDE-363636?style=for-the-badge&logo=remix&logoColor=white)


![Student Crowdfunding Platform HomePage](/frontend/public/Home.png)
![Student Crowdfunding Platform HomePage with Vertical Navbar](/frontend/public/VerticalNav.png)
![Student Crowdfunding Platform Create Campaign](/frontend/public/CreateCampaign.png)
![Student Crowdfunding Platform Contribute](/frontend/public/Contribute.png)

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
git clone https://github.com/Davda-James/student-crowdfunding-blockchain.git
cd student-crowdfunding-blockchain
```
#### 2. Setting up the folder inside /frontend/src/utils
- Compile the smart contract and inside the utils folder create abis folder and store the EducationCrowdFunding.js
- Inside this add NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS variable and NEXT_PUBLIC_contractABI and export them

#### 3. Setting up the frontend 
```bash
cd frontend
npm run dev
```
- The project will start at http://localhost:3000/

#### Issues 
- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/Davda-James/Student_CrowdFunding_blockchain/issues) to discuss it .

- We kindly ask that you provide as much detail as possible when submitting an issue, including steps to reproduce the problem, any error messages that you have seen, and any other relevant information. This will help us to identify and fix the issue more quickly.

- Thank you for your cooperation, and we look forward to hearing from you!

#### Adding New Features 
- If you think that there might be the features that can be added in this feel free to open an issue and give a complete description about that feature I will try to integrate that if possible.

## Author 
- **Davda James** - [Davda James](https://github.com/Davda-James)
