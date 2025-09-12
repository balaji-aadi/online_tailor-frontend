// NotificationContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { NotificationApi } from "./Notification.api";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser] = useState({
    role: 'admin', // Replace with actual auth context
    id: 'user_123',
    name: 'John Doe'
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getAllNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await NotificationApi.getAllNotifications(currentUser.role);
      setNotifications(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await NotificationApi.markAsRead(id);
      setNotifications(prev =>
        prev.map(notification =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await NotificationApi.markAllAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    playNotificationSound();
  };

  const playNotificationSound = () => {
    const audio = new Audio('/sounds/notification-bell.mp3'); // Ensure this file exists in public/sounds/
    audio.play().catch(error => console.error('Error playing notification sound:', error));
  };

  useEffect(() => {
    getAllNotifications();
  }, [currentUser.role]);

  useEffect(() => {
    const lastUnread = parseInt(localStorage.getItem('lastUnreadCount') || '0', 10);
    if (unreadCount > lastUnread) {
      playNotificationSound();
    }
    localStorage.setItem('lastUnreadCount', unreadCount.toString());
  }, [unreadCount]);

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    currentUser,
    getAllNotifications,
    markAsRead,
    markAllAsRead,
    addNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};