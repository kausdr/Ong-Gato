import { useEffect, useState } from "react";
import { Donation, DonationService } from "../../API/donation";
import Card from "../../Components/Layout/Card";
import { HistoryDisplay } from "./Components/HistoryDisplay"
import { Outlet } from "react-router-dom";

export const History = () => {
    const [donations, setDonations] = useState<Donation[]>([])

    // const donations = [
    //     {
    //         createdAt: '12/02/2025',
    //         nome: "LuisLuis Luis LuisLuis",
    //         email: "luis@gmail.com",
    //         value: "200"
    //     },
    //     {
    //         createdAt: '02/04/2025',
    //         nome: "LuLuisis",
    //         email: "luis@gmail.com",
    //         value: "200"
    //     },
    //     {
    //         createdAt: '12/02/2025',
    //         nome: "tereza terezatereza",
    //         email: "tereza@gmail.com",
    //         value: "200"
    //     },
    //     {
    //         createdAt: '12/02/2025',
    //         nome: "angela",
    //         email: "angela@gmail.com",
    //         value: "200"
    //     },
    // ]

    const fetchDonations = async () => {
        const [response, error] = await DonationService.getDonations()

        if (response) {
            setDonations(response)
            console.log(response)
        }
        console.log("É array?", Array.isArray(response)) 
        console.log("sucesso ao criar user: " + response)

        if (error) {
            console.log("erro ao buscar doações " + error)
        }
    }

    useEffect(() => {
        fetchDonations()
    }, [])

    return (
        <Card>
            <div className="flex flex-col w-full h-[calc(100vh-40px)] gap-5 p-10 bg-white">
                <h1 className="text-xl font-bold">Histórico de Doações</h1>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-100 text-left rounded-md">
                            <tr>
                                <th className="py-[20px] px-[10px] w-[20%]">Tipo</th>
                                <th className="py-[20px] px-[10px]">Quantidade</th>
                                <th className="py-[20px] px-[10px]">Doador</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation, index) => (
                                <HistoryDisplay
                                    date={donation.date}
                                    key={index}
                                    type={donation.type}
                                    amount={donation.amount}
                                    donator={donation.donator}
                                />
                            ))
                            }
                        </tbody>

                    </table>
                </div>


                <Outlet />
            </div>
        </Card>
    )
}

