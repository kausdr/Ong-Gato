import { Outlet } from "react-router-dom";
import Card from "../../Components/Layout/Card";


export const Access = () => {


    return (
        <div className="w-full h-screen flex items-center justify-center">
        <Card className="flex flex-col gap-10 p-5">
            <Outlet/>
        </Card>
        
    </div>
    )
}