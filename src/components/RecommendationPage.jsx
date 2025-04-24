import React from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'


export default function RecommendationPage({ onBack }) {
    const transactions = [
        { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
        { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
      ];
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/');
    };

  return (

    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>

      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={handleBackButton}><ArrowBackIcon /></IconButton>
        <Typography variant="h6" fontWeight="bold" ml={1}>Cards</Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <DonutLargeIcon sx={{ fontSize: 40, color: '#008500' }} />
        <Box>
          <Typography fontWeight="bold" variant="h6">Cards Recommendations & Tips</Typography>
        </Box>
      </Box>

      <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Card Recommendations & Tips</Typography>

      <Card variant="outlined" sx={{ borderRadius: 2, mt: 2 }}>
        <CardContent>
          <Typography fontWeight="bold" variant="body1">
            Out of 10 Transactions in last 3 weeks, you have made 7 right choices in choosing the CreditCards.
          </Typography>
          <Typography variant="body2" fontStyle="italic" mt={1}>
            Maximize your rewards by last 3 days report below.
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" gap={2} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">Past Transactions with Rewards Points</Typography>

          {transactions.map((tx, index) => (
            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                {tx.icon}
                <Box>
                  <Typography fontWeight="medium">{tx.id}</Typography>
                  <Typography variant="caption">{tx.desc} &nbsp;&nbsp; {tx.amount}</Typography>
                </Box>
              </Box>
              <Typography color="#008500">+{tx.points} points</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
   </Box>
  );
}
