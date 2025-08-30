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
    deleteMeasurement: (id) => Api.delete(`master/delete-measurement-templates/${id}`)
};

export default MasterApi;
