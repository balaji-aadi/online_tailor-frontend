import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

const Calendar = () => {
  const { language } = useLanguage();

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      time: '09:00',
      duration: 60,
      customer: 'Ahmed Al Mansouri',
      phone: '+971 50 123 4567',
      service: language === 'en' ? 'Kandura Fitting' : 'قياس كندورة',
      type: 'fitting',
      status: 'confirmed',
      notes: language === 'en' ? 'First fitting, bring fabric samples' : 'القياس الأول، إحضار عينات القماش',
      location: language === 'en' ? 'Shop' : 'المحل'
    },
    {
      id: 2,
      time: '11:30',
      duration: 45,
      customer: 'Fatima Al Zahra',
      phone: '+971 52 987 6543',
      service: language === 'en' ? 'Abaya Consultation' : 'استشارة عباية',
      type: 'consultation',
      status: 'confirmed',
      notes: language === 'en' ? 'Discuss embroidery options' : 'مناقشة خيارات التطريز',
      location: language === 'en' ? 'Shop' : 'المحل'
    },
    {
      id: 3,
      time: '14:00',
      duration: 30,
      customer: 'Sarah Johnson',
      phone: '+971 55 555 1234',
      service: language === 'en' ? 'Final Delivery' : 'التسليم النهائي',
      type: 'delivery',
      status: 'confirmed',
      notes: language === 'en' ? 'Payment on delivery' : 'الدفع عند التسليم',
      location: language === 'en' ? 'Customer Location' : 'موقع العميل'
    },
    {
      id: 4,
      time: '16:00',
      duration: 90,
      customer: 'Mohammed Ali',
      phone: '+971 50 777 8888',
      service: language === 'en' ? 'Bisht Measurements' : 'قياسات البشت',
      type: 'measuring',
      status: 'pending',
      notes: language === 'en' ? 'Special occasion - wedding' : 'مناسبة خاصة - زفاف',
      location: language === 'en' ? 'Shop' : 'المحل'
    }
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());

  const getAppointmentTypeIcon = (type) => {
    switch (type) {
      case 'fitting':
        return <User className="w-4 h-4" />;
      case 'consultation':
        return <CalendarIcon className="w-4 h-4" />;
      case 'delivery':
        return <Clock className="w-4 h-4" />;
      case 'measuring':
        return <Edit className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { label: language === 'en' ? 'Confirmed' : 'مؤكد', class: 'status-active' },
      pending: { label: language === 'en' ? 'Pending' : 'معلق', class: 'status-pending' },
      cancelled: { label: language === 'en' ? 'Cancelled' : 'ملغي', class: 'status-inactive' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getTypeColor = (type) => {
    const typeColors = {
      fitting: 'border-l-primary',
      consultation: 'border-l-gold',
      delivery: 'border-l-success',
      measuring: 'border-l-warning'
    };
    return typeColors[type] || 'border-l-secondary';
  };

  const todayStats = {
    totalAppointments: appointments.length,
    confirmedAppointments: appointments.filter(app => app.status === 'confirmed').length,
    totalDuration: appointments.reduce((sum, app) => sum + app.duration, 0),
    revenue: 'AED 2,180'
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Calendar & Appointments' : 'التقويم والمواعيد'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? 'Manage your schedule and customer appointments' : 'إدارة جدولك ومواعيد العملاء'}
          </p>
        </div>
        <Button className="btn-premium">
          <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {language === 'en' ? 'New Appointment' : 'موعد جديد'}
        </Button>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? "Today's Appointments" : 'مواعيد اليوم'}
                </p>
                <p className="text-3xl font-bold text-foreground">{todayStats.totalAppointments}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <CalendarIcon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Confirmed' : 'مؤكدة'}
                </p>
                <p className="text-3xl font-bold text-foreground">{todayStats.confirmedAppointments}</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <User className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Total Hours' : 'إجمالي الساعات'}
                </p>
                <p className="text-3xl font-bold text-foreground">{(todayStats.totalDuration / 60).toFixed(1)}</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Expected Revenue' : 'الإيرادات المتوقعة'}
                </p>
                <p className="text-2xl font-bold text-foreground">{todayStats.revenue}</p>
              </div>
              <div className="p-3 rounded-xl bg-gold/10">
                <CalendarIcon className="w-6 h-6 text-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {language === 'en' ? 'March 2024' : 'مارس 2024'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simple Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Header */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-xs font-medium text-muted-foreground">
                  {language === 'en' ? day : 
                    day === 'Sun' ? 'أحد' :
                    day === 'Mon' ? 'إثن' :
                    day === 'Tue' ? 'ثلا' :
                    day === 'Wed' ? 'أرب' :
                    day === 'Thu' ? 'خمي' :
                    day === 'Fri' ? 'جمع' : 'سبت'
                  }
                </div>
              ))}
              
              {/* Calendar Days */}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 5 + 1; // Start from March 1st
                const isToday = day === 15;
                const hasAppointments = [15, 16, 18, 20, 22].includes(day);
                
                if (day < 1 || day > 31) {
                  return <div key={i} className="p-2"></div>;
                }
                
                return (
                  <div
                    key={i}
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${
                      isToday
                        ? 'bg-primary text-primary-foreground font-bold'
                        : hasAppointments
                        ? 'bg-gold/10 text-gold-dark hover:bg-gold/20'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <span className="text-sm">{day}</span>
                    {hasAppointments && !isToday && (
                      <div className="w-1 h-1 bg-gold rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>
                {language === 'en' ? "Today's Schedule - March 15, 2024" : 'جدول اليوم - 15 مارس 2024'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div
                    key={appointment.id}
                    className={`p-4 rounded-xl border-l-4 ${getTypeColor(appointment.type)} bg-secondary/30 hover-lift`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          {getAppointmentTypeIcon(appointment.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                            <span className="font-semibold text-foreground text-lg">
                              {appointment.time}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {appointment.duration} {language === 'en' ? 'min' : 'دقيقة'}
                            </Badge>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <p className="font-medium text-foreground">{appointment.customer}</p>
                          <p className="text-sm text-muted-foreground">{appointment.phone}</p>
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          {language === 'en' ? 'Service' : 'الخدمة'}
                        </p>
                        <p className="text-sm text-muted-foreground">{appointment.service}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          {language === 'en' ? 'Location' : 'الموقع'}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                          {appointment.location}
                        </div>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-foreground mb-1">
                          {language === 'en' ? 'Notes:' : 'ملاحظات:'}
                        </p>
                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col hover-lift">
              <Plus className="w-6 h-6 mb-2" />
              <span className="text-sm">{language === 'en' ? 'Schedule Appointment' : 'جدولة موعد'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-lift">
              <Clock className="w-6 h-6 mb-2" />
              <span className="text-sm">{language === 'en' ? 'Set Availability' : 'تحديد الإتاحة'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-lift">
              <User className="w-6 h-6 mb-2" />
              <span className="text-sm">{language === 'en' ? 'Customer List' : 'قائمة العملاء'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-lift">
              <CalendarIcon className="w-6 h-6 mb-2" />
              <span className="text-sm">{language === 'en' ? 'View Month' : 'عرض الشهر'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;