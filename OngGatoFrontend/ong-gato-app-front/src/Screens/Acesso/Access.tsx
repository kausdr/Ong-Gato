import { Outlet, useLocation } from "react-router-dom";
import Signup from "../Signup/Signup";
import Card from "../../Components/Layout/Card";
import Login from "../Login/Login";


export const Access = () => {

    const location = useLocation().pathname;

    const renderPanel = (pathname: string) => {
        if (pathname === '/login') {
            return <Login/>
        }
        if (pathname === '/signup') {
            return <Signup/>
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
        <Card className="flex flex-col gap-10 p-5">

            {renderPanel(location)}
            <Outlet/>
            
        </Card>
        
    </div>
    )
}