export const BASE_URL = "https://tp4buymore-production.up.railway.app/";
export const BASE_URL_API = "https://tp4buymore-production.up.railway.app/api/";

export const api_url = {
    products: {
        getAll: BASE_URL_API + `admin/products?page=1&per_page=1000&is_active=true`,
        add: BASE_URL_API + `admin/products`,
        update: (id: number) => BASE_URL_API + `admin/products/${id}`,
        getOne: (id: number) => BASE_URL_API + `admin/products/${id}`,
    },
    livreurs: {
        getAll: BASE_URL_API + `admin/livreurs`,
        add: BASE_URL_API + `admin/livreurs`,
        update: (id: number) => BASE_URL_API + `admin/livreurs/${id}`,
        assignOrder: (id_order: number) => BASE_URL_API + `admin/orders/${id_order}/assign`,
    }

};