import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  Scissors,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  MapPin,
  Filter,
  ChevronDown,
  Search,
  Calendar,
  Download,
  MoreHorizontal,
  BarChart3,
  PieChart,
  AlertCircle,
  MessageSquare,
  Eye,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useLanguage } from '@/components/Layout';

// Chart.js components (we'll use react-chartjs-2)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { language, direction, t } = useLanguage();
  const [dateRange, setDateRange] = useState('this_month');
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Chart data and options
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (AED)',
        data: [65000, 59000, 80000, 81000, 78000, 85000, 92000, 84739, 89000, 93000, 101000, 108000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const ordersData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [40, 55, 35, 60, 45, 70, 50],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderRadius: 6,
      },
    ],
  };

  const ordersOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const customerSatisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'],
    datasets: [
      {
        label: 'Customer Feedback',
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(134, 239, 172, 0.8)',
          'rgba(253, 224, 71, 0.8)',
          'rgba(248, 113, 113, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const stats = [
    {
      title: language === 'en' ? 'Total Users' : 'إجمالي المستخدمين',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: language === 'en' ? 'Registered customers' : 'العملاء المسجلين'
    },
    {
      title: language === 'en' ? 'Active Tailors' : 'الخياطين النشطين',
      value: '186',
      change: '+8%',
      trend: 'up',
      icon: Scissors,
      color: 'amber',
      description: language === 'en' ? 'Currently working' : 'يعملون حالياً'
    },
    {
      title: language === 'en' ? 'Total Orders' : 'إجمالي الطلبات',
      value: '3,429',
      change: '+23%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'green',
      description: language === 'en' ? 'Completed this month' : 'تم إكمالها هذا الشهر'
    },
    {
      title: language === 'en' ? 'Revenue (AED)' : 'الإيرادات (درهم)',
      value: '847,392',
      change: '-2%',
      trend: 'down',
      icon: DollarSign,
      color: 'red',
      description: language === 'en' ? 'Year to date' : 'منذ بداية السنة'
    }
  ];

  const recentOrders = [
    {
      id: '#ORD-2847',
      customer: 'Ahmed Al Mansouri',
      tailor: 'Fatima Tailoring',
      service: language === 'en' ? 'Kandura Tailoring' : 'خياطة كندورة',
      amount: 'AED 450',
      status: 'in_progress',
      time: '2 hours ago',
      location: 'Dubai',
      priority: 'high'
    },
    {
      id: '#ORD-2846',
      customer: 'Sarah Johnson',
      tailor: 'Royal Stitches',
      service: language === 'en' ? 'Abaya Alteration' : 'تعديل عباية',
      amount: 'AED 180',
      status: 'completed',
      time: '5 hours ago',
      location: 'Abu Dhabi',
      priority: 'medium'
    },
    {
      id: '#ORD-2845',
      customer: 'Mohammed Ali',
      tailor: 'Classic Tailors',
      service: language === 'en' ? 'Bisht Custom' : 'بشت مخصص',
      amount: 'AED 890',
      status: 'pending',
      time: '1 day ago',
      location: 'Sharjah',
      priority: 'low'
    },
    {
      id: '#ORD-2844',
      customer: 'Layla Hassan',
      tailor: 'Premium Stitches',
      service: language === 'en' ? 'Dress Repair' : 'إصلاح فستان',
      amount: 'AED 120',
      status: 'in_progress',
      time: '1 day ago',
      location: 'Ajman',
      priority: 'medium'
    }
  ];

  const topTailors = [
    {
      name: 'Fatima Tailoring',
      rating: 4.9,
      orders: 234,
      revenue: 'AED 45,680',
      specialty: language === 'en' ? 'Traditional Wear' : 'الملابس التراثية',
      location: 'Dubai',
      completionRate: 98
    },
    {
      name: 'Royal Stitches',
      rating: 4.8,
      orders: 189,
      revenue: 'AED 38,920',
      specialty: language === 'en' ? 'Formal Wear' : 'الملابس الرسمية',
      location: 'Abu Dhabi',
      completionRate: 95
    },
    {
      name: 'Classic Tailors',
      rating: 4.7,
      orders: 156,
      revenue: 'AED 31,450',
      specialty: language === 'en' ? 'Men\'s Wear' : 'ملابس رجالية',
      location: 'Sharjah',
      completionRate: 92
    }
  ];

  const notifications = [
    {
      id: 1,
      title: language === 'en' ? 'New tailor registration' : 'تسجيل خياط جديد',
      description: language === 'en' ? 'Al Dar Tailoring has joined the platform' : 'الدار للخياطة انضمت إلى المنصة',
      time: '10 mins ago',
      read: false
    },
    {
      id: 2,
      title: language === 'en' ? 'Order delayed' : 'طلب متأخر',
      description: language === 'en' ? 'Order #ORD-2812 is behind schedule' : 'الطلب #ORD-2812 متأخر عن الجدول',
      time: '45 mins ago',
      read: true
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: language === 'en' ? 'Completed' : 'مكتمل', color: 'bg-green-100 text-green-800' },
      in_progress: { label: language === 'en' ? 'In Progress' : 'قيد التنفيذ', color: 'bg-amber-100 text-amber-800' },
      pending: { label: language === 'en' ? 'Pending' : 'معلق', color: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: language === 'en' ? 'High' : 'عالي', color: 'bg-red-100 text-red-800' },
      medium: { label: language === 'en' ? 'Medium' : 'متوسط', color: 'bg-amber-100 text-amber-800' },
      low: { label: language === 'en' ? 'Low' : 'منخفض', color: 'bg-gray-100 text-gray-800' }
    };

    const config = priorityConfig[priority];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in bg-gray-50 min-h-screen ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {language === 'en' ? 'Admin Dashboard' : 'لوحة تحكم الإدارة'}
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            {language === 'en' ? 'Welcome back! Here\'s what\'s happening with your platform.' : 'مرحباً بك! إليك ما يحدث على منصتك.'}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex items-center justify-between gap-2 w-full mt-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl w-full shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs md:text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1 hidden sm:inline">
                      {language === 'en' ? 'from last month' : 'من الشهر الماضي'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`p-2 md:p-3 rounded-xl bg-${stat.color}-100`}>
                  <IconComponent className={`w-4 h-4 md:w-6 md:h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Tabs for different views */}
          <div className="bg-white rounded-xl shadow-sm p-2 w-full max-w-md">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {language === 'en' ? 'Overview' : 'نظرة عامة'}
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'analytics' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {language === 'en' ? 'Analytics' : 'التحليلات'}
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'reports' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {language === 'en' ? 'Reports' : 'التقارير'}
              </button>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Revenue Chart Card */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">
                    {language === 'en' ? 'Revenue Overview' : 'نظرة عامة على الإيرادات'}
                  </h2>
                  <span className="text-sm text-gray-500">{language === 'en' ? 'Last 12 months' : 'آخر 12 شهر'}</span>
                </div>
                <div className="h-80">
                  <Line data={revenueData} options={revenueOptions} />
                </div>
              </div>

              {/* Recent Orders Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h2 className="text-lg font-bold text-gray-800">{language === 'en' ? 'Recent Orders' : 'الطلبات الأخيرة'}</h2>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder={language === 'en' ? 'Search orders...' : 'ابحث في الطلبات...'}
                          className="pl-9 pr-3 py-2 w-full sm:w-48 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Filter className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 gap-3">
                        <div className="flex-1 w-full">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="font-semibold text-gray-800 text-sm md:text-base">{order.id}</span>
                            <div className="flex gap-2">
                              {getStatusBadge(order.status)}
                              {getPriorityBadge(order.priority)}
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 mb-1 truncate">{order.customer} → {order.tailor}</p>
                          <p className="text-sm md:text-base font-medium text-gray-800">{order.service}</p>
                          <div className="flex flex-wrap items-center text-xs text-gray-500 mt-2 gap-2 md:gap-4">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                              {order.time}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                              {order.location}
                            </span>
                          </div>
                        </div>
                        <div className="self-end sm:self-center text-right rtl:text-left">
                          <p className="font-bold text-lg text-gray-800">{order.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                    {language === 'en' ? 'View All Orders' : 'عرض جميع الطلبات'}
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                {language === 'en' ? 'Advanced Analytics' : 'تحليلات متقدمة'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">{language === 'en' ? 'Weekly Orders' : 'الطلبات الأسبوعية'}</h3>
                  <div className="h-64">
                    <Bar data={ordersData} options={ordersOptions} />
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">{language === 'en' ? 'Customer Satisfaction' : 'رضا العملاء'}</h3>
                  <div className="h-64 flex items-center justify-center">
                    <Doughnut data={customerSatisfactionData} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                {language === 'en' ? 'Reports' : 'التقارير'}
              </h2>
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Download className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {language === 'en' ? 'Report generation interface' : 'واجهة إنشاء التقارير'}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {language === 'en' ? 'Connect to your reporting system to generate detailed business reports.' : 'قم بالاتصال بنظام التقارير الخاص بك لإنشاء تقارير أعمال مفصلة.'}
                </p>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                  {language === 'en' ? 'Generate Report' : 'إنشاء تقرير'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - 1/3 width on large screens */}
        <div className="space-y-4 md:space-y-6">
          {/* Top Tailors Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {language === 'en' ? 'Top Performing Tailors' : 'أفضل الخياطين أداءً'}
              </h2>
              <button className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              {topTailors.map((tailor, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800 text-sm md:text-base">{tailor.name}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{tailor.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mb-1">{tailor.specialty}</p>
                    <div className="flex flex-wrap items-center text-xs text-gray-500 gap-2 md:gap-4">
                      <span>{tailor.orders} {language === 'en' ? 'orders' : 'طلب'}</span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {tailor.location}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{language === 'en' ? 'Completion rate' : 'معدل الإكمال'}</span>
                        <span className="font-medium">{tailor.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${tailor.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left pl-2">
                    <p className="font-bold text-gray-800 text-sm md:text-base">{tailor.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
              {language === 'en' ? 'View Rankings' : 'عرض التصنيفات'}
            </button>
          </div>

          {/* Notifications Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {language === 'en' ? 'Notifications' : 'الإشعارات'}
              </h2>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                {notifications.length}
              </span>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-xl ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50 transition-colors duration-200 border ${notification.read ? 'border-gray-100' : 'border-blue-100'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                      <AlertCircle className={`h-4 w-4 ${notification.read ? 'text-gray-500' : 'text-blue-500'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${notification.read ? 'text-gray-700' : 'text-gray-800'}`}>{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <Clock className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
              {language === 'en' ? 'View All Notifications' : 'عرض جميع الإشعارات'}
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                <Users className="h-6 w-6 text-blue-500" />
                <span className="text-xs font-medium text-gray-700">{language === 'en' ? 'Add User' : 'إضافة مستخدم'}</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                <ShoppingBag className="h-6 w-6 text-green-500" />
                <span className="text-xs font-medium text-gray-700">{language === 'en' ? 'New Order' : 'طلب جديد'}</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                <MessageSquare className="h-6 w-6 text-amber-500" />
                <span className="text-xs font-medium text-gray-700">{language === 'en' ? 'Messages' : 'الرسائل'}</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                <BarChart3 className="h-6 w-6 text-purple-500" />
                <span className="text-xs font-medium text-gray-700">{language === 'en' ? 'Reports' : 'التقارير'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;