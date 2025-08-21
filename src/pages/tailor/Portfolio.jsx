import React, { useState } from 'react';
import { Camera, Star, Eye, Edit, Trash2, Plus, Upload, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/Layout';

const Portfolio = () => {
  const { language } = useLanguage();

  const portfolioItems = [
    {
      id: 1,
      title: language === 'en' ? 'Traditional White Kandura' : 'كندورة بيضاء تقليدية',
      category: 'kandura',
      description: language === 'en' ? 'Classic Emirati kandura with traditional collar and perfect fit' : 'كندورة إماراتية كلاسيكية بياقة تقليدية وقياس مثالي',
      client: 'Ahmed Al Mansouri',
      completionDate: '2024-03-10',
      rating: 5.0,
      price: 'AED 450',
      tags: [language === 'en' ? 'Traditional' : 'تقليدي', language === 'en' ? 'Wedding' : 'زفاف', language === 'en' ? 'Premium' : 'مميز'],
      featured: true
    },
    {
      id: 2,
      title: language === 'en' ? 'Elegant Black Abaya' : 'عباية سوداء أنيقة',
      category: 'abaya',
      description: language === 'en' ? 'Modern abaya design with subtle embroidery and flowing silhouette' : 'تصميم عباية حديث بتطريز خفيف وشكل انسيابي',
      client: 'Fatima Al Zahra',
      completionDate: '2024-03-08',
      rating: 4.9,
      price: 'AED 380',
      tags: [language === 'en' ? 'Modern' : 'حديث', language === 'en' ? 'Embroidery' : 'تطريز', language === 'en' ? 'Elegant' : 'أنيق'],
      featured: true
    },
    {
      id: 3,
      title: language === 'en' ? 'Gold Embroidered Bisht' : 'بشت مطرز بالذهب',
      category: 'bisht',
      description: language === 'en' ? 'Luxury bisht with gold embroidery for special occasions' : 'بشت فاخر مطرز بالذهب للمناسبات الخاصة',
      client: 'Mohammed Al Rashid',
      completionDate: '2024-03-05',
      rating: 5.0,
      price: 'AED 890',
      tags: [language === 'en' ? 'Luxury' : 'فاخر', language === 'en' ? 'Gold' : 'ذهبي', language === 'en' ? 'Formal' : 'رسمي'],
      featured: true
    },
    {
      id: 4,
      title: language === 'en' ? 'Casual Summer Kandura' : 'كندورة صيفية عادية',
      category: 'kandura',
      description: language === 'en' ? 'Lightweight kandura perfect for UAE summer weather' : 'كندورة خفيفة مثالية لطقس الصيف الإماراتي',
      client: 'Omar Hassan',
      completionDate: '2024-03-03',
      rating: 4.8,
      price: 'AED 320',
      tags: [language === 'en' ? 'Casual' : 'عادي', language === 'en' ? 'Summer' : 'صيفي', language === 'en' ? 'Lightweight' : 'خفيف'],
      featured: false
    },
    {
      id: 5,
      title: language === 'en' ? 'Designer Abaya Collection' : 'مجموعة عباءات مصممة',
      category: 'abaya',
      description: language === 'en' ? 'Collection of three matching abayas for mother and daughters' : 'مجموعة من ثلاث عباءات متطابقة للأم والبنات',
      client: 'Al Mahmoud Family',
      completionDate: '2024-02-28',
      rating: 4.9,
      price: 'AED 1,200',
      tags: [language === 'en' ? 'Collection' : 'مجموعة', language === 'en' ? 'Family' : 'عائلة', language === 'en' ? 'Matching' : 'متطابق'],
      featured: false
    },
    {
      id: 6,
      title: language === 'en' ? 'Vintage Style Bisht' : 'بشت بطراز عتيق',
      category: 'bisht',
      description: language === 'en' ? 'Recreated vintage bisht design with authentic details' : 'إعادة تصميم بشت عتيق بتفاصيل أصيلة',
      client: 'Abdul Rahman',
      completionDate: '2024-02-25',
      rating: 5.0,
      price: 'AED 750',
      tags: [language === 'en' ? 'Vintage' : 'عتيق', language === 'en' ? 'Authentic' : 'أصيل', language === 'en' ? 'Classic' : 'كلاسيكي'],
      featured: false
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: language === 'en' ? 'All Work' : 'جميع الأعمال', count: portfolioItems.length },
    { id: 'kandura', name: language === 'en' ? 'Kandura' : 'كندورة', count: portfolioItems.filter(item => item.category === 'kandura').length },
    { id: 'abaya', name: language === 'en' ? 'Abaya' : 'عباية', count: portfolioItems.filter(item => item.category === 'abaya').length },
    { id: 'bisht', name: language === 'en' ? 'Bisht' : 'بشت', count: portfolioItems.filter(item => item.category === 'bisht').length }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const featuredItems = portfolioItems.filter(item => item.featured);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Portfolio Showcase' : 'معرض الأعمال'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? 'Showcase your best work and attract new customers' : 'اعرض أفضل أعمالك واجذب عملاء جدد'}
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button variant="outline" className="hover-lift">
            <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === 'en' ? 'Upload Photos' : 'رفع الصور'}
          </Button>
          <Button className="btn-premium">
            <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === 'en' ? 'Add Work' : 'إضافة عمل'}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Total Projects' : 'إجمالي المشاريع'}
                </p>
                <p className="text-3xl font-bold text-foreground">{portfolioItems.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Camera className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Featured Work' : 'الأعمال المميزة'}
                </p>
                <p className="text-3xl font-bold text-foreground">{featuredItems.length}</p>
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
                  {language === 'en' ? 'Avg. Rating' : 'متوسط التقييم'}
                </p>
                <p className="text-3xl font-bold text-foreground">4.9</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <Star className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Portfolio Views' : 'مشاهدات المعرض'}
                </p>
                <p className="text-3xl font-bold text-foreground">2.4K</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <Eye className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Tabs */}
      <Tabs defaultValue="gallery" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery">{language === 'en' ? 'Work Gallery' : 'معرض الأعمال'}</TabsTrigger>
          <TabsTrigger value="featured">{language === 'en' ? 'Featured Work' : 'الأعمال المميزة'}</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="hover-lift"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="card-elevated hover-lift overflow-hidden">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-card flex items-center justify-center">
                  <Camera className="w-12 h-12 text-muted-foreground" />
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                    {item.featured && (
                      <Badge className="bg-gold/10 text-gold-dark">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {language === 'en' ? 'Featured' : 'مميز'}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold fill-current mr-1" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                    <span className="font-bold text-foreground">{item.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{item.client}</span>
                    <span className="text-sm text-muted-foreground">{item.completionDate}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" className="hover-lift">
                      <Eye className="w-4 h-4 mr-1" />
                      {language === 'en' ? 'View' : 'عرض'}
                    </Button>
                    <Button variant="outline" size="sm" className="hover-lift">
                      <Edit className="w-4 h-4 mr-1" />
                      {language === 'en' ? 'Edit' : 'تحرير'}
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover-lift">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="card-premium hover-lift overflow-hidden">
                {/* Image Placeholder */}
                <div className="h-64 bg-gradient-hero flex items-center justify-center">
                  <Camera className="w-16 h-16 text-white/70" />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-foreground text-xl">{item.title}</h3>
                    <Badge className="bg-gold/10 text-gold-dark">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {language === 'en' ? 'Featured' : 'مميز'}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'en' ? 'Client' : 'العميل'}</p>
                      <p className="font-medium text-foreground">{item.client}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'en' ? 'Completed' : 'تم الإنجاز'}</p>
                      <p className="font-medium text-foreground">{item.completionDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'en' ? 'Rating' : 'التقييم'}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-gold fill-current mr-1" />
                        <span className="font-medium text-foreground">{item.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'en' ? 'Price' : 'السعر'}</p>
                      <p className="font-bold text-foreground text-lg">{item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" className="hover-lift">
                      <Eye className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                    </Button>
                    <Button className="btn-gold">
                      <Star className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === 'en' ? 'Share Work' : 'مشاركة العمل'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;