import Api from '../axios.js';

export const PromoCodeApi = {
    getAllPromoCodes: () => Api.post(`/tailor/get-all-promos`),
    createPromoCode: (payload) => Api.post(`/tailor/create-promo`, payload),
    updatePromoCode: (id, payload) => Api.put(`/tailor/update-promo/${id}`,payload),
    deletePromoCode: (id) => Api.delete(`/tailor/delete-promo/${id}`),
    getPromoById: (id) => Api.get(`tailor/get-promo/${id}`)
};