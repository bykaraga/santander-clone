import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  PiggyBank,
  TrendingUp,
  Shield,
  Settings,
  HelpCircle,
  ChevronRight,
  FileText,
  Bell,
  User,
  Gift
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const menuItems = [
  {
    id: 'cards',
    label: 'Kartlarım',
    description: 'Kart yönetimi ve işlemler',
    icon: CreditCard,
    path: '/cards'
  },
  {
    id: 'savings',
    label: 'Birikim',
    description: 'Tasarruf hedefleriniz',
    icon: PiggyBank,
    path: '/savings'
  },
  {
    id: 'investments',
    label: 'Yatırımlar',
    description: 'Yatırım ürünleri',
    icon: TrendingUp,
    path: '/investments'
  },
  {
    id: 'campaigns',
    label: 'Kampanyalar',
    description: 'Fırsatlar ve indirimler',
    icon: Gift,
    path: '/campaigns'
  },
  {
    id: 'statements',
    label: 'Hesap Özetleri',
    description: 'Ekstreler ve raporlar',
    icon: FileText,
    path: '/statements'
  },
  {
    id: 'notifications',
    label: 'Bildirim Ayarları',
    description: 'Bildirim tercihleri',
    icon: Bell,
    path: '/notification-settings'
  },
  {
    id: 'profile',
    label: 'Profil',
    description: 'Kişisel bilgiler',
    icon: User,
    path: '/profile'
  },
  {
    id: 'security',
    label: 'Güvenlik',
    description: 'Şifre ve güvenlik ayarları',
    icon: Shield,
    path: '/security'
  },
  {
    id: 'settings',
    label: 'Ayarlar',
    description: 'Uygulama ayarları',
    icon: Settings,
    path: '/settings'
  },
  {
    id: 'help',
    label: 'Yardım',
    description: 'Sıkça sorulan sorular',
    icon: HelpCircle,
    path: '/help'
  },
];

const MorePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daha Fazla</h1>
        <p className="text-gray-500 text-sm mt-1">Tüm özellikler ve ayarlar</p>
      </div>

      {/* Menu Grid */}
      <div className="grid sm:grid-cols-2 gap-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className="border-gray-100 hover:border-[#EC0000]/30 hover:shadow-lg hover:shadow-red-100/50 transition-all duration-200 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[#EC0000]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* App Info */}
      <div className="text-center pt-8 border-t border-gray-100">
        <div className="w-16 h-16 bg-[#EC0000] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <p className="text-gray-900 font-medium">Santander Mobile Banking</p>
        <p className="text-xs text-gray-500 mt-1">Versiyon 3.2.1</p>
        <p className="text-xs text-gray-400 mt-4">
          © 2025 Santander Türkiye. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
};

export default MorePage;
