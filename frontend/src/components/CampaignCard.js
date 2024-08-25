// src/components/CampaignCard.js
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Link from 'next/link';
const CampaignCard = ({ campaign }) => (
  <Card sx={{ maxWidth: 345, margin: '10px' }}>
    <CardContent>
      <Typography gutterBottom variant="h6" component="div" color="primary">
      Campaign ID: {campaign.id}
      </Typography>
      <Typography variant="h6" component="div" color="primary">
      Funds Raised: {campaign.fundsRaised} WEI
      </Typography>
      <Typography variant="h6" component="div" color="primary">
        Funds Already Withdrawn: {campaign.fundsAlreadyWithdrawn} WEI
        </Typography>
      <Typography variant="h6" component="div" color="primary">
        Goal: {campaign.goal} WEI
      </Typography>
      <Typography variant="h6" component="div" color="primary">
        Completed: {campaign.completed ? 'Yes' : 'No'}
        </Typography>
    </CardContent>
    <CardActions>
        <Link href="/contribute">
      <Button size="small" color="primary">
        Contribute
      </Button>
      </Link>
    </CardActions>
  </Card>
);

export default CampaignCard;
