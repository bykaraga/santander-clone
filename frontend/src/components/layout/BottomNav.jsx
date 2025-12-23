import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, CreditCard, ArrowLeftRight, FileText, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'accounts', label: 'Accounts', icon: CreditCard, path: '/accounts' },
  { id: 'transfers', label: 'Transfer', icon: ArrowLeftRight, path: '/transfers' },
  { id: 'bills', label: 'Bills', icon: FileText, path: '/bills' },
  { id: 'more', label: 'More', icon: MoreHorizontal, path: '/more' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px]',
                isActive
                  ? 'text-[#EC0000]'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <div className={cn(
                'p-1.5 rounded-lg transition-all duration-200',
                isActive ? 'bg-red-50' : ''
              )}>
                <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
