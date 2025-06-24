"use client";

import { createContext, useContext, useState } from "react";

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <AppContext.Provider value={{ isSidebarOpen, toggleSidebar, isCartOpen, toggleCart }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}