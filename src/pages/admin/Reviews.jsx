import { useState, useEffect } from 'react';
import { Star, Eye, MessageSquare, EyeOff, Search, Users, Package, Trash2 } from 'lucide-react';
import TableAlpha from '../../components/ui/TableAlpha';
import CommonModal from '../../components/ui/commonModal';
import ReviewApi from '../../api/review.api';
import { toast } from 'react-toastify';
import { useLanguage } from '../../components/Layout';
import Description from '../../components/ui/Description';

const translations = {
    en: {
        title: 'Reviews Management',
        serviceReviews: 'Service Reviews',
        tailorReviews: 'Tailor Reviews',
        orderNumber: 'Order Number',
        user: 'User',
        tailor: 'Tailor',
        service: 'Service',
        productCode: 'Product Code',
        rating: 'Rating',
        actions: 'Actions',
        viewDetails: 'View Details',
        reply: 'Reply',
        showRemarks: 'Show Remarks',
        hideRemarks: 'Hide Remarks',
        searchPlaceholder: 'Search reviews...',
        all: 'All',
        pendingReply: 'Pending Reply',
        replied: 'Replied',
        reviewDetails: 'Review Details',
        adminReply: 'Admin Reply',
        yourReply: 'Your Reply',
        submitReply: 'Submit Reply',
        cancel: 'Cancel',
        reviewContent: 'Review Content',
        images: 'Images',
        noReviews: 'No reviews found',
        replySuccess: 'Reply submitted successfully',
        remarksShown: 'Remarks shown successfully',
        remarksHidden: 'Remarks hidden successfully',
        filterByStatus: 'Filter by status',
        reviewType: 'Review Type',
        serviceReview: 'Service Review',
        tailorReview: 'Tailor Review',
        delete: 'Delete',
        deleteSuccess: 'Review deleted successfully',
        deleteConfirm: 'Are you sure you want to delete this review?'
    },
    ar: {
        title: 'إدارة التقييمات',
        serviceReviews: 'تقييمات الخدمات',
        tailorReviews: 'تقييمات الخياطين',
        orderNumber: 'رقم الطلب',
        user: 'المستخدم',
        tailor: 'الخياط',
        service: 'الخدمة',
        productCode: 'كود المنتج',
        rating: 'التقييم',
        actions: 'الإجراءات',
        viewDetails: 'عرض التفاصيل',
        reply: 'رد',
        showRemarks: 'عرض الملاحظات',
        hideRemarks: 'إخفاء الملاحظات',
        searchPlaceholder: 'البحث في التقييمات...',
        all: 'الكل',
        pendingReply: 'في انتظار الرد',
        replied: 'تم الرد',
        reviewDetails: 'تفاصيل التقييم',
        adminReply: 'رد المسؤول',
        yourReply: 'ردك',
        submitReply: 'إرسال الرد',
        cancel: 'إلغاء',
        reviewContent: 'محتوى التقييم',
        images: 'الصور',
        noReviews: 'لا توجد تقييمات',
        replySuccess: 'تم إرسال الرد بنجاح',
        remarksShown: 'تم عرض الملاحظات بنجاح',
        remarksHidden: 'تم إخفاء الملاحظات بنجاح',
        filterByStatus: 'تصفية حسب الحالة',
        reviewType: 'نوع التقييم',
        serviceReview: 'تقييم الخدمة',
        tailorReview: 'تقييم الخياط',
        delete: 'حذف',
        deleteSuccess: 'تم حذف التقييم بنجاح',
        deleteConfirm: 'هل أنت متأكد من رغبتك في حذف هذا التقييم؟'
    }
};

