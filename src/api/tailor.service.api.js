import Api from '../axios.js';

const TailorServiceApi = {
    // Service apis
    createService: (payload) => Api.post(`/tailor/create-service`, payload),
    updateService: (id, payload) => Api.put(`/tailor/update-service/${id}`, payload),
    getServiceById: (id) => Api.get(`/tailor/get-service/${id}`),
    deleteService: (id) => Api.delete(`/tailor/delete-service/${id}`),
    getAllServicesByTailorId: (tailorId) => Api.post(`/tailor/get-all-services/${tailorId}`),
    getAllServices: () => Api.post(`/tailor/get-all-services`),

    // readymade apis
    createReadymadeCloth: (payload) => Api.post(`/tailor/create-readymade-cloth`, payload),
    updateReadymadeCloth: (id, payload) => Api.put(`/tailor/update-readymade-cloth/${id}`, payload),
    getReadymadeCloth: (id) => Api.get(`/tailor/get-readymade-cloth/${id}`),
    deleteReadymadeCloth: (id) => Api.delete(`/tailor/delete-readymade-cloth/${id}`),
    getAllReadymadeClothsByTailorId: (tailorId) => Api.post(`/tailor/get-all-readymade-cloth-byTailor/${tailorId}`),
    getAllReadymadeCloths: () => Api.post(`/tailor/get-all-readymade-cloth`),
};

export default TailorServiceApi;
