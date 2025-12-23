import React, { useState } from 'react';
import {
  Zap,
  Droplets,
  Flame,
  Wifi,
  Smartphone,
  Tv,
  Search,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Calendar,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { billCategories } from '../data/mockData';
import { useApp } from '../context/AppContext';

const iconMap = {
  'zap': Zap,
  'droplets': Droplets,
  'flame': Flame,
  'wifi': Wifi,
  'smartphone': Smartphone,
  'tv': Tv,
};

const BillsPage = () => {
  const { accounts, formatCurrency, payBill } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [subscriberNo, setSubscriberNo] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [billAmount, setBillAmount] = useState(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const queryBill = () => {
    setIsQuerying(true);
    setTimeout(() => {
      setBillAmount(Math.floor(Math.random() * 300) + 50);
      setIsQuerying(false);
    }, 1500);
  };

  const handlePayBill = () => {
    if (!selectedAccount) return;
    
    setIsPaying(true);
    setTimeout(() => {
      payBill(selectedAccount, billAmount, selectedProvider, selectedCategory?.name);
      setIsPaying(false);
      setShowSuccess(true);
    }, 2000);
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setSelectedProvider('');
    setSubscriberNo('');
    setBillAmount(null);
    setShowSuccess(false);
  };

  const savedBills = [
    { id: 1, category: 'Electricity', provider: 'PGE', subscriberNo: '123456789', lastPayment: '15 Jun 2025', amount: 189.45 },
    { id: 2, category: 'Internet', provider: 'Orange', subscriberNo: '987654321', lastPayment: '10 Jun 2025', amount: 99.99 },
    { id: 3, category: 'Gas', provider: 'PGNiG', subscriberNo: '456789123', lastPayment: '05 Jun 2025', amount: 234.56 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pay Bills</h1>
        <p className="text-gray-500 text-sm mt-1">Pay all your bills in one place</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bill Categories */}
        <Card className="lg:col-span-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Select Bill Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              {billCategories.map((category) => {
                const Icon = iconMap[category.icon] || FileText;
                const isSelected = selectedCategory?.id === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedProvider('');
                      setBillAmount(null);
                    }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#EC0000]/10 border-2 border-[#EC0000]'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#EC0000]' : 'bg-white shadow-sm'
                    }`}>
                      <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Bill Form */}
            {selectedCategory && (
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <Label>Select Provider</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {selectedCategory.providers.map((provider) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Customer / Account Number</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter your account number"
                      value={subscriberNo}
                      onChange={(e) => setSubscriberNo(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {!billAmount ? (
                  <Button
                    className="w-full h-12 bg-[#EC0000] hover:bg-[#CC0000] text-white"
                    onClick={queryBill}
                    disabled={!selectedProvider || !subscriberNo || isQuerying}
                  >
                    {isQuerying ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Fetching Bill...
                      </>
                    ) : (
                      'Check Bill'
                    )}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {/* Bill Amount */}
                    <div className="p-4 bg-[#EC0000]/5 rounded-xl border border-[#EC0000]/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Bill Amount</span>
                        <span className="text-2xl font-bold text-[#EC0000]">
                          {formatCurrency(billAmount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Due Date: 25 July 2025</span>
                      </div>
                    </div>

                    {/* Payment Account */}
                    <div className="space-y-2">
                      <Label>Pay From</Label>
                      <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id.toString()}>
                              {account.name} - {formatCurrency(account.balance, account.currency)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full h-12 bg-[#EC0000] hover:bg-[#CC0000] text-white"
                      onClick={handlePayBill}
                      disabled={!selectedAccount || isPaying}
                    >
                      {isPaying ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay ${formatCurrency(billAmount)}`
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Bills */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Saved Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedBills.map((bill) => (
                <div
                  key={bill.id}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#EC0000]/10 flex items-center justify-center">
                        {bill.category === 'Electricity' && <Zap className="h-4 w-4 text-[#EC0000]" />}
                        {bill.category === 'Internet' && <Wifi className="h-4 w-4 text-[#EC0000]" />}
                        {bill.category === 'Gas' && <Flame className="h-4 w-4 text-[#EC0000]" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{bill.provider}</p>
                        <p className="text-xs text-gray-500">{bill.category}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Last paid: {bill.lastPayment}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(bill.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-[#EC0000] border-[#EC0000]/30 hover:bg-[#EC0000]/5">
              View All Bills
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-white text-center">
          <div className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Payment Successful!</DialogTitle>
            </DialogHeader>
            <p className="text-gray-500 mt-2">
              Your {selectedProvider} bill has been paid successfully.
            </p>
            <div className="w-full mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Provider</span>
                <span className="font-medium">{selectedProvider}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">{formatCurrency(billAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{new Date().toLocaleDateString('en-GB')}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6 w-full">
              <Button variant="outline" className="flex-1" onClick={resetForm}>
                New Payment
              </Button>
              <Button className="flex-1 bg-[#EC0000] hover:bg-[#CC0000]" onClick={() => setShowSuccess(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillsPage;
