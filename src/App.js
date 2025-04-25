import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MaximiseRewards from "./components/MaximiseRewards";
import RewardsBreakdown from "./components/RewardsBreakdown";
import TermsAndCondition from "./components/TermsAndCondition";
import RecommendationPage from "./components/RecommendationPage";
import FindACard from "./components/FindACard";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MaximiseRewards />} />
      <Route path="/rewards" element={<RewardsBreakdown />} />
      <Route path="/t&c" element={<TermsAndCondition />} />
      <Route path="/recommendations" element={<RecommendationPage />} />
      <Route path="/findacard" element={<FindACard />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
