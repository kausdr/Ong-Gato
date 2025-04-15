import Input from "../../Components/data-input/Input";
import Card from "../../Components/Layout/Card"
import { UserList } from "./UserList"
import { Link, Outlet } from "react-router-dom";



export const UserManagement = () => {

    const users = [
        {
            nome: "LuisLuis Luis LuisLuis",
            email: "luis@gmail.com",
            cargo: ["adm", "user"]
        },
        {
            nome: "LuLuisis",
            email: "luis@gmail.com",
            cargo: ["adm", "user"]
        },
        {
            nome: "tereza terezatereza",
            email: "tereza@gmail.com",
            cargo: ["adm"]
        },
        {
            nome: "angela",
            email: "angela@gmail.com",
            cargo: ["user"]
        },
    ]

    return (



        <div className="p-10">
            <div className="flex flex-col gap-5 w-[80vw] m-auto">
                <div className="flex flex-row justify-between">
                    <h1 className="text-xl font-bold">Gerenciamento de Usuário</h1>
                    <Input label={""} type={"text"} id={""} name={""} />
                </div>

                <Card >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-100 text-left rounded-md">
                                <tr>
                                    <th className="py-[20px] px-[10px]">Nome</th>
                                    <th className="py-[20px] px-[10px]">E-mail</th>
                                    <th className="py-[20px] px-[10px]  w-[200px]">Cargo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <UserList
                                        nome={user.nome}
                                        email={user.email}
                                        cargo={user.cargo}
                                    ></UserList>
                                ))
                                }
                            </tbody>

                        </table>
                    </div>
                </Card>

                <Outlet />
            </div>
        </div>
    )
}

