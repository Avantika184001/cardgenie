import React from 'react';
import { Box, Typography, LinearProgress, Card, CardContent, Avatar, Chip, BottomNavigation, BottomNavigationAction } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { useNavigate } from 'react-router-dom';
import {IconButton} from '@mui/material';



const FindACard = () => {
      const navigate = useNavigate();
  const creditUsed = 1042;
  const creditLimit = 40700;
  const utilizationPercent = ((creditUsed / creditLimit) * 100).toFixed(0);

  const handleBackButton = () => {
    navigate('/');
  };

  const themeColors = {
    primary: '#008500',
    primaryLight: '#e6f2e6',
    primaryMedium: '#5db75d',
    primaryDark: '#006800'
  };

  return (

    <Box
      sx={{
        maxWidth: 430,
        margin: '0 auto',
        padding: 2,
        bgcolor: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box>
      <Box  alignItems="center" mb={2}>
    <IconButton onClick={handleBackButton}><ArrowBackIcon /></IconButton>
  </Box>
        <Typography variant="h6" fontWeight="bold" mb={1}>
         Find A Card
        </Typography>

        <Typography variant="body2">
          Nice! You're only using ${creditUsed.toLocaleString()} of your ${creditLimit.toLocaleString()}
        </Typography>

        <Box mt={2}>
          <Typography variant="caption" display="block">
            Balances vs total credit
          </Typography>
          <LinearProgress
            variant="determinate"
            value={utilizationPercent}
            sx={{ height: 8, borderRadius: 5, mt: 0.5 }}
          />
          <Typography variant="caption" mt={1}>
            {utilizationPercent}%
          </Typography>
        </Box>

        <Typography variant="body2" mt={2}>
          <strong>Maximize your score:</strong> Get a new card, keep old ones open and hold all balances under 30%.
        </Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <InfoOutlinedIcon fontSize="small" color="disabled" />
          <Typography variant="caption" ml={0.5} color="text.secondary">
            Advertiser disclosure & editorial note
          </Typography>
        </Box>

        <Typography variant="subtitle1" fontWeight="bold" mt={3}>
          Get a card to raise your ${creditLimit.toLocaleString()} credit limit
        </Typography>

        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant="rounded"
              src="https://www.capitalone.com/favicon.ico"
              alt="Capital One"
              sx={{ width: 60, height: 40, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle2" fontWeight="medium">
                Capital One Platinum Credit Card
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Your chance of approval is <strong>fair</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Chip icon={<AttachMoneyIcon />} label="Cash back" />
          <Chip icon={<CreditCardIcon />} label="No annual fee" />
          <Chip icon={<TravelExploreIcon />} label="Travel" />
          <Chip icon={<CreditScoreIcon />} label="See all" />
        </Box>
      </Box>

      <BottomNavigation showLabels sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #ccc' }}>
        <BottomNavigationAction label="For you" icon={<PersonIcon />} />
        <BottomNavigationAction label="Cards" icon={<CreditCardIcon />} />
        <BottomNavigationAction label="Loans" icon={<AccountBalanceWalletIcon />} />
        <BottomNavigationAction label="Insurance" icon={<ShieldIcon />} />
        <BottomNavigationAction label="Money" icon={<MonetizationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default FindACard;