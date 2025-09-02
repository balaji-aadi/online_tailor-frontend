import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState, useEffect } from 'react';
import InputField from '../../components/ui/InputField';
import { FileInputField } from '../../components/ui/ImageInputField';
import AuthApi from '../../api/auth.api';
import MasterApi from '../../api/master.api';
import { toast } from 'react-toastify';
import { useLanguage } from '../../components/Layout';
// Arabic translations
export const arabicTranslations = {
    'Create New Account': 'إنشاء حساب جديد',
    'Join the leading tailoring platform in the UAE': 'انضم إلى منصة الخياطة الرائدة في الإمارات',
    'Business Information': 'معلومات العمل',
    'Professional Information': 'المعلومات المهنية',
    'Services Offered': 'الخدمات المقدمة',
    'Documents Upload': 'تحميل المستندات',
    'Social Media & Online Presence': 'وسائل التواصل الاجتماعي والوجود الإلكتروني',
    'Creating Account...': 'جاري إنشاء الحساب...',
    'Create Account': 'إنشاء حساب',
    'Already have an account?': 'هل لديك حساب بالفعل؟',
    'Sign In': 'تسجيل الدخول',
    'Remove': 'إزالة',
    'Emirates ID Expiry Date': 'تاريخ انتهاء الهوية الإماراتية',

    'Business Name': 'اسم العمل',
    'Owner Name': 'اسم المالك',
    'Email': 'البريد الإلكتروني',
    'WhatsApp': 'واتساب',
    'Locations': 'المواقع',
    'Gender Specialization': 'التخصص حسب الجنس',
    'Specialties': 'التخصصات',
    'Experience': 'الخبرة',
    'Working Hours': 'ساعات العمل',
    'Languages': 'اللغات',
    'Business Description': 'وصف العمل',
    'Home Measurement Available': 'قياس المنزل متاح',
    'Rush Orders Accepted': 'يتم قبول الطلبات العاجلة',
    'Trade License': 'رخصة تجارية',
    'Emirates ID': 'الهوية الإماراتية',
    'Certificates': 'الشهادات',
    'Portfolio Images': 'صور Portfolio',
    'Instagram': 'إنستغرام',
    'Facebook': 'فيسبوك',
    'Website': 'موقع الويب',

    // Options
    'Dubai': 'دبي',
    'Abu Dhabi': 'أبو ظبي',
    'Sharjah': 'الشارقة',
    'Ajman': 'عجمان',
    'Ras Al Khaimah': 'رأس الخيمة',
    'Fujairah': 'الفجيرة',
    'Umm Al Quwain': 'أم القيوين',
    'Male': 'ذكر',
    'Female': 'أنثى',
    'Both Male & Female': 'كل من الذكور والإناث',
    'Kandura': 'كندورة',
    'Bisht': 'بشت',
    'Traditional Wear': 'الملابس التقليدية',
    'Formal Wear': 'ملابس رسمية',
    'Casual Alterations': 'تعديلات casual',
    'Wedding Dress': 'فستان زفاف',
    'Suits': 'بدلات',
    'Abayas': 'عبايات',
    'Thobes': 'ثوب',
    'Evening Wear': 'ملابس مسائية',
    'Casual Wear': 'ملابس casual',
    'Uniforms': 'زي موحد',
    '1-2 years': '1-2 سنوات',
    '3-5 years': '3-5 سنوات',
    '6-10 years': '6-10 سنوات',
    '11-15 years': '11-15 سنوات',
    '15+ years': '15+ سنوات',
    'English': 'الإنجليزية',
    'Arabic': 'العربية',
    'Hindi': 'الهندية',
    'Urdu': 'الأردية',
    'Tamil': 'التاميلية',
    'Malayalam': 'المالايالامية',
    'Bengali': 'البنغالية',
    'Punjabi': 'البنجابية',

    // Placeholders
    'Enter business name': 'أدخل اسم العمل',
    'Enter owner name': 'أدخل اسم المالك',
    'Select locations': 'اختر المواقع',
    'Select gender specialization': 'اختر التخصص حسب الجنس',
    'Select specialties': 'اختر التخصصات',
    'Select experience level': 'اختر مستوى الخبرة',
    'e.g., 9 AM - 9 PM': 'مثال: 9 صباحًا - 9 مساءً',
    'Select languages': 'اختر اللغات',
    'Describe your tailoring services and expertise': 'صِف خدمات الخياطة وخبراتك',
    'Instagram profile URL': 'رابط الملف الشخصي على إنستغرام',
    'Facebook page URL': 'رابط الصفحة على الفيسبック',
    'Website URL': 'رابط الموقع الإلكتروني',
    'Select expiry date': 'اختر تاريخ الانتهاء',
};