const Reviews = () => {
    const [activeTab, setActiveTab] = useState('service');
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [tailorReply, setTailorReply] = useState(null)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    const { language } = useLanguage();

    const t = translations[language || 'en'];

    const filteredReviews = reviews?.filter(review =>
        (review.orderId?.order_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.customerId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.customerId?.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchReviews();
    }, [activeTab, statusFilter, pagination.page]);

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const params = {
                searchTerm: searchTerm || undefined,
                statusFilter: statusFilter !== 'all' ? statusFilter : undefined,
                page: pagination.page,
                limit: pagination.limit
            };

            const response = activeTab === 'service'
                ? await ReviewApi.getProductReviews(params)
                : await ReviewApi.getServiceReviews(params);

            setReviews(response.data.data?.data);
            setPagination(prev => ({
                ...prev,
                total: response.data.total,
                totalPages: response.data.totalPages
            }));
        } catch (error) {
            console.error('Error fetching reviews:', error);
            toast.error('Failed to fetch reviews');
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = async (review) => {
        try {
            const response = await ReviewApi.getReviewDetails(review._id);
            setSelectedReview(response.data?.data);
            setIsDetailModalOpen(true);
        } catch (error) {
            console.error('Error fetching review details:', error);
            toast.error('Failed to fetch review details');
        }
    };

    const handleReply = (review) => {
        setSelectedReview(review);
        setIsReplyModalOpen(true);
        setTailorReply(review?.adminReply)
    };

    const handleToggleVisibility = async (review) => {
        try {
            await ReviewApi.toggleReviewVisibility(review._id);
            toast.success(review.isVisible ? t.remarksHidden : t.remarksShown);
            fetchReviews();
        } catch (error) {
            console.error('Error toggling visibility:', error);
            toast.error('Failed to toggle visibility');
        }
    };

    const handleDelete = (review) => {
        setSelectedReview(review);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await ReviewApi.deleteReview(selectedReview._id);
            toast.success(t.deleteSuccess);
            setIsDeleteModalOpen(false);
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Failed to delete review');
        }
    };

    const handleSubmitReply = async () => {
        
        try {
            await ReviewApi.replyToReview(selectedReview._id, { reply: tailorReply });
            setIsReplyModalOpen(false);
            toast.success(t.replySuccess);
            fetchReviews();
        } catch (error) {
            console.error('Error submitting reply:', error);
            toast.error('Failed to submit reply');
        }
    };

    const serviceColumns = [
        {
            header: t.orderNumber,
            accessorKey: 'orderNumber',
            cell: ({ row }) => (
                <span className="font-medium text-gray-900">
                    {row.original.orderId?.order_id || 'N/A'}
                </span>
            )
        },
        {
            header: t.tailor,
            accessorKey: 'tailor',
            cell: ({ row }) => (
                <span className="text-gray-900">{row.original.tailorId?.ownerName || 'N/A'}</span>
            )
        },
        {
            header: t.service,
            accessorKey: 'service',
            cell: ({ row }) => (
                <span className="text-gray-900">{row.original.serviceId?.serviceName || 'N/A'}</span>
            )
        },
        {
            header: t.rating,
            accessorKey: 'rating',
            cell: ({ row }) => (
                <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < row.original.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
            )
        },

        {
            header: "Reply",
            accessorKey: 'adminReply',
            cell: ({ row }) => (
                <span className="text-gray-900">{row.original.adminReply || 'N/A'}</span>
            )
        },

        {
            header: t.actions,
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleViewDetails(row.original)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title={t.viewDetails}
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleReply(row.original)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title={t.reply}
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleToggleVisibility(row.original)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                        title={row.original.isVisible ? t.hideRemarks : t.showRemarks}
                    >
                        {row.original.isVisible ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        onClick={() => handleDelete(row.original)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title={t.delete}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    const tailorColumns = [
        {
            header: t.orderNumber,
            accessorKey: 'orderNumber',
            cell: ({ row }) => (
                <span className="font-medium text-gray-900">
                    {row.original.orderId?.order_id || 'N/A'}
                </span>
            )
        },
        {
            header: t.tailor,
            accessorKey: 'tailor',
            cell: ({ row }) => (
                <span className="text-gray-900">{row.original.tailorId?.ownerName || 'N/A'}</span>
            )
        },

        {
            header: t.rating,
            accessorKey: 'rating',
            cell: ({ row }) => (
                <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < row.original.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
            )
        },
        {
            header: "Reply",
            accessorKey: 'adminReply',
            cell: ({ row }) => (
                <span className="text-gray-900">{row.original.adminReply || 'No reply'}</span>
            )
        },
        {
            header: t.actions,
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleViewDetails(row.original)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title={t.viewDetails}
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleReply(row.original)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title={t.reply}
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleToggleVisibility(row.original)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                        title={row.original.isVisible ? t.hideRemarks : t.showRemarks}
                    >
                        {row.original.isVisible ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        onClick={() => handleDelete(row.original)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title={t.delete}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className={`p-6 bg-gray-50 min-h-screen ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.title}</h1>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            className={`px-4 py-2 font-medium flex items-center space-x-2 ${activeTab === 'service'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setActiveTab('service')}
                        >
                            <Package className="w-5 h-5" />
                            <span>{t.serviceReviews}</span>
                        </button>
                        <button
                            className={`px-4 py-2 font-medium flex items-center space-x-2 ${activeTab === 'tailor'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setActiveTab('tailor')}
                        >
                            <Users className="w-5 h-5" />
                            <span>{t.tailorReviews}</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-end">

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="all">{t.all}</option>
                            <option value="pending">{t.pendingReply}</option>
                            <option value="replied">{t.replied}</option>
                        </select>
                    </div>
                </div>

                <TableAlpha
                    data={filteredReviews}
                    columnsConfig={activeTab === 'service' ? serviceColumns : tailorColumns}
                    itemsName="reviews"
                    isLoading={isLoading}
                    pagination={pagination}
                    setPagination={setPagination}
                />

                {/* Review Details Modal */}
                <CommonModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    title={t.reviewDetails}
                    size="lg"
                >
                    {selectedReview && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t.orderNumber}</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedReview.orderId?.order_id || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t.user}</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedReview.customerId?.name || 'N/A'}</p>
                                    <p className="text-sm text-gray-500">{selectedReview.customerId?.email || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t.tailor}</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedReview.tailorId?.ownerName || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t.service}</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedReview.serviceId?.serviceName || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t.service}</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedReview.serviceId?.serviceId || 'N/A'}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t.rating}</label>
                                <div className="flex items-center mt-1">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < selectedReview.rating
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">({selectedReview.rating}/5)</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700"> Review Content </label>
                                <Description description={selectedReview.review} length={200} />
                            </div>

                            {selectedReview.images && selectedReview.images.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t.images}</label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedReview.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Review ${index + 1}`}
                                                className="w-20 h-20 object-cover rounded-md border border-gray-200"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedReview.adminReply && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t.adminReply}</label>
                                    <p className="mt-1 text-sm text-gray-900 bg-blue-50 p-3 rounded-md">
                                        {selectedReview.adminReply}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </CommonModal>

                {/* Reply Modal */}
                <CommonModal
                    isOpen={isReplyModalOpen}
                    onClose={() => setIsReplyModalOpen(false)}
                    onSave={handleSubmitReply}
                    onCancel={() => setIsReplyModalOpen(false)}
                    title={t.reply}
                    saveText={t.submitReply}
                    cancelText={t.cancel}
                >
                    {selectedReview && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.yourReply}
                                </label>
                                <textarea
                                    rows={4}
                                    name="reply"
                                    onChange={(e) => setTailorReply(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Type your reply here..."
                                    defaultValue={selectedReview.adminReply || ''}
                                />
                            </div>
                        </div>
                    )}
                </CommonModal>

                {/* Delete Confirmation Modal */}
                <CommonModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onSave={confirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    title={t.delete}
                    saveText={t.delete}
                    cancelText={t.cancel}
                >
                    <p>{t.deleteConfirm}</p>
                </CommonModal>
            </div>
        </div>
    );
};

export default Reviews;