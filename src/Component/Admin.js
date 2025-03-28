import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiBell, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminHeader = () => {
    const [name, setName] = useState('John Doe');
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchAdminData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/admin/name");
                setName(res.data.name || 'John Doe');
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log("Searching for:", searchQuery);
    };

    return (
        <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left side - Logo/Brand can go here */}
                <div className="flex items-center">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-xl font-bold text-gray-800"
                    >
                        ReferralAI
                    </motion.div>
                </div>

                {/* Right side - Admin controls */}
                <div className="flex items-center space-x-6">
                    {/* Search Bar - Hidden on mobile, shown on md+ */}
                    <motion.form 
                        onSubmit={handleSearch}
                        className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2"
                        whileHover={{ scale: 1.02 }}
                    >
                        <FiSearch className="text-gray-500 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none focus:outline-none w-40 lg:w-64"
                        />
                    </motion.form>

                    {/* Notification Bell */}
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                    >
                        <FiBell className="text-xl" />
                        <motion.span 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
                        ></motion.span>
                    </motion.button>

                    {/* Admin Profile */}
                    <motion.div 
                        className="relative flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            {name ? name.charAt(0) : 'J'}
                        </div>
                        <div className="hidden md:block">
                            <div className="text-sm font-medium text-gray-800">
                                {isLoading ? (
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        Loading...
                                    </motion.div>
                                ) : (
                                    name
                                )}
                            </div>
                            <div className="text-xs text-gray-500">Admin</div>
                        </div>
                        <motion.button 
                            whileTap={{ rotate: 180 }}
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FiChevronDown className={`text-lg transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                        </motion.button>

                        {/* Dropdown menu */}
                        {showDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
                            >
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
};

export default AdminHeader;