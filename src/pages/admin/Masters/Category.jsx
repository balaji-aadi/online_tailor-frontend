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
    title: 'Category Management',
    addCategory: 'Add Category',
    categoryName: 'Category Name',
    enterCategoryName: 'Enter category name',
    editCategory: 'Edit Category',
    addNewCategory: 'Add New Category',
    updateCategory: 'Update Category',
    deleteConfirm: 'Are you sure you want to delete this category?',
    createdSuccess: 'Category created successfully',
    updatedSuccess: 'Category updated successfully',
    deletedSuccess: 'Category deleted successfully',
    nameRequired: 'Category name is required',
    nameMin: 'Category name must be at least 2 characters',
    nameMax: 'Category name must be less than 50 characters',
    name: 'Name',
    actions: 'Actions',
    categories: 'categories'
  },
  ar: {
    title: 'إدارة الفئات',
    addCategory: 'إضافة فئة',
    categoryName: 'اسم الفئة',
    enterCategoryName: 'أدخل اسم الفئة',
    editCategory: 'تعديل الفئة',
    addNewCategory: 'إضافة فئة جديدة',
    updateCategory: 'تحديث الفئة',
    deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذه الفئة؟',
    createdSuccess: 'تم إنشاء الفئة بنجاح',
    updatedSuccess: 'تم تحديث الفئة بنجاح',
    deletedSuccess: 'تم حذف الفئة بنجاح',
    nameRequired: 'اسم الفئة مطلوب',
    nameMin: 'يجب أن يكون اسم الفئة على الأقل حرفين',
    nameMax: 'يجب أن يكون اسم الفئة أقل من 50 حرفًا',
    name: 'الاسم',
    actions: 'الإجراءات',
    categories: 'الفئات'
  }
};

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const { handleLoading } = useLoading();
  const { language } = useLanguage();

  const t = translations[language || 'en'];

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t.nameRequired)
      .min(2, t.nameMin)
      .max(50, t.nameMax)
  });

  const getAllCategories = async () => {
    handleLoading(true);
    try {
      const res = await MasterApi.getCategories();
      setCategories(res.data?.data || []);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      handleLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      handleLoading(true);
      try {
        if (editingCategory) {
          await MasterApi.updateCategory(editingCategory._id, values);
          toast.success(t.updatedSuccess);
        } else {
          await MasterApi.createCategory(values);
          toast.success(t.createdSuccess);
        }
        getAllCategories();
        handleCloseModal();
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'Something went wrong');
      } finally {
        handleLoading(false);
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

  const handleInputChange = (e) => {
    formik.handleChange(e);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    formik.setValues({
      name: category.name
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      handleLoading(true);
      try {
        await MasterApi.deleteCategory(id);
        toast.success(t.deletedSuccess);
        getAllCategories();
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'Failed to delete category');
      } finally {
        handleLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    formik.resetForm();
  };

  const handleAddNew = () => {
    setEditingCategory(null);
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
            <span>{t.addCategory}</span>
          </button>
        </div>

        <TableAlpha
          data={categories}
          columnsConfig={columnsConfig}
          itemsName={t.categories}
        />

        <CommonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={formik.handleSubmit}
          onCancel={handleCloseModal}
          title={editingCategory ? t.editCategory : t.addNewCategory}
          saveText={editingCategory ? t.updateCategory : t.addCategory}
          size="md"
          isLoading={formik.isSubmitting}
        >
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <InputField
              label={t.categoryName}
              name="name"
              type="text"
              value={formik.values.name}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder={t.enterCategoryName}
              error={formik.touched.name && formik.errors.name}
              isRequired={true}
              labelClassName={language === 'ar' ? 'text-right' : ''}
            />
          </form>
        </CommonModal>
      </div>
    </div>
  );
};

export default Category;