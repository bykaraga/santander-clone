// Mock Data for Santander Bank Clone

export const userData = {
  name: "Ahmet Yılmaz",
  firstName: "Ahmet",
  avatar: "AY",
  email: "ahmet.yilmaz@email.com",
  phone: "+90 532 XXX XX XX",
  lastLogin: "15 Tem 2025, 14:32"
};

export const accounts = [
  {
    id: 1,
    name: "Ana Hesap",
    type: "Vadesiz Hesap",
    iban: "TR12 0012 3456 7890 1234 5678 90",
    balance: 24567.89,
    currency: "TRY",
    icon: "wallet"
  },
  {
    id: 2,
    name: "Euro Hesabı",
    type: "Döviz Hesabı",
    iban: "TR98 0012 3456 7890 1234 5678 91",
    balance: 3250.00,
    currency: "EUR",
    icon: "landmark"
  },
  {
    id: 3,
    name: "Birikim Hesabı",
    type: "Vadeli Hesap",
    iban: "TR45 0012 3456 7890 1234 5678 92",
    balance: 85000.00,
    currency: "TRY",
    icon: "piggy-bank"
  }
];

export const cards = [
  {
    id: 1,
    name: "Santander Platinum",
    type: "Kredi Kartı",
    number: "**** **** **** 4582",
    expiryDate: "12/27",
    limit: 50000,
    used: 12450,
    available: 37550,
    status: "active",
    color: "platinum"
  },
  {
    id: 2,
    name: "Santander Gold",
    type: "Banka Kartı",
    number: "**** **** **** 7891",
    expiryDate: "08/26",
    linkedAccount: "Ana Hesap",
    status: "active",
    color: "gold"
  },
  {
    id: 3,
    name: "Santander Virtual",
    type: "Sanal Kart",
    number: "**** **** **** 2345",
    expiryDate: "03/26",
    limit: 5000,
    used: 890,
    available: 4110,
    status: "active",
    color: "virtual"
  }
];

export const transactions = [
  {
    id: 1,
    title: "Netflix",
    category: "Eğlence",
    amount: -89.99,
    date: "15 Tem 2025",
    time: "09:15",
    type: "expense",
    icon: "play-circle",
    status: "completed"
  },
  {
    id: 2,
    title: "Maaş Ödemesi",
    category: "Gelir",
    amount: 28500.00,
    date: "14 Tem 2025",
    time: "00:01",
    type: "income",
    icon: "building",
    status: "completed"
  },
  {
    id: 3,
    title: "Migros Market",
    category: "Market",
    amount: -456.78,
    date: "13 Tem 2025",
    time: "18:42",
    type: "expense",
    icon: "shopping-cart",
    status: "completed"
  },
  {
    id: 4,
    title: "EFT - Ayşe Demir",
    category: "Transfer",
    amount: -1500.00,
    date: "12 Tem 2025",
    time: "14:30",
    type: "transfer",
    icon: "send",
    status: "completed"
  },
  {
    id: 5,
    title: "Elektrik Faturası",
    category: "Fatura",
    amount: -345.67,
    date: "11 Tem 2025",
    time: "10:00",
    type: "expense",
    icon: "zap",
    status: "completed"
  },
  {
    id: 6,
    title: "Shell Benzin",
    category: "Ulaşım",
    amount: -890.00,
    date: "10 Tem 2025",
    time: "16:22",
    type: "expense",
    icon: "fuel",
    status: "completed"
  },
  {
    id: 7,
    title: "Spotify Premium",
    category: "Eğlence",
    amount: -49.99,
    date: "09 Tem 2025",
    time: "00:00",
    type: "expense",
    icon: "music",
    status: "completed"
  },
  {
    id: 8,
    title: "Gelen EFT",
    category: "Transfer",
    amount: 2500.00,
    date: "08 Tem 2025",
    time: "11:45",
    type: "income",
    icon: "download",
    status: "completed"
  }
];

