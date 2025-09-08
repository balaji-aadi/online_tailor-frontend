import Api from '../axios.js';

const OrderApi = {
    getAllOrders: () => Api.post(`customer/all-orders`),
    // getOrderById: (id) => Api.get(`order/${id}`),
    // updateOrderStatus: (id, payload) => Api.put(`order/update-status/${id}`, payload),
};

export default OrderApi;