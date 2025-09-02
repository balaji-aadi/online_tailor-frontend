import Api from '../axios.js';

const MasterApi = {
    // Fabric
    createFabric: (payload) => Api.post('master/create-fabric', payload),
    updateFabric: (id, payload) => Api.put(`master/update-fabric/${id}`, payload),
    getFabrics: () => Api.post('master/get-all-fabrics'),
    deleteFabric: (id) => Api.delete(`master/delete-fabric/${id}`),

    // specialities
    createSpecialty: (payload) => Api.post('master/create-Specialty', payload),
    updateSpecialty: (id, payload) => Api.put(`master/update-Specialty/${id}`, payload),
    getSpecialties: () => Api.get('master/get-all-Specialties'),
    deleteSpecialty: (id) => Api.delete(`master/delete-Specialty/${id}`),

    // measurements
    createMeasurement: (payload) => Api.post('master/create-measurement-templates', payload),
    updateMeasurement: (id, payload) => Api.put(`master/update-measurement-templates/${id}`, payload),
    getMeasurements: () => Api.post('master/get-all-measurement-templates'),
    deleteMeasurement: (id) => Api.delete(`master/delete-measurement-templates/${id}`),

    // category
    createCategory: (payload) => Api.post('master/create-category', payload),
    updateCategory: (id, payload) => Api.put(`master/update-category/${id}`, payload),
    getCategories: () => Api.post('master/get-all-categories'),
    deleteCategory: (id) => Api.delete(`master/delete-category/${id}`),

    // tax
    createTax: (payload) => Api.post('master/create-tax', payload),
    updateTax: (id, payload) => Api.put(`master/update-tax/${id}`, payload),
    getTaxes: () => Api.post('master/get-all-taxes'),
    deleteTax: (id) => Api.delete(`master/delete-tax/${id}`),
    getActiveTax: () => Api.post('master/get-active-tax'),


    // terms policy
    createTermsPolicy: (payload) => Api.post('master/create-terms-policy', payload),
    updateTermsPolicy: (id, payload) => Api.put(`master/update-terms-policy/${id}`, payload),
    getTermsPolicies: (payload) => Api.post('master/get-terms-policy', payload),
    getAllTermsPolicies: () => Api.post('master/get-all-terms-policy'),

};

export default MasterApi;
