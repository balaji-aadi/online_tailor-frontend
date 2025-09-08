import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ChromePicker } from 'react-color';
import TableAlpha from '../../../components/ui/TableAlpha';
import CommonModal from '../../../components/ui/commonModal';
import InputField from '../../../components/ui/InputField';
import { useLanguage } from '../../../components/Layout';
import { toast } from 'react-toastify';
import MasterApi from '../../../api/master.api';

const translations = {
    en: {
        title: 'Color Management',
        addColor: 'Add Color',
        colorName: 'Color Name',
        enterColorName: 'Enter color name',
        colorValue: 'Color Value',
        enterColorValue: 'Select or enter a color value',
        editColor: 'Edit Color',
        addNewColor: 'Add New Color',
        updateColor: 'Update Color',
        deleteConfirm: 'Are you sure you want to delete this color?',
        createdSuccess: 'Color created successfully',
        updatedSuccess: 'Color updated successfully',
        deletedSuccess: 'Color deleted successfully',
        nameRequired: 'Color name is required',
        valueRequired: 'Color value is required',
        name: 'Name',
        value: 'Value',
        preview: 'Preview',
        actions: 'Actions',
        colors: 'colors'
    },
    ar: {
        title: 'إدارة الألوان',
        addColor: 'إضافة لون',
        colorName: 'اسم اللون',
        enterColorName: 'أدخل اسم اللون',
        colorValue: 'قيمة اللون',
        enterColorValue: 'حدد أو أدخل قيمة اللون',
        editColor: 'تعديل اللون',
        addNewColor: 'إضافة لون جديد',
        updateColor: 'تحديث اللون',
        deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذا اللون؟',
        createdSuccess: 'تم إنشاء اللون بنجاح',
        updatedSuccess: 'تم تحديث اللون بنجاح',
        deletedSuccess: 'تم حذف اللون بنجاح',
        nameRequired: 'اسم اللون مطلوب',
        valueRequired: 'قيمة اللون مطلوبة',
        name: 'الاسم',
        value: 'القيمة',
        preview: 'معاينة',
        actions: 'الإجراءات',
        colors: 'الألوان'
    }
};

const Color = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingColor, setEditingColor] = useState(null);
    const [colors, setColors] = useState([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const { language } = useLanguage();

    const t = translations[language || 'en'];

    // const mockColors = [
    //     { _id: '1', name: 'Red', value: '#ff0000' },
    //     { _id: '2', name: 'Blue', value: '#0000ff' },
    //     { _id: '3', name: 'Green', value: '#00ff00' },
    // ];

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t.nameRequired),
        value: Yup.string()
            .required(t.valueRequired)
            .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
    });

    const getAllColors = async () => {
        try {
            const res = await MasterApi.getColors();
            setColors(res.data?.data || []);
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Failed to fetch colors');
        }
    };

    useEffect(() => {
        getAllColors();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            value: '#000000'
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const payload = {
                    name: values.name,
                    value: values.value
                };

                if (editingColor) {
                    await MasterApi.updateColor(editingColor._id, payload);
                    toast.success(t.updatedSuccess);
                } else {
                    await MasterApi.createColor(payload);
                    toast.success(t.createdSuccess);
                }

                getAllColors();
                handleCloseModal();
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || 'Something went wrong');
            }
        }
    });

    const columnsConfig = [
        {
            header: t.name,
            accessorKey: 'name',
            cell: ({ row }) => (
                <span className="font-medium text-gray-900 capitalize">{row.original.name}</span>
            )
        },
        {
            header: t.value,
            accessorKey: 'value',
            cell: ({ row }) => (
                <div className="flex items-center">
                    <div
                        className="w-6 h-6 rounded-md border border-gray-300 mr-2"
                        style={{ backgroundColor: row.original.value }}
                    ></div>
                    <span className="text-gray-600">{row.original.value}</span>
                </div>
            )
        },
        {
            header: t.preview,
            accessorKey: 'preview',
            cell: ({ row }) => (
                <div
                    className="w-full h-10 rounded-md border border-gray-300"
                    style={{ backgroundColor: row.original.value }}
                ></div>
            )
        },
        {
            header: t.actions,
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
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
            )
        }
    ];

    const handleEdit = (color) => {
        setEditingColor(color);
        formik.setValues({
            name: color.name,
            value: color.value
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm(t.deleteConfirm)) {
            try {
                await MasterApi.deleteColor(id);
                getAllColors()
                toast.success(t.deletedSuccess);
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || 'Failed to delete color');
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingColor(null);
        setShowColorPicker(false);
        formik.resetForm();
    };

    const handleAddNew = () => {
        setEditingColor(null);
        formik.resetForm();
        setIsModalOpen(true);
    };

    const handleColorChange = (color) => {
        formik.setFieldValue('value', color.hex);
    };

    return (
        <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                    <button
                        onClick={handleAddNew}
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{t.addColor}</span>
                    </button>
                </div>

                <TableAlpha
                    data={colors}
                    columnsConfig={columnsConfig}
                    itemsName={t.colors}
                />

                <CommonModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={formik.handleSubmit}
                    onCancel={handleCloseModal}
                    title={editingColor ? t.editColor : t.addNewColor}
                    saveText={editingColor ? t.updateColor : t.addColor}
                    size="md"
                    isLoading={formik.isSubmitting}
                >
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <InputField
                            label={t.colorName}
                            name="name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t.enterColorName}
                            error={formik.touched.name && formik.errors.name}
                            isRequired={true}
                            labelClassName={language === 'ar' ? 'text-right' : ''}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t.colorValue} <span className="text-red-500">*</span>
                            </label>

                            <div className="flex items-center space-x-2 mb-2">
                                <div
                                    className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
                                    style={{ backgroundColor: formik.values.value }}
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                ></div>
                                <input
                                    type="text"
                                    name="value"
                                    value={formik.values.value}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={t.enterColorValue}
                                    className="flex-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {formik.touched.value && formik.errors.value && (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.value}</p>
                            )}

                            {showColorPicker && (
                                <div className="mt-2">
                                    <ChromePicker
                                        color={formik.values.value}
                                        onChange={handleColorChange}
                                        disableAlpha={true}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t.preview}
                            </label>
                            <div
                                className="w-full h-20 rounded-md border border-gray-300"
                                style={{ backgroundColor: formik.values.value }}
                            ></div>
                        </div>
                    </form>
                </CommonModal>
            </div>
        </div>
    );
};

export default Color;