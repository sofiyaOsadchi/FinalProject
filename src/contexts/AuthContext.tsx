import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as auth from "../services/auth";
import { IUser } from "../@Types/types";


interface AuthContextType {
    token: string | null;
    user: IUser | undefined;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>
    register: (form: IUser) => Promise<void>
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const [user, setUser] = useState<IUser | undefined>()
    const [loading, setLoading] = useState<boolean>(true)


    const isLoggedIn = useMemo(() => user !== undefined, [user])

    useEffect(() => {
        setLoading(true)
        if (token) {
            const { _id } = jwtDecode(token) as any
            auth.userDetails(_id).then((res) => {
                setUser(res.data)
            }).finally(() => setLoading(false))
        }
        else {
            setLoading(false)
        }
    }, [token])


    const login = async (email: string, password: string) => {
        await auth
            .login({ email, password })
            .then((res) => {
                setToken(res.data);
                localStorage.setItem("token", res.data);
            })

    }

    const register = async (form: IUser) => {
        await auth
            .register(form)
    }

    const logout = () => {
        setToken(null);
        setUser(undefined)
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn, user, token, login, register, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
}