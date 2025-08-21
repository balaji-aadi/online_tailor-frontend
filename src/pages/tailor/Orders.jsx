import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Eye, Edit, Clock, User, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/Layout';

const Orders = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: '#ORD-2847',
      customer: 'Ahmed Al Mansouri',
      customerPhone: '+971 50 123 4567',
      service: language === 'en' ? 'Kandura Tailoring' : 'خياطة كندورة',
      status: 'in_progress',
      priority: 'high',
      amount: 'AED 450',
      orderDate: '2024-03-10',
      deadline: '2024-03-20',
      measurements: { chest: '42"', waist: '36"', length: '58"' },
      notes: language === 'en' ? 'Customer prefers loose fit, traditional style' : 'العميل يفضل القياس الواسع، الطراز التقليدي'
    },
    {
      id: '#ORD-2845',
      customer: 'Sarah Johnson',
      customerPhone: '+971 52 987 6543',
      service: language === 'en' ? 'Abaya Alteration' : 'تعديل عباية',
      status: 'cutting',
      priority: 'medium',
      amount: 'AED 180',
      orderDate: '2024-03-12',
      deadline: '2024-03-18',
      measurements: { bust: '38"', waist: '32"', length: '54"' },
      notes: language === 'en' ? 'Shorten sleeves by 2 inches' : 'تقصير الأكمام بمقدار 2 بوصة'
    },
    {
      id: '#ORD-2843',
      customer: 'Mohammed Ali',
      customerPhone: '+971 55 555 1234',
      service: language === 'en' ? 'Bisht Custom' : 'بشت مخصص',
      status: 'quality_check',
      priority: 'high',
      amount: 'AED 890',
      orderDate: '2024-03-08',
      deadline: '2024-03-22',
      measurements: { chest: '44"', shoulder: '18"', length: '56"' },
      notes: language === 'en' ? 'Gold embroidery on collar and cuffs' : 'تطريز ذهبي على الياقة والأساور'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      received: { label: language === 'en' ? 'Received' : 'تم الاستلام', class: 'bg-secondary/50 text-secondary-foreground' },
      measuring: { label: language === 'en' ? 'Measuring' : 'القياس', class: 'bg-warning/10 text-warning' },
      cutting: { label: language === 'en' ? 'Cutting' : 'القص', class: 'bg-primary/10 text-primary' },
      stitching: { label: language === 'en' ? 'Stitching' : 'الخياطة', class: 'bg-gold/10 text-gold-dark' },
      in_progress: { label: language === 'en' ? 'In Progress' : 'قيد التنفيذ', class: 'bg-primary/10 text-primary' },
      quality_check: { label: language === 'en' ? 'Quality Check' : 'فحص الجودة', class: 'bg-success/10 text-success' },
      ready: { label: language === 'en' ? 'Ready' : 'جاهز', class: 'status-active' },
      delivered: { label: language === 'en' ? 'Delivered' : 'تم التسليم', class: 'bg-success/20 text-success' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: language === 'en' ? 'High' : 'عالي', class: 'bg-destructive/10 text-destructive' },
      medium: { label: language === 'en' ? 'Medium' : 'متوسط', class: 'bg-warning/10 text-warning' },
      low: { label: language === 'en' ? 'Low' : 'منخفض', class: 'bg-success/10 text-success' }
    };
    
    const config = priorityConfig[priority];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getOrdersByStatus = (status) => {
    const statusMap = {
      active: ['received', 'measuring', 'cutting', 'stitching', 'in_progress', 'quality_check'],
      ready: ['ready'],
      delivered: ['delivered']
    };
    return orders.filter(order => statusMap[status]?.includes(order.status));
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Order Management' : 'إدارة الطلبات'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? 'Track and manage all your tailoring orders' : 'تتبع وإدارة جميع طلبات الخياطة'}
          </p>
        </div>
        <Button className="btn-premium">
          {language === 'en' ? 'New Order' : 'طلب جديد'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Active Orders' : 'الطلبات النشطة'}
                </p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Ready for Delivery' : 'جاهز للتسليم'}
                </p>
                <p className="text-3xl font-bold text-foreground">3</p>
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
                  {language === 'en' ? 'Urgent Orders' : 'الطلبات العاجلة'}
                </p>
                <p className="text-3xl font-bold text-foreground">2</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Monthly Revenue' : 'الإيرادات الشهرية'}
                </p>
                <p className="text-2xl font-bold text-foreground">AED 12K</p>
              </div>
              <div className="p-3 rounded-xl bg-gold/10">
                <DollarSign className="w-6 h-6 text-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'en' ? 'Search orders...' : 'البحث في الطلبات...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="hover-lift">
                <Filter className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {language === 'en' ? 'Filter' : 'تصفية'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            {language === 'en' ? 'Active Orders' : 'الطلبات النشطة'} ({getOrdersByStatus('active').length})
          </TabsTrigger>
          <TabsTrigger value="ready">
            {language === 'en' ? 'Ready for Delivery' : 'جاهز للتسليم'} ({getOrdersByStatus('ready').length})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            {language === 'en' ? 'Delivered' : 'تم التسليم'} ({getOrdersByStatus('delivered').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Active Orders' : 'الطلبات النشطة'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 bg-secondary/30 rounded-xl hover-lift">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{order.id}</h3>
                          {getStatusBadge(order.status)}
                          {getPriorityBadge(order.priority)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <User className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          <span>{order.customer} • {order.customerPhone}</span>
                        </div>
                        <p className="font-medium text-foreground">{order.service}</p>
                      </div>
                      <div className="text-right rtl:text-left">
                        <p className="text-2xl font-bold text-foreground">{order.amount}</p>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>{language === 'en' ? 'Due:' : 'الموعد النهائي:'} {order.deadline}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          {language === 'en' ? 'Measurements' : 'القياسات'}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          {Object.entries(order.measurements).map(([key, value]) => (
                            <span key={key} className="mr-4 rtl:mr-0 rtl:ml-4">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          {language === 'en' ? 'Special Notes' : 'ملاحظات خاصة'}
                        </p>
                        <p className="text-sm text-muted-foreground">{order.notes}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm" className="hover-lift">
                        <Eye className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {language === 'en' ? 'View' : 'عرض'}
                      </Button>
                      <Button variant="outline" size="sm" className="hover-lift">
                        <Edit className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {language === 'en' ? 'Update Status' : 'تحديث الحالة'}
                      </Button>
                      <Button size="sm" className="btn-premium">
                        {language === 'en' ? 'Contact Customer' : 'الاتصال بالعميل'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ready">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Ready for Delivery' : 'جاهز للتسليم'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {language === 'en' ? 'No orders ready for delivery' : 'لا توجد طلبات جاهزة للتسليم'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' ? 'Orders will appear here when they are ready for delivery' : 'ستظهر الطلبات هنا عندما تكون جاهزة للتسليم'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Delivered Orders' : 'الطلبات المُسلمة'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {language === 'en' ? 'No delivered orders yet' : 'لا توجد طلبات مُسلمة بعد'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' ? 'Completed orders will appear here' : 'ستظهر الطلبات المكتملة هنا'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;