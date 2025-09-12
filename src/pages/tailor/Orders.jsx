import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Eye, Clock, ShoppingBag, Check, MessageSquare, Calendar, AlertTriangle, Edit } from 'lucide-react';
import TableAlpha from '../../components/ui/TableAlpha';
import CommonModal from '../../components/ui/commonModal';
import InputField from '../../components/ui/InputField';
import OrderApi from '../../api/order.api';
import { toast } from 'react-toastify';
import { useLanguage } from '../../components/Layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useSocket } from '../Chat/SocketProvider';
import ChatComponent from '../Chat/ChatComponent';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ar from 'date-fns/locale/ar';

const translations = {
  en: {
    title: 'Order Management',
    addOrder: 'Add Order',
    orderId: 'Order ID',
    customerName: 'Customer Name',
    customerEmail: 'Customer Email',
    customerAddress: 'Customer Address',
    serviceDescription: 'Service Description',
    orderDescription: 'Order Description',
    price: 'Price',
    quantity: 'Quantity',
    deliveryOption: 'Delivery Option',
    status: 'Status',
    additionalNotes: 'Additional Notes',
    measurements: 'Measurements',
    createdAt: 'Created At',
    actions: 'Actions',
    orders: 'orders',
    viewOrder: 'View Order',
    updateStatus: 'Update Status',
    contactCustomer: 'Contact Customer',
    pending: 'Pending',
    accepted: 'Accepted',
    in_progress: 'In Progress',
    ready: 'Ready',
    delivered: 'Delivered',
    regular: 'Regular',
    express: 'Express',
    activeOrders: 'Active Orders',
    readyForDelivery: 'Ready for Delivery',
    monthlyRevenue: 'Monthly Revenue',
    searchOrders: 'Search orders...',
    filter: 'Filter',
    orderDetails: 'Order Details',
    newOrder: 'New Order',
    addNewOrder: 'Add New Order',
    updateOrder: 'Update Order',
    deleteConfirm: 'Are you sure you want to delete this order?',
    createdSuccess: 'Order created successfully',
    updatedSuccess: 'Order updated successfully',
    deletedSuccess: 'Order deleted successfully',
    nameRequired: 'Customer name is required',
    addressRequired: 'Customer address is required',
    serviceRequired: 'Service is required',
    priceRequired: 'Price is required',
    quantityRequired: 'Quantity is required',
    deliveryOptionRequired: 'Delivery option is required',
    statusRequired: 'Status is required',
    dateRequired: 'Date is required',
    acceptOrder: 'Accept Order',
    expectedDeliveryDate: 'Expected Delivery Date',
    deliveryDateRequired: 'Expected delivery date is required',
    acceptedSuccess: 'Order accepted successfully',
    completionDate: 'Completion Date',
    remainingDays: 'Remaining Days',
    priority: 'Priority',
    highPriority: 'High Priority',
    mediumPriority: 'Medium Priority',
    lowPriority: 'Low Priority',
    filterByDate: 'Filter by Date',
    allDates: 'All Dates',
    urgent: 'Urgent',
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    nextWeek: 'Next Week',
    overdue: 'Overdue',
    confirmed: 'Confirmed',
    measurement_confirmed: 'Measurement Confirmed',
    cutting: 'Cutting',
    stitching: 'Stitching',
    quality_check: 'Quality Check',
    ready_for_delivery: 'Ready for Delivery',
    delayed_delivery: 'Delayed Delivery',
    delayed_delivery_orders: 'Delayed Delivery',
    set_delayed_delivery: 'Set Delayed Delivery',
    confirm_delay: 'Confirm Delay',
    current_completion_date: 'Current Completion Date',
    new_delivery_date: 'New Delivery Date',
    remarks: 'Remarks',
    remarks_required: 'Remarks are required',
    new_date_required: 'New delivery date is required',
    select_new_status: 'Select New Status',
    status_updated_success: 'Status updated successfully',
    no_available_updates: 'No available status updates',
    select_date: 'Select Date'
  },
  ar: {
    title: 'إدارة الطلبات',
    addOrder: 'إضافة طلب',
    orderId: 'رقم الطلب',
    customerName: 'اسم العميل',
    customerEmail: 'بريد العميل',
    customerAddress: 'عنوان العميل',
    serviceDescription: 'وصف الخدمة',
    orderDescription: 'وصف الطلب',
    price: 'السعر',
    quantity: 'الكمية',
    deliveryOption: 'خيار التوصيل',
    status: 'الحالة',
    additionalNotes: 'ملاحظات إضافية',
    measurements: 'القياسات',
    createdAt: 'تاريخ الإنشاء',
    actions: 'الإجراءات',
    orders: 'الطلبات',
    viewOrder: 'عرض الطلب',
    updateStatus: 'تحديث الحالة',
    contactCustomer: 'الاتصال بالعميل',
    pending: 'معلق',
    accepted: 'مقبول',
    in_progress: 'قيد التنفيذ',
    ready: 'جاهز',
    delivered: 'تم التسليم',
    regular: 'عادي',
    express: 'سريع',
    activeOrders: 'الطلبات النشطة',
    readyForDelivery: 'جاهز للتسليم',
    monthlyRevenue: 'الإيرادات الشهرية',
    searchOrders: 'البحث في الطلبات...',
    filter: 'تصفية',
    orderDetails: 'تفاصيل الطلب',
    newOrder: 'طلب جديد',
    addNewOrder: 'إضافة طلب جديد',
    updateOrder: 'تحديث الطلب',
    deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذا الطلب؟',
    createdSuccess: 'تم إنشاء الطلب بنجاح',
    updatedSuccess: 'تم تحديث الطلب بنجاح',
    deletedSuccess: 'تم حذف الطلب بنجاح',
    nameRequired: 'اسم العميل مطلوب',
    addressRequired: 'عنوان العميل مطلوب',
    serviceRequired: 'الخدمة مطلوبة',
    priceRequired: 'السعر مطلوب',
    quantityRequired: 'الكمية مطلوبة',
    deliveryOptionRequired: 'خيار التوصيل مطلوب',
    statusRequired: 'الحالة مطلوبة',
    dateRequired: 'التاريخ مطلوب',
    acceptOrder: 'قبول الطلب',
    expectedDeliveryDate: 'تاريخ التسليم المتوقع',
    deliveryDateRequired: 'تاريخ التسليم المتوقع مطلوب',
    acceptedSuccess: 'تم قبول الطلب بنجاح',
    completionDate: 'تاريخ الإكمال',
    remainingDays: 'الأيام المتبقية',
    priority: 'الأولوية',
    highPriority: 'أولوية عالية',
    mediumPriority: 'أولوية متوسطة',
    lowPriority: 'أولوية منخفضة',
    filterByDate: 'تصفية حسب التاريخ',
    allDates: 'جميع التواريخ',
    urgent: 'عاجل',
    today: 'اليوم',
    tomorrow: 'غداً',
    thisWeek: 'هذا الأسبوع',
    nextWeek: 'الأسبوع القادم',
    overdue: 'متأخر',
    confirmed: 'مؤكد',
    measurement_confirmed: 'تم تأكيد القياسات',
    cutting: 'قص',
    stitching: 'خياطة',
    quality_check: 'فحص الجودة',
    ready_for_delivery: 'جاهز للتسليم',
    delayed_delivery: 'تسليم متأخر',
    delayed_delivery_orders: 'تسليم متأخر',
    set_delayed_delivery: 'تعيين تسليم متأخر',
    confirm_delay: 'تأكيد التأخير',
    current_completion_date: 'تاريخ الإكمال الحالي',
    new_delivery_date: 'تاريخ التسليم الجديد',
    remarks: 'ملاحظات',
    remarks_required: 'الملاحظات مطلوبة',
    new_date_required: 'تاريخ التسليم الجديد مطلوب',
    select_new_status: 'اختر الحالة الجديدة',
    status_updated_success: 'تم تحديث الحالة بنجاح',
    no_available_updates: 'لا توجد تحديثات حالة متاحة',
    select_date: 'اختر التاريخ'
  }
};


