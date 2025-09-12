import Api from '../axios.js';

const ChatApi = {
    getChat : (orderId) => Api.get(`/chat/${orderId}`),
    getAllChats : () => Api.get('/chat/'),
    createChat : (data) => Api.post('/chat/', data),
    deleteChat : (orderId) => Api.delete(`/chat/${orderId}`),
    getAllUserStatus : () => Api.get('/chat/status'),
    uploadFiles : (formData) => Api.post('/chat/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
};

export default ChatApi;