import React, { useState } from 'react';
import {
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Settings,
  Copy,
  ChevronRight,
  Plus,
  Shield,
  Smartphone,
  Globe,
  ShoppingBag,
  MoreVertical,
  Edit3,
  Check,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const CardsPage = () => {
  const { cards, transactions, formatCurrency, toggleCardStatus, updateCard } = useApp();
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [editingLimit, setEditingLimit] = useState(false);
  const [newLimit, setNewLimit] = useState('');
  const [cardSettings, setCardSettings] = useState({
    onlineShopping: true,
    internationalPayments: true,
    contactless: true,
  });

  // Keep selected card in sync
  React.useEffect(() => {
    const updated = cards.find(c => c.id === selectedCard.id);
    if (updated) {
      setSelectedCard(updated);
    }
  }, [cards, selectedCard.id]);

  const handleToggleLock = () => {
    toggleCardStatus(selectedCard.id);
    toast.success(selectedCard.status === 'active' ? 'Card temporarily locked' : 'Card unlocked');
  };

  const handleEditLimit = () => {
    setEditingLimit(true);
    setNewLimit(selectedCard.limit?.toString() || '');
  };

  const handleSaveLimit = () => {
    const value = parseFloat(newLimit);
    if (!isNaN(value) && value > 0) {
      const newUsed = Math.min(selectedCard.used, value);
      updateCard(selectedCard.id, { 
        limit: value, 
        used: newUsed,
        available: value - newUsed 
      });
      toast.success('Card limit updated');
    } else {
      toast.error('Please enter a valid amount');
    }
    setEditingLimit(false);
    setNewLimit('');
  };

  const getCardGradient = (color) => {
    switch (color) {
      case 'platinum':
        return 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900';
      case 'gold':
        return 'bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600';
      case 'virtual':
        return 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700';
      default:
        return 'bg-gradient-to-br from-[#EC0000] to-[#CC0000]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Cards</h1>
          <p className="text-gray-500 text-sm mt-1">{cards.length} cards</p>
        </div>
        <Button className="bg-[#EC0000] hover:bg-[#CC0000] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Apply for New Card
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Card List */}
        <div className="lg:col-span-1 space-y-3">
          {cards.map((card) => {
            const isSelected = selectedCard.id === card.id;
            return (
              <Card
                key={card.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-[#EC0000] shadow-lg shadow-red-100'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setSelectedCard(card)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#EC0000]' : 'bg-gray-100'
                      }`}>
                        <CreditCard className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{card.name}</p>
                        <p className="text-xs text-gray-500">{card.type}</p>
                      </div>
                    </div>
                    <Badge className={`${
                      card.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {card.status === 'active' ? 'Active' : 'Locked'}
                    </Badge>
                  </div>
                  <p className="mt-3 font-mono text-gray-600 text-sm">{card.number}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Card Details */}
        <Card className="lg:col-span-2 border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Card Details</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" /> Card Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Shield className="h-4 w-4 mr-2" /> Change PIN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Card Visual */}
            <div className={`relative p-6 rounded-2xl text-white ${getCardGradient(selectedCard.color)} shadow-xl`}>
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  {showCardNumber ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              <div className="mb-6">
                <p className="text-sm opacity-70 mb-1">{selectedCard.type}</p>
                <p className="text-lg font-semibold">{selectedCard.name}</p>
              </div>
              <div className="mb-6">
                <p className="font-mono text-xl tracking-widest">
                  {showCardNumber ? '5412 7534 8901 4582' : selectedCard.number}
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-70">Expires</p>
                  <p className="font-medium">{selectedCard.expiryDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-70">CVV</p>
                  <p className="font-medium">{showCardNumber ? '***' : '***'}</p>
                </div>
                <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-sm font-bold">VISA</span>
                </div>
              </div>
            </div>

            {/* Card Limit (if credit card) */}
            {selectedCard.limit && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-500">Card Limit</p>
                  <div className="flex items-center gap-2">
                    {editingLimit ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={newLimit}
                          onChange={(e) => setNewLimit(e.target.value)}
                          className="h-8 w-32 text-sm"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          className="h-8 w-8 bg-green-500 hover:bg-green-600"
                          onClick={handleSaveLimit}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => setEditingLimit(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-gray-900">{formatCurrency(selectedCard.limit)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-[#EC0000]"
                          onClick={handleEditLimit}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <Progress value={(selectedCard.used / selectedCard.limit) * 100} className="h-2 mb-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Used: <span className="text-gray-900 font-medium">{formatCurrency(selectedCard.used)}</span></span>
                  <span className="text-gray-500">Available: <span className="text-green-600 font-medium">{formatCurrency(selectedCard.available)}</span></span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 hover:border-[#EC0000] hover:text-[#EC0000]"
                onClick={handleToggleLock}
              >
                {selectedCard.status === 'active' ? (
                  <Lock className="h-5 w-5" />
                ) : (
                  <Unlock className="h-5 w-5" />
                )}
                <span className="text-xs">{selectedCard.status === 'active' ? 'Lock Card' : 'Unlock'}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 hover:border-[#EC0000] hover:text-[#EC0000]"
              >
                <Shield className="h-5 w-5" />
                <span className="text-xs">View PIN</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 hover:border-[#EC0000] hover:text-[#EC0000]"
                onClick={() => {
                  navigator.clipboard.writeText(selectedCard.number.replace(/\s/g, '').replace(/\*/g, ''));
                  toast.success('Card number copied');
                }}
              >
                <Copy className="h-5 w-5" />
                <span className="text-xs">Copy</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4 hover:border-[#EC0000] hover:text-[#EC0000]"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="text-xs">Settings</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Card Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5 text-gray-500" />
                        <Label htmlFor="online" className="cursor-pointer">
                          Online Shopping
                        </Label>
                      </div>
                      <Switch
                        id="online"
                        checked={cardSettings.onlineShopping}
                        onCheckedChange={(checked) =>
                          setCardSettings({ ...cardSettings, onlineShopping: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-gray-500" />
                        <Label htmlFor="international" className="cursor-pointer">
                          International Payments
                        </Label>
                      </div>
                      <Switch
                        id="international"
                        checked={cardSettings.internationalPayments}
                        onCheckedChange={(checked) =>
                          setCardSettings({ ...cardSettings, internationalPayments: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-gray-500" />
                        <Label htmlFor="contactless" className="cursor-pointer">
                          Contactless Payment
                        </Label>
                      </div>
                      <Switch
                        id="contactless"
                        checked={cardSettings.contactless}
                        onCheckedChange={(checked) =>
                          setCardSettings({ ...cardSettings, contactless: checked })
                        }
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Recent Card Transactions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Card Transactions</h3>
                <Button variant="ghost" size="sm" className="text-[#EC0000] hover:text-[#CC0000] hover:bg-red-50">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-2">
                {transactions.filter(tx => tx.type === 'expense').slice(0, 4).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.title}</p>
                        <p className="text-xs text-gray-500">{tx.date} • {tx.time}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">{formatCurrency(Math.abs(tx.amount))}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardsPage;
