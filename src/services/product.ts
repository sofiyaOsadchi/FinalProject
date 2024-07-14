import axios from "axios";
import { IProductInput } from "../@Types/productType";

export const baseUrl = "http://localhost:8080/api/v1/products";

// get all products
export const getAllProducts = () => axios.get(baseUrl);

//get product by id
export const getProductById = (id: string) => axios.get(`${baseUrl}/${id}`);

//create product
export const createNewProduct = (data: IProductInput) => {
    const url = `${baseUrl}/`;
    return axios.post(url, data, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};
//delete product
export const deleteProductById = (id: string) => {
    const url = `${baseUrl}/${id}`;
    return axios.delete(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

export const updateProduct = (id: string, product: IProductInput) => {
    const url = `${baseUrl}/${id}`;
    return axios.put(url, product, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

export const product = {
    getAllProducts,
    getProductById,
    createNewProduct,
};

export default product;