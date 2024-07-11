import axios from "axios";
import { ILogin, IUser } from "../@Types/types";

export const baseUrl = "http://localhost:8080/api/v1";
export const usersUrl = `${baseUrl}/users`;
export const loginUrl = `${baseUrl}/users/login`;

export const register = (data: IUser) => axios.post(usersUrl, data);
export const login = (data: ILogin) => axios.post(loginUrl, data);


export const userDetails = (id: string, token:string) => {
    const url = `${usersUrl}/${id}`;
    return axios.get(url,
        {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        }
    );

};

export const businessUser = (id: string) => {
    const url = `${usersUrl}/${id}`;
    return axios.patch(url, {
        isBusiness: true,
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}
//login user


export const auth = {
    register,
    login,
    userDetails,
};

export default auth;