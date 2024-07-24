import axios from "axios";
import { IOrderProduct } from "../@Types/productType";

export const orderUrl = "http://localhost:8080/api/v1/orders";

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

export default {
    createOrder,
    getOrdersByUser,
};