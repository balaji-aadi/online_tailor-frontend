import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, ArrowLeft, Mail, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import logo from '../../../public/Assests/khyate_logo.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [language, setLanguage] = useState('en'); // 'ar' for Arabic, 'en' for English

  const { toast } = useToast();

  // Translations
  const translations = {
    ar: {
      appName: "خياط",
      tagline: "استعادة كلمة المرور",
      title: "نسيت كلمة المرور؟",
      subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور",
      email: "البريد الإلكتروني",
      sendButton: "إرسال رابط الاستعادة",
      sending: "جاري الإرسال...",
      sentTitle: "تم الإرسال",
      checkEmail: "تحقق من بريدك الإلكتروني",
      sentMessage: "تم إرسال رابط إعادة تعيين كلمة المرور إلى:",
      resend: "إرسال مرة أخرى",
      backToLogin: "العودة لتسجيل الدخول",
      backToHome: "العودة إلى الصفحة الرئيسية",
      toastTitle: "تم إرسال الرابط",
      toastDescription: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
    },
    en: {
      appName: "Khyate",
      tagline: "Password Recovery",
      title: "Forgot Password?",
      subtitle: "Enter your email and we'll send you a password reset link",
      email: "Email Address",
      sendButton: "Send Reset Link",
      sending: "Sending...",
      sentTitle: "Email Sent",
      checkEmail: "Check Your Email",
      sentMessage: "Password reset link has been sent to:",
      resend: "Send Again",
      backToLogin: "Back to Sign In",
      backToHome: "Back to Homepage",
      toastTitle: "Link Sent",
      toastDescription: "Password reset link has been sent to your email"
    }
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      toast({
        title: t.toastTitle,
        description: t.toastDescription,
      });
    }, 2000);
  };

  if (sent) {
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)',
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

        {/* Right Side - Success Message */}
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
                <Mail className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold gradient-text">{t.sentTitle}</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border bg-card/95 backdrop-blur shadow-card">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto"
                    >
                      <Mail className="h-8 w-8 text-success" />
                    </motion.div>
                    <h3 className="text-xl font-semibold">{t.checkEmail}</h3>
                    <p className="text-muted-foreground">
                      {t.sentMessage}
                    </p>
                    <p className="font-medium text-primary">{email}</p>

                    <div className="pt-4 space-y-3">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                          onClick={() => setSent(false)}
                          variant="outline"
                          className="w-full"
                        >
                          {t.resend}
                        </Button>
                      </motion.div>

                      <Link to="/login">
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <Button variant="ghost" className="w-full">
                            <ArrowLeft className={`${language === 'ar' ? 'mr-2' : 'ml-2'} h-4 w-4`} />
                            {t.backToLogin}
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
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
  }

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
          
        >
          <div className="h-full w-full bg-gradient-to-r from-background/80 to-transparent flex items-center justify-start">
            <div className="text-left p-16 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <img src={logo} alt="Logo" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Forgot Password Form */}
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

          {/* Forgot Password Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border bg-card/95 backdrop-blur shadow-card">
              <CardHeader>
                <CardTitle className="text-center">{t.title}</CardTitle>
                <p className="text-center text-sm text-muted-foreground">
                  {t.subtitle}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.email}</label>
                    <div className="relative">
                      <Mail className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${language === 'ar' ? 'left-3' : 'right-3'}`} />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={language === 'ar' ? 'pr-4 text-right' : 'pl-4 text-left'}
                        dir="ltr"
                        required
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? t.sending : t.sendButton}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 text-center space-y-2">
                  <Link
                    to="/login"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                  >
                    <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                    {t.backToLogin}
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

export default ForgotPassword;