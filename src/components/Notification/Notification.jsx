// Notification.jsx
import React, { useState, useEffect } from 'react';
import { Bell, Filter, Search, Check, Clock, Package, Scissors, CreditCard, Truck, Calendar, Settings, RefreshCw } from 'lucide-react';
import { useNotification } from './NotificationContext';

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    getAllNotifications,
    currentUser
  } = useNotification();

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getNotificationIcon = (type) => {
    const iconProps = { className: "w-5 h-5" };
    const icons = {
      order: <Package {...iconProps} />,
      measurement: <Scissors {...iconProps} />,
      payment: <CreditCard {...iconProps} />,
      delivery: <Truck {...iconProps} />,
      appointment: <Calendar {...iconProps} />,
      alteration: <Settings {...iconProps} />,
      default: <Bell {...iconProps} />
    };
    return icons[type] || icons.default;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-200',
      low: 'bg-green-100 text-green-800 border-green-200',
      default: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[priority] || colors.default;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filteredNotifications = notifications
    .filter(notification => {
      if (activeTab === 'unread' && notification.isRead) return false;
      if (activeTab === 'read' && !notification.isRead) return false;
      if (filterType !== 'all' && notification.type !== filterType) return false;
      if (searchTerm && !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !notification.message.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default: return 0;
      }
    });

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
  };

  const getNotificationTypeLabel = (type) => {
    const labels = {
      order: 'Orders',
      measurement: 'Measurements',
      payment: 'Payments',
      delivery: 'Delivery',
      appointment: 'Appointments',
      alteration: 'Alterations',
      general: 'General'
    };
    return labels[type] || 'All';
  };

  const getRoleSpecificTitle = () => {
    const titles = {
      admin: 'Admin Notifications',
      tailor: 'Tailor Notifications',
      customer: 'Your Notifications',
      default: 'Notifications'
    };
    return titles[currentUser.role] || titles.default;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{getRoleSpecificTitle()}</h1>
                  <p className="text-gray-600">
                    {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span>Mark all read</span>
                  </button>
                )}
                <button
                  onClick={getAllNotifications}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {['order', 'measurement', 'payment', 'delivery', 'appointment', 'alteration', 'general'].map(type => (
                  <option key={type} value={type}>{getNotificationTypeLabel(type)}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">By Priority</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading notifications...</span>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">
                {searchTerm || filterType !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'New notifications will appear here'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => {
                const { date, time } = formatDateTime(notification.createdAt);
                return (
                  <div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-3 rounded-full border ${getPriorityColor(notification.priority)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`text-lg font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {date} at {time}
                              </span>
                              <span className="capitalize">
                                {getNotificationTypeLabel(notification.type)}
                              </span>
                              {notification.orderId && (
                                <span className="font-medium">
                                  Order: {notification.orderId}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2 ml-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                            {notification.isRead ? (
                              <span className="flex items-center text-xs text-green-600">
                                <Check className="w-3 h-3 mr-1" />
                                Read
                              </span>
                            ) : (
                              <span className="text-xs text-blue-600 font-medium">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;