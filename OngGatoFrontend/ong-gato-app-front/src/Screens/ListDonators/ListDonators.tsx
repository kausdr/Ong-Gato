import Card from "../../Components/Layout/Card"
import { Outlet } from "react-router-dom";
import { ListDonatorsItem } from "./ListDonatorsItem";
import { Donation, DonationService } from "../../API/donation";
import { useEffect, useState } from "react";



export const ListDonators = () => {
    const [donations, setDonations] = useState<Donation[]>([])


    const fetchDonations = async () => {
        const [response, error] = await DonationService.getDonations()

        if (response) {
            setDonations(response)
            console.log(response)
        }

        console.log("sucesso ao criar user: " + response)
        if (error) {
            console.log("erro criar user " + error)
        }
    }

    useEffect(() => {
        fetchDonations()
    }, [])

    return (
        <Card>
            <div className="flex flex-col w-full h-full gap-5 p-10 bg-white">
                <h1 className="text-xl font-bold">Lista de Doadores</h1>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-100 text-left rounded-md">
                            <tr>
                                <th className="py-[20px] px-[10px]">Nome</th>
                                <th className="py-[20px] px-[10px]">E-mail</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.length != 0 ?
                                (
                                    donations.map((donation) => (
                                        <ListDonatorsItem
                                            amount={donation.amount || 0}
                                        ></ListDonatorsItem>
                                    ))

                                ) : ("oi")
                            }

                        </tbody>

                    </table>
                </div>


                <Outlet />
            </div>
        </Card>
    )
}

