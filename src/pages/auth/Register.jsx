import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scissors, User, Eye, EyeOff, MapPin, Phone, FileText, Languages } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import logo from '../../../public/Assests/khyate_logo.png'

const Register = () => {
  const [userType, setUserType] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // 'ar' for Arabic, 'en' for English
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Tailor specific fields
    businessName: '',
    specialization: '',
    experience: '',
    location: '',
    description: '',
    // Customer specific fields
    address: ''
  });

  // Translations
  const translations = {
    ar: {
      appName: "خياط",
      tagline: "انضم إلى منصة الخياطة الرائدة في الإمارات",
      registerTitle: "إنشاء حساب جديد",
      customer: "عميل",
      tailor: "خياط",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      businessInfo: "معلومات الأعمال",
      shopName: "اسم المحل",
      experienceYears: "سنوات الخبرة",
      specialization: "التخصص",
      emirate: "الإمارة",
      serviceDescription: "وصف الخدمات",
      address: "العنوان",
      createAccount: "إنشاء الحساب",
      creatingAccount: "جاري إنشاء الحساب...",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      signIn: "تسجيل الدخول",
      backToHome: "العودة إلى الصفحة الرئيسية",
      chooseSpecialization: "اختر التخصص",
      chooseEmirate: "اختر الإمارة",
      addressPlaceholder: "العنوان التفصيلي...",
      servicePlaceholder: "اكتب وصفاً موجزاً عن خدماتك وخبرتك...",
      phonePlaceholder: "+971 XX XXX XXXX",
      passwordMismatch: "كلمات المرور غير متطابقة",
      registrationError: "حدث خطأ أثناء إنشاء الحساب"
    },
    en: {
      appName: "Khyate",
      tagline: "Join the leading tailoring platform in the UAE",
      registerTitle: "Create New Account",
      customer: "Customer",
      tailor: "Tailor",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      businessInfo: "Business Information",
      shopName: "Shop Name",
      experienceYears: "Years of Experience",
      specialization: "Specialization",
      emirate: "Emirate",
      serviceDescription: "Service Description",
      address: "Address",
      createAccount: "Create Account",
      creatingAccount: "Creating Account...",
      alreadyHaveAccount: "Already have an account?",
      signIn: "Sign In",
      backToHome: "Back to Homepage",
      chooseSpecialization: "Choose Specialization",
      chooseEmirate: "Choose Emirate",
      addressPlaceholder: "Detailed address...",
      servicePlaceholder: "Write a brief description of your services and experience...",
      phonePlaceholder: "+971 XX XXX XXXX",
      passwordMismatch: "Passwords do not match",
      registrationError: "An error occurred while creating your account"
    }
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: t.passwordMismatch,
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const userData = {
        ...formData,
        type: userType
      };

      const result = await register(userData);

      if (result.success) {
        toast({
          title: language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account Created Successfully',
          description: language === 'ar' ? `مرحباً ${result.user.name}` : `Welcome ${result.user.name}`,
        });

        // Redirect based on user type
        switch (userType) {
          case 'tailor':
            navigate('/tailor/dashboard');
            break;
          case 'customer':
            navigate('/customer/dashboard');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: t.registrationError,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const specializations = [
    'الخياطة التقليدية',
    'الأزياء العصرية',
    'فساتين الزفاف',
    'الكنادر والثوب الإماراتي',
    'العبايات والجلاليب',
    'البدل الرسمية',
    'الملابس النسائية',
    'ملابس الأطفال'
  ];

  const emirates = [
    'أبوظبي',
    'دبي',
    'الشارقة',
    'عجمان',
    'أم القيوين',
    'رأس الخيمة',
    'الفجيرة'
  ];

  return (
    <div className="min-h-screen flex bg-background ">
      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
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
            <div className="text-left p-16 space-y-6">
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
        <div className="w-full max-w-md space-y-6">
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
            <h1 className="text-3xl font-bold gradient-text">{t.appName}</h1>
            <p className="text-muted-foreground mt-2">{t.tagline}</p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border bg-card/95 backdrop-blur shadow-card">
              <CardHeader>
                <CardTitle className="text-center">{t.registerTitle}</CardTitle>
              </CardHeader>
              <CardContent>


                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Common Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t.fullName}</label>
                      <Input
                        placeholder={t.fullName}
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className={language === 'ar' ? 'text-right' : 'text-left'}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t.phone}</label>
                      <div className="relative">
                        <Phone className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${language === 'ar' ? 'left-3' : 'right-3'}`} />
                        <Input
                          placeholder={t.phonePlaceholder}
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={language === 'ar' ? 'pr-4 text-right' : 'pl-4 text-left'}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.email}</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={language === 'ar' ? 'text-right' : 'text-left'}
                      dir="ltr"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t.password}</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t.password}
                          value={formData.password}
                          onChange={(e) => handleChange('password', e.target.value)}
                          className={language === 'ar' ? 'pr-4 text-right' : 'pl-4 text-left'}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute top-1/2 -translate-y-1/2 ${language === 'ar' ? 'left-3' : 'right-3'}`}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t.confirmPassword}</label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder={t.confirmPassword}
                          value={formData.confirmPassword}
                          onChange={(e) => handleChange('confirmPassword', e.target.value)}
                          className={language === 'ar' ? 'pr-4 text-right' : 'pl-4 text-left'}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`absolute top-1/2 -translate-y-1/2 ${language === 'ar' ? 'left-3' : 'right-3'}`}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tailor Specific Fields */}
                  {userType === 'tailor' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 border-t pt-6"
                    >
                      <h3 className="text-lg font-semibold">{t.businessInfo}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t.shopName}</label>
                          <Input
                            placeholder={t.shopName}
                            value={formData.businessName}
                            onChange={(e) => handleChange('businessName', e.target.value)}
                            required
                            className={language === 'ar' ? 'text-right' : 'text-left'}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t.experienceYears}</label>
                          <Input
                            type="number"
                            placeholder="5"
                            value={formData.experience}
                            onChange={(e) => handleChange('experience', e.target.value)}
                            min="0"
                            max="50"
                            className={language === 'ar' ? 'text-right' : 'text-left'}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t.specialization}</label>
                          <Select value={formData.specialization} onValueChange={(value) => handleChange('specialization', value)}>
                            <SelectTrigger className={language === 'ar' ? 'text-right' : 'text-left'}>
                              <SelectValue placeholder={t.chooseSpecialization} />
                            </SelectTrigger>
                            <SelectContent>
                              {specializations.map((spec) => (
                                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t.emirate}</label>
                          <Select value={formData.location} onValueChange={(value) => handleChange('location', value)}>
                            <SelectTrigger className={language === 'ar' ? 'text-right' : 'text-left'}>
                              <SelectValue placeholder={t.chooseEmirate} />
                            </SelectTrigger>
                            <SelectContent>
                              {emirates.map((emirate) => (
                                <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.serviceDescription}</label>
                        <Textarea
                          placeholder={t.servicePlaceholder}
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          rows={3}
                          className={language === 'ar' ? 'text-right' : 'text-left'}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Customer Specific Fields */}
                  {userType === 'customer' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 border-t pt-6"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.address}</label>
                        <div className="relative">
                          <MapPin className={`absolute top-3 h-4 w-4 text-muted-foreground ${language === 'ar' ? 'left-3' : 'right-3'}`} />
                          <Textarea
                            placeholder={t.addressPlaceholder}
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className={language === 'ar' ? 'pr-4 text-right' : 'pl-4 text-left'}
                            rows={2}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? t.creatingAccount : t.createAccount}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t.alreadyHaveAccount}{' '}
                    <Link to="/login" className="text-primary hover:underline">
                      {t.signIn}
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t.backToHome}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;