import Api from '../axios.js';

const DisputeApi = {
    getAllDisputes: () => Api.post(`customer/all-disputes`),
    // getDisputeById: (id) => Api.get(`dispute/${id}`),
    // updateDisputeStatus: (id, payload) => Api.put(`dispute/update-status/${id}`, payload),
};

export default DisputeApi;