import React from 'react';
import {
  Eye,
  EyeOff,
  Send,
  FileText,
  QrCode,
  CreditCard,
  TrendingUp,
  Landmark,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  PiggyBank,
  PlayCircle,
  Building,
  ShoppingCart,
  Zap,
  Fuel,
  Music,
  Download,
  Gift,
  Edit3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import {
  quickActions,
  campaigns,
  exchangeRates,
} from '../data/mockData';
import { useApp } from '../context/AppContext';

const iconMap = {
  'wallet': Wallet,
  'landmark': Landmark,
  'piggy-bank': PiggyBank,
  'play-circle': PlayCircle,
  'building': Building,
  'shopping-cart': ShoppingCart,
  'send': Send,
  'zap': Zap,
  'fuel': Fuel,
  'music': Music,
  'download': Download,
  'file-text': FileText,
  'qr-code': QrCode,
  'credit-card': CreditCard,
  'trending-up': TrendingUp
};

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    accounts,
    cards,
    transactions,
    favoriteContacts,
    spendingByCategory,
    totalBalance,
    showBalance,
    setShowBalance,
    formatCurrency
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello, {currentUser.firstName}!</h1>
          <p className="text-gray-500 text-sm mt-1">Last login: {currentUser.lastLogin}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center gap-2 text-gray-600 border-gray-200 hover:bg-gray-50"
        >
          {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>{showBalance ? 'Hide Balance' : 'Show Balance'}</span>
        </Button>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-[#EC0000] to-[#CC0000] text-white border-0 shadow-xl shadow-red-200/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-red-100 text-sm font-medium">Total Assets</p>
              <p className="text-3xl md:text-4xl font-bold mt-2">
                {showBalance ? formatCurrency(totalBalance) : '•••••• zł'}
              </p>
              <p className="text-red-100 text-sm mt-2">{accounts.length} accounts total</p>
            </div>
            <div className="flex gap-3">
              <Button 
                className="bg-white text-[#EC0000] hover:bg-red-50 font-semibold"
                onClick={() => navigate('/transfers')}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Money
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Download className="h-4 w-4 mr-2" />
                Receive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {quickActions.map((action) => {
            const Icon = iconMap[action.icon] || Send;
            const paths = {
              'Send Money': '/transfers',
              'Pay Bills': '/bills',
              'Cards': '/cards',
              'Invest': '/investments',
              'Loan': '/more'
            };
            return (
              <button
                key={action.id}
                onClick={() => paths[action.name] && navigate(paths[action.name])}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#EC0000]/30 hover:shadow-lg hover:shadow-red-100/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-[#EC0000] transition-colors duration-300">
                  <Icon className="h-5 w-5 text-[#EC0000] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accounts & Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Accounts */}
        <Card className="border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">My Accounts</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#EC0000] hover:text-[#CC0000] hover:bg-red-50"
              onClick={() => navigate('/accounts')}
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {accounts.map((account) => {
              const Icon = iconMap[account.icon] || Wallet;
              return (
                <div
                  key={account.id}
                  onClick={() => navigate('/accounts')}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <Icon className="h-5 w-5 text-[#EC0000]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{account.name}</p>
                      <p className="text-xs text-gray-500">{account.type}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {showBalance ? formatCurrency(account.balance, account.currency) : '••••'}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Cards */}
        <Card className="border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">My Cards</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#EC0000] hover:text-[#CC0000] hover:bg-red-50"
              onClick={() => navigate('/cards')}
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {cards.slice(0, 2).map((card) => (
              <div
                key={card.id}
                onClick={() => navigate('/cards')}
                className={`p-4 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                  card.color === 'platinum'
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
                    : card.color === 'gold'
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white'
                    : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm opacity-80">{card.type}</p>
                    <p className="font-semibold">{card.name}</p>
                  </div>
                  <Badge className={`${
                    card.status === 'active' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
                  }`}>
                    {card.status === 'active' ? 'Active' : 'Locked'}
                  </Badge>
                </div>
                <p className="font-mono text-lg tracking-wider mb-4">{card.number}</p>
                {card.limit && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Used: {formatCurrency(card.used)}</span>
                      <span>Limit: {formatCurrency(card.limit)}</span>
                    </div>
                    <Progress value={(card.used / card.limit) * 100} className="h-1.5 bg-white/20" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Favorite Contacts */}
      <Card className="border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Frequent Contacts</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#EC0000] hover:text-[#CC0000] hover:bg-red-50"
            onClick={() => navigate('/transfers')}
          >
            <Edit3 className="h-4 w-4 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-2">
              {favoriteContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => navigate('/transfers')}
                  className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Avatar className="h-12 w-12 bg-[#EC0000]">
                    <AvatarFallback className="bg-[#EC0000] text-white font-medium">
                      {contact.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium text-gray-700 text-center truncate w-full">
                    {contact.name.split(' ')[0]}
                  </span>
                </button>
              ))}
              <button 
                onClick={() => navigate('/transfers')}
                className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="h-12 w-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-2xl text-gray-400">+</span>
                </div>
                <span className="text-xs font-medium text-gray-500">Add</span>
              </button>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Transactions & Exchange Rates */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#EC0000] hover:text-[#CC0000] hover:bg-red-50"
              onClick={() => navigate('/accounts')}
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactions.slice(0, 5).map((tx) => {
                const Icon = iconMap[tx.icon] || FileText;
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        tx.type === 'income' ? 'bg-green-100' : tx.type === 'transfer' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          tx.type === 'income' ? 'text-green-600' : tx.type === 'transfer' ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.title}</p>
                        <p className="text-xs text-gray-500">{tx.date} • {tx.category}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      tx.amount > 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Exchange Rates */}
        <Card className="border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Exchange Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {exchangeRates.map((rate) => (
              <div key={rate.currency} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{rate.currency}/PLN</span>
                  <span className={`text-xs flex items-center gap-1 ${
                    rate.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {rate.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownLeft className="h-3 w-3" />}
                    {Math.abs(rate.change)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Buy: <span className="text-gray-900 font-medium">{rate.buy.toFixed(2)}</span></span>
                  <span className="text-gray-500">Sell: <span className="text-gray-900 font-medium">{rate.sell.toFixed(2)}</span></span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Campaigns */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Promotions</h2>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="min-w-[280px] border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-3">
                    {campaign.image === 'market' && <ShoppingCart className="h-6 w-6 text-[#EC0000]" />}
                    {campaign.image === 'fuel' && <Fuel className="h-6 w-6 text-[#EC0000]" />}
                    {campaign.image === 'restaurant' && <Gift className="h-6 w-6 text-[#EC0000]" />}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{campaign.description}</p>
                  <Badge variant="outline" className="text-xs text-[#EC0000] border-[#EC0000]/30">
                    Until {campaign.endDate}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Spending Analysis */}
      <Card className="border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Monthly Spending Analysis</CardTitle>
          <Badge variant="outline" className="text-gray-500">July 2025</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {spendingByCategory.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.category}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" style={{ '--progress-color': item.color }} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {spendingByCategory.reduce((acc, item, index) => {
                    const offset = acc.offset;
                    const circumference = 2 * Math.PI * 40;
                    const strokeDasharray = (item.percentage / 100) * circumference;
                    acc.elements.push(
                      <circle
                        key={item.category}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="12"
                        strokeDasharray={`${strokeDasharray} ${circumference}`}
                        strokeDashoffset={-offset}
                        className="transition-all duration-500"
                      />
                    );
                    acc.offset += strokeDasharray;
                    return acc;
                  }, { elements: [], offset: 0 }).elements}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(spendingByCategory.reduce((sum, item) => sum + item.amount, 0))}
                  </p>
                  <p className="text-sm text-gray-500">Total Spent</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
