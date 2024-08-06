import axios from "axios";
import { IOrderProduct } from "../@Types/productType";

export const orderUrl = "https://nodeapiproject-shop.onrender.com/api/v1/orders";

// פונקציה ליצירת הזמנה חדשה
export const createOrder = (products: IOrderProduct[]) => {
    return axios.post(orderUrl, { products }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const getOrdersByUser = (userId: string) => {
    return axios.get(`${orderUrl}/user/${userId}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const getOrderByOrderId = (orderId: string) => {
    return axios.get(`${orderUrl}/${orderId}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const cancelOrder = (orderId: string) => {
    return axios.patch(`${orderUrl}/cancel/${orderId}`, {}, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const orderService = {
    createOrder,
    getOrdersByUser,
    getOrderByOrderId,
    cancelOrder,
};

export default orderService;