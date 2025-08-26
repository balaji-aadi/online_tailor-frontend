import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scissors, Settings, Eye, EyeOff, ChevronDown, ChevronUp, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../public/Assests/khyate_logo.png'
import { useLoading } from '../../loader/LoaderContext';
import { useDispatch } from 'react-redux';
import { login } from "../../store/slices/storeSlice";
import { toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [language, setLanguage] = useState('en');
  const { handleLoading } = useLoading();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Translations
  const translations = {
    ar: {
      appName: "خياط",
      tagline: "ربط الخياطين بالعملاء في الإمارات",
      demoAccounts: "حسابات تجريبية",
      signIn: "تسجيل الدخول",
      tailor: "خياط",
      admin: "مدير",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      noAccount: "ليس لديك حساب؟",
      createAccount: "إنشاء حساب جديد",
      backToHome: "العودة إلى الصفحة الرئيسية",
      loginButton: "تسجيل الدخول",
      loggingIn: "جاري تسجيل الدخول...",
      passwordPlaceholder: "كلمة المرور",
      credentialsHint: "كلمة المرور: password123",
      showCredentials: "عرض بيانات الحسابات",
      hideCredentials: "إخفاء بيانات الحسابات",
      adminLabel: "مدير النظام",
      tailorLabel: "خياط",
      tailorRegisterHint: "التسجيل متاح فقط للخياطين",
      adminRegisterHint: "حسابات المدير يتم إنشاؤها بواسطة النظام",
    },
    en: {
      appName: "Khyate",
      tagline: "Connecting tailors with customers in UAE",
      demoAccounts: "Demo Accounts",
      signIn: "Sign In",
      tailor: "Tailor",
      admin: "Admin",
      email: "Email Address",
      password: "Password",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      createAccount: "Create New Account",
      backToHome: "Back to Homepage",
      loginButton: "Sign In",
      loggingIn: "Signing in...",
      passwordPlaceholder: "Password",
      credentialsHint: "Password: password123",
      showCredentials: "Show Demo Credentials",
      hideCredentials: "Hide Demo Credentials",
      adminLabel: "System Admin",
      tailorLabel: "Tailor",
      tailorRegisterHint: "Registration is only available for tailors",
    }
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      handleLoading(true);
      try {
        const res = await dispatch(login({emailOrPhone:email,password})).unwrap();
        console.log(res.data)
        const result = res?.data?.user;
        switch (result?.user_role?.name) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'tailor':
            navigate('/tailor/dashboard');
            break;
          default:
            navigate('/');
        }
      } catch (e) {
        console.error("Login error:", e);
        toast.error("Invalid credentials. Please try again.");
      } finally {
        handleLoading(false);
      }
    }catch(err){
      console.log(err)
    }
    finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex bg-background">
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1605518216938-7c31b4b59a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)',
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
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


          <AnimatePresence>
            {showCredentials && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border bg-card/95 backdrop-blur shadow-card mb-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-center text-lg">{t.demoAccounts}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 gap-2"
                    >
                      {demoAccounts.map((account) => (
                        <motion.div key={account.type} variants={itemVariants}>
                          <Button
                            variant="outline"
                            onClick={() => fillDemoAccount(account)}
                            className="justify-start gap-3 h-12 w-full"
                          >
                            <account.icon className="h-4 w-4" />
                            <span>{account.label}</span>
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {account.email}
                            </Badge>
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      {t.credentialsHint}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign In Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border bg-card/95 backdrop-blur shadow-card">
              <CardHeader>
                <CardTitle className="text-center">{t.signIn}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.email}</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={language === 'ar' ? 'text-right' : 'text-left'}
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.password}</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t.passwordPlaceholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={language === 'ar' ? 'pr-4 text-right' : 'pl-2 text-left'}
                        dir="ltr"
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

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? t.loggingIn : t.loginButton}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 text-center space-y-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline block"
                  >
                    {t.forgotPassword}
                  </Link>
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
            {/* <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t.backToHome}
            </Link> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;