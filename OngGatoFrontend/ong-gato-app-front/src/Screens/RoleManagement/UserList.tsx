import Button from "../../Components/Layout/Button";
import ToggleSwitch from "../../Components/Layout/ToggleSwitch";
import { FaRegTrashAlt } from "react-icons/fa";

interface UserListProps {
    id: number,
    nome: string,
    email: string,
    cargo: boolean,
    onDelete: (id: number) => void,
    onManageRole: (id: number) => void,
    isCurrentUser: boolean,
};

export const UserList = ({ id, nome, email, cargo, onDelete, onManageRole, isCurrentUser }: UserListProps) => {

    const cargoTexto = cargo ? "admin" : "doador";
    const cargoClasse = cargo ? "text-slate-700 font-semibold bg-yellow-200" : "text-slate-800 bg-blue-200";

    return (
        <tr className={`text-slate-900 border-b-1 border-gray-100 ${isCurrentUser ? 'bg-blue-50' : ''}`}>
            <td className="py-[10px]">
                <div className="px-[10px]">{id}</div>
            </td>
            <td className="py-[10px]">
                <div className={` ${!isCurrentUser ? "" : "font-semibold"} px-[10px]`}>{nome}</div>
            </td>
            <td className="py-[10px]">
                <div className="px-[10px]">{email}</div>

            </td>
            <td className="py-[10px]">
                <div className="flex flex-wrap gap-2 px-[10px]">
                    <p className={`rounded-full py-1 px-4 ${cargoClasse}`}>
                        {cargoTexto}
                    </p>
                </div>
            </td>
            <td>
                <div className="flex flex-col md:flex-row gap-5 py-2 sm:gap-10 items-center justify-end md:py-0 sm:pr-2">
                    {!isCurrentUser &&
                        <>
                        <ToggleSwitch
                            checked={cargo}
                            onChange={() => onManageRole(id)}
                            disabled={isCurrentUser}
                        />

                        <Button
                        order="danger"
                        icon={<FaRegTrashAlt size={20} />}
                        action={() => onDelete(id)}
                        disabled={isCurrentUser}
                    />
                    </>
                    }


                </div>
            </td>
        </tr>
    );
};
