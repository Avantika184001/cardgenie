import React from "react";
import { Card, CardContent, Typography, Button, Tabs, Tab, Box, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const creditCards = [
  {
    name: "Spiderman CARD",
    number: "1234 5678 9101 XXXX",
    owner: "Mona Lisa",
  },
  {
    name: "Black Panther CARD",
    number: "1234 5678 9101 XXXX",
    owner: "Mona Lisa",
  },
  {
    name: "Thor CARD",
    number: "1234 5678 9101 XXXX",
    owner: "Mona Lisa",
  },
];

export default function MaximiseRewards() {
  const [tabValue, setTabValue] = React.useState(2); 
  const navigate = useNavigate();
  const handleShowRewards = () => {
  navigate('/rewards');
  };
  
  const handleTermsAndCondition = () => {
    navigate('/t&c');
    };

const handleRecommendationPage = () => {
        navigate('recommendations');
        };

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">Cards</Typography>
        <Box display="flex" gap={1}>
          <IconButton><NotificationsIcon /></IconButton>
          <IconButton><SearchIcon /></IconButton>
          <IconButton><MoreVertIcon /></IconButton>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="fullWidth"
        sx={{ mt: 2 }}
      >
        <Tab label="Cards" />
        <Tab label="Find a card" />
        <Tab label="Maximise Rewards" sx={tabValue === 2 ? {fontWeight: 'bold' } : {}} />
      </Tabs>

      <Box variant="outlined" sx={{ borderColor: 'green', p: 2, borderRadius: 2, mt: 2 }}>
        <Typography fontWeight="bold" variant="body2">
          Don't miss out on the chance to take full advantage of your rewards!
        </Typography>
        <Button variant="outlined" size="small" borderRadius="50%" 
                sx={{ mt: 1, color: '#008500', borderColor: '#008500', 
                borderRadius: '50' }} onClick={handleRecommendationPage}>
          💰 Click here to learn more!
        </Button>
      </Box>

      <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Your Credit Cards</Typography>

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {creditCards.map((card, index) => (
          <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="medium">{card.name}</Typography>
                <Button variant="caption" color="text.secondary" onClick={handleTermsAndCondition}>Show T&Cs</Button>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 1 }}>{card.number}</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography variant="body2" color="text.secondary">{card.owner}</Typography>
                <Button size="small" sx={{ color: '#008500' }} onClick={handleShowRewards} >Show Rewards &gt;</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
