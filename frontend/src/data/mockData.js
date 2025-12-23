// Mock Data for Santander Bank Clone - Poland Edition

export const defaultUserData = {
  id: 1,
  name: "Jan Kowalski",
  firstName: "Jan",
  avatar: "JK",
  email: "jan.kowalski@email.pl",
  phone: "+48 512 XXX XXX",
  lastLogin: "15 Jul 2025, 14:32"
};

export const availableUsers = [
  {
    id: 1,
    name: "Jan Kowalski",
    firstName: "Jan",
    avatar: "JK",
    email: "jan.kowalski@email.pl",
    phone: "+48 512 XXX XXX",
    lastLogin: "15 Jul 2025, 14:32"
  },
  {
    id: 2,
    name: "Anna Nowak",
    firstName: "Anna",
    avatar: "AN",
    email: "anna.nowak@email.pl",
    phone: "+48 601 XXX XXX",
    lastLogin: "15 Jul 2025, 10:15"
  },
  {
    id: 3,
    name: "Piotr Wisniewski",
    firstName: "Piotr",
    avatar: "PW",
    email: "piotr.wisniewski@email.pl",
    phone: "+48 505 XXX XXX",
    lastLogin: "14 Jul 2025, 18:45"
  }
];

export const defaultAccounts = [
  {
    id: 1,
    name: "Main Account",
    type: "Current Account",
    iban: "PL12 1090 1234 5678 9012 3456 7890",
    balance: 12567.89,
    currency: "PLN",
    icon: "wallet"
  },
  {
    id: 2,
    name: "Euro Account",
    type: "Foreign Currency",
    iban: "PL98 1090 1234 5678 9012 3456 7891",
    balance: 2150.00,
    currency: "EUR",
    icon: "landmark"
  },
  {
    id: 3,
    name: "Savings Account",
    type: "Term Deposit",
    iban: "PL45 1090 1234 5678 9012 3456 7892",
    balance: 45000.00,
    currency: "PLN",
    icon: "piggy-bank"
  }
];

export const defaultCards = [
  {
    id: 1,
    name: "Santander Platinum",
    type: "Credit Card",
    number: "**** **** **** 4582",
    expiryDate: "12/27",
    limit: 25000,
    used: 6450,
    available: 18550,
    status: "active",
    color: "platinum"
  },
  {
    id: 2,
    name: "Santander Gold",
    type: "Debit Card",
    number: "**** **** **** 7891",
    expiryDate: "08/26",
    linkedAccount: "Main Account",
    status: "active",
    color: "gold"
  },
  {
    id: 3,
    name: "Santander Virtual",
    type: "Virtual Card",
    number: "**** **** **** 2345",
    expiryDate: "03/26",
    limit: 2500,
    used: 445,
    available: 2055,
    status: "active",
    color: "virtual"
  }
];

export const defaultTransactions = [
  {
    id: 1,
    title: "Netflix",
    category: "Entertainment",
    amount: -43.99,
    date: "15 Jul 2025",
    time: "09:15",
    type: "expense",
    icon: "play-circle",
    status: "completed"
  },
  {
    id: 2,
    title: "Salary Payment",
    category: "Income",
    amount: 8500.00,
    date: "14 Jul 2025",
    time: "00:01",
    type: "income",
    icon: "building",
    status: "completed"
  },
  {
    id: 3,
    title: "Biedronka Market",
    category: "Groceries",
    amount: -234.56,
    date: "13 Jul 2025",
    time: "18:42",
    type: "expense",
    icon: "shopping-cart",
    status: "completed"
  },
  {
    id: 4,
    title: "Transfer - Maria Lewandowska",
    category: "Transfer",
    amount: -750.00,
    date: "12 Jul 2025",
    time: "14:30",
    type: "transfer",
    icon: "send",
    status: "completed"
  },
  {
    id: 5,
    title: "Electricity Bill",
    category: "Bills",
    amount: -189.45,
    date: "11 Jul 2025",
    time: "10:00",
    type: "expense",
    icon: "zap",
    status: "completed"
  },
  {
    id: 6,
    title: "Orlen Fuel",
    category: "Transport",
    amount: -320.00,
    date: "10 Jul 2025",
    time: "16:22",
    type: "expense",
    icon: "fuel",
    status: "completed"
  },
  {
    id: 7,
    title: "Spotify Premium",
    category: "Entertainment",
    amount: -23.99,
    date: "09 Jul 2025",
    time: "00:00",
    type: "expense",
    icon: "music",
    status: "completed"
  },
  {
    id: 8,
    title: "Incoming Transfer",
    category: "Transfer",
    amount: 1200.00,
    date: "08 Jul 2025",
    time: "11:45",
    type: "income",
    icon: "download",
    status: "completed"
  }
];

