import React, { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X, Globe, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const Layout = () => {
  const [language, setLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  const toggleLanguage = () => {
    if (language === 'en') {
      setLanguage('ar');
      setDirection('rtl');
      document.dir = 'rtl';
    } else {
      setLanguage('en');
      setDirection('ltr');
      document.dir = 'ltr';
    }
  };

  const translations = {
    en: {
      language: 'العربية',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      admin: 'Admin Portal',
      tailor: 'Tailor Portal'
    },
    ar: {
      language: 'English',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      admin: 'بوابة الإدارة',
      tailor: 'بوابة الخياط'
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      <div className={`min-h-screen bg-background ${direction === 'rtl' ? 'font-arabic' : 'font-inter'}`}>
        {/* Top Header */}
        <header className="bg-card border-b border-border shadow-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-gradient-hero p-2 rounded-xl shadow-gold">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">UAE Tailor</h1>
                  <p className="text-xs text-muted-foreground">Professional Tailoring Platform</p>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Language Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="hover-lift"
                >
                  <Globe className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t.language}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="hover-lift">
                      <User className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      Admin User
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={direction === 'rtl' ? 'start' : 'end'} className="w-56">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      <span>{t.profile}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      <span>{t.settings}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      <span>{t.logout}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default Layout;