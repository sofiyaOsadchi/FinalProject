import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* import Header from "../routes/Header/Header"; */


const Root = () => {

    return (
        <div className="flex flex-col min-h-screen text-blue-500">
           {  <Header /> }
            <main className="flex-1">
                <Outlet />
                
            </main>
            <Footer />

        </div>
    );
};

export default Root;