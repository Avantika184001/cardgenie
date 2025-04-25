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

const api_data = {"transactions":[{"earned_points":86.56,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f688-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-14 14:57:51+00:00","transaction_value":43.28},{"earned_points":9.22,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"c335c981-1ddf-11f0-af25-4eb079146a67","transaction_timestamp":"2025-04-17 14:13:42+00:00","transaction_value":4.61},{"earned_points":3.2799999999999994,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Groceries","transaction_id":"8ff8f687-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:27+00:00","transaction_value":1.64},{"earned_points":106.25,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Shopping","transaction_id":"8ff8f68c-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-15 14:29:08+00:00","transaction_value":21.25},{"earned_points":49.9,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Groceries","transaction_id":"9518c3d2-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-07 07:00:00+00:00","transaction_value":24.95},{"earned_points":13.700000000000001,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Shopping","transaction_id":"8ff8f686-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:28+00:00","transaction_value":2.74},{"earned_points":82.0,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Auto & Transport","transaction_id":"8ff8f682-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:24+00:00","transaction_value":41.0},{"earned_points":25.35,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Bills & Utilities","transaction_id":"8ff8f68b-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-15 14:29:07+00:00","transaction_value":25.35},{"earned_points":9.22,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f690-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-16 14:20:35+00:00","transaction_value":4.61},{"earned_points":48.8,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Groceries","transaction_id":"9518c3d3-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-07 07:00:00+00:00","transaction_value":24.4},{"earned_points":27.16,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"9518c3d4-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-07 07:00:00+00:00","transaction_value":13.58},{"earned_points":19.76,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"9518c3d7-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-10 07:00:00+00:00","transaction_value":9.88},{"earned_points":25.0,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Shopping","transaction_id":"8ff8f68f-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-15 14:29:05+00:00","transaction_value":5.0},{"earned_points":19.76,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f683-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:30+00:00","transaction_value":9.88},{"earned_points":11.080000000000002,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f684-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:25+00:00","transaction_value":5.54},{"earned_points":37.62,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Groceries","transaction_id":"9518c3d6-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-09 07:00:00+00:00","transaction_value":18.81},{"earned_points":126.6,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Groceries","transaction_id":"9518c3d1-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-07 07:00:00+00:00","transaction_value":63.3},{"earned_points":10.96,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"c335c980-1ddf-11f0-af25-4eb079146a67","transaction_timestamp":"2025-04-17 14:13:43+00:00","transaction_value":5.48},{"earned_points":5.5,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Bills & Utilities","transaction_id":"8ff8f689-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-14 14:57:50+00:00","transaction_value":5.5},{"earned_points":20.099999999999998,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Shopping","transaction_id":"8ff8f685-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:29+00:00","transaction_value":4.02},{"earned_points":208.9,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Shopping","transaction_id":"8ff8f68a-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-15 14:29:09+00:00","transaction_value":41.78},{"earned_points":70.2,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Bills & Utilities","transaction_id":"8ff8f681-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:26+00:00","transaction_value":70.2},{"earned_points":74.05000000000001,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Shopping","transaction_id":"9518c3d0-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-06 07:00:00+00:00","transaction_value":14.81},{"earned_points":99.3,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Groceries","transaction_id":"8ff8f680-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-11 16:45:21+00:00","transaction_value":49.65},{"earned_points":63.650000000000006,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Shopping","transaction_id":"8ff8f68d-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-15 14:29:06+00:00","transaction_value":12.73},{"earned_points":22.1,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f68e-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-15 14:29:04+00:00","transaction_value":11.05}]}


export default function RewardsBreakdown({ onBack }) {
  const [transactions, setTransactions] = useState(api_data["transactions"]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const [totalPoints, setTotalPoints] = useState(transactions.reduce((acc, curr) => acc + curr.points, 0));
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/');
    };
    // const numericId = "3650546107940865";
    // useEffect(() => {
    //   const fetchRewardPoints = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await axios.post("http://localhost:5001/cardgenie/reward_points", { numericId });
    //       setTransactions(response.data.transactions);
    //       console.log("transac: ",response.data.transactions);
    //     } catch (error) {
    //       setError("Error fetching reward points.");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   if (numericId) fetchRewardPoints();
    // }, [numericId]);
  

    const progress  = [{ name: "Progress", value: 75 }];
    const handlePointChange = (index, value) => {
        const updatedTransactions = [...transactions];
        updatedTransactions[index].points = parseInt(value) || 0;
        setTransactions(updatedTransactions);
        setTotalPoints(updatedTransactions.reduce((acc, curr) => acc + curr.points, 0));
      };
    
    const getCategoryData = () => {
        const categoryMap = {};
        transactions.forEach(({ category, points }) => {
            console.log("category: ", category);
          categoryMap[category] = (categoryMap[category] || 0) + points;
        });
        console.log(categoryMap)

        return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
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
          <Typography variant="h6" fontWeight="bold">Past Transactions with Rewards Points</Typography>
          <Typography fontStyle="italic" mt={1}>Total Rewards</Typography>
          <Typography variant="h5" fontStyle="italic" color="#008500" mb={2}>{totalPoints}</Typography>

          {transactions.map((transaction, index) => (
            <Box display="flex" alignItems="center" gap={1}>
                        {getCategoryIcon(transaction.transaction_category)}
                        <Box>
                          <Typography fontWeight="medium">{transaction.transaction_card_name}</Typography>
                          <Typography variant="caption">${transaction.transaction_value.toFixed(2)} • {transaction.transaction_category}</Typography>
                        </Box>

                      <Box display="flex" flexDirection="column" alignItems="flex-end">
                      <TextField
                value={transaction.earned_points}
                onChange={(e) => handlePointChange(index, e.target.value)}
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
