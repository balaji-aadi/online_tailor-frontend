import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Plus, Edit, Trash2, Package, Scissors, ShirtIcon, X, Palette } from 'lucide-react';
import CommonModal from '../../components/ui/commonModal';
import InputField from '../../components/ui/InputField';
import { FileInputField } from '../../components/ui/ImageInputField';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import ImageCarousel from '../../components/ui/ImageCarousel';
import Pagination from '../../components/ui/PaginationAlpha';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { HexColorPicker } from 'react-colorful';
import TailorServiceApi from '../../api/tailor.service.api';
import MasterApi from '../../api/master.api';
import { useLanguage } from '../../components/Layout';

const translations = {
  en: {
    title: 'Services Management',
    readymade: 'Ready-made',
    stitching: 'Stitching',
    alteration: 'Alterations',
    addProduct: 'Add Ready-made',
    addStitchingService: 'Add Stitching Service',
    addAlterationService: 'Add Alteration Service',
    noProducts: 'No products yet',
    noStitchingServices: 'No stitching services yet',
    noAlterationServices: 'No alteration services yet',
    productDescription: 'Start building your inventory by adding ready-made products that customers can purchase immediately',
    stitchingDescription: 'Start by adding your first tailoring service to showcase your expertise',
    alterationDescription: 'Start by adding your first alteration service to showcase your expertise',
    editProduct: 'Edit Product',
    editStitchingService: 'Edit Stitching Service',
    editAlterationService: 'Edit Alteration Service',
    serviceName: 'Service Name',
    name: 'Name',
    price: 'Price (AED)',
    basePrice: 'Base Price (AED)',
    expressPrice: 'Express Price (AED)',
    gender: 'Gender',
    specialty: 'Specialty',
    fabricType: 'Fabric Type',
    measurementType: 'Measurement Type',
    expressDelivery: 'Express Delivery',
    expressDuration: 'Express Duration (days)',
    regularDuration: 'Regular Duration (days)',
    preferenceDuration: 'Preference Duration (days)',
    trialsOffered: 'Trials Offered',
    extraCharges: 'Extra Charges (AED)',
    discount: 'Discount (%)',
    status: 'Status',
    description: 'Description',
    stylePattern: 'Style Pattern',
    addOn: 'Add On',
    isActive: 'Is Active',
    stockQuantity: 'Stock Quantity',
    colors: 'Colors',
    fabric: 'Fabric',
    images: 'Images',
    male: 'Male',
    female: 'Female',
    active: 'Active',
    inactive: 'Inactive',
    available: 'Available',
    unavailable: 'Unavailable',
    deleteConfirm: 'Are you sure you want to delete this item?',
    savedSuccess: 'Saved successfully',
    updatedSuccess: 'Updated successfully',
    deletedSuccess: 'Deleted successfully',
    failedToLoad: 'Failed to load data',
    failedToSave: 'Failed to save',
    failedToDelete: 'Failed to delete item',
    addColor: 'Add Color',
    colorPicker: 'Color Picker',
    hexCode: 'Hex Code',
    enterHexCode: 'Enter hex code',
    chooseColor: 'Choose Color',
    cancel: 'Cancel',
    saving: 'Saving...',
    createService: 'Create Service',
    updateService: 'Update Service',
    createProduct: 'Create Product',
    updateProduct: 'Update Product',
    createAlteration: 'Create Alteration',
    updateAlteration: 'Update Alteration'
  },
  ar: {
    title: 'إدارة الخدمات',
    readymade: 'جاهز للارتداء',
    stitching: 'خياطة',
    alteration: 'تعديلات',
    addProduct: 'إضافة منتج',
    addStitchingService: 'إضافة خدمة خياطة',
    addAlterationService: 'إضافة خدمة تعديل',
    noProducts: 'لا توجد منتجات بعد',
    noStitchingServices: 'لا توجد خدمات خياطة بعد',
    noAlterationServices: 'لا توجد خدمات تعديل بعد',
    productDescription: 'ابدأ في بناء مخزونك عن طريق إضافة منتجات جاهزة يمكن للعملاء شراؤها على الفور',
    stitchingDescription: 'ابدأ بإضافة أول خدمة خياطة لعرض خبرتك',
    alterationDescription: 'ابدأ بإضافة أول خدمة تعديل لعرض خبرتك',
    editProduct: 'تعديل المنتج',
    editStitchingService: 'تعديل خدمة الخياطة',
    editAlterationService: 'تعديل خدمة التعديل',
    serviceName: 'اسم الخدمة',
    name: 'الاسم',
    price: 'السعر (درهم)',
    basePrice: 'السعر الأساسي (درهم)',
    expressPrice: 'سعر التوصيل السريع (درهم)',
    gender: 'الجنس',
    specialty: 'التخصص',
    fabricType: 'نوع القماش',
    measurementType: 'نوع القياس',
    expressDelivery: 'توصيل سريع',
    expressDuration: 'مدة التوصيل السريع (أيام)',
    regularDuration: 'المدة العادية (أيام)',
    preferenceDuration: 'مدة التفضيل (أيام)',
    trialsOffered: 'عدد التجارب',
    extraCharges: 'رسوم إضافية (درهم)',
    discount: 'خصم (%)',
    status: 'الحالة',
    description: 'الوصف',
    stylePattern: 'النمط',
    addOn: 'إضافات',
    isActive: 'نشط',
    stockQuantity: 'الكمية في المخزون',
    colors: 'الألوان',
    fabric: 'القماش',
    images: 'الصور',
    male: 'ذكر',
    female: 'أنثى',
    active: 'نشط',
    inactive: 'غير نشط',
    available: 'متوفر',
    unavailable: 'غير متوفر',
    deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذا العنصر؟',
    savedSuccess: 'تم الحفظ بنجاح',
    updatedSuccess: 'تم التحديث بنجاح',
    deletedSuccess: 'تم الحذف بنجاح',
    failedToLoad: 'فشل تحميل البيانات',
    failedToSave: 'فشل الحفظ',
    failedToDelete: 'فشل حذف العنصر',
    addColor: 'إضافة لون',
    colorPicker: 'أداة اختيار الألوان',
    hexCode: 'كود اللون',
    enterHexCode: 'أدخل كود اللون',
    chooseColor: 'اختر اللون',
    cancel: 'إلغاء',
    saving: 'جاري الحفظ...',
    createService: 'إنشاء خدمة',
    updateService: 'تحديث الخدمة',
    createProduct: 'إنشاء منتج',
    updateProduct: 'تحديث المنتج',
    createAlteration: 'إنشاء تعديل',
    updateAlteration: 'تحديث التعديل'
  }
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('readymade');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [services, setServices] = useState([]);
  const [readymadeItems, setReadymadeItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState({ services: 1, readymade: 1 });
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [colors, setColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hexInput, setHexInput] = useState('');
  const itemsPerPage = 12;
  const { language } = useLanguage();
  const [removeList, setRemoveList] = useState([]);

  const t = translations[language || 'en'];

  // Master data
  const [fabrics, setFabrics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [activeTax, setActiveTax] = useState(null);

  // Load master data
  useEffect(() => {
    loadMasterData();
    loadServices();
    loadReadymadeItems();
  }, []);

  const loadMasterData = async () => {
    try {
      const [fabricsRes, categoriesRes, measurementsRes, specialtiesRes, taxesRes, activeTaxRes, colorsRes] = await Promise.all([
        MasterApi.getFabrics(),
        MasterApi.getCategories(),
        MasterApi.getMeasurements(),
        MasterApi.getSpecialties(),
        MasterApi.getTaxes(),
        MasterApi.getActiveTax(),
        MasterApi.getColors(),
      ]);
      setFabrics(fabricsRes.data?.data || []);
      setCategories(categoriesRes.data?.data || []);
      setMeasurements(measurementsRes.data?.data || []);
      setSpecialties(specialtiesRes.data?.data || []);
      setTaxes(taxesRes.data?.data || []);
      setActiveTax(activeTaxRes.data?.data || null);
      setColors(colorsRes.data?.data || []);
    } catch (error) {
      console.error('Error loading master data:', error);
      toast.error(t.failedToLoad);
    }
  };

  const loadServices = async () => {
    try {
      const response = await TailorServiceApi.getAllServices();
      setServices(response.data?.data || []);
    } catch (error) {
      console.error('Error loading services:', error);
      toast.error(t.failedToLoad);
    }
  };

  const loadReadymadeItems = async () => {
    try {
      const response = await TailorServiceApi.getAllReadymadeCloths();
      setReadymadeItems(response.data?.data || []);
    } catch (error) {
      console.error('Error loading readymade items:', error);
      toast.error(t.failedToLoad);
    }
  };

  const colorOptions = colors.map((color) => ({
    value: color._id,
    label: color.name,
    color: color.value
  }));

  // Stitching Form
  const stitchingFormik = useFormik({
    initialValues: {
      serviceName: '',
      serviceType: '',
      description: '',
      gender: '',
      specialty: '',
      // fabricType: '',
      stylePattern: '',
      measurementType: '',
      addOn: '',
      expressDelivery: false,
      expressDuration: '',
      preferenceDuration: '',
      regularDuration: '',
      trialsOffered: '',
      basePrice: '',
      expressPrice: '',
      preferencePrice: '',
      extraCharges: '',
      // discount: '',
      status: '',
      images: [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === 'images') {
            // Handle image updates like Fabric component
            if (values.images && values.images.length > 0) {
              values.images.forEach((file) => {
                // Only append new files (not existing URLs)
                if (file instanceof File) {
                  formData.append('images', file);
                }
              });
            }
          } else {
            formData.append(key, values[key]);
          }
        });
        // formData.append('isAlterationService', false);
        if (editingItem && removeList.length >= 0) {
          formData.append("removeImages", JSON.stringify(removeList));
        }


        if (editingItem) {
          await TailorServiceApi.updateService(editingItem._id, formData);
          toast.success(t.updatedSuccess);
        } else {
          await TailorServiceApi.createService(formData);
          toast.success(t.savedSuccess);
        }
        loadServices();
        handleCloseModal();
      } catch (error) {
        console.error('Error saving stitching service:', error);
        toast.error(t.failedToSave);
      } finally {
        setLoading(false);
      }
    },
  });

  // Alteration Form
  const alterationFormik = useFormik({
    initialValues: {
      serviceName: '',
      serviceType: '',
      basePrice: '',
      expressPrice: '',
      description: '',
      isActive: true,
      specialty: '',
      expressDelivery: false,
      expressDuration: '',
      regularDuration: '',
      images: [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === 'images') {
            // Handle image updates like Fabric component
            if (values.images && values.images.length > 0) {
              values.images.forEach((file) => {
                // Only append new files (not existing URLs)
                if (file instanceof File) {
                  formData.append('images', file);
                }
              });
            }
          } else {
            formData.append(key, values[key]);
          }
        });
        // formData.append('isAlterationService', true);

        if (editingItem && removeList.length >= 0) {
          formData.append("removeImages", JSON.stringify(removeList));
        }

        if (editingItem) {
          await TailorServiceApi.updateService(editingItem._id, formData);
          toast.success(t.updatedSuccess);
        } else {
          await TailorServiceApi.createService(formData);
          toast.success(t.savedSuccess);
        }
        loadServices();
        handleCloseModal();
      } catch (error) {
        console.error('Error saving alteration service:', error);
        toast.error(t.failedToSave);
      } finally {
        setLoading(false);
      }
    },
  });

  // Readymade Form
  const readymadeFormik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      specialty: '',
      gender: '',
      fabric: '',
      colors: [],
      description: '',
      isActive: true,
      stock_qty: '',
      taxMaster: activeTax?._id || '',
      images: [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === 'images') {
            // Handle image updates like Fabric component
            if (values.images && values.images.length > 0) {
              values.images.forEach((file) => {
                // Only append new files (not existing URLs)
                if (file instanceof File) {
                  formData.append('images', file);
                }
              });
            }
          } else if (key === 'colors') {
            formData.append(key, JSON.stringify(values.colors));
          } else {
            formData.append(key, values[key]);
          }
        });

        if (editingItem && removeList.length >= 0) {
          formData.append("removeImages", JSON.stringify(removeList));
        }

        if (editingItem) {
          await TailorServiceApi.updateReadymadeCloth(editingItem._id, formData);
          toast.success(t.updatedSuccess);
        } else {
          await TailorServiceApi.createReadymadeCloth(formData);
          toast.success(t.savedSuccess);
        }
        loadReadymadeItems();
        handleCloseModal();
      } catch (error) {
        console.error('Error saving readymade item:', error);
        toast.error(t.failedToSave);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);

    if (type === 'readymade') {
      readymadeFormik.setValues({
        name: item?.name || '',
        price: item?.price || '',
        category: item?.categoryId || categories.find(c => c.name.toLowerCase() === 'readymade')?._id || '',
        specialty: item?.specialty?._id || '',
        gender: item?.gender || '',
        fabric: item?.fabric?._id || '',
        colors: (() => {
          if (!item?.colors) return [];
          try {
            if (typeof item.colors[0] === "string" && item.colors[0].startsWith("[")) {
              return JSON.parse(item.colors[0]);
            }
            return item.colors;
          } catch {
            return [];
          }
        })(),
        description: item?.description || '',
        isActive: item?.isAvailable !== undefined ? item.isAvailable : true,
        stock_qty: item?.stock_qty || item?.stockQuantity || '',
        taxMaster: item?.taxMaster || activeTax?._id || '',
        images: item?.images || [],
      });
      setCurrentColor('#ffffff');
      setHexInput('');
    } else if (type === 'alteration') {
      alterationFormik.setValues({
        serviceName: item?.serviceName || item?.name || '',
        serviceType: item?.serviceType?._id || categories.find(c => c.name.toLowerCase() === 'alteration')?._id || '',
        basePrice: item?.basePrice || item?.price || '',
        expressPrice: item?.expressPrice || '',
        description: item?.description || '',
        isActive: item?.isAvailable || item?.status === 'active' || true,
        specialty: item?.specialty?._id || item?.specialtyId || '',
        expressDelivery: item?.expressDelivery || false,
        expressDuration: item?.expressDuration || '',
        regularDuration: item?.regularDuration || '',
        images: item?.images || [],
      });
    } else {
      stitchingFormik.setValues({
        serviceName: item?.serviceName || item?.name || '',
        serviceType: item?.serviceType?._id || categories.find(c => c.name.toLowerCase() === 'stitching')?._id || '',
        description: item?.description || '',
        gender: item?.gender || '',
        specialty: item?.specialty?._id || '',
        // fabricType: item?.fabricType?._id || '',
        stylePattern: item?.stylePattern || '',
        measurementType: item?.measurementType?._id || '',
        addOn: item?.addOn || '',
        expressDelivery: item?.expressDelivery || false,
        expressDuration: item?.expressDuration || '',
        preferenceDuration: item?.preferenceDuration || '',
        regularDuration: item?.regularDuration || '',
        trialsOffered: item?.trialsOffered || '',
        basePrice: item?.basePrice || '',
        expressPrice: item?.expressPrice || '',
        preferencePrice: item?.preferencePrice || '',
        extraCharges: item?.extraCharges || '',
        // discount: item?.discount || '',
        status: item?.status || '',
        images: item?.images || [],
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setEditingItem(null);
    stitchingFormik.resetForm();
    alterationFormik.resetForm();
    readymadeFormik.resetForm();
    setCurrentColor('#ffffff');
    setShowColorPicker(false);
    setHexInput('');
    setRemoveList([])
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      if (type === 'service' || type === 'alteration') {
        await TailorServiceApi.deleteService(id);
        loadServices();
        toast.success(t.deletedSuccess);
      } else if (type === 'readymade') {
        await TailorServiceApi.deleteReadymadeCloth(id);
        loadReadymadeItems();
        toast.success(t.deletedSuccess);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error(t.failedToDelete);
    }
  };

  const handleImageChange = (files, formikInstance) => {
    formikInstance.setFieldValue('images', files);
  };

  const renderStitchingForm = () => (
    <form onSubmit={stitchingFormik.handleSubmit} className="space-y-6 p-4 bg-background rounded-lg shadow-elegant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label={t.serviceName}
          name="serviceName"
          value={stitchingFormik.values.serviceName}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.serviceName}
          placeholder={t.serviceName}
          isRequired
        />
        <InputField
          label={t.gender}
          name="gender"
          type="select"
          value={stitchingFormik.values.gender}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.gender}
          options={[
            { value: 'male', label: t.male },
            { value: 'female', label: t.female },
          ]}
          isRequired
        />
        <InputField
          label={t.specialty}
          name="specialty"
          type="select"
          value={stitchingFormik.values.specialty}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.specialty}
          options={specialties.map((s) => ({ value: s._id, label: s.name }))}
          isRequired
        />
        {/* <InputField
          label={t.fabricType}
          name="fabricType"
          type="select"
          value={stitchingFormik.values.fabricType}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.fabricType}
          options={fabrics.map((f) => ({ value: f._id, label: f.name }))}
        /> */}
        <InputField
          label={t.measurementType}
          name="measurementType"
          type="select"
          value={stitchingFormik.values.measurementType}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.measurementType}
          options={measurements.map((m) => ({ value: m._id, label: m.name }))}
        />
        <InputField
          label={t.expressDelivery}
          name="expressDelivery"
          type="checkbox"
          checked={stitchingFormik.values.expressDelivery}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.expressDelivery}
        />
        <InputField
          label={t.expressDuration}
          name="expressDuration"
          type="number"
          value={stitchingFormik.values.expressDuration}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.expressDuration}
          placeholder={t.expressDuration}
        />
        <InputField
          label={t.preferenceDuration}
          name="preferenceDuration"
          type="number"
          value={stitchingFormik.values.preferenceDuration}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.preferenceDuration}
          placeholder={t.preferenceDuration}
        />
        <InputField
          label={t.regularDuration}
          name="regularDuration"
          type="number"
          value={stitchingFormik.values.regularDuration}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.regularDuration}
          placeholder={t.regularDuration}
        />
        <InputField
          label={t.trialsOffered}
          name="trialsOffered"
          type="number"
          value={stitchingFormik.values.trialsOffered}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.trialsOffered}
          placeholder={t.trialsOffered}
        />
        <InputField
          label={t.basePrice}
          name="basePrice"
          type="number"
          value={stitchingFormik.values.basePrice}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.basePrice}
          placeholder={t.basePrice}
          isRequired
        />
        <InputField
          label={t.expressPrice}
          name="expressPrice"
          type="number"
          value={stitchingFormik.values.expressPrice}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.expressPrice}
          placeholder={t.expressPrice}
        />
        <InputField
          label={t.extraCharges}
          name="extraCharges"
          type="number"
          value={stitchingFormik.values.extraCharges}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.extraCharges}
          placeholder={t.extraCharges}
        />
        {/* <InputField
          label={t.discount}
          name="discount"
          type="number"
          value={stitchingFormik.values.discount}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.discount}
          placeholder={t.discount}
        /> */}
        <InputField
          label={t.status}
          name="status"
          type="select"
          value={stitchingFormik.values.status}
          onChange={stitchingFormik.handleChange}
          onBlur={stitchingFormik.handleBlur}
          error={stitchingFormik.errors.status}
          options={[
            { value: 'active', label: t.active },
            { value: 'inactive', label: t.inactive },
          ]}
          isRequired
        />
      </div>

      {/* Text Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{t.stylePattern}</label>
          <textarea
            name="stylePattern"
            value={stitchingFormik.values.stylePattern}
            onChange={stitchingFormik.handleChange}
            onBlur={stitchingFormik.handleBlur}
            className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
            rows={3}
            placeholder={t.stylePattern}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{t.addOn}</label>
          <textarea
            name="addOn"
            value={stitchingFormik.values.addOn}
            onChange={stitchingFormik.handleChange}
            onBlur={stitchingFormik.handleBlur}
            className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
            rows={3}
            placeholder={t.addOn}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">{t.description}</label>
        <ReactQuill
          theme="snow"
          value={stitchingFormik.values.description}
          onChange={(content) => stitchingFormik.setFieldValue('description', content)}
          className="bg-background rounded-lg"
        />
      </div>
      <FileInputField
        label={t.images}
        name="images"
        value={stitchingFormik.values.images}
        onChange={(files) => handleImageChange(files, stitchingFormik)}
        accept="image/*"
        setRemoveList={setRemoveList}
        multiple
      />
      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary-hover text-primary-foreground">
          {loading ? t.saving : editingItem ? t.updateService : t.createService}
        </Button>
      </div>
    </form>
  );

  const renderAlterationForm = () => (
    <form onSubmit={alterationFormik.handleSubmit} className="space-y-6 p-4 bg-background rounded-lg shadow-elegant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label={t.serviceName}
          name="serviceName"
          value={alterationFormik.values.serviceName}
          onChange={alterationFormik.handleChange}
          onBlur={alterationFormik.handleBlur}
          error={alterationFormik.errors.serviceName}
          placeholder={t.serviceName}
          isRequired
        />
        <InputField
          label={t.basePrice}
          name="basePrice"
          type="number"
          value={alterationFormik.values.basePrice}
          onChange={alterationFormik.handleChange}
          onBlur={alterationFormik.handleBlur}
          error={alterationFormik.errors.basePrice}
          placeholder={t.basePrice}
          isRequired
        />
        <InputField
          label={t.expressPrice}
          name="expressPrice"
          type="number"
          value={alterationFormik.values.expressPrice}
          onChange={alterationFormik.handleChange}
          onBlur={alterationFormik.handleBlur}
          error={alterationFormik.errors.expressPrice}
          placeholder={t.expressPrice}
        />
        <InputField
          label={t.expressDelivery}
          name="expressDelivery"
          type="checkbox"
          checked={alterationFormik.values.expressDelivery}
          onChange={alterationFormik.handleChange}
          onBlur={alterationFormik.handleBlur}
          error={alterationFormik.errors.expressDelivery}
        />
        <InputField
          label={t.expressDuration}
          name="expressDuration"
          type="number"
          value={alterationFormik.values.expressDuration}
          onChange={alterationFormik.handleChange}
          onBlur={alterationFormik.handleBlur}
          error={alterationFormik.errors.expressDuration}
          placeholder={t.expressDuration}
        />
        <InputField
          label={t.regularDuration}
          name="regularDuration"
          type="number"
          value={alterationFormik.values.regularDuration}
          onChange={alterationFormik.handleChange}
          onBlur={alterationFormik.handleBlur}
          error={alterationFormik.errors.regularDuration}
          placeholder={t.regularDuration}
        />
        <InputField
          label={t.isActive}
          name="isActive"
          type="checkbox"
          checked={alterationFormik.values.isActive}
          onChange={alterationFormik.handleChange}
          onBlur={alterationFormik.handleBlur}
          error={alterationFormik.errors.isActive}
        />
        <InputField
          label={t.specialty}
          name="specialty"
          type="select"
          value={alterationFormik.values.specialty}
          onChange={alterationFormik.handleChange}
          onBlur={alterationFormik.handleBlur}
          error={alterationFormik.errors.specialty}
          options={specialties.map((s) => ({ value: s._id, label: s.name }))}
          isRequired
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">{t.description}</label>
        <ReactQuill
          theme="snow"
          value={alterationFormik.values.description}
          onChange={(content) => alterationFormik.setFieldValue('description', content)}
          className="bg-background rounded-lg"
        />
      </div>
      <FileInputField
        label={t.images}
        name="images"
        value={alterationFormik.values.images}
        onChange={(files) => handleImageChange(files, alterationFormik)}
        accept="image/*"
        setRemoveList={setRemoveList}
        multiple
      />
      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={loading} className="bg-warning hover:bg-warning-hover text-warning-foreground">
          {loading ? t.saving : editingItem ? t.updateAlteration : t.createAlteration}
        </Button>
      </div>
    </form>
  );

  const renderReadymadeForm = () => {
    const handleAddColor = () => {
      const colorToAdd = hexInput.trim() || currentColor;
      if (colorToAdd && !readymadeFormik.values.colors.includes(colorToAdd)) {
        readymadeFormik.setFieldValue('colors', [...readymadeFormik.values.colors, colorToAdd]);
        setCurrentColor('#ffffff');
        setHexInput('');
        setShowColorPicker(false);
      }
    };

    const handleRemoveColor = (index) => {
      const newColors = [...readymadeFormik.values.colors];
      newColors.splice(index, 1);
      readymadeFormik.setFieldValue('colors', newColors);
    };

    const handleColorSelect = (colorId) => {
      const currentColors = readymadeFormik.values.colors || [];

      if (currentColors.includes(colorId)) {
        readymadeFormik.setFieldValue('colors', currentColors.filter(id => id !== colorId));
      } else {
        readymadeFormik.setFieldValue('colors', [...currentColors, colorId]);
      }
    };

    return (
      <form onSubmit={readymadeFormik.handleSubmit} className="space-y-6 p-4 bg-background rounded-lg shadow-elegant">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label={t.name}
            name="name"
            value={readymadeFormik.values.name}
            onChange={readymadeFormik.handleChange}
            onBlur={readymadeFormik.handleBlur}
            error={readymadeFormik.errors.name}
            placeholder={t.name}
            isRequired
          />
          <InputField
            label={t.price}
            name="price"
            type="number"
            value={readymadeFormik.values.price}
            onChange={readymadeFormik.handleChange}
            onBlur={readymadeFormik.handleBlur}
            error={readymadeFormik.errors.price}
            placeholder={t.price}
            isRequired
          />
          <InputField
            label={t.specialty}
            name="specialty"
            type="select"
            value={readymadeFormik.values.specialty}
            onChange={readymadeFormik.handleChange}
            onBlur={readymadeFormik.handleBlur}
            error={readymadeFormik.errors.specialty}
            options={specialties.map((s) => ({ value: s._id, label: s.name }))}
            isRequired
          />
          <InputField
            label={t.gender}
            name="gender"
            type="select"
            value={readymadeFormik.values.gender}
            onChange={readymadeFormik.handleChange}
            onBlur={readymadeFormik.handleBlur}
            error={readymadeFormik.errors.gender}
            options={[
              { value: 'male', label: t.male },
              { value: 'female', label: t.female },
            ]}
            isRequired
          />
          <InputField
            label={t.fabric}
            name="fabric"
            type="select"
            value={readymadeFormik.values.fabric}
            onChange={readymadeFormik.handleChange}
            onBlur={readymadeFormik.handleBlur}
            error={readymadeFormik.errors.fabric}
            options={fabrics.map((f) => ({ value: f._id, label: f.name }))}
          />
          <InputField
            label={t.isActive}
            name="isActive"
            type="checkbox"
            checked={readymadeFormik.values.isActive}
            onChange={readymadeFormik.handleChange}
            onBlur={readymadeFormik.handleBlur}
            error={readymadeFormik.errors.isActive}
          />
          <InputField
            label={t.stockQuantity}
            name="stock_qty"
            type="number"
            value={readymadeFormik.values.stock_qty}
            onChange={readymadeFormik.handleChange}
            onBlur={readymadeFormik.handleBlur}
            error={readymadeFormik.errors.stock_qty}
            placeholder={t.stockQuantity}
            isRequired
          />
          {activeTax && (
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-sm font-medium text-foreground mb-4">Tax</p>
              <p className="text-sm text-muted-foreground">
                {activeTax.taxName} ({activeTax.value} {activeTax.valueType === "percentage" ? '%' : 'AED'})
              </p>
              <input type="hidden" name="taxMaster" value={activeTax._id} />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{t.description}</label>
          <ReactQuill
            theme="snow"
            value={readymadeFormik.values.description}
            onChange={(content) => readymadeFormik.setFieldValue('description', content)}
            className="bg-background rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground mb-2">{t.colors}</label>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Input Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="p-2 border border-input rounded-md bg-background hover:bg-accent"
                    title={t.colorPicker}
                  >
                    <div className="w-8 h-8 rounded border" style={{ backgroundColor: currentColor }} />
                  </button>
                  {showColorPicker && (
                    <div className="absolute top-full left-0 z-10 mt-2 p-4 bg-background border border-input rounded-md shadow-lg">
                      <HexColorPicker color={currentColor} onChange={setCurrentColor} />
                      <div className="mt-3 flex items-center gap-2">
                        <input
                          type="text"
                          value={hexInput}
                          onChange={(e) => setHexInput(e.target.value)}
                          placeholder={t.enterHexCode}
                          className="flex-1 p-2 border border-input rounded-md text-sm outline-none"
                        />
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: hexInput || currentColor }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  placeholder={t.enterHexCode}
                  className="flex-1 p-3 border border-input rounded-md bg-background text-foreground"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddColor();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-hover whitespace-nowrap"
                >
                  {t.addColor}
                </button>
              </div>

              {/* Selected Colors List */}
              <div className="flex flex-wrap gap-2">
                {readymadeFormik.values.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                    <div className="w-6 h-6 rounded border" style={{ backgroundColor: color }} />
                    <span className="text-sm font-medium">{color}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="text-destructive hover:text-destructive-hover"
                      title="Remove color"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Available Colors
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Click on colors to select/deselect them for your profile
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {colors.map((color) => {
                  const isSelected = readymadeFormik.values.colors.includes(color._id);

                  return (
                    <div
                      key={color._id}
                      className={`relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'hover:shadow-md'
                        }`}
                      onClick={() => handleColorSelect(color.value)}
                      title={color.name}
                    >
                      <div
                        className="w-full h-16 rounded-md mb-2"
                        style={{ backgroundColor: color.value }}
                      />
                      <div className="text-center">
                        <p className="text-sm font-medium truncate">{color.name}</p>
                        <p className="text-xs text-gray-500">{color.value}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-1">
                          <div className="w-4 h-4 flex items-center justify-center">
                            ✓
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {colors.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No colors available
                </p>
              )}
            </div>
          </div>
        </div>

        <FileInputField
          label={t.images}
          name="images"
          value={readymadeFormik.values.images}
          onChange={(files) => handleImageChange(files, readymadeFormik)}
          accept="image/*"
          setRemoveList={setRemoveList}
          multiple
        />
        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary-hover text-primary-foreground">
            {loading ? t.saving : editingItem ? t.updateProduct : t.createProduct}
          </Button>
        </div>
      </form>
    );
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'readymade':
        return renderReadymadeForm();
      case 'alteration':
        return renderAlterationForm();
      default:
        return renderStitchingForm();
    }
  };

  const renderServices = () => {
    const filteredServices = services.filter((service) => {
      const isAlterationService = service?.serviceType?.name.toLowerCase() === 'alteration';
      if (activeTab === 'stitching') return !isAlterationService;
      if (activeTab === 'alteration') return isAlterationService;
      return false;
    });

    const startIndex = (currentPage.services - 1) * itemsPerPage;
    const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedServices.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {activeTab === 'stitching' ? <Scissors size={48} className="mx-auto mb-4" /> : <ShirtIcon size={48} className="mx-auto mb-4" />}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {activeTab === 'stitching' ? t.noStitchingServices : t.noAlterationServices}
          </h3>
          <p className="text-muted-foreground mb-4">
            {activeTab === 'stitching' ? t.stitchingDescription : t.alterationDescription}
          </p>
          <Button
            onClick={() => handleOpenModal(activeTab)}
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            {activeTab === 'stitching' ? t.addStitchingService : t.addAlterationService}
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedServices.map((service) => (
          <Card key={service._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <ImageCarousel
                images={service.images || []}
                alt={service.serviceName || service.name}
                className="h-48"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-foreground line-clamp-1 capitalize">{service.name || service.serviceName}</h3>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleOpenModal(service?.serviceType?.name.toLowerCase() === 'alteration' ? 'alteration' : 'service', service)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service?.serviceType?.name.toLowerCase() === 'alteration' ? 'alteration' : 'service', service._id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm" dangerouslySetInnerHTML={{ __html: service.description }} />
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div className='flex gap-1'>
                    <span className="text-muted-foreground">Price :</span>
                    <span className="font-semibold text-foreground block">{service.basePrice || service.price} AED</span>
                  </div>
                  <div className='flex gap-1'>
                    <span className="text-muted-foreground">Duration :</span>
                    <span className="font-semibold text-foreground block">{service.regularDuration || service.regularDuration || 'N/A'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${service.status === 'active' || service.isActive ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'}`}>
                    {service.status === 'active' || service.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Specialty: {specialties.find((s) => s._id === service?.specialty?._id)?.name || 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderReadymadeItems = () => {
    const startIndex = (currentPage.readymade - 1) * itemsPerPage;
    const paginatedItems = readymadeItems.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedItems.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Package size={48} className="mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{t.noProducts}</h3>
          <p className="text-muted-foreground mb-4">{t.productDescription}</p>
          <Button
            onClick={() => handleOpenModal('readymade')}
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            {t.addProduct}
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedItems.map((item) => (
          <Card key={item._id} className="overflow-hidden shadow-elegant hover:shadow-dramatic transition-all duration-300 bg-card rounded-lg border border-border/50 hover:border-primary/30">
            <CardHeader className="p-0 relative">
              <ImageCarousel images={item.images || []} />
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-success/90 text-success-foreground">Ready-made</Badge>
              </div>
              {item.stockQuantity <= 10 && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant={item.stockQuantity === 0 ? "destructive" : "warning"}>
                    {item.stockQuantity === 0 ? 'Out of Stock' : 'Low Stock'}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground line-clamp-1 capitalize">{item.name}</h3>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleOpenModal('readymade', item)}
                    className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    title="Edit Product"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete('readymade', item._id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-1 text-sm" dangerouslySetInnerHTML={{ __html: item.description }} />

              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div className='flex gap-1'>
                  <span className="text-muted-foreground">Price :</span>
                  <span className="font-semibold text-foreground block">AED {item.price}</span>
                </div>
                <div className='flex gap-1'>
                  <span className="text-muted-foreground">Stock :</span>
                  <span className={`font-semibold block ${item.stockQuantity > 10 ? 'text-success' : item.stockQuantity > 0 ? 'text-warning' : 'text-destructive'}`}>
                    {item.stockQuantity || item.stock_qty || 0}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-muted-foreground capitalize">Gender: {item.gender}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.isAvailable || item.isActive ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'}`}>
                  {item.isAvailable || item.isActive ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        {activeTab !== 'readymade' && (
          <Button
            onClick={() => handleOpenModal(activeTab)}
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <Plus size={20} className="mr-2" />
            {activeTab === 'stitching' ? t.addStitchingService : t.addAlterationService}
          </Button>
        )}

        {activeTab === 'readymade' && (
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1" />
            <Button
              onClick={() => handleOpenModal('readymade')}
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              <Plus size={20} className="mr-2" />
              {t.addProduct}
            </Button>
          </div>
        )}
      </div>

      <div className="flex space-x-4 border-b border-border">
        {['readymade', 'stitching', 'alteration'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${activeTab === tab
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {t[tab]}
          </button>
        ))}
      </div>



      {activeTab === 'readymade' ? renderReadymadeItems() : renderServices()}

      {((activeTab === 'readymade' && readymadeItems.length > itemsPerPage) ||
        (activeTab !== 'readymade' && services.filter(s =>
          activeTab === 'stitching' ? !s.isAlterationService : s.isAlterationService
        ).length > itemsPerPage)) && (
          <Pagination
            currentPage={currentPage[activeTab === 'readymade' ? 'readymade' : 'services']}
            totalPages={Math.ceil(
              (activeTab === 'readymade'
                ? readymadeItems.length
                : services.filter(s =>
                  activeTab === 'stitching' ? !s.isAlterationService : s.isAlterationService
                ).length
              ) / itemsPerPage
            )}
            onPageChange={(page) => setCurrentPage(prev => ({
              ...prev,
              [activeTab === 'readymade' ? 'readymade' : 'services']: page
            }))}
          />
        )}

      <CommonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingItem
            ? `Edit ${modalType === 'readymade' ? "ReadyMade" : modalType === 'alteration' ? "Alteration Service" : "Stitching Service"}`
            : modalType === 'readymade'
              ? t.addProduct
              : modalType === 'alteration'
                ? t.addAlterationService
                : t.addStitchingService
        }
        size="max-w-4xl"
      >
        {renderModalContent()}
      </CommonModal>
    </div>
  );
};

export default Services;