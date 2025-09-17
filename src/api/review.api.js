import Api from '../axios.js';

const ReviewApi = {
    // Admin endpoints
    getProductReviews: (params) => Api.post('/common/get-all-reviews', { ...params, type: 'service' }),
    getServiceReviews: (params) => Api.post('/common/get-all-reviews', { ...params, type: 'common' }),
    getReviewDetails: (id) => Api.get(`/common/get-review/${id}`),
    replyToReview: (id, data) => Api.put(`/common/reply-review/${id}`, data),
    toggleReviewVisibility: (id) => Api.put(`/common/toggle-visibility/${id}`),
    deleteReview: (id) => Api.delete(`/common/delete-review/${id}`),

    // Tailor endpoints
    getTailorServiceReviews: (params) => Api.post('/common/get-my-reviews', { ...params, type: 'service' }),
    getTailorReviews: (params) => Api.post('/common/get-my-reviews', { ...params, type: 'tailor' }),
    getTailorReviewDetails: (id) => Api.get(`/common/get-review/${id}`),
    replyToTailorReview: (id, data) => Api.put(`/common/reply-review/${id}`, data),
};

export default ReviewApi;