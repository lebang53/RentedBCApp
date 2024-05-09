import React, { createContext, useState } from 'react';

// 1. Tạo một Context
const UserContext = createContext();

// 2. Tạo một Provider
const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const logout = () => {
    setUserInfo(null);
  };

  const isAuthenticated = () => userInfo != null

  return (
    <UserContext.Provider value={{ userInfo,  setUserInfo , isAuthenticated, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
