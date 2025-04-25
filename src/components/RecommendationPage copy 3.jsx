import React, { useState } from "react";
import { Card, CardContent, Box, Typography, IconButton, Collapse } from "@mui/material";
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
import dayjs from 'dayjs';

const api_data = {
  "recommendation_text": "In the last 7 days, you did 26 transactions out of those 9 were of Food & Dining, if you choose Food & Dining as your customized category in Bank of America Customized Cash Rewards credit card, you could have earned 150 more points by using your Bank of America Customized Cash Rewards credit card instead of Amazon Prime Visa on Food & Dining categories. Below are the details",
  "wrong_transactions": [
    {"actual_reward_points":87,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":130,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f688-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-14 14:57:51+00:00","transaction_value":43.28},
    {"actual_reward_points":9,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":14,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"c335c981-1ddf-11f0-af25-4eb079146a67","transaction_timestamp":"2025-04-17 14:13:42+00:00","transaction_value":4.61},
    {"actual_reward_points":82,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":123,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Auto & Transport","transaction_id":"8ff8f682-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:24+00:00","transaction_value":41.0},
    {"actual_reward_points":9,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":14,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f690-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-16 14:20:35+00:00","transaction_value":4.61},
    {"actual_reward_points":27,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":41,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"9518c3d4-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-07 07:00:00+00:00","transaction_value":13.58},
    {"actual_reward_points":20,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":30,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"9518c3d7-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-10 07:00:00+00:00","transaction_value":9.88},
    {"actual_reward_points":20,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":30,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f683-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:30+00:00","transaction_value":9.88},
    {"actual_reward_points":11,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":17,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f684-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:25+00:00","transaction_value":5.54},
    {"actual_reward_points":11,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":16,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"c335c980-1ddf-11f0-af25-4eb079146a67","transaction_timestamp":"2025-04-17 14:13:43+00:00","transaction_value":5.48},
    {"actual_reward_points":22,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":33,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f68e-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-15 14:29:04+00:00","transaction_value":11.05}
  ]
};

// Helper function to get the appropriate icon based on transaction category
const getCategoryIcon = (category) => {
  switch(category) {
    case "Food & Dining":
      return <FastfoodIcon />;
    case "Auto & Transport":
      return <DirectionsCarIcon />;
    default:
      return <LanguageIcon />;
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
          sx={{ cursor: 'pointer' }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            {getCategoryIcon(transaction.transaction_category)}
            <Box>
              <Typography fontWeight="medium">{transaction.transaction_card_name}</Typography>
              <Typography variant="caption">${transaction.transaction_value.toFixed(2)} • {transaction.transaction_category}</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography color="#008500">+{transaction.actual_reward_points} points</Typography>
            <Typography variant="caption" color="text.secondary">{daysAgo}</Typography>
          </Box>
        </Box>
        
        {/* Expanded view */}
        <Collapse in={expanded}>
          <Box mt={2} p={1} sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <DateRangeIcon fontSize="small" color="action" />
              <Typography variant="body2">{formatDate(transaction.transaction_timestamp)}</Typography>
            </Box>
            
            <Box sx={{ p: 1, backgroundColor: "#e3f2fd", borderRadius: 1, mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Optimization Opportunity
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <CompareArrowsIcon fontSize="small" color="primary" />
                <Typography variant="body2">
                  You could have earned <strong>{pointsDifference} more points</strong> using:
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={1} ml={3}>
                <CreditCardIcon fontSize="small" color="primary" />
                <Typography variant="body2">
                  {transaction.optimal_card_name}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1} ml={3}>
                <Typography variant="body2">
                  Potential rewards:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
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

export default function RecommendationPage({ onBack }) {
  const navigate = useNavigate();
  
  const handleBackButton = () => {
    navigate('/');
  };

  // Calculate total missed points
  const totalMissedPoints = api_data.wrong_transactions.reduce(
    (sum, tx) => sum + (tx.potential_reward_points - tx.actual_reward_points), 
    0
  );

  // Sort transactions from most recent to oldest
  const sortedTransactions = [...api_data.wrong_transactions].sort((a, b) => {
    return dayjs(b.transaction_timestamp).valueOf() - dayjs(a.transaction_timestamp).valueOf();
  });

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

      <Card variant="outlined" sx={{ borderRadius: 2, mt: 3, mb: 3, backgroundColor: "#f9f9f9" }}>
        <CardContent>
          <Typography fontWeight="bold" variant="body1">
            {api_data.recommendation_text}
          </Typography>
          <Typography variant="body2" fontStyle="italic" mt={1} color="primary">
            You missed out on approximately {totalMissedPoints} points in the last 7 days.
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
        Transactions with Missed Rewards ({api_data.wrong_transactions.length})
      </Typography>

      {sortedTransactions.map((transaction, index) => (
        <TransactionTile key={index} transaction={transaction} />
      ))}
    </Box>
  );
}