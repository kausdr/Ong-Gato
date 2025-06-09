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
import { IoPersonCircleOutline } from 'react-icons/io5'
import { LiaCatSolid } from 'react-icons/lia'
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { useState } from "react";

export const OngPage = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false)

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

                                    <Button
                                        order={"nav"}
                                        className={` text-white ${activePage.relatorio ? "!text-white" : "text-white"} `}
                                        text={"Relatórios"}
                                        action={() => { navigate("/relatorio") }}
                                        className={`justify-start ${activePage.relatorio ? " text-white bg-blue-400" : "text-white"}`}/>

                                    <Button
                                        order={"nav"}
                                        className={` text-white ${activePage.doadores ? "!text-white" : "text-white"} `}
                                        text={"Doadores"}
                                        action={() => { navigate("/doadores") }}
                                        className={`justify-start ${activePage.doadores ? " text-white bg-blue-400" : "text-white"}`}/>

                                    <Button
                                        order={"nav"}
                                        className={` text-white ${activePage.gerenciar ? "!text-white" : "text-white"} `}
                                        text={"Gerenciar"}
                                        action={() => { navigate("/gerenciar") }}
                                        className={`justify-start ${activePage.gerenciar ? " text-white bg-blue-400" : "text-white"}`}/>

                                    <Button
                                        order={"nav"}
                                        className={` text-white ${activePage.historico ? "!text-white" : "text-white"} `}
                                        text={"Histórico"}
                                        action={() => { navigate("/historico") }}
                                        className={`justify-start  ${activePage.historico ? " text-white bg-blue-400 " : "text-white "}`} />

                                    </div>

                                    <div className="relative inline-block">
                                        <div onClick={toggleDropdown}>
                                            <Button
                                                order={"nav"}
                                                icon={<IoPersonCircleOutline className={` text-white ${activePage.perfil ? "!text-white" : "text-white"} `} size={30}/>}
                                                action={() => {}}
                                                className={`justify-center ${activePage.perfil ? " text-white bg-blue-400" : "text-white"}`}/>
                                        </div>
                                        {isOpen && (
                                            <div
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                                                onMouseLeave={handleMouseLeave}>
                                                <div className="py-1 flex flex-col">
                                                    <Button
                                                        order={"dropdown"}
                                                        text={"Perfil"}
                                                        action={() => { navigate("/perfil") }}
                                                        className={`justify-center cursor-pointer  ${activePage.perfil ? "text-white bg-blue-400" : "text-slate-700 hover:bg-slate-200"}`}/>

                                                    <Button
                                                        order={"dropdown"}
                                                        text={"Sair"}
                                                        action={() => { }}
                                                        className={`justify-center cursor-pointer hover:bg-slate-200`}/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>

            <div className="w-full rounded rounded-md">
                <Outlet />
            </div>
        </div>
    )
}