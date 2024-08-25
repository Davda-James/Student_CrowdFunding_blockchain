import { useEffect, useState } from 'react';
import { getContract } from '../utils/web3';
import CampaignCard from '../components/CampaignCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

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
                const campaign = {
                    id: i, 
                    fundsRaised,
                    fundsAlreadyWithdrawn,
                    goal,
                    completed,
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
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-4">Student Campaigns</h1>
      <div className="flex flex-wrap gap-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="flex-1 min-w-[300px]">
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );
}
