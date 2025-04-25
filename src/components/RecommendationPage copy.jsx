import React from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

const api_data = {"recommendation_text":"In the last 7 days, you did 26 transactions out of those 9 were of Food & Dining, if you choose Food & Dining as your customized category in Bank of America Customized Cash Rewards credit card, you could have earned 150 more points by using your Bank of America Customized Cash Rewards credit card instead of Amazon Prime Visa on Food & Dining categories. Below are the details",
  "wrong_transactions":[
    {"actual_reward_points":87,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":130,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f688-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-14 14:57:51+00:00","transaction_value":43.28},
    {"actual_reward_points":9,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":14,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"c335c981-1ddf-11f0-af25-4eb079146a67","transaction_timestamp":"2025-04-17 14:13:42+00:00","transaction_value":4.61},
    {"actual_reward_points":82,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":123,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Auto & Transport","transaction_id":"8ff8f682-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:24+00:00","transaction_value":41.0},
    {"actual_reward_points":9,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":14,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f690-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-16 14:20:35+00:00","transaction_value":4.61},
    {"actual_reward_points":27,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":41,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"9518c3d4-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-07 07:00:00+00:00","transaction_value":13.58},
    {"actual_reward_points":20,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":30,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"9518c3d7-16e7-11f0-a49d-e2e2d70a8c5c","transaction_timestamp":"2025-04-10 07:00:00+00:00","transaction_value":9.88},
    {"actual_reward_points":20,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":30,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f683-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:30+00:00","transaction_value":9.88},
    {"actual_reward_points":11,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":17,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f684-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-13 17:04:25+00:00","transaction_value":5.54},
    {"actual_reward_points":11,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":16,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"c335c980-1ddf-11f0-af25-4eb079146a67","transaction_timestamp":"2025-04-17 14:13:43+00:00","transaction_value":5.48},
    {"actual_reward_points":22,"optimal_card_name":"Bank of America Customized Cash Rewards credit card","potential_reward_points":33,"transaction_card_name":"Amazon Prime Visa","transaction_category":"Food & Dining","transaction_id":"8ff8f68e-1bd4-11f0-b183-425f734d1f44","transaction_timestamp":"2025-04-15 14:29:04+00:00","transaction_value":11.05}]}


export default function RecommendationPage({ onBack }) {
    // const transactions = [
    //     { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <LanguageIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <StoreIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <ShoppingBagIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //     { icon: <FlightTakeoffIcon />, id: "<<TransactionID>>", desc: "xyz", amount: "<<amount>>", points: 100 },
    //   ];
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
            {api_data['recommendation_text']}
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
