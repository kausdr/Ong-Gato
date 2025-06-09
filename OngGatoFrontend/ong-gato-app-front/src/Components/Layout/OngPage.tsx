import { Outlet, useLocation } from "react-router-dom"
import { LuHistory } from "react-icons/lu";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { RiListView } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsBarChartLine } from "react-icons/bs";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { LiaCatSolid } from 'react-icons/lia'
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useAuth } from "../../Contexts/AuthContext";

export const OngPage = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth();

    const activePage = {
        historico: pathname.includes("/historico"),
        doadores: pathname.includes("/doadores"),
        doar: pathname.includes("/doar"),
        gerenciar: pathname.includes("/gerenciar"),
        relatorio: pathname.includes("/relatorio"),
        perfil: pathname.includes("/perfil"),
        homePage: pathname.includes("/homePage"),
        signout: pathname.includes("#")
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-blue-200">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center ">
                        <div className="w-full flex items-center justify-between">
                            <div className="flex flex-row gap-1 items-center">
                                <img src="/Images/OngLogo.png" alt="Logo" className="w-10 h-10 rounded-full" />
                            </div>
                            <div className="hidden md:block w-full">
                                <div className="flex w-full justify-between">
                                    <div className="flex">
                                    <Button
                                        order={"nav"}
                                        className={` text-white ${activePage.homePage ? "!text-white" : "text-white"} `}
                                        text={"Home Page"}
                                        action={() => { navigate("/homePage") }}
                                        className={`justify-start  ${activePage.homePage ? " text-white bg-blue-400 " : "text-white "}`} />

                                    <Button
                                        order={"nav"}
                                        className={` text-white ${activePage.doar ? "!text-white" : "text-white"} `}
                                        text={"Fazer Doação"}
                                        action={() => { navigate("/doar") }}
                                        className={`justify-start ${activePage.doar ? " text-white bg-blue-400" : "text-white"}`}/>

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
                                        className={` text-white ${activePage.gerenciar ? "!text-white" : "text-white"} `}
                                        text={"Gerenciar"}
                                        action={() => { navigate("/gerenciar") }}
                                        className={`justify-start ${activePage.gerenciar ? " text-white bg-blue-400" : "text-white"}`}/>

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