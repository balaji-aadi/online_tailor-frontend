import { useState } from 'react';
import { Users, UserCheck, UserX, Search, Filter, Plus, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/components/Layout';

const UserManagement = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'Ahmed Al Mansouri',
      email: 'ahmed.mansouri@email.com',
      type: 'customer',
      status: 'active',
      location: 'Dubai',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      orders: 12
    },
    {
      id: 2,
      name: 'Fatima Tailoring',
      email: 'fatima@fatimatailoring.ae',
      type: 'tailor',
      status: 'active',
      location: 'Abu Dhabi',
      joinDate: '2023-11-20',
      lastActive: '1 hour ago',
      orders: 89
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com', 
      type: 'customer',
      status: 'pending',
      location: 'Sharjah',
      joinDate: '2024-03-01',
      lastActive: '1 day ago',
      orders: 3
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: language === 'en' ? 'Active' : 'نشط', class: 'status-active' },
      pending: { label: language === 'en' ? 'Pending' : 'معلق', class: 'status-pending' },
      inactive: { label: language === 'en' ? 'Inactive' : 'غير نشط', class: 'status-inactive' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      customer: { label: language === 'en' ? 'Customer' : 'عميل', class: 'bg-primary/10 text-primary' },
      tailor: { label: language === 'en' ? 'Tailor' : 'خياط', class: 'bg-gold/10 text-gold-dark' }
    };
    
    const config = typeConfig[type];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'User Management' : 'إدارة المستخدمين'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'en' ? 'Manage customers and tailors on your platform' : 'إدارة العملاء والخياطين على منصتك'}
          </p>
        </div>
        <Button className="btn-premium">
          <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {language === 'en' ? 'Add User' : 'إضافة مستخدم'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Total Users' : 'إجمالي المستخدمين'}
                </p>
                <p className="text-3xl font-bold text-foreground">2,847</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Active Users' : 'المستخدمين النشطين'}
                </p>
                <p className="text-3xl font-bold text-foreground">2,341</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <UserCheck className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Pending Approval' : 'في انتظار الموافقة'}
                </p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <UserX className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'en' ? 'Search users...' : 'البحث عن المستخدمين...'}
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

      {/* Users Table */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'All Users' : 'جميع المستخدمين'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'en' ? 'User' : 'المستخدم'}</TableHead>
                <TableHead>{language === 'en' ? 'Type' : 'النوع'}</TableHead>
                <TableHead>{language === 'en' ? 'Status' : 'الحالة'}</TableHead>
                <TableHead>{language === 'en' ? 'Location' : 'الموقع'}</TableHead>
                <TableHead>{language === 'en' ? 'Orders' : 'الطلبات'}</TableHead>
                <TableHead>{language === 'en' ? 'Last Active' : 'آخر نشاط'}</TableHead>
                <TableHead className="text-right">{language === 'en' ? 'Actions' : 'الإجراءات'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-secondary/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(user.type)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{user.orders}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="hover-lift">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'View' : 'عرض'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Edit' : 'تحرير'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Delete' : 'حذف'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;