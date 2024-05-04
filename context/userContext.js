import React, { createContext, useState } from 'react';

// 1. Tạo một Context
const UserContext = createContext();

// 2. Tạo một Provider
const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ userInfo,  setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
