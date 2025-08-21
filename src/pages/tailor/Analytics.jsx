import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Star, Clock, ShoppingBag, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/Layout';

const TailorAnalytics = () => {
  const { language } = useLanguage();

  const performanceMetrics = [
    {
      title: language === 'en' ? 'Monthly Revenue' : 'الإيرادات الشهرية',
      value: 'AED 12,450',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'success'
    },
    {
      title: language === 'en' ? 'Completed Orders' : 'الطلبات المكتملة',
      value: '89',
      change: '+12%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'primary'
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

  const topServices = [
    {
      name: language === 'en' ? 'Traditional Kandura' : 'كندورة تقليدية',
      orders: 34,
      revenue: 'AED 15,300',
      percentage: 85
    },
    {
      name: language === 'en' ? 'Abaya Alterations' : 'تعديلات العباءات',
      orders: 28,
      revenue: 'AED 5,040',
      percentage: 70
    },
    {
      name: language === 'en' ? 'Luxury Bisht' : 'بشت فاخر',
      orders: 12,
      revenue: 'AED 10,680',
      percentage: 40
    },
    {
      name: language === 'en' ? 'General Alterations' : 'تعديلات عامة',
      orders: 45,
      revenue: 'AED 3,600',
      percentage: 95
    }
  ];

  const monthlyTrends = [
    { month: language === 'en' ? 'Jan' : 'يناير', orders: 62, revenue: 8900 },
    { month: language === 'en' ? 'Feb' : 'فبراير', orders: 74, revenue: 10200 },
    { month: language === 'en' ? 'Mar' : 'مارس', orders: 89, revenue: 12450 },
  ];

  const customerInsights = {
    totalCustomers: 156,
    repeatCustomers: 89,
    newCustomers: 23,
    avgOrderValue: 'AED 140',
    satisfactionRate: '96%'
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'en' ? 'Business Analytics' : 'تحليلات الأعمال'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'en' ? 'Track your performance and grow your business' : 'تتبع أداءك وتنمية أعمالك'}
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="card-elevated hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm font-medium text-success">{metric.change}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      {language === 'en' ? 'this month' : 'هذا الشهر'}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${metric.color}/10`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Revenue Trends' : 'اتجاهات الإيرادات'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{trend.month}</p>
                    <p className="text-sm text-muted-foreground">
                      {trend.orders} {language === 'en' ? 'orders' : 'طلب'}
                    </p>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className="font-bold text-foreground">AED {trend.revenue.toLocaleString()}</p>
                    <div className="w-24 bg-secondary rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full" 
                        style={{ width: `${(trend.revenue / 15000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Top Performing Services' : 'الخدمات الأكثر أداءً'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-foreground">{service.name}</p>
                    <p className="font-bold text-foreground">{service.revenue}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{service.orders} {language === 'en' ? 'orders' : 'طلب'}</span>
                    <span>{service.percentage}% {language === 'en' ? 'completion' : 'إنجاز'}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Insights */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            {language === 'en' ? 'Customer Insights' : 'رؤى العملاء'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-secondary/30 rounded-xl">
              <p className="text-2xl font-bold text-foreground">{customerInsights.totalCustomers}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Total Customers' : 'إجمالي العملاء'}
              </p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-xl">
              <p className="text-2xl font-bold text-foreground">{customerInsights.repeatCustomers}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Repeat Customers' : 'عملاء متكررون'}
              </p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-xl">
              <p className="text-2xl font-bold text-foreground">{customerInsights.newCustomers}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'New This Month' : 'جدد هذا الشهر'}
              </p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-xl">
              <p className="text-2xl font-bold text-foreground">{customerInsights.avgOrderValue}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Avg. Order Value' : 'متوسط قيمة الطلب'}
              </p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-xl">
              <p className="text-2xl font-bold text-foreground">{customerInsights.satisfactionRate}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Satisfaction Rate' : 'معدل الرضا'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals and Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Monthly Goals' : 'الأهداف الشهرية'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Revenue Target' : 'هدف الإيرادات'}
                  </span>
                  <span className="text-sm font-bold text-foreground">AED 12,450 / 15,000</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div className="bg-gradient-primary h-3 rounded-full" style={{ width: '83%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">83% {language === 'en' ? 'completed' : 'مكتمل'}</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Orders Target' : 'هدف الطلبات'}
                  </span>
                  <span className="text-sm font-bold text-foreground">89 / 100</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div className="bg-gradient-gold h-3 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">89% {language === 'en' ? 'completed' : 'مكتمل'}</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {language === 'en' ? 'Customer Satisfaction' : 'رضا العملاء'}
                  </span>
                  <span className="text-sm font-bold text-foreground">4.8 / 5.0</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div className="bg-success h-3 rounded-full" style={{ width: '96%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">96% {language === 'en' ? 'completed' : 'مكتمل'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Performance Summary' : 'ملخص الأداء'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                <span className="text-sm font-medium text-foreground">
                  {language === 'en' ? 'Best Month' : 'أفضل شهر'}
                </span>
                <span className="text-sm font-bold text-success">
                  {language === 'en' ? 'March 2024' : 'مارس 2024'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gold/10 rounded-lg">
                <span className="text-sm font-medium text-foreground">
                  {language === 'en' ? 'Top Service' : 'أفضل خدمة'}
                </span>
                <span className="text-sm font-bold text-gold-dark">
                  {language === 'en' ? 'Traditional Kandura' : 'كندورة تقليدية'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium text-foreground">
                  {language === 'en' ? 'Growth Rate' : 'معدل النمو'}
                </span>
                <span className="text-sm font-bold text-primary">+18%</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                <span className="text-sm font-medium text-foreground">
                  {language === 'en' ? 'Avg. Response Time' : 'متوسط وقت الاستجابة'}
                </span>
                <span className="text-sm font-bold text-warning">2.3 {language === 'en' ? 'hours' : 'ساعة'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TailorAnalytics;