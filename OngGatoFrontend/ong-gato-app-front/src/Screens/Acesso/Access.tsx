import { Outlet, useNavigate } from "react-router-dom";
import Card from "../../Components/Layout/Card";
import foodImg from "/Images/foodImg.jpg"
import donateImg from "/Images/donate.jpg"
import chartImg from "/Images/chartImg.png"
import mainImg from "/Images/mainPic.png"
import waveImg from "/Images/wave3.svg"
import dogImg from "/Images/dogImg.png"
import catImg from "/Images/catImg.png"
import { useState } from "react";
import Footer from '../../Components/Layout/Footer'

export const Access = () => {
    const [canLogin, setCanLogin] = useState<boolean>(false)
    const navigate = useNavigate();
    const [homeButton, setHomeButton] = useState<'home' | 'login' | null>('home')

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-center">
                <div className="w-[80%] pt-5 flex justify-between items-center">
                    <div className="flex flex-row gap-1 items-center">
                        <img src="Images/OngLogo.png" alt="Logo" className="w-10 h-10 rounded-full" />
                        <h1 className="pt-serif-regular text-blue-800 font-bold text-[20px]">Meownager</h1>
                    </div>
                    <div className="flex gap-10">
                    <button className={`text-[#28538F] hover:text-blue-500 font-bold p-2 rounded-md cursor-pointer ${homeButton == 'home' ? 'text-blue-400 border-2 border-blue-400' : ''}`}
                    onClick={() => {
                        navigate("/inicio")
                        setHomeButton('home')
                        setCanLogin(false)}}
                    >
                        Início
                    </button>
                    <button className={`bg-[#28538F] hover:bg-blue-400 text-white font-bold p-2 rounded-md cursor-pointer ${homeButton == 'login' ? 'bg-blue-400' : 'bg-[#28538F]'}`}
                    onClick={() => {
                        navigate("/inicio/login")
                        setHomeButton('login')
                        setCanLogin(true)
                        }}>
                        Entrar
                    </button>
                    </div>
                    
                </div>
            </div>
        {!canLogin ? (
            <>
            <div className="flex flex-col items-center py-20 relative">
                <div className="w-[80%] flex flex-grow flex-col  gap-20 md:flex-row justify-between items-center md:items-start">
                    <div className="flex flex-col gap-3 justify-center items-center md:items-start">
                        <h1 className="text-blue-900 font-bold text-[40px] text-center md:text-start">Plataforma de gerenciamento</h1>
                        <div className="flex flex-col text-xl">
                            <p className="text-blue-900">Feita para quem faz a <span className="bg-yellow-400 rounded-md px-1">diferença.</span></p>
                            <p className="text-blue-900">Doe e gerencie doações.</p>

                        </div>
                        
                            <div className="flex flex-col text-xl text-blue-900 max-w-140 mt-10">
                                <h2 className="text-blue-900 font-bold text-[30px] text-center md:text-start">🐾 Sobre Nós</h2>
                                <p>
                                    Somos uma organização dedicada a transformar a vida de gatos em situação de risco por meio da solidariedade.
                                    Nosso sistema de gerenciamento de doações foi criado para facilitar o apoio de pessoas que desejam contribuir
                                    com alimentos, medicamentos, dinheiro ou outros recursos.
                                </p>

                                <p>
                                    Com transparência e praticidade, conectamos doadores a necessidades reais, garantindo que cada ajuda chegue onde realmente importa.
                                </p>

                                <span className="bg-yellow-400 rounded-md px-1">
                                    Juntos, podemos construir um futuro mais seguro e cheio de amor para os nossos amigos felinos. 💙🐾
                                </span>
                            </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="rounded-md w-40 h-40 md:w-100 md:h-100 p-2 flex  justify-center items-center">
                            <img src={mainImg} />
                        </div>
                    </div>
                </div>
                <img src={waveImg} className="w-full h-full object-cover absolute  z-[-1]" />


            </div>


            <div className="flex flex-col pt-10 bg-blue-200">
                <div className=" pb-40">
                    <div className="flex justify-center">
                        <div className="w-[80%] flex flex-col gap-20">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-xl text-center md:text-start font-normal text-blue-900">Como funciona?</h1>
                                <h3 className="text-[30px] text-center md:text-start font-bold text-blue-900">Tudo em um lugar só</h3>
                            </div>
                            <div className="flex flex-col md:flex-row gap-20 justify-center">
                                <div className="flex flex-col gap-5 items-center">
                                    <div className="rounded-md w-50 h-50  bg-blue-400 flex  justify-center items-center overflow-hidden">
                                        <img src={foodImg} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-xl font-bold text-blue-900">Registrar</h3>
                                        <p className="text-blue-900 w-50 text-center">Registre suas doações feitas em postos físicos.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="rounded-md w-50 h-50 bg-blue-400 flex  justify-center items-center overflow-hidden">
                                        <img src={donateImg} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-xl font-bold text-blue-900">Doar</h3>
                                        <p className="text-blue-900 w-50 text-center">Ajude online, doe direto na plataforma.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="rounded-md w-50 h-50 bg-[#edc05f] flex  justify-center items-center overflow-hidden">
                                        <img src={chartImg} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-xl font-bold text-blue-900">Acompanhe</h3>
                                        <p className="text-blue-900 w-50 text-center">Acomponhe como estão os recursos da ONG.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center bg-white py-20">
                    <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
                        <img src={dogImg} className="max-w-[200px]"/>
                        <div className="flex flex-col items-center gap-20">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="text-blue-900 font-bold text-[40px] text-center w-100">Comece a fazer a diferença agora</h1>
                                <p className="text-blue-900">Crie uma conta e acompanhe a ONG</p>
                            </div>
                            <button className="bg-blue-900 hover:bg-blue-400 text-white font-bold p-2 rounded-md cursor-pointer"
                            onClick={() =>  {
                                navigate("/inicio/signup")
                                setCanLogin(true)
                            }}
                            >Cadastrar</button>
                        </div>
                        <img src={catImg} className="max-w-[200px]"/>
                    </div>
                </div>
            </div>
            </>
        ) : (
            <div className="w-full flex flex-grow items-center justify-center">
                <Card className="flex flex-col gap-10 p-5">
                    <Outlet />
                </Card>
            </div> 
        )}
          <Footer />
        </div>
    )
}