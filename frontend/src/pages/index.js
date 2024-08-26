import { useEffect, useState } from 'react';
import { getContract } from '../utils/web3';
import CampaignCard from '../components/CampaignCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Grid,Container } from '@mui/material';
import {ethers} from "ethers";
export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
        try {
            const contract = await getContract();
            const campaignCount = await contract.campaignCount();
            const campaignsArray = [];
            for (let i = 1; i <= campaignCount; i++) {
                const fundsRaised = await contract.getFundsRaised(i);
                const fundsAlreadyWithdrawn = await contract.getfundsAlreadyWithdrawn(i);
                const completed = await contract.isCompleted(i);
                const goal = await contract.getGoal(i);
                // console.log(fundsAlreadyWithdrawn);
                // console.log(goal)
                const campaign = {
                    id: i, 
                    fundsRaised :  ethers.formatEther(fundsRaised),
                    fundsAlreadyWithdrawn : ethers.formatEther(fundsAlreadyWithdrawn),
                    goal : ethers.formatEther(goal),
                    completed : completed,
                };
                campaignsArray.push(campaign);
            }
            setCampaigns(campaignsArray);
        } catch (error) {
            setError('Failed to fetch campaigns.');
            console.error('Fetch campaigns error:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchCampaigns();
}, []);

  if (loading) return <div className="centered-spinner"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container>
      <h1 className="text-4xl font-bold my-4">Student Campaigns</h1>
      <Grid container spacing={3} justifyContent="center">
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}