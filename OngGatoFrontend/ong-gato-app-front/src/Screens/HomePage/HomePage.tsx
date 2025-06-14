import mainImg from '/Images/mainPic.png'
import waveImg from '/Images/wave3.svg'
import dogImg from '/Images/dogImg.png'
import catImg from '/Images/catImg.png'
import foodImg from '/Images/foodImg.jpg'
import donateImg from '/Images/donate.jpg'
import chartImg from '/Images/chartImg.png'
import Footer from '../../Components/Layout/Footer'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
    return (
        <>
            <div className="min-h-full">
                <div className="flex flex-col  items-center py-20 relative">
                    <div className="w-[80%] flex flex-grow flex-col gap-20 lg:flex-row justify-between items-center md:items-start">
                        <div className="flex flex-col gap-3 justify-center items-center md:items-start">
                            <h1 className="font-bold text-[50px] text-center md:text-start" style={{ color: "var(--home-text-color)" }}>Meawnager</h1>
                            <h2 className="font-bold text-[30px] text-center md:text-start" style={{ color: "var(--home-text-color)" }}>🐾 Sobre Nós</h2>
                            <div className="flex flex-col text-xl max-w-140" style={{ color: "var(--home-text-color)" }}>
                                <p>
                                    Somos uma organização dedicada a transformar a vida de gatos em situação de risco por meio da solidariedade.
                                    Nosso sistema de gerenciamento de doações foi criado para facilitar o apoio de pessoas que desejam contribuir
                                    com alimentos, medicamentos, dinheiro ou outros recursos.
                                </p>

                                <p>
                                    Com transparência e praticidade, conectamos doadores a necessidades reais, garantindo que cada ajuda chegue onde realmente importa.
                                </p>

                                <span className="bg-yellow-400 text-blue-800 rounded-md px-1">
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
                    <img src={waveImg} className=" hide-in-dark w-full h-full object-cover absolute  z-[-1]"/>
                </div>

                <div className="flex flex-col pt-10" style={{backgroundColor: "var(--home-bg-color)"}}>
                    <div className=" pb-40">
                        <div className="flex justify-center">
                            <div className="w-[80%] flex flex-col gap-20">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col md:flex-row gap-20 justify-center" style={{color: "var(--home-text-color)"}}>
                                        <div className="flex flex-col gap-5 items-center" >
                                            <div className="rounded-md w-50 h-50  flex  justify-center items-center overflow-hidden" >
                                                <img src={foodImg} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <h3 className="text-xl font-bold ">Registrar</h3>
                                                <p className="w-50 text-center">Registre suas doações feitas em postos físicos.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 items-center">
                                            <div className="rounded-md w-50 h-50 bg-blue-400 flex  justify-center items-center overflow-hidden">
                                                <img src={donateImg} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <h3 className="text-xl font-bold ">Doar</h3>
                                                <p className="w-50 text-center">Ajude online, doe direto na plataforma.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 items-center">
                                            <div className="rounded-md w-50 h-50 bg-[#edc05f] flex  justify-center items-center overflow-hidden">
                                                <img src={chartImg} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <h3 className="text-xl font-bold">Acompanhe</h3>
                                                <p className="w-50 text-center">Acomponhe como estão os recursos da ONG.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex justify-center py-20">
                <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
                    <img src={dogImg} className="max-w-[200px]" />
                    <div className="flex flex-col items-center gap-20">
                        <div className="flex flex-col gap-3 items-center">
                            <h1 className="font-bold text-[40px] text-center w-100" style={{ color: "var(--home-text-color)" }}>Comece a fazer a diferença agora</h1>
                            <p style={{ color: "var(--home-text-color)" }}>Cada doação faz a diferença na vida de um gatinho.
                                <br />Contribua agora e ajude a espalhar amor e esperança.</p>
                        </div>
                        <a href="/doar" className="inline-block rounded-md bg-blue-900 px-6 py-3 text-white font-medium hover:bg-sky-900 transition">
                            Fazer uma Doação
                        </a>
                    </div>
                    <img src={catImg} className="max-w-[200px]" />
                </div>
            </div>
            <Footer />
        </>
    )
}
