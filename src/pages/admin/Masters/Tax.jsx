import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Plus, Edit, Trash2 } from 'lucide-react';
import TableAlpha from '../../../components/ui/TableAlpha';
import CommonModal from '../../../components/ui/commonModal';
import InputField from '../../../components/ui/InputField';
import { useLoading } from '../../../loader/LoaderContext';
import MasterApi from '../../../api/master.api';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../components/Layout';

const translations = {
    en: {
        title: 'Tax Management',
        addTax: 'Add Tax',
        taxName: 'Tax Name',
        taxValue: 'Tax Value',
        taxType: 'Tax Type',
        isActive: 'Is Active',
        enterTaxName: 'Enter tax name',
        enterTaxValue: 'Enter tax value',
        percentage: 'Percentage',
        absolute: 'Absolute',
        editTax: 'Edit Tax',
        addNewTax: 'Add New Tax',
        updateTax: 'Update Tax',
        deleteConfirm: 'Are you sure you want to delete this tax?',
        createdSuccess: 'Tax created successfully',
        updatedSuccess: 'Tax updated successfully',
        deletedSuccess: 'Tax deleted successfully',
        nameRequired: 'Tax name is required',
        nameMin: 'Tax name must be at least 2 characters',
        nameMax: 'Tax name must be less than 50 characters',
        valueRequired: 'Tax value is required',
        valueMin: 'Tax value must be at least 0',
        typeRequired: 'Tax type is required',
        name: 'Name',
        value: 'Value',
        type: 'Type',
        active: 'Active',
        actions: 'Actions',
        taxes: 'taxes'
    },
    ar: {
        title: 'إدارة الضرائب',
        addTax: 'إضافة ضريبة',
        taxName: 'اسم الضريبة',
        taxValue: 'قيمة الضريبة',
        taxType: 'نوع الضريبة',
        isActive: 'نشط',
        enterTaxName: 'أدخل اسم الضريبة',
        enterTaxValue: 'أدخل قيمة الضريبة',
        percentage: 'نسبة مئوية',
        absolute: 'مطلق',
        editTax: 'تعديل الضريبة',
        addNewTax: 'إضافة ضريبة جديدة',
        updateTax: 'تحديث الضريبة',
        deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذه الضريبة؟',
        createdSuccess: 'تم إنشاء الضريبة بنجاح',
        updatedSuccess: 'تم تحديث الضريبة بنجاح',
        deletedSuccess: 'تم حذف الضريبة بنجاح',
        nameRequired: 'اسم الضريبة مطلوب',
        nameMin: 'يجب أن يكون اسم الضريبة على الأقل حرفين',
        nameMax: 'يجب أن يكون اسم الضريبة أقل من 50 حرفًا',
        valueRequired: 'قيمة الضريبة مطلوبة',
        valueMin: 'يجب أن تكون قيمة الضريبة على الأقل 0',
        typeRequired: 'نوع الضريبة مطلوب',
        name: 'الاسم',
        value: 'القيمة',
        type: 'النوع',
        active: 'نشط',
        actions: 'الإجراءات',
        taxes: 'الضرائب'
    }
};