export const quickActions = [
  { id: 1, name: "Send Money", icon: "send", color: "#EC0000" },
  { id: 2, name: "Pay Bills", icon: "file-text", color: "#EC0000" },
  { id: 3, name: "QR Pay", icon: "qr-code", color: "#EC0000" },
  { id: 4, name: "Cards", icon: "credit-card", color: "#EC0000" },
  { id: 5, name: "Invest", icon: "trending-up", color: "#EC0000" },
  { id: 6, name: "Loan", icon: "landmark", color: "#EC0000" }
];

export const billCategories = [
  { id: 1, name: "Electricity", icon: "zap", providers: ["PGE", "Tauron", "Enea", "Energa"] },
  { id: 2, name: "Water", icon: "droplets", providers: ["MPWiK Warszawa", "Aquanet", "GPW"] },
  { id: 3, name: "Gas", icon: "flame", providers: ["PGNiG", "Fortum", "E.ON"] },
  { id: 4, name: "Internet", icon: "wifi", providers: ["Orange", "UPC", "Netia", "Play"] },
  { id: 5, name: "Phone", icon: "smartphone", providers: ["Orange", "Play", "T-Mobile", "Plus"] },
  { id: 6, name: "TV", icon: "tv", providers: ["Canal+", "Polsat Box", "Player"] }
];

export const defaultFavoriteContacts = [
  { id: 1, name: "Maria Lewandowska", iban: "PL12 ****90", avatar: "ML" },
  { id: 2, name: "Tomasz Zielinski", iban: "PL34 ****56", avatar: "TZ" },
  { id: 3, name: "Katarzyna Dabrowska", iban: "PL78 ****12", avatar: "KD" },
  { id: 4, name: "Michal Wojcik", iban: "PL90 ****78", avatar: "MW" }
];

export const notifications = [
  {
    id: 1,
    title: "Card Transaction",
    message: "43.99 PLN spent from your Platinum card.",
    time: "2 hours ago",
    read: false,
    type: "transaction"
  },
  {
    id: 2,
    title: "Salary Received",
    message: "8,500.00 PLN salary payment received.",
    time: "1 day ago",
    read: false,
    type: "income"
  },
  {
    id: 3,
    title: "Bill Reminder",
    message: "Electricity bill due in 3 days.",
    time: "2 days ago",
    read: true,
    type: "reminder"
  },
  {
    id: 4,
    title: "Promotion",
    message: "Get 10% cashback on grocery shopping!",
    time: "3 days ago",
    read: true,
    type: "promo"
  }
];

export const campaigns = [
  {
    id: 1,
    title: "Grocery Cashback",
    description: "10% cashback at selected supermarkets",
    endDate: "31 Jul 2025",
    image: "market"
  },
  {
    id: 2,
    title: "Fuel Discount",
    description: "0.20 PLN discount per liter at Orlen",
    endDate: "15 Aug 2025",
    image: "fuel"
  },
  {
    id: 3,
    title: "Restaurant Offer",
    description: "15% off at partner restaurants",
    endDate: "30 Aug 2025",
    image: "restaurant"
  }
];

export const exchangeRates = [
  { currency: "EUR", buy: 4.28, sell: 4.35, change: 0.15 },
  { currency: "USD", buy: 3.92, sell: 3.99, change: -0.08 },
  { currency: "GBP", buy: 4.98, sell: 5.08, change: 0.22 }
];

export const defaultSpendingByCategory = [
  { category: "Groceries", amount: 1456, percentage: 35, color: "#EC0000" },
  { category: "Transport", amount: 780, percentage: 19, color: "#FF4444" },
  { category: "Bills", amount: 650, percentage: 16, color: "#FF6666" },
  { category: "Entertainment", amount: 420, percentage: 10, color: "#FF8888" },
  { category: "Other", amount: 830, percentage: 20, color: "#FFAAAA" }
];
