import { Outlet } from "react-router-dom"
import { LuHistory } from "react-icons/lu";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { RiListView } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";



export const OngPage = () => {
    const navigate = useNavigate()


    return (
        <div className="flex w-full bg-slate-50 h-screen">
            <div role="navigation" className="flex flex-col gap-5 py-5 h-screen bg-white w-[200px] border-1 border-slate-200">
                <div className="flex flex-col w-full">
                    <Button
                    order={"nav"}
                    icon={<LuHistory className="text-xl text-slate-500"/>}
                    text={"Histórico"}
                    action={() => {navigate("/historico")}}
                    className="justify-start"/>


                    <Button
                     order={"nav"}
                     icon={<RiListView className="text-xl text-slate-500"/>}
                     text={"Doadores"}
                     action={() => {navigate("/doadores")}}
                     className="justify-start"
                     />

                     <Button
                     order={"nav"}
                     icon={<BiDonateHeart className="text-xl text-slate-500"/>}
                     text={"Doar"}
                     action={() => {navigate("/doar")}}
                     className="justify-start"
                     />
                </div>
            </div>

            <div className="w-full rounded rounded-md">
                <Outlet />
            </div>

        </div>
    )
}