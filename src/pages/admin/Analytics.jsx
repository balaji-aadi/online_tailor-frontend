import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingBag, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/Layout';

const Analytics = () => {
  const { language } = useLanguage();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'en' ? 'Analytics & Reports' : 'التحليلات والتقارير'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'en' ? 'Comprehensive insights into platform performance' : 'رؤى شاملة حول أداء المنصة'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Monthly Revenue' : 'الإيرادات الشهرية'}
                </p>
                <p className="text-3xl font-bold text-foreground">AED 847K</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Total Orders' : 'إجمالي الطلبات'}
                </p>
                <p className="text-3xl font-bold text-foreground">3,429</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <ShoppingBag className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Platform Rating' : 'تقييم المنصة'}
                </p>
                <p className="text-3xl font-bold text-foreground">4.8</p>
              </div>
              <div className="p-3 rounded-xl bg-gold/10">
                <Star className="w-6 h-6 text-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Revenue Trends' : 'اتجاهات الإيرادات'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-secondary/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {language === 'en' ? 'Revenue chart will be displayed here' : 'سيتم عرض مخطط الإيرادات هنا'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;