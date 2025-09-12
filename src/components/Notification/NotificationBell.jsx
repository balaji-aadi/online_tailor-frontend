// NotificationBell.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Package, Scissors, CreditCard, Truck, Calendar, Settings } from 'lucide-react';
import { useNotification } from './NotificationContext';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('unread');
    const dropdownRef = useRef(null);
    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        getAllNotifications
    } = useNotification();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotificationIcon = (type) => {
        const iconProps = { className: "w-4 h-4" };
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
            urgent: 'text-red-600 bg-red-50 border-red-200',
            high: 'text-orange-600 bg-orange-50 border-orange-200',
            medium: 'text-blue-600 bg-blue-50 border-blue-200',
            low: 'text-green-600 bg-green-50 border-green-200',
            default: 'text-gray-600 bg-gray-50 border-gray-200'
        };
        return colors[priority] || colors.default;
    };

    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return date.toLocaleDateString();
    };

    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            markAsRead(notification._id);
        }
    };

    const unreadNotifications = notifications.filter(n => !n.isRead);
    const readNotifications = notifications.filter(n => n.isRead);
    const displayNotifications = activeTab === 'unread' ? unreadNotifications : readNotifications;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[600px] flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                                >
                                    <CheckCheck className="w-4 h-4" />
                                    <span>Mark all read</span>
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('unread')}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'unread'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Unread ({unreadNotifications.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'all'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            All ({notifications.length})
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center p-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : displayNotifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <Bell className="w-12 h-12 text-gray-300 mb-3" />
                                <h4 className="text-gray-600 font-medium">
                                    {activeTab === 'unread' ? 'No unread notifications' : 'No notifications'}
                                </h4>
                                <p className="text-gray-400 text-sm mt-1">
                                    {activeTab === 'unread' ? "You're all caught up!" : "Notifications will appear here"}
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {displayNotifications.map((notification) => (
                                    <div
                                        key={notification._id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`flex-shrink-0 p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <p className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                                        {notification.title}
                                                    </p>
                                                    <div className="flex items-center space-x-1 ml-2">
                                                        {!notification.isRead && (
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        )}
                                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                                            {formatTimeAgo(notification.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                {(notification.orderId || notification.priority === 'urgent') && (
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        {notification.orderId && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                                                                {notification.orderId}
                                                            </span>
                                                        )}
                                                        {notification.priority === 'urgent' && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
                                                                <AlertCircle className="w-3 h-3 mr-1" />
                                                                Urgent
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={getAllNotifications}
                            className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Refresh Notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;