import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdOutlineDeleteOutline,
    MdOutlineContentCopy,
    MdDiscount,
    MdEventAvailable,
    MdEventBusy,
    MdAttachMoney,
    MdPercent,
    MdAutorenew,
} from 'react-icons/md';
import { FaRegEdit, FaPlus, FaTimes, FaCamera } from 'react-icons/fa';
import InputField from '../../components/ui/InputField';
import AEDPrice from '../../components/ui/AEDPrize';
import DeleteModal from '../../components/ui/DeleteModal';
import { toast } from 'react-toastify';
import CommonModal from '../../components/ui/commonModal';
import { PromoCodeApi } from '../../api/Promocode.api';
import { useLanguage } from '../../components/Layout';
import TailorServiceApi from '../../api/tailor.service.api';
import MasterApi from '../../api/master.api';
import AlphaButton from '../../components/ui/AlphaButton';

const translations = {
    en: {
        title: 'Promo Code Management',
        addPromoCode: 'Add Promo Code',
        editPromoCode: 'Edit Promo Code',
        createPromoCode: 'Create New Promo Code',
        updatePromoCode: 'Update Promo Code',
        promoCode: 'Promo Code',
        enterPromoCode: 'Enter promo code',
        service: 'Service',
        selectService: 'Select Service',
        subService: 'Sub-Service',
        selectSubService: 'Select Sub-Service',
        discountType: 'Discount Type',
        discountValue: 'Discount Value',
        minOrderAmount: 'Minimum Order Amount',
        startDate: 'Start Date',
        endDate: 'End Date',
        maxUses: 'Maximum Uses',
        description: 'Description',
        onlyForNewUsers: 'Only For New Users',
        isActive: 'Is Active',
        active: 'Active',
        inactive: 'Inactive',
        percentage: 'Percentage',
        fixedAmount: 'Fixed Amount',
        deleteConfirm: 'Are you sure you want to delete this promo code?',
        createdSuccess: 'Promo code created successfully',
        updatedSuccess: 'Promo code updated successfully',
        deletedSuccess: 'Promo code deleted successfully',
        codeRequired: 'Promo code is required',
        codeMin: 'Promo code must be at least 4 characters',
        codeMax: 'Promo code cannot exceed 20 characters',
        discountTypeRequired: 'Discount type is required',
        discountValueRequired: 'Discount value is required',
        minOrderRequired: 'Minimum order is required',
        startDateRequired: 'Start date is required',
        endDateRequired: 'End date is required',
        maxUsesRequired: 'Max uses is required',
        descriptionRequired: 'Description is required',
        serviceRequired: 'Service is required',
        subServiceRequired: 'Sub-service is required',
        noPromoCodes: 'No promo codes yet',
        createFirstPromo: 'Create your first promo code to attract more customers',
        copyCode: 'Copy Code',
        copiedSuccess: 'Copied successfully',
        saving: 'Saving...',
        cancel: 'Cancel',
        allServices: 'All Services',
        allSubServices: 'All Sub-Services'
    },
    ar: {
        title: 'إدارة أكواد الخصم',
        addPromoCode: 'إضافة كود خصم',
        editPromoCode: 'تعديل كود الخصم',
        createPromoCode: 'إنشاء كود خصم جديد',
        updatePromoCode: 'تحديث كود الخصم',
        promoCode: 'كود الخصم',
        enterPromoCode: 'أدخل كود الخصم',
        service: 'الخدمة',
        selectService: 'اختر الخدمة',
        subService: 'الخدمة الفرعية',
        selectSubService: 'اختر الخدمة الفرعية',
        discountType: 'نوع الخصم',
        discountValue: 'قيمة الخصم',
        minOrderAmount: 'الحد الأدنى للطلب',
        startDate: 'تاريخ البدء',
        endDate: 'تاريخ الانتهاء',
        maxUses: 'الحد الأقصى للاستخدام',
        description: 'الوصف',
        onlyForNewUsers: 'للمستخدمين الجدد فقط',
        isActive: 'نشط',
        active: 'نشط',
        inactive: 'غير نشط',
        percentage: 'نسبة مئوية',
        fixedAmount: 'مبلغ ثابت',
        deleteConfirm: 'هل أنت متأكد أنك تريد حذف كود الخصم هذا؟',
        createdSuccess: 'تم إنشاء كود الخصم بنجاح',
        updatedSuccess: 'تم تحديث كود الخصم بنجاح',
        deletedSuccess: 'تم حذف كود الخصم بنجاح',
        codeRequired: 'كود الخصم مطلوب',
        codeMin: 'يجب أن يكون كود الخصم 4 أحرف على الأقل',
        codeMax: 'لا يمكن أن يتجاوز كود الخصم 20 حرفًا',
        discountTypeRequired: 'نوع الخصم مطلوب',
        discountValueRequired: 'قيمة الخصم مطلوبة',
        minOrderRequired: 'الحد الأدنى للطلب مطلوب',
        startDateRequired: 'تاريخ البدء مطلوب',
        endDateRequired: 'تاريخ الانتهاء مطلوب',
        maxUsesRequired: 'الحد الأقصى للاستخدام مطلوب',
        descriptionRequired: 'الوصف مطلوب',
        serviceRequired: 'الخدمة مطلوبة',
        subServiceRequired: 'الخدمة الفرعية مطلوبة',
        noPromoCodes: 'لا توجد أكواد خصم بعد',
        createFirstPromo: 'أنشئ أول كود خصم لجذب المزيد من العملاء',
        copyCode: 'نسخ الكود',
        copiedSuccess: 'تم النسخ بنجاح',
        saving: 'جاري الحفظ...',
        cancel: 'إلغاء',
        allServices: 'جميع الخدمات',
        allSubServices: 'جميع الخدمات الفرعية'
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
    hover: { scale: 1.02 },
};

const PromoCodeManagement = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [promoCodes, setPromoCodes] = useState([]);
    const [generatedCode, setGeneratedCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [subServices, setSubServices] = useState([]);
    const { language } = useLanguage();

    const t = translations[language || 'en'];
    const formatDate = (isoString) => isoString?.split('T')[0];

    const fetchPromoCodes = async () => {
        try {
            const res = await PromoCodeApi.getAllPromoCodes();
            setPromoCodes(res.data?.data || []);
        } catch (err) {
            console.error('Error fetching promo codes:', err);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await MasterApi.getCategories();
            setServices(res.data?.data || []);
        } catch (err) {
            console.error('Error fetching services:', err);
        }
    };

    const fetchSubServices = async (serviceIds) => {
        if (!serviceIds || serviceIds.length === 0) {
            setSubServices([]);
            return;
        }

        try {
            // Fetch sub-services for all selected services
            const subServicesPromises = serviceIds.map(serviceId =>
                TailorServiceApi.getAllServices({ "serviceType": serviceId })
            );

            const results = await Promise.all(subServicesPromises);
            const allSubServices = results.flatMap(result => result.data?.data || []);

            // Remove duplicates by ID
            const uniqueSubServices = allSubServices.filter((subService, index, self) =>
                index === self.findIndex(s => s._id === subService._id)
            );

            setSubServices(uniqueSubServices);
        } catch (err) {
            console.error('Error fetching sub-services:', err);
            setSubServices([]);
        }
    };

    const validationSchema = Yup.object({
        code: Yup.string()
            .required(t.codeRequired)
            .min(4, t.codeMin)
            .max(20, t.codeMax),
        service: Yup.array()
            .min(1, t.serviceRequired)
            .required(t.serviceRequired),
        discountType: Yup.string()
            .oneOf(['Percentage', 'Fixed_Amount'], 'Invalid discount type')
            .required(t.discountTypeRequired),
        discountValue: Yup.number()
            .typeError('Discount must be a number')
            .required(t.discountValueRequired)
            .min(0, 'Discount cannot be less than 0%')
            .max(100, 'Discount cannot exceed 100%'),
        minOrderAmount: Yup.number()
            .min(0, 'Minimum order cannot be negative')
            .required(t.minOrderRequired),
        startDate: Yup.date()
            .required(t.startDateRequired)
            .min(new Date(), 'Start date cannot be in the past'),
        endDate: Yup.date()
            .required(t.endDateRequired)
            .min(Yup.ref('startDate'), 'End date must be after start date'),
        maxUses: Yup.number()
            .min(1, 'Must allow at least 1 use')
            .required(t.maxUsesRequired),
        description: Yup.string()
            .required(t.descriptionRequired),
    });

    const formik = useFormik({
        initialValues: {
            code: selectedPromo?.code || generatedCode,
            service: selectedPromo?.service ? (Array.isArray(selectedPromo.service) ? selectedPromo.service : [selectedPromo.service]) : [],
            subService: selectedPromo?.subService ? (Array.isArray(selectedPromo.subService) ? selectedPromo.subService : [selectedPromo.subService]) : [],
            discountType: selectedPromo?.discountType || '',
            discountValue: selectedPromo?.discountValue?.$numberDecimal || '',
            minOrderAmount: selectedPromo?.minOrderAmount?.$numberDecimal || '',
            startDate: selectedPromo?.startDate || '',
            endDate: selectedPromo?.endDate || '',
            maxUses: selectedPromo?.maxUses?.$numberDecimal || '',
            description: selectedPromo?.description || '',
            isActive: selectedPromo?.isActive ?? true,
            onlyForNewUsers: selectedPromo?.onlyForNewUsers || false,
            image: selectedPromo?.image || '',
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const formData = new FormData();

                // Append all fields
                formData.append('code', values.code);

                // Append services and subservices as arrays
                values.service.forEach(serviceId => {
                    formData.append('service', serviceId);
                });

                values.subService.forEach(subServiceId => {
                    formData.append('subService', subServiceId);
                });

                formData.append('discountType', values.discountType);
                formData.append('discountValue', values.discountValue);
                formData.append('minOrderAmount', values.minOrderAmount);
                formData.append('startDate', new Date(values.startDate).toISOString());
                formData.append('endDate', new Date(values.endDate).toISOString());
                formData.append('maxUses', values.maxUses);
                formData.append('description', values.description);
                formData.append('isActive', values.isActive);
                formData.append('onlyForNewUsers', values.onlyForNewUsers);

                // Check if image is a File or Blob
                if (values.image instanceof Blob) {
                    formData.append('image', values.image);
                }

                let res;
                if (selectedPromo) {
                    res = await PromoCodeApi.updatePromoCode(selectedPromo._id, formData);
                    toast.success(t.updatedSuccess);
                } else {
                    res = await PromoCodeApi.createPromoCode(formData);
                    toast.success(t.createdSuccess);
                }

                fetchPromoCodes();
                setOpenSidebar(false);
                setSelectedPromo(null);
            } catch (err) {
                console.error('Error saving promo code:', err);
                toast.error(err.response?.data?.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        },
    });

    const removeImage = () => {
        setImagePreview(null);
        formik.setFieldValue('image', null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.match('image.*')) {
                formik.setFieldError('image', 'Please select an image file');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                formik.setFieldError('image', 'Image must be less than 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            formik.setFieldValue('image', file);
            formik.setFieldError('image', undefined);
        }
    };

    useEffect(() => {
        setImagePreview(selectedPromo?.image);
    }, [selectedPromo]);

    useEffect(() => {
        fetchPromoCodes();
        fetchServices();
    }, []);

    useEffect(() => {
        if (formik.values.service && formik.values.service.length > 0) {
            fetchSubServices(formik.values.service);
        } else {
            setSubServices([]);
        }
    }, [formik.values.service]);

    const handleDelete = async () => {
        if (!deleteModal) return;
        try {
            await PromoCodeApi.deletePromoCode(deleteModal._id);
            fetchPromoCodes();
            setDeleteModal(false);
            toast.success(t.deletedSuccess);
        } catch (err) {
            console.error('Error deleting promo code:', err);
            toast.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success(t.copiedSuccess);
    };

    const generateRandomPromoCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const numPositions = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5 + 5)].slice(
            0,
            2
        );

        for (let i = 0; i < 10; i++) {
            if (numPositions.includes(i)) {
                result += '0123456789'[Math.floor(Math.random() * 10)];
            } else {
                const randomChar = chars[Math.floor(Math.random() * 52)];
                result += randomChar;
            }
        }

        return result;
    };

    useEffect(() => {
        setGeneratedCode(generateRandomPromoCode());
    }, []);

    const handleGenerateNewCode = () => {
        setGeneratedCode(generateRandomPromoCode());
        formik.setFieldValue('code', generateRandomPromoCode());
    };

    const getStatusBadge = (isActive, startDate, endDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (!isActive) return language === 'ar' ? 'غير نشط' : 'Inactive';
        if (now < start) return language === 'ar' ? 'قادم' : 'Upcoming';
        if (now > end) return language === 'ar' ? 'منتهي' : 'Expired';
        return language === 'ar' ? 'نشط' : 'Active';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
            case 'نشط':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
            case 'غير نشط':
                return 'bg-gray-100 text-gray-800';
            case 'Upcoming':
            case 'قادم':
                return 'bg-blue-100 text-blue-800';
            case 'Expired':
            case 'منتهي':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper function to get service/subservice names for display
    const getNamesForDisplay = (ids, allItems) => {
        if (!ids || !allItems) return [];

        return ids.map(id => {
            const item = allItems.find(item => item._id === id);
            return item ? (item.serviceName || item.name) : id;
        });
    };

    return (
        <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className="max-w-7xl mx-auto">
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>{t.title}</h1>
                    <AlphaButton
                        text={t.addPromoCode}
                        icon={<FaPlus className='mr-2' />}
                        onClick={() => {
                            setSelectedPromo(null);
                            setOpenSidebar(true);
                        }}
                        className='px-6 py-3'
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <AnimatePresence>
                        {promoCodes?.map((promo) => {
                            const serviceNames = getNamesForDisplay(
                                Array.isArray(promo.service) ? promo.service : [promo.service],
                                services
                            );
                            const subServiceNames = getNamesForDisplay(
                                Array.isArray(promo.subService) ? promo.subService : [promo.subService],
                                subServices
                            );

                            return (
                                <motion.div
                                    key={promo._id}
                                    variants={cardVariants}
                                    initial='hidden'
                                    animate='visible'
                                    exit='hidden'
                                    whileHover='hover'
                                    className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'
                                >
                                    <div className='p-6'>
                                        <div className='flex justify-between items-start mb-4'>
                                            <div className='flex items-center'>
                                                <div className='bg-indigo-100 p-3 rounded-full mr-4'>
                                                    <MdDiscount className='text-indigo-600 text-2xl' />
                                                </div>
                                                <div>
                                                    <h3 className='text-xl font-bold text-gray-800'>{promo.code}</h3>
                                                    <div
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(getStatusBadge(promo.isActive, promo.startDate, promo.endDate))}`}
                                                    >
                                                        {getStatusBadge(promo.isActive, promo.startDate, promo.endDate)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex space-x-2'>
                                                <button
                                                    onClick={() => copyToClipboard(promo.code)}
                                                    className='text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors'
                                                    title={t.copyCode}
                                                >
                                                    <MdOutlineContentCopy size={20} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedPromo(promo);
                                                        setOpenSidebar(true);
                                                    }}
                                                    className='text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors'
                                                    title={language === 'ar' ? 'تعديل' : 'Edit'}
                                                >
                                                    <FaRegEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteModal(promo)}
                                                    className='text-gray-500 cursor-pointer hover:text-red-600 transition-colors'
                                                    title={language === 'ar' ? 'حذف' : 'Delete'}
                                                >
                                                    <MdOutlineDeleteOutline size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between mb-3'>
                                            <div className='flex items-center'>
                                                {promo.discountType === 'Percentage' ? (
                                                    <MdPercent className='text-green-500 mr-1' size={20} />
                                                ) : (
                                                    <MdAttachMoney className='text-green-500 mr-1' size={20} />
                                                )}
                                                <span className='font-bold text-gray-800'>
                                                    {promo.discountValue?.$numberDecimal}
                                                    {promo.discountType === 'Percentage' ? '%' : ''} off
                                                </span>
                                            </div>
                                            <div className='text-sm text-gray-500'>
                                                {language === 'ar' ? 'الحد الأدنى للطلب: ' : 'Min. order: '}
                                                <AEDPrice value={promo.minOrderAmount?.$numberDecimal} />
                                            </div>
                                        </div>

                                        {serviceNames.length > 0 && (
                                            <div className='text-sm text-gray-500 mb-2'>
                                                {language === 'ar' ? 'الخدمات: ' : 'Services: '}
                                                {serviceNames.join(', ')}
                                            </div>
                                        )}

                                        {subServiceNames.length > 0 && (
                                            <div className='text-sm text-gray-500 mb-2'>
                                                {language === 'ar' ? 'الخدمات الفرعية: ' : 'Sub-Services: '}
                                                {subServiceNames.join(', ')}
                                            </div>
                                        )}

                                        <div className='flex items-center justify-between text-sm text-gray-500 mb-2'>
                                            <div className='flex items-center'>
                                                <MdEventAvailable className='mr-1' size={16} />
                                                <span>{new Date(promo.startDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <MdEventBusy className='mr-1' size={16} />
                                                <span>{new Date(promo.endDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className='mt-4 pt-4 border-t border-gray-100 flex justify-between items-center'>
                                            <div className='text-sm'>
                                                <span className='font-medium'>{language === 'ar' ? 'الاستخدامات: ' : 'Uses: '}</span>
                                                <span className='text-gray-500'>{parseInt(promo.maxUses?.$numberDecimal)}</span>
                                            </div>
                                            {promo.isActive && (
                                                <button
                                                    onClick={() => copyToClipboard(promo.code)}
                                                    className='text-sm cursor-pointer text-indigo-600 hover:text-indigo-800 font-medium'
                                                >
                                                    {t.copyCode}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {promoCodes?.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex flex-col items-center justify-center py-12'
                    >
                        <div className='bg-indigo-100 p-6 rounded-full mb-4'>
                            <MdDiscount className='text-indigo-600 text-4xl' />
                        </div>
                        <h3 className='text-xl font-medium text-gray-800 mb-2'>{t.noPromoCodes}</h3>
                        <p className='text-gray-500 mb-6'>
                            {t.createFirstPromo}
                        </p>
                        <AlphaButton
                            text={t.addPromoCode}
                            icon={<FaPlus className='mr-2' />}
                            onClick={() => setOpenSidebar(true)}
                        />
                    </motion.div>
                )}

                {openSidebar && (
                    <CommonModal
                        isOpen={openSidebar}
                        onClose={() => {
                            setOpenSidebar(false);
                            setSelectedPromo(null);
                        }}
                        title={selectedPromo ? t.editPromoCode : t.createPromoCode}
                        onSave={formik.handleSubmit}
                        onCancel={() => {
                            setOpenSidebar(false);
                            setSelectedPromo(null);
                        }}
                        saveText={selectedPromo ? t.updatePromoCode : t.addPromoCode}
                        cancelText={t.cancel}
                        size="lg"
                        isLoading={isLoading}
                    >
                        <form onSubmit={formik.handleSubmit} className='space-y-4'>
                            <div className='flex flex-col items-center mb-6'>
                                <div className='relative group'>
                                    <div
                                        className={`w-32 mb-3 h-32 rounded-full border-2 ${formik.errors.image ? 'border-red-500' : 'border-gray-300'
                                            } flex items-center justify-center overflow-hidden bg-gray-100 transition-all duration-200 hover:border-primary`}
                                    >
                                        {imagePreview ? (
                                            <>
                                                <img
                                                    src={imagePreview}
                                                    alt='Profile Preview'
                                                    className='w-full h-full object-cover'
                                                />
                                                <button
                                                    type='button'
                                                    onClick={removeImage}
                                                    className='absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                                                >
                                                    <FaTimes className='text-red-500 w-4 h-4' />
                                                </button>
                                            </>
                                        ) : (
                                            <div className='flex flex-col items-center justify-center text-gray-400'>
                                                <FaCamera className='w-8 h-8 mb-2' />
                                                <span className='text-xs'>{language === 'ar' ? 'إضافة صورة' : 'Add Photo'}</span>
                                            </div>
                                        )}
                                    </div>

                                    <label className='mt-4 cursor-pointer'>
                                        <span className='px-4 py-2 bg-primary ml-2 text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 text-sm'>
                                            {imagePreview ? (language === 'ar' ? 'تغيير الصورة' : 'Change Photo') : (language === 'ar' ? 'رفع صورة' : 'Upload Photo')}
                                        </span>
                                        <input
                                            type='file'
                                            name='image'
                                            className='hidden'
                                            accept='image/*'
                                            onChange={handleImageChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </label>
                                </div>

                                {formik.touched.image && formik.errors.image && (
                                    <div className='mt-2 text-sm text-red-600'>{formik.errors.image}</div>
                                )}
                            </div>

                            <div className='relative'>
                                <InputField
                                    name='code'
                                    label={t.promoCode}
                                    placeholder={t.enterPromoCode}
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.code && formik.errors.code}
                                    isRequired
                                />
                                {!selectedPromo && (
                                    <button
                                        type='button'
                                        onClick={handleGenerateNewCode}
                                        className='absolute right-3 top-0 cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors'
                                        title={language === 'ar' ? 'إنشاء كود جديد' : 'Generate new code'}
                                    >
                                        <MdAutorenew size={20} />
                                    </button>
                                )}
                                {!selectedPromo && (
                                    <p className='text-xs text-gray-500 mt-1'>
                                        {language === 'ar'
                                            ? 'لقد قمنا بإنشاء كود لك. يمكنك تعديله أو إنشاء كود جديد.'
                                            : "We've generated a code for you. Feel free to edit it or generate a new one."}
                                    </p>
                                )}
                            </div>

                            <div className='grid grid-cols-1 gap-4'>
                                <InputField
                                    name='service'
                                    label={t.service}
                                    type='select'
                                    options={services.map(service => ({
                                        label: service.serviceName || service.name,
                                        value: service._id
                                    }))}
                                    value={formik.values.service}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldValue('subService', []);
                                    }}
                                    error={formik.touched.service && formik.errors.service}
                                    isRequired
                                    placeholder={t.selectService}
                                    isMulti={true}
                                />

                                <InputField
                                    name='subService'
                                    label={t.subService}
                                    type='select'
                                    options={subServices.map(subService => ({
                                        label: subService.serviceName || subService.name,
                                        value: subService._id
                                    }))}
                                    value={formik.values.subService}
                                    onChange={formik.handleChange}
                                    error={formik.touched.subService && formik.errors.subService}
                                    placeholder={t.selectSubService}
                                    isMulti={true}
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <InputField
                                    name='discountType'
                                    label={t.discountType}
                                    type='select'
                                    options={[
                                        { label: t.percentage, value: 'Percentage' },
                                        { label: t.fixedAmount, value: 'Fixed_Amount' }
                                    ]}
                                    value={formik.values.discountType}
                                    onChange={formik.handleChange}
                                    error={formik.touched.discountType && formik.errors.discountType}
                                    isRequired
                                />

                                <InputField
                                    name='discountValue'
                                    label={
                                        formik.values.discountType === 'Percentage'
                                            ? `${t.discountValue} (%)`
                                            : `${t.discountValue} (AED)`
                                    }
                                    type='number'
                                    placeholder={
                                        formik.values.discountType === 'Percentage'
                                            ? 'set discount percentage'
                                            : 'set fixed discount amount'
                                    }
                                    value={formik.values.discountValue}
                                    onChange={formik.handleChange}
                                    error={formik.touched.discountValue && formik.errors.discountValue}
                                    isRequired
                                    icon={
                                        formik.values.discountType === 'Percentage' ? <MdPercent /> : <MdAttachMoney />
                                    }
                                />
                            </div>

                            <InputField
                                name='minOrderAmount'
                                label={t.minOrderAmount}
                                type='number'
                                placeholder='set Minimum Order Amount'
                                value={formik.values.minOrderAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.minOrderAmount && formik.errors.minOrderAmount}
                                isRequired
                                icon={<MdAttachMoney />}
                            />

                            <div className='grid grid-cols-2 gap-4'>
                                <InputField
                                    name='startDate'
                                    label={t.startDate}
                                    type='date'
                                    value={formatDate(formik.values.startDate)}
                                    onChange={formik.handleChange}
                                    error={formik.touched.startDate && formik.errors.startDate}
                                    isRequired
                                />

                                <InputField
                                    name='endDate'
                                    label={t.endDate}
                                    type='date'
                                    value={formatDate(formik.values.endDate)}
                                    onChange={formik.handleChange}
                                    error={formik.touched.endDate && formik.errors.endDate}
                                    isRequired
                                />
                            </div>

                            <InputField
                                name='maxUses'
                                label={t.maxUses}
                                type='number'
                                placeholder='set maximum uses of PROMO CODE'
                                value={formik.values.maxUses}
                                onChange={formik.handleChange}
                                error={formik.touched.maxUses && formik.errors.maxUses}
                                isRequired
                            />

                            <div className="flex items-center justify-between">
                                <label htmlFor='onlyForNewUsers' className="text-sm font-medium text-gray-700">
                                    {t.onlyForNewUsers}
                                </label>
                                <input
                                    id='onlyForNewUsers'
                                    name='onlyForNewUsers'
                                    type='checkbox'
                                    checked={formik.values.onlyForNewUsers}
                                    onChange={formik.handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label htmlFor='isActive' className="text-sm font-medium text-gray-700">
                                    {t.isActive}
                                </label>
                                <input
                                    id='isActive'
                                    name='isActive'
                                    type='checkbox'
                                    checked={formik.values.isActive}
                                    onChange={formik.handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                            </div>

                            <InputField
                                name='description'
                                label={t.description}
                                type='textarea'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && formik.errors.description}
                                isRequired
                            />
                        </form>
                    </CommonModal>
                )}

                {deleteModal && (
                    <DeleteModal
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                        handleDelete={handleDelete}
                        title={t.deleteConfirm}
                        message={`${t.deleteConfirm} "${deleteModal.code}"?`}
                    />
                )}
            </div>
        </div>
    );
};

export default PromoCodeManagement;