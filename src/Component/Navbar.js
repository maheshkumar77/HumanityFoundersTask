import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white shadow-md p-4 hidden md:block"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6"
        >
          <NavLink 
            to="/ai" 
            className="text-xl font-bold p-2 rounded-lg hover:bg-gray-200 block"
          >
            Referral AI
          </NavLink>
        </motion.div>

        <nav>
          <ul className="space-y-3">
            {[
              { path: "/dashboard", name: "Dashboard" },
              { path: "/campaigns", name: "Campaigns" },
              { path: "/customers", name: "Customers" },
              { path: "/follow-ups", name: "Follow Ups" },
              { path: "/integrations", name: "Integrations" }
            ].map((item, index) => (
              <motion.li
                key={item.path}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `block p-2 rounded-lg hover:bg-gray-200 transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    </div>
  );
};

export default Navbar;