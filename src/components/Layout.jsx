import { useState, createContext, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Globe, User, LogOut } from 'lucide-react';
import NotificationBell from './Notification/NotificationBell';
import logo from '../../public/Assests/khyate_logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/storeSlice';


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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.store.currentUser);

  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
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
                {/* Notification Bell */}
                <NotificationBell />

                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Globe className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t.language}
                </button>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {user?.user_role?.name === "admin" ? user?.first_name : user?.ownerName}
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      <span>{t.logout}</span>
                    </button>
                  </div>
                </div>
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