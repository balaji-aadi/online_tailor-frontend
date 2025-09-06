import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Plus, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import DocumentPreview from '../../components/ui/documentPreview';
import TailorRegistration from './TailorRegistration';
import CommonModal from '../../components/ui/commonModal';
import TableAlpha from '../../components/ui/TableAlpha';
import ActionDropdown from '../../components/ui/ActionDropdown';
import AuthApi from '../../api/auth.api';
import { useLoading } from '../../loader/LoaderContext';
import { toast } from 'react-toastify';
import TailorApi from '../../api/tailor.api';
import { useLanguage } from '../../components/Layout';

const translations = {
  en: {
    title: 'Tailor Verification',
    subtitle: 'Review and approve tailor applications',
    addTailor: 'Add Tailor',
    pendingReview: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    deactivated: 'De-activated',
    activated: 'Active',
    allTailors: 'All Tailors',
    activeTailors: 'Active Tailors',
    deactivatedTailors: 'Deactivated Tailors',
    sNo: 'S.No',
    businessName: 'Business Name',
    contact: 'Contact',
    specialties: 'Specialties',
    experience: 'Experience',
    documents: 'Documents',
    emiratesIdExpiry: 'Emirates ID Expiry',
    submitted: 'Submitted',
    status: 'Status',
    actions: 'Actions',
    notProvided: 'Not provided',
    expired: ' (Expired)',
    showLess: 'Show less',
    moreSpecialties: '+{count} more',
    moreDocuments: '+{count} more documents',
    registerNewTailor: 'Register New Tailor',
    cancel: 'Cancel',
    close: 'Close',
    tailorDetails: 'Tailor Details',
    ownerName: 'Owner Name',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    services: 'Services',
    homeMeasurement: 'Home Measurement',
    rushOrders: 'Rush Orders',
    yes: 'Yes',
    no: 'No',
    noSpecialties: 'No specialties listed',
    rejectionReason: 'Rejection/Deactivation Reason',
    rejectTailor: 'Reject Tailor',
    deactivateTailor: 'Deactivate Tailor',
    activateTailor: 'Activate Tailor',
    rejectReasonPrompt: 'Please provide a reason for rejecting {name}.',
    deactivateReasonPrompt: 'Please provide a reason for deactivating {name}. This action is due to suspicious activity or other concerns.',
    activateReasonPrompt: 'Activate {name} to allow them to use the platform again.',
    rejectReasonPlaceholder: 'Enter rejection reason here...',
    deactivateReasonPlaceholder: 'Enter deactivation reason here...',
    activateReasonPlaceholder: 'Enter activation reason (optional)...',
    approveSuccess: '{name} has been approved!',
    rejectSuccess: '{name} has been rejected.',
    deactivateSuccess: '{name} has been deactivated.',
    activateSuccess: '{name} has been activated.',
    registerSuccess: 'Account created successfully! Please wait for verification.',
    registerNotify: 'You will be notified once your account is verified.',
    registerEmail: 'Check your email for verification updates.',
    fetchError: 'Failed to fetch tailors',
    approveError: 'Failed to approve tailor',
    rejectError: 'Failed to reject tailor',
    deactivateError: 'Failed to deactivate tailor',
    activateError: 'Failed to activate tailor',
    registerError: 'Failed to register tailor. Please try again.',
    reasonRequired: 'Please provide a {action} reason',
  },
  ar: {
    title: 'التحقق من الخياطين',
    subtitle: 'مراجعة وتأكيد طلبات الخياطين',
    addTailor: 'إضافة خياط',
    pendingReview: 'في انتظار المراجعة',
    approved: 'تم الموافقة',
    rejected: 'مرفوض',
    deactivated: 'معطل',
    activated: 'نشط',
    allTailors: 'جميع الخياطين',
    activeTailors: 'الخياطين النشطين',
    deactivatedTailors: 'الخياطين المعطلين',
    sNo: 'الرقم التسلسلي',
    businessName: 'اسم العمل',
    contact: 'الاتصال',
    specialties: 'التخصصات',
    experience: 'الخبرة',
    documents: 'الوثائق',
    emiratesIdExpiry: 'تاريخ انتهاء بطاقة الهوية الإماراتية',
    submitted: 'تاريخ التقديم',
    status: 'الحالة',
    actions: 'الإجراءات',
    notProvided: 'غير متوفر',
    expired: ' (منتهية الصلاحية)',
    showLess: 'إظهار أقل',
    moreSpecialties: '+{count} تخصصات أخرى',
    moreDocuments: '+{count} وثائق أخرى',
    registerNewTailor: 'تسجيل خياط جديد',
    cancel: 'إلغاء',
    close: 'إغلاق',
    tailorDetails: 'تفاصيل الخياط',
    ownerName: 'اسم المالك',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    location: 'الموقع',
    services: 'الخدمات',
    homeMeasurement: 'القياس في المنزل',
    rushOrders: 'الطلبات العاجلة',
    yes: 'نعم',
    no: 'لا',
    noSpecialties: 'لا توجد تخصصات مدرجة',
    rejectionReason: 'سبب الرفض/التعطيل',
    rejectTailor: 'رفض الخياط',
    deactivateTailor: 'تعطيل الخياط',
    activateTailor: 'تفعيل الخياط',
    rejectReasonPrompt: 'يرجى تقديم سبب لرفض {name}.',
    deactivateReasonPrompt: 'يرجى تقديم سبب لتعطيل {name}. هذا الإجراء بسبب نشاط مشبوه أو مخاوف أخرى.',
    activateReasonPrompt: 'تفعيل {name} للسماح لهم باستخدام المنصة مرة أخرى.',
    rejectReasonPlaceholder: 'أدخل سبب الرفض هنا...',
    deactivateReasonPlaceholder: 'أدخل سبب التعطيل هنا...',
    activateReasonPlaceholder: 'أدخل سبب التفعيل (اختياري)...',
    approveSuccess: 'تمت الموافقة على {name}!',
    rejectSuccess: 'تم رفض {name}.',
    deactivateSuccess: 'تم تعطيل {name}.',
    activateSuccess: 'تم تفعيل {name}.',
    registerSuccess: 'تم إنشاء الحساب بنجاح! يرجى الانتظار للتحقق.',
    registerNotify: 'سيتم إعلامك بمجرد التحقق من حسابك.',
    registerEmail: 'تحقق من بريدك الإلكتروني للحصول على تحديثات التحقق.',
    fetchError: 'فشل في جلب الخياطين',
    approveError: 'فشل في الموافقة على الخياط',
    rejectError: 'فشل في رفض الخياط',
    deactivateError: 'فشل في تعطيل الخياط',
    activateError: 'فشل في تفعيل الخياط',
    registerError: 'فشل في تسجيل الخياط. يرجى المحاولة مرة أخرى.',
    reasonRequired: 'يرجى تقديم سبب {action}',
  }
};

