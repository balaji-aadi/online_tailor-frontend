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
    title: 'Fabric Management',
    addFabric: 'Add Fabric',
    fabricName: 'Fabric Name',
    fabricImage: 'Fabric Image',
    enterFabricName: 'Enter fabric name',
    editFabric: 'Edit Fabric',
    addNewFabric: 'Add New Fabric',
    updateFabric: 'Update Fabric',
    deleteConfirm: 'Are you sure you want to delete this fabric?',
    createdSuccess: 'Fabric created successfully',
    updatedSuccess: 'Fabric updated successfully',
    deletedSuccess: 'Fabric deleted successfully',
    nameRequired: 'Fabric name is required',
    nameMin: 'Fabric name must be at least 2 characters',
    nameMax: 'Fabric name must be less than 50 characters',
    imageRequired: 'Image is required',
    imageMin: 'At least one image is required',
    image: 'Image',
    name: 'Name',
    actions: 'Actions',
    fabrics: 'fabrics'
  },
  ar: {
    title: 'إدارة الأقمشة',
    addFabric: 'إضافة قماش',
    fabricName: 'اسم القماش',
    fabricImage: 'صورة القماش',
    enterFabricName: 'أدخل اسم القماش',
    editFabric: 'تعديل القماش',
    addNewFabric: 'إضافة قماش جديد',
    updateFabric: 'تحديث القماش',
    deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذا القماش؟',
    createdSuccess: 'تم إنشاء القماش بنجاح',
    updatedSuccess: 'تم تحديث القماش بنجاح',
    deletedSuccess: 'تم حذف القماش بنجاح',
    nameRequired: 'اسم القماش مطلوب',
    nameMin: 'يجب أن يكون اسم القماش على الأقل حرفين',
    nameMax: 'يجب أن يكون اسم القماش أقل من 50 حرفًا',
    imageRequired: 'الصورة مطلوبة',
    imageMin: 'مطلوب صورة واحدة على الأقل',
    image: 'الصورة',
    name: 'الاسم',
    actions: 'الإجراءات',
    fabrics: 'الأقمشة'
  }
};

const Fabric = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFabric, setEditingFabric] = useState(null);
  const [fabrics, setFabrics] = useState([]);
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

  const getAllFabrics = async () => {
    handleLoading(true);
    try {
      const res = await MasterApi.getFabrics();
      setFabrics(res.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      handleLoading(false);
    }
  };

  useEffect(() => {
    getAllFabrics();
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
        formData.append("name", values.name);

        if (values.image) {
          const imagesArray = Array.isArray(values.image) ? values.image : [values.image];
          imagesArray.forEach((file) => {
            formData.append("image", file);
          });
        }

        const res = editingFabric ? await MasterApi.updateFabric(editingFabric?._id, formData) : await MasterApi.createFabric(formData);
        setFabrics(res?.data?.data)
        console.log(res);
        toast.success(editingFabric ? t.updatedSuccess : t.createdSuccess);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'Something went wrong');
      } finally {
        handleLoading(false);
        handleCloseModal();
        getAllFabrics()
      }
    }
  });


  const columnsConfig = [
    {
      header: t.image,
      accessorKey: 'image',
      cell: ({ row }) => (
        <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      header: t.name,
      accessorKey: 'name',
      cell: ({ row }) => (
        <span className="font-medium text-gray-900 capitalize">{row.original.name}</span>
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
    formik.handleChange(e);
  };

  const handleImageChange = (files) => {
    formik.setFieldValue('image', files);
  };

  const handleEdit = (fabric) => {
    setEditingFabric(fabric);
    formik.setValues({
      name: fabric.name,
      image: [fabric.image]
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      handleLoading(true);
      try {
        await MasterApi.deleteFabric(id);
        setFabrics(prev => prev.filter(fabric => fabric.id !== id));
        toast.success(t.deletedSuccess);
      } catch (err) {
        console.log(err);
      } finally {
        handleLoading(false);
        getAllFabrics();
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFabric(null);
    formik.resetForm();
  };

  const handleAddNew = () => {
    setEditingFabric(null);
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
            <span>{t.addFabric}</span>
          </button>
        </div>

        <TableAlpha
          data={fabrics}
          columnsConfig={columnsConfig}
          itemsName={t.fabrics}
        />

        <CommonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={formik.handleSubmit}
          onCancel={handleCloseModal}
          title={editingFabric ? t.editFabric : t.addNewFabric}
          saveText={editingFabric ? t.updateFabric : t.addFabric}
          size="md"
          isLoading={formik.isSubmitting}
        >
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <InputField
              label={t.fabricName}
              name="name"
              type="text"
              value={formik.values.name}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterFabricName}
              error={formik.touched.name && formik.errors.name}
              isRequired={true}
            />

            <FileInputField
              label={t.fabricImage}
              name="image"
              value={formik.values.image}
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              accept="image/*"
              multiple={false}
              error={formik.touched.image && formik.errors.image}
              isRequired={true}
            />
          </form>
        </CommonModal>
      </div>
    </div>
  );
};

export default Fabric;