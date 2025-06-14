import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Disclosure } from "@headlessui/react";
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
      <Disclosure as="nav" className="flex justify-center bg-[#28538F]">
      <div className="w-[85%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full flex h-16 items-center justify-between">
            <div className="flex flex-row gap-1 items-center mr-10">
              <img src="Images/OngLogoWhite.png" alt="Logo" className="w-10 h-10 rounded-full" />
            </div>
            <div className="hidden md:block w-full">
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <Button
                    order="nav"
                    onClick={() => navigate("/homePage")}
                    className={`justify-start ${activePage.homePage ? "bg-[#3B7BD4] text-blue-900 rounded-md" : ""}`}
                  >
                    Início
                  </Button>
                  <Button
                    order="nav"
                    onClick={() => navigate("/doar")}
                    className={`justify-start ${activePage.doar ? "bg-[#3B7BD4] text-blue-900 rounded-md" : ""}`}
                  >
                    Fazer Doação
                  </Button>
                  <Button
                    order="nav"
                    onClick={() => navigate("/relatorio")}
                    className={`justify-start ${activePage.relatorio ? "bg-[#3B7BD4] text-blue-900 rounded-md" : ""}`}
                  >
                    Relatórios
                  </Button>
                  <Button
                    order="nav"
                    onClick={() => navigate("/historico")}
                    className={`justify-start ${activePage.historico ? "bg-[#3B7BD4] text-blue-900 rounded-md" : ""}`}
                  >
                    Histórico de Doações
                  </Button>

                  {user && user.isAdmin && (
                    <>
                      <Button
                        order="nav"
                        onClick={() => navigate("/doadores")}
                        className={`justify-start ${activePage.doadores ? "bg-[#3B7BD4] text-sky-700 rounded-xl" : ""}`}
                      >
                        Doadores
                      </Button>
                      <Button
                        order="nav"
                        onClick={() => navigate("/gerenciar")}
                        className={`justify-start ${activePage.gerenciar ? "bg-[#3B7BD4] " : ""}`}
                      >
                        Gerenciar
                      </Button>
                    </>
                  )}
                </div>
                    <Button
                      order="nav"
                      icon={
                        user && user.profilePictureUrl ? (
                          <img
                            src={user.profilePictureUrl}
                            alt="Foto de perfil"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <IoPersonCircleOutline className={`text-3xl ${activePage.perfil ? "text-white" : "text-white"}`} />
                        )
                      }
                      onClick={() => navigate("/perfil")}
                      className={`justify-center items-center ${activePage.perfil ? "bg-[#3B7BD4] text-blue-900 rounded-md" : ""}`}
                    >
                        Perfil
                    </Button>
              </div>
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
