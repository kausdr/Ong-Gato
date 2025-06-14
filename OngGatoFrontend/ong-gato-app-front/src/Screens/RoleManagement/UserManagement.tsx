import { useEffect, useState } from "react";
import { User, UserService } from "../../API/user";
import Card from "../../Components/Layout/Card"
import { UserList } from "./UserList"
import { Outlet } from "react-router-dom";
import { useToast } from '../../Contexts/ToastContext';
import { useAuth } from "../../Contexts/AuthContext";

export const UserManagement = ()=> {

    const { user: loggedInUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const { showToast } = useToast();

    const fetchUsers = async () => {
        const [response, erro] = await UserService.getUsers()

        if (response) {
            setUsers(response)
        }
        if (erro) {
            console.log("Erro ao pegar usuários " + erro)
        }
    };

    useEffect(() => {
        fetchUsers()
    }, []);

    const handleDelete = async (id: number) => {
        const userToDelete = users.find(u => u.id === id);
        const adminCount = users.filter(u => u.isAdmin).length;

        if (userToDelete?.isAdmin && adminCount <= 1) {
            showToast("Não é possível remover o único administrador.", "warning");
            return;
        }

        if (window.confirm("Tem certeza que deseja remover este usuário? Este usuário será deletado permanentemente!")) {
            const [, error] = await UserService.deleteUser(id);
            if (error) {
                showToast("Erro ao remover usuário: " + error.response?.data?.message, "error");
            } else {
                fetchUsers();
                showToast("Usuário removido com sucesso.", "success");
            }
        }
    };

    const handleManageRole = async (id: number) => {
        const userToUpdate = users.find(u => u.id === id);
        const adminCount = users.filter(u => u.isAdmin).length;

        if (userToUpdate?.isAdmin && adminCount <= 1) {
            showToast("Não é possível alterar o cargo do único administrador.", "warning");
            return;
        }

        const [, error] = await UserService.updateUserRole(id);
        if (error) {
                showToast("Erro ao atualizar cargo: " + error.response?.data?.message, "error");
        } else {
            fetchUsers();
            showToast("Cargo do usuário atualizado com sucesso.", "success");
        }
    };

    return (
        <Card>
        <div className="flex flex-col w-full h-full gap-5 p-10" style={{ backgroundColor: "var(--bg-color)" }}>
            <h1 className="font-bold text-xl " style={{ color: "var(--title-color)" }}>Gerenciamento de Usuário</h1>
                <div className="overflow-x-auto rounded-md">
                <table className="w-full" >
                    <thead className="text-left" style={{ backgroundColor: "var(--thead-color)", color: "var(--thead-text-color)" }}>
                        <tr>
                            <th className="py-[20px] px-[10px] w-[50px]">ID</th>
                            <th className="py-[20px] px-[10px]">Nome</th>
                            <th className="py-[20px] px-[10px]">E-mail</th>
                            <th className="py-[20px] px-[10px]  w-[200px]">Cargo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <UserList
                                key={user.id}
                                id={user.id!}
                                nome={`${user.firstName} ${user.lastName}`}
                                email={user.email ?? ""}
                                cargo={user.isAdmin ?? false}
                                onDelete={handleDelete}
                                onManageRole={handleManageRole}
                                isCurrentUser={user.id === loggedInUser?.id}
                            />
                        ))}
                    </tbody>
                </table>
                </div>
            <Outlet/>
        </div>
        </Card>
    )
}