const Tax = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTax, setEditingTax] = useState(null);
    const [taxes, setTaxes] = useState([]);
    const { language } = useLanguage();

    const t = translations[language || 'en'];

    const validationSchema = Yup.object({
        taxName: Yup.string()
            .required(t.nameRequired)
            .min(2, t.nameMin)
            .max(50, t.nameMax),
        value: Yup.number()
            .required(t.valueRequired)
            .min(0, t.valueMin),
        valueType: Yup.string()
            .required(t.typeRequired)
            .oneOf(['percentage', 'absolute'], t.typeRequired),
        isActive: Yup.boolean()
    });

    const getAllTaxes = async () => {
        try {
            const res = await MasterApi.getTaxes();
            setTaxes(res.data?.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllTaxes();
    }, []);

    const formik = useFormik({
        initialValues: {
            taxName: '',
            value: '',
            valueType: 'percentage',
            isActive: false
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const payload = {
                    taxName: values.taxName,
                    value: values.value,
                    valueType: values.valueType,
                    isActive: values.isActive
                };

                const res = editingTax ? await MasterApi.updateTax(editingTax?._id, payload) : await MasterApi.createTax(payload);
                setTaxes(res?.data?.data);
                console.log(res);
                toast.success(editingTax ? t.updatedSuccess : t.createdSuccess);
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || 'Something went wrong');
            } finally {
                handleCloseModal();
                getAllTaxes();
            }
        }
    });

    const columnsConfig = [
        {
            header: t.name,
            accessorKey: 'name',
            cell: ({ row }) => (
                <span className="font-medium text-gray-900 capitalize">{row.original.taxName}</span>
            )
        },
        {
            header: t.value,
            accessorKey: 'value',
            cell: ({ row }) => (
                <span className="text-gray-900">{row.original.value}</span>
            )
        },
        {
            header: t.type,
            accessorKey: 'valueType',
            cell: ({ row }) => (
                <span className="text-gray-900 capitalize">{row.original.valueType === 'percentage' ? t.percentage : t.absolute}</span>
            )
        },
        {
            header: t.active,
            accessorKey: 'isActive',
            cell: ({ row }) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.original.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {row.original.isActive ? 'Yes' : 'No'}
                </span>
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
                        onClick={() => handleDelete(row?.original?._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        formik.setFieldValue(name, type === 'checkbox' ? checked : value);
    };

    const handleEdit = (tax) => {
        setEditingTax(tax);
        formik.setValues({
            taxName: tax.taxName,
            value: tax.value,
            valueType: tax.valueType,
            isActive: tax.isActive
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm(t.deleteConfirm)) {
            try {
                await MasterApi.deleteTax(id);
                setTaxes(prev => prev.filter(tax => tax.id !== id));
                toast.success(t.deletedSuccess);
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || 'Failed to delete tax'); 
            } finally {
                getAllTaxes();
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTax(null);
        formik.resetForm();
    };

    const handleAddNew = () => {
        setEditingTax(null);
        formik.resetForm();
        setIsModalOpen(true);
    };

    return (
        <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ae' ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                    <button
                        onClick={handleAddNew}
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{t.addTax}</span>
                    </button>
                </div>

                <TableAlpha
                    data={taxes}
                    columnsConfig={columnsConfig}
                    itemsName={t.taxes}
                />

                <CommonModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={formik.handleSubmit}
                    onCancel={handleCloseModal}
                    title={editingTax ? t.editTax : t.addNewTax}
                    saveText={editingTax ? t.updateTax : t.addTax}
                    size="md"
                    isLoading={formik.isSubmitting}
                >
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <InputField
                            label={t.taxName}
                            name="taxName"
                            type="text"
                            value={formik.values.taxName}
                            onChange={handleInputChange}
                            onBlur={formik.handleBlur}
                            placeholder={t.enterTaxName}
                            error={formik.touched.taxName && formik.errors.taxName}
                            isRequired={true}
                        />

                        <InputField
                            label={t.taxValue}
                            name="value"
                            type="number"
                            value={formik.values.value}
                            onChange={handleInputChange}
                            onBlur={formik.handleBlur}
                            placeholder={t.enterTaxValue}
                            error={formik.touched.value && formik.errors.value}
                            isRequired={true}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t.taxType} <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="valueType"
                                value={formik.values.valueType}
                                onChange={handleInputChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="percentage">{t.percentage}</option>
                                <option value="absolute">{t.absolute}</option>
                            </select>
                            {formik.touched.valueType && formik.errors.valueType && (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.valueType}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formik.values.isActive}
                                onChange={handleInputChange}
                                onBlur={formik.handleBlur}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm font-medium text-gray-700">{t.isActive}</label>
                        </div>
                    </form>
                </CommonModal>
            </div>
        </div>
    );
};

export default Tax;