const TailorVerification = () => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedTailorForAction, setSelectedTailorForAction] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [tailors, setTailors] = useState([]);
  const [expandedSpecialties, setExpandedSpecialties] = useState({});
  const [documentPage, setDocumentPage] = useState({});
  const [activeTab, setActiveTab] = useState('all');

  const t = translations[language || 'en'];

  const mapApiResponseToTailor = (apiData) => {
    const specialties = apiData.tailorInfo?.professionalInfo?.specialties?.map(spec =>
      typeof spec === 'object' ? spec.name : spec
    ) || [];

    return {
      id: apiData._id,
      name: apiData.businessName || apiData.tailorInfo?.businessInfo?.businessName,
      email: apiData.email,
      phone: apiData.tailorInfo?.businessInfo?.whatsapp || 'Not provided',
      location: apiData.tailorInfo?.businessInfo?.locations?.join(', ') || 'Not specified',
      specialties: specialties,
      experience: apiData.tailorInfo?.professionalInfo?.experience || 'Not specified',
      documents: [
        ...(apiData.tailorInfo?.documents?.tradeLicense || []).map(doc => ({
          name: t?.documents,
          type: 'image',
          url: doc
        })),
        ...(apiData.tailorInfo?.documents?.emiratesId || []).map(doc => ({
          name: t?.emiratesIdExpiry,
          type: 'image',
          url: doc
        })),
        ...(apiData.tailorInfo?.documents?.certificates || []).map(doc => ({
          name: t?.documents,
          type: 'image',
          url: doc
        })),
        ...(apiData.tailorInfo?.documents?.portfolioImages || []).map(doc => ({
          name: t?.documents,
          type: 'image',
          url: doc
        }))
      ],
      submittedDate: apiData.tailorInfo?.submittedAt || apiData.createdAt,
      status: apiData.tailorInfo?.status?.toLowerCase() || apiData.status?.toLowerCase() || 'pending',
      rejectionReason: apiData.rejectionReason,
      emiratesIdExpiry: apiData.tailorInfo?.emiratesIdExpiry,
      homeMeasurement: apiData.tailorInfo?.services?.homeMeasurement || false,
      rushOrders: apiData.tailorInfo?.services?.rushOrders || false,
      ownerName: apiData.ownerName || apiData.tailorInfo?.businessInfo?.ownerName,
      socialMedia: apiData.tailorInfo?.additionalInfo?.socialMedia || {}
    };
  };

  const fetchTailors = async () => {
    try {
      const res = await TailorApi.getAllTailors();
      const mappedTailors = res.data.data.map(tailor => mapApiResponseToTailor(tailor));
      setTailors(mappedTailors);

      const initialExpandedState = {};
      mappedTailors.forEach(tailor => {
        initialExpandedState[tailor.id] = false;
      });
      setExpandedSpecialties(initialExpandedState);

      const initialDocPageState = {};
      mappedTailors.forEach(tailor => {
        initialDocPageState[tailor.id] = 1;
      });
      setDocumentPage(initialDocPageState);
    } catch (error) {
      console.error("Error fetching tailors:", error);
      toast.error(t?.fetchError);
    }
  };

  useEffect(() => {
    fetchTailors();
  }, []);

  const handleAddTailor = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTailor = async (formData) => {
    try {
      const res = await AuthApi.register(formData);
      handleCloseModal();
      toast.success(t?.registerSuccess);
      toast.info(t?.registerNotify);
      toast.info(t?.registerEmail);
      fetchTailors();
    } catch (error) {
      console.error('Error registering tailor:', error);
      toast.error(t?.registerError);
    }
  };

  const handleViewTailor = (tailor) => {
    setSelectedTailor(tailor);
    setIsViewModalOpen(true);
  };

  const handleApproveTailor = async (tailor) => {
    const payload = {
      userId: tailor?.id,
      action: "approve",
    }
    try {
      await TailorApi.tailorStatus(payload);
      toast.success(t?.approveSuccess.replace('{name}', tailor.name));
      fetchTailors();
    } catch (error) {
      console.error('Error approving tailor:', error);
      toast.error(t?.approveError);
    } 
  };

  const handleActivateTailor = async (tailor) => {
    try {
      await TailorApi.tailorStatus({
        userId: tailor.id,
        action: 'activate'
      });
      toast.success(t?.activateSuccess.replace('{name}', tailor.name));
      fetchTailors();
    } catch (error) {
      console.error('Error activating tailor:', error);
      toast.error(t?.activateError);
    }
  };

  const handleOpenActionModal = async (tailor, action) => {
    setSelectedTailorForAction(tailor);
    setActionType(action);
    setActionReason('');
    setIsActionModalOpen(true);
  };

  const handleSubmitAction = async () => {
    if (!actionReason.trim() && actionType !== 'activate') {
      toast.error(t?.reasonRequired.replace('{action}', actionType === 'deactivate' ? t?.deactivateTailor.toLowerCase() : t?.rejectTailor.toLowerCase()));
      return;
    }
    try {
      await TailorApi.tailorStatus({
        userId: selectedTailorForAction.id,
        action: actionType,
        reason: actionReason
      });

      let successMessage = '';
      if (actionType === 'deactivate') {
        successMessage = t?.deactivateSuccess.replace('{name}', selectedTailorForAction.name);
      } else if (actionType === 'reject') {
        successMessage = t?.rejectSuccess.replace('{name}', selectedTailorForAction.name);
      } else if (actionType === 'activate') {
        successMessage = t?.activateSuccess.replace('{name}', selectedTailorForAction.name);
      }

      toast.success(successMessage);
      setIsActionModalOpen(false);
      fetchTailors();
    } catch (error) {
      console.error(`Error ${actionType} tailor:`, error);
      let errorMessage = '';
      if (actionType === 'deactivate') {
        errorMessage = t?.deactivateError;
      } else if (actionType === 'reject') {
        errorMessage = t?.rejectError;
      } else if (actionType === 'activate') {
        errorMessage = t?.activateError;
      }
      toast.error(errorMessage);
    }
  };

  const toggleSpecialties = (tailorId) => {
    setExpandedSpecialties(prev => ({
      ...prev,
      [tailorId]: !prev[tailorId]
    }));
  };

  const loadMoreDocuments = (tailorId) => {
    setDocumentPage(prev => ({
      ...prev,
      [tailorId]: (prev[tailorId] || 1) + 1
    }));
  };

  const loadLessDocuments = (tailorId) => {
    setDocumentPage(prev => ({
      ...prev,
      [tailorId]: 1
    }));
  };

  const stats = {
    pending: tailors.filter(t => t?.status === 'pending').length,
    approved: tailors.filter(t => t?.status === 'approved').length,
    rejected: tailors.filter(t => t?.status === 'rejected').length,
    deactivated: tailors.filter(t => t?.status === 'deactivated').length
  };

  // Filter tailors based on active tab
  const filteredTailors = tailors.filter(tailor => {
    if (activeTab === 'all') return true;
    // if (activeTab === 'active') return tailor.status === 'activated';
    if (activeTab === 'deactivated') return tailor.status === 'deactivated';
    return true;
  });

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      deactivated: 'bg-red-200 text-red-900'
    };
    const statusText = {
      pending: t?.pendingReview,
      approved: t?.approved,
      rejected: t?.rejected,
      deactivated: t?.deactivated
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  const SpecialtiesDisplay = ({ specialties, tailorId }) => {
    const isExpanded = expandedSpecialties[tailorId];
    const displaySpecialties = isExpanded ? specialties : specialties.slice(0, 2);
    const hasMore = specialties.length > 2;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap gap-1">
          {displaySpecialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
        {hasMore && (
          <button
            onClick={() => toggleSpecialties(tailorId)}
            className="flex items-center text-xs text-blue-600 mt-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3 mr-1" />
                {t?.showLess}
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-1" />
                {t?.moreSpecialties.replace('{count}', specialties.length - 2)}
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  const DocumentsDisplay = ({ documents, tailorId }) => {
    const currentPage = documentPage[tailorId] || 1;
    const docsPerPage = 2;
    const startIndex = 0;
    const endIndex = currentPage * docsPerPage;
    const displayedDocs = documents.slice(startIndex, endIndex);
    const hasMore = documents.length > endIndex;
    const isExpanded = currentPage > 1;

    return (
      <div className="flex flex-col gap-2">
        <DocumentPreview documents={displayedDocs} />
        {(hasMore || isExpanded) && (
          <div className="flex gap-2">
            {hasMore && (
              <button
                onClick={() => loadMoreDocuments(tailorId)}
                className="text-xs text-blue-600 mt-1 self-start"
              >
                {t?.moreDocuments.replace('{count}', documents.length - displayedDocs.length)}
              </button>
            )}
            {isExpanded && (
              <button
                onClick={() => loadLessDocuments(tailorId)}
                className="text-xs text-blue-600 mt-1 self-start"
              >
                {t?.showLess}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const tailorVerificationColumn = [
    {
      id: 'sno',
      header: t?.sNo,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'name',
      header: t?.businessName,
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.name}</div>
          <div className="text-sm text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: t?.contact,
      cell: ({ row }) => (
        <div>
          <div className="text-sm text-gray-900">{row.original.phone}</div>
          <div className="text-sm text-gray-500">{row.original.location}</div>
        </div>
      ),
    },
    {
      accessorKey: 'specialties',
      header: t?.specialties,
      cell: ({ row }) => (
        <SpecialtiesDisplay
          specialties={row.original.specialties}
          tailorId={row.original.id}
        />
      ),
    },
    {
      accessorKey: 'experience',
      header: t?.experience,
      cell: ({ row }) => {
        return <span>{row.original.experience} years</span>;
      },
    },
    {
      accessorKey: 'documents',
      header: t?.documents,
      cell: ({ row }) => (
        <DocumentsDisplay
          documents={row.original.documents}
          tailorId={row.original.id}
        />
      ),
    },
    {
      accessorKey: 'emiratesIdExpiry',
      header: t?.emiratesIdExpiry,
      cell: ({ row }) => {
        const expiry = row.original.emiratesIdExpiry;
        if (!expiry) return t?.notProvided;
        const expiryDate = new Date(expiry);
        const isExpired = expiryDate < new Date();
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${isExpired ? 'bg-red-100 text-red-800' : ''}`}>
            {expiryDate.toLocaleDateString(language === 'ae' ? 'ar-AE' : 'en-US')}
            {isExpired && t?.expired}
          </span>
        );
      },
    },
    {
      accessorKey: 'submittedDate',
      header: t?.submitted,
      cell: ({ row }) => new Date(row.original.submittedDate).toLocaleDateString(language === 'ae' ? 'ar-AE' : 'en-US'),
    },
    {
      accessorKey: 'status',
      header: t?.status,
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'actions',
      header: t?.actions,
      cell: ({ row }) => {
        const tailor = row.original;
        return (
          <ActionDropdown
            tailor={tailor}
            onApprove={tailor.status === 'pending' ? handleApproveTailor : null}
            onReject={tailor.status === 'pending' ? () => handleOpenActionModal(tailor, 'reject') : null}
            onDeactivate={tailor.status === 'approved' ? () => handleOpenActionModal(tailor, 'deactivate') : null}
            onActivate={tailor.status === 'deactivated' ? () => handleOpenActionModal(tailor, 'activate') : null}
            onView={handleViewTailor}
          />
        );
      },
    },
  ];

  return (
    <div className={`p-6 space-y-6 ${language === 'ae' ? 'dir-rtl' : 'dir-ltr'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t?.title}</h1>
          <p className="text-gray-600 mt-1 capitalize">{t?.subtitle}</p>
        </div>
        <button
          onClick={handleAddTailor}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>{t?.addTailor}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t?.pendingReview}</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t?.approved}</p>
              <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t?.rejected}</p>
              <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-100">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t?.deactivated}</p>
              <p className="text-3xl font-bold text-gray-900">{stats.deactivated}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-200">
              <XCircle className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            {t?.allTailors}
          </button>
          {/* <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('active')}
          >
            {t?.activeTailors}
          </button> */}
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'deactivated' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('deactivated')}
          >
            {t?.deactivatedTailors}
          </button>
        </div>
        <div className="p-6">
          <TableAlpha
            data={filteredTailors}
            columnsConfig={tailorVerificationColumn}
            showStatusFilter={true}
            showLocationFilter={true}
            itemsName={activeTab === 'all' ? t?.allTailors.toLowerCase() :
              activeTab === 'active' ? t?.activeTailors.toLowerCase() :
                t?.deactivatedTailors.toLowerCase()}
          />
        </div>
      </div>

      {/* Add/Register Tailor Modal */}
      <CommonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t?.registerNewTailor}
        size="xl"
        onCancel={handleCloseModal}
        cancelText={t?.cancel}
      >
        <TailorRegistration onSubmit={handleSaveTailor} />
      </CommonModal>

      {/* View Tailor Modal */}
      <CommonModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedTailor?.name || t?.tailorDetails}
        size="lg"
        onSave={() => setIsViewModalOpen(false)}
        saveText={t?.close}
        onCancel={() => setIsViewModalOpen(false)}
        cancelText={t?.cancel}
      >
        {selectedTailor && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.businessName}
                </label>
                <p className="text-gray-900">{selectedTailor.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.ownerName}
                </label>
                <p className="text-gray-900">{selectedTailor.ownerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.email}
                </label>
                <p className="text-gray-900">{selectedTailor.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.phone}
                </label>
                <p className="text-gray-900">{selectedTailor.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.location}
                </label>
                <p className="text-gray-900">{selectedTailor.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.experience}
                </label>
                <p className="text-gray-900">{selectedTailor.experience}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.emiratesIdExpiry}
                </label>
                <p className="text-gray-900">
                  {selectedTailor.emiratesIdExpiry
                    ? new Date(selectedTailor.emiratesIdExpiry).toLocaleDateString(language === 'ae' ? 'ar-AE' : 'en-US')
                    : t?.notProvided}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.status}
                </label>
                <StatusBadge status={selectedTailor.status} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.services}
                </label>
                <div className="flex gap-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${selectedTailor.homeMeasurement ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {t?.homeMeasurement}: {selectedTailor.homeMeasurement ? t?.yes : t?.no}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${selectedTailor.rushOrders ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {t?.rushOrders}: {selectedTailor.rushOrders ? t?.yes : t?.no}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t?.specialties}
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedTailor.specialties?.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
                {selectedTailor.specialties?.length === 0 && (
                  <span className="text-gray-500">{t?.noSpecialties}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t?.documents}
              </label>
              <DocumentsDisplay
                documents={selectedTailor.documents}
                tailorId={selectedTailor.id}
              />
            </div>

            {selectedTailor.rejectionReason && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.rejectionReason}
                </label>
                <p className="text-red-600">{selectedTailor.rejectionReason}</p>
              </div>
            )}
          </div>
        )}
      </CommonModal>

      {/* Reject/Deactivate/Activate Tailor Modal */}
      <CommonModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title={
          actionType === 'deactivate' ? t?.deactivateTailor :
            actionType === 'activate' ? t?.activateTailor :
              t?.rejectTailor
        }
        size="md"
        onSave={handleSubmitAction}
        saveText={
          actionType === 'deactivate' ? t?.deactivateTailor :
            actionType === 'activate' ? t?.activateTailor :
              t?.rejectTailor
        }
        onCancel={() => setIsActionModalOpen(false)}
        cancelText={t?.cancel}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {actionType === 'deactivate'
              ? t?.deactivateReasonPrompt.replace('{name}', selectedTailorForAction?.name)
              : actionType === 'activate'
                ? t?.activateReasonPrompt.replace('{name}', selectedTailorForAction?.name)
                : t?.rejectReasonPrompt.replace('{name}', selectedTailorForAction?.name)}
          </p>
          {(actionType !== 'activate') && (
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              rows="4"
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              placeholder={
                actionType === 'deactivate' ? t?.deactivateReasonPlaceholder :
                  t?.rejectReasonPlaceholder
              }
            />
          )}
          {actionType === 'activate' && (
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              rows="4"
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              placeholder={t?.activateReasonPlaceholder}
              optional={true}
            />
          )}
        </div>
      </CommonModal>
    </div>
  );
};

export default TailorVerification;