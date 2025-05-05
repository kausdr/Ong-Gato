import Card from "../../Components/Layout/Card";
import { HistoryDisplay } from "./Components/HistoryDisplay"
import { Outlet } from "react-router-dom";

export const History = () => {

    const donations = [
        {
            createdAt: '12/02/2025',
            nome: "LuisLuis Luis LuisLuis",
            email: "luis@gmail.com",
            value: "200"
        },
        {
            createdAt: '02/04/2025',
            nome: "LuLuisis",
            email: "luis@gmail.com",
            value: "200"
        },
        {
            createdAt: '12/02/2025',
            nome: "tereza terezatereza",
            email: "tereza@gmail.com",
            value: "200"
        },
        {
            createdAt: '12/02/2025',
            nome: "angela",
            email: "angela@gmail.com",
            value: "200"
        },
    ]

    return (
        <Card>
        <div className="flex flex-col w-full h-[calc(100vh-40px)] gap-5 p-10 bg-white">
            <h1 className="text-xl font-bold">Histórico de Doações</h1>

                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-100 text-left rounded-md">
                    <tr>
                        <th className="py-[20px] px-[10px] w-[20%]">Data</th>
                        <th className="py-[20px] px-[10px]">Nome</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {donations.map((donation) => (
                        <HistoryDisplay
                        name={donation.nome}
                        createdAt={donation.createdAt}
                        value={donation.value}     
                        />
                    ))
                    }
                    </tbody>

                </table>
                </div>
            

            <Outlet/>
        </div>
        </Card>
    )
}

