import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Box, Typography, Card, CardContent, IconButton, TextField, Tabs, Tab } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LanguageIcon from '@mui/icons-material/Language';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useNavigate } from 'react-router-dom';
import Chart from './PieChart';
import MilestonesPage from './MilestonePage';
import dayjs from 'dayjs';
import './RewardsBreakdown.css'

// const initialTransactions = [
//     { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "shopping" },
//   { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "shopping" },
//   { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "shopping" },
//   { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "shopping" },

//   { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "flight" },
//   { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "flight" },
//   { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "flight" },

//   { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
//   { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
//   { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
//   { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
//   { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
// ];

// Theme colors
const themeColors = {
  primary: '#008500',
  primaryLight: '#e6f2e6',
  primaryMedium: '#5db75d',
  primaryDark: '#006800'
};

const getDaysAgo = (dateString) => {
  try {
    const transactionDate = dayjs(dateString);
    const today = dayjs();
    const daysAgo = today.diff(transactionDate, 'day');
    
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    return `${daysAgo} days ago`;
  } catch (error) {
    return '';
  }
};

const getCategoryIcon = (category) => {
  switch(category) {
    case "Food & Dining":
      return <FastfoodIcon sx={{ color: themeColors.primaryMedium }} />;
    case "Auto & Transport":
      return <DirectionsCarIcon sx={{ color: themeColors.primaryMedium }} />;
    default:
      return <LanguageIcon sx={{ color: themeColors.primaryMedium }} />;
  }
};

export default function RewardsBreakdown({ onBack }) {
  const [transactions, setTransactions] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPoints, setTotalPoints] = useState(
    transactions.reduce((acc, curr) => acc + Number(curr.earned_points || 0), 0)
  );
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/');
    };
    const numericId = "3650546107940865";
    useEffect(() => {
      const fetchRewardPoints = async () => {
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:5001/cardgenie/reward_points", { numericId });
          setTransactions(response.data.transactions);
        } catch (error) {
          setError("Error fetching reward points.");
        } finally {
          setLoading(false);
        }
      };
  
      if (numericId) fetchRewardPoints();
    }, [numericId]);

    useEffect(() => {
      const sum = transactions.reduce(
        (acc, t) => acc + Number(t.earned_points || 0),
        0
      );
      setTotalPoints(sum.toFixed(0));
    }, [transactions]);
  
    const handlePointChange = (index, value) => {
        const updatedTransactions = [...transactions];
        updatedTransactions[index].earned_points = parseInt(value) || 0;
        setTransactions(updatedTransactions);
        setTotalPoints((updatedTransactions.reduce((acc, curr) => acc + Number(curr.earned_points).toFixed(0), 0)));
      };
    
      const getCategoryData = () => {
        const categoryMap = {};
        transactions.forEach(({ transaction_category, earned_points }) => {
          categoryMap[transaction_category] =
            (categoryMap[transaction_category] || 0) + Number(earned_points || 0);
        });
      
        // round to whole points (or use .toFixed(2) for two decimals)
        return Object.entries(categoryMap).map(([name, value]) => ({
          name,
          value: Math.round(value),          // <-- round off here
        }));
      };
        

    let chartProps = getCategoryData();
    console.log(chartProps);

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={handleBackButton}><ArrowBackIcon /></IconButton>
        <Typography variant="h6" fontWeight="bold" ml={1}>Cards</Typography>
      </Box>

      <MilestonesPage  numericId="3650546107940865"/>

      <Box display="flex" alignItems="center" gap={2}>
        <DonutLargeIcon sx={{ fontSize: 40, color: '#008500' }} />
        <Box>
          <Typography fontWeight="bold" variant="h6">Rewards Earned</Typography>
          <Typography fontStyle="italic" color="text.secondary">Total Rewards Category</Typography>
        </Box>
      </Box>

        <Chart id='chart'  chartProps={chartProps} />

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">Past Transactions with Estimated Rewards Points</Typography>
          <Typography fontStyle="italic" mt={1}>Total Rewards</Typography>
          <Typography variant="h5" fontStyle="italic" color="#008500" mb={2}>{totalPoints}</Typography>

          {transactions.map((transaction, index) => (
            <Box display="flex" alignItems="center" gap={1} className="transaction_tile">
                        {getCategoryIcon(transaction.transaction_category)}
                        <Box>
                          <Typography fontWeight="medium">{transaction.transaction_card_name}</Typography>
                          <Typography variant="caption">${transaction.transaction_value.toFixed(2)} • {transaction.transaction_category}</Typography>
                        </Box>

                      <Box display="flex" flexDirection="column" alignItems="flex-end">
                      <TextField
                          value={Number(transaction.earned_points).toFixed(0)}
                          onChange={(e) => handlePointChange(index, e.target.value)}
                          className="input_points"
                          type="number"
                          size="large"
                          InputProps={{
                            endAdornment: <Typography sx={{ color: 'green', ml: 1 }}>points</Typography>
                          }}
                          sx={{ width: 150 }}
                         />
                        <Typography variant="caption" color="text.secondary">{getDaysAgo(transaction.transaction_timestamp)}</Typography>
                      </Box>

             
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
