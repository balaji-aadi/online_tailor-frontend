import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Plus, Edit, Trash2, Ruler, Shirt, Info, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import TableAlpha from '../../../components/ui/TableAlpha';
import CommonModal from '../../../components/ui/commonModal';
import { FileInputField } from '../../../components/ui/ImageInputField';
import InputField from '../../../components/ui/InputField';
import MasterApi from '../../../api/master.api';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../components/Layout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const translations = {
    en: {
        title: 'Measurements Management',
        subtitle: 'Define measurement templates for different specialties',
        addMeasurement: 'Add Measurement Template',
        templateName: 'Template Name',
        garmentType: 'Specialties',
        gender: 'Gender',
        description: 'Description',
        measurementGuide: 'Measurement Guide',
        measurementPoints: 'Measurement Points',
        measurementName: 'Measurement Name',
        unit: 'Unit',
        required: 'Required',
        action: 'Action',
        addPoint: 'Add Point',
        measurementGuideInfo: 'Upload an image that shows how to take each measurement. This will help tailors and customers take accurate measurements.',
        measurementPointsGuide: 'Define all the measurement points needed for this specialities. Mark as "Required" for measurements that are essential.',
        basicDetails: 'Basic Details',
        createdAt: 'Created',
        viewDetails: 'View Details',
        deleteConfirm: 'Are you sure you want to delete this measurement template?',
        createdSuccess: 'Measurement created successfully',
        updatedSuccess: 'Measurement updated successfully',
        deletedSuccess: 'Measurement deleted successfully',
        nameRequired: 'Measurement template name is required',
        nameMin: 'Name must be at least 2 characters',
        garmentTypeRequired: 'Specialties is required',
        genderRequired: 'Gender is required',
        descriptionRequired: 'Description is required',
        imageRequired: 'Image is required',
        imageMin: 'At least one image is required',
        pointsRequired: 'At least one measurement point is required',
        pointNameRequired: 'Measurement point name is required',
        unitRequired: 'Unit is required',
        inches: 'Inches',
        centimeters: 'Centimeters',
        measurementTemplates: 'measurement templates',
        selectGarmentType: 'Select specialities',
        selectGender: 'Select gender',
        describeMeasurementTemplate: 'Describe this measurement template...',
        measurementPointsGuideTitle: 'Measurement Points Guide'
    },
    ar: {
        title: 'إدارة القياسات',
        subtitle: 'حدد قوالب القياس لأنواع الملابس المختلفة',
        addMeasurement: 'إضافة قالب القياس',
        templateName: 'اسم القالب',
        garmentType: 'نوع الملابس',
        gender: 'الجنس',
        description: 'الوصف',
        measurementGuide: 'دليل القياس',
        measurementPoints: 'نقاط القياس',
        measurementName: 'اسم القياس',
        unit: 'الوحدة',
        required: 'مطلوب',
        action: 'الإجراء',
        addPoint: 'إضافة نقطة',
        measurementGuideInfo: 'قم بتحميل صورة توضح كيفية أخذ كل قياس. هذا سيساعد الخياطين والعملاء على أخذ قياسات دقيقة.',
        measurementPointsGuide: 'حدد جميع نقاط القياس المطلوبة لهذا النوع من الملابس. ضع علامة "مطلوب" للقياسات الأساسية.',
        basicDetails: 'التفاصيل الأساسية',
        createdAt: 'تم الإنشاء',
        viewDetails: 'عرض التفاصيل',
        deleteConfirm: 'هل أنت متأكد أنك تريد حذف قالب القياس هذا؟',
        createdSuccess: 'تم إنشاء القياس بنجاح',
        updatedSuccess: 'تم تحديث القياس بنجاح',
        deletedSuccess: 'تم حذف القياس بنجاح',
        nameRequired: 'اسم قالب القياس مطلوب',
        nameMin: 'يجب أن يكون الاسم على الأقل حرفين',
        garmentTypeRequired: 'نوع الملابس مطلوب',
        genderRequired: 'الجنس مطلوب',
        descriptionRequired: 'الوصف مطلوب',
        imageRequired: 'الصورة مطلوبة',
        imageMin: 'مطلوب صورة واحدة على الأقل',
        pointsRequired: 'مطلوب نقطة قياس واحدة على الأقل',
        pointNameRequired: 'اسم نقطة القياس مطلوب',
        unitRequired: 'الوحدة مطلوبة',
        inches: 'بوصة',
        centimeters: 'سنتيمترات',
        measurementTemplates: 'قوالب القياس',
        selectGarmentType: 'اختر نوع الملابس',
        selectGender: 'اختر الجنس',
        describeMeasurementTemplate: 'صِف قالب القياس هذا...',
        measurementPointsGuideTitle: 'دليل نقاط القياس'
    }
};

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean']
    ],
};