const Orders = () => {
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [delayedModalOpen, setDelayedModalOpen] = useState(false);
  const [acceptingOrder, setAcceptingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [delayedOrder, setDelayedOrder] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatOrder, setSelectedChatOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [stats, setStats] = useState({
    active: 0,
    ready: 0,
    delayed: 0,
    highPriority: 0
  });
  const { language } = useLanguage();
  const socketContext = useSocket();
  const { setReceiverUID, setOrderId } = socketContext || {};
  registerLocale('ar', ar);

  const CustomInput = ({ value, onClick, onChange, placeholder }, ref) => (
    <input
      type="text"
      className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
      onClick={onClick}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly
    />
  );

  const t = translations[language || 'en'];

  const statusProgression = [
    'Pending',
    'Confirmed',
    'Measurement Confirmed',
    'Cutting',
    'Stitching',
    'Quality Check',
    'Ready for Delivery',
    'Delivered'
  ];

  const statusOptions = [
    { value: 'Pending', label: t.pending },
    { value: 'Confirmed', label: t.confirmed },
    { value: 'Measurement Confirmed', label: t.measurement_confirmed },
    { value: 'Cutting', label: t.cutting },
    { value: 'Stitching', label: t.stitching },
    { value: 'Quality Check', label: t.quality_check },
    { value: 'Ready for Delivery', label: t.ready_for_delivery },
    { value: 'Delayed Delivery', label: t.delayed_delivery },
    { value: 'Delivered', label: t.delivered }
  ];

  const acceptValidationSchema = Yup.object({
    deadline: Yup.date().required(t.deliveryDateRequired)
  });

  const updateValidationSchema = Yup.object({
    status: Yup.string().required(t.statusRequired)
  });

  const delayedValidationSchema = Yup.object({
    newDeadline: Yup.date().required(t.new_date_required),
    remarks: Yup.string().required(t.remarks_required)
  });

  const calculateOrderDetails = (order) => {
    if (!order.expectedDeliveryDate) {
      return {
        remainingDays: null,
        priority: 'low',
        isUrgent: false,
        isOverdue: false
      };
    }

    const today = moment().startOf('day');
    const deliveryDate = moment(order.expectedDeliveryDate).startOf('day');
    const remainingDays = deliveryDate.diff(today, 'days');

    let priority = 'low';
    let isUrgent = false;
    let isOverdue = false;

    if (remainingDays < 0) {
      priority = 'overdue';
      isOverdue = true;
    } else if (remainingDays <= 3) {
      priority = 'high';
      isUrgent = true;
    } else if (remainingDays <= 7) {
      priority = 'medium';
    }

    return {
      remainingDays,
      priority,
      isUrgent,
      isOverdue
    };
  };

  const getAllOrders = async () => {
    try {
      const res = await OrderApi.getAllOrders();
      const ordersWithDetails = (res.data?.data || []).map(order => ({
        ...order,
        ...calculateOrderDetails(order)
      }));
      setOrders(ordersWithDetails);
      setFilteredOrders(ordersWithDetails);
      calculateStats(ordersWithDetails);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Failed to fetch orders');
    }
  };

  const calculateStats = (ordersData) => {
    const active = ordersData.filter(order => order.status !== 'Delivered').length;
    const ready = ordersData.filter(order => order.status === 'Ready for Delivery').length;
    const delayed = ordersData.filter(order => order.status === 'Delayed Delivery').length;
    const highPriority = ordersData.filter(order => order.priority === 'high').length;

    setStats({ active, ready, delayed, highPriority });
  };

  const applyDateFilter = (filterValue, ordersData) => {
    if (filterValue === 'all') {
      return ordersData;
    }

    const today = moment().startOf('day');
    return ordersData.filter(order => {
      if (!order.expectedDeliveryDate) return false;

      const deliveryDate = moment(order.expectedDeliveryDate).startOf('day');
      const remainingDays = deliveryDate.diff(today, 'days');

      switch (filterValue) {
        case 'urgent':
          return order.isUrgent;
        case 'today':
          return remainingDays === 0;
        case 'tomorrow':
          return remainingDays === 1;
        case 'thisWeek':
          return remainingDays >= 0 && remainingDays <= 7;
        case 'nextWeek':
          return remainingDays > 7 && remainingDays <= 14;
        case 'overdue':
          return order.isOverdue;
        default:
          return true;
      }
    });
  };

  const handleCalendarFilter = (date) => {
    setSelectedDate(date || null);
    setDateFilter('all');
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;
    if (selectedDate) {
      // Comment API integration for UI testing
      // const payload = { date: selectedDate };
      // const res = await OrderApi.getOrdersByDate(payload);
      // filtered = res.data?.data || [];

      // For UI: filter locally
      filtered = orders.filter(order =>
        order.expectedDeliveryDate && moment(order.expectedDeliveryDate).format('YYYY-MM-DD') === selectedDate
      );
    } else {
      filtered = applyDateFilter(dateFilter, orders);
    }
    setFilteredOrders(filtered);
    calculateStats(filtered);
  }, [dateFilter, selectedDate, orders]);

  const acceptFormik = useFormik({
    initialValues: {
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    validationSchema: acceptValidationSchema,
    onSubmit: async (values) => {
      try {
        await OrderApi.confirmOrder({ orderId: acceptingOrder._id, expectedDeliveryDate: values.deadline });
        toast.success(t.acceptedSuccess);
        getAllOrders();
        setAcceptModalOpen(false);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'Something went wrong');
      }
    }
  });

  const updateFormik = useFormik({
    initialValues: {
      status: ''
    },
    validationSchema: updateValidationSchema,
    onSubmit: async (values) => {
      if (values.status === 'Delayed Delivery') {
        setDelayedOrder(updatingOrder);
        setDelayedModalOpen(true);
        setUpdateModalOpen(false);
        return;
      }

      try {
        // Comment API integration for UI testing
        // const payload = { orderId: updatingOrder._id, status: values.status };
        // await OrderApi.updateOrderStatus(payload);

        toast.success(t.status_updated_success);

        // Update locally for UI
        setOrders(prev => prev.map(o =>
          o._id === updatingOrder._id
            ? { ...o, status: values.status, ...calculateOrderDetails({ ...o, status: values.status }) }
            : o
        ));

        handleCloseModal();
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong');
      }
    }
  });

  const delayedFormik = useFormik({
    initialValues: {
      newDeadline: '',
      remarks: ''
    },
    validationSchema: delayedValidationSchema,
    onSubmit: async (values) => {
      try {
        // Comment API integration for UI testing
        // const payload = { 
        //   orderId: delayedOrder._id, 
        //   status: 'Delayed Delivery', 
        //   expectedDeliveryDate: values.newDeadline, 
        //   remarks: values.remarks 
        // };
        // await OrderApi.updateDelayedStatus(payload);

        toast.success(t.status_updated_success);

        // Update locally for UI
        setOrders(prev => prev.map(o =>
          o._id === delayedOrder._id
            ? {
              ...o,
              status: 'Delayed Delivery',
              expectedDeliveryDate: values.newDeadline,
              additionalNotes: `${o.additionalNotes || ''}\nRemarks: ${values.remarks}`,
              ...calculateOrderDetails({ ...o, expectedDeliveryDate: values.newDeadline })
            }
            : o
        ));

        handleCloseModal();
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong');
      }
    }
  });

  const getStatusBadge = (status) => {
    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '_');
    const statusConfig = {
      pending: { label: t.pending, class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: t.confirmed, class: 'bg-green-100 text-green-800' },
      measurement_confirmed: { label: t.measurement_confirmed, class: 'bg-blue-100 text-blue-800' },
      cutting: { label: t.cutting, class: 'bg-indigo-100 text-indigo-800' },
      stitching: { label: t.stitching, class: 'bg-purple-100 text-purple-800' },
      quality_check: { label: t.quality_check, class: 'bg-teal-100 text-teal-800' },
      ready_for_delivery: { label: t.ready_for_delivery, class: 'bg-cyan-100 text-cyan-800' },
      delayed_delivery: { label: t.delayed_delivery, class: 'bg-red-100 text-red-800' },
      delivered: { label: t.delivered, class: 'bg-success/20 text-success' }
    };

    const config = statusConfig[normalizedStatus] || { label: status, class: 'bg-secondary/50 text-secondary-foreground' };
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority, remainingDays) => {
    const priorityConfig = {
      high: {
        label: remainingDays < 0 ? t.overdue : t.highPriority,
        class: remainingDays < 0 ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800'
      },
      medium: { label: t.mediumPriority, class: 'bg-yellow-100 text-yellow-800' },
      low: { label: t.lowPriority, class: 'bg-green-100 text-green-800' },
      overdue: { label: t.overdue, class: 'bg-red-600 text-white' }
    };

    const config = priorityConfig[priority] || { label: t.lowPriority, class: 'bg-green-100 text-green-800' };
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getDeliveryOptionLabel = (option, express) => {
    return express ? t.express : t.regular;
  };

  const columnsConfig = [
    {
      header: t.orderId,
      accessorKey: 'order_id',
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">#{row.original.order_id}</span>
      )
    },
    {
      header: t.customerName,
      accessorKey: 'customerName',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.customerName}</div>
          <div className="text-sm text-gray-500">{row.original.customer.email}</div>
        </div>
      )
    },
    {
      header: "serviceName",
      accessorKey: 'service.serviceName',
      cell: ({ row }) => (
        <span className="text-sm capitalize">{row.original.service.serviceName}</span>
      )
    },
    {
      header: "service",
      accessorKey: 'service.serviceType',
      cell: ({ row }) => (
        <span className="text-sm capitalize">{row.original.service.serviceType?.name}</span>
      )
    },
    {
      header: t.price,
      accessorKey: 'price',
      cell: ({ row }) => (
        <span className="font-medium">AED {row.original.price}</span>
      )
    },
    {
      header: t.quantity,
      accessorKey: 'quantity',
      cell: ({ row }) => row.original.quantity
    },
    {
      header: t.deliveryOption,
      accessorKey: 'deliveryOption',
      cell: ({ row }) => getDeliveryOptionLabel(row.original.deliveryOption, row.original.expressDelivery)
    },
    {
      header: t.completionDate,
      accessorKey: 'expectedDeliveryDate',
      cell: ({ row }) => (
        row.original.expectedDeliveryDate ?
          new Date(row.original.expectedDeliveryDate).toLocaleDateString() :
          '-'
      )
    },
    {
      header: t.remainingDays,
      accessorKey: 'remainingDays',
      cell: ({ row }) => {
        if (row.original.remainingDays === null) return '-';

        return (
          <div className={`flex items-center ${row.original.isUrgent ? 'font-bold' : ''}`}>
            {row.original.isOverdue ? (
              <>
                <AlertTriangle className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-red-600">{Math.abs(row.original.remainingDays)} {t.overdue}</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                <span className={row.original.isUrgent ? 'text-red-600' : 'text-gray-700'}>
                  {row.original.remainingDays} {language === 'en' ? 'days' : 'أيام'}
                </span>
              </>
            )}
          </div>
        );
      }
    },
    {
      header: t.priority,
      accessorKey: 'priority',
      cell: ({ row }) => getPriorityBadge(row.original.priority, row.original.remainingDays)
    },
    {
      header: t.status,
      accessorKey: 'status',
      cell: ({ row }) => getStatusBadge(row.original.status)
    },
    {
      header: 'Order Date',
      accessorKey: 'createdAt',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
    },
    {
      header: t.actions,
      accessorKey: 'actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(row.original)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title={t.viewOrder}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleChat(row.original)}
            className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            title={t.contactCustomer}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          {row.original.status === 'Pending' && (
            <button
              onClick={() => handleAccept(row.original)}
              className="p-1 text-success hover:bg-success/10 rounded-md transition-colors"
              title={t.acceptOrder}
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => handleUpdateStatus(row.original)}
            className="p-1 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            title={t.updateStatus}
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const handleChat = (order) => {
    if (!setReceiverUID || !setOrderId) return;
    setReceiverUID(order.customer._id);
    setOrderId(order._id);
    setSelectedChatOrder(order);
    setIsChatOpen(true);
  };

  const handleView = (order) => {
    setViewingOrder(order);
    setViewModalOpen(true);
  };

  const handleAccept = (order) => {
    setAcceptingOrder(order);
    acceptFormik.resetForm();
    setAcceptModalOpen(true);
  };

  const handleUpdateStatus = (order) => {
    setUpdatingOrder(order);
    updateFormik.setFieldValue('status', '');
    setUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setAcceptModalOpen(false);
    setViewModalOpen(false);
    setUpdateModalOpen(false);
    setDelayedModalOpen(false);
    setAcceptingOrder(null);
    setViewingOrder(null);
    setUpdatingOrder(null);
    setDelayedOrder(null);
    acceptFormik.resetForm();
    updateFormik.resetForm();
    delayedFormik.resetForm();
  };


  const getFilteredStatusOptions = (currentStatus) => {
    const currentIndex = statusProgression.indexOf(currentStatus);
    let filtered = [];

    if (currentIndex !== -1) {
      filtered = statusOptions.filter(opt => statusProgression.indexOf(opt.value) > currentIndex);
    }

    if (currentStatus !== 'Delivered' && currentStatus !== 'Delayed Delivery') {
      const delayedOpt = statusOptions.find(opt => opt.value === 'Delayed Delivery');
      if (delayedOpt) filtered.push(delayedOpt);
    }

    if (currentStatus === 'Delayed Delivery') {
      const deliveredOpt = statusOptions.find(opt => opt.value === 'Delivered');
      if (deliveredOpt) filtered.push(deliveredOpt);
    }

    return filtered;
  };

  return (
    <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t.activeOrders}</p>
                  <p className="text-3xl font-bold text-foreground">{stats.active}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">{t.readyForDelivery}</p>
                  <p className="text-3xl font-bold text-foreground">{stats.ready}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">{t.delayed_delivery_orders}</p>
                  <p className="text-3xl font-bold text-foreground">{stats.delayed}</p>
                </div>
                <div className="p-3 rounded-xl bg-red-100">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t.highPriority}</p>
                  <p className="text-3xl font-bold text-foreground">{stats.highPriority}</p>
                </div>
                <div className="p-3 rounded-xl bg-orange-100">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <TableAlpha
          data={filteredOrders}
          columnsConfig={columnsConfig}
          itemsName={t.orders}
          showStatusFilter={true}
          showLocationFilter={false}
          statusOptions={[
            { value: 'all', label: language === 'en' ? 'All Status' : 'جميع الحالات' },
            ...statusOptions.map(status => ({
              value: status.value,
              label: status.label
            }))
          ]}
          additionalFilters={
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">{t.select_date}:</label>
                <DatePicker
                  selected={selectedDate ? new Date(selectedDate) : null}
                  onChange={(date) => {
                    const formattedDate = date ? moment(date).format('YYYY-MM-DD') : null;
                    handleCalendarFilter(formattedDate);
                  }}
                  locale={language === 'ar' ? 'ar' : 'en'}
                  dateFormat="yyyy-MM-dd"
                  placeholderText={'YYYY-MM-DD'}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-40"
                  isClearable
                  clearButtonClassName="after:bg-red-100 after:rounded-full"
                  showPopperArrow={false}
                  popperClassName="react-datepicker-custom"
                  customInput={<CustomInput />}
                />
              </div>
            </div>
          }
          rowClassName={(row) => {
            if (row.original.isUrgent) {
              return row.original.isOverdue
                ? 'bg-red-50 hover:bg-red-100'
                : 'bg-orange-50 hover:bg-orange-100';
            }
            return '';
          }}
        />

        <style>
          {`
            .react-datepicker-custom {
                font-family: inherit;
                border: 1px solid #e5e7eb;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            
            .react-datepicker-custom .react-datepicker__header {
                background-color: #f9fafb;
                border-bottom: 1px solid #e5e7eb;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
            }
            
            .react-datepicker-custom .react-datepicker__current-month {
                font-weight: 600;
                color: #374151;
            }
            
            .react-datepicker-custom .react-datepicker__day-name {
                color: #6b7280;
                font-weight: 500;
            }
            
            .react-datepicker-custom .react-datepicker__day {
                color: #374151;
                border-radius: 0.375rem;
            }
            
            .react-datepicker-custom .react-datepicker__day--selected {
                background-color: #3b82f6;
                color: white;
            }
            
            .react-datepicker-custom .react-datepicker__day--keyboard-selected {
                background-color: #eff6ff;
                color: #374151;
            }
            
            .react-datepicker-custom .react-datepicker__day:hover {
                background-color: #f3f4f6;
            }
            
            .react-datepicker-custom .react-datepicker__navigation {
                top: 12px;
            }
            
            .react-datepicker-custom .react-datepicker__navigation--previous {
                border-right-color: #6b7280;
            }
            
            .react-datepicker-custom .react-datepicker__navigation--next {
                border-left-color: #6b7280;
            }
            
            .react-datepicker-custom .react-datepicker__triangle {
                display: none;
            }
            
            /* RTL support for Arabic */
            .dir-rtl .react-datepicker__navigation--previous {
                right: 10px;
                left: auto;
            }
            
            .dir-rtl .react-datepicker__navigation--next {
                left: 10px;
                right: auto;
            }
          `}
        </style>


        {/* Accept Order Modal */}
        <CommonModal
          isOpen={acceptModalOpen}
          onClose={handleCloseModal}
          onSave={acceptFormik.handleSubmit}
          onCancel={handleCloseModal}
          title={t.acceptOrder}
          saveText={t.acceptOrder}
          size="md"
          isLoading={acceptFormik.isSubmitting}
        >
          <form onSubmit={acceptFormik.handleSubmit} className="space-y-4">
            <InputField
              label={t.expectedDeliveryDate}
              name="deadline"
              type="date"
              value={acceptFormik.values.deadline}
              onChange={acceptFormik.handleChange}
              onBlur={acceptFormik.handleBlur}
              error={acceptFormik.touched.deadline && acceptFormik.errors.deadline}
              isRequired={true}
            />
          </form>
        </CommonModal>

        {/* Update Status Modal */}
        <CommonModal
          isOpen={updateModalOpen}
          onClose={handleCloseModal}
          onSave={updateFormik.handleSubmit}
          onCancel={handleCloseModal}
          title={t.updateStatus}
          saveText={t.updateStatus}
          size="md"
          isLoading={updateFormik.isSubmitting}
        >
          {updatingOrder && (() => {
            const filteredStatusOptions = getFilteredStatusOptions(updatingOrder.status);
            if (filteredStatusOptions.length === 0) {
              return <p className="text-center text-gray-600">{t.no_available_updates}</p>;
            }
            return (
              <form onSubmit={updateFormik.handleSubmit} className="space-y-4 h-[40vh] ">
                <InputField
                  label={t.select_new_status}
                  name="status"
                  type="select"
                  value={updateFormik.values.status}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                  options={filteredStatusOptions}
                  error={updateFormik.touched.status && updateFormik.errors.status}
                  isRequired={true}
                />
              </form>
            );
          })()}
        </CommonModal>

        {/* Delayed Delivery Modal */}
        <CommonModal
          isOpen={delayedModalOpen}
          onClose={handleCloseModal}
          onSave={delayedFormik.handleSubmit}
          onCancel={handleCloseModal}
          title={t.set_delayed_delivery}
          saveText={t.confirm_delay}
          size="md"
          isLoading={delayedFormik.isSubmitting}
        >
          {delayedOrder && (
            <form onSubmit={delayedFormik.handleSubmit} className="space-y-4">
              <InputField
                label={t.orderId}
                name="orderId"
                type="text"
                value={delayedOrder.order_id}
                disabled={true}
              />
              <InputField
                label={t.current_completion_date}
                name="currentDeadline"
                type="date"
                value={moment(delayedOrder.expectedDeliveryDate).format('YYYY-MM-DD')}
                disabled={true}
              />
              <InputField
                label={t.new_delivery_date}
                name="newDeadline"
                type="date"
                value={delayedFormik.values.newDeadline}
                onChange={delayedFormik.handleChange}
                onBlur={delayedFormik.handleBlur}
                error={delayedFormik.touched.newDeadline && delayedFormik.errors.newDeadline}
                isRequired={true}
              />
              <InputField
                label={t.remarks}
                name="remarks"
                type="textarea"
                value={delayedFormik.values.remarks}
                onChange={delayedFormik.handleChange}
                onBlur={delayedFormik.handleBlur}
                error={delayedFormik.touched.remarks && delayedFormik.errors.remarks}
                isRequired={true}
              />
            </form>
          )}
        </CommonModal>

        {/* View Order Modal */}
        <CommonModal
          isOpen={viewModalOpen}
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
          title={t.orderDetails}
          cancelText={language === 'en' ? 'Close' : 'إغلاق'}
          size="lg"
        >
          {viewingOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">{t.orderId}</h3>
                  <p>#{viewingOrder.order_id}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Order Date</h3>
                  <p>{new Date(viewingOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">{t.customerName}</h3>
                  <p>{viewingOrder.customerName}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t.customerEmail}</h3>
                  <p>{viewingOrder.customer.email}</p>
                </div>
              </div>

              {viewingOrder.expectedDeliveryDate && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">{t.completionDate}</h3>
                    <p>{moment(viewingOrder.expectedDeliveryDate).format("MM/DD/YYYY")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.remainingDays}</h3>
                    <p>
                      {viewingOrder.isOverdue
                        ? `${Math.abs(viewingOrder.remainingDays)} ${t.overdue}`
                        : `${viewingOrder.remainingDays} ${language === 'en' ? 'days remaining' : 'أيام متبقية'}`
                      }
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold capitalize">Service</h3>
                  <p>{viewingOrder.service?.serviceType?.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold capitalize">Service Name</h3>
                  <p>{viewingOrder.service.serviceName}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">{t.customerAddress}</h3>
                <p>{viewingOrder.customerAddress}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">{t.serviceDescription}</h3>
                  <p dangerouslySetInnerHTML={{ __html: viewingOrder.service.description }} />
                </div>
                <div>
                  <h3 className="font-semibold">{t.orderDescription}</h3>
                  <p>{viewingOrder.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">{t.price}</h3>
                  <p>AED {viewingOrder.price}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t.quantity}</h3>
                  <p>{viewingOrder.quantity}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">{t.deliveryOption}</h3>
                  <p>{getDeliveryOptionLabel(viewingOrder.deliveryOption, viewingOrder.expressDelivery)}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t.status}</h3>
                  <p>{getStatusBadge(viewingOrder.status)}</p>
                </div>
              </div>

              {viewingOrder.customerMeasurement && Object.keys(viewingOrder.customerMeasurement).length > 0 && (
                <div>
                  <h3 className="font-semibold">{t.measurements}</h3>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {Object.entries(viewingOrder.customerMeasurement).map(([key, value]) => (
                      key !== '_id' && key !== 'default' && key !== 'name' && key !== 'unit' && (
                        <div key={key} className="bg-gray-100 p-2 rounded">
                          <span className="font-medium capitalize">{key}:</span>{' '}
                          {typeof value === 'object' && value !== null
                            ? Object.entries(value).map(([subKey, subValue]) => (
                              <div key={subKey} className="ml-2">
                                {subKey}: {subValue} {viewingOrder.customerMeasurement.unit}
                              </div>
                            ))
                            : `${value} ${viewingOrder.customerMeasurement.unit}`}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {viewingOrder.additionalNotes && (
                <div>
                  <h3 className="font-semibold">{t.additionalNotes}</h3>
                  <p className="bg-gray-100 p-3 rounded">{viewingOrder.additionalNotes}</p>
                </div>
              )}
            </div>
          )}
        </CommonModal>

        {isChatOpen && (
          <ChatComponent
            onClose={() => setIsChatOpen(false)}
            order={selectedChatOrder}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;