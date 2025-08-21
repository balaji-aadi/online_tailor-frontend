import React from 'react';
import { FileText, Globe, Edit, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

// Content Management Component

const ContentManagement = () => {
  const { language } = useLanguage();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Content Management' : 'إدارة المحتوى'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? 'Manage multilingual content and cultural information' : 'إدارة المحتوى متعدد اللغات والمعلومات الثقافية'}
          </p>
        </div>
        <Button className="btn-premium">
          <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {language === 'en' ? 'Add Content' : 'إضافة محتوى'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-elevated hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Edit' : 'تحرير'}
              </Button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {language === 'en' ? 'Traditional Garments' : 'الملابس التراثية'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Information about Kandura, Abaya, Bisht and other traditional UAE clothing' : 'معلومات عن الكندورة والعباية والبشت وغيرها من الملابس التراثية الإماراتية'}
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gold/10">
                <Globe className="w-6 h-6 text-gold" />
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Edit' : 'تحرير'}
              </Button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {language === 'en' ? 'Multilingual Content' : 'المحتوى متعدد اللغات'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Manage translations for Arabic and English content across the platform' : 'إدارة الترجمات للمحتوى العربي والإنجليزي عبر المنصة'}
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-success/10">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Edit' : 'تحرير'}
              </Button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {language === 'en' ? 'Legal Documents' : 'الوثائق القانونية'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Terms of service, privacy policies, and UAE compliance documentation' : 'شروط الخدمة وسياسات الخصوصية ووثائق الامتثال الإماراتية'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Recent Updates' : 'التحديثات الأخيرة'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {language === 'en' ? 'Kandura Sizing Guide Updated' : 'تم تحديث دليل مقاسات الكندورة'}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'en' ? 'Added new measurements for traditional fit' : 'تم إضافة قياسات جديدة للقياس التقليدي'}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {language === 'en' ? '2 days ago' : 'منذ يومين'}
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {language === 'en' ? 'Arabic Translation Complete' : 'اكتملت الترجمة العربية'}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'en' ? 'All service descriptions now available in Arabic' : 'جميع أوصاف الخدمات متاحة الآن باللغة العربية'}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {language === 'en' ? '1 week ago' : 'منذ أسبوع'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Content Analytics' : 'تحليلات المحتوى'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Most Viewed Content' : 'المحتوى الأكثر مشاهدة'}
                </span>
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Kandura Guide' : 'دليل الكندورة'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Content Completion' : 'اكتمال المحتوى'}
                </span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Translation Progress' : 'تقدم الترجمة'}
                </span>
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentManagement;