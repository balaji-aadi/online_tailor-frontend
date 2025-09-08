import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Plus, Edit, Trash2 } from 'lucide-react';
import TableAlpha from '../../../components/ui/TableAlpha';
import CommonModal from '../../../components/ui/commonModal';
import InputField from '../../../components/ui/InputField';
import { FileInputField } from '../../../components/ui/ImageInputField';
import MasterApi from '../../../api/master.api';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../components/Layout';

const translations = {
  en: {
    title: 'Service Management',
    addService: 'Add Service',
    serviceName: 'Service Name',
    enterServiceName: 'Enter service name',
    editService: 'Edit Service',
    addNewService: 'Add New Service',
    updateService: 'Update Service',
    deleteConfirm: 'Are you sure you want to delete this service?',
    createdSuccess: 'Service created successfully',
    updatedSuccess: 'Service updated successfully',
    deletedSuccess: 'Service deleted successfully',
    nameRequired: 'Service name is required',
    nameInvalid: 'Service name must be one of: Readymade, Stitching, or Alteration',
    name: 'Name',
    actions: 'Actions',
    services: 'services',
    image: 'Image',
    uploadImage: 'Upload Image'
  },
  ar: {
    title: 'إدارة الخدمات',
    addService: 'إضافة خدمة',
    serviceName: 'اسم الخدمة',
    enterServiceName: 'أدخل اسم الخدمة',
    editService: 'تعديل الخدمة',
    addNewService: 'إضافة خدمة جديدة',
    updateService: 'تحديث الخدمة',
    deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذه الخدمة؟',
    createdSuccess: 'تم إنشاء الخدمة بنجاح',
    updatedSuccess: 'تم تحديث الخدمة بنجاح',
    deletedSuccess: 'تم حذف الخدمة بنجاح',
    nameRequired: 'اسم الخدمة مطلوب',
    nameInvalid: 'يجب أن يكون اسم الخدمة أحد: Readymade أو Stitching أو Alteration',
    name: 'الاسم',
    actions: 'الإجراءات',
    services: 'الخدمات',
    image: 'الصورة',
    uploadImage: 'تحميل الصورة'
  }
};

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([]);
  const { language } = useLanguage();

  const t = translations[language || 'en'];

  const allowedServiceNames = ['readymade', 'stitching', 'alteration'];
  const serviceOptions = allowedServiceNames.map(name => ({
    value: name,
    label: name.charAt(0).toUpperCase() + name.slice(1)
  }));

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t.nameRequired)
      .oneOf(allowedServiceNames, t.nameInvalid),
    image: Yup.array()
      .min(1, t.imageMin)
      .required(t.imageRequired),
  });

  const getAllServices = async () => {
    try {
      const res = await MasterApi.getCategories();
      setServices(res.data?.data || []);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Failed to fetch services');
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      image: []
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name.toLowerCase());
        if (values.image && values.image.length > 0 && typeof values.image[0] !== 'string') {
          formData.append('image', values.image[0]);
        }

        if (editingService) {
          await MasterApi.updateCategory(editingService._id, formData);
          toast.success(t.updatedSuccess);
        } else {
          await MasterApi.createCategory(formData);
          toast.success(t.createdSuccess);
        }
        getAllServices();
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
      header: t.image,
      accessorKey: 'image',
      cell: ({ row }) => (
        row.original.image ? (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )
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
          {/* <button
            onClick={() => handleDelete(row.original._id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button> */}
        </div>
      )
    }
  ];

  const handleEdit = (service) => {
    setEditingService(service);
    formik.setValues({
      name: service.name,
      image: [service.image],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        await MasterApi.deleteCategory(id);
        toast.success(t.deletedSuccess);
        getAllServices();
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'Failed to delete service');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    formik.resetForm();
  };

  const handleAddNew = () => {
    setEditingService(null);
    formik.resetForm();
    setIsModalOpen(true);
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
            <span>{t.addService}</span>
          </button>
        </div>

        <TableAlpha
          data={services}
          columnsConfig={columnsConfig}
          itemsName={t.services}
        />

        <CommonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={formik.handleSubmit}
          onCancel={handleCloseModal}
          title={editingService ? t.editService : t.addNewService}
          saveText={editingService ? t.updateService : t.addService}
          size="md"
          isLoading={formik.isSubmitting}
        >
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <InputField
              label={t.serviceName}
              name="name"
              type="select"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterServiceName}
              error={formik.touched.name && formik.errors.name}
              isRequired={true}
              options={serviceOptions}
              labelClassName={language === 'ar' ? 'text-right' : ''}
            />
            <FileInputField
              label={t.image}
              name="image"
              value={formik.values.image}
              onChange={(files) => formik.setFieldValue('image', files)}
              onBlur={() => formik.setFieldTouched('image', true)}
              error={formik.touched.image && formik.errors.image}
              isRequired={!editingService}
              accept="image/jpeg,image/png,image/gif"
              multiple={false}
              isRTL={language === 'ar'}
            />
          </form>
        </CommonModal>
      </div>
    </div>
  );
};

export default Category;