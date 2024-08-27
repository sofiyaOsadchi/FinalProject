import axios from 'axios';

const pagesUrl = 'https://nodeapiproject-shop.onrender.com/api/v1/pages';

export const createPage = (formData: FormData) => {
    return axios.post(pagesUrl, formData, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data" // מבטיח שמבנה הנתונים ישלח כראוי
        }
    });
};

export const getAllPages = () => {
    return axios.get(pagesUrl, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

export const getPage = (id: string) => {
    const url = `${pagesUrl}/${id}`;
    return axios.get(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

export const updatePage = (pageId: string, formData: FormData) => {
    const url = `${pagesUrl}/${pageId}`;
    return axios.put(url, formData, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data" // גם כאן, המידע יישלח בצורה נכונה
        }
    });
};

export const deletePage = (pageId: string) => {
    const url = `${pagesUrl}/${pageId}`;
    return axios.delete(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

const pagesService = { createPage, getAllPages, getPage, updatePage, deletePage };

export default pagesService;
