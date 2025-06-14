import { useEffect, useState } from "react";
import { Donation, DonationService } from "../../API/donation";
import Card from "../../Components/Layout/Card";
import { HistoryDisplay } from "./Components/HistoryDisplay"
import Footer from '../../Components/Layout/Footer'
import Placeholder from "../../Components/Layout/Placeholder";
import { useAuth } from "../../Contexts/AuthContext";

export const History = () => {
    const [donations, setDonations] = useState<Donation[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        const fetchUserDonations = async () => {
            setIsLoading(true);
            
            const serviceCall = user.isAdmin 
                ? DonationService.getDonations()
                : DonationService.getMyDonations();

            const [response, error] = await serviceCall;

            if (Array.isArray(response)) {
                setDonations(response);
            } else {
                setDonations([]);
            }
            if (error) {
                console.error("Erro ao buscar doações:", error);
            }
            setIsLoading(false);
        };

        fetchUserDonations();
    }, [user]);

    if (isLoading) {
        return <Placeholder text="Carregando histórico..." />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Card>
                {donations.length === 0 ? (
                    <Placeholder text={user?.isAdmin ? "Nenhuma doação encontrada no sistema." : "Você ainda não fez nenhuma doação."} />
                ) : (
                    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] gap-5 p-10 bg-white">
                        <h1 className="font-bold text-blue-900 text-xl">Histórico de Doações</h1>
                        <div className="overflow-x-auto rounded-md">
                            <table className="w-full">
                                <thead className="bg-blue-200 text-left text-slate-800">
                                    <tr>
                                        <th className="py-3 px-2">Tipo</th>
                                        <th className="py-3 px-2">Data</th>
                                        <th className="py-3 px-2">Quantidade/Valor</th>
                                        {user?.isAdmin && <th className="py-3 px-2">Doador</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation) => (
                                        <HistoryDisplay
                                            key={donation.id}
                                            donation={donation}
                                            isAdmin={user?.isAdmin || false}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Card>
            <Footer />
        </div>
    );
};

