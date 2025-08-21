import React from 'react';
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
  TrendingUp
} from 'lucide-react';
import { useLanguage } from './Layout';

const Navigation = ({ type = 'admin' }) => {
  const { language, direction, t } = useLanguage();

  const adminNavItems = [
    {
      title: language === 'en' ? 'Dashboard' : 'لوحة التحكم',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true
    },
    {
      title: language === 'en' ? 'User Management' : 'إدارة المستخدمين',
      href: '/admin/users',
      icon: Users,
      badge: '12'
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
      badge: '5'
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
      badge: '3'
    },
    {
      title: language === 'en' ? 'Reports' : 'التقارير',
      href: '/admin/reports',
      icon: TrendingUp
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
      href: '/tailor',
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
      badge: '8'
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
      badge: '2'
    }
  ];

  const navItems = type === 'admin' ? adminNavItems : tailorNavItems;

  return (
    <nav className="bg-card border-r border-border h-full shadow-soft">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            {type === 'admin' ? 
              (language === 'en' ? 'Admin Portal' : 'بوابة الإدارة') : 
              (language === 'en' ? 'Tailor Portal' : 'بوابة الخياط')
            }
          </h2>
          <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
        </div>
        
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-primary text-primary-foreground shadow-elegant'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover-lift'
                  } ${direction === 'rtl' ? 'flex-row-reverse' : ''}`
                }
              >
                <item.icon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                <span className="font-medium">{item.title}</span>
                {item.badge && (
                  <span className={`ml-auto px-2 py-1 text-xs bg-gold text-gold-foreground rounded-full font-semibold ${
                    direction === 'rtl' ? 'ml-0 mr-auto' : ''
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;