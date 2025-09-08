import { useEffect, useState } from 'react';
import { Eye, Users, UserCheck, UserX, Filter } from 'lucide-react';
import TableAlpha from '../../components/ui/TableAlpha';
import CommonModal from '../../components/ui/commonModal';
import AuthApi from '../../api/auth.api';
import { toast } from 'react-toastify';
import { useLanguage } from '../../components/Layout';

const translations = {
  en: {
    title: 'User Management',
    userManagement: 'Manage customers and tailors on your platform',
    totalUsers: 'Total Users',
    activeUsers: 'Active Users',
    inactiveUsers: 'Inactive Users',
    searchUsers: 'Search users...',
    filter: 'Filter',
    allUsers: 'All Users',
    user: 'User',
    type: 'Type',
    status: 'Status',
    location: 'Location',
    joinDate: 'Join Date',
    actions: 'Actions',
    view: 'View',
    viewUser: 'View User Details',
    customer: 'Customer',
    tailor: 'Tailor',
    active: 'Active',
    inactive: 'Inactive',
    businessName: 'Business Name',
    ownerName: 'Owner Name',
    email: 'Email',
    role: 'Role',
    contactNumber: 'Contact Number',
    dob: 'Date of Birth',
    address: 'Address',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    age: 'Age',
    allStatus: 'All Status',
    allRoles: 'All Roles',
    allGenders: 'All Genders',
    allCities: 'All Cities',
    statusFilter: 'Status Filter',
    roleFilter: 'Role Filter',
    genderFilter: 'Gender Filter',
    cityFilter: 'City Filter',
    basicInfo: 'Basic Information',
    tailorInfo: 'Tailor Information',
    specialties: 'Specialties',
    services: 'Services',
    homeMeasurement: 'Home Measurement',
    rushOrders: 'Rush Orders',
    description: 'Description',
    whatsapp: 'WhatsApp',
    experience: 'Experience',
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected'
  },
  ar: {
    title: 'إدارة المستخدمين',
    userManagement: 'إدارة العملاء والخياطين على منصتك',
    totalUsers: 'إجمالي المستخدمين',
    activeUsers: 'المستخدمين النشطين',
    inactiveUsers: 'المستخدمين غير النشطين',
    searchUsers: 'البحث عن المستخدمين...',
    filter: 'تصفية',
    allUsers: 'جميع المستخدمين',
    user: 'المستخدم',
    type: 'النوع',
    status: 'الحالة',
    location: 'الموقع',
    joinDate: 'تاريخ الانضمام',
    actions: 'الإجراءات',
    view: 'عرض',
    viewUser: 'عرض تفاصيل المستخدم',
    customer: 'عميل',
    tailor: 'خياط',
    active: 'نشط',
    inactive: 'غير نشط',
    businessName: 'اسم العمل',
    ownerName: 'اسم المالك',
    email: 'البريد الإلكتروني',
    role: 'الدور',
    contactNumber: 'رقم الاتصال',
    dob: 'تاريخ الميلاد',
    address: 'العنوان',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    age: 'العمر',
    allStatus: 'جميع الحالات',
    allRoles: 'جميع الأدوار',
    allGenders: 'جميع الأجناس',
    allCities: 'جميع المدن',
    statusFilter: 'تصفية حسب الحالة',
    roleFilter: 'تصفية حسب الدور',
    genderFilter: 'تصفية حسب الجنس',
    cityFilter: 'تصفية حسب المدينة',
    basicInfo: 'المعلومات الأساسية',
    tailorInfo: 'معلومات الخياط',
    specialties: 'التخصصات',
    services: 'الخدمات',
    homeMeasurement: 'قياس المنزل',
    rushOrders: 'طلبات عاجلة',
    description: 'الوصف',
    whatsapp: 'واتساب',
    experience: 'الخبرة',
    approved: 'تم الموافقة',
    pending: 'معلق',
    rejected: 'مرفوض'
  }
};

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });
  const { language } = useLanguage();

  const t = translations[language || 'en'];

  const statusOptions = [
    { value: 'all', label: t.allStatus },
    { value: 'active', label: t.active },
    { value: 'inactive', label: t.inactive }
  ];

  const roleOptions = [
    { value: 'all', label: t.allRoles },
    { value: 'customer', label: t.customer },
    { value: 'tailor', label: t.tailor }
  ];

  const genderOptions = [
    { value: 'all', label: t.allGenders },
    { value: 'male', label: t.male },
    { value: 'female', label: t.female }
  ];

  const cityOptions = [
    { value: 'all', label: t.allCities },
    { value: 'Dubai', label: 'Dubai' },
    { value: 'Abu Dhabi', label: 'Abu Dhabi' },
    { value: 'Sharjah', label: 'Sharjah' },
    { value: 'Ajman', label: 'Ajman' },
    { value: 'Al Ain', label: 'Al Ain' }
  ];

  const [filters, setFilters] = useState({
    role: 'customer',
    status: 'all',
    gender: 'all',
    city: 'all',
    search: '',
    page: '1',
    limit: '10',
    sort: 'desc'
  });

  const getAllUsers = async () => {
    try {
      const filterPayload = {
        role: filters.role !== 'all' ? filters.role : undefined,
        status: filters.status !== 'all' ? filters.status : undefined,
        gender: filters.gender !== 'all' ? filters.gender : undefined,
        city: filters.city !== 'all' ? filters.city : undefined,
        search: filters.search || undefined,
        page: filters.page,
        limit: filters.limit,
        sort: filters.sort
      };

      // Remove undefined values from payload
      Object.keys(filterPayload).forEach(key => {
        if (filterPayload[key] === undefined) {
          delete filterPayload[key];
        }
      });

      const res = await AuthApi.getAllCustomers(filterPayload);
      const userData = res.data?.data || [];
      setUsers(userData);

      // Calculate stats
      const total = userData.length;
      const active = userData.filter(user =>
        user.is_active === true || user.status === 'active' || user.status === 'Approved'
      ).length;
      const inactive = userData.filter(user =>
        user.is_active === false || user.status === 'inactive' || user.status === 'Rejected'
      ).length;

      setStats({ total, active, inactive });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
      page: '1' // Reset to first page when filters change
    }));
  };

  const handleSearchChange = (value) => {
    setFilters(prev => ({
      ...prev,
      search: value,
      page: '1'
    }));
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const getStatusBadge = (status, is_active) => {
    // Determine status based on both status field and is_active field
    let statusValue = 'inactive';

    if (is_active !== undefined) {
      statusValue = is_active ? 'active' : 'inactive';
    } else if (status) {
      statusValue = status.toLowerCase();
      if (statusValue === 'approved') statusValue = 'active';
      if (statusValue === 'rejected') statusValue = 'inactive';
    }

    const statusConfig = {
      active: { label: t.active, class: 'bg-green-100 text-green-800' },
      inactive: { label: t.inactive, class: 'bg-red-100 text-red-800' },
      pending: { label: t.pending, class: 'bg-yellow-100 text-yellow-800' }
    };

    const config = statusConfig[statusValue] || statusConfig.inactive;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>{config.label}</span>;
  };

  const getTypeBadge = (user_role) => {
    const roleName = user_role?.name || 'customer';
    const typeConfig = {
      customer: { label: t.customer, class: 'bg-blue-100 text-blue-800' },
      tailor: { label: t.tailor, class: 'bg-purple-100 text-purple-800' }
    };

    const config = typeConfig[roleName] || typeConfig.customer;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>{config.label}</span>;
  };

  const columnsConfig = [
    {
      header: t.user,
      accessorKey: 'name',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.name || row.original.businessName || row.original.ownerName || row.original.email}
          </div>
          <div className="text-sm text-gray-500">{row.original.email}</div>
        </div>
      )
    },
    {
      header: t.type,
      accessorKey: 'user_role',
      cell: ({ row }) => getTypeBadge(row.original.user_role)
    },
    {
      header: t.status,
      accessorKey: 'status',
      cell: ({ row }) => getStatusBadge(row.original.status, row.original.is_active)
    },
    {
      header: t.location,
      accessorKey: 'city',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.city?.name || row.original.city || 'N/A'}
        </span>
      )
    },
    {
      header: t.joinDate,
      accessorKey: 'createdAt',
      cell: ({ row }) => (
        <span className="text-sm">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      header: t.actions,
      accessorKey: 'actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(row.original)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-gray-600 mt-1">{t.userManagement}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.totalUsers}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.activeUsers}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.inactiveUsers}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-100">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table with Custom Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.roleFilter}</label>
              <select
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm cursor-pointer outline-none"
              >
                {roleOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.statusFilter}</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm cursor-pointer outline-none"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.genderFilter}</label>
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm cursor-pointer outline-none"
              >
                {genderOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.cityFilter}</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm cursor-pointer outline-none"
              >
                {cityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TableAlpha
            data={users}
            columnsConfig={columnsConfig}
            itemsName={t.allUsers}
            showStatusFilter={false}
            showLocationFilter={false}
          />
        </div>

        {/* View User Modal */}
        <CommonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
          title={t.viewUser}
          size="lg"
        >
          {selectedUser && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t.basicInfo}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><span className="font-medium">Name:</span> {selectedUser.name || 'N/A'}</p>
                    <p><span className="font-medium">{t.email}:</span> {selectedUser.email}</p>
                    <p><span className="font-medium">{t.contactNumber}:</span> {selectedUser.contactNumber || 'N/A'}</p>
                    <p><span className="font-medium">{t.role}:</span> {getTypeBadge(selectedUser.user_role)}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">{t.status}:</span> {getStatusBadge(selectedUser.status, selectedUser.is_active)}</p>
                    <p><span className="font-medium">{t.gender}:</span> {selectedUser.gender === 'male' ? t.male : t.female}</p>
                    <p><span className="font-medium">{t.age}:</span> {selectedUser.age || 'N/A'}</p>
                    <p><span className="font-medium">{t.joinDate}:</span> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Address Info */}
              {selectedUser.address && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t.address}</h3>
                  <p className="text-gray-700">{selectedUser.address}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedUser.city?.name || selectedUser.city || 'N/A'}
                  </p>
                </div>
              )}

              {/* Tailor Specific Info */}
              {selectedUser.user_role?.name === 'tailor' && selectedUser.tailorInfo && (
                <>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{t.tailorInfo}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p><span className="font-medium">{t.businessName}:</span> {selectedUser.tailorInfo.businessInfo?.businessName || 'N/A'}</p>
                        <p><span className="font-medium">{t.ownerName}:</span> {selectedUser.tailorInfo.businessInfo?.ownerName || 'N/A'}</p>
                        <p><span className="font-medium">{t.whatsapp}:</span> {selectedUser.tailorInfo.businessInfo?.whatsapp || 'N/A'}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">{t.experience}:</span> {selectedUser.tailorInfo.professionalInfo?.experience || 'N/A'}</p>
                        <p><span className="font-medium">{t.gender}:</span> {selectedUser.tailorInfo.professionalInfo?.gender === 'male' ? t.male : t.female}</p>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  {selectedUser.tailorInfo.professionalInfo?.specialties && selectedUser.tailorInfo.professionalInfo.specialties.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t.specialties}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.tailorInfo.professionalInfo.specialties.map(spec => (
                          <span key={spec._id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {spec.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services */}
                  {selectedUser.tailorInfo?.services && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t.services}</h3>
                      <div className="space-y-1">
                        <p><span className="font-medium">{t.homeMeasurement}:</span> {selectedUser.tailorInfo.services.homeMeasurement ? 'Yes' : 'No'}</p>
                        <p><span className="font-medium">{t.rushOrders}:</span> {selectedUser.tailorInfo.services.rushOrders ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedUser.tailorInfo?.professionalInfo?.description && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t.description}</h3>
                      <p className="text-gray-700">{selectedUser.tailorInfo.professionalInfo.description}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </CommonModal>
      </div>
    </div>
  );
};

export default UserManagement;