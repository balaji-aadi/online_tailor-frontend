import Api from '../axios.js';

const TailorApi = {
    tailorStatus: (payload) => Api.post(`admin/tailors-status-update`,payload),
    getAllTailors: () => Api.post(`admin/users?role=tailor`),
    getTailorById: (id) => Api.get(`/user/get-tailor/${id}`),
    updateTailorProfile: (id, payload) => Api.put(`/user/update-tailor-profile/${id}`, payload),
};

export default TailorApi;
