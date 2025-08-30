import Api from '../axios.js';

const AuthApi = {
    login: (payload) => Api.post('auth/login/2', payload),
    register: (payload) => Api.post('auth/register', payload),
    logout: () => Api.post('auth/logout'),
};

export default AuthApi;
