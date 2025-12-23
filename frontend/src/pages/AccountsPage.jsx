import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Copy,
  ChevronRight,
  Wallet,
  Landmark,
  PiggyBank,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical,
  FileText,
  Download,
  Share2,
  Edit3,
  Check,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const iconMap = {
  'wallet': Wallet,
  'landmark': Landmark,
  'piggy-bank': PiggyBank,
};

const AccountsPage = () => {
  const { 
    accounts, 
    transactions, 
    totalBalance, 
    showBalance, 
    setShowBalance, 
    formatCurrency,
    updateAccountBalance 
  } = useApp();
  
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [editingBalance, setEditingBalance] = useState(null);
  const [newBalance, setNewBalance] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    toast.success('IBAN copied to clipboard');
  };

  const handleEditBalance = (account) => {
    setEditingBalance(account.id);
    setNewBalance(account.balance.toString());
  };

  const handleSaveBalance = (accountId) => {
    const value = parseFloat(newBalance);
    if (!isNaN(value) && value >= 0) {
      updateAccountBalance(accountId, value);
      // Update selected account if it's the one being edited
      if (selectedAccount.id === accountId) {
        setSelectedAccount({ ...selectedAccount, balance: value });
      }
      toast.success('Balance updated successfully');
    } else {
      toast.error('Please enter a valid amount');
    }
    setEditingBalance(null);
    setNewBalance('');
  };

  const handleCancelEdit = () => {
    setEditingBalance(null);
    setNewBalance('');
  };

  // Keep selected account in sync with accounts state
  React.useEffect(() => {
    const updated = accounts.find(a => a.id === selectedAccount.id);
    if (updated) {
      setSelectedAccount(updated);
    }
  }, [accounts, selectedAccount.id]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">{accounts.length} accounts</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-2 text-gray-600 border-gray-200 hover:bg-gray-50"
          >
            {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button className="bg-[#EC0000] hover:bg-[#CC0000] text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Account
          </Button>
        </div>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-[#EC0000] to-[#CC0000] text-white border-0 shadow-xl shadow-red-200/50">
        <CardContent className="p-6">
          <p className="text-red-100 text-sm font-medium">Total Balance</p>
          <p className="text-3xl font-bold mt-2">
            {showBalance ? formatCurrency(totalBalance) : '•••••• zł'}
          </p>
        </CardContent>
      </Card>

      {/* Accounts List */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Account Cards */}
        <div className="lg:col-span-1 space-y-3">
          {accounts.map((account) => {
            const Icon = iconMap[account.icon] || Wallet;
            const isSelected = selectedAccount.id === account.id;
            const isEditing = editingBalance === account.id;
            
            return (
              <Card
                key={account.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-[#EC0000] shadow-lg shadow-red-100'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => !isEditing && setSelectedAccount(account)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#EC0000]' : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{account.name}</p>
                        <p className="text-xs text-gray-500">{account.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-[#EC0000]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditBalance(account);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      )}
                      <ChevronRight className={`h-5 w-5 ${isSelected ? 'text-[#EC0000]' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {isEditing ? (
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Input
                          type="number"
                          value={newBalance}
                          onChange={(e) => setNewBalance(e.target.value)}
                          className="h-8 text-sm"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          className="h-8 w-8 bg-green-500 hover:bg-green-600"
                          onClick={() => handleSaveBalance(account.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900">
                        {showBalance ? formatCurrency(account.balance, account.currency) : '••••'}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Account Details */}
        <Card className="lg:col-span-2 border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = iconMap[selectedAccount.icon] || Wallet;
                return (
                  <div className="w-12 h-12 rounded-xl bg-[#EC0000] flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                );
              })()}
              <div>
                <CardTitle className="text-xl">{selectedAccount.name}</CardTitle>
                <p className="text-sm text-gray-500">{selectedAccount.type}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" /> Account Statement
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Download className="h-4 w-4 mr-2" /> Download Statement
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Share2 className="h-4 w-4 mr-2" /> Share Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            {/* Balance */}
            <div className="p-4 bg-gray-50 rounded-xl mb-6">
              <p className="text-sm text-gray-500 mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-gray-900">
                {showBalance ? formatCurrency(selectedAccount.balance, selectedAccount.currency) : '••••••'}
              </p>
            </div>

            {/* IBAN */}
            <div className="p-4 bg-gray-50 rounded-xl mb-6">
              <p className="text-sm text-gray-500 mb-1">IBAN</p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-gray-900">{selectedAccount.iban}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(selectedAccount.iban)}
                  className="text-[#EC0000] hover:text-[#CC0000] hover:bg-red-50"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button className="bg-[#EC0000] hover:bg-[#CC0000] text-white h-12">
                <ArrowUpRight className="h-4 w-4 mr-2" /> Send Money
              </Button>
              <Button variant="outline" className="h-12 border-gray-200">
                <ArrowDownLeft className="h-4 w-4 mr-2" /> Receive
              </Button>
            </div>

            {/* Recent Transactions */}
            <Tabs defaultValue="all">
              <TabsList className="w-full bg-gray-100">
                <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white">All</TabsTrigger>
                <TabsTrigger value="income" className="flex-1 data-[state=active]:bg-white">Income</TabsTrigger>
                <TabsTrigger value="expense" className="flex-1 data-[state=active]:bg-white">Expenses</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4 space-y-2">
                {transactions.slice(0, 4).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        tx.type === 'income' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {tx.type === 'income' ? (
                          <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.title}</p>
                        <p className="text-xs text-gray-500">{tx.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      tx.amount > 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="income" className="mt-4 space-y-2">
                {transactions.filter(tx => tx.type === 'income').map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <ArrowDownLeft className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.title}</p>
                        <p className="text-xs text-gray-500">{tx.date}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">+{formatCurrency(tx.amount)}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="expense" className="mt-4 space-y-2">
                {transactions.filter(tx => tx.type !== 'income').map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.title}</p>
                        <p className="text-xs text-gray-500">{tx.date}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">{formatCurrency(tx.amount)}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountsPage;
