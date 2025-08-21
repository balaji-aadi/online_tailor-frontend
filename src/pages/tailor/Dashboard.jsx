import React from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Star, 
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  User,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

const TailorDashboard = () => {
  const { language } = useLanguage();

  const stats = [
    {
      title: language === 'en' ? 'Active Orders' : 'الطلبات النشطة',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: ShoppingBag,
      color: 'primary'
    },
    {
      title: language === 'en' ? 'Monthly Revenue' : 'الإيرادات الشهرية',
      value: 'AED 12,450',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'success'
    },
    {
      title: language === 'en' ? 'Customer Rating' : 'تقييم العملاء',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'gold'
    },
    {
      title: language === 'en' ? 'Avg. Completion Time' : 'متوسط وقت الإنجاز',
      value: '3.2 days',
      change: '-0.5',
      trend: 'up',
      icon: Clock,
      color: 'warning'
    }
  ];

  const recentOrders = [
    {
      id: '#ORD-2847',
      customer: 'Ahmed Al Mansouri',
      service: language === 'en' ? 'Kandura Tailoring' : 'خياطة كندورة',
      status: 'in_progress',
      deadline: '2024-03-20',
      amount: 'AED 450',
      priority: 'high'
    },
    {
      id: '#ORD-2845',
      customer: 'Sarah Johnson',
      service: language === 'en' ? 'Abaya Alteration' : 'تعديل عباية',
      status: 'cutting',
      deadline: '2024-03-18',
      amount: 'AED 180',
      priority: 'medium'
    },
    {
      id: '#ORD-2843',
      customer: 'Mohammed Ali',
      service: language === 'en' ? 'Bisht Custom' : 'بشت مخصص',
      status: 'quality_check',
      deadline: '2024-03-22',
      amount: 'AED 890',
      priority: 'high'
    }
  ];

  const todaySchedule = [
    {
      time: '09:00',
      customer: 'Fatima Al Zahra',
      service: language === 'en' ? 'Fitting Appointment' : 'موعد القياس',
      type: 'fitting'
    },
    {
      time: '11:30',
      customer: 'Omar Hassan',
      service: language === 'en' ? 'Design Consultation' : 'استشارة التصميم',
      type: 'consultation'
    },
    {
      time: '14:00',
      customer: 'Layla Ahmed',
      service: language === 'en' ? 'Final Delivery' : 'التسليم النهائي',
      type: 'delivery'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      in_progress: { label: language === 'en' ? 'In Progress' : 'قيد التنفيذ', class: 'bg-primary/10 text-primary' },
      cutting: { label: language === 'en' ? 'Cutting' : 'القص', class: 'bg-warning/10 text-warning' },
      quality_check: { label: language === 'en' ? 'Quality Check' : 'فحص الجودة', class: 'bg-success/10 text-success' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: language === 'en' ? 'High' : 'عالي', class: 'bg-destructive/10 text-destructive' },
      medium: { label: language === 'en' ? 'Medium' : 'متوسط', class: 'bg-warning/10 text-warning' }
    };
    
    const config = priorityConfig[priority];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Welcome back!' : 'مرحباً بعودتك!'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? "Here's what's happening with your tailoring business today." : 'إليك ما يحدث مع أعمال الخياطة اليوم.'}
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button variant="outline" className="hover-lift">
            <CalendarIcon className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === 'en' ? 'Schedule' : 'الجدولة'}
          </Button>
          <Button className="btn-premium">
            {language === 'en' ? 'New Order' : 'طلب جديد'}
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
                    <TrendingUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm font-medium text-success">{stat.change}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      {language === 'en' ? 'this month' : 'هذا الشهر'}
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
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {getStatusBadge(order.status)}
                        {getPriorityBadge(order.priority)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{order.customer}</p>
                    <p className="text-sm font-medium text-foreground">{order.service}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-2 space-x-4 rtl:space-x-reverse">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {language === 'en' ? 'Due:' : 'الموعد النهائي:'} {order.deadline}
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

        {/* Today's Schedule */}
        <Card className="card-elevated">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>{language === 'en' ? "Today's Schedule" : 'جدول اليوم'}</span>
              <Button variant="outline" size="sm" className="hover-lift">
                {language === 'en' ? 'Full Calendar' : 'التقويم الكامل'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((appointment, index) => (
                <div key={index} className="flex items-center p-4 bg-secondary/30 rounded-xl hover-lift">
                  <div className="w-16 text-center">
                    <div className="bg-primary text-primary-foreground rounded-lg py-2 px-3">
                      <span className="text-sm font-semibold">{appointment.time}</span>
                    </div>
                  </div>
                  <div className="flex-1 ml-4 rtl:ml-0 rtl:mr-4">
                    <div className="flex items-center mb-1">
                      <User className="w-4 h-4 text-muted-foreground mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="font-medium text-foreground">{appointment.customer}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                  </div>
                  <div className="text-right rtl:text-left">
                    {appointment.type === 'fitting' && <CheckCircle className="w-5 h-5 text-success" />}
                    {appointment.type === 'consultation' && <AlertCircle className="w-5 h-5 text-warning" />}
                    {appointment.type === 'delivery' && <Star className="w-5 h-5 text-gold" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col hover-lift">
              <ShoppingBag className="w-6 h-6 mb-2" />
              <span className="text-sm">{language === 'en' ? 'New Order' : 'طلب جديد'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-lift">
              <User className="w-6 h-6 mb-2" />
              <span className="text-sm">{language === 'en' ? 'Customer List' : 'قائمة العملاء'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-lift">
              <CalendarIcon className="w-6 h-6 mb-2" />
              <span className="text-sm">{language === 'en' ? 'Schedule' : 'الجدولة'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-lift">
              <Star className="w-6 h-6 mb-2" />
              <span className="text-sm">{language === 'en' ? 'Reviews' : 'التقييمات'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TailorDashboard;