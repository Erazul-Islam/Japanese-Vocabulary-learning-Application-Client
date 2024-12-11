import { Outlet } from "react-router-dom";
import Navbar from "../component/nav/Navbar";
import FooterLayout from "../shared/Footer/Footer";

const Root = () => {
    return (
        <div className=''>
            <Navbar />
            <Outlet />
            <FooterLayout/>
        </div>
    );
};

export default Root;