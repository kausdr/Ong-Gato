import Card from "../../Components/Layout/Card"
import { GoGear } from "react-icons/go";
import Button from "../../Components/Layout/Button";

interface UserListProps {
    nome: string,
    email: string,
    cargo: string
}


export const UserList = ({ nome, email, cargo }: UserListProps) => {

    return (
        <tr className="border-b-1 border-gray-100">
            <td className="py-[10px]">
                <div className="px-[10px]">{nome}</div>
            </td>
            <td className="py-[10px]">
                <div className="px-[10px]">{email}</div>

            </td>
            <td className="py-[10px]">
                <div className="flex flex-wrap gap-2 px-[10px]">
                        <p className={`rounded-full py-1 px-4 ${cargo == "user" ? "bg-slate-200" : cargo == "adm" ? "bg-lime-200" : ""}`} >{cargo}</p>
                </div>
            </td>

            <td>
                <div>
                <Button order="secondary" text="Gerenciar Cargo" action={() => {}}></Button>
                </div>
            </td>
        </tr>
    )
}

