import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, IconButton, TextField, Divider, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LanguageIcon from '@mui/icons-material/Language';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate, useLocation } from 'react-router-dom';
import Chart from './PieChart';
import MilestonesPage from './MilestonePage';
import dayjs from 'dayjs';
import './RewardsBreakdown.css'
import axios from "axios";

const API_BASE = "http://127.0.0.1:5001/cardgenie";
const NUMERICID1 = "3650546107940865"
const NUMERICID2 = "8029402705166337"
const NUMERICID3 = "11474069555773441"

const NUMERICID = NUMERICID2

// Theme colors
const themeColors = {
  primary: '#008500',
  primaryLight: '#e6f2e6',
  primaryMedium: '#5db75d',
  primaryDark: '#006800'
};

// Helper functions
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
    case "Shopping":
      return <ShoppingBagIcon sx={{ color: themeColors.primaryMedium }} />;
    case "Bills & Utilities":
      return <HomeIcon sx={{ color: themeColors.primaryMedium }} />;
    case "Groceries":
      return <ShoppingBagIcon sx={{ color: themeColors.primaryMedium }} />;
    default:
      return <LanguageIcon sx={{ color: themeColors.primaryMedium }} />;
  }
};



export default function RewardsBreakdown() {

  const location = useLocation();
  const cardName = location.state?.cardName || '';
  
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const numericId = NUMERICID;
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [availableCategories, setAvailableCategories] = useState(['All']);
  
  // Fetch transaction data
  useEffect(() => {
    if (!numericId) return;    
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE}/reward_points`, { numericId });
        const data = await response.data;
        console.log(data);
        if (data?.transactions) {
          const filtered = data.transactions.filter(
            txn => txn.transaction_card_name === cardName
          );
          setTransactions(filtered);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transaction data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, [numericId]);
  
  // Update available categories when transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      const categories = ['All', ...new Set(transactions.map(t => t.transaction_category))];
      setAvailableCategories(categories);
    }
  }, [transactions]);
  
  // Calculate total points
  const calculateTotalPoints = () => {
    return Math.round(transactions.reduce((total, transaction) => 
      total + (parseFloat(transaction.earned_points) || 0), 0));
  };
  
  // Handle navigation
  const handleBackButton = () => {
    navigate('/');
  };
  
  // Handle point changes
  const handlePointChange = (index, value) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index].earned_points = parseFloat(value) || 0;
    setTransactions(updatedTransactions);
  };


  const getCategoryData = () => {
    const categoryMap = {};
    if (!transactions && transactions.length === 0) {
      return [];
    }
  
    // Sum up points by category
    transactions.forEach(transaction => {
      const category = transaction.transaction_category;
      const points = parseFloat(transaction.earned_points) || 0;
      
      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }
      
      categoryMap[category] += points;
    });
    
    // Convert to array of objects for sorting
    let categoryArray = Object.entries(categoryMap).map(([name, value]) => ({ 
      name, 
      value: Math.round(value) 
    }));
    
    // Sort by value in descending order
    categoryArray.sort((a, b) => b.value - a.value);
    
    // Take top 5 categories
    const topCategories = categoryArray.slice(0, 5);
    
    // Sum up the rest into "Others" if there are more than 5 categories
    if (categoryArray.length > 5) {
      const othersValue = categoryArray
        .slice(5)
        .reduce((sum, category) => sum + category.value, 0);
      
      topCategories.push({
        name: "Others",
        value: othersValue
      });
    }
    
    return topCategories;
  };
  

  // Filter transactions based on selected category
  const getFilteredTransactions = () => {
    if (categoryFilter === 'All') return transactions;
    return transactions.filter(t => t.transaction_category === categoryFilter);
  };

  if (loading) {
    return (
      <Box sx={{ p: 2, maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
        <Typography>Loading rewards data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <IconButton onClick={handleBackButton} sx={{ mt: 2 }}>
          <ArrowBackIcon /> Back
        </IconButton>
      </Box>
    );
  }

  const chartData = getCategoryData();
  const totalPointsValue = calculateTotalPoints();
  const filteredTransactions = getFilteredTransactions();

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBackButton}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" ml={1}>Cards</Typography>
      </Box>

      {/* Milestones Section */}
      <Box mb={4}>
        <MilestonesPage numericId={numericId} cardName={cardName}/>
      </Box>

      {/* Rewards Earned Section */}
      <Card variant="outlined" sx={{ borderRadius: 2, mb: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <DonutLargeIcon sx={{ fontSize: 40, color: themeColors.primary }} />
            <Box>
              <Typography fontWeight="bold" variant="h7">Rewards Earned</Typography>
              <Typography color="text.secondary">Total Rewards by Category</Typography>
            </Box>
          </Box>
          
          {chartData.length > 0 ? (
            <Box sx={{ mb: 0 }}>
              <Chart id='category-chart' chartProps={chartData} className="donut_chart"/>
            </Box>
          ) : (
            <Box sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">No category data available</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Transactions Section */}
      <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Typography variant="h7" fontWeight="bold" mb={1.1}>Past Transactions with Rewards Points</Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography color="text.secondary">Total Rewards</Typography>
            <Typography variant="h5" fontWeight="medium" color={themeColors.primary}>
              {totalPointsValue} points
            </Typography>
          </Box>
          
          {/* Category Filter */}
          <Box sx={{ mb: 0.5 }}>
            <FormControl size="small" fullWidth>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterListIcon fontSize="small" color="action" />
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  displayEmpty
                  sx={{ flex: 1, fontSize: '0.9rem' }}
                >
                  {availableCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Box>
          
          <Typography variant="caption" color="text.secondary" display="block" mb={0.5} sx={{ fontStyle: 'italic' }}>
            Points are editable. Feel free to adjust if our calculations don't match your records.
          </Typography>
          
          <Divider sx={{ mb: 2 }} />
          
          {filteredTransactions.length > 0 ? (
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {filteredTransactions.map((transaction, index) => (
                <Box 
                  key={transaction.transaction_id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    borderBottom: index < filteredTransactions.length - 1 ? '1px solid #eee' : 'none'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
                    <Box sx={{ mr: 2 }}>
                      {getCategoryIcon(transaction.transaction_category)}
                    </Box>
                    
                    <Box>
                      <Typography fontWeight="medium" className='card_name'>
                        {transaction.transaction_card_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ${transaction.transaction_value.toFixed(2)} • {transaction.transaction_category}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {getDaysAgo(transaction.transaction_timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ flex: 1, maxWidth: '30%' }}>
                    <TextField
                      value={Math.round(transaction.earned_points)}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      type="number"
                      size="small"
                      InputProps={{
                        endAdornment: <Typography sx={{ color: themeColors.primary, fontSize: '0.75rem', ml: 0.5 }}>pts</Typography>,
                        sx: { fontSize: '0.9rem' }
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                {categoryFilter === 'All' ? 'No transaction data available' : 'No transactions in this category'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}