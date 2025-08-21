import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, Star, Camera, Edit, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

const TailorProfile = () => {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const specialties = [
    { name: language === 'en' ? 'Kandura' : 'كندورة', level: 'Expert' },
    { name: language === 'en' ? 'Abaya' : 'عباية', level: 'Expert' },
    { name: language === 'en' ? 'Bisht' : 'بشت', level: 'Advanced' },
    { name: language === 'en' ? 'Formal Wear' : 'ملابس رسمية', level: 'Intermediate' }
  ];

  const certifications = [
    { name: language === 'en' ? 'Master Tailor Certification' : 'شهادة الخياط الماهر', issuer: 'UAE Tailoring Institute', year: '2019' },
    { name: language === 'en' ? 'Traditional Garment Specialist' : 'أخصائي الملابس التراثية', issuer: 'Emirates Cultural Center', year: '2021' }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Business Profile' : 'الملف التجاري'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? 'Manage your business information and showcase your expertise' : 'إدارة معلومات عملك وعرض خبرتك'}
          </p>
        </div>
        <Button 
          className={isEditing ? "btn-premium" : "btn-hero"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {language === 'en' ? 'Edit Profile' : 'تحرير الملف'}
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="card-premium">
            <CardContent className="p-6 text-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-16 h-16 text-primary-foreground" />
                </div>
                <Button size="sm" className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 btn-gold">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Fatima Tailoring</h2>
              <p className="text-muted-foreground mb-4">
                {language === 'en' ? 'Traditional & Modern Tailoring' : 'خياطة تراثية وحديثة'}
              </p>
              <div className="flex items-center justify-center mb-4">
                <Star className="w-5 h-5 text-gold fill-current mr-1" />
                <span className="font-semibold text-foreground">4.9</span>
                <span className="text-sm text-muted-foreground ml-2">
                  (234 {language === 'en' ? 'reviews' : 'تقييم'})
                </span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge className="bg-success/10 text-success">
                  {language === 'en' ? 'Verified' : 'مُحقق'}
                </Badge>
                <Badge className="bg-gold/10 text-gold-dark">
                  {language === 'en' ? 'Premium' : 'مميز'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-muted-foreground mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <p className="font-medium text-foreground">Dubai Marina</p>
                  <p className="text-sm text-muted-foreground">Dubai, UAE</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-muted-foreground mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <p className="font-medium text-foreground">+971 50 123 4567</p>
                  <p className="text-sm text-muted-foreground">WhatsApp Available</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-muted-foreground mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <p className="font-medium text-foreground">fatima@fatimatailoring.ae</p>
                  <p className="text-sm text-muted-foreground">Business Email</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Information */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Business Information' : 'معلومات العمل'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {language === 'en' ? 'Business Name' : 'اسم العمل'}
                  </label>
                  {isEditing ? (
                    <Input defaultValue="Fatima Tailoring" />
                  ) : (
                    <p className="text-foreground">Fatima Tailoring</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {language === 'en' ? 'Trade License' : 'الرخصة التجارية'}
                  </label>
                  {isEditing ? (
                    <Input defaultValue="DED-12345678" />
                  ) : (
                    <p className="text-foreground">DED-12345678</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {language === 'en' ? 'Experience' : 'الخبرة'}
                  </label>
                  {isEditing ? (
                    <Input defaultValue="15 years" />
                  ) : (
                    <p className="text-foreground">15 {language === 'en' ? 'years' : 'سنة'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {language === 'en' ? 'Operating Hours' : 'ساعات العمل'}
                  </label>
                  {isEditing ? (
                    <Input defaultValue="9:00 AM - 8:00 PM" />
                  ) : (
                    <p className="text-foreground">9:00 AM - 8:00 PM</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {language === 'en' ? 'Business Description' : 'وصف العمل'}
                </label>
                {isEditing ? (
                  <Textarea 
                    defaultValue="Expert in traditional Emirati clothing with 15+ years of experience. Specializing in Kandura, Abaya, and Bisht with attention to authentic details and modern comfort."
                    rows={4}
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {language === 'en' ? 
                      'Expert in traditional Emirati clothing with 15+ years of experience. Specializing in Kandura, Abaya, and Bisht with attention to authentic details and modern comfort.' :
                      'خبير في الملابس التراثية الإماراتية مع أكثر من 15 عامًا من الخبرة. متخصص في الكندورة والعباية والبشت مع الاهتمام بالتفاصيل الأصيلة والراحة العصرية.'
                    }
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Specializations' : 'التخصصات'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialties.map((specialty, index) => (
                  <div key={index} className="p-4 bg-secondary/30 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{specialty.name}</span>
                      <Badge className={
                        specialty.level === 'Expert' ? 'bg-gold/10 text-gold-dark' :
                        specialty.level === 'Advanced' ? 'bg-primary/10 text-primary' :
                        'bg-success/10 text-success'
                      }>
                        {specialty.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Certifications & Awards' : 'الشهادات والجوائز'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-secondary/30 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-foreground">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <Badge variant="outline">{cert.year}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TailorProfile;