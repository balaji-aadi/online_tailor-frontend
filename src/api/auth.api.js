import Api from '../axios.js';

const AuthApi = {
    login: (payload) => Api.post('auth/login/2', payload),
    register: (payload) => Api.post('auth/register', payload),
    logout: () => Api.post('auth/logout'),


    requestPasswordReset: (payload) => Api.post('auth/request-password-reset', payload),
    changePassword: (payload) => Api.post('auth/reset-password', payload),
};

export default AuthApi;
