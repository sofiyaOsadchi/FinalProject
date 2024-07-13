import { Navigate } from "react-router-dom";
import { FCC } from "../@Types/types";


const ProtectedRouteUser: FCC = ({ children }) => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
        return <Navigate to={"/"} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRouteUser;