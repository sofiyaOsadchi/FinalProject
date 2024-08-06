import axios from 'axios';

const baseUrl = "https://nodeapiproject-shop.onrender.com/api/v1";
const cartUrl = `${baseUrl}/cart`;

export const getCart = () => {
    return axios.get(cartUrl, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const addProductToCart = (productId: string, variantId: string, quantity: number, size: string, price: number) => {
    return axios.post(`${cartUrl}/add`, {
        productId,
        variantId,
        quantity,
        size,
        price
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

// Update product quantityconst 
export const updateProductQuantity = async (variantId: string, quantity: number) => {
    console.log('שולח ל-API:', { variantId, quantity });
    return axios.patch(`${cartUrl}/update`, {
        variantId,
        quantity
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const removeProductFromCart = (variantId: string) => {
    return axios.post(`${cartUrl}/remove`, {
        variantId
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const clearCart = (/* token: string */) => {
    return axios.delete(`${cartUrl}/clear`, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const cart = {
    getCart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    clearCart
};

export default cart;