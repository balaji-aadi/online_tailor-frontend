import React, { useState } from 'react';
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, Star, Paperclip } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/Layout';

const Messages = () => {
  const { language } = useLanguage();
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      customer: 'Ahmed Al Mansouri',
      lastMessage: language === 'en' ? 'When will my kandura be ready?' : 'متى ستكون كندورتي جاهزة؟',
      time: '10:30 AM',
      unread: 2,
      online: true,
      avatar: 'AM',
      orderNumber: '#ORD-2847'
    },
    {
      id: 2,
      customer: 'Fatima Al Zahra',
      lastMessage: language === 'en' ? 'Thank you for the beautiful abaya!' : 'شكراً لك على العباية الجميلة!',
      time: '9:15 AM',
      unread: 0,
      online: false,
      avatar: 'FZ',
      orderNumber: '#ORD-2845'
    },
    {
      id: 3,
      customer: 'Sarah Johnson',
      lastMessage: language === 'en' ? 'Can we reschedule the fitting?' : 'هل يمكننا إعادة جدولة القياس؟',
      time: 'Yesterday',
      unread: 1,
      online: true,
      avatar: 'SJ',
      orderNumber: '#ORD-2843'
    },
    {
      id: 4,
      customer: 'Mohammed Ali',
      lastMessage: language === 'en' ? 'I love the bisht design!' : 'أحب تصميم البشت!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      avatar: 'MA',
      orderNumber: '#ORD-2841'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'customer',
      content: language === 'en' ? 'Hello! I wanted to check on the status of my kandura order.' : 'مرحباً! أردت التحقق من حالة طلب الكندورة الخاص بي.',
      time: '9:00 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'tailor',
      content: language === 'en' ? 'Hello Ahmed! Your kandura is currently in the stitching phase. It should be ready by tomorrow evening.' : 'مرحباً أحمد! كندورتك حالياً في مرحلة الخياطة. يجب أن تكون جاهزة بحلول مساء الغد.',
      time: '9:05 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'customer',
      content: language === 'en' ? 'That\'s great! Can I see a photo of the progress?' : 'هذا رائع! هل يمكنني رؤية صورة للتقدم؟',
      time: '9:10 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'tailor',
      content: language === 'en' ? 'Of course! Here\'s the current progress:' : 'بالطبع! إليك التقدم الحالي:',
      time: '9:15 AM',
      type: 'text'
    },
    {
      id: 5,
      sender: 'tailor',
      content: language === 'en' ? '[Image: Kandura in progress]' : '[صورة: كندورة قيد التنفيذ]',
      time: '9:15 AM',
      type: 'image'
    },
    {
      id: 6,
      sender: 'customer',
      content: language === 'en' ? 'When will my kandura be ready?' : 'متى ستكون كندورتي جاهزة؟',
      time: '10:30 AM',
      type: 'text'
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'en' ? 'Customer Messages' : 'رسائل العملاء'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'en' ? 'Communicate with your customers and provide excellent service' : 'تواصل مع عملائك وقدم خدمة ممتازة'}
        </p>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="card-elevated">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Conversations' : 'المحادثات'}
              </CardTitle>
              <Badge className="bg-primary/10 text-primary">
                {conversations.filter(conv => conv.unread > 0).length}
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'en' ? 'Search conversations...' : 'البحث في المحادثات...'}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${
                    selectedChat === conversation.id ? 'bg-primary/10 border-r-2 border-primary' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground truncate">
                          {conversation.customer}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {conversation.orderNumber}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="card-elevated h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {selectedConversation?.avatar}
                    </div>
                    {selectedConversation?.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {selectedConversation?.customer}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation?.orderNumber} • {selectedConversation?.online ? 
                        (language === 'en' ? 'Online' : 'متصل') : 
                        (language === 'en' ? 'Offline' : 'غير متصل')
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" size="sm" className="hover-lift">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="hover-lift">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="hover-lift">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'tailor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-xl ${
                      message.sender === 'tailor'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-foreground'
                    }`}
                  >
                    {message.type === 'image' ? (
                      <div className="bg-secondary/30 p-4 rounded-lg text-center">
                        <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2"></div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                    <p className={`text-xs mt-1 ${
                      message.sender === 'tailor' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-border p-4">
              <div className="flex items-end space-x-2 rtl:space-x-reverse">
                <Button variant="outline" size="sm" className="hover-lift">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={language === 'en' ? 'Type your message...' : 'اكتب رسالتك...'}
                    className="resize-none"
                    rows={2}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  className="btn-premium"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
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
            <Button variant="outline" className="h-16 flex-col hover-lift">
              <MessageSquare className="w-5 h-5 mb-1" />
              <span className="text-xs">{language === 'en' ? 'New Message' : 'رسالة جديدة'}</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col hover-lift">
              <Star className="w-5 h-5 mb-1" />
              <span className="text-xs">{language === 'en' ? 'Important' : 'مهم'}</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col hover-lift">
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-xs">{language === 'en' ? 'Call Customer' : 'اتصال بالعميل'}</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col hover-lift">
              <Search className="w-5 h-5 mb-1" />
              <span className="text-xs">{language === 'en' ? 'Search' : 'بحث'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;