const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'link'
];

const Measurements = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedMeasurement, setSelectedMeasurement] = useState(null);
    const [editingMeasurement, setEditingMeasurement] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const [measurements, setMeasurements] = useState([]);
    const [garmentTypes, setGarmentTypes] = useState([]);
    const { language } = useLanguage();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [removeList, setRemoveList] = useState([]);
    

    const t = translations[language || 'en'];

    const genderOptions = [
        { value: 'male', label: t.male || 'Male' },
        { value: 'female', label: t.female || 'Female' },
    ];

    const fetchMasterData = async () => {
        try {
            const res = await MasterApi.getSpecialties();
            setGarmentTypes(res.data?.data);
        } catch (error) {
            console.error("Error fetching master data:", error);
        }
    };

    const fetchMeasurements = async () => {
        try {
            const res = await MasterApi.getMeasurements();
            setMeasurements(res.data?.data || []);
        } catch (error) {
            console.error("Error fetching measurements:", error);
        }
    };

    useEffect(() => {
        fetchMasterData();
        fetchMeasurements();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t.nameRequired)
            .min(2, t.nameMin),
        garmentType: Yup.string().required(t.garmentTypeRequired),
        gender: Yup.string()
            .required(t.genderRequired)
            .oneOf(['male', 'female'], 'Invalid gender'),
        description: Yup.string().required(t.descriptionRequired),
        image: Yup.array().min(1, t.imageMin).required(t.imageRequired),
        measurementPoints: Yup.array()
            .of(
                Yup.object({
                    name: Yup.string().required(t.pointNameRequired),
                    unit: Yup.string().required(t.unitRequired),
                    required: Yup.boolean(),
                })
            )
            .min(1, t.pointsRequired),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            garmentType: '',
            gender: '',
            description: '',
            image: [],
            measurementPoints: [{ name: '', unit: 'inch', required: true }],
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('garmentType', values.garmentType);
                formData.append('gender', values.gender);
                formData.append('description', values.description);

                if (values.image) {
                    const imagesArray = Array.isArray(values.image) ? values.image : [values.image];
                    imagesArray.forEach((file) => {
                        formData.append('image', file);
                    });
                }

                formData.append('measurementPoints', JSON.stringify(values.measurementPoints));

                if (editingMeasurement && removeList.length >= 0) {
                    formData.append("removeImages", JSON.stringify(removeList));
                }

                if (editingMeasurement) {
                    await MasterApi.updateMeasurement(editingMeasurement._id, formData);
                    toast.success(t.updatedSuccess);
                } else {
                    await MasterApi.createMeasurement(formData);
                    toast.success(t.createdSuccess);
                }
                fetchMeasurements();
                handleCloseModal();
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || 'Something went wrong');
            }
        },
    });

    const columnsConfig = [
        {
            header: t.measurementGuide,
            accessorKey: 'image',
            cell: ({ row }) => (
                <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200">
                    {row.original.image && row.original.image.length > 0 ? (
                        <a
                            href={row.original.image[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full"
                        >
                            <img
                                src={row.original.image[0]}
                                alt={row.original.name}
                                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            />
                        </a>
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Shirt className="w-6 h-6 text-gray-400" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            header: t.templateName,
            accessorKey: 'name',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium text-gray-900">{row.original.name}</div>
                    <div className="text-sm text-gray-500">
                        {row.original.garmentType?.name || 'No specialities'}
                    </div>
                </div>
            ),
        },
        {
            header: t.gender,
            accessorKey: 'gender',
            cell: ({ row }) => (
                <span className="font-medium text-gray-900 capitalize">
                    {row.original.gender}
                </span>
            )
        },
        {
            header: t.measurementPoints,
            accessorKey: 'measurementPoints',
            cell: ({ row }) => (
                <div className="text-sm text-gray-600">
                    {row.original.measurementPoints?.length || 0} {'points'}
                </div>
            ),
        },
        {
            header: t.createdAt,
            accessorKey: 'createdAt',
            cell: ({ row }) => (
                <div className="text-sm text-gray-500">
                    {new Date(row.original.createdAt).toLocaleDateString()}
                </div>
            ),
        },
        {
            header: t.action,
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleView(row.original)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title={t.viewDetails}
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleEdit(row.original)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    const handleImageChange = (files) => {
        formik.setFieldValue('image', files);
    };

    const addMeasurementPoint = () => {
        formik.setFieldValue('measurementPoints', [
            ...formik.values.measurementPoints,
            { name: '', unit: 'inch', required: true },
        ]);
    };

    const removeMeasurementPoint = (index) => {
        const points = [...formik.values.measurementPoints];
        points.splice(index, 1);
        formik.setFieldValue('measurementPoints', points);
    };

    const handleMeasurementPointChange = (index, field, value) => {
        const points = [...formik.values.measurementPoints];
        points[index][field] = value;
        formik.setFieldValue('measurementPoints', points);
    };

    const handleView = (measurement) => {
        setSelectedMeasurement(measurement);
        setCurrentImageIndex(0);
        setIsViewModalOpen(true);
    };

    const handleEdit = (measurement) => {
        setEditingMeasurement(measurement);
        formik.setValues({
            name: measurement.name,
            garmentType: measurement.garmentType?._id || '',
            gender: measurement.gender || '',
            description: measurement.description,
            image: measurement.image || [],
            measurementPoints: measurement.measurementPoints.map(point => ({
                name: point.name,
                unit: point.unit,
                required: point.required
            }))
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm(t.deleteConfirm)) {
            try {
                await MasterApi.deleteMeasurement(id);
                toast.success(t.deletedSuccess);
                fetchMeasurements();
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || 'Failed to delete measurement');
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMeasurement(null);
        setActiveTab('details');
        formik.resetForm();
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedMeasurement(null);
        setCurrentImageIndex(0);
    };

    const handleAddNew = () => {
        setEditingMeasurement(null);
        setActiveTab('details');
        formik.resetForm();
        formik.setFieldValue('measurementPoints', [{ name: '', unit: 'inch', required: true }]);
        setIsModalOpen(true);
    };

    const nextImage = () => {
        if (selectedMeasurement && selectedMeasurement.image) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === selectedMeasurement.image.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedMeasurement && selectedMeasurement.image) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? selectedMeasurement.image.length - 1 : prevIndex - 1
            );
        }
    };

    const garmentTypeOptions = garmentTypes.map((type) => ({
        value: type?._id,
        label: type.name,
    }));

    const unitOptions = [
        { value: 'inch', label: t.inches },
        { value: 'cm', label: t.centimeters },
    ];

    return (
        <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                        <p className="text-gray-600 capitalize">
                            {t.subtitle}
                        </p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{t.addMeasurement}</span>
                    </button>
                </div>

                <TableAlpha
                    data={measurements}
                    columnsConfig={columnsConfig}
                    itemsName={t.measurementTemplates}
                />

                <CommonModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={formik.handleSubmit}
                    onCancel={handleCloseModal}
                    title={editingMeasurement ? 'Edit Measurement Template' : 'Add Measurement Template'}
                    saveText={editingMeasurement ? 'Update Template' : 'Create Template'}
                    size="xl"
                    isLoading={formik.isSubmitting}
                >
                    <div className="border-b border-gray-200 mb-4">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Shirt className="w-4 h-4" />
                                    <span>{t.basicDetails}</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('measurements')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'measurements'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Ruler className="w-4 h-4" />
                                    <span>{t.measurementPoints}</span>
                                </div>
                            </button>
                        </nav>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6 max-h-96 overflow-y-auto">
                        {activeTab === 'details' && (
                            <div className="space-y-4 px-4">
                                <InputField
                                    label={t.templateName}
                                    name="name"
                                    type="text"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="e.g., Women's Burkha Measurements"
                                    error={formik.touched.name && formik.errors.name}
                                    isRequired={true}
                                />

                                <InputField
                                    label={t.garmentType}
                                    name="garmentType"
                                    type="select"
                                    value={formik.values.garmentType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    options={garmentTypeOptions}
                                    placeholder={t.selectGarmentType}
                                    error={formik.touched.garmentType && formik.errors.garmentType}
                                    isRequired={true}
                                />

                                <InputField
                                    label={t.gender}
                                    name="gender"
                                    type="select"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    options={genderOptions}
                                    placeholder={t.selectGender}
                                    error={formik.touched.gender && formik.errors.gender}
                                    isRequired={true}
                                />

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t.description} <span className="text-red-500">*</span>
                                    </label>
                                    <ReactQuill
                                        value={formik.values.description}
                                        onChange={(value) => formik.setFieldValue('description', value)}
                                        onBlur={() => formik.setFieldTouched('description', true)}
                                        modules={quillModules}
                                        formats={quillFormats}
                                        theme="snow"
                                        className="h-40 pb-10"
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                                    )}
                                </div>

                                <FileInputField
                                    label={t.measurementGuide}
                                    name="image"
                                    value={formik.values.image}
                                    onChange={handleImageChange}
                                    onBlur={formik.handleBlur}
                                    accept="image/*"
                                    multiple={true}
                                    setRemoveList={setRemoveList}
                                    error={formik.touched.image && formik.errors.image}
                                    isRequired={true}
                                />

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <Info className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-blue-900">{t.measurementGuide}</h4>
                                            <p className="text-sm text-blue-700 mt-1">
                                                {t.measurementGuideInfo}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'measurements' && (
                            <div className="space-y-4 px-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">{t.measurementPoints}</h3>
                                    <button
                                        type="button"
                                        onClick={addMeasurementPoint}
                                        className="text-primary hover:text-primary-hover text-sm font-medium flex items-center space-x-1"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>{t.addPoint}</span>
                                    </button>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                                        <div className="col-span-5">{t.measurementName}</div>
                                        <div className="col-span-3">{t.unit}</div>
                                        <div className="col-span-2">{t.required}</div>
                                        <div className="col-span-2">{t.action}</div>
                                    </div>
                                </div>

                                {formik.values.measurementPoints.map((point, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-5">
                                            <input
                                                type="text"
                                                value={point.name}
                                                onChange={(e) => handleMeasurementPointChange(index, 'name', e.target.value)}
                                                onBlur={formik.handleBlur}
                                                placeholder="e.g., Chest, Waist, Length"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            {formik.touched.measurementPoints &&
                                                formik.touched.measurementPoints[index]?.name &&
                                                formik.errors.measurementPoints?.[index]?.name && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {formik.errors.measurementPoints[index].name}
                                                    </div>
                                                )}
                                        </div>

                                        <div className="col-span-3">
                                            <select
                                                value={point.unit}
                                                onChange={(e) => handleMeasurementPointChange(index, 'unit', e.target.value)}
                                                onBlur={formik.handleBlur}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            >
                                                {unitOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {formik.touched.measurementPoints &&
                                                formik.touched.measurementPoints[index]?.unit &&
                                                formik.errors.measurementPoints?.[index]?.unit && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {formik.errors.measurementPoints[index].unit}
                                                    </div>
                                                )}
                                        </div>

                                        <div className="col-span-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={point.required}
                                                    onChange={(e) => handleMeasurementPointChange(index, 'required', e.target.checked)}
                                                    onBlur={formik.handleBlur}
                                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{t.required}</span>
                                            </label>
                                        </div>

                                        <div className="col-span-2">
                                            {formik.values.measurementPoints.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeMeasurementPoint(index)}
                                                    className="text-red-600 hover:text-red-800 p-1"
                                                    title="Remove measurement point"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {formik.touched.measurementPoints && formik.errors.measurementPoints &&
                                    typeof formik.errors.measurementPoints === 'string' && (
                                        <div className="text-red-500 text-sm">{formik.errors.measurementPoints}</div>
                                    )}

                                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-yellow-100 p-2 rounded-full">
                                            <Info className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-yellow-900">{t.measurementPointsGuideTitle}</h4>
                                            <p className="text-sm text-yellow-700 mt-1">
                                                {t.measurementPointsGuide}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </CommonModal>

                <CommonModal
                    isOpen={isViewModalOpen}
                    onClose={handleCloseViewModal}
                    onCancel={handleCloseViewModal}
                    title={selectedMeasurement?.name || t.viewDetails}
                    hideSaveButton={true}
                    size="lg"
                >
                    {selectedMeasurement && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t.measurementGuide}</h3>
                                    {selectedMeasurement.image && selectedMeasurement.image.length > 0 ? (
                                        <div className="relative">
                                            <a
                                                href={selectedMeasurement.image[currentImageIndex]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block"
                                            >
                                                <img
                                                    src={selectedMeasurement.image[currentImageIndex]}
                                                    alt={selectedMeasurement.name}
                                                    className="w-full h-64 object-contain rounded-lg border-none cursor-pointer hover:opacity-90 transition-opacity"
                                                />
                                            </a>

                                            {selectedMeasurement.image.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={prevImage}
                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={nextImage}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                                                    >
                                                        <ChevronRight className="w-5 h-5" />
                                                    </button>
                                                    <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                                                        <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                            {currentImageIndex + 1} / {selectedMeasurement.image.length}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                                            <Shirt className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t.basicDetails}</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{t.templateName}</p>
                                            <p className="text-sm text-gray-900">{selectedMeasurement.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{t.garmentType}</p>
                                            <p className="text-sm text-gray-900">{selectedMeasurement.garmentType?.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{t.gender}</p>
                                            <p className="text-sm text-gray-900 capitalize">{selectedMeasurement.gender || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{t.description}</p>
                                            <div
                                                className="text-sm text-gray-900 mt-1 prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: selectedMeasurement.description }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{t.createdAt}</p>
                                            <p className="text-sm text-gray-900">
                                                {new Date(selectedMeasurement.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">{t.measurementPoints}</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 mb-2">
                                        <div className="col-span-6">{t.measurementName}</div>
                                        <div className="col-span-3">{t.unit}</div>
                                        <div className="col-span-3">{t.required}</div>
                                    </div>

                                    {selectedMeasurement.measurementPoints.map((point, index) => (
                                        <div key={index} className="grid grid-cols-12 gap-4 py-2 border-b border-gray-100 last:border-b-0">
                                            <div className="col-span-6 text-sm text-gray-900">{point.name}</div>
                                            <div className="col-span-3 text-sm text-gray-900">
                                                {point.unit === 'inch' ? t.inches : t.centimeters}
                                            </div>
                                            <div className="col-span-3 text-sm text-gray-900">
                                                {point.required ? 'Yes' : 'No'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </CommonModal>
            </div>
        </div>
    );
};

export default Measurements;