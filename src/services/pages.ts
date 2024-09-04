import axios from 'axios';

const pagesUrl = 'https://nodeapiproject-shop.onrender.com/api/v1/pages';

// יצירת עמוד חדש
export const createPage = (pageData: any) => {
    return axios.post(pagesUrl, pageData, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json" // שליחת נתונים כ-JSON
        }
    });
};

// קבלת כל העמודים
export const getAllPages = () => {
    return axios.get(pagesUrl, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

// קבלת עמוד לפי ID
export const getPage = (id: string) => {
    const url = `${pagesUrl}/${id}`;
    return axios.get(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

// עדכון עמוד קיים
export const updatePage = (pageId: string, pageData: any) => {
    const url = `${pagesUrl}/${pageId}`;
    return axios.put(url, pageData, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json" // עדכון כ-JSON
        }
    });
};

// מחיקת עמוד
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
