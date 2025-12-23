import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  CreditCard,
  ArrowLeftRight,
  FileText,
  PiggyBank,
  TrendingUp,
  Settings,
  HelpCircle,
  Shield,
  Landmark
} from 'lucide-react';
import { cn } from '../../lib/utils';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'accounts', label: 'Accounts', icon: Landmark, path: '/accounts' },
  { id: 'cards', label: 'Cards', icon: CreditCard, path: '/cards' },
  { id: 'transfers', label: 'Transfers', icon: ArrowLeftRight, path: '/transfers' },
  { id: 'bills', label: 'Pay Bills', icon: FileText, path: '/bills' },
  { id: 'savings', label: 'Savings', icon: PiggyBank, path: '/savings' },
  { id: 'investments', label: 'Investments', icon: TrendingUp, path: '/investments' },
];

const bottomMenuItems = [
  { id: 'security', label: 'Security', icon: Shield, path: '/security' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const MenuItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <button
        onClick={() => handleNavigation(item.path)}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
          isActive
            ? 'bg-[#EC0000] text-white shadow-lg shadow-red-200'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-gray-500')} />
        <span className="font-medium text-sm">{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-100 z-40 transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Main Menu */}
          <nav className="flex-1 space-y-1">
            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Menu
            </p>
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </nav>

          {/* Bottom Menu */}
          <div className="border-t border-gray-100 pt-4 space-y-1">
            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Other
            </p>
            {bottomMenuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>

          {/* App Version */}
          <div className="mt-4 px-4 py-2">
            <p className="text-xs text-gray-400 text-center">Version 3.2.1</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
