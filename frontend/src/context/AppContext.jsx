import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  defaultUserData,
  availableUsers,
  defaultAccounts,
  defaultCards,
  defaultTransactions,
  defaultFavoriteContacts,
  defaultSpendingByCategory
} from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Load from localStorage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [currentUser, setCurrentUser] = useState(() => loadFromStorage('currentUser', defaultUserData));
  const [accounts, setAccounts] = useState(() => loadFromStorage('accounts', defaultAccounts));
  const [cards, setCards] = useState(() => loadFromStorage('cards', defaultCards));
  const [transactions, setTransactions] = useState(() => loadFromStorage('transactions', defaultTransactions));
  const [favoriteContacts, setFavoriteContacts] = useState(() => loadFromStorage('favoriteContacts', defaultFavoriteContacts));
  const [spendingByCategory, setSpendingByCategory] = useState(() => loadFromStorage('spendingByCategory', defaultSpendingByCategory));
  const [showBalance, setShowBalance] = useState(true);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('favoriteContacts', JSON.stringify(favoriteContacts));
  }, [favoriteContacts]);

  useEffect(() => {
    localStorage.setItem('spendingByCategory', JSON.stringify(spendingByCategory));
  }, [spendingByCategory]);

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, acc) => {
    if (acc.currency === 'PLN') return sum + acc.balance;
    if (acc.currency === 'EUR') return sum + (acc.balance * 4.32);
    if (acc.currency === 'USD') return sum + (acc.balance * 3.95);
    return sum;
  }, 0);

  // Format currency
  const formatCurrency = (amount, currency = 'PLN') => {
    const symbols = { PLN: 'z\u0142', EUR: '\u20ac', USD: '$', GBP: '\u00a3' };
    const symbol = symbols[currency] || currency;
    return `${amount.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} ${symbol}`;
  };

  // Switch user
  const switchUser = (userId) => {
    const user = availableUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  // Update account balance
  const updateAccountBalance = (accountId, newBalance) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === accountId ? { ...acc, balance: parseFloat(newBalance) } : acc
    ));
  };

  // Update card limit/used
  const updateCard = (cardId, updates) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, ...updates } : card
    ));
  };

  // Add transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      status: 'completed'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  // Process transfer
  const processTransfer = (fromAccountId, amount, recipientName, recipientIban, description) => {
    // Deduct from account
    setAccounts(prev => prev.map(acc => 
      acc.id === parseInt(fromAccountId) ? { ...acc, balance: acc.balance - parseFloat(amount) } : acc
    ));

    // Add transaction
    addTransaction({
      title: `Transfer - ${recipientName}`,
      category: 'Transfer',
      amount: -parseFloat(amount),
      type: 'transfer',
      icon: 'send'
    });

    return true;
  };

  // Pay bill
  const payBill = (fromAccountId, amount, provider, category) => {
    // Deduct from account
    setAccounts(prev => prev.map(acc => 
      acc.id === parseInt(fromAccountId) ? { ...acc, balance: acc.balance - parseFloat(amount) } : acc
    ));

    // Add transaction
    addTransaction({
      title: `${provider} - ${category}`,
      category: 'Bills',
      amount: -parseFloat(amount),
      type: 'expense',
      icon: 'file-text'
    });

    return true;
  };

  // Add favorite contact
  const addFavoriteContact = (contact) => {
    setFavoriteContacts(prev => [...prev, { ...contact, id: Date.now() }]);
  };

  // Remove favorite contact
  const removeFavoriteContact = (contactId) => {
    setFavoriteContacts(prev => prev.filter(c => c.id !== contactId));
  };

  // Toggle card status
  const toggleCardStatus = (cardId) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, status: card.status === 'active' ? 'locked' : 'active' } 
        : card
    ));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setCurrentUser(defaultUserData);
    setAccounts(defaultAccounts);
    setCards(defaultCards);
    setTransactions(defaultTransactions);
    setFavoriteContacts(defaultFavoriteContacts);
    setSpendingByCategory(defaultSpendingByCategory);
    localStorage.clear();
  };

  const value = {
    currentUser,
    accounts,
    cards,
    transactions,
    favoriteContacts,
    spendingByCategory,
    totalBalance,
    showBalance,
    setShowBalance,
    availableUsers,
    switchUser,
    updateAccountBalance,
    updateCard,
    addTransaction,
    processTransfer,
    payBill,
    addFavoriteContact,
    removeFavoriteContact,
    toggleCardStatus,
    formatCurrency,
    resetToDefaults
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
