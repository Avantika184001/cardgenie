import React, {useEffect, useState} from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Tabs, Tab, Box, IconButton, Dialog, Slide } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TermsAndCondition from "./TermsAndCondition";
import { useNavigate } from 'react-router-dom';
import './MaximiseRewards.css'

const API_BASE = "http://127.0.0.1:5001/cardgenie";
const NUMERICID1 = "3650546107940865"
const NUMERICID2 = "8029402705166337"
const NUMERICID3 = "11474069555773441"

const NUMERICID = NUMERICID1

const creditCards = [
  {
    name: "Bank of America Customized Cash Rewards Credit Card",
    number: "1234 5678 9101 XXXX",
    owner: "Mona Lisa",
    card_type: "Reward Card"
  },
  {
    name: "Capital One Platinum Credit Card",
    number: "1234 5678 9101 XXXX",
    owner: "Mona Lisa",
    card_type: "Reward Card"

  },
  {
    name: "Chase Sapphire Preferred",
    number: "1234 5678 9101 XXXX",
    owner: "Mona Lisa",
    card_type: "Reward Card"

  }
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function MaximiseRewards() {
  const [tabValue, setTabValue] = React.useState(2); 
  const [openDialog, setOpenDialog] = React.useState(false);
  const [current_cc, setCC] = React.useState("");
  const [cards, setCards] = useState(creditCards);          // ← replaces hard‑coded array
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const numericId = NUMERICID;

  const handleOpenDialog = (cc_name) => () => {
    console.log(cc_name)
    setCC(cc_name)
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setCC("")
    setOpenDialog(false);

  }

  useEffect(() => {
    if (!numericId) return;                        // wait till parent passes id
    const fetchCards = async () => {
      try {
        const res = await axios.post(`${API_BASE}/card_details`, { numericId });
        // API returns `card_name` & `card_type`
        const cc = res.data.card_details.map((c) => ({
          name: c.card_name,
          number: "XXXX‑XXXX‑XXXX‑XXXX",        
          owner: "Donald Trump",                  
          card_type: c.card_type,
        }));
        setCards(cc);
      } catch (e) {
        console.error(e);
        setErr("Failed to load card details");
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [numericId]);

  const navigate = useNavigate();
  const handleShowRewards = () => {
  navigate('/rewards');
  };
  
  const handleTermsAndCondition = () => {
    navigate('/t&c');
    };
  console.log(current_cc)

const handleRecommendationPage = () => {
        navigate('/recommendations');
        };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className='fixed header' style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white', // Add background color to avoid content showing through
        zIndex: 10,
        padding: '16px',
        width: '100%',
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">Cards</Typography>
          <Box display="flex" gap={1}>
            <IconButton><NotificationsIcon /></IconButton>
            <IconButton><SearchIcon /></IconButton>
            <IconButton><MoreVertIcon /></IconButton>
          </Box>
        </Box>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          sx={{ mt: 2 }}
        >
          <Tab label="Cards" />
          <Tab label="Find a card" />
          <Tab label="Maximise Rewards"/>
        </Tabs>
      </div>
      <div className='scorllable-body' style={{
        overflowY: 'auto',
        flex: 1,
        padding: '16px',
      }}>
        <Box variant="outlined" sx={{ p: 2, borderRadius: 2, mt: 2 }}>
          <Typography fontWeight="bold" fontSize={25} variant="body2">
            Don't miss out on the chance to take full advantage of your rewards!
          </Typography>
          <Button variant="outlined" size="small" sx={{borderRadius:"200px !important",
            mt: 1, color: '#008500', borderColor: '#008500'}} onClick={handleRecommendationPage}>
            💰 Click here to have more insights!
          </Button>
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Your Credit Cards</Typography>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          {cards.map((card, index) => (
            <Card key={index} variant="outlined" sx={{ borderRadius: 2}}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="medium">{card.name}</Typography>
                  <Button variant="caption" color="text.secondary" onClick={handleOpenDialog(card.name)} className="tnc">Show T&Cs</Button>
                </Box>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 1 }}>{card.number}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                  <Typography variant="body2" color="text.secondary">{card.owner}</Typography>
                  <Button size="small" sx={{ color: '#008500' }} onClick={handleShowRewards} >Show Rewards &gt;</Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          fullWidth
          PaperProps={{ sx: { borderRadius: '16px 16px 0 0', position: 'absolute', bottom: 0, maxWidth:500 } }}

        >
          <Box sx={{ p: 0 }}>
            <TermsAndCondition cc_name={current_cc}/>
          </Box>
        </Dialog>
      </div>
    </Box>
  );
}
