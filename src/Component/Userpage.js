import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from './Usernavbar';
import UserHeader from '../user/Userad';


const Userpage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuButtonRef = useRef(null);

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-50 relative">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-64 bg-white shadow-md p-4 z-0">
          <UserNavbar isMobile={false} />
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          ref={menuButtonRef}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Mobile Navbar handles its own state */}
      {isMobile && <UserNavbar isMobile={true} />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden z-10 ">
       <UserHeader/>
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Userpage;