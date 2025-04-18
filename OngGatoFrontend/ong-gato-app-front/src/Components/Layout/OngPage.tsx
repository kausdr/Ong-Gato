import { Outlet } from "react-router-dom"
import { LuHistory } from "react-icons/lu";
import Button from "./Button";
import { useNavigate } from "react-router-dom";



export const OngPage = () => {
    const navigate = useNavigate()


    return (
        <div className="flex w-full bg-slate-50 h-screen">
            <div role="navigation" className="flex flex-col gap-5 py-5 h-screen bg-white w-[100px] border-1 border-slate-200">
                <div className="flex flex-col w-full">
                    <Button
                    order={"nav"}
                    text={<LuHistory className="text-xl text-slate-500"/>}
                    action={() => {navigate("/historico")}}/>
                </div>
            </div>

            <div className="w-full rounded rounded-md">
                <Outlet />
            </div>

        </div>
    )
}