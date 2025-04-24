import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, IconButton, TextField, Tabs, Tab } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import LanguageIcon from '@mui/icons-material/Language';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useNavigate } from 'react-router-dom';
import Chart from './PieChart';
import MilestonesPage from './MilestonePage';

const initialTransactions = [
    { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "shopping" },
  { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "shopping" },
  { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "shopping" },
  { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "shopping" },

  { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "flight" },
  { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "flight" },
  { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "flight" },

  { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
  { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
  { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
  { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
  { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100, category: "retail" },
];


export default function RewardsBreakdown({ onBack }) {
    const [tabValue, setTabValue] = React.useState(0); 
    const [transactions, setTransactions] = useState(initialTransactions);
    const [totalPoints, setTotalPoints] = useState(transactions.reduce((acc, curr) => acc + curr.points, 0));
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/');
    };
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

          {transactions.map((tx, index) => (
            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                {tx.icon}
                <Box>
                  <Typography fontWeight="medium">{tx.id}</Typography>
                  <Typography variant="caption">{tx.desc} &nbsp;&nbsp; {tx.amount}</Typography>
                </Box>
              </Box>
              <TextField
                value={tx.points}
                onChange={(e) => handlePointChange(index, e.target.value)}
                type="number"
                size="large"
                InputProps={{
                  endAdornment: <Typography sx={{ color: 'green', ml: 1 }}>points</Typography>
                }}
                sx={{ width: 150 }}
              />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
