import Api from '../axios.js';

const OrderApi = {
    getAllOrders: () => Api.post(`tailor/orders`),
    confirmOrder: (payload) => Api.post(`tailor/confirm-order`,payload)
};

export default OrderApi;