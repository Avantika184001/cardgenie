import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

const API_BASE = "http://127.0.0.1:5001/cardgenie";
const PERIODS = ["Monthly", "Quarterly", "Yearly"];


// ---------- helpers ------------------------------------------------
const calculateProgress = (required = 0, actual = 0) =>
  Math.min((actual / required) * 100, 100);

const MilestoneRow = ({ milestone, progress }) => (
  <Card variant="outlined" sx={{ mb: 2, borderRadius: 2, mt:2 }}>
    <CardContent>
      <Typography fontWeight="bold">{milestone.MileStone}</Typography>
      <Typography variant="body2" color="text.secondary">
        Target&nbsp;
        {milestone.Target?.toLocaleString()} – Reward:&nbsp;
        {milestone.MilestoneReward}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 12,
            borderRadius: 6,
            backgroundColor: "#eee",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#008500",
              borderRadius: 6,
            },
          }}
        />
      </Box>
    </CardContent>
  </Card>
);

// ------------------------------------------------------------------
export default function MilestonesPage({ numericId, cardName }) {
  const [tab, setTab] = useState("Monthly");
  const [cards, setCards] = useState([]);
  const [spends, setSpends] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ---------- read cache on first mount ---------------------------
  useEffect(() => {
    const cached = localStorage.getItem("cardgenie_data");
    if (cached) {
      const { cards, spends } = JSON.parse(cached);
      // setCards(cards);
      setSpends(spends);
      setLoading(false);
    }
  }, []);

  // ---------- fetch backend data ----------------------------------
  useEffect(() => {
    if (!numericId) return;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const [detailsRes, recRes, rewardRes] = await Promise.all([
          axios.post(`${API_BASE}/card_details`, { numericId }),
          axios.post(`${API_BASE}/card_recommendation`, { numericId }),
          axios.post(`${API_BASE}/reward_points`, { numericId }),
        ]);

       

        // ------- sample spend calc (replace with real logic) -------
        const totalSpendNow = rewardRes.data.transactions.reduce(
          (sum, t) => sum + parseFloat(t.transaction_value),
          0
        );

        const newSpends = {
          Monthly:  Number(((totalSpendNow / 12) * 10).toFixed(2)), // round to 2 dp
          Quarterly: Number(((totalSpendNow / 4)  * 10).toFixed(2)),
          Yearly:    Number((totalSpendNow        * 10).toFixed(2)),
        };

         // build card skeleton from details
         const cardsSkeleton = [
          {
            cardName: cardName ,
            Yearly: [
              { MileStone: "Spent $" + newSpends["Yearly"], Target: 10000, MilestoneReward: "$2,000 cashback" },
              { MileStone: "Spent $" + newSpends["Yearly"], Target: 30000, MilestoneReward: "$8,000 cashback" },
            ],
            Monthly: [
              { MileStone: "Spent $" + newSpends["Monthly"], Target: 1000, MilestoneReward: "$200 cashback" },
            ],
            Quarterly: [
              { MileStone: "Spent $" + newSpends["Quarterly"], Target: 2500, MilestoneReward: "$700 cashback" },
            ],
          }
          
        ];

        setCards(cardsSkeleton);
        setSpends(newSpends);

        localStorage.setItem(
          "cardgenie_data",
          JSON.stringify({ cards: cardsSkeleton, spends: newSpends })
        );
      } catch (e) {
        console.error(e);
        setErr("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [numericId]);

  // ---------- available tabs --------------------------------------
  const availablePeriods = PERIODS.filter((p) =>
    cards.some((c) => (c[p] || []).length > 0)
  );

  // ensure selected tab is valid (effect, not render!)
  useEffect(() => {
    if (availablePeriods.length && !availablePeriods.includes(tab)) {
      setTab(availablePeriods[0]);
    }
  }, [availablePeriods, tab]);

  // ---------- render states ---------------------------------------
  if (loading) return <CircularProgress />;
  if (err) return <Typography color="error">{err}</Typography>;

  return (
    <Box sx={{ p: 0 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        {availablePeriods.map((p) => (
          <Tab key={p} value={p} label={p.toUpperCase()} />
        ))}
      </Tabs>

      {cards.map((card) => (
        <Box key={card.cardName} sx={{ mt: 2 }}>
          <Typography variant="h7" fontWeight="medium" mb={3}>
            {card.cardName.toUpperCase()}
          </Typography>

          {(card[tab] || []).length ? (
            card[tab].map((m, idx) => (
              <MilestoneRow
                key={idx}
                milestone={m}
                
                progress={calculateProgress(m.Target, spends[tab] ?? 0)}
              />
            ))
          ) : null}
        </Box>
      ))}
    </Box>
  );
}