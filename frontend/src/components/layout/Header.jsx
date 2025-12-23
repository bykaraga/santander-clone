import React, { useState } from 'react';
import { Bell, Menu, X, User, Settings, LogOut, ChevronDown, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { notifications } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const Header = ({ onMenuClick, isMobileMenuOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { currentUser, availableUsers, switchUser, resetToDefaults } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-gray-100"
            onClick={onMenuClick}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#EC0000] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900">Santander</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#EC0000] text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white">
              <div className="p-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-red-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        !notification.read ? 'bg-[#EC0000]' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <Button variant="ghost" className="w-full text-[#EC0000] hover:text-[#CC0000] hover:bg-red-50 text-sm">
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 px-2">
                <Avatar className="h-8 w-8 bg-[#EC0000]">
                  <AvatarFallback className="bg-[#EC0000] text-white text-sm font-medium">
                    {currentUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {currentUser.firstName}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white">
              <div className="p-3 border-b border-gray-100">
                <p className="font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
              </div>
              
              {/* Switch User Section */}
              <div className="p-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">Switch Account</p>
                {availableUsers.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    onClick={() => switchUser(user.id)}
                    className={`flex items-center gap-2 cursor-pointer ${
                      currentUser.id === user.id ? 'bg-red-50' : ''
                    }`}
                  >
                    <Avatar className="h-6 w-6 bg-[#EC0000]">
                      <AvatarFallback className="bg-[#EC0000] text-white text-xs">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                    {currentUser.id === user.id && (
                      <Badge className="ml-auto bg-[#EC0000] text-white text-xs">Active</Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </div>

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={resetToDefaults}
                className="flex items-center gap-2 cursor-pointer text-orange-600 focus:text-orange-600"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reset Data</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
