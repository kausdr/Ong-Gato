import Card from "../../Components/Layout/Card"
import { GoGear } from "react-icons/go";
import Button from "../../Components/Layout/Button";
import ToggleSwitch from "../../Components/Layout/ToggleSwitch";

interface UserListProps {
    nome: string,
    email: string,
    cargo: boolean
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
                    <p className={`rounded-full py-1 px-4 ${cargo ? "text-slate-700 bg-sky-200" : "text-slate-700 bg-slate-200"}`} >{cargo ? "admin" : "doador"}</p>
                </div>
            </td>

            <td>
                <div>
                    <ToggleSwitch/>
                </div>
            </td>
        </tr>
    )
}

