import { Outlet, useLocation } from "react-router-dom"
import { LuHistory } from "react-icons/lu";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { RiListView } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsBarChartLine } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useAuth } from "../../Contexts/AuthContext";

export const OngPage = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const { user } = useAuth();

    const activePage = {
        historico: pathname.includes("/historico"),
        doadores: pathname.includes("/doadores"),
        doar: pathname.includes("/doar"),
        gerenciar: pathname.includes("/gerenciar"),
        relatorio: pathname.includes("/relatorio"),
        perfil: pathname.includes("/perfil"),
    };


    return (
        <div className="flex w-full bg-slate-50 h-screen">
            <div role="navigation" className="flex flex-col justify-between gap-2 py-5 h-screen bg-white w-[200px] border-1 border-slate-200">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2 items-center">
                        <img src="/OngLogo.png" alt="Logo" className="w-16 h-16 rounded-full" />
                        <p className="text-sky-600">Meownager</p>
                    </div>

                    <div className="flex flex-col w-full">
                        <Button
                            order={"nav"}
                            icon={<LuHistory className={`text-xl text-slate-500 ${activePage.historico ? "!text-sky-700" : ""} `} />}
                            text={"Histórico"}
                            action={() => { navigate("/historico") }}
                            className={`justify-start ${activePage.historico ? "bg-sky-100 text-sky-700" : ""}`} />

                        {user && user.isAdmin && (
                            <>
                                <Button
                                    order={"nav"}
                                    icon={<RiListView className={`text-xl text-slate-500 ${activePage.doadores ? "!text-sky-700" : ""} `} />}
                                    text={"Doadores"}
                                    action={() => { navigate("/doadores") }}
                                    className={`justify-start ${activePage.doadores ? "bg-sky-100 text-sky-700" : ""}`}
                                />
                                <Button
                                    order={"nav"}
                                    icon={<MdOutlineManageAccounts className={`text-xl text-slate-500 ${activePage.gerenciar ? "!text-sky-700" : ""} `} />}
                                    text={"Gerenciar"}
                                    action={() => { navigate("/gerenciar") }}
                                    className={`justify-start ${activePage.gerenciar ? "bg-sky-100 text-sky-700" : ""}`}
                                />
                            </>
                        )}

                        <Button
                            order={"nav"}
                            icon={<BiDonateHeart className={`text-xl text-slate-500 ${activePage.doar ? "!text-sky-700" : ""} `} />}
                            text={"Doar"}
                            action={() => { navigate("/doar") }}
                            className={`justify-start ${activePage.doar ? "bg-sky-100 text-sky-700" : ""}`}
                        />

                        <Button
                            order={"nav"}
                            icon={<BsBarChartLine className={`text-xl text-slate-500 ${activePage.relatorio ? "!text-sky-700" : ""} `} />}
                            text={"Relatório"}
                            action={() => { navigate("/relatorio") }}
                            className={`justify-start ${activePage.relatorio ? "bg-sky-100 text-sky-700" : ""}`}
                        />
                    </div>
                </div>

                <Button
                    order={"nav"}
                    icon={
                        user && user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Foto de perfil"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <IoPersonCircleOutline className={`text-3xl text-slate-500 ${activePage.perfil ? "!text-sky-700" : ""}`} />
                        )
                    }
                    text={"Perfil"}
                    action={() => { navigate("/perfil") }}
                    className={`justify-center items-center ${activePage.perfil ? "bg-sky-100 text-sky-700" : ""}`}
                />
            </div>

            <div className="w-full rounded rounded-md">
                <Outlet />
            </div>

        </div>
    )
}