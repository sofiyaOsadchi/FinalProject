import { Outlet } from "react-router-dom";
/* import Header from "../routes/Header/Header"; */


const Root = () => {

    return (
        <div className="flex flex-col min-h-screen text-blue-500">
           {/*  <Header /> */}
            <main className="flex-1">
                <Outlet />
            </main>

        </div>
    );
};

export default Root;