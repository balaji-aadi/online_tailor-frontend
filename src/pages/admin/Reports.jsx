import React from 'react';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/Layout';

const Reports = () => {
  const { language } = useLanguage();

  const reportTypes = [
    {
      title: language === 'en' ? 'Revenue Report' : 'تقرير الإيرادات',
      description: language === 'en' ? 'Monthly revenue analysis and trends' : 'تحليل الإيرادات الشهرية والاتجاهات',
      lastGenerated: '2024-03-15',
      icon: TrendingUp,
      color: 'primary'
    },
    {
      title: language === 'en' ? 'User Activity Report' : 'تقرير نشاط المستخدمين',
      description: language === 'en' ? 'User engagement and platform usage statistics' : 'مشاركة المستخدمين وإحصائيات استخدام المنصة',
      lastGenerated: '2024-03-14',
      icon: FileText,
      color: 'gold'
    },
    {
      title: language === 'en' ? 'Tailor Performance Report' : 'تقرير أداء الخياطين',
      description: language === 'en' ? 'Individual tailor metrics and performance analysis' : 'مقاييس الخياطين الفردية وتحليل الأداء',
      lastGenerated: '2024-03-13',
      icon: Calendar,
      color: 'success'
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'en' ? 'Reports & Analytics' : 'التقارير والتحليلات'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'en' ? 'Generate and download comprehensive business reports' : 'إنشاء وتحميل تقارير الأعمال الشاملة'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reportTypes.map((report, index) => (
          <Card key={index} className="card-elevated hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${report.color}/10`}>
                  <report.icon className={`w-6 h-6 text-${report.color}`} />
                </div>
                <Button variant="outline" size="sm" className="hover-lift">
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Download' : 'تحميل'}
                </Button>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{report.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{language === 'en' ? 'Last Generated:' : 'آخر إنشاء:'}</span>
                <span>{report.lastGenerated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Report Summary' : 'ملخص التقرير'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">847</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Reports Generated' : 'التقارير المُنشأة'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">AED 2.4M</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Total Revenue Tracked' : 'إجمالي الإيرادات المتتبعة'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">15</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Avg. Report Generation Time (min)' : 'متوسط وقت إنشاء التقرير (دقيقة)'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">98%</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Data Accuracy' : 'دقة البيانات'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Generator */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Custom Report Generator' : 'مولد التقارير المخصصة'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {language === 'en' ? 'Create Custom Reports' : 'إنشاء تقارير مخصصة'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'en' ? 'Generate customized reports based on specific date ranges, metrics, and filters' : 'إنشاء تقارير مخصصة بناءً على نطاقات تاريخية ومقاييس ومرشحات محددة'}
            </p>
            <Button className="btn-premium">
              {language === 'en' ? 'Build Custom Report' : 'بناء تقرير مخصص'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;