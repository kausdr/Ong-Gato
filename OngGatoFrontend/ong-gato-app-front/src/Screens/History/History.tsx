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


    const mockDonations: Donation[] = [
  {
    id: 1,
    amount: 10,
    date: "2025-05-01",
    type: {
      id: 1,
      name: "Roupa"
    },
    donator: {
      id: 1,
      name: "Maria Souza",
      birthDate: "1990-06-15",
      telephone: "41999999999",
      zipCode: "80010-000",
      email: "maria.souza@example.com",
      address: "Rua das Flores, 123",
      password: "senhaSegura123",
      userTypeID: 2
    }
  },
  {
    id: 2,
    amount: 25,
    date: "2025-04-15",
    type: {
      id: 2,
      name: "Alimento"
    },
    donator: {
      id: 2,
      name: "João Pedro",
      birthDate: "1985-09-22",
      telephone: "41988888888",
      zipCode: "80020-000",
      email: "joao.pedro@example.com",
      address: "Av. Brasil, 456",
      password: "outroExemploDeSenha",
      userTypeID: 2
    }
  },
  {
    id: 3,
    amount: 200,
    date: "2025-03-28",
    type: {
      id: 3,
      name: "Dinheiro"
    },
    donator: {
      id: 3,
      name: "Carla Martins",
      birthDate: "1995-01-10",
      telephone: "41977777777",
      zipCode: "80030-000",
      email: "carla.martins@example.com",
      address: "Rua XV de Novembro, 789",
      password: "senha123",
      userTypeID: 2
    }
  },
  {
    id: 4,
    amount: 5,
    date: "2025-03-20",
    type: {
      id: 4,
      name: "Brinquedos"
    },
    donator: {
      id: 4,
      name: "Ana Clara",
      birthDate: "2000-11-05",
      telephone: "41966666666",
      zipCode: "80040-000",
      email: "ana.clara@example.com",
      address: "Rua Marechal, 1010",
      password: "minhaSenhaForte",
      userTypeID: 2
    }
  }
];




    useEffect(() => {
        fetchDonations()
    }, [])

    return (
        <Card>
            {mockDonations.length <= 0 ? ("Ainda não há doações") : (

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
                                {mockDonations.map((donation, index) => (
                                    <HistoryDisplay
                                        date={donation.date}
                                        key={index}
                                        type={donation.type.name}
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
            )}

        </Card>
    )
}

