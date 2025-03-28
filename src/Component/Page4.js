import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReferralCampaigns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/campaign/data");
        setCampaigns(res.data);
      } catch (error) {
        setError("Error fetching campaign data");
        console.error(error);
      }
    };
    fetchCampaigns();
  }, []);

  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active').length;

  const handleCreateCampaign = () => {
    alert('Create new campaign functionality would go here');
  };

  const handleViewAnalytics = (campaignId) => {
    navigate(`/update/${campaignId}`);
  };

  const handleEditSettings = (campaignId) => {
    navigate(`/update/${campaignId}`);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.startDate) - new Date(a.startDate);
    } else if (sortOption === 'name') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Referral Campaigns</h1>
            <p className="text-gray-600 mt-1">{campaigns.length} Campaigns • {activeCampaigns} Active</p>
          </div>
          <button
            onClick={handleCreateCampaign}
            className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FiPlus className="mr-2" />
            Create Campaign
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-full md:w-1/2"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4 mb-8">
          {sortedCampaigns.length > 0 ? (
            sortedCampaigns.map((campaign) => (
              <div key={campaign._id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{campaign.title}</h2>
                    <p className="text-gray-500">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {campaign.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Reward Type</p>
                    <p className="font-bold text-lg">{campaign.rewardType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Reward Format</p>
                    <p className="font-bold text-lg">{campaign.rewardFormat}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Discount Value</p>
                    <p className="font-bold text-lg">{campaign.discountValue}%</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-blue-700">{campaign.campaignMessage}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleViewAnalytics(campaign._id)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
                  >
                    View Analytics
                  </button>
                  <button 
                    onClick={() => handleEditSettings(campaign._id)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
                  >
                    Edit Settings
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No campaigns found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralCampaigns;
