import Button from "../../Components/Layout/Button";
import ToggleSwitch from "../../Components/Layout/ToggleSwitch";

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
    const cargoClasse = cargo ? "text-slate-700 bg-sky-200" : "text-slate-700 bg-slate-200";

    return (
        <tr className={`border-b-1 border-gray-100 ${isCurrentUser ? 'bg-blue-50' : ''}`}>
            <td className="py-[10px]">
                <div className="px-[10px]">{id}</div>
            </td>
            <td className="py-[10px]">
                <div className="px-[10px]">{nome}</div>
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
                <div className="flex gap-2">
                    <ToggleSwitch
                        checked={cargo} 
                        onChange={() => onManageRole(id)}
                        disabled={isCurrentUser}
                    />
                    <Button
                        order="danger"
                        text="Remover"
                        action={() => onDelete(id)}
                        disabled={isCurrentUser}
                    />
                </div>
            </td>
        </tr>
    );
};
