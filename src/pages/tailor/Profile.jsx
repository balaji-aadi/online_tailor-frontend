import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import InputField from '../../components/ui/InputField';
import { FileInputField } from '../../components/ui/ImageInputField';
import { useLanguage } from '@/components/Layout';
import { toast } from 'react-toastify';
import MasterApi from '../../api/master.api'
import { arabicTranslations } from '../admin/TailorRegistration';
import { Badge, Camera, Edit, Mail, MapPin, Phone, Save, Star, User, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import TailorApi from '../../api/tailor.api';

const TailorProfile = () => {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [isRTL, setIsRTL] = useState(language === 'ar');
  const [specialty, setSpecialty] = useState([]);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [termsContent, setTermsContent] = useState('');
  const [privacyContent, setPrivacyContent] = useState('');
  const [removeTradeLicense, setRemoveTradeLicense] = useState([]);
  const [removeEmiratesId, setRemoveEmiratesId] = useState([]);
  const [removeCertificates, setRemoveCertificates] = useState([]);
  const [removePortfolioImages, setRemovePortfolioImages] = useState([]);
  const [removeProfileImage, setRemoveProfileImage] = useState([]);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const currentUser = useSelector((state) => state.store.currentUser);

  // Fetch master data like specialties
  const fetchMasterData = async () => {
    try {
      const res = await MasterApi.getSpecialties();
      setSpecialty(res.data?.data);
    } catch (error) {
      console.error("Error fetching master data:", error);
    }
  };

  // Fetch terms and policies
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

  // Fetch current profile data
  const fetchProfile = async () => {
    try {
      const res = await TailorApi.getTailorById(currentUser?._id);
      const profile = res.data?.data;
      let coordinates = { type: 'Point', coordinates: [0, 0] };
      if (profile.coordinates && profile.coordinates.coordinates) {
        coordinates = profile.coordinates;
      } else if (profile.tailorInfo && profile.tailorInfo.coordinates && profile.tailorInfo.coordinates.coordinates) {
        coordinates = profile.tailorInfo.coordinates;
      }

      const emiratesIdExpiry = profile.tailorInfo?.emiratesIdExpiry || '';
      const formattedEmiratesIdExpiry = emiratesIdExpiry
        ? new Date(emiratesIdExpiry).toISOString().split('T')[0]
        : '';

      return {
        businessName: profile.tailorInfo?.businessInfo?.businessName || profile.businessName || '',
        ownerName: profile.tailorInfo?.businessInfo?.ownerName || profile.ownerName || '',
        email: profile.email || '',
        whatsapp: profile.tailorInfo?.businessInfo?.whatsapp || '',
        locations: profile.tailorInfo?.businessInfo?.locations || [],
        gender: profile.tailorInfo?.professionalInfo?.gender || '',
        specialties: profile?.specialties?.map(s => s._id) || [],
        experience: profile.tailorInfo?.professionalInfo?.experience || '',
        description: profile.tailorInfo?.professionalInfo?.description || '',
        homeMeasurement: profile.tailorInfo?.services?.homeMeasurement || false,
        rushOrders: profile.tailorInfo?.services?.rushOrders || false,
        tradeLicense: profile.tailorInfo?.documents?.tradeLicense || [],
        emiratesId: profile.tailorInfo?.documents?.emiratesId || [],
        emiratesIdExpiry: formattedEmiratesIdExpiry,
        certificates: profile.tailorInfo?.documents?.certificates || [],
        portfolioImages: profile.tailorInfo?.documents?.portfolioImages || [],
        socialMedia: profile.tailorInfo?.additionalInfo?.socialMedia || { instagram: '', facebook: '', website: '' },
        coordinates: coordinates,
        profileImage: profile.profileImage ? [profile.profileImage] : [],
      };


    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(t('Failed to load profile'));
      return null;
    }
  };

  useEffect(() => {
    fetchMasterData();
    fetchTermsPolicies();
    const loadProfile = async () => {
      const profile = await fetchProfile();
      if (profile) {
        formik.setValues(profile);
        setUserCoordinates(profile.coordinates?.coordinates || null);
      }
    };
    loadProfile();
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

  const specialtyOptions = specialty.map((item) => ({
    value: item._id,
    label: item.name
  }));

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
        formik.setFieldValue('coordinates.coordinates', [longitude, latitude]);
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

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      formik.setFieldValue('profileImage', [file]);
    }
  };

  const removeProfileImageHandler = () => {
    setProfileImageFile(null);
    formik.setFieldValue('profileImage', []);
    setRemoveProfileImage([...removeProfileImage, formik.values.profileImage[0]]);
  };

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
      profileImage: [],
    },
    validate: (values) => {
      const errors = {};
      if (!values.businessName) errors.businessName = t('Business name is required');
      if (!values.ownerName) errors.ownerName = t('Owner name is required');
      if (!values.email) errors.email = t('Email is required');
      if (!values.locations.length) errors.locations = t('At least one location is required');
      if (!values.gender) errors.gender = t('Gender preference is required');
      if (!values.specialties.length) errors.specialties = t('At least one specialty is required');
      if (!values.experience) errors.experience = t('Experience is required');
      if (!values.emiratesIdExpiry) errors.emiratesIdExpiry = t('Emirates ID expiry date is required');
      if (!values.tradeLicense.length) errors.tradeLicense = t('Trade License is required');
      if (!values.emiratesId.length) errors.emiratesId = t('Emirates ID is required');
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        // Set coordinates from userCoordinates state if available
        if (userCoordinates) {
          values.coordinates = {
            type: 'Point',
            coordinates: userCoordinates,
          };
        }

        // Append all fields to formData
        Object.keys(values).forEach((key) => {
          if (
            key !== 'tradeLicense' &&
            key !== 'emiratesId' &&
            key !== 'certificates' &&
            key !== 'portfolioImages' &&
            key !== 'profileImage' &&
            key !== 'coordinates'
          ) {
            if (typeof values[key] === 'object' && !Array.isArray(values[key])) {
              formData.append(key, JSON.stringify(values[key]));
            } else if (Array.isArray(values[key])) {
              formData.append(key, JSON.stringify(values[key]));
            } else {
              formData.append(key, values[key]);
            }
          }
        });

        // Append coordinates separately
        formData.append('coordinates[type]', 'Point');
        formData.append('coordinates[coordinates][0]', String(values.coordinates.coordinates[0]));
        formData.append('coordinates[coordinates][1]', String(values.coordinates.coordinates[1]));

        // Append files only if they are File objects
        values.tradeLicense.forEach((file) => {
          if (file instanceof File) {
            formData.append('tradeLicense', file);
          }
        });
        values.emiratesId.forEach((file) => {
          if (file instanceof File) {
            formData.append('emiratesId', file);
          }
        });
        values.certificates.forEach((file) => {
          if (file instanceof File) {
            formData.append('certificates', file);
          }
        });
        values.portfolioImages.forEach((file) => {
          if (file instanceof File) {
            formData.append('portfolioImages', file);
          }
        });
        values.profileImage.forEach((file) => {
          if (file instanceof File) {
            formData.append('profileImage', file);
          }
        });

        // Append remove lists
        formData.append('removeTradeLicense', JSON.stringify(removeTradeLicense));
        formData.append('removeEmiratesId', JSON.stringify(removeEmiratesId));
        formData.append('removeCertificates', JSON.stringify(removeCertificates));
        formData.append('removePortfolioImages', JSON.stringify(removePortfolioImages));
        formData.append('removeProfileImage', JSON.stringify(removeProfileImage));

        await TailorApi.updateTailorProfile(currentUser?._id, formData);
        toast.success(t('Profile updated successfully!'));
        setIsEditing(false);

        // Reset remove lists
        setRemoveTradeLicense([]);
        setRemoveEmiratesId([]);
        setRemoveCertificates([]);
        setRemovePortfolioImages([]);
        setRemoveProfileImage([]);

        // Refresh profile data after update
        const profile = await fetchProfile();
        if (profile) {
          formik.setValues(profile);
          setUserCoordinates(profile.coordinates?.coordinates || null);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error(t('An error occurred while updating your profile'));
      }
    }
  });

  const handleCancel = () => {
    setIsEditing(false);
    // Reset remove lists on cancel
    setRemoveTradeLicense([]);
    setRemoveEmiratesId([]);
    setRemoveCertificates([]);
    setRemovePortfolioImages([]);
    setRemoveProfileImage([]);
    setProfileImageFile(null);
    formik.resetForm();
    const loadProfile = async () => {
      const profile = await fetchProfile();
      if (profile) {
        formik.setValues(profile);
        setUserCoordinates(profile.coordinates?.coordinates || null);
      }
    };
    loadProfile();
  };

  const handleWhatsAppChange = (value) => {
    formik.setFieldValue('whatsapp', value || '');
  };

  return (
    <div className={`p-6 space-y-6 animate-fade-in ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('Business Profile')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('Manage your business information and showcase your expertise')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className={isEditing ? "btn-premium" : "btn-hero"}
            onClick={() => {
              if (isEditing) {
                formik.handleSubmit();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('Save Changes')}
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('Edit Profile')}
              </>
            )}
          </Button>
          {isEditing && (
            <Button
              className="btn-secondary"
              onClick={handleCancel}
            >
              {t('Cancel')}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="card-premium">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {formik.values.profileImage.length > 0 || profileImageFile ? (
                    <img
                      src={profileImageFile ? URL.createObjectURL(profileImageFile) :
                        (typeof formik.values.profileImage[0] === 'string' ? formik.values.profileImage[0] :
                          (formik.values.profileImage[0] instanceof File ? URL.createObjectURL(formik.values.profileImage[0]) : ''))}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-primary-foreground" />
                  )}
                </div>
                {isEditing && (
                  <div className="absolute bottom-0 right-0 cursor-pointer rounded-full p-1 bg-white shadow-md">
                    <label htmlFor="profile-image-upload" className="cursor-pointer">
                      <Camera className="w-5 h-5 text-black" />
                    </label>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </div>
                )}
                {isEditing && (formik.values.profileImage.length > 0 || profileImageFile) && (
                  <button
                    onClick={removeProfileImageHandler}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{formik.values.businessName || 'Online Tailor'}</h2>
              <p className="text-muted-foreground mb-4">
                {t('Traditional & Modern Tailoring')}
              </p>
              <div className="flex items-center justify-center mb-4">
                <Star className="w-5 h-5 text-gold fill-current mr-1" />
                <span className="font-semibold text-foreground">4.9</span>
                <span className="text-sm text-muted-foreground ml-2">
                  (234 {t('reviews')})
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Display */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>{t('Contact Information')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-muted-foreground mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <p className="font-medium text-foreground capitalize">{formik.values.locations.join(', ')}</p>
                  <p className="text-sm text-muted-foreground">UAE</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-muted-foreground mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <p className="font-medium text-foreground">{formik.values.whatsapp || 'Not provided'}</p>
                  <p className="text-sm text-muted-foreground">{t('WhatsApp Available')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-muted-foreground mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <p className="font-medium text-foreground">{formik.values.email || 'balajiaade2000@gmail.com'}</p>
                  <p className="text-sm text-muted-foreground">{t('Business Email')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Edit Form */}
        <div className="lg:col-span-2 space-y-6 sticky top-0 overflow-auto h-[80vh] pr-4 bg-white">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-none">
                <CardContent>
                  <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                          error={formik.touched.businessName && formik.errors.businessName}
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
                          error={formik.touched.ownerName && formik.errors.ownerName}
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
                            className={`w-full px-4 py-2 border rounded-lg outline-none border-gray-300 ${isRTL ? "rtl" : "ltr"}`}
                            style={{
                              "--PhoneInputCountryFlag-height": "1em",
                              "--PhoneInputCountrySelectArrow-color": "#6b7280",
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
                          error={formik.touched.locations && formik.errors.locations}
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
                              className={`px-4 py-2 rounded-lg border ${locationStatus === "fetching" ? "bg-gray-200 cursor-not-allowed" : "bg-blue-100 hover:bg-blue-200"} transition-colors`}
                            >
                              {locationStatus === "fetching" ? t("Fetching Location...") : t("Get My Current Location")}
                            </button>
                            {locationStatus === "success" && userCoordinates && (
                              <div className="text-sm text-green-600">
                                {t("Location found")}: {userCoordinates[0].toFixed(6)}, {userCoordinates[1].toFixed(6)}
                              </div>
                            )}
                            {locationStatus === "error" && (
                              <div className="text-sm text-red-600">
                                {t("Failed to get location")}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {t("This helps customers find your business more easily")}
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
                          error={formik.touched.gender && formik.errors.gender}
                          isRequired
                          placeholder={t("Select gender specialization")}
                          dir={isRTL ? "rtl" : "ltr"}
                        />
                        <InputField
                          label={t("Specialties")}
                          name="specialties"
                          type="select"
                          value={formik.values.specialties}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          options={specialtyOptions}
                          error={formik.touched.specialties && formik.errors.specialties}
                          isRequired
                          isMulti={true}
                          placeholder={t("Select Specialties")}
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
                          error={formik.touched.experience && formik.errors.experience}
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
                          error={formik.touched.emiratesIdExpiry && formik.errors.emiratesIdExpiry}
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
                        placeholder={t("Describe your tailoring services and expertise")}
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
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${isRTL ? "ml-2" : "mr-2"}`}
                          />
                          <label htmlFor="homeMeasurement" className="text-gray-700 font-medium">
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
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${isRTL ? "ml-2" : "mr-2"}`}
                          />
                          <label htmlFor="rushOrders" className="text-gray-700 font-medium">
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
                          onChange={(files) => formik.setFieldValue("tradeLicense", files)}
                          onBlur={formik.handleBlur}
                          error={formik.touched.tradeLicense && formik.errors.tradeLicense}
                          accept=".pdf,.jpg,.jpeg,.png"
                          multiple={true}
                          setRemoveList={setRemoveTradeLicense}
                          isRTL={isRTL}
                          isRequired
                        />
                        <FileInputField
                          label={t("Emirates ID")}
                          name="emiratesId"
                          value={formik.values.emiratesId}
                          onChange={(files) => formik.setFieldValue("emiratesId", files)}
                          onBlur={formik.handleBlur}
                          error={formik.touched.emiratesId && formik.errors.emiratesId}
                          accept=".pdf,.jpg,.jpeg,.png"
                          multiple={true}
                          setRemoveList={setRemoveEmiratesId}
                          isRTL={isRTL}
                          isRequired
                        />
                        <FileInputField
                          label={t("Certificates")}
                          name="certificates"
                          value={formik.values.certificates}
                          onChange={(files) => formik.setFieldValue("certificates", files)}
                          onBlur={formik.handleBlur}
                          accept=".pdf,.jpg,.jpeg,.png"
                          multiple={true}
                          setRemoveList={setRemoveCertificates}
                          isRTL={isRTL}
                        />
                        <FileInputField
                          label={t("Portfolio Images")}
                          name="portfolioImages"
                          value={formik.values.portfolioImages}
                          onChange={(files) => formik.setFieldValue("portfolioImages", files)}
                          onBlur={formik.handleBlur}
                          accept=".jpg,.jpeg,.png"
                          multiple={true}
                          setRemoveList={setRemovePortfolioImages}
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

                    {/* Terms and Policies Links */}
                    <div className="mt-6">
                      <p className="text-sm text-gray-700">
                        {t('View our')}{' '}
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
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <>
              {/* Display Mode - Business Information */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>{t('Business Information')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('Business Name')}
                      </label>
                      <p className="text-foreground">{formik.values.businessName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('Owner Name')}
                      </label>
                      <p className="text-foreground">{formik.values.ownerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('Email')}
                      </label>
                      <p className="text-foreground">{formik.values.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('WhatsApp')}
                      </label>
                      <p className="text-foreground">{formik.values.whatsapp || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('Locations')}
                      </label>
                      <p className="text-foreground">{formik.values.locations.join(', ') || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('Coordinates')}
                      </label>
                      <p className="text-foreground">
                        {formik.values.coordinates && formik.values.coordinates.coordinates
                          ? `${formik.values.coordinates.coordinates[0]}, ${formik.values.coordinates.coordinates[1]}`
                          : 'Not provided'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('Business Description')}
                    </label>
                    <p className="text-muted-foreground">
                      {formik.values.description || 'No description provided'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Specializations Display */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>{t('Specializations')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formik.values.specialties.length > 0 ? (
                      formik.values.specialties.map((id, index) => {
                        const spec = specialty.find(s => s._id === id);
                        return (
                          <div key={index} className="p-4 bg-secondary/30 rounded-xl">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-foreground">{spec?.name || 'Unknown'}</span>
                              <Badge className="bg-primary/10 text-primary">
                                {t('Expert')}
                              </Badge>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-muted-foreground">{t('No specialties provided')}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Services and Documents Display */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>{t('Services & Documents')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('Services Offered')}
                    </label>
                    <p className="text-foreground">
                      {formik.values.homeMeasurement && t('Home Measurement Available')}
                      {formik.values.homeMeasurement && formik.values.rushOrders && ', '}
                      {formik.values.rushOrders && t('Rush Orders Accepted')}
                      {!formik.values.homeMeasurement && !formik.values.rushOrders && 'No services selected'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('Emirates ID Expiry')}
                    </label>
                    <p className="text-foreground">{formik.values.emiratesIdExpiry ? new Date(formik.values.emiratesIdExpiry).toLocaleDateString() : 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('Trade License')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formik.values.tradeLicense.length > 0 ? (
                        formik.values.tradeLicense.map((file, index) => (
                          <div key={index} className="relative w-24 h-24">
                            <img
                              src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                              alt={`Trade License ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">{t('No trade licenses uploaded')}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('Emirates ID')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formik.values.emiratesId.length > 0 ? (
                        formik.values.emiratesId.map((file, index) => (
                          <div key={index} className="relative w-24 h-24">
                            <img
                              src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                              alt={`Emirates ID ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">{t('No Emirates ID uploaded')}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('Certificates')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formik.values.certificates.length > 0 ? (
                        formik.values.certificates.map((file, index) => (
                          <div key={index} className="relative w-24 h-24">
                            <img
                              src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                              alt={`Certificate ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">{t('No certificates uploaded')}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('Portfolio Images')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formik.values.portfolioImages.length > 0 ? (
                        formik.values.portfolioImages.map((file, index) => (
                          <div key={index} className="relative w-24 h-24">
                            <img
                              src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                              alt={`Portfolio Image ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">{t('No portfolio images uploaded')}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TailorProfile;