import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Plus, Edit, Trash2, Scissors, Star, Clock, DollarSign, Shirt, Ruler, ShoppingBag, Upload, X } from 'lucide-react';
import CommonModal from '../../components/ui/commonModal';
import InputField from '../../components/ui/InputField';
import { FileInputField } from '../../components/ui/ImageInputField';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import ImageCarousel from '../../components/ui/ImageCarousel';
import { useLanguage } from '../../components/Layout';
import Pagination from '../../components/ui/PaginationAlpha';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { HexColorPicker } from 'react-colorful';
import MasterApi from '../../api/master.api';

const translations = {
  en: {
    title: 'Service Management',
    addService: 'Add Service',
    serviceName: 'Service Name',
    serviceDescription: 'Description',
    serviceCategory: 'Category',
    servicePrice: 'Price',
    serviceTax: 'Tax (%)',
    serviceImages: 'Service Images',
    serviceTime: 'Completion Time (days)',
    serviceDifficulty: 'Difficulty Level',
    enterServiceName: 'Enter service name',
    enterServiceDescription: 'Enter service description',
    enterServicePrice: 'Enter price',
    enterServiceTax: 'Enter tax percentage',
    enterServiceTime: 'Enter completion time',
    selectCategory: 'Select category',
    selectDifficulty: 'Select difficulty level',
    editService: 'Edit Service',
    addNewService: 'Add New Service',
    updateService: 'Update Service',
    deleteConfirm: 'Are you sure you want to delete this service?',
    createdSuccess: 'Service created successfully',
    updatedSuccess: 'Service updated successfully',
    deletedSuccess: 'Service deleted successfully',
    nameRequired: 'Service name is required',
    nameMin: 'Service name must be at least 2 characters',
    nameMax: 'Service name must be less than 100 characters',
    descriptionRequired: 'Description is required',
    priceRequired: 'Price is required',
    priceMin: 'Price must be at least 1',
    taxRequired: 'Tax is required',
    taxMin: 'Tax must be at least 0',
    taxMax: 'Tax cannot exceed 100',
    timeRequired: 'Completion time is required',
    timeMin: 'Completion time must be at least 1 day',
    categoryRequired: 'Category is required',
    difficultyRequired: 'Difficulty level is required',
    imageRequired: 'At least one image is required',
    imageMin: 'At least one image is required',
    image: 'Image',
    name: 'Name',
    description: 'Description',
    price: 'Price',
    tax: 'Tax',
    time: 'Time',
    category: 'Category',
    difficulty: 'Difficulty',
    actions: 'Actions',
    services: 'services',
    readymade: 'Readymade',
    customization: 'Customization',
    alteration: 'Alteration',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
    all: 'All',
    popularity: 'Popularity',
    orders: 'Orders',
    features: 'Features',
    startingPrice: 'Starting Price',
    completionTime: 'Completion Time',
    serviceCatalog: 'Service Catalog',
    manageServices: 'Manage your tailoring services and pricing',
    totalServices: 'Total Services',
    avgRating: 'Avg. Rating',
    totalOrders: 'Total Orders',
    avgPrice: 'Avg. Price',
    serviceCategories: 'Service Categories',
    performance: 'Performance',
    revenue: 'Revenue',
    chooseServiceType: 'Choose Service Type',
    readyMadeDesc: 'Pre-made garments available for immediate purchase',
    customizationDesc: 'Custom tailored garments made to your measurements',
    alterationDesc: 'Professional alterations for existing garments',
    select: 'Select',
    // Customization fields
    garmentType: 'Garment Type',
    selectGarmentType: 'Select garment type',
    fabricType: 'Fabric Type',
    selectFabricType: 'Select fabric type',
    fabricQuantity: 'Fabric Quantity (meters)',
    enterFabricQuantity: 'Enter fabric quantity',
    styleOptions: 'Style Options',
    selectStyleOptions: 'Select style options',
    colorPattern: 'Color/Pattern',
    enterColorPattern: 'Enter color/pattern',
    urgencyFee: 'Urgency Fee (AED)',
    enterUrgencyFee: 'Enter urgency fee',
    // Alteration fields
    originalMeasurements: 'Original Measurements',
    enterOriginalMeasurements: 'Enter original measurements',
    desiredChanges: 'Desired Changes',
    enterDesiredChanges: 'Enter desired changes',
    fabricMaterialNotes: 'Fabric/Material Notes',
    enterFabricMaterialNotes: 'Enter fabric/material notes',
    beforePhotos: 'Before Photos',
    afterPhotos: 'After Photos',
    // Readymade specific fields
    productName: 'Product Name',
    enterProductName: 'Enter product name',
    fabric: 'Fabric',
    selectFabric: 'Select fabric',
    gender: 'Gender',
    selectGender: 'Select gender',
    stock: 'Stock Quantity',
    enterStock: 'Enter stock quantity',
    isActive: 'Is Active',
    colors: 'Colors',
    addColor: 'Add Color',
    removeColor: 'Remove Color',
    // Gender options
    male: 'Male',
    female: 'Female',
    unisex: 'Unisex',
    // Readymade fields (from original)
    productId: 'Product ID',
    enterProductId: 'Enter product ID',
    size: 'Size',
    selectSize: 'Select size',
    quantity: 'Quantity',
    enterQuantity: 'Enter quantity',
    material: 'Material',
    enterMaterial: 'Enter material',
    brandSupplier: 'Brand/Supplier',
    enterBrandSupplier: 'Enter brand/supplier',
    deliveryShipping: 'Delivery/Shipping Details',
    enterDeliveryShipping: 'Enter delivery/shipping details',
    barcode: 'Barcode',
    enterBarcode: 'Enter barcode',
    warrantyReturnPolicy: 'Warranty/Return Policy',
    enterWarrantyReturnPolicy: 'Enter warranty/return policy'
  },
  ar: {
    title: 'إدارة الخدمات',
    addService: 'إضافة خدمة',
    serviceName: 'اسم الخدمة',
    serviceDescription: 'الوصف',
    serviceCategory: 'الفئة',
    servicePrice: 'السعر',
    serviceTax: 'الضريبة (%)',
    serviceImages: 'صور الخدمة',
    serviceTime: 'وقت الإنجاز (أيام)',
    serviceDifficulty: 'مستوى الصعوبة',
    enterServiceName: 'أدخل اسم الخدمة',
    enterServiceDescription: 'أدخل وصف الخدمة',
    enterServicePrice: 'أدخل السعر',
    enterServiceTax: 'أدخل نسبة الضريبة',
    enterServiceTime: 'أدخل وقت الإنجاز',
    selectCategory: 'اختر الفئة',
    selectDifficulty: 'اختر مستوى الصعوبة',
    editService: 'تعديل الخدمة',
    addNewService: 'إضافة خدمة جديدة',
    updateService: 'تحديث الخدمة',
    deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذه الخدمة؟',
    createdSuccess: 'تم إنشاء الخدمة بنجاح',
    updatedSuccess: 'تم تحديث الخدمة بنجاح',
    deletedSuccess: 'تم حذف الخدمة بنجاح',
    nameRequired: 'اسم الخدمة مطلوب',
    nameMin: 'يجب أن يكون اسم الخدمة على الأقل حرفين',
    nameMax: 'يجب أن يكون اسم الخدمة أقل من 100 حرف',
    descriptionRequired: 'الوصف مطلوب',
    priceRequired: 'السعر مطلوب',
    priceMin: 'يجب أن يكون السعر على الأقل 1',
    taxRequired: 'الضريبة مطلوبة',
    taxMin: 'يجب أن تكون الضريبة على الأقل 0',
    taxMax: 'لا يمكن أن تتجاوز الضريبة 100',
    timeRequired: 'وقت الإنجاز مطلوب',
    timeMin: 'يجب أن يكون وقت الإنجاز على الأقل يوم واحد',
    categoryRequired: 'الفئة مطلوبة',
    difficultyRequired: 'مستوى الصعوبة مطلوب',
    imageRequired: 'مطلوب صورة واحدة على الأقل',
    imageMin: 'مطلوب صورة واحدة على الأقل',
    image: 'الصورة',
    name: 'الاسم',
    description: 'الوصف',
    price: 'السعر',
    tax: 'الضريبة',
    time: 'الوقت',
    category: 'الفئة',
    difficulty: 'الصعوبة',
    actions: 'الإجراءات',
    services: 'الخدمات',
    readymade: 'جاهز',
    customization: 'تخصيص',
    alteration: 'تعديل',
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    expert: 'خبير',
    all: 'الكل',
    popularity: 'الشعبية',
    orders: 'الطلبات',
    features: 'الميزات',
    startingPrice: 'السعر الأساسي',
    completionTime: 'وقت الإنجاز',
    serviceCatalog: 'كتالوج الخدمات',
    manageServices: 'إدارة خدمات الخياطة والأسعار',
    totalServices: 'إجمالي الخدمات',
    avgRating: 'متوسط التقييم',
    totalOrders: 'إجمالي الطلبات',
    avgPrice: 'متوسط السعر',
    serviceCategories: 'فئات الخدمات',
    performance: 'الأداء',
    revenue: 'الإيرادات',
    chooseServiceType: 'اختر نوع الخدمة',
    readyMadeDesc: 'ملابس جاهزة متاحة للشراء الفوري',
    customizationDesc: 'ملابس مخصصة مصنوعة حسب قياساتك',
    alterationDesc: 'تعديلات احترافية للملابس الموجودة',
    select: 'اختر',
    // Customization fields
    garmentType: 'نوع الملابس',
    selectGarmentType: 'اختر نوع الملابس',
    fabricType: 'نوع القماش',
    selectFabricType: 'اختر نوع القماش',
    fabricQuantity: 'كمية القماش (أمتار)',
    enterFabricQuantity: 'أدخل كمية القماش',
    styleOptions: 'خيارات النمط',
    selectStyleOptions: 'اختر خيارات النمط',
    colorPattern: 'اللون/النمط',
    enterColorPattern: 'أدخل اللون/النمط',
    urgencyFee: 'رسوم الاستعجال (درهم)',
    enterUrgencyFee: 'أدخل رسوم الاستعجال',
    // Alteration fields
    originalMeasurements: 'القياسات الأصلية',
    enterOriginalMeasurements: 'أدخل القياسات الأصلية',
    desiredChanges: 'التغييرات المطلوبة',
    enterDesiredChanges: 'أدخل التغييرات المطلوبة',
    fabricMaterialNotes: 'ملاحظات القماش/المادة',
    enterFabricMaterialNotes: 'أدخل ملاحظات القماش/المادة',
    beforePhotos: 'الصور قبل التعديل',
    afterPhotos: 'الصور بعد التعديل',
    // Readymade specific fields
    productName: 'اسم المنتج',
    enterProductName: 'أدخل اسم المنتج',
    fabric: 'القماش',
    selectFabric: 'اختر القماش',
    gender: 'الجنس',
    selectGender: 'اختر الجنس',
    stock: 'الكمية في المخزون',
    enterStock: 'أدخل الكمية في المخزون',
    isActive: 'نشط',
    colors: 'الألوان',
    addColor: 'إضافة لون',
    removeColor: 'إزالة اللون',
    // Gender options
    male: 'ذكر',
    female: 'أنثى',
    unisex: 'للجنسين',
    // Readymade fields (from original)
    productId: 'معرف المنتج',
    enterProductId: 'أدخل معرف المنتج',
    size: 'المقاس',
    selectSize: 'اختر المقاس',
    quantity: 'الكمية',
    enterQuantity: 'أدخل الكمية',
    material: 'المادة',
    enterMaterial: 'أدخل المادة',
    brandSupplier: 'العلامة التجارية/المورد',
    enterBrandSupplier: 'أدخل العلامة التجارية/المورد',
    deliveryShipping: 'تفاصيل التسليم/الشحن',
    enterDeliveryShipping: 'أدخل تفاصيل التسليم/الشحن',
    barcode: 'الباركود',
    enterBarcode: 'أدخل الباركود',
    warrantyReturnPolicy: 'سياسة الضمان/الاسترجاع',
    enterWarrantyReturnPolicy: 'أدخل سياسة الضمان/الاسترجاع'
  }
};

