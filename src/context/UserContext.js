"use client";
import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);