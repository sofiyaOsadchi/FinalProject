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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Adds a product to the cart. 
 * @param {string} productId - The id of the product.
 * @param {string} variantId - The id of the variant.
 * @param {number} quantity - The quantity to add to the cart.
 * @param {string} size - The size of the product.
 * @param {number} price - The price of the product.
 * @returns {Promise<AxiosResponse<any>>} - The response from the API.
 */
/******  a4fc9471-b117-45f3-86af-068c8fcfa269  *******/
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

export const cartService = {
    getCart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    clearCart
};

export default cartService;