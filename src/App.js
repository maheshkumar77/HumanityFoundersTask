import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReferralDashboard from './Component/Page3';
import FollowUps from './Component/Page1';
import Navbar from './Component/Navbar';
import ReferralCampaigns from './Component/Page4';
import CreateCampaign from './Component/Page5';
import CustomersDashboard from './Component/Page2';
import AdminHeader from './Component/Admin';
import UpdateCampaign from './Component/Updatecamp';
import ChangeCampaign from './Component/Changecamp';
import Register from './Component/Register';
import Login from './Component/Login';
import ReferralHubAI from './Component/ReferralHubAI';
import HeroPage from './Component/Hero';

const App = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen w-full bg-gray-50'>
      {/* Sidebar - Hidden on mobile, shown on medium screens and up */}
      <div className='w-full md:w-64 bg-white shadow-md p-4 hidden md:block'>
        <Navbar/>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Admin Header - Visible on all screens */}
        <AdminHeader/>

        {/* Page Content - Scrollable area */}
        <div className='flex-1 overflow-auto p-4 md:p-6'>
          <Routes>
            <Route path='/dashboard' element={<ReferralDashboard/>}/>
            <Route path="/campaigns" element={<ReferralCampaigns/>}/>
            <Route path='/follow-ups' element={<FollowUps/>}/>
            <Route path='/integrations' element={<CreateCampaign/>}/>
            <Route path='/customers' element={<CustomersDashboard/>}/>
            <Route path='/update/:campaignId' element={<UpdateCampaign />} />
            <Route path='/change/:campaignId' element={<ChangeCampaign/>} />
            <Route path="/register"  element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/ai' element={<ReferralHubAI/>}/>
            <Route path='/' element={<HeroPage/>}/>
       
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;