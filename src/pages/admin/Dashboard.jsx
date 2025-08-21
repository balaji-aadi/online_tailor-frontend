import React from 'react';
import { 
  Users, 
  Scissors, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Star,
  Clock,
  MapPin,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

const Dashboard = () => {
  const { language, direction, t } = useLanguage();

  const stats = [
    {
      title: language === 'en' ? 'Total Users' : 'إجمالي المستخدمين',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'primary'
    },
    {
      title: language === 'en' ? 'Active Tailors' : 'الخياطين النشطين',
      value: '186',
      change: '+8%',
      trend: 'up',
      icon: Scissors,
      color: 'gold'
    },
    {
      title: language === 'en' ? 'Total Orders' : 'إجمالي الطلبات',
      value: '3,429',
      change: '+23%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'success'
    },
    {
      title: language === 'en' ? 'Revenue (AED)' : 'الإيرادات (درهم)',
      value: '847,392',
      change: '-2%',
      trend: 'down',
      icon: DollarSign,
      color: 'warning'
    }
  ];

  const recentOrders = [
    {
      id: '#ORD-2847',
      customer: 'Ahmed Al Mansouri',
      tailor: 'Fatima Tailoring',
      service: language === 'en' ? 'Kandura Tailoring' : 'خياطة كندورة',
      amount: 'AED 450',
      status: 'in_progress',
      time: '2 hours ago',
      location: 'Dubai'
    },
    {
      id: '#ORD-2846',
      customer: 'Sarah Johnson',
      tailor: 'Royal Stitches',
      service: language === 'en' ? 'Abaya Alteration' : 'تعديل عباية',
      amount: 'AED 180',
      status: 'completed',
      time: '5 hours ago',
      location: 'Abu Dhabi'
    },
    {
      id: '#ORD-2845',
      customer: 'Mohammed Ali',
      tailor: 'Classic Tailors',
      service: language === 'en' ? 'Bisht Custom' : 'بشت مخصص',
      amount: 'AED 890',
      status: 'pending',
      time: '1 day ago',
      location: 'Sharjah'
    }
  ];

  const topTailors = [
    {
      name: 'Fatima Tailoring',
      rating: 4.9,
      orders: 234,
      revenue: 'AED 45,680',
      specialty: language === 'en' ? 'Traditional Wear' : 'الملابس التراثية',
      location: 'Dubai'
    },
    {
      name: 'Royal Stitches',
      rating: 4.8,
      orders: 189,
      revenue: 'AED 38,920',
      specialty: language === 'en' ? 'Formal Wear' : 'الملابس الرسمية',
      location: 'Abu Dhabi'
    },
    {
      name: 'Classic Tailors',
      rating: 4.7,
      orders: 156,
      revenue: 'AED 31,450',
      specialty: language === 'en' ? 'Men\'s Wear' : 'ملابس رجالية',
      location: 'Sharjah'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: language === 'en' ? 'Completed' : 'مكتمل', variant: 'success' },
      in_progress: { label: language === 'en' ? 'In Progress' : 'قيد التنفيذ', variant: 'warning' },
      pending: { label: language === 'en' ? 'Pending' : 'معلق', variant: 'secondary' }
    };
    
    const config = statusConfig[status];
    return (
      <Badge className={`status-${config.variant.replace('success', 'active')}`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Admin Dashboard' : 'لوحة تحكم الإدارة'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? 'Welcome back! Here\'s what\'s happening with your platform.' : 'مرحباً بك! إليك ما يحدث على منصتك.'}
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button variant="outline" className="hover-lift">
            <Filter className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === 'en' ? 'Filter' : 'تصفية'}
          </Button>
          <Button className="btn-premium">
            {language === 'en' ? 'Generate Report' : 'إنشاء تقرير'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-elevated hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-success mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      {language === 'en' ? 'from last month' : 'من الشهر الماضي'}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}/10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="card-elevated">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>{language === 'en' ? 'Recent Orders' : 'الطلبات الأخيرة'}</span>
              <Button variant="outline" size="sm" className="hover-lift">
                {language === 'en' ? 'View All' : 'عرض الكل'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover-lift">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{order.customer} → {order.tailor}</p>
                    <p className="text-sm font-medium text-foreground">{order.service}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-2 space-x-4 rtl:space-x-reverse">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {order.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {order.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className="font-bold text-lg text-foreground">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Tailors */}
        <Card className="card-elevated">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>{language === 'en' ? 'Top Performing Tailors' : 'أفضل الخياطين أداءً'}</span>
              <Button variant="outline" size="sm" className="hover-lift">
                {language === 'en' ? 'View Rankings' : 'عرض التصنيفات'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTailors.map((tailor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover-lift">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{tailor.name}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-gold fill-current mr-1" />
                        <span className="text-sm font-medium">{tailor.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{tailor.specialty}</p>
                    <div className="flex items-center text-xs text-muted-foreground space-x-4 rtl:space-x-reverse">
                      <span>{tailor.orders} {language === 'en' ? 'orders' : 'طلب'}</span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {tailor.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className="font-bold text-lg text-foreground">{tailor.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;