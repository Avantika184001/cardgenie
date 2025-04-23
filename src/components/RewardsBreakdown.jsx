import React, { useRef, useEffect } from 'react'
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import LanguageIcon from '@mui/icons-material/Language';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useNavigate } from 'react-router-dom';
import Chart from './PieChart';


const transactions = [
  { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
  { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
  { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
  { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
];

export default function RewardsBreakdown({ onBack }) {
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
          <Typography fontWeight="bold" variant="h6">Rewards Earned</Typography>
          <Typography fontStyle="italic" color="text.secondary">Total Rewards Category</Typography>
        </Box>
      </Box>

        <Chart id='chart' />

      {/* <Box mt={3} mb={2}>
        <Typography variant="body2" fontWeight="medium">Travel</Typography>
        <Box width={100} height={100} borderRadius="50%" bgcolor="#e0f2f1" mx="auto" />
        <Typography variant="body2" fontWeight="medium" align="center">Retail</Typography>
      </Box>  */}

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">Past Transactions with Rewards Points</Typography>
          <Typography fontStyle="italic" mt={1}>Total Rewards</Typography>
          <Typography variant="h5" fontStyle="italic" color="#008500" mb={2}>1900 points</Typography>

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
