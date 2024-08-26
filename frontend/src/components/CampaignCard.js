import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Link from 'next/link';

const CampaignCard = ({ campaign }) => (
  <Card
    sx={{
      maxWidth: {
        xs: '100%', // 100% width on extra-small screens
        sm: 345,    // 345px width on small screens and above
      },
      margin: '10px',
      backgroundColor: (theme) => theme.palette.background.paper,
    }}
  >
    <CardContent>
      <Typography gutterBottom variant="h6" component="div" color="primary">
        Campaign ID: {campaign.id}
      </Typography>
      <Typography variant="h6" component="div" color="primary">
        Funds Raised: {campaign.fundsRaised} ETH
      </Typography>
      <Typography variant="h6" component="div" color="primary">
        Funds Already Withdrawn: {campaign.fundsAlreadyWithdrawn} ETH
      </Typography>
      <Typography variant="h6" component="div" color="primary">
        Goal: {campaign.goal} ETH
      </Typography>
      <Typography variant="h6" component="div" color="primary">
        Completed: {campaign.completed ? 'Yes' : 'No'}
      </Typography>
    </CardContent>
    <CardActions>
      <Link href="/contribute" passHref>
        <Button size="small" color="secondary">
          Contribute
        </Button>
      </Link>
    </CardActions>
  </Card>
);

export default CampaignCard;
