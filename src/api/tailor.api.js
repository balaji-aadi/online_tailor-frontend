import Api from '../axios.js';

const TailorApi = {
    tailorStatus: (payload) => Api.post(`admin/tailors-status-update`,payload),
    getAllTailors: () => Api.get(`admin/users?role=tailor`),
};

export default TailorApi;