const dummyServices = [
  {
    id: 1,
    name: 'Traditional Kandura',
    category: 'customization',
    description: 'Authentic Emirati kandura with traditional cut and fit',
    basePrice: 400,
    tax: 5,
    timeRequired: '5-7 days',
    difficulty: 'expert',
    popularity: 95,
    orders: 234,
    rating: 4.9,
    images: ['/img/kandura1.jpg', '/img/kandura2.jpg'],
    garmentType: 'kandura',
    fabric: 'cotton',
    styleOptions: ['traditional collar', 'hand-stitched details'],
    colorPattern: 'white',
    urgencyFee: 50,
    features: [
      'Premium fabric',
      'Hand-stitched details',
      'Traditional collar',
      'Perfect fit guarantee'
    ]
  },
  {
    id: 2,
    name: 'Elegant Abaya',
    category: 'customization',
    description: 'Modern abaya designs with traditional elegance',
    basePrice: 350,
    tax: 5,
    timeRequired: '4-6 days',
    difficulty: 'advanced',
    popularity: 88,
    orders: 189,
    rating: 4.8,
    images: ['/img/abaya1.jpg', '/img/abaya2.jpg'],
    garmentType: 'abaya',
    fabric: 'silk',
    styleOptions: ['embroidery', 'custom sizing'],
    colorPattern: 'black',
    urgencyFee: 40,
    features: [
      'Multiple color options',
      'Embroidery available',
      'Custom sizing',
      'Quality fabric'
    ]
  },
  {
    id: 3,
    name: 'Luxury Bisht',
    category: 'readymade',
    description: 'Premium bisht for special occasions and formal events',
    basePrice: 800,
    tax: 5,
    timeRequired: '7-10 days',
    difficulty: 'expert',
    popularity: 76,
    orders: 67,
    rating: 4.9,
    images: ['/img/bisht1.jpg', '/img/bisht2.jpg'],
    productName: 'Luxury Bisht',
    garmentType: 'bisht',
    fabric: 'wool',
    gender: 'male',
    stock: 10,
    isActive: true,
    colors: ['#000000', '#FFD700'],
    productId: 'BISHT-001',
    size: 'L',
    material: 'Premium wool with gold embroidery',
    brandSupplier: 'Luxury Tailors UAE',
    deliveryShipping: '2-3 business days within UAE',
    barcode: '1234567890123',
    warrantyReturnPolicy: '30 days return policy',
    features: [
      'Gold embroidery',
      'Premium materials',
      'Traditional cut',
      'Special occasion ready'
    ]
  },
  {
    id: 4,
    name: 'Alterations Service',
    category: 'alteration',
    description: 'Professional alterations for all types of garments',
    basePrice: 80,
    tax: 5,
    timeRequired: '1-3 days',
    difficulty: 'intermediate',
    popularity: 92,
    orders: 456,
    rating: 4.7,
    images: ['/img/alteration1.jpg', '/img/alteration2.jpg'],
    garmentType: 'jeans',
    originalMeasurements: 'Waist: 34in, Length: 32in',
    desiredChanges: 'Shorten length by 2in, Take in waist by 1in',
    fabricMaterialNotes: 'Denim material, handle with care',
    beforePhotos: ['/img/before1.jpg'],
    afterPhotos: ['/img/after1.jpg'],
    urgencyFee: 20,
    features: [
      'Quick turnaround',
      'Size adjustments',
      'Hemming service',
      'Affordable pricing'
    ]
  }
];

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState(dummyServices);
  const [categories, setCategories] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(-1);
  const { language } = useLanguage();
  const itemsPerPage = 2;

  const t = translations[language || 'en'];

  // Category options for select
  const categoryOptions = categories.map((category) => ({
    value: category?._id,
    label: category?.name
  }));

  // Difficulty options for select
  const difficultyOptions = [
    { value: 'beginner', label: t.beginner },
    { value: 'intermediate', label: t.intermediate },
    { value: 'advanced', label: t.advanced },
    { value: 'expert', label: t.expert }
  ];

  // Garment type options
  const garmentTypeOptions = [
    { value: 'kandura', label: 'Kandura' },
    { value: 'abaya', label: 'Abaya' },
    { value: 'bisht', label: 'Bisht' },
    { value: 'shirt', label: 'Shirt' },
    { value: 'pants', label: 'Pants' },
    { value: 'suit', label: 'Suit' },
    { value: 'dress', label: 'Dress' },
    { value: 'jeans', label: 'Jeans' }
  ];

  // Gender options
  const genderOptions = [
    { value: 'male', label: t.male },
    { value: 'female', label: t.female },
    { value: 'unisex', label: t.unisex }
  ];

  // Fabric type options
  const fabricOptions = fabrics.map(fabric => ({
    value: fabric._id,
    label: fabric.name
  }));

  // Size options
  const sizeOptions = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' }
  ];

  // Style options
  const styleOptions = [
    { value: 'traditional collar', label: 'Traditional Collar' },
    { value: 'mandarin collar', label: 'Mandarin Collar' },
    { value: 'french cuffs', label: 'French Cuffs' },
    { value: 'single cuffs', label: 'Single Cuffs' },
    { value: 'embroidery', label: 'Embroidery' },
    { value: 'custom sizing', label: 'Custom Sizing' },
    { value: 'hand-stitched', label: 'Hand-Stitched Details' }
  ];

  // React Quill modules
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const validationSchema = Yup.object().shape({
    // Common fields
    name: Yup.string()
      .required(t.nameRequired)
      .min(2, t.nameMin)
      .max(100, t.nameMax),
    description: Yup.string()
      .required(t.descriptionRequired),
    price: Yup.number()
      .required(t.priceRequired)
      .min(1, t.priceMin),
    tax: Yup.number()
      .required(t.taxRequired)
      .min(0, t.taxMin)
      .max(100, t.taxMax),
    timeRequired: Yup.string()
      .required(t.timeRequired),
    category: Yup.string()
      .required(t.categoryRequired),
    difficulty: Yup.string()
      .required(t.difficultyRequired),
    images: Yup.array()
      .min(1, t.imageMin)
      .required(t.imageRequired),

    // Readymade specific fields
    productName: Yup.string().when('category', {
      is: 'readymade',
      then: (schema) => schema.required('Product name is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    garmentType: Yup.string().when('category', {
      is: (category) => ['readymade', 'customization', 'alteration'].includes(category),
      then: (schema) => schema.required('Garment type is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    fabric: Yup.string().when('category', {
      is: (category) => ['readymade', 'customization'].includes(category),
      then: (schema) => schema.required('Fabric is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    gender: Yup.string().when('category', {
      is: 'readymade',
      then: (schema) => schema.required('Gender is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    stock: Yup.number().when('category', {
      is: 'readymade',
      then: (schema) => schema.required('Stock is required').min(0, 'Stock cannot be negative'),
      otherwise: (schema) => schema.notRequired()
    }),
    colors: Yup.array().when('category', {
      is: 'readymade',
      then: (schema) => schema.min(1, 'At least one color is required'),
      otherwise: (schema) => schema.notRequired()
    }),

    // Customization fields
    styleOptions: Yup.array().when('category', {
      is: 'customization',
      then: (schema) => schema.min(1, 'At least one style option is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    colorPattern: Yup.string().when('category', {
      is: 'customization',
      then: (schema) => schema.required('Color pattern is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    urgencyFee: Yup.number().when('category', {
      is: (category) => ['customization', 'alteration'].includes(category),
      then: (schema) => schema.min(0, 'Urgency fee cannot be negative'),
      otherwise: (schema) => schema.notRequired()
    }),

    // Alteration fields
    originalMeasurements: Yup.string().when('category', {
      is: 'alteration',
      then: (schema) => schema.required('Original measurements are required'),
      otherwise: (schema) => schema.notRequired()
    }),
    desiredChanges: Yup.string().when('category', {
      is: 'alteration',
      then: (schema) => schema.required('Desired changes are required'),
      otherwise: (schema) => schema.notRequired()
    }),
    fabricMaterialNotes: Yup.string().when('category', {
      is: 'alteration',
      then: (schema) => schema.required('Fabric material notes are required'),
      otherwise: (schema) => schema.notRequired()
    }),
    beforePhotos: Yup.array().when('category', {
      is: 'alteration',
      then: (schema) => schema.min(1, 'At least one before photo is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    afterPhotos: Yup.array(),

    // Optional readymade fields
    productId: Yup.string(),
    size: Yup.string(),
    quantity: Yup.number().when('category', {
      is: 'readymade',
      then: (schema) => schema.min(1, 'Quantity must be at least 1'),
      otherwise: (schema) => schema.notRequired()
    }),
    material: Yup.string(),
    brandSupplier: Yup.string(),
    deliveryShipping: Yup.string(),
    barcode: Yup.string(),
    warrantyReturnPolicy: Yup.string()
  });

  // Get categories from API
  const getAllCategories = async () => {
    try {
      const res = await MasterApi.getCategories();
      setCategories(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get fabrics from API
  const getAllFabrics = async () => {
    try {
      // Uncomment when API is ready
      // const res = await MasterApi.getFabrics();
      // setFabrics(res.data?.data);

      // Using dummy fabrics for now
      setFabrics([
        { _id: '1', name: 'Cotton' },
        { _id: '2', name: 'Silk' },
        { _id: '3', name: 'Wool' },
        { _id: '4', name: 'Linen' },
        { _id: '5', name: 'Polyester' }
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  // Get active tax from API
  const getActiveTax = async () => {
    try {
      // Uncomment when API is ready
      // const res = await MasterApi.getActiveTax();
      // setTaxes(res.data?.data);

      // Using dummy tax for now
      setTaxes([{ _id: '1', rate: 5, isActive: true }]);
    } catch (err) {
      console.log(err);
    }
  };

  // Get services from API
  const getAllServices = async () => {
    try {
      // Uncomment when API is ready
      // const res = await MasterApi.getServices();
      // setServices(res.data?.data);

      // Using dummy services for now
      setServices(dummyServices);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllFabrics();
    getActiveTax();
    getAllServices();
  }, [t]); // Add t to dependencies to update labels when language changes

  const formik = useFormik({
    initialValues: {
      // Common fields
      name: '',
      description: '',
      price: '',
      tax: taxes[0]?.rate || 5,
      timeRequired: '',
      category: '',
      difficulty: '',
      images: [],
      features: [],
      // Readymade specific fields
      productName: '',
      garmentType: '',
      fabric: '',
      gender: '',
      stock: '',
      isActive: true,
      colors: ['#000000'],
      // Customization fields
      styleOptions: [],
      colorPattern: '',
      urgencyFee: '',
      // Alteration fields
      originalMeasurements: '',
      desiredChanges: '',
      fabricMaterialNotes: '',
      beforePhotos: [],
      afterPhotos: [],
      // Original readymade fields
      productId: '',
      size: '',
      quantity: '',
      material: '',
      brandSupplier: '',
      deliveryShipping: '',
      barcode: '',
      warrantyReturnPolicy: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        // Add common fields
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("tax", values.tax);
        formData.append("timeRequired", values.timeRequired);
        formData.append("category", values.category);
        formData.append("difficulty", values.difficulty);

        // Add category-specific fields
        if (values.category === 'readymade') {
          formData.append("productName", values.productName);
          formData.append("garmentType", values.garmentType);
          formData.append("fabric", values.fabric);
          formData.append("gender", values.gender);
          formData.append("stock", values.stock);
          formData.append("isActive", values.isActive);
          formData.append("colors", JSON.stringify(values.colors));
          formData.append("productId", values.productId || '');
          formData.append("size", values.size || '');
          formData.append("quantity", values.quantity || '');
          formData.append("material", values.material || '');
          formData.append("brandSupplier", values.brandSupplier || '');
          formData.append("deliveryShipping", values.deliveryShipping || '');
          formData.append("barcode", values.barcode || '');
          formData.append("warrantyReturnPolicy", values.warrantyReturnPolicy || '');
        } else if (values.category === 'customization') {
          formData.append("garmentType", values.garmentType);
          formData.append("fabric", values.fabric);
          formData.append("styleOptions", JSON.stringify(values.styleOptions));
          formData.append("colorPattern", values.colorPattern);
          formData.append("urgencyFee", values.urgencyFee || 0);
        } else if (values.category === 'alteration') {
          formData.append("garmentType", values.garmentType);
          formData.append("originalMeasurements", values.originalMeasurements);
          formData.append("desiredChanges", values.desiredChanges);
          formData.append("fabricMaterialNotes", values.fabricMaterialNotes);
          formData.append("urgencyFee", values.urgencyFee || 0);
        }

        // Add features if any
        if (values.features && values.features.length > 0) {
          formData.append("features", JSON.stringify(values.features));
        }

        // Add images
        if (values.images) {
          const imagesArray = Array.isArray(values.images) ? values.images : [values.images];
          imagesArray.forEach((file) => {
            formData.append("images", file);
          });
        }

        // Add before photos for alterations
        if (values.beforePhotos && values.category === 'alteration') {
          const beforePhotosArray = Array.isArray(values.beforePhotos) ? values.beforePhotos : [values.beforePhotos];
          beforePhotosArray.forEach((file) => {
            formData.append("beforePhotos", file);
          });
        }

        // Add after photos for alterations
        if (values.afterPhotos && values.category === 'alteration') {
          const afterPhotosArray = Array.isArray(values.afterPhotos) ? values.afterPhotos : [values.afterPhotos];
          afterPhotosArray.forEach((file) => {
            formData.append("afterPhotos", file);
          });
        }

        console.log('Form data payload:', Object.fromEntries(formData));

        // Uncomment when API is ready
        /*
        const res = editingService 
          ? await MasterApi.updateService(editingService?.id, formData) 
          : await MasterApi.createService(formData);
        
        setServices(res?.data?.data);
        */

        toast.success(editingService ? t.updatedSuccess : t.createdSuccess);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'Something went wrong');
      } finally {
        handleCloseModal();
        getAllServices();
      }
    }
  });

  const handleInputChange = (e) => {
    formik.handleChange(e);
  };

  const handleImageChange = (files) => {
    formik.setFieldValue('images', files);
  };

  const handleBeforePhotosChange = (files) => {
    formik.setFieldValue('beforePhotos', files);
  };

  const handleAfterPhotosChange = (files) => {
    formik.setFieldValue('afterPhotos', files);
  };

  const handleAddColor = () => {
    const newColors = [...formik.values.colors, '#000000'];
    formik.setFieldValue('colors', newColors);
  };

  const handleRemoveColor = (index) => {
    const newColors = [...formik.values.colors];
    newColors.splice(index, 1);
    formik.setFieldValue('colors', newColors);
  };

  const handleColorChange = (color, index) => {
    const newColors = [...formik.values.colors];
    newColors[index] = color;
    formik.setFieldValue('colors', newColors);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    const formValues = {
      name: service.name,
      description: service.description,
      price: service.basePrice,
      tax: service.tax,
      timeRequired: service.timeRequired,
      category: service.category,
      difficulty: service.difficulty,
      images: service.images,
      features: service.features || [],
      productName: service.productName || '',
      garmentType: service.garmentType || '',
      fabric: service.fabric || '',
      gender: service.gender || '',
      stock: service.stock || '',
      isActive: service.isActive !== undefined ? service.isActive : true,
      colors: service.colors || ['#000000'],
      styleOptions: service.styleOptions || [],
      colorPattern: service.colorPattern || '',
      urgencyFee: service.urgencyFee || '',
      originalMeasurements: service.originalMeasurements || '',
      desiredChanges: service.desiredChanges || '',
      fabricMaterialNotes: service.fabricMaterialNotes || '',
      beforePhotos: service.beforePhotos || [],
      afterPhotos: service.afterPhotos || [],
      productId: service.productId || '',
      size: service.size || '',
      quantity: service.quantity || '',
      material: service.material || '',
      brandSupplier: service.brandSupplier || '',
      deliveryShipping: service.deliveryShipping || '',
      barcode: service.barcode || '',
      warrantyReturnPolicy: service.warrantyReturnPolicy || ''
    };
    formik.setValues(formValues);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        // Uncomment when API is ready
        // await MasterApi.deleteService(id);

        setServices(prev => prev.filter(service => service.id !== id));
        toast.success(t.deletedSuccess);
      } catch (err) {
        console.log(err);
      } finally {
        getAllServices();
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCategoryModalOpen(false);
    setEditingService(null);
    formik.resetForm();
    setColorPickerOpen(false);
  };

  const handleAddNew = () => {
    setEditingService(null);
    formik.resetForm();
    if (taxes.length > 0) {
      formik.setFieldValue('tax', taxes[0].rate);
    }
    setIsCategoryModalOpen(true);
  };

  const handleCategorySelect = (category) => {
    formik.setFieldValue('category', category);
    setIsCategoryModalOpen(false);
    setIsModalOpen(true);
  };

  // Filter services by category
  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const currentServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getDifficultyBadge = (difficulty) => {
    const difficultyConfig = {
      'expert': { class: 'bg-gold/10 text-gold-dark', label: t.expert },
      'advanced': { class: 'bg-primary/10 text-primary', label: t.advanced },
      'intermediate': { class: 'bg-success/10 text-success', label: t.intermediate },
      'beginner': { class: 'bg-secondary/50 text-secondary-foreground', label: t.beginner }
    };
    const config = difficultyConfig[difficulty] || { class: 'bg-secondary/50 text-secondary-foreground', label: difficulty };
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'text-gold';
    if (popularity >= 80) return 'text-success';
    if (popularity >= 70) return 'text-primary';
    return 'text-muted-foreground';
  };

  // Calculate stats
  const totalServicesCount = services.length;
  const avgRating = services.length ? services.reduce((sum, service) => sum + service.rating, 0) / services.length : 0;
  const totalOrders = services.reduce((sum, service) => sum + service.orders, 0);
  const avgPrice = services.length ? services.reduce((sum, service) => sum + service.basePrice, 0) / services.length : 0;

  // Render category-specific fields in the form
  const renderCategorySpecificFields = () => {
    switch (formik.values.category) {
      case 'readymade':
        return (
          <>
            <InputField
              label={t.productName}
              name="productName"
              type="text"
              value={formik.values.productName}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterProductName}
              error={formik.touched.productName && formik.errors.productName}
              isRequired={true}
            />
            <InputField
              label={t.garmentType}
              name="garmentType"
              type="select"
              value={formik.values.garmentType}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={garmentTypeOptions}
              placeholder={t.selectGarmentType}
              error={formik.touched.garmentType && formik.errors.garmentType}
              isRequired={true}
            />
            <InputField
              label={t.fabric}
              name="fabric"
              type="select"
              value={formik.values.fabric}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={fabricOptions}
              placeholder={t.selectFabric}
              error={formik.touched.fabric && formik.errors.fabric}
              isRequired={true}
            />
            <InputField
              label={t.gender}
              name="gender"
              type="select"
              value={formik.values.gender}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={genderOptions}
              placeholder={t.selectGender}
              error={formik.touched.gender && formik.errors.gender}
              isRequired={true}
            />
            <InputField
              label={t.stock}
              name="stock"
              type="number"
              value={formik.values.stock}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterStock}
              error={formik.touched.stock && formik.errors.stock}
              isRequired={true}
              min="0"
            />
            <InputField
              label={t.isActive}
              name="isActive"
              type="checkbox"
              checked={formik.values.isActive}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
            />
            <div className="mb-4">
              <label className="block capitalize text-gray-700 font-medium mb-2">
                {t.colors} <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formik.values.colors.map((color, index) => (
                  <div key={index} className="relative">
                    <div
                      className="w-10 h-10 rounded-md cursor-pointer border border-gray-300"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setCurrentColorIndex(index);
                        setColorPickerOpen(true);
                      }}
                    />
                    {formik.values.colors.length > 1 && (
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        onClick={() => handleRemoveColor(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="w-10 h-10 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500"
                  onClick={handleAddColor}
                >
                  +
                </button>
              </div>
              {colorPickerOpen && (
                <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                  <HexColorPicker
                    color={formik.values.colors[currentColorIndex]}
                    onChange={(color) => handleColorChange(color, currentColorIndex)}
                  />
                  <div className="mt-2 flex justify-between">
                    <span>{formik.values.colors[currentColorIndex]}</span>
                    <button
                      type="button"
                      className="text-sm text-blue-600"
                      onClick={() => setColorPickerOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
              {formik.touched.colors && formik.errors.colors && (
                <div className="text-red-500 text-sm">{formik.errors.colors}</div>
              )}
            </div>

            {/* <InputField
              label={t.productId}
              name="productId"
              type="text"
              value={formik.values.productId}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterProductId}
              error={formik.touched.productId && formik.errors.productId}
            /> */}
            {/* <InputField
              label={t.size}
              name="size"
              type="select"
              value={formik.values.size}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={sizeOptions}
              placeholder={t.selectSize}
              error={formik.touched.size && formik.errors.size}
            /> */}
            {/* <InputField
              label={t.quantity}
              name="quantity"
              type="number"
              value={formik.values.quantity}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterQuantity}
              error={formik.touched.quantity && formik.errors.quantity}
              min="1"
            /> */}
            {/* <InputField
              label={t.material}
              name="material"
              type="text"
              value={formik.values.material}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterMaterial}
              error={formik.touched.material && formik.errors.material}
            /> */}
            {/* <InputField
              label={t.brandSupplier}
              name="brandSupplier"
              type="text"
              value={formik.values.brandSupplier}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterBrandSupplier}
              error={formik.touched.brandSupplier && formik.errors.brandSupplier}
            />
            <InputField
              label={t.deliveryShipping}
              name="deliveryShipping"
              type="textarea"
              value={formik.values.deliveryShipping}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterDeliveryShipping}
              error={formik.touched.deliveryShipping && formik.errors.deliveryShipping}
            /> */}
            {/* <InputField
              label={t.barcode}
              name="barcode"
              type="text"
              value={formik.values.barcode}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterBarcode}
            />
            <InputField
              label={t.warrantyReturnPolicy}
              name="warrantyReturnPolicy"
              type="textarea"
              value={formik.values.warrantyReturnPolicy}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterWarrantyReturnPolicy}
            /> */}
          </>
        );
      case 'customization':
        return (
          <>
            <InputField
              label={t.garmentType}
              name="garmentType"
              type="select"
              value={formik.values.garmentType}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={garmentTypeOptions}
              placeholder={t.selectGarmentType}
              error={formik.touched.garmentType && formik.errors.garmentType}
              isRequired={true}
            />
            <InputField
              label={t.fabric}
              name="fabric"
              type="select"
              value={formik.values.fabric}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={fabricOptions}
              placeholder={t.selectFabric}
              error={formik.touched.fabric && formik.errors.fabric}
              isRequired={true}
            />
            <InputField
              label={t.styleOptions}
              name="styleOptions"
              type="select"
              value={formik.values.styleOptions}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={styleOptions}
              placeholder={t.selectStyleOptions}
              error={formik.touched.styleOptions && formik.errors.styleOptions}
              isRequired={true}
              isMulti={true}
            />
            <InputField
              label={t.colorPattern}
              name="colorPattern"
              type="text"
              value={formik.values.colorPattern}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterColorPattern}
              error={formik.touched.colorPattern && formik.errors.colorPattern}
              isRequired={true}
            />
            <InputField
              label={t.urgencyFee}
              name="urgencyFee"
              type="number"
              value={formik.values.urgencyFee}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterUrgencyFee}
              error={formik.touched.urgencyFee && formik.errors.urgencyFee}
              min="0"
            />
          </>
        );
      case 'alteration':
        return (
          <>
            <InputField
              label={t.garmentType}
              name="garmentType"
              type="select"
              value={formik.values.garmentType}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={garmentTypeOptions}
              placeholder={t.selectGarmentType}
              error={formik.touched.garmentType && formik.errors.garmentType}
              isRequired={true}
            />
            <InputField
              label={t.originalMeasurements}
              name="originalMeasurements"
              type="textarea"
              value={formik.values.originalMeasurements}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterOriginalMeasurements}
              error={formik.touched.originalMeasurements && formik.errors.originalMeasurements}
              isRequired={true}
            />
            <InputField
              label={t.desiredChanges}
              name="desiredChanges"
              type="textarea"
              value={formik.values.desiredChanges}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterDesiredChanges}
              error={formik.touched.desiredChanges && formik.errors.desiredChanges}
              isRequired={true}
            />
            <InputField
              label={t.fabricMaterialNotes}
              name="fabricMaterialNotes"
              type="textarea"
              value={formik.values.fabricMaterialNotes}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterFabricMaterialNotes}
              error={formik.touched.fabricMaterialNotes && formik.errors.fabricMaterialNotes}
              isRequired={true}
            />
            <FileInputField
              label={t.beforePhotos}
              name="beforePhotos"
              value={formik.values.beforePhotos}
              onChange={handleBeforePhotosChange}
              onBlur={formik.handleBlur}
              accept="image/*"
              multiple={true}
              error={formik.touched.beforePhotos && formik.errors.beforePhotos}
              isRequired={true}
            />
            <FileInputField
              label={t.afterPhotos}
              name="afterPhotos"
              value={formik.values.afterPhotos}
              onChange={handleAfterPhotosChange}
              onBlur={formik.handleBlur}
              accept="image/*"
              multiple={true}
            />
            <InputField
              label={t.urgencyFee}
              name="urgencyFee"
              type="number"
              value={formik.values.urgencyFee}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterUrgencyFee}
              error={formik.touched.urgencyFee && formik.errors.urgencyFee}
              min="0"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.serviceCatalog}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t.manageServices}
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>{t.addService}</span>
          </button>
        </div>

        {/* Service Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.totalServices}
                  </p>
                  <p className="text-3xl font-bold text-foreground">{totalServicesCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Scissors className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.avgRating}
                  </p>
                  <p className="text-3xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
                </div>
                <div className="p-3 rounded-xl bg-gold/10">
                  <Star className="w-6 h-6 text-gold" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.totalOrders}
                  </p>
                  <p className="text-3xl font-bold text-foreground">{totalOrders}</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <Clock className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.avgPrice}
                  </p>
                  <p className="text-3xl font-bold text-foreground">AED {avgPrice.toFixed(0)}</p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <DollarSign className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
            >
              {t.all}
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg ${selectedCategory === category.name ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {currentServices.map((service) => (
            <Card key={service.id} className="card-premium hover-lift">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Badge variant="outline">
                        {categories.find(cat => cat.name === service.category)?.label || service.category}
                      </Badge>
                      {getDifficultyBadge(service.difficulty)}
                    </div>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-lift"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover-lift"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {service.images && service.images.length > 0 && (
                  <div className="mb-4">
                    <ImageCarousel images={service.images} alt={service.name} />
                  </div>
                )}
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-secondary/30 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">AED {service.basePrice}</p>
                    <p className="text-sm text-muted-foreground">{t.startingPrice}</p>
                  </div>
                  <div className="text-center p-3 bg-secondary/30 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{service.timeRequired}</p>
                    <p className="text-sm text-muted-foreground">{t.completionTime}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-gold fill-current mr-1" />
                    <span className="font-semibold text-foreground">{service.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({service.orders} {t.orders.toLowerCase()})
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getPopularityColor(service.popularity).replace('text-', 'bg-')}`}></div>
                    <span className={`font-medium ${getPopularityColor(service.popularity)}`}>
                      {service.popularity}% {t.popularity}
                    </span>
                  </div>
                </div>
                {service.category === 'readymade' && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Readymade Details:</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Product: {service.productName}</p>
                      <p>Garment: {service.garmentType}</p>
                      <p>Fabric: {fabrics.find(f => f._id === service.fabric)?.name || service.fabric}</p>
                      <p>Gender: {t[service.gender] || service.gender}</p>
                      <p>Stock: {service.stock}</p>
                      {service.colors && (
                        <div className="flex items-center gap-2">
                          <p>Colors:</p>
                          {service.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      )}
                      {service.productId && <p>Product ID: {service.productId}</p>}
                      {service.size && <p>Size: {service.size}</p>}
                      {service.quantity && <p>Quantity: {service.quantity}</p>}
                      {service.material && <p>Material: {service.material}</p>}
                      {service.brandSupplier && <p>Brand/Supplier: {service.brandSupplier}</p>}
                      {service.deliveryShipping && <p>Delivery: {service.deliveryShipping}</p>}
                      {service.barcode && <p>Barcode: {service.barcode}</p>}
                      {service.warrantyReturnPolicy && <p>Warranty: {service.warrantyReturnPolicy}</p>}
                    </div>
                  </div>
                )}
                {service.category === 'customization' && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Customization Details:</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Garment: {service.garmentType}</p>
                      <p>Fabric: {fabrics.find(f => f._id === service.fabric)?.name || service.fabric}</p>
                      <p>Color: {service.colorPattern}</p>
                      {service.urgencyFee > 0 && <p>Urgency Fee: AED {service.urgencyFee}</p>}
                    </div>
                  </div>
                )}
                {service.category === 'alteration' && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Alteration Details:</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Garment: {service.garmentType}</p>
                      <p>Changes: {service.desiredChanges}</p>
                      {service.urgencyFee > 0 && <p>Urgency Fee: AED {service.urgencyFee}</p>}
                    </div>
                  </div>
                )}
                {service.features && service.features.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">{t.features}:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Service Categories Performance */}
        <Card className="card-elevated mt-6">
          <CardHeader>
            <CardTitle>{t.serviceCategories} {t.performance}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map(category => {
                const categoryServices = services.filter(s => s.category === category.name);
                const categoryOrders = categoryServices.reduce((sum, service) => sum + service.orders, 0);
                const categoryRevenue = categoryServices.reduce((sum, service) => sum + (service.basePrice * service.orders), 0);
                return (
                  <div key={category.id} className="text-center p-6 bg-secondary/30 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Scissors className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {category.label}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {categoryOrders} {t.orders.toLowerCase()}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        AED {categoryRevenue.toLocaleString()} {t.revenue.toLowerCase()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Selection Modal */}
        <CommonModal
          isOpen={isCategoryModalOpen}
          onClose={handleCloseModal}
          title={t.chooseServiceType}
          size="lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCategorySelect('readymade')}
            >
              <CardContent className="p-6 text-center">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">{t.readymade}</h3>
                <p className="text-sm text-gray-600">{t.readyMadeDesc}</p>
                <Button className="mt-4">{t.select}</Button>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCategorySelect('customization')}
            >
              <CardContent className="p-6 text-center">
                <Shirt className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">{t.customization}</h3>
                <p className="text-sm text-gray-600">{t.customizationDesc}</p>
                <Button className="mt-4">{t.select}</Button>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCategorySelect('alteration')}
            >
              <CardContent className="p-6 text-center">
                <Ruler className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-semibold mb-2">{t.alteration}</h3>
                <p className="text-sm text-gray-600">{t.alterationDesc}</p>
                <Button className="mt-4">{t.select}</Button>
              </CardContent>
            </Card>
          </div>
        </CommonModal>

        {/* Service Modal */}
        <CommonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={formik.handleSubmit}
          onCancel={handleCloseModal}
          title={editingService ? t.editService : t.addNewService}
          saveText={editingService ? t.updateService : t.addService}
          size="lg"
          isLoading={formik.isSubmitting}
        >
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <InputField
              label={t.serviceCategory}
              name="category"
              type="select"
              value={formik.values.category}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              options={categoryOptions}
              placeholder={t.selectCategory}
              error={formik.touched.category && formik.errors.category}
              isRequired={true}
            />
            {formik.values.category === "readymade" && renderCategorySpecificFields()}
            <FileInputField
              label={t.serviceImages}
              name="images"
              value={formik.values.images}
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              accept="image/*"
              multiple={true}
              error={formik.touched.images && formik.errors.images}
              isRequired={true}
            />
            {formik.values.category !== "readymade" &&  <InputField
              label={t.serviceName}
              name="name"
              type="text"
              value={formik.values.name}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterServiceName}
              error={formik.touched.name && formik.errors.name}
              isRequired={true}
            />}
            <div className="mb-4">
              <label className="block capitalize text-gray-700 font-medium mb-2">
                {t.serviceDescription} <span className="text-red-500">*</span>
              </label>
              <ReactQuill
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue('description', value)}
                onBlur={() => formik.setFieldTouched('description', true)}
                modules={quillModules}
                className="bg-white"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm">{formik.errors.description}</div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label={t.servicePrice}
                name="price"
                type="number"
                value={formik.values.price}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                placeholder={t.enterServicePrice}
                error={formik.touched.price && formik.errors.price}
                isRequired={true}
              />
              <InputField
                label={t.serviceTax}
                name="tax"
                type="number"
                value={formik.values.tax}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                placeholder={t.enterServiceTax}
                error={formik.touched.tax && formik.errors.tax}
                isRequired={true}
              />
            </div>
            {formik.values.category !== "readymade" &&  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label={t.serviceTime}
                name="timeRequired"
                type="text"
                value={formik.values.timeRequired}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                placeholder={t.enterServiceTime}
                error={formik.touched.timeRequired && formik.errors.timeRequired}
                isRequired={true}
              />
              <InputField
                label={t.serviceDifficulty}
                name="difficulty"
                type="select"
                value={formik.values.difficulty}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                options={difficultyOptions}
                placeholder={t.selectDifficulty}
                error={formik.touched.difficulty && formik.errors.difficulty}
                isRequired={true}
              />
            </div>}
            {formik.values.category !== "readymade" && renderCategorySpecificFields()}
            {formik.values.category !== "readymade" &&  <FileInputField
              label={t.serviceImages}
              name="images"
              value={formik.values.images}
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              accept="image/*"
              multiple={true}
              error={formik.touched.images && formik.errors.images}
              isRequired={true}
            />}
          </form>
        </CommonModal>
      </div>
    </div>
  );
};

export default Services;