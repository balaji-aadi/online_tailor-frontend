import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useLanguage } from '../../components/Layout';
import MasterApi from '../../api/master.api';

const translations = {
    en: {
        title: 'Privacy Policy & Terms Management',
        subtitle: 'Manage your customer and tailor policies and terms',
        customerPrivacy: 'Customer Privacy Policy',
        customerTerms: 'Customer Terms & Conditions',
        tailorPrivacy: 'Tailor Privacy Policy',
        tailorTerms: 'Tailor Terms & Conditions',
        saveDraft: 'Save Draft',
        publish: 'Publish',
        contentRequired: 'Content is required',
        contentMin: 'Content must be at least 10 characters',
        savedSuccess: 'Document saved successfully',
        updatedSuccess: 'Document updated successfully',
        publishedSuccess: 'Document published successfully',
        error: 'Something went wrong',
        lastSaved: 'Last saved',
        autoSaving: 'Auto-saving enabled',
        preview: 'Preview',
        contentPlaceholder: 'Content will appear here as you type...',
        loading: 'Loading document...',
        noDocument: 'No document found. Create a new one.'
    },
    ar: {
        title: 'إدارة سياسة الخصوصية والشروط',
        subtitle: 'إدارة سياسات وشروط العملاء والخياطين',
        customerPrivacy: 'سياسة خصوصية العملاء',
        customerTerms: 'شروط وأحكام العملاء',
        tailorPrivacy: 'سياسة خصوصية الخياطين',
        tailorTerms: 'شروط وأحكام الخياطين',
        saveDraft: 'حفظ المسودة',
        publish: 'نشر',
        contentRequired: 'المحتوى مطلوب',
        contentMin: 'يجب أن يكون المحتوى على الأقل 10 أحرف',
        savedSuccess: 'تم حفظ المستند بنجاح',
        updatedSuccess: 'تم تحديث المستند بنجاح',
        publishedSuccess: 'تم نشر المستند بنجاح',
        error: 'حدث خطأ ما',
        lastSaved: 'آخر حفظ',
        autoSaving: 'تم تمكين الحفظ التلقائي',
        preview: 'معاينة',
        contentPlaceholder: 'سيظهر المحتوى هنا أثناء الكتابة...',
        loading: 'جاري تحميل المستند...',
        noDocument: 'لم يتم العثور على مستند. إنشاء مستند جديد.'
    }
};

const TermsConditions = () => {
    const [activeTab, setActiveTab] = useState('customer-privacy');
    const [currentDocument, setCurrentDocument] = useState({ id: null, content: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { language } = useLanguage();

    const t = translations[language || 'en'];

    const validationSchema = Yup.object({
        content: Yup.string()
            .required(t.contentRequired)
            .min(10, t.contentMin)
    });

    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await handleSave();
            setSubmitting(false);
        }
    });

    const tabs = [
        { id: 'customer-privacy', label: t.customerPrivacy, userType: 'customer', contentType: 'privacy' },
        { id: 'customer-terms', label: t.customerTerms, userType: 'customer', contentType: 'terms' },
        { id: 'tailor-privacy', label: t.tailorPrivacy, userType: 'tailor', contentType: 'privacy' },
        { id: 'tailor-terms', label: t.tailorTerms, userType: 'tailor', contentType: 'terms' }
    ];

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background', 'script',
        'list', 'bullet', 'indent', 'align',
        'blockquote', 'code-block', 'link'
    ];

    // Fetch document when active tab changes
    useEffect(() => {
        getDocumentForActiveTab();
    }, [activeTab]);

    // Update formik values when current document changes
    useEffect(() => {
        formik.setFieldValue('content', currentDocument.content || '');
    }, [currentDocument]);

    const getDocumentForActiveTab = async () => {
        try {
            setIsLoading(true);
            const activeTabData = tabs.find(tab => tab.id === activeTab);

            if (!activeTabData) return;

            const payload = {
                userType: activeTabData.userType,
                contentType: activeTabData.contentType
            };

            const response = await MasterApi.getTermsPolicies(payload);
            const documentData = response.data?.data;

            if (documentData) {
                setCurrentDocument({
                    id: documentData[0]?._id,
                    content: documentData[0]?.content || ''
                });
            } else {
                setCurrentDocument({ id: null, content: '' });
            }
        } catch (error) {
            console.error('Error fetching document:', error);
            if (error.response?.status !== 404) {
                toast.error(t.error);
            }
            setCurrentDocument({ id: null, content: '' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (isPublish = false) => {
        try {
            setIsLoading(true);
            const activeTabData = tabs.find(tab => tab.id === activeTab);

            if (!activeTabData) {
                toast.error('Invalid tab selection');
                return;
            }

            const payload = {
                userType: activeTabData.userType,
                contentType: activeTabData.contentType,
                content: formik.values.content,
                // status: isPublish ? 'published' : 'draft'
            };

            let response;
            if (currentDocument.id) {
                // Update existing document
                response = await MasterApi.updateTermsPolicy(currentDocument.id, payload);
                toast.success(t.updatedSuccess);
            } else {
                // Create new document
                response = await MasterApi.createTermsPolicy(payload);
                // Update local state with new ID
                setCurrentDocument(prev => ({
                    ...prev,
                    id: response.data?.data?._id
                }));
                toast.success(t.savedSuccess);
                getDocumentForActiveTab();
            }

            if (isPublish) {
                toast.success(t.publishedSuccess);
            }
        } catch (error) {
            console.error('Error saving document:', error);
            toast.error(error.response?.data?.message || t.error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className={`min-h-screen p-4 md:p-8 font-inter ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-elegant overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-primary p-6 text-white">
                    <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
                    <p className="mt-2 opacity-90">{t.subtitle}</p>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-border overflow-x-auto bg-white">
                    <div className="flex min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`px-6 py-4 font-medium text-sm md:text-base transition-all ${activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary bg-blue-50'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
                                    }`}
                                onClick={() => handleTabChange(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-white">
                    {/* Content Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                            {tabs.find(tab => tab.id === activeTab)?.label}
                        </h2>
                        <div className="flex space-x-3 mt-4 md:mt-0">
                            <button
                                onClick={() => handleSave(false)}
                                disabled={isLoading}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
                            >
                                {t.publish}
                            </button>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            <span className="ml-3 text-muted-foreground">{t.loading}</span>
                        </div>
                    ) : (
                        <>
                            {/* Editor */}
                            <div className="mb-6 border rounded-lg overflow-hidden">
                                <ReactQuill
                                    value={formik.values.content}
                                    onChange={(content) => formik.setFieldValue('content', content)}
                                    modules={modules}
                                    formats={formats}
                                    theme="snow"
                                    style={{ height: '300px',paddingBottom:"40px" }}
                                    placeholder={currentDocument.id ? '' : t.noDocument}
                                />
                                {formik.touched.content && formik.errors.content && (
                                    <div className="text-red-500 text-sm mt-1 px-3 py-1">
                                        {formik.errors.content}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default TermsConditions;