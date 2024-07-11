import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1/products";

// get all products
export const getAllProducts = () => axios.get(baseUrl);

//get product by id
export const getProductById = (id: string) => axios.get(`${baseUrl}/${id}`);