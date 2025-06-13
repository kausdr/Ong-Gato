import Card from "../../Components/Layout/Card"
import { Outlet } from "react-router-dom";
import { ListDonatorsItem } from "./ListDonatorsItem";
import { Donation, DonationService } from "../../API/donation";
import { useEffect, useState } from "react";
import { User, UserService } from "../../API/user";

export const ListDonators = () => {
    const [donations, setDonations] = useState<Donation[]>([])
    const [users, setUsers] = useState<User[]>([])


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

        const fetchUsers = async () => {
        const [response, error] = await UserService.getUsers()

        if (response) {
            setUsers(response)
            console.log(response)
        }

        console.log("sucesso ao criar user: " + response)
        if (error) {
            console.log("erro criar user " + error)
        }
    }

    useEffect(() => {
        fetchDonations()
        fetchUsers()
    }, [])

    const mockDonators = [
        {
            id: 1,
            name: "Maria Souza",
            email: "maria.souza@example.com",
            amount: 10
        },
        {
            id: 2,
            name: "João Pedro",
            email: "joao.pedro@example.com",
            amount: 25
        },
        {
            id: 3,
            name: "Carla Martins",
            email: "carla.martins@example.com",
            amount: 200
        },
        {
            id: 4,
            name: "Ana Clara",
            email: "ana.clara@example.com",
            amount: 5
        }
    ];


    return (
        <Card>
            {
                users.length <= 0 ? ("Ainda não há doadores")
                    : (
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
                                        {users.length != 0 ?
                                            (
                                                users.map((donation) => (
                                                    <ListDonatorsItem
                                                        name={donation.firstName ?? "Nome não informado"}
                                                        email={donation.email ?? "Email não informado"}
                                                    ></ListDonatorsItem>
                                                ))

                                            ) : ("oi")
                                        }

                                    </tbody>

                                </table>
                            </div>


                            <Outlet />
                        </div>
                    )
            }

        </Card>
    )
}

