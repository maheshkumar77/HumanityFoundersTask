import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ReferralDashboard from './Page3';
import FollowUps from './Page1';
import Navbar from './Navbar';
import ReferralCampaigns from './Page4';
import CreateCampaign from './Page5';
import CustomersDashboard from './Page2';
import AdminHeader from './Admin';
import UpdateCampaign from './Updatecamp';
import ChangeCampaign from './Changecamp';
import Register from './Register';
import Login from './Login';
import ReferralHubAI from './ReferralHubAI';

const Restpages = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar/Navbar */}
      <div className="w-64 bg-white shadow-md p-4 hidden md:block">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Admin Header - Always Visible */}
        <AdminHeader />

        {/* Page Content - Scrollable */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />  {/* This will render the child components dynamically */}
        </div>
      </div>
    </div>
  );
};

export default Restpages;
