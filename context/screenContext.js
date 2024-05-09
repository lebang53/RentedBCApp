import React, { createContext, useState } from 'react';

// 1. Tạo một Context
const ScreenContext = createContext();

// 2. Tạo một Provider
const ScreenProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [wishList, setMyWishList] = useState([]);
  return (
    <ScreenContext.Provider value={{ selectedTab, setSelectedTab, wishList, setMyWishList}}>
      {children}
    </ScreenContext.Provider>
  );
};

export { ScreenContext, ScreenProvider };

