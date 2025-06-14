import Input from "../../Components/data-input/Input";
import { FaBrazilianRealSign } from "react-icons/fa6";
import Button from "../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../Components/Layout/Card";
import { CreateDonationPayload, DonationService } from "../../API/donation";
import { BiDonateHeart } from "react-icons/bi";
import Footer from '../../Components/Layout/Footer'
import { useAuth } from "../../Contexts/AuthContext";
import { useToast } from "../../Contexts/ToastContext";

type DonationCategory = 'DINHEIRO' | 'ROUPA' | 'ALIMENTO' | 'BRINQUEDO';

function Donate() {

    const navigate = useNavigate();
    const { user } = useAuth();
    const { showToast } = useToast();

    const [donationCategory, setDonationCategory] = useState<DonationCategory>();
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState<number>(0)

    const [showSuccess, setShowSuccess] = useState(false);
    
    const canDonate = amount > 0;

    const handleDonate = async () => {
        if (!canDonate || !donationCategory) return;
        if (!user) {
            showToast('Você precisa estar logado para doar.', 'error');
            navigate('/inicio');
            return;
        }

        setIsLoading(true);

        const donationPayload: CreateDonationPayload = {
            amount: Number(amount),
            type: donationCategory,
            donator: user.id!,
        };

        const [response, error] = await DonationService.createDonation(donationPayload);

        if (response) {
            showToast('Doação registrada com sucesso! Muito obrigado!', 'success');
            setShowSuccess(true);
        } else {
            console.error("Erro ao criar doação: ", error);
            showToast('Ocorreu um erro ao registrar sua doação.', 'error');
        }
        setIsLoading(false);
    };

    const handleCategoryClick = (category: DonationCategory) => {
        setDonationCategory(category);
        setAmount(0);
        setShowSuccess(false);
    };

    if (showSuccess) {
        return (
            <div className="flex-grow flex justify-center items-center p-4">
                <Card className="flex flex-col gap-5 p-10 bg-white max-w-[500px] text-center">
                    <BiDonateHeart size={100} className="text-sky-500 mx-auto"/>
                    <h1 className="font-bold text-blue-900 text-2xl">Obrigado pela sua doação!</h1>
                    <p className="text-slate-600">Nós e nossos gatinhos agradecemos imensamente a sua ajuda.</p>
                    <Button order="primary" onClick={() => handleCategoryClick(donationCategory!)}>
                        Doar Novamente
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex justify-center items-center p-4">
                <Card className="flex flex-col gap-10 p-5 bg-white max-w-[500px]">
                    <div className="flex flex-col gap-5">
                        <h1 className="font-bold text-blue-900 text-xl ">Escolha em qual categoria doar:</h1>
                        <div className="flex gap-3">
                            <Button order={donationCategory === 'DINHEIRO' ? 'active' : 'secondary'}
                                onClick={() => handleCategoryClick('DINHEIRO')}
                            >
                                Dinheiro
                            </Button>
                            <Button order={donationCategory === 'ROUPA' ? 'active' : 'secondary'}
                                onClick={() => handleCategoryClick('ROUPA')}
                            >
                                Roupa
                            </Button>
                            <Button order={donationCategory === 'ALIMENTO' ? 'active' : 'secondary'}
                                onClick={() => handleCategoryClick('ALIMENTO')}
                            >
                                Alimento
                            </Button>
                            <Button order={donationCategory === 'BRINQUEDO' ? 'active' : 'secondary'}
                                onClick={() => handleCategoryClick('BRINQUEDO')}
                            >
                                Brinquedo
                            </Button>
                        </div>
                    </div>

                    {!donationCategory ? (
                    <div className="w-full h-full flex flex-col gap-3 justify-center items-center mb-10">
                            <BiDonateHeart size={100} className="text-sky-100"/>
                            <h3 className="text-xl font-normal text-gray-400 ">Escolha uma categoria de doação</h3>
                    </div>
                    ) : (
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-1">
                                <h1 className="font-bold text-blue-900 text-xl capitalize">{donationCategory.toLowerCase()}</h1>
                                {donationCategory === 'DINHEIRO' && <p className="text-slate-600">Após confirmar, um código PIX será gerado.</p>}
                                {donationCategory !== 'DINHEIRO' && <p className="text-slate-600">Registre a doação feita pessoalmente na ONG.</p>}
                            </div>

                            <Input
                                type={'number'}
                                id={"quantidade"}
                                name={"quantidade"}
                                label={donationCategory === 'DINHEIRO' ? 'Valor da doação:' : 'Quantidade (unidades/kg):'}
                                icon={donationCategory === 'DINHEIRO' ? <FaBrazilianRealSign className="text-green-600"/> : undefined}
                                value={amount}
                                setValue={setAmount}
                                min={0}
                            />
                            
                            <Button order="primary" onClick={handleDonate} isLoading={isLoading} disabled={!canDonate}>
                                {donationCategory === 'DINHEIRO' ? 'Gerar PIX e Doar' : 'Registrar Doação'}
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
            <Footer />
        </div>
    );
}

export default Donate;
