import  { useState, createContext, useContext } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Globe, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '../../public/Assests/khyate_logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/storeSlice';
import { useLoading } from '../loader/LoaderContext';

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
  const user = useSelector((state) => state.store.currentUser);
console.log(user)
  const dispatch = useDispatch();
  const {handleLoading} = useLoading();

  const handleLogout = () => {
    handleLoading(true);
    try {
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
    handleLoading(false);
  };

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
          <div className=" px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to={user?.user_role?.name === "admin" ? '/admin/dashboard' : '/tailor/dashboard'} className="flex items-center cursor-pointer space-x-4 rtl:space-x-reverse">
                <img
                  src={logo}
                  alt="Tailor Logo"
                  className="h-12 w-auto"
                />
              </Link>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Language Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className=""
                >
                  <Globe className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t.language}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="">
                      <User className="w-4 h-4 rtl:mr-0 rtl:ml-1" />
                      {user?.user_role?.name === "admin" ? user?.first_name : user?.ownerName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={direction === 'rtl' ? 'start' : 'end'} className="w-56">
                    {/* <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      <span>{t.profile}</span>
                    </DropdownMenuItem> */}
                    {/* <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      <span>{t.settings}</span>
                    </DropdownMenuItem> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
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