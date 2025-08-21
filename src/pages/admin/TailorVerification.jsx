import React from 'react';
import { UserCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

const TailorVerification = () => {
  const { language } = useLanguage();

  const pendingTailors = [
    {
      id: 1,
      name: 'Ahmed Traditional Tailoring',
      email: 'ahmed@traditionaltailoring.ae',
      phone: '+971 50 123 4567',
      location: 'Dubai',
      specialties: ['Kandura', 'Bisht', 'Traditional Wear'],
      experience: '15 years',
      documents: ['Trade License', 'Emirates ID', 'Certificates'],
      submittedDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Modern Stitches',
      email: 'info@modernstitches.ae',
      phone: '+971 52 987 6543',
      location: 'Abu Dhabi',
      specialties: ['Formal Wear', 'Casual Alterations'],
      experience: '8 years',
      documents: ['Trade License', 'Emirates ID'],
      submittedDate: '2024-03-10'
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'en' ? 'Tailor Verification' : 'تحقق من الخياطين'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'en' ? 'Review and approve tailor applications' : 'مراجعة وموافقة طلبات الخياطين'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Pending Review' : 'في انتظار المراجعة'}
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
                  {language === 'en' ? 'Approved This Month' : 'تم الموافقة عليه هذا الشهر'}
                </p>
                <p className="text-3xl font-bold text-foreground">23</p>
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
                  {language === 'en' ? 'Rejected' : 'مرفوض'}
                </p>
                <p className="text-3xl font-bold text-foreground">3</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Pending Applications' : 'الطلبات المعلقة'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTailors.map((tailor) => (
              <div key={tailor.id} className="p-6 bg-secondary/30 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{tailor.name}</h3>
                    <p className="text-sm text-muted-foreground">{tailor.email}</p>
                    <p className="text-sm text-muted-foreground">{tailor.phone}</p>
                  </div>
                  <Badge className="status-pending">
                    {language === 'en' ? 'Pending Review' : 'في انتظار المراجعة'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {language === 'en' ? 'Location' : 'الموقع'}
                    </p>
                    <p className="text-sm text-muted-foreground">{tailor.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {language === 'en' ? 'Experience' : 'الخبرة'}
                    </p>
                    <p className="text-sm text-muted-foreground">{tailor.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {language === 'en' ? 'Specialties' : 'التخصصات'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tailor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {language === 'en' ? 'Documents' : 'الوثائق'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tailor.documents.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" className="hover-lift">
                    {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                  </Button>
                  <Button variant="outline" className="text-destructive hover-lift">
                    {language === 'en' ? 'Reject' : 'رفض'}
                  </Button>
                  <Button className="btn-premium">
                    {language === 'en' ? 'Approve' : 'موافقة'}
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

export default TailorVerification;