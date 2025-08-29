import Api from '../axios.js';

const MasterApi = {
    getSpecialties: () => Api.get('master/get-All-Specialties'),
};

export default MasterApi;
