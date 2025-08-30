import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Plus, Edit, Trash2 } from 'lucide-react';
import TableAlpha from '../../../components/ui/TableAlpha';
import CommonModal from '../../../components/ui/commonModal';
import InputField from '../../../components/ui/InputField';
import { FileInputField } from '../../../components/ui/ImageInputField';
import { useLoading } from '../../../loader/LoaderContext';
import MasterApi from '../../../api/master.api';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../components/Layout';

const translations = {
    en: {
        title: 'Specialities Management',
        addSpeciality: 'Add Speciality',
        specialityName: 'Speciality Name',
        specialityImage: 'Speciality Image',
        enterSpecialityName: 'Enter speciality name',
        editSpeciality: 'Edit Speciality',
        addNewSpeciality: 'Add New Speciality',
        updateSpeciality: 'Update Speciality',
        deleteConfirm: 'Are you sure you want to delete this speciality?',
        createdSuccess: 'Speciality created successfully',
        updatedSuccess: 'Speciality updated successfully',
        deletedSuccess: 'Speciality deleted successfully',
        nameRequired: 'Speciality name is required',
        nameMin: 'Speciality name must be at least 2 characters',
        nameMax: 'Speciality name must be less than 50 characters',
        imageRequired: 'Image is required',
        imageMin: 'At least one image is required',
        image: 'Image',
        name: 'Name',
        actions: 'Actions',
        specialities: 'specialities'
    },
    ar: {
        title: 'إدارة التخصصات',
        addSpeciality: 'إضافة تخصص',
        specialityName: 'اسم التخصص',
        specialityImage: 'صورة التخصص',
        enterSpecialityName: 'أدخل اسم التخصص',
        editSpeciality: 'تعديل التخصص',
        addNewSpeciality: 'إضافة تخصص جديد',
        updateSpeciality: 'تحديث التخصص',
        deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذا التخصص؟',
        createdSuccess: 'تم إنشاء التخصص بنجاح',
        updatedSuccess: 'تم تحديث التخصص بنجاح',
        deletedSuccess: 'تم حذف التخصص بنجاح',
        nameRequired: 'اسم التخصص مطلوب',
        nameMin: 'يجب أن يكون اسم التخصص على الأقل حرفين',
        nameMax: 'يجب أن يكون اسم التخصص أقل من 50 حرفًا',
        imageRequired: 'الصورة مطلوبة',
        imageMin: 'مطلوب صورة واحدة على الأقل',
        image: 'الصورة',
        name: 'الاسم',
        actions: 'الإجراءات',
        specialities: 'التخصصات'
    }
};

const Specialities = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSpeciality, setEditingSpeciality] = useState(null);
    const [specialities, setSpecialities] = useState([]);
    const { handleLoading } = useLoading();
    const { language } = useLanguage();

    const t = translations[language || 'en'];

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t.nameRequired)
            .min(2, t.nameMin)
            .max(50, t.nameMax),
        image: Yup.array()
            .min(1, t.imageMin)
            .required(t.imageRequired)
    });

    const getAllSpecialities = async () => {
        handleLoading(true);
        try {
            const res = await MasterApi.getSpecialties();
            setSpecialities(res.data?.data);
        } catch (err) {
            console.error(err);
        } finally {
            handleLoading(false);
        }
    };

    useEffect(() => {
        getAllSpecialities();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            image: []
        },
        validationSchema,
        onSubmit: async (values) => {
            handleLoading(true);
            try {
                const formData = new FormData();
                formData.append('name', values.name);

                if (values.image) {
                    const imagesArray = Array.isArray(values.image)
                        ? values.image
                        : [values.image];
                    imagesArray.forEach((file) => {
                        formData.append('image', file);
                    });
                }

                const res = editingSpeciality
                    ? await MasterApi.updateSpecialty(editingSpeciality?._id, formData)
                    : await MasterApi.createSpecialty(formData);

                setSpecialities(res?.data?.data);
                toast.success(
                    editingSpeciality
                        ? t.updatedSuccess
                        : t.createdSuccess
                );
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || 'Something went wrong');
            } finally {
                handleLoading(false);
                handleCloseModal();
                getAllSpecialities();
            }
        }
    });

    const handleInputChange = (e) => {
        formik.handleChange(e);
    };

    const handleImageChange = (files) => {
        formik.setFieldValue('image', files);
    };

    const handleEdit = (speciality) => {
        setEditingSpeciality(speciality);
        formik.setValues({
            name: speciality.name,
            image: [speciality.image]
        });
        setIsModalOpen(true);
    };

    const columnsConfig = [
        {
            header: t.image,
            accessorKey: 'image',
            cell: ({ row }) => (
                <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200">
                    <img
                        src={row.original.image}
                        alt={row.original.name}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            )
        },
        {
            header: t.name,
            accessorKey: 'name',
            cell: ({ row }) => (
                <span className="font-medium text-gray-900 capitalize">
                    {row.original.name}
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

    const handleDelete = async (id) => {
        if (window.confirm(t.deleteConfirm)) {
            handleLoading(true);
            try {
                await MasterApi.deleteSpecialty(id);
                setSpecialities((prev) => prev.filter((s) => s._id !== id));
                toast.success(t.deletedSuccess);
            } catch (err) {
                console.error(err);
            } finally {
                handleLoading(false);
                getAllSpecialities();
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSpeciality(null);
        formik.resetForm();
    };

    const handleAddNew = () => {
        setEditingSpeciality(null);
        formik.resetForm();
        setIsModalOpen(true);
    };

    return (
        <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ae' ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {t.title}
                    </h1>
                    <button
                        onClick={handleAddNew}
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{t.addSpeciality}</span>
                    </button>
                </div>

                <TableAlpha
                    data={specialities}
                    columnsConfig={columnsConfig}
                    itemsName={t.specialities}
                />

                <CommonModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={formik.handleSubmit}
                    onCancel={handleCloseModal}
                    title={editingSpeciality ? t.editSpeciality : t.addNewSpeciality}
                    saveText={editingSpeciality ? t.updateSpeciality : t.addSpeciality}
                    size="md"
                    isLoading={formik.isSubmitting}
                >
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <InputField
                            label={t.specialityName}
                            name="name"
                            type="text"
                            value={formik.values.name}
                            onChange={handleInputChange}
                            onBlur={formik.handleBlur}
                            placeholder={t.enterSpecialityName}
                            error={formik.touched.name && formik.errors.name}
                            isRequired={true}
                        />

                        <FileInputField
                            label={t.specialityImage}
                            name="image"
                            value={formik.values.image}
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                            accept="image/*"
                            multiple={true}
                            error={formik.touched.image && formik.errors.image}
                            isRequired={true}
                        />
                    </form>
                </CommonModal>
            </div>
        </div>
    );
};

export default Specialities;