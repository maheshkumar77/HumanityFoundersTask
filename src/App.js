import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeroPage from './Component/Hero';
import AdminLogin from './Component/AdminLogin';
import Restpages from './Component/Restpages';
import ReferralDashboard from './Component/Page3';
import ReferralCampaigns from './Component/Page4';
import FollowUps from './Component/Page1';
import CreateCampaign from './Component/Page5';
import CustomersDashboard from './Component/Page2';
import UpdateCampaign from './Component/Updatecamp';
import ChangeCampaign from './Component/Changecamp';
import Register from './Component/Register';
import Login from './Component/Login';
import ReferralHubAI from './Component/ReferralHubAI';

const App = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Nested Routes Inside /adminpage */}
        <Route path="/adminpage" element={<Restpages />}>
          <Route path="dashboard" element={<ReferralDashboard />} />
          <Route path="campaigns" element={<ReferralCampaigns />} />
          <Route path="follow-ups" element={<FollowUps />} />
          <Route path="integrations" element={<CreateCampaign />} />
          <Route path="customers" element={<CustomersDashboard />} />
          <Route path="update/:campaignId" element={<UpdateCampaign />} />
          <Route path="change/:campaignId" element={<ChangeCampaign />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="ai" element={<ReferralHubAI />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
