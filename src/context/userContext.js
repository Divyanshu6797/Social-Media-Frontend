import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jsonwebtoken';

// Create a context
const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [contextUserId, setContextUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setContextUserId(decodedToken.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ contextUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider
