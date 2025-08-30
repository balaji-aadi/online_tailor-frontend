import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  UserCheck,
  Scissors,
  ShoppingBag,
  Star,
  MessageSquare,
  Calendar,
  Settings,
  TrendingUp,
  Menu,
  X,
  Globe,
  ChevronLeft,
  ChevronRight,
  Layers,
  ChevronDown,
  ChevronUp,
  Shirt,
  Target,
  Ruler
} from 'lucide-react';
import { useLanguage } from './Layout';

const Navigation = ({ type = 'admin' }) => {
  const { language, direction, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const toggleExpanded = (itemKey) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const adminNavItems = [
    {
      title: language === 'en' ? 'Dashboard' : 'لوحة التحكم',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      exact: true
    },
    {
      title: language === 'en' ? 'User Management' : 'إدارة المستخدمين',
      href: '/admin/users',
      icon: Users
    },
    {
      title: language === 'en' ? 'Analytics' : 'التحليلات',
      href: '/admin/analytics',
      icon: BarChart3
    },
    {
      title: language === 'en' ? 'Tailor Verification' : 'تحقق من الخياطين',
      href: '/admin/verification',
      icon: UserCheck,
    },
    {
      title: language === 'en' ? 'Content Management' : 'إدارة المحتوى',
      href: '/admin/content',
      icon: FileText
    },
    {
      title: language === 'en' ? 'Disputes' : 'النزاعات',
      href: '/admin/disputes',
      icon: MessageSquare,
    },
    {
      title: language === 'en' ? 'Reports' : 'التقارير',
      href: '/admin/reports',
      icon: TrendingUp
    },
    {
      key: 'masters',
      title: language === 'en' ? 'Masters' : 'البيانات الرئيسية',
      href: '/admin/master',
      icon: Layers,
      children: [
        {
          title: language === 'en' ? 'Fabrics' : 'الأقمشة',
          href: '/admin/master/fabrics',
          icon: Shirt
        },
        {
          title: language === 'en' ? 'Specialties' : 'التخصصات',
          href: '/admin/master/specialties',
          icon: Target
        },
        {
          title: language === 'en' ? 'Measurements' : 'القياسات',
          href: '/admin/master/measurements',
          icon: Ruler
        },
        {
          title: language === 'en' ? 'Category' : 'الفئة',
          href: '/admin/master/category',
          icon:  Globe,
        }

      ]
    },
    {
      title: language === 'en' ? 'Settings' : 'الإعدادات',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  const tailorNavItems = [
    {
      title: language === 'en' ? 'Dashboard' : 'لوحة التحكم',
      href: '/tailor/dashboard',
      icon: LayoutDashboard,
      exact: true
    },
    {
      title: language === 'en' ? 'Profile' : 'الملف الشخصي',
      href: '/tailor/profile',
      icon: Users
    },
    {
      title: language === 'en' ? 'Orders' : 'الطلبات',
      href: '/tailor/orders',
      icon: ShoppingBag,
    },
    {
      title: language === 'en' ? 'Services' : 'الخدمات',
      href: '/tailor/services',
      icon: Scissors
    },
    {
      title: language === 'en' ? 'Portfolio' : 'معرض الأعمال',
      href: '/tailor/portfolio',
      icon: Star
    },
    {
      title: language === 'en' ? 'Calendar' : 'التقويم',
      href: '/tailor/calendar',
      icon: Calendar
    },
    {
      title: language === 'en' ? 'Analytics' : 'التحليلات',
      href: '/tailor/analytics',
      icon: BarChart3
    },
    {
      title: language === 'en' ? 'Messages' : 'الرسائل',
      href: '/tailor/messages',
      icon: MessageSquare,
    }
  ];

  const navItems = type === 'admin' ? adminNavItems : tailorNavItems;

  const renderNavItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.key || item.href];

    return (
      <li key={item.href || item.key}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleExpanded(item.key || item.href)}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 gap-4 group text-muted-foreground hover:text-foreground hover:bg-secondary/50 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
              style={{ paddingLeft: level > 0 ? `${level * 20 + 16}px` : '16px' }}
            >
              {item.icon && <item.icon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />}
              {!isCollapsed && (
                <>
                  <span className="font-semibold flex-1 text-start text-xs">{item.title}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </>
              )}
            </button>

            {isExpanded && !isCollapsed && (
              <ul className="mt-1 space-y-1">
                {item.children.map(child => renderNavItem(child, level + 1))}
              </ul>
            )}
          </>
        ) : (
          <NavLink
            to={item.href}
            end={item.exact}
            onClick={() => isMobile && setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl transition-all duration-300 gap-4 group ${isActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              } ${direction === 'rtl' ? 'flex-row-reverse' : ''}`
            }
            style={{ paddingLeft: level > 0 ? `${level * 20 + 16}px` : '16px' }}
          >
            {item.icon && <item.icon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />}
            <span className="font-semibold text-xs">{item.title}</span>
            {item.badge && (
              <span className={`ml-auto px-2 py-1 text-xs bg-gold text-gold-foreground rounded-full font-semibold ${direction === 'rtl' ? 'ml-0 mr-auto' : ''}`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        )}
      </li>
    );
  };

  if (isMobile && isOpen) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
        <nav className={`fixed top-0 ${direction === 'rtl' ? 'right-0' : 'left-0'} h-full w-64 bg-card border-r border-border z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : direction === 'rtl' ? 'translate-x-full' : '-translate-x-full'}`}>
          <div className="p-4 flex items-center justify-between border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              {type === 'admin' ?
                (language === 'en' ? 'Admin Portal' : 'بوابة الإدارة') :
                (language === 'en' ? 'Tailor Portal' : 'بوابة الخياط')
              }
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-full pb-20">
            <ul className="space-y-2">
              {navItems.map(item => renderNavItem(item))}
            </ul>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      {/* Mobile header bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-card border-b border-border p-4 flex items-center justify-between z-30 md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 rounded-md hover:bg-secondary"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold text-foreground">
            {type === 'admin' ?
              (language === 'en' ? 'Admin' : 'إدارة') :
              (language === 'en' ? 'Tailor' : 'خياط')
            }
          </h2>
          <div className="w-6"></div>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav className={`bg-card border-r border-border h-full shadow-soft hidden md:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 flex items-center justify-between border-b border-border">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-foreground">
              {type === 'admin' ?
                (language === 'en' ? 'Admin Portal' : 'بوابة الإدارة') :
                (language === 'en' ? 'Tailor Portal' : 'بوابة الخياط')
              }
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-secondary hover:text-white"
            aria-label={isCollapsed ? (language === 'en' ? 'Expand sidebar' : 'توسيع الشريط الجانبي') : (language === 'en' ? 'Collapse sidebar' : 'طي الشريط الجانبي')}
          >
            {direction === 'rtl' ? (
              isCollapsed ? <ChevronLeft className="w-5 h-5 " /> : <ChevronRight className="w-5 h-5 " />
            ) : (
              isCollapsed ? <ChevronRight className="w-5 h-5 ml-2 " /> : <ChevronLeft className="w-5 h-5 " />
            )}
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full pb-20">
          <ul className="space-y-2">
            {navItems.map(item => renderNavItem(item))}
          </ul>
        </div>
      </nav>

      {/* Add padding for mobile header */}
      {isMobile && <div className="h-16 md:hidden"></div>}
    </>
  );
};

export default Navigation;