
import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
  earningsBalance: number;
  savingsBalance: number;
  deductEarnings: (amount: number) => boolean;
  addSavings: (amount: number) => void;
  withdrawEarnings: (amount: number) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial Mock Balances
  const [earningsBalance, setEarningsBalance] = useState(150000);
  const [savingsBalance, setSavingsBalance] = useState(50000);

  const deductEarnings = (amount: number): boolean => {
    if (earningsBalance >= amount) {
      setEarningsBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addSavings = (amount: number) => {
    setSavingsBalance(prev => prev + amount);
  };

  const withdrawEarnings = (amount: number): boolean => {
      if (earningsBalance >= amount) {
          setEarningsBalance(prev => prev - amount);
          return true;
      }
      return false;
  };

  return (
    <WalletContext.Provider value={{
      earningsBalance,
      savingsBalance,
      deductEarnings,
      addSavings,
      withdrawEarnings
    }}>
      {children}
    </WalletContext.Provider>
  );
};