const TailorRegistrationForm = ({ onSubmit }) => {
    const [isRTL, setIsRTL] = useState(false);
    const [specialty, setSpecialty] = useState([]);
    const [locationStatus, setLocationStatus] = useState('idle');
    const [userCoordinates, setUserCoordinates] = useState(null);
    const { language } = useLanguage();
    const [termsContent, setTermsContent] = useState('');
    const [privacyContent, setPrivacyContent] = useState('');

    const fetchMasterData = async () => {
        try {
            const res = await MasterApi.getSpecialties();
            setSpecialty(res.data?.data);
        } catch (error) {
            console.error("Error fetching master data:", error);
        }
    };

    const fetchTermsPolicies = async () => {
        try {
            const res = await MasterApi.getTermsPolicies({ userType: 'tailor' });
            const data = res.data?.data || [];
            const terms = data.find(item => item.contentType === 'terms') || { content: '' };
            const privacy = data.find(item => item.contentType === 'privacy') || { content: '' };
            setTermsContent(terms.content);
            setPrivacyContent(privacy.content);
        } catch (error) {
            console.error("Error fetching terms and policies:", error);
            toast.error(t('Failed to load terms and policies'));
        }
    };

    useEffect(() => {
        fetchMasterData();
        fetchTermsPolicies();
    }, []);

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error(t('Geolocation is not supported by this browser'));
            return;
        }

        setLocationStatus('fetching');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserCoordinates([longitude, latitude]);
                setLocationStatus('success');
                toast.success(t('Location fetched successfully'));
            },
            (error) => {
                console.error('Error getting location:', error);
                setLocationStatus('error');

                let errorMessage = t('Unable to retrieve your location');
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = t('Location access denied. Please enable location permissions in your browser settings.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = t('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        errorMessage = t('Location request timed out. Please try again.');
                        break;
                }

                toast.error(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    };


    const specialtyOptions = specialty.map((item) => ({
        value: item._id,
        label: item.name
    }));

    useEffect(() => {
        setIsRTL(language === 'ar');
    }, [language]);

    const t = (text) => {
        return language === 'ar' ? arabicTranslations[text] || text : text;
    };

    const locationOptions = [
        { value: 'dubai', label: t('Dubai') },
        { value: 'abu-dhabi', label: t('Abu Dhabi') },
        { value: 'sharjah', label: t('Sharjah') },
        { value: 'ajman', label: t('Ajman') },
        { value: 'ras-al-khaimah', label: t('Ras Al Khaimah') },
        { value: 'fujairah', label: t('Fujairah') },
        { value: 'umm-al-quwain', label: t('Umm Al Quwain') }
    ];

    const genderOptions = [
        { value: 'male', label: t('Male') },
        { value: 'female', label: t('Female') },
        { value: 'both', label: t('Both Male & Female') }
    ];

    const experienceOptions = [
        { value: '1-2', label: t('1-2 years') },
        { value: '3-5', label: t('3-5 years') },
        { value: '6-10', label: t('6-10 years') },
        { value: '11-15', label: t('11-15 years') },
        { value: '15+', label: t('15+ years') }
    ];

    const formik = useFormik({
        initialValues: {
            businessName: '',
            ownerName: '',
            email: '',
            whatsapp: '',
            locations: [],
            gender: '',
            specialties: [],
            experience: '',
            description: '',
            homeMeasurement: false,
            rushOrders: false,
            tradeLicense: [],
            emiratesId: [],
            emiratesIdExpiry: '',
            certificates: [],
            portfolioImages: [],
            socialMedia: {
                instagram: '',
                facebook: '',
                website: ''
            },
            coordinates: {
                type: 'Point',
                coordinates: [0, 0]
            },
            termsPrivacyAgree: false,
        },
        validate: (values) => {
            const errors = {};
            if (!values.businessName) errors.businessName = t('Business name is required');
            if (!values.ownerName) errors.ownerName = t('Owner name is required');
            if (!values.email) errors.email = t('Email is required');
            if (!values.locations.length) errors.locations = t('At least one location is required');
            if (!values.gender) errors.gender = t('Gender preference is required');
            if (!values.specialties.length) errors.specialties = t('At least one Garment type is required');
            if (!values.experience) errors.experience = t('Experience is required');
            if (!values.emiratesIdExpiry) errors.emiratesIdExpiry = t('Emirates ID expiry date is required');
            if (!values.tradeLicense.length) errors.tradeLicense = t('Trade License is required');
            if (!values.emiratesId.length) errors.emiratesId = t('Emirates ID is required');
            if (!values.termsPrivacyAgree) errors.termsPrivacyAgree = t('You must agree to the terms and policies');

            return errors;
        },
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("user_role", 2);

                if (userCoordinates) {
                    values.coordinates = {
                        type: "Point",
                        coordinates: userCoordinates,
                    };
                }
                Object.keys(values).forEach((key) => {
                    if (
                        key !== "tradeLicense" &&
                        key !== "emiratesId" &&
                        key !== "certificates" &&
                        key !== "portfolioImages" &&
                        key !== "workingHoursStart" &&
                        key !== "workingHoursEnd"
                    ) {
                        if (typeof values[key] === "object" && !Array.isArray(values[key])) {
                            formData.append(key, JSON.stringify(values[key]));
                        } else if (Array.isArray(values[key])) {
                            formData.append(key, JSON.stringify(values[key]));
                        } else {
                            formData.append(key, values[key]);
                        }
                    }
                });

                formData.append("coordinates[type]", "Point");
                formData.append("coordinates[coordinates][]", String(values.coordinates.coordinates[0]));
                formData.append("coordinates[coordinates][]", String(values.coordinates.coordinates[1]));


                values.tradeLicense.forEach((file) => {
                    formData.append("tradeLicense", file);
                });

                values.emiratesId.forEach((file) => {
                    formData.append("emiratesId", file);
                });

                values.certificates.forEach((file) => {
                    formData.append("certificates", file);
                });

                values.portfolioImages.forEach((file) => {
                    formData.append("portfolioImages", file);
                });


                if (onSubmit) {
                    await onSubmit(formData);
                } else {
                    const res = await AuthApi.register(formData);
                    console.log(res?.data);
                    toast.success(t('Account created successfully! Please wait for verification.'));
                }
            } catch (error) {
                toast.error(t('An error occurred while creating your account'));
            }
        }
    });

    const handleWhatsAppChange = (value) => {
        formik.setFieldValue('whatsapp', value || '');
    };

    return (
        <div
            className={` flex ${isRTL ? "rtl" : "ltr"}`}
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="w-full flex items-center justify-center">
                <div className="w-full space-y-6">
                    {/* Registration Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-none">
                            <CardContent>
                                <form onSubmit={formik.handleSubmit} className="space-y-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg
                                                    className="h-5 w-5 text-blue-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm text-blue-700">
                                                    {t(
                                                        "Important: Your email address will be used for all communications, account approval notifications, and password recovery. Please ensure it is correct."
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <section className="">
                                        {/* Business Information */}
                                        <div className="mt-8">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                {t("Business Information")}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField
                                                    label={t("Business Name")}
                                                    name="businessName"
                                                    type="text"
                                                    value={formik.values.businessName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.businessName &&
                                                        formik.errors.businessName
                                                    }
                                                    isRequired
                                                    placeholder={t("Enter business name")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />

                                                <InputField
                                                    label={t("Owner Name")}
                                                    name="ownerName"
                                                    type="text"
                                                    value={formik.values.ownerName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.ownerName &&
                                                        formik.errors.ownerName
                                                    }
                                                    isRequired
                                                    placeholder={t("Enter owner name")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />
                                                <InputField
                                                    label={t("Email")}
                                                    name="email"
                                                    type="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.email && formik.errors.email}
                                                    isRequired
                                                    placeholder={t("Enter email")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">
                                                        {t("WhatsApp")}
                                                    </label>
                                                    <PhoneInput
                                                        international
                                                        countryCallingCodeEditable={false}
                                                        defaultCountry="AE"
                                                        value={formik.values.whatsapp}
                                                        onChange={handleWhatsAppChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`w-full px-4 py-2 border rounded-lg outline-none border-gray-300 ${isRTL ? "rtl" : "ltr"
                                                            }`}
                                                        style={{
                                                            "--PhoneInputCountryFlag-height": "1em",
                                                            "--PhoneInputCountrySelectArrow-color":
                                                                "#6b7280",
                                                            direction: isRTL ? "rtl" : "ltr",
                                                        }}
                                                    />
                                                </div>

                                                <InputField
                                                    label={t("Locations")}
                                                    name="locations"
                                                    type="select"
                                                    value={formik.values.locations}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    options={locationOptions}
                                                    error={
                                                        formik.touched.locations &&
                                                        formik.errors.locations
                                                    }
                                                    isRequired
                                                    isMulti={true}
                                                    placeholder={t("Select locations")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />

                                                <div className="md:col-span-2">
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            type="button"
                                                            onClick={getCurrentLocation}
                                                            disabled={locationStatus === "fetching"}
                                                            className={`px-4 py-2 rounded-lg border ${locationStatus === "fetching"
                                                                ? "bg-gray-200 cursor-not-allowed"
                                                                : "bg-blue-100 hover:bg-blue-200"
                                                                } transition-colors`}
                                                        >
                                                            {locationStatus === "fetching"
                                                                ? t("Fetching Location...")
                                                                : t("Get My Current Location")}
                                                        </button>

                                                        {locationStatus === "success" &&
                                                            userCoordinates && (
                                                                <div className="text-sm text-green-600">
                                                                    {t("Location found")}:{" "}
                                                                    {userCoordinates[0].toFixed(6)},{" "}
                                                                    {userCoordinates[1].toFixed(6)}
                                                                </div>
                                                            )}

                                                        {locationStatus === "error" && (
                                                            <div className="text-sm text-red-600">
                                                                {t("Failed to get location")}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        {t(
                                                            "This helps customers find your business more easily"
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Professional Information */}
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                {t("Professional Information")}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField
                                                    label={t("Gender Specialization")}
                                                    name="gender"
                                                    type="select"
                                                    value={formik.values.gender}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    options={genderOptions}
                                                    error={
                                                        formik.touched.gender && formik.errors.gender
                                                    }
                                                    isRequired
                                                    placeholder={t("Select gender specialization")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />

                                                <InputField
                                                    label={t("Garment types")}
                                                    name="specialties"
                                                    type="select"
                                                    value={formik.values.specialties}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    options={specialtyOptions}
                                                    error={
                                                        formik.touched.specialties &&
                                                        formik.errors.specialties
                                                    }
                                                    isRequired
                                                    isMulti={true}
                                                    placeholder={t("Select Garment types")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />

                                                <InputField
                                                    label={t("Experience")}
                                                    name="experience"
                                                    type="select"
                                                    value={formik.values.experience}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    options={experienceOptions}
                                                    error={
                                                        formik.touched.experience &&
                                                        formik.errors.experience
                                                    }
                                                    isRequired
                                                    placeholder={t("Select experience level")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />

                                                <InputField
                                                    label={t("Emirates ID Expiry Date")}
                                                    name="emiratesIdExpiry"
                                                    type="date"
                                                    value={formik.values.emiratesIdExpiry}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.emiratesIdExpiry &&
                                                        formik.errors.emiratesIdExpiry
                                                    }
                                                    isRequired
                                                    placeholder={t("Select expiry date")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                    isRTL={isRTL}
                                                />
                                            </div>

                                            <InputField
                                                label={t("Business Description")}
                                                name="description"
                                                type="textarea"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t(
                                                    "Describe your tailoring services and expertise"
                                                )}
                                                dir={isRTL ? "rtl" : "ltr"}
                                            />
                                        </div>

                                        {/* Services Offered */}
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                {t("Services Offered")}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="homeMeasurement"
                                                        name="homeMeasurement"
                                                        checked={formik.values.homeMeasurement}
                                                        onChange={formik.handleChange}
                                                        className={`mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${isRTL ? "ml-2" : "mr-2"
                                                            }`}
                                                    />
                                                    <label
                                                        htmlFor="homeMeasurement"
                                                        className="text-gray-700 font-medium"
                                                    >
                                                        {t("Home Measurement Available")}
                                                    </label>
                                                </div>

                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="rushOrders"
                                                        name="rushOrders"
                                                        checked={formik.values.rushOrders}
                                                        onChange={formik.handleChange}
                                                        className={`mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${isRTL ? "ml-2" : "mr-2"
                                                            }`}
                                                    />
                                                    <label
                                                        htmlFor="rushOrders"
                                                        className="text-gray-700 font-medium"
                                                    >
                                                        {t("Rush Orders Accepted")}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Documents Upload */}
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                {t("Documents Upload")}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FileInputField
                                                    label={t("Trade License")}
                                                    name="tradeLicense"
                                                    value={formik.values.tradeLicense}
                                                    onChange={(files) =>
                                                        formik.setFieldValue("tradeLicense", files)
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.tradeLicense &&
                                                        formik.errors.tradeLicense
                                                    }
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    multiple={true}
                                                    isRTL={isRTL}
                                                    isRequired
                                                />

                                                <FileInputField
                                                    label={t("Emirates ID")}
                                                    name="emiratesId"
                                                    value={formik.values.emiratesId}
                                                    onChange={(files) =>
                                                        formik.setFieldValue("emiratesId", files)
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.emiratesId &&
                                                        formik.errors.emiratesId
                                                    }
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    multiple={true}
                                                    isRTL={isRTL}
                                                    isRequired
                                                />

                                                <FileInputField
                                                    label={t("Certificates")}
                                                    name="certificates"
                                                    value={formik.values.certificates}
                                                    onChange={(files) =>
                                                        formik.setFieldValue("certificates", files)
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    multiple={true}
                                                    isRTL={isRTL}
                                                />

                                                <FileInputField
                                                    label={t("Portfolio Images")}
                                                    name="portfolioImages"
                                                    value={formik.values.portfolioImages}
                                                    onChange={(files) =>
                                                        formik.setFieldValue("portfolioImages", files)
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    accept=".jpg,.jpeg,.png"
                                                    multiple={true}
                                                    isRTL={isRTL}
                                                />
                                            </div>
                                        </div>

                                        {/* Social Media */}
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                {t("Social Media & Online Presence")}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <InputField
                                                    label={t("Instagram")}
                                                    name="socialMedia.instagram"
                                                    type="url"
                                                    value={formik.values.socialMedia.instagram}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder={t("Instagram profile URL")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />

                                                <InputField
                                                    label={t("Facebook")}
                                                    name="socialMedia.facebook"
                                                    type="url"
                                                    value={formik.values.socialMedia.facebook}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder={t("Facebook page URL")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />

                                                <InputField
                                                    label={t("Website")}
                                                    name="socialMedia.website"
                                                    type="url"
                                                    value={formik.values.socialMedia.website}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder={t("Website URL")}
                                                    dir={isRTL ? "rtl" : "ltr"}
                                                />
                                            </div>
                                        </div>

                                        {/* Terms and Policies Agreement */}
                                        <div className="mt-6">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="termsPrivacyAgree"
                                                    name="termsPrivacyAgree"
                                                    checked={formik.values.termsPrivacyAgree}
                                                    onChange={(e) => formik.setFieldValue('termsPrivacyAgree', e.target.checked)}
                                                    onBlur={formik.handleBlur}
                                                    className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${isRTL ? 'ml-2' : 'mr-2'}`}
                                                />
                                                <label htmlFor="termsPrivacyAgree" className="text-sm text-gray-700">
                                                    {t('I agree to the')}{' '}
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <button type="button" className="text-primary hover:underline font-medium">
                                                                {t('Terms of Service')}
                                                            </button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white shadow-2xl rounded-xl p-6">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-2xl font-semibold text-gray-800">{t('Terms of Service')}</DialogTitle>
                                                            </DialogHeader>
                                                            <div
                                                                className="py-4 text-gray-600 prose prose-sm max-w-none"
                                                                dangerouslySetInnerHTML={{ __html: termsContent || 'Loading terms...' }}
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                    {' '}{t('and')}{' '}
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <button type="button" className="text-primary hover:underline font-medium">
                                                                {t('Privacy Policy')}
                                                            </button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white shadow-2xl rounded-xl p-6">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-2xl font-semibold text-gray-800">{t('Privacy Policy')}</DialogTitle>
                                                            </DialogHeader>
                                                            <div
                                                                className="py-4 text-gray-600 prose prose-sm max-w-none"
                                                                dangerouslySetInnerHTML={{ __html: privacyContent || 'Loading privacy policy...' }}
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                </label>
                                            </div>
                                            {formik.touched.termsPrivacyAgree && formik.errors.termsPrivacyAgree && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.termsPrivacyAgree}</p>
                                            )}
                                        </div>


                                    </section>
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                                            disabled={formik.isSubmitting}
                                        >
                                            {t("Create Account")}
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TailorRegistrationForm;