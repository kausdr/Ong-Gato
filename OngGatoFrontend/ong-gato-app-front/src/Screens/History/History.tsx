import { useEffect, useState } from "react";
import { Donation, DonationService } from "../../API/donation";
import Card from "../../Components/Layout/Card";
import { HistoryDisplay } from "./Components/HistoryDisplay"
import { Outlet } from "react-router-dom";
import Footer from '../../Components/Layout/Footer'
import Placeholder from "../../Components/Layout/Placeholder";
import { User, UserService } from "../../API/user";

export const History = () => {
    const [donations, setDonations] = useState<Donation[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const fetchCurrentUser = async () => {
        const [response, error] = await UserService.getCurrentUser();
        if (response) {
            setCurrentUser(response);
        } else {
            console.error("Erro ao buscar usuário atual:", error);
            setCurrentUser(null);
        }
    };

    const fetchDonations = async () => {
        const [response, error] = await DonationService.getDonations();

        if (Array.isArray(response)) {
            setDonations(response);
            console.log("Doações carregadas:", response);
        } else {
            console.warn("Resposta inesperada de doações:", response);
            setDonations([]);
        }

        if (error) {
            console.error("Erro ao buscar doações:", error);
            setDonations([]);
        }
    };

    const fetchAllDonations = async () => {
        const [response, error] = await DonationService.getDonations();

        if (Array.isArray(response)) {
            setDonations(response);
            console.log("Todas as doações carregadas:", response);
        } else {
            console.warn("Resposta inesperada de todas as doações:", response);
            setDonations([]);
        }

        if (error) {
            console.error("Erro ao buscar todas as doações:", error);
            setDonations([]);
        }
    };


    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser === null) {
            return;
        }

        if (currentUser.isAdmin) {
            fetchAllDonations();
        } else {
            fetchDonations();
        }
    }, [currentUser]);

    return (
        <div className="flex flex-col min-h-screen">
            <Card>
                {donations.length <= 0 ? (
                    currentUser?.isAdmin ? (
                        <Placeholder text="Não há doações ainda" />
                    ) : (
                        <Placeholder text="Você ainda não fez nenhuma doação" />
                    )
                ) : (
                    <div className="flex flex-col w-full h-[calc(100vh-40px)] gap-5 p-10 bg-white">
                        <h1 className="font-bold text-blue-900 text-xl ">Histórico de Doações</h1>
                        <div className="overflow-x-auto rounded-md">
                            <table className="w-full">
                                <thead className="bg-blue-200 text-left text-slate-800">
                                    <tr>
                                        <th className="py-[20px] px-[10px] w-[20%]">Tipo</th>
                                        <th className="py-[20px] px-[10px]">Quantidade</th>
                                        <th className="py-[20px] px-[10px]">Doador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation, index) => (
                                        <HistoryDisplay
                                            date={donation.date ?? ""}
                                            key={index}
                                            type={donation.type ?? { id: 0, name: "" }}
                                            amount={donation.amount ?? 0}
                                            donator={donation.donator ?? {}}
                                        />
                                    ))
                                    }
                                </tbody>

                            </table>
                        </div>
                        <Outlet />
                    </div>
                )}
            </Card>
            <Footer />
        </div>
    )
}

