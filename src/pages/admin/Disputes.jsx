import React from 'react';
import { MessageSquare, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

const Disputes = () => {
  const { language } = useLanguage();

  const disputes = [
    {
      id: '#DISP-001',
      orderId: '#ORD-2847',
      customer: 'Ahmed Al Mansouri',
      tailor: 'Fatima Tailoring',
      issue: language === 'en' ? 'Size not matching specifications' : 'المقاس غير مطابق للمواصفات',
      status: 'open',
      priority: 'high',
      createdDate: '2024-03-15',
      lastUpdate: '2 hours ago'
    },
    {
      id: '#DISP-002',
      orderId: '#ORD-2840',
      customer: 'Sarah Johnson',
      tailor: 'Royal Stitches',
      issue: language === 'en' ? 'Delivery delay beyond agreed timeline' : 'تأخير التسليم عن الموعد المتفق عليه',
      status: 'in_progress',
      priority: 'medium',
      createdDate: '2024-03-12',
      lastUpdate: '1 day ago'
    },
    {
      id: '#DISP-003',
      orderId: '#ORD-2835',
      customer: 'Mohammed Ali',
      tailor: 'Classic Tailors',
      issue: language === 'en' ? 'Quality concerns with fabric used' : 'مخاوف بشأن جودة القماش المستخدم',
      status: 'resolved',
      priority: 'low',
      createdDate: '2024-03-08',
      lastUpdate: '3 days ago'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { label: language === 'en' ? 'Open' : 'مفتوح', class: 'status-pending' },
      in_progress: { label: language === 'en' ? 'In Progress' : 'قيد المعالجة', class: 'bg-primary/10 text-primary' },
      resolved: { label: language === 'en' ? 'Resolved' : 'محلول', class: 'status-active' }
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

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'en' ? 'Dispute Resolution' : 'حل النزاعات'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'en' ? 'Manage and resolve customer-tailor disputes' : 'إدارة وحل النزاعات بين العملاء والخياطين'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Open Disputes' : 'النزاعات المفتوحة'}
                </p>
                <p className="text-3xl font-bold text-foreground">3</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'In Progress' : 'قيد المعالجة'}
                </p>
                <p className="text-3xl font-bold text-foreground">5</p>
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
                  {language === 'en' ? 'Resolved This Month' : 'تم حلها هذا الشهر'}
                </p>
                <p className="text-3xl font-bold text-foreground">18</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Avg Resolution Time' : 'متوسط وقت الحل'}
                </p>
                <p className="text-3xl font-bold text-foreground">2.3</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'days' : 'أيام'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Active Disputes' : 'النزاعات النشطة'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div key={dispute.id} className="p-6 bg-secondary/30 rounded-xl hover-lift">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{dispute.id}</h3>
                      {getStatusBadge(dispute.status)}
                      {getPriorityBadge(dispute.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === 'en' ? 'Order:' : 'الطلب:'} {dispute.orderId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dispute.customer} • {dispute.tailor}
                    </p>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Last Update:' : 'آخر تحديث:'}
                    </p>
                    <p className="text-sm font-medium">{dispute.lastUpdate}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {language === 'en' ? 'Issue:' : 'المشكلة:'}
                  </p>
                  <p className="text-sm text-muted-foreground">{dispute.issue}</p>
                </div>

                <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" className="hover-lift">
                    {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                  </Button>
                  <Button variant="outline" className="hover-lift">
                    {language === 'en' ? 'Contact Parties' : 'الاتصال بالأطراف'}
                  </Button>
                  <Button className="btn-premium">
                    {language === 'en' ? 'Take Action' : 'اتخاذ إجراء'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Disputes;