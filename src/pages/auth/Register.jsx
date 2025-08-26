import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Scissors, Languages } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import logo from '../../../public/Assests/khyate_logo.png';
import { useState, useEffect } from 'react';
import InputField from '../../components/ui/InputField';

// Arabic translations
const arabicTranslations = {
  // UI Elements
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

  // Form Fields
  'Business Name': 'اسم العمل',
  'Owner Name': 'اسم المالك',
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
  'Facebook page URL': 'رابط الصفحة على الفيسبوك',
  'Website URL': 'رابط الموقع الإلكتروني',
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  // Update RTL state when language changes
  useEffect(() => {
    setIsRTL(language === 'ar');
  }, [language]);

  // Helper function to translate text
  const t = (text) => {
    return language === 'ar' ? arabicTranslations[text] || text : text;
  };

  // Options for select fields
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

  const specialtyOptions = [
    { value: 'kandura', label: t('Kandura') },
    { value: 'bisht', label: t('Bisht') },
    { value: 'traditional-wear', label: t('Traditional Wear') },
    { value: 'formal-wear', label: t('Formal Wear') },
    { value: 'casual-alterations', label: t('Casual Alterations') },
    { value: 'wedding-dress', label: t('Wedding Dress') },
    { value: 'suits', label: t('Suits') },
    { value: 'abayas', label: t('Abayas') },
    { value: 'thobes', label: t('Thobes') },
    { value: 'evening-wear', label: t('Evening Wear') },
    { value: 'casual-wear', label: t('Casual Wear') },
    { value: 'uniforms', label: t('Uniforms') }
  ];

  const experienceOptions = [
    { value: '1-2', label: t('1-2 years') },
    { value: '3-5', label: t('3-5 years') },
    { value: '6-10', label: t('6-10 years') },
    { value: '11-15', label: t('11-15 years') },
    { value: '15+', label: t('15+ years') }
  ];

  const languageOptions = [
    { value: 'english', label: t('English') },
    { value: 'arabic', label: t('Arabic') },
    { value: 'hindi', label: t('Hindi') },
    { value: 'urdu', label: t('Urdu') },
    { value: 'tamil', label: t('Tamil') },
    { value: 'malayalam', label: t('Malayalam') },
    { value: 'bengali', label: t('Bengali') },
    { value: 'punjabi', label: t('Punjabi') }
  ];

  // Formik setup
  const formik = useFormik({
    initialValues: {
      // Tailor specific fields
      businessName: '',
      ownerName: '',
      whatsapp: '',
      locations: [],
      gender: '',
      specialties: [],
      experience: '',
      description: '',
      workingHours: '',
      homeMeasurement: false,
      rushOrders: false,
      tradeLicense: null,
      emiratesId: null,
      certificates: null,
      portfolioImages: null,
      socialMedia: {
        instagram: '',
        facebook: '',
        website: ''
      }
    },
    validate: (values) => {
      const errors = {};

      // Common validations
      if (!values.name) errors.name = t('Name is required');
      if (!values.email) errors.email = t('Email is required');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = t('Invalid email format');
      }
      if (!values.password) errors.password = t('Password is required');
      if (values.password !== values.confirmPassword) errors.confirmPassword = t('Passwords do not match');
      if (!values.phone) errors.phone = t('Phone is required');

      // Tailor specific validations
      if (values.userType === 'tailor') {
        if (!values.businessName) errors.businessName = t('Business name is required');
        if (!values.ownerName) errors.ownerName = t('Owner name is required');
        if (!values.locations.length) errors.locations = t('At least one location is required');
        if (!values.gender) errors.gender = t('Gender preference is required');
        if (!values.specialties.length) errors.specialties = t('At least one specialty is required');
        if (!values.experience) errors.experience = t('Experience is required');
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);

      try {
        // Create payload based on user type
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          address: values.address,
          type: values.userType
        };

        // Add tailor-specific fields if user is a tailor
        if (values.userType === 'tailor') {
          payload.businessInfo = {
            businessName: values.businessName,
            ownerName: values.ownerName,
            whatsapp: values.whatsapp,
            locations: values.locations,
            address: values.address
          };

          payload.professionalInfo = {
            gender: values.gender,
            specialties: values.specialties,
            experience: values.experience,
            description: values.description,
            workingHours: values.workingHours
          };

          payload.services = {
            homeMeasurement: values.homeMeasurement,
            rushOrders: values.rushOrders
          };

          payload.documents = {
            tradeLicense: values.tradeLicense,
            emiratesId: values.emiratesId,
            certificates: values.certificates,
            portfolioImages: values.portfolioImages
          };

          payload.additionalInfo = {
            socialMedia: values.socialMedia
          };
        }

        const result = await register(payload);

        if (result.success) {
          toast({
            title: t('Account Created Successfully'),
            description: `${t('Welcome')} ${result.user.name}`,
          });

          // Redirect based on user type
          navigate(values.userType === 'tailor' ? '/tailor' : '/');
        }
      } catch (error) {
        toast({
          title: t('Error'),
          description: t('An error occurred while creating your account'),
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    }
  });

  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (fieldName) => (e) => {
    const file = e.target.files[0];
    formik.setFieldValue(fieldName, file);
  };

  const handlePhoneChange = (value) => {
    formik.setFieldValue('phone', value || '');
  };

  const handleWhatsAppChange = (value) => {
    formik.setFieldValue('whatsapp', value || '');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className={`min-h-screen flex bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 bg-muted"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1591369822096-ffd140ec948a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)',
          }}
        >
          <div className="h-full w-full bg-gradient-to-r from-background/80 to-transparent flex items-center justify-start">
            <div className={`text-left p-16 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-full h-full">
                  <img src={logo} alt="Logo" className="" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-4xl space-y-6">
          {/* Language Toggle */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
          </div>

          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden text-center mb-6"
          >
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Scissors className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Khyate</h1>
            <p className="text-muted-foreground mt-2">{t('Join the leading tailoring platform in the UAE')}</p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border bg-card/95 backdrop-blur shadow-card">
              <CardTitle className="text-center py-4 mb-2 border-b">{t('Create New Account')}</CardTitle>

              <CardContent>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Tailor Specific Fields */}
                  <section className='h-[70vh] overflow-auto pr-4 pl-4'>
                    {/* Business Information */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Business Information')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label={t('Business Name')}
                          name="businessName"
                          type="text"
                          value={formik.values.businessName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.businessName && formik.errors.businessName}
                          isRequired
                          placeholder={t('Enter business name')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Owner Name')}
                          name="ownerName"
                          type="text"
                          value={formik.values.ownerName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.ownerName && formik.errors.ownerName}
                          isRequired
                          placeholder={t('Enter owner name')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('WhatsApp')}</label>
                          <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="AE"
                            value={formik.values.whatsapp}
                            onChange={handleWhatsAppChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg outline-none border-gray-300 ${isRTL ? 'rtl' : 'ltr'}`}
                            style={{
                              '--PhoneInputCountryFlag-height': '1em',
                              '--PhoneInputCountrySelectArrow-color': '#6b7280',
                              direction: isRTL ? 'rtl' : 'ltr'
                            }}
                          />
                        </div>

                        <InputField
                          label={t('Locations')}
                          name="locations"
                          type="select"
                          value={formik.values.locations}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          options={locationOptions}
                          error={formik.touched.locations && formik.errors.locations}
                          isRequired
                          isMulti={true}
                          placeholder={t('Select locations')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Professional Information')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label={t('Gender Specialization')}
                          name="gender"
                          type="select"
                          value={formik.values.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          options={genderOptions}
                          error={formik.touched.gender && formik.errors.gender}
                          isRequired
                          placeholder={t('Select gender specialization')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Specialties')}
                          name="specialties"
                          type="select"
                          value={formik.values.specialties}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          options={specialtyOptions}
                          error={formik.touched.specialties && formik.errors.specialties}
                          isRequired
                          isMulti={true}
                          placeholder={t('Select specialties')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Experience')}
                          name="experience"
                          type="select"
                          value={formik.values.experience}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          options={experienceOptions}
                          error={formik.touched.experience && formik.errors.experience}
                          isRequired
                          placeholder={t('Select experience level')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Working Hours')}
                          name="workingHours"
                          type="text"
                          value={formik.values.workingHours}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={t('e.g., 9 AM - 9 PM')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        
                      </div>

                      <InputField
                        label={t('Business Description')}
                        name="description"
                        type="textarea"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t('Describe your tailoring services and expertise')}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>

                    {/* Services Offered */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Services Offered')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="homeMeasurement"
                            name="homeMeasurement"
                            checked={formik.values.homeMeasurement}
                            onChange={formik.handleChange}
                            className={`mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${isRTL ? 'ml-2' : 'mr-2'}`}
                          />
                          <label htmlFor="homeMeasurement" className="text-gray-700 font-medium">
                            {t('Home Measurement Available')}
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="rushOrders"
                            name="rushOrders"
                            checked={formik.values.rushOrders}
                            onChange={formik.handleChange}
                            className={`mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${isRTL ? 'ml-2' : 'mr-2'}`}
                          />
                          <label htmlFor="rushOrders" className="text-gray-700 font-medium">
                            {t('Rush Orders Accepted')}
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Documents Upload */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Documents Upload')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label={t('Trade License')}
                          name="tradeLicense"
                          type="file"
                          onChange={handleFileChange('tradeLicense')}
                          accept=".pdf,.jpg,.jpeg,.png"
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Emirates ID')}
                          name="emiratesId"
                          type="file"
                          onChange={handleFileChange('emiratesId')}
                          accept=".pdf,.jpg,.jpeg,.png"
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Certificates')}
                          name="certificates"
                          type="file"
                          onChange={handleFileChange('certificates')}
                          accept=".pdf,.jpg,.jpeg,.png"
                          multiple
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Portfolio Images')}
                          name="portfolioImages"
                          type="file"
                          onChange={handleFileChange('portfolioImages')}
                          accept=".jpg,.jpeg,.png"
                          multiple
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                      </div>
                    </div>

                    {/* Social Media */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Social Media & Online Presence')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField
                          label={t('Instagram')}
                          name="socialMedia.instagram"
                          type="url"
                          value={formik.values.socialMedia.instagram}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={t('Instagram profile URL')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Facebook')}
                          name="socialMedia.facebook"
                          type="url"
                          value={formik.values.socialMedia.facebook}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={t('Facebook page URL')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />

                        <InputField
                          label={t('Website')}
                          name="socialMedia.website"
                          type="url"
                          value={formik.values.socialMedia.website}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={t('Website URL')}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                      </div>
                    </div>
                  </section>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? t('Creating Account...') : t('Create Account')}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t('Already have an account?')}{' '}
                    <Link to="/login" className="text-primary hover:underline">
                      {t('Sign In')}
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;