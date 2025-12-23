import React, { useState } from 'react';
import {
  Send,
  ArrowLeftRight,
  Clock,
  Plus,
  ChevronRight,
  Building,
  User,
  CheckCircle2,
  Loader2,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
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
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const TransfersPage = () => {
  const { 
    accounts, 
    transactions, 
    favoriteContacts, 
    formatCurrency, 
    processTransfer,
    addFavoriteContact,
    removeFavoriteContact
  } = useApp();
  
  const [transferType, setTransferType] = useState('eft');
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [recipientIban, setRecipientIban] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactIban, setNewContactIban] = useState('');

  const handleTransfer = () => {
    if (!amount || !recipientIban || !selectedAccount || !recipientName) {
      toast.error('Please fill in all required fields');
      return;
    }

    const account = accounts.find(a => a.id === parseInt(selectedAccount));
    if (account && parseFloat(amount) > account.balance) {
      toast.error('Insufficient funds');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      processTransfer(selectedAccount, amount, recipientName, recipientIban, description);
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setRecipientIban('');
    setRecipientName('');
    setSelectedContact(null);
    setShowSuccess(false);
  };

  const handleAddContact = () => {
    if (!newContactName || !newContactIban) {
      toast.error('Please fill in all fields');
      return;
    }
    const avatar = newContactName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    addFavoriteContact({
      name: newContactName,
      iban: newContactIban.slice(0, 4) + ' ****' + newContactIban.slice(-2),
      avatar,
      fullIban: newContactIban
    });
    toast.success('Contact added successfully');
    setShowAddContact(false);
    setNewContactName('');
    setNewContactIban('');
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setRecipientName(contact.name);
    setRecipientIban(contact.fullIban || 'PL12 1234 5678 9012 3456 7890');
  };

  const transferHistory = transactions.filter(tx => tx.type === 'transfer');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Money Transfer</h1>
        <p className="text-gray-500 text-sm mt-1">Send money quickly and securely</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <Card className="lg:col-span-2 border-gray-100">
          <CardHeader>
            <Tabs value={transferType} onValueChange={setTransferType}>
              <TabsList className="w-full bg-gray-100">
                <TabsTrigger value="eft" className="flex-1 data-[state=active]:bg-white">
                  <Send className="h-4 w-4 mr-2" /> Standard
                </TabsTrigger>
                <TabsTrigger value="havale" className="flex-1 data-[state=active]:bg-white">
                  <ArrowLeftRight className="h-4 w-4 mr-2" /> Internal
                </TabsTrigger>
                <TabsTrigger value="fast" className="flex-1 data-[state=active]:bg-white">
                  <Clock className="h-4 w-4 mr-2" /> Express
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Account */}
            <div className="space-y-2">
              <Label>From Account</Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="h-14">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-xs text-gray-500">
                            Balance: {formatCurrency(account.balance, account.currency)}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Favorite Contacts */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Frequent Contacts</Label>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {favoriteContacts.map((contact) => (
                  <div key={contact.id} className="relative group">
                    <button
                      onClick={() => handleSelectContact(contact)}
                      className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl transition-all ${
                        selectedContact?.id === contact.id
                          ? 'bg-[#EC0000]/10 border border-[#EC0000]'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <Avatar className="h-10 w-10 bg-[#EC0000]">
                        <AvatarFallback className="bg-[#EC0000] text-white text-sm">
                          {contact.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-gray-700 truncate w-full text-center">
                        {contact.name.split(' ')[0]}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        removeFavoriteContact(contact.id);
                        toast.success('Contact removed');
                      }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setShowAddContact(true)}
                  className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Plus className="h-5 w-5 text-gray-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">Add</span>
                </button>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Recipient Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter recipient name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Recipient IBAN</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="PL00 0000 0000 0000 0000 0000 0000"
                    value={recipientIban}
                    onChange={(e) => setRecipientIban(e.target.value)}
                    className="pl-10 h-12 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-14 text-2xl font-semibold pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  zł
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Input
                placeholder="Transfer description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Transfer Button */}
            <Button
              className="w-full h-14 bg-[#EC0000] hover:bg-[#CC0000] text-white text-lg font-semibold"
              onClick={handleTransfer}
              disabled={!amount || !recipientIban || !selectedAccount || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  {amount ? `Send ${formatCurrency(parseFloat(amount))}` : 'Send Money'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Transfer History */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transferHistory.length > 0 ? (
                transferHistory.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Send className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{tx.title}</p>
                        <p className="text-xs text-gray-500">{tx.date}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {formatCurrency(Math.abs(tx.amount))}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No transfer history yet</p>
                </div>
              )}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-[#EC0000] hover:text-[#CC0000] hover:bg-red-50">
              View All History <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter full name"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>IBAN</Label>
              <Input
                placeholder="PL00 0000 0000 0000 0000 0000 0000"
                value={newContactIban}
                onChange={(e) => setNewContactIban(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddContact(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-[#EC0000] hover:bg-[#CC0000]" onClick={handleAddContact}>
                Add Contact
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-white text-center">
          <div className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Transfer Successful!</DialogTitle>
            </DialogHeader>
            <p className="text-gray-500 mt-2">
              {formatCurrency(parseFloat(amount))} has been sent successfully.
            </p>
            <div className="w-full mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Recipient</span>
                <span className="font-medium">{recipientName || 'Recipient'}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{new Date().toLocaleDateString('en-GB')}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6 w-full">
              <Button variant="outline" className="flex-1" onClick={resetForm}>
                New Transfer
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

export default TransfersPage;
