import Input from "../../Components/data-input/Input";
import { FaBrazilianRealSign, FaQrcode } from "react-icons/fa6";
import Button from "../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../Components/Layout/Card";
import { CreateDonationPayload, DonationService } from "../../API/donation";
import { BiDonateHeart, BiCopy } from "react-icons/bi";
import Footer from '../../Components/Layout/Footer'
import { useAuth } from "../../Contexts/AuthContext";
import { useToast } from "../../Contexts/ToastContext";

type DonationCategory = 'DINHEIRO' | 'ROUPA' | 'ALIMENTO' | 'BRINQUEDO';

type DonationStep = 'SELECT_AMOUNT' | 'SHOW_PIX' | 'CONFIRMED';

function Donate() {

    const navigate = useNavigate();
    const { user } = useAuth();
    const { showToast } = useToast();

    const [donationCategory, setDonationCategory] = useState<DonationCategory>();
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState<number>(0)

    const [step, setStep] = useState<DonationStep>('SELECT_AMOUNT');
    const [pixCode, setPixCode] = useState('');
    
    const canDonate = amount > 0;
    const presetValues = [10, 25, 50, 100, 150, 250];

    useEffect(() => {
        if (step === 'SHOW_PIX') {
            const timer = setTimeout(() => {
                handleRegisterDonation();
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [step]);

    const handleRegisterDonation = async () => {
        if (!user || !donationCategory) return;
        setIsLoading(true);

        const donationPayload: CreateDonationPayload = {
            amount: Number(amount),
            type: donationCategory,
            donator: user.id!,
        };

        const [response, error] = await DonationService.createDonation(donationPayload);
        if (response) {
            setStep('CONFIRMED');
        } else {
            console.error("Erro ao registrar doação: ", error);
            showToast('Ocorreu um erro ao registrar sua doação.', 'error');
            setStep('SELECT_AMOUNT');
        }
        setIsLoading(false);
    };

    const handleDonateClick = () => {
        if (!canDonate) return;

        if (!user) {
            showToast('Você precisa estar logado para doar.', 'error');
            navigate('/inicio');
            return;
        }

        if (donationCategory !== 'DINHEIRO') {
            handleRegisterDonation();
        } else {
            const fakePixCode = (Math.random() + 1).toString(36).substring(2) + Date.now().toString(36);
            setPixCode(fakePixCode);
            setStep('SHOW_PIX');
        }
    };

    const handleCategoryClick = (category: DonationCategory) => {
        setDonationCategory(category);
        setAmount(0);
        setStep('SELECT_AMOUNT');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pixCode);
        showToast('Código PIX copiado!', 'success' );
    };

    const renderContent = () => {
        if (!donationCategory) {
            return (
                <div className="w-full flex flex-col gap-3 justify-center items-center my-10">
                    <BiDonateHeart size={100} className="text-sky-100"/>
                    <h3 className="text-xl font-normal text-gray-400">Selecione uma categoria</h3>
                </div>
            );
        }

        if (donationCategory === 'DINHEIRO') {
            switch (step) {
                case 'SHOW_PIX':
                    return (
                        <div className="flex flex-col gap-5 items-center text-center">
                            <h2 className="font-bold text-blue-900 text-xl">Pague com PIX</h2>
                            <p className="text-slate-600">Use o app do seu banco para ler o QR Code ou copie o código abaixo.</p>
                            <FaQrcode size={180} className="text-gray-800" />
                            <div className="w-full p-2 border-dashed border-2 border-gray-300 rounded-md flex items-center justify-between gap-2">
                                <p className="text-xs text-gray-700 break-all">{pixCode}</p>
                                <button onClick={copyToClipboard} title="Copiar código"><BiCopy size={20} className="text-sky-600 hover:text-sky-800 flex-shrink-0"/></button>
                            </div>
                            <p className="font-semibold text-sky-700 animate-pulse mt-4">Aguardando pagamento...</p>
                        </div>
                    );
                case 'CONFIRMED':
                    return (
                        <div className="flex flex-col gap-5 items-center text-center">
                            <BiDonateHeart size={100} className="text-green-500 mx-auto"/>
                            <h1 className="font-bold text-green-600 text-2xl">Pagamento Confirmado!</h1>
                            <p className="text-slate-600">Sua doação de R$ {amount} foi recebida. Muito obrigado!</p>
                            <Button order="primary" onClick={() => handleCategoryClick('DINHEIRO')}>Doar Novamente</Button>
                        </div>
                    );
                case 'SELECT_AMOUNT':
                default:
                    return (
                        <div className="flex flex-col gap-10">
                             <h1 className="font-bold text-blue-900 text-xl">Doação em Dinheiro</h1>
                             <div className="grid grid-cols-3 gap-3">
                                {presetValues.map(value => (
                                    <Button key={value} order={amount === value ? 'active' : 'secondary'} onClick={() => setAmount(value)}>R$ {value}</Button>
                                ))}
                             </div>
                            <Input icon={<FaBrazilianRealSign />} id="valor" name="valor" type="number" label="Ou digite um valor personalizado:" value={amount} setValue={setAmount} min={0} />
                            <Button order="primary" onClick={handleDonateClick} isLoading={isLoading} disabled={!canDonate}>Gerar PIX e Doar</Button>
                        </div>
                    );
            }
        } else {
             if (step === 'CONFIRMED') {
                return (
                    <div className="flex flex-col gap-5 items-center text-center">
                        <BiDonateHeart size={100} className="text-green-500 mx-auto"/>
                        <h1 className="font-bold text-green-600 text-2xl">Doação Registrada!</h1>
                        <p className="text-slate-600">Sua doação de {amount} {donationCategory === 'ROUPA' ? 'peça(s) de roupa' : donationCategory === 'ALIMENTO' ? 'kg de alimento' : 'brinquedo(s)'} foi registrada. Muito obrigado!</p>
                        <Button order="primary" onClick={() => handleCategoryClick(donationCategory)}>Registrar Nova Doação</Button>
                    </div>
                );
             }
            return (
                <div className="flex flex-col gap-10">
                    <h1 className="font-bold text-blue-900 text-xl capitalize">Doação de {donationCategory.toLowerCase()}</h1>
                    <p className="text-slate-600">Registre a doação feita pessoalmente na ONG.</p>
                    <Input type="number" id="quantidade" name="quantidade" label="Quantidade (unidades/kg):" value={amount} setValue={setAmount} min={0} />
                    <Button order="primary" onClick={handleDonateClick} isLoading={isLoading} disabled={!canDonate}>Registrar Doação</Button>
                </div>
            );
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex justify-center items-center p-4">
                <Card className="flex flex-col gap-10 p-5 bg-white max-w-[500px]">
                    <div className="flex flex-col gap-5">
                        <h1 className="font-bold text-blue-900 text-xl">Faça sua doação</h1>
                        <div className="flex gap-3">
                            <Button order={donationCategory === 'DINHEIRO' ? 'active' : 'secondary'} onClick={() => handleCategoryClick('DINHEIRO')}>Dinheiro</Button>
                            <Button order={donationCategory === 'ROUPA' ? 'active' : 'secondary'} onClick={() => handleCategoryClick('ROUPA')}>Roupa</Button>
                            <Button order={donationCategory === 'ALIMENTO' ? 'active' : 'secondary'} onClick={() => handleCategoryClick('ALIMENTO')}>Alimento</Button>
                            <Button order={donationCategory === 'BRINQUEDO' ? 'active' : 'secondary'} onClick={() => handleCategoryClick('BRINQUEDO')}>Brinquedo</Button>
                        </div>
                    </div>
                    {renderContent()}
                </Card>
            </div>
            <Footer />
        </div>
    );
}

export default Donate;
