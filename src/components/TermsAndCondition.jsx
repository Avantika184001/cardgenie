import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { useNavigate } from 'react-router-dom';


export default function TermsAndCondition({ onBack }) {

  const navigate = useNavigate();
  const handleBackButton = () => {
      navigate('/');
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>

      <Box display="flex" alignItems="center" gap={2}>
        <DonutLargeIcon sx={{ fontSize: 40, color: '#008500' }} />
        <Box>
          <Typography fontWeight="bold" variant="h6">Terms & Conditions</Typography>
        </Box>
      </Box>
   </Box>
  );
}
