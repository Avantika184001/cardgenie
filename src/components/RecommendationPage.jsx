import React, { useState, useEffect } from "react";
import { Card, CardContent, Box, Typography, IconButton, Collapse, CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import dayjs from 'dayjs';
import axios from 'axios';

const API_BASE = "http://127.0.0.1:5001/cardgenie";
const NUMERICID1 = "3650546107940865"
const NUMERICID2 = "8029402705166337"
const NUMERICID3 = "11474069555773441"

const NUMERICID = NUMERICID3

// Theme colors
const themeColors = {
  primary: '#008500',
  primaryLight: '#e6f2e6',
  primaryMedium: '#5db75d',
  primaryDark: '#006800'
};

// Helper function to get the appropriate icon based on transaction category
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

// Helper function to format date using dayjs
const formatDate = (dateString) => {
  try {
    return dayjs(dateString).format('MMM DD, YYYY h:mm A');
  } catch (error) {
    return dateString;
  }
};

// Helper function to calculate days ago
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

// Transaction Tile Component
const TransactionTile = ({ transaction }) => {
  const [expanded, setExpanded] = useState(false);
  const pointsDifference = transaction.potential_reward_points - transaction.actual_reward_points;
  const daysAgo = getDaysAgo(transaction.transaction_timestamp);
  
  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent sx={{ p: 2, pb: 2, "&:last-child": { pb: 2 } }}>
        {/* Collapsed view */}
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          onClick={() => setExpanded(!expanded)}
          sx={{ cursor: 'pointer', position: 'relative' }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            {getCategoryIcon(transaction.transaction_category)}
            <Box>
              <Typography fontWeight="medium">{transaction.transaction_card_name}</Typography>
              <Typography variant="caption">${transaction.transaction_value.toFixed(2)} • {transaction.transaction_category}</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography>+{transaction.actual_reward_points} points</Typography>
            <Typography variant="caption" color="text.secondary">{daysAgo}</Typography>
          </Box>
          {/* Tiny dropdown icon to indicate expandability */}
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: -8, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              color: themeColors.primaryMedium,
              fontSize: '12px'
            }}
          >
            {expanded ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
          </Box>
        </Box>
        
        {/* Expanded view */}
        <Collapse in={expanded}>
          <Box mt={2} p={1} sx={{ backgroundColor: themeColors.primaryLight, borderRadius: 1 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <DateRangeIcon fontSize="small" color="action" />
              <Typography variant="body2">{formatDate(transaction.transaction_timestamp)}</Typography>
            </Box>
            
            <Box sx={{ p: 1, backgroundColor: '#fff', borderRadius: 1, mb: 1, border: `1px solid ${themeColors.primaryLight}` }}>
              <Typography variant="subtitle2" fontWeight="bold" color={themeColors.primary}>
                Optimization Opportunity
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <CompareArrowsIcon fontSize="small" sx={{ color: themeColors.primary }} />
                <Typography variant="body2">
                  You could have earned <strong>{pointsDifference} more points</strong> using:
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={1} ml={3}>
                <CreditCardIcon fontSize="small" sx={{ color: themeColors.primary }} />
                <Typography variant="body2">
                  {transaction.optimal_card_name}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1} ml={3}>
                <Typography variant="body2">
                  Potential rewards:
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ color: themeColors.primaryDark }}>
                  {transaction.potential_reward_points} points
                </Typography>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

// Empty state component when there are no wrong transactions
const EmptyState = ({ numericId, navigate }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, mt: 2, p: 3, textAlign: 'center' }}>

      <Typography variant="body1" sx={{ mt: 1 }}>
        For better card suggestions try using "Find a card" feature.
      </Typography>


      {numericId === NUMERICID3 && (
        <Box mt={3}>
          <IconButton
            onClick={() => navigate('/findacard')}
            sx={{
              backgroundColor: themeColors.primary,
              color: '#fff',
              '&:hover': { backgroundColor: themeColors.primaryDark },
              px: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="button">Find A Card</Typography>
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

// Error state component when API call fails
const ErrorState = ({ onRetry }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, mt: 2, p: 3, textAlign: 'center' }}>
      <ErrorOutlineIcon sx={{ fontSize: 60, color: '#d32f2f', mb: 2 }} />
      <Typography variant="h6" fontWeight="bold">
        Something went wrong
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        We couldn't load your card recommendations at this time.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <IconButton 
          onClick={onRetry}
          sx={{ 
            backgroundColor: themeColors.primary, 
            color: '#fff',
            '&:hover': { backgroundColor: themeColors.primaryDark }
          }}
        >
          <Typography variant="button" sx={{ px: 2 }}>Try Again</Typography>
        </IconButton>
      </Box>
    </Card>
  );
};

export default function RecommendationPage({ onBack }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const numericId = NUMERICID;
  
  const fetchRecommendations = async () => {
    setLoading(true);
    setError(false);
    
    try {
      const response = await axios.post(`${API_BASE}/card_recommendation`, { numericId });
      
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(true);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRecommendations();
  }, []);
  
  const handleBackButton = () => {
    navigate('/');
  };

  // Calculate total missed points if data is available
  const totalMissedPoints = data?.wrong_transactions?.reduce(
    (sum, tx) => sum + (tx.potential_reward_points - tx.actual_reward_points), 
    0
  ) || 0;

  // Sort transactions from most recent to oldest if data is available
  const sortedTransactions = data?.wrong_transactions ? 
    [...data.wrong_transactions].sort((a, b) => {
      return dayjs(b.transaction_timestamp).valueOf() - dayjs(a.transaction_timestamp).valueOf();
    }) : [];

  const hasWrongTransactions = sortedTransactions.length > 0;

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={handleBackButton}><ArrowBackIcon /></IconButton>
        <Typography variant="h6" fontWeight="bold" ml={1}>Cards</Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <DonutLargeIcon sx={{ fontSize: 40, color: themeColors.primary }} />
        <Box>
          <Typography fontWeight="bold" variant="h6">Cards Recommendations & Tips</Typography>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: themeColors.primary }} />
        </Box>
      ) : error ? (
        <ErrorState onRetry={fetchRecommendations} />
      ) : (
        <>
          <Card variant="outlined" sx={{ borderRadius: 2, mt: 3, mb: 3, backgroundColor: themeColors.primaryLight }}>
            <CardContent>
              <Typography fontWeight="bold" variant="body1">
                {data.recommendation_text}
              </Typography>
              {hasWrongTransactions && (
                <Typography variant="body2" fontStyle="italic" mt={1} sx={{ color: themeColors.primaryDark }}>
                  You missed out on approximately {totalMissedPoints} points in your recent transactions.
                </Typography>
              )}
            </CardContent>
          </Card>

          {hasWrongTransactions ? (
            <>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
                Transactions with Missed Rewards ({sortedTransactions.length})
              </Typography>

              {sortedTransactions.map((transaction, index) => (
                <TransactionTile key={transaction.transaction_id || index} transaction={transaction} />
              ))}
            </>
          ) : (
            <EmptyState numericId={numericId} navigate={navigate} />

          )} 
        </>
      )}
    </Box>
  );
}