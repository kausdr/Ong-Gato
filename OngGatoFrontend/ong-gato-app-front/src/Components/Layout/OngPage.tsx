import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuHistory } from "react-icons/lu";
import { RiListView } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
import { IoHomeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsBarChartLine } from "react-icons/bs";
import { Disclosure } from '@headlessui/react';
import Button from "./Button";
import { useAuth } from "../../Contexts/AuthContext";

export const OngPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const activePage = {
    historico: pathname.includes("/historico"),
    doadores: pathname.includes("/doadores"),
    doar: pathname.includes("/doar"),
    gerenciar: pathname.includes("/gerenciar"),
    relatorio: pathname.includes("/relatorio"),
    perfil: pathname.includes("/perfil"),
    homePage: pathname.includes("/homePage"),
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-blue-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex flex-row gap-1 items-center">
              <img src="/Images/OngLogo.png" alt="Logo" className="w-10 h-10 rounded-full" />
            </div>
            <div className="hidden md:block w-full">
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <Button
                    order="nav"
                    text="Home Page"
                    action={() => navigate("/homePage")}
                    className={`justify-start ${activePage.homePage ? "bg-blue-100 text-blue-900 rounded-xl" : "text-blue-400 rounded-xl"}`}
                  />
                  <Button
                    order="nav"
                    text="Fazer Doação"
                    action={() => navigate("/doar")}
                    className={`justify-start ${activePage.doar ? "bg-blue-100 text-blue-900 rounded-xl" : "text-blue-400 rounded-xl"}`}
                  />
                  <Button
                    order="nav"
                    text="Relatórios"
                    action={() => navigate("/relatorio")}
                    className={`justify-start ${activePage.relatorio ? "bg-blue-100 text-blue-900 rounded-xl" : "text-blue-400 rounded-xl"}`}
                  />
                  <Button
                    order="nav"
                    text="Histórico de Doações"
                    action={() => navigate("/historico")}
                    className={`justify-start ${activePage.historico ? "bg-blue-100 text-blue-900 rounded-xl" : "text-blue-400 rounded-xl"}`}
                  />

                  {user && user.isAdmin && (
                    <>
                      <Button
                        order="nav"
                        icon={<RiListView className={`text-xl ${activePage.doadores ? "text-sky-700" : "text-slate-500"}`} />}
                        text="Doadores"
                        action={() => navigate("/doadores")}
                        className={`justify-start ${activePage.doadores ? "bg-sky-100 text-sky-700 rounded-xl" : "text-white rounded-xl"}`}
                      />
                      <Button
                        order="nav"
                        icon={<MdOutlineManageAccounts className={`text-xl ${activePage.gerenciar ? "text-blue-400" : "text-blue-400"}`} />}
                        text="Gerenciar"
                        action={() => navigate("/gerenciar")}
                        className={`justify-start ${activePage.gerenciar ? "bg-blue-100 text-blue-400 rounded-xl" : "text-white rounded-xl"}`}
                      />
                    </>
                  )}
                </div>
                    <Button
                      order="nav"
                      icon={
                        user && user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt="Foto de perfil"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <IoPersonCircleOutline className={`text-3xl ${activePage.perfil ? "text-blue-900" : "text-blue-400"}`} />
                        )
                      }
                      text="Perfil"
                      action={() => navigate("/perfil")}
                      className={`justify-center items-center ${activePage.perfil ? "bg-blue-100 text-blue-900 rounded-xl" : "text-blue-400 rounded-xl"}`}
                    />
              </div>
            </div>
          </div>
        </div>
      </Disclosure>

      <div className="w-full rounded-md">
        <Outlet />
      </div>
    </div>
  );
};
