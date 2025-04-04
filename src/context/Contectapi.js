import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [couponCode, setCouponCode] = useState(null);

  const login = (email) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setUserEmail(null);
    setCouponCode(null);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('couponCode');
  };

  const setCoupon = (code) => {
    setCouponCode(code);
    localStorage.setItem('couponCode', code);
  };

  // Load values from localStorage when the app starts
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedCoupon = localStorage.getItem('couponCode');

    if (storedEmail) setUserEmail(storedEmail);
    if (storedCoupon) setCouponCode(storedCoupon);
  }, []);

  return (
    <AuthContext.Provider value={{ userEmail, couponCode, login, logout, setCoupon }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
