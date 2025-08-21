import React from 'react';
import { Settings as SettingsIcon, Globe, Shield, Bell, Palette, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/components/Layout';

const Settings = () => {
  const { language } = useLanguage();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'en' ? 'Admin Settings' : 'إعدادات الإدارة'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'en' ? 'Configure platform settings and preferences' : 'تكوين إعدادات المنصة والتفضيلات'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Settings */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Platform Settings' : 'إعدادات المنصة'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Maintenance Mode' : 'وضع الصيانة'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Temporarily disable public access' : 'تعطيل الوصول العام مؤقتاً'}
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'New User Registration' : 'تسجيل المستخدمين الجدد'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Allow new users to register' : 'السماح للمستخدمين الجدد بالتسجيل'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Auto Tailor Approval' : 'الموافقة التلقائية على الخياطين'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Automatically approve verified tailors' : 'الموافقة التلقائية على الخياطين المتحققين'}
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Language & Localization */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Language & Localization' : 'اللغة والتوطين'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Arabic RTL Support' : 'دعم العربية من اليمين لليسار'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Enable right-to-left text direction' : 'تمكين اتجاه النص من اليمين إلى اليسار'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Auto Language Detection' : 'الكشف التلقائي للغة'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Detect user language from browser' : 'كشف لغة المستخدم من المتصفح'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Currency Display (AED)' : 'عرض العملة (درهم)'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Show prices in UAE Dirhams' : 'عرض الأسعار بالدرهم الإماراتي'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Security Settings' : 'إعدادات الأمان'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Two-Factor Authentication' : 'المصادقة الثنائية'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Require 2FA for admin accounts' : 'طلب المصادقة الثنائية لحسابات الإدارة'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Password Complexity' : 'تعقيد كلمة المرور'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Enforce strong password requirements' : 'فرض متطلبات كلمة مرور قوية'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Session Timeout' : 'انتهاء مهلة الجلسة'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Auto logout after inactivity' : 'تسجيل الخروج التلقائي بعد عدم النشاط'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Notification Settings' : 'إعدادات الإشعارات'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'New User Notifications' : 'إشعارات المستخدمين الجدد'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Get notified when users register' : 'احصل على إشعار عند تسجيل المستخدمين'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'Dispute Alerts' : 'تنبيهات النزاعات'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Immediate alerts for new disputes' : 'تنبيهات فورية للنزاعات الجديدة'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {language === 'en' ? 'System Updates' : 'تحديثات النظام'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Platform maintenance and updates' : 'صيانة المنصة والتحديثات'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 rtl:space-x-reverse">
        <Button variant="outline" className="hover-lift">
          {language === 'en' ? 'Reset to Defaults' : 'إعادة تعيين للافتراضي'}
        </Button>
        <Button className="btn-premium">
          {language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
        </Button>
      </div>
    </div>
  );
};

export default Settings;