export const quickActions = [
  { id: 1, name: "Para Gönder", icon: "send", color: "#EC0000" },
  { id: 2, name: "Fatura Öde", icon: "file-text", color: "#EC0000" },
  { id: 3, name: "QR Öde", icon: "qr-code", color: "#EC0000" },
  { id: 4, name: "Kart İşlemleri", icon: "credit-card", color: "#EC0000" },
  { id: 5, name: "Yatırım", icon: "trending-up", color: "#EC0000" },
  { id: 6, name: "Kredi", icon: "landmark", color: "#EC0000" }
];

export const billCategories = [
  { id: 1, name: "Elektrik", icon: "zap", providers: ["BEDAŞ", "CK Boğaziçi", "AYEDAŞ"] },
  { id: 2, name: "Su", icon: "droplets", providers: ["İSKİ", "ASKİ"] },
  { id: 3, name: "Doğalgaz", icon: "flame", providers: ["İGDAŞ", "ESGAZ"] },
  { id: 4, name: "İnternet", icon: "wifi", providers: ["Türk Telekom", "Superonline", "TurkNet"] },
  { id: 5, name: "Telefon", icon: "smartphone", providers: ["Turkcell", "Vodafone", "Türk Telekom"] },
  { id: 6, name: "TV", icon: "tv", providers: ["Digiturk", "D-Smart", "Tivibu"] }
];

export const favoriteContacts = [
  { id: 1, name: "Ayşe Demir", iban: "TR12 ****90", avatar: "AD" },
  { id: 2, name: "Mehmet Kaya", iban: "TR34 ****56", avatar: "MK" },
  { id: 3, name: "Zeynep Öz", iban: "TR78 ****12", avatar: "ZÖ" },
  { id: 4, name: "Can Yıldız", iban: "TR90 ****78", avatar: "CY" }
];

export const notifications = [
  {
    id: 1,
    title: "Kart Harcaması",
    message: "Platinum kartınızdan 89.99 TL harcama yapıldı.",
    time: "2 saat önce",
    read: false,
    type: "transaction"
  },
  {
    id: 2,
    title: "Maaş Yatırıldı",
    message: "Ana hesabınıza 28,500.00 TL maaş ödemesi yapıldı.",
    time: "1 gün önce",
    read: false,
    type: "income"
  },
  {
    id: 3,
    title: "Fatura Hatırlatması",
    message: "Elektrik faturanızın son ödeme tarihi 3 gün sonra.",
    time: "2 gün önce",
    read: true,
    type: "reminder"
  },
  {
    id: 4,
    title: "Kampanya",
    message: "Market alışverişlerinizde %10 nakit iade fırsatı!",
    time: "3 gün önce",
    read: true,
    type: "promo"
  }
];

export const campaigns = [
  {
    id: 1,
    title: "Market Kampanyası",
    description: "Seçili marketlerde %10 nakit iade",
    endDate: "31 Tem 2025",
    image: "market"
  },
  {
    id: 2,
    title: "Akaryakıt Fırsatı",
    description: "Akaryakıt istasyonlarında litre başına 1 TL indirim",
    endDate: "15 Ağu 2025",
    image: "fuel"
  },
  {
    id: 3,
    title: "Restoran Keyfi",
    description: "Anlaşmalı restoranlarda %15 indirim",
    endDate: "30 Ağu 2025",
    image: "restaurant"
  }
];

export const exchangeRates = [
  { currency: "USD", buy: 32.45, sell: 32.65, change: 0.23 },
  { currency: "EUR", buy: 35.12, sell: 35.38, change: -0.15 },
  { currency: "GBP", buy: 41.20, sell: 41.55, change: 0.42 }
];

export const spendingByCategory = [
  { category: "Market", amount: 3456, percentage: 35, color: "#EC0000" },
  { category: "Ulaşım", amount: 1890, percentage: 19, color: "#FF4444" },
  { category: "Fatura", amount: 1567, percentage: 16, color: "#FF6666" },
  { category: "Eğlence", amount: 980, percentage: 10, color: "#FF8888" },
  { category: "Diğer", amount: 1980, percentage: 20, color: "#FFAAAA" }
];
