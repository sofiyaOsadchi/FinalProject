import axios from 'axios';

const baseUrl = "http://localhost:8080/api/v1";
const cartUrl = `${baseUrl}/cart`;

export const getCart = () => {
    return axios.get(cartUrl, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const addProductToCart = (productId: string, quantity: number, size: string) => {
    return axios.post(`${cartUrl}/add`, {
        productId,
        quantity,
        size
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const removeProductFromCart = (productId: string, quantity: number) => {
    return axios.post(`${cartUrl}/remove`, {
        productId,
        quantity
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
    removeProductFromCart,
    clearCart
};

export default cart;
