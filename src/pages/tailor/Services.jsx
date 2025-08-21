import React, { useState } from 'react';
import { Scissors, Plus, Edit, Trash2, Star, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

const Services = () => {
  const { language } = useLanguage();

  const services = [
    {
      id: 1,
      name: language === 'en' ? 'Traditional Kandura' : 'كندورة تقليدية',
      category: language === 'en' ? 'Traditional Wear' : 'ملابس تراثية',
      description: language === 'en' ? 'Authentic Emirati kandura with traditional cut and fit' : 'كندورة إماراتية أصيلة بقصة وقياس تقليدي',
      basePrice: 400,
      timeRequired: '5-7 days',
      difficulty: 'Expert',
      popularity: 95,
      orders: 234,
      rating: 4.9,
      features: [
        language === 'en' ? 'Premium fabric' : 'قماش فاخر',
        language === 'en' ? 'Hand-stitched details' : 'تفاصيل مخيطة باليد',
        language === 'en' ? 'Traditional collar' : 'ياقة تقليدية',
        language === 'en' ? 'Perfect fit guarantee' : 'ضمان القياس المثالي'
      ]
    },
    {
      id: 2,
      name: language === 'en' ? 'Elegant Abaya' : 'عباية أنيقة',
      category: language === 'en' ? 'Women\'s Wear' : 'ملابس نسائية',
      description: language === 'en' ? 'Modern abaya designs with traditional elegance' : 'تصاميم عباية حديثة بأناقة تقليدية',
      basePrice: 350,
      timeRequired: '4-6 days',
      difficulty: 'Advanced',
      popularity: 88,
      orders: 189,
      rating: 4.8,
      features: [
        language === 'en' ? 'Multiple color options' : 'خيارات ألوان متعددة',
        language === 'en' ? 'Embroidery available' : 'تطريز متاح',
        language === 'en' ? 'Custom sizing' : 'قياس مخصص',
        language === 'en' ? 'Quality fabric' : 'قماش عالي الجودة'
      ]
    },
    {
      id: 3,
      name: language === 'en' ? 'Luxury Bisht' : 'بشت فاخر',
      category: language === 'en' ? 'Formal Wear' : 'ملابس رسمية',
      description: language === 'en' ? 'Premium bisht for special occasions and formal events' : 'بشت مميز للمناسبات الخاصة والفعاليات الرسمية',
      basePrice: 800,
      timeRequired: '7-10 days',
      difficulty: 'Expert',
      popularity: 76,
      orders: 67,
      rating: 4.9,
      features: [
        language === 'en' ? 'Gold embroidery' : 'تطريز ذهبي',
        language === 'en' ? 'Premium materials' : 'مواد فاخرة',
        language === 'en' ? 'Traditional cut' : 'قصة تقليدية',
        language === 'en' ? 'Special occasion ready' : 'جاهز للمناسبات الخاصة'
      ]
    },
    {
      id: 4,
      name: language === 'en' ? 'Alterations Service' : 'خدمة التعديلات',
      category: language === 'en' ? 'Alterations' : 'تعديلات',
      description: language === 'en' ? 'Professional alterations for all types of garments' : 'تعديلات احترافية لجميع أنواع الملابس',
      basePrice: 80,
      timeRequired: '1-3 days',
      difficulty: 'Intermediate',
      popularity: 92,
      orders: 456,
      rating: 4.7,
      features: [
        language === 'en' ? 'Quick turnaround' : 'تسليم سريع',
        language === 'en' ? 'Size adjustments' : 'تعديل المقاسات',
        language === 'en' ? 'Hemming service' : 'خدمة التكميم',
        language === 'en' ? 'Affordable pricing' : 'أسعار معقولة'
      ]
    }
  ];

  const getDifficultyBadge = (difficulty) => {
    const difficultyConfig = {
      'Expert': { class: 'bg-gold/10 text-gold-dark' },
      'Advanced': { class: 'bg-primary/10 text-primary' },
      'Intermediate': { class: 'bg-success/10 text-success' }
    };
    
    const config = difficultyConfig[difficulty] || { class: 'bg-secondary/50 text-secondary-foreground' };
    return <Badge className={config.class}>{difficulty}</Badge>;
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'text-gold';
    if (popularity >= 80) return 'text-success';
    if (popularity >= 70) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Service Catalog' : 'كتالوج الخدمات'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? 'Manage your tailoring services and pricing' : 'إدارة خدمات الخياطة والأسعار'}
          </p>
        </div>
        <Button className="btn-premium">
          <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {language === 'en' ? 'Add Service' : 'إضافة خدمة'}
        </Button>
      </div>

      {/* Service Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Total Services' : 'إجمالي الخدمات'}
                </p>
                <p className="text-3xl font-bold text-foreground">{services.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Scissors className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Avg. Rating' : 'متوسط التقييم'}
                </p>
                <p className="text-3xl font-bold text-foreground">4.8</p>
              </div>
              <div className="p-3 rounded-xl bg-gold/10">
                <Star className="w-6 h-6 text-gold" />
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
                <p className="text-3xl font-bold text-foreground">946</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <Clock className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Avg. Price' : 'متوسط السعر'}
                </p>
                <p className="text-3xl font-bold text-foreground">AED 408</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <DollarSign className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="card-premium hover-lift">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Badge variant="outline">{service.category}</Badge>
                    {getDifficultyBadge(service.difficulty)}
                  </div>
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" size="sm" className="hover-lift">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover-lift">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              
              {/* Service Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">AED {service.basePrice}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Starting Price' : 'السعر الأساسي'}
                  </p>
                </div>
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{service.timeRequired}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Completion Time' : 'وقت الإنجاز'}
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-gold fill-current mr-1" />
                  <span className="font-semibold text-foreground">{service.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    ({service.orders} {language === 'en' ? 'orders' : 'طلب'})
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${getPopularityColor(service.popularity).replace('text-', 'bg-')}`}></div>
                  <span className={`font-medium ${getPopularityColor(service.popularity)}`}>
                    {service.popularity}% {language === 'en' ? 'Popular' : 'مشهور'}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  {language === 'en' ? 'Features:' : 'المميزات:'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Categories */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Service Categories Performance' : 'أداء فئات الخدمات'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-secondary/30 rounded-xl">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Scissors className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {language === 'en' ? 'Traditional Wear' : 'ملابس تراثية'}
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">301 {language === 'en' ? 'orders' : 'طلب'}</p>
                <p className="text-sm font-medium text-foreground">AED 120,400 {language === 'en' ? 'revenue' : 'إيرادات'}</p>
              </div>
            </div>

            <div className="text-center p-6 bg-secondary/30 rounded-xl">
              <div className="w-16 h-16 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-gold-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {language === 'en' ? 'Formal Wear' : 'ملابس رسمية'}
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">67 {language === 'en' ? 'orders' : 'طلب'}</p>
                <p className="text-sm font-medium text-foreground">AED 53,600 {language === 'en' ? 'revenue' : 'إيرادات'}</p>
              </div>
            </div>

            <div className="text-center p-6 bg-secondary/30 rounded-xl">
              <div className="w-16 h-16 bg-success/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Edit className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {language === 'en' ? 'Alterations' : 'تعديلات'}
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">578 {language === 'en' ? 'orders' : 'طلب'}</p>
                <p className="text-sm font-medium text-foreground">AED 46,240 {language === 'en' ? 'revenue' : 'إيرادات'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;