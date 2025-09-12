import { useState, useEffect } from 'react';
import {
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
  Filter,
  FileText,
  Users,
  ChevronDown,
  ChevronUp,
  Paperclip,
  Send,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/Layout';
import TableAlpha from '../../components/ui/TableAlpha';
import { FileInputField } from '../../components/ui/ImageInputField';
import { toast } from 'react-toastify';
import CommonModal from '../../components/ui/commonModal';

// Dummy Data
const dummyDisputes = [
  {
    _id: '1',
    status: 'open',
    priority: 'high',
    orderId: 'ORD12345',
    customer: 'John Doe',
    tailor: 'Jane Smith',
    issue: 'Incorrect measurements provided for the dress.',
    createdDate: '2025-09-01T10:00:00Z',
    evidence: [
      { name: 'measurement_sheet.pdf' },
      { name: 'dress_image.jpg' }
    ],
    messages: [
      {
        sender: 'customer',
        content: 'The dress doesn’t fit properly.',
        timestamp: '2025-09-01T10:30:00Z',
        attachments: [{ name: 'dress_image.jpg' }]
      },
      {
        sender: 'admin',
        content: 'We’re reviewing the case. Please provide more details.',
        timestamp: '2025-09-01T11:00:00Z'
      }
    ],
    escalationLevel: 1
  },
  {
    _id: '2',
    status: 'in_progress',
    priority: 'medium',
    orderId: 'ORD12346',
    customer: 'Alice Brown',
    tailor: 'Bob Taylor',
    issue: 'Delayed delivery of the suit.',
    createdDate: '2025-08-28T09:00:00Z',
    evidence: [{ name: 'order_confirmation.pdf' }],
    messages: [
      {
        sender: 'customer',
        content: 'The suit was supposed to arrive last week.',
        timestamp: '2025-08-28T09:30:00Z'
      }
    ],
    escalationLevel: 2
  },
  {
    _id: '3',
    status: 'resolved',
    priority: 'low',
    orderId: 'ORD12347',
    customer: 'Emma Wilson',
    tailor: 'Michael Lee',
    issue: 'Minor stitching issue.',
    createdDate: '2025-08-15T12:00:00Z',
    evidence: [],
    messages: [
      {
        sender: 'admin',
        content: 'Issue resolved with a refund.',
        timestamp: '2025-08-20T14:00:00Z'
      }
    ],
    escalationLevel: 3
  }
];

const dummyStats = {
  open: 5,
  in_progress: 3,
  resolved: 10,
  avgResolutionTime: 7
};

// Mock DisputeApi for demo purposes
const DisputeApi = {
  getAllDisputes: async () => ({ data: { data: dummyDisputes } }),
  getDisputeStats: async () => ({ data: { data: dummyStats } }),
  sendMessage: async (disputeId, { message, attachments }) => {
    console.log(`Sending message for dispute ${disputeId}: ${message}`, attachments);
    return { success: true };
  },
  resolveDispute: async (disputeId, { satisfaction }) => {
    console.log(`Resolving dispute ${disputeId} with satisfaction: ${satisfaction}`);
    return { success: true };
  },
  escalateDispute: async (disputeId) => {
    console.log(`Escalating dispute ${disputeId}`);
    return { success: true };
  }
};

const Disputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({
    open: 0,
    in_progress: 0,
    resolved: 0,
    avgResolutionTime: 0
  });
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'Dispute Resolution Center',
      description: 'Manage and resolve customer-tailor disputes',
      openDisputes: 'Open Disputes',
      inProgress: 'In Progress',
      resolvedThisMonth: 'Resolved This Month',
      avgResolutionTime: 'Avg Resolution Time',
      days: 'days',
      activeDisputes: 'Active Disputes',
      viewDetails: 'View Details',
      contactParties: 'Contact Parties',
      takeAction: 'Take Action',
      disputeDetails: 'Dispute Details',
      evidenceCollection: 'Evidence Collection',
      addEvidence: 'Add Evidence',
      sendMessage: 'Send Message',
      mediationHistory: 'Mediation History',
      escalationWorkflow: 'Escalation Workflow',
      resolution: 'Resolution',
      markAsResolved: 'Mark as Resolved',
      escalate: 'Escalate',
      satisfactionSurvey: 'Satisfaction Survey',
      surveyQuestion: 'How satisfied are you with the resolution of this dispute?',
      submitを作る: 'Submit',
      close: 'Close',
      status: 'Status',
      priority: 'Priority',
      order: 'Order',
      customer: 'Customer',
      tailor: 'Tailor',
      issue: 'Issue',
      createdDate: 'Created Date',
      lastUpdate: 'Last Update',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      open: 'Open',
      in_progress: 'In Progress',
      resolved: 'Resolved',
      evidence: 'Evidence',
      messages: 'Messages',
      actions: 'Actions',
      allDisputes: 'All Disputes',
      searchDisputes: 'Search disputes...',
      filter: 'Filter'
    },
    ar: {
      title: 'مركز حل النزاعات',
      description: 'إدارة وحل النزاعات بين العملاء والخياطين',
      openDisputes: 'النزاعات المفتوحة',
      inProgress: 'قيد المعالجة',
      resolvedThisMonth: 'تم حلها هذا الشهر',
      avgResolutionTime: 'متوسط وقت الحل',
      days: 'أيام',
      activeDisputes: 'النزاعات النشطة',
      viewDetails: 'عرض التفاصيل',
      contactParties: 'الاتصال بالأطراف',
      takeAction: 'اتخاذ إجراء',
      disputeDetails: 'تفاصيل النزاع',
      evidenceCollection: 'جمع الأدلة',
      addEvidence: 'إضافة دليل',
      sendMessage: 'إرسال رسالة',
      mediationHistory: 'سجل الوساطة',
      escalationWorkflow: 'سير عمل التصعيد',
      resolution: 'القرار',
      markAsResolved: 'وضع كحل',
      escalate: 'تصعيد',
      satisfactionSurvey: 'استبيان الرضا',
      surveyQuestion: 'ما مدى رضاك عن حل هذا النزاع؟',
      submit: 'إرسال',
      close: 'إغلاق',
      status: 'الحالة',
      priority: 'الأولوية',
      order: 'الطلب',
      customer: 'العميل',
      tailor: 'الخياط',
      issue: 'المشكلة',
      createdDate: 'تاريخ الإنشاء',
      lastUpdate: 'آخر تحديث',
      high: 'عالي',
      medium: 'متوسط',
      low: 'منخفض',
      open: 'مفتوح',
      in_progress: 'قيد المعالجة',
      resolved: 'محلول',
      evidence: 'الأدلة',
      messages: 'الرسائل',
      actions: 'الإجراءات',
      allDisputes: 'جميع النزاعات',
      searchDisputes: 'البحث في النزاعات...',
      filter: 'تصفية'
    }
  };

  const t = translations[language || 'en'];

  useEffect(() => {
    fetchDisputes();
    fetchStats();
  }, []);

  const fetchDisputes = async () => {
    try {
      const response = await DisputeApi.getAllDisputes();
      setDisputes(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching disputes:', error);
      toast.error('Failed to fetch disputes');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await DisputeApi.getDisputeStats();
      setStats(response.data?.data || {
        open: 0,
        in_progress: 0,
        resolved: 0,
        avgResolutionTime: 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { label: t.open, class: 'status-pending' },
      in_progress: { label: t.in_progress, class: 'bg-primary/10 text-primary' },
      resolved: { label: t.resolved, class: 'status-active' }
    };

    const config = statusConfig[status];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: t.high, class: 'bg-destructive/10 text-destructive' },
      medium: { label: t.medium, class: 'bg-warning/10 text-warning' },
      low: { label: t.low, class: 'bg-success/10 text-success' }
    };

    const config = priorityConfig[priority];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const handleViewDetails = (dispute) => {
    setSelectedDispute(dispute);
    setIsDetailModalOpen(true);
  };

  const handleTakeAction = (dispute) => {
    setSelectedDispute(dispute);
    setIsActionModalOpen(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await DisputeApi.sendMessage(selectedDispute._id, {
        message,
        attachments: evidenceFiles
      });

      setMessage('');
      setEvidenceFiles([]);
      fetchDisputes();
      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleResolveDispute = async (satisfaction) => {
    try {
      await DisputeApi.resolveDispute(selectedDispute._id, { satisfaction });
      setIsActionModalOpen(false);
      fetchDisputes();
      fetchStats();
      toast.success('Dispute resolved successfully');
    } catch (error) {
      console.error('Error resolving dispute:', error);
      toast.error('Failed to resolve dispute');
    }
  };

  const handleEscalateDispute = async () => {
    try {
      await DisputeApi.escalateDispute(selectedDispute._id);
      setIsActionModalOpen(false);
      fetchDisputes();
      toast.success('Dispute escalated successfully');
    } catch (error) {
      console.error('Error escalating dispute:', error);
      toast.error('Failed to escalate dispute');
    }
  };

  const columnsConfig = [
    {
      header: t.status,
      accessorKey: 'status',
      cell: ({ row }) => getStatusBadge(row.original.status)
    },
    {
      header: t.priority,
      accessorKey: 'priority',
      cell: ({ row }) => getPriorityBadge(row.original.priority)
    },
    {
      header: t.order,
      accessorKey: 'orderId',
      cell: ({ row }) => (
        <span className="font-medium">#{row.original.orderId}</span>
      )
    },
    {
      header: t.customer,
      accessorKey: 'customer',
      cell: ({ row }) => row.original.customer
    },
    {
      header: t.tailor,
      accessorKey: 'tailor',
      cell: ({ row }) => row.original.tailor
    },
    {
      header: t.issue,
      accessorKey: 'issue',
      cell: ({ row }) => (
        <div className="max-w-xs truncate">{row.original.issue}</div>
      )
    },
    {
      header: t.createdDate,
      accessorKey: 'createdDate',
      cell: ({ row }) => new Date(row.original.createdDate).toLocaleDateString()
    },
    {
      header: t.actions,
      accessorKey: 'actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewDetails(row.original)}
          >
            {t.viewDetails}
          </Button>
          <Button
            size="sm"
            onClick={() => handleTakeAction(row.original)}
          >
            {t.takeAction}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground mt-1">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t.openDisputes}
                </p>
                <p className="text-3xl font-bold text-foreground">{stats.open}</p>
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
                  {t.inProgress}
                </p>
                <p className="text-3xl font-bold text-foreground">{stats.in_progress}</p>
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
                  {t.resolvedThisMonth}
                </p>
                <p className="text-3xl font-bold text-foreground">{stats.resolved}</p>
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
                  {t.avgResolutionTime}
                </p>
                <p className="text-3xl font-bold text-foreground">{stats.avgResolutionTime}</p>
                <p className="text-xs text-muted-foreground">{t.days}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-elevated">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.allDisputes}</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t.searchDisputes}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {t.filter}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TableAlpha
            data={disputes}
            columnsConfig={columnsConfig}
            itemsName="disputes"
            showStatusFilter={true}
            showLocationFilter={false}
            statusOptions={[
              { value: 'all', label: language === 'en' ? 'All Status' : 'جميع الحالات' },
              { value: 'open', label: t.open },
              { value: 'in_progress', label: t.in_progress },
              { value: 'resolved', label: t.resolved }
            ]}
          />
        </CardContent>
      </Card>

      <CommonModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={t.disputeDetails}
        size="xl"
        cancelText={t.close}
      >
        {selectedDispute && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{t.status}</h3>
                <p>{getStatusBadge(selectedDispute.status)}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t.priority}</h3>
                <p>{getPriorityBadge(selectedDispute.priority)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{t.order}</h3>
                <p>#{selectedDispute.orderId}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t.createdDate}</h3>
                <p>{new Date(selectedDispute.createdDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{t.customer}</h3>
                <p>{selectedDispute.customer}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t.tailor}</h3>
                <p>{selectedDispute.tailor}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">{t.issue}</h3>
              <p className="bg-gray-100 p-3 rounded-md">{selectedDispute.issue}</p>
            </div>

            {selectedDispute.evidence && selectedDispute.evidence.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">{t.evidence}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {selectedDispute.evidence.map((evidence, index) => (
                    <div key={index} className="border rounded-md p-2">
                      <div className="flex items-center">
                        <Paperclip className="w-4 h-4 mr-2" />
                        <span className="text-sm truncate">{evidence.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedDispute.messages && selectedDispute.messages.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">{t.mediationHistory}</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedDispute.messages.map((msg, index) => (
                    <div key={index} className={`p-3 rounded-md ${msg.sender === 'admin' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{msg.sender === 'admin' ? 'Admin' : msg.sender}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2">
                          {msg.attachments.map((attachment, attIndex) => (
                            <div key={attIndex} className="flex items-center text-xs text-gray-500">
                              <Paperclip className="w-3 h-3 mr-1" />
                              {attachment.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CommonModal>

      <CommonModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title={t.takeAction}
        size="xl"
        cancelText={t.close}
      >
        {selectedDispute && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">{t.evidenceCollection}</h3>
              <FileInputField
                value={evidenceFiles}
                onChange={setEvidenceFiles}
                multiple={true}
                accept="image/*,application/pdf,.doc,.docx"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t.sendMessage}</h3>
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t.escalationWorkflow}</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span>Level 1: Initial Mediation</span>
                  {selectedDispute.escalationLevel <= 1 ? (
                    <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span>Level 2: Senior Mediator</span>
                  {selectedDispute.escalationLevel === 2 ? (
                    <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                  ) : selectedDispute.escalationLevel > 2 ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : null}
                </div>
                <div className="flex items-center justify-between">
                  <span>Level 3: Management Review</span>
                  {selectedDispute.escalationLevel >= 3 ? (
                    <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                  ) : null}
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={handleEscalateDispute}
              >
                {t.escalate}
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t.resolution}</h3>
              <Button
                className="mr-2"
                onClick={() => handleResolveDispute('satisfied')}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {t.markAsResolved}
              </Button>
            </div>

            {selectedDispute.status === 'resolved' && (
              <div>
                <h3 className="font-semibold mb-2">{t.satisfactionSurvey}</h3>
                <p className="mb-2">{t.surveyQuestion}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => handleResolveDispute('very_satisfied')}>
                    <ThumbsUp className="w-4 h-4 mr-1" /> Very Satisfied
                  </Button>
                  <Button variant="outline" onClick={() => handleResolveDispute('satisfied')}>
                    <ThumbsUp className="w-4 h-4 mr-1" /> Satisfied
                  </Button>
                  <Button variant="outline" onClick={() => handleResolveDispute('neutral')}>
                    Neutral
                  </Button>
                  <Button variant="outline" onClick={() => handleResolveDispute('dissatisfied')}>
                    <ThumbsDown className="w-4 h-4 mr-1" /> Dissatisfied
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Disputes;