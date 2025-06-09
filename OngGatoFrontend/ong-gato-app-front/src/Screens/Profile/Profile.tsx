import { useEffect, useState } from "react";
import Card from "../../Components/Layout/Card"
import { MdOutlinePerson4 } from "react-icons/md";
import Input from "../../../src/Components/data-input/Input.tsx"
import Button from "../../Components/Layout/Button";
import { UserService, User } from "../../API/user.tsx"
import { useAuth } from "../../Contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

export const Profile = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [blockEdit, setBlockEdit] = useState<boolean>(true)
    const [profilePicture, setProfilePicture] = useState<string | null>(null)

    const [user, setUser] = useState<User | null>(null);

    const handleEdit = () => {
        setBlockEdit(!blockEdit)
    }

    const handleLogout = () => {
        logout();
        navigate("/access/login");
    };

    useEffect(() => {
        const fetchUser = async () => {
            const [data, error] = await UserService.getCurrentUser();
            if (data) {
                setUser(data);
                setFirstName(data.firstName || "");
                setLastName(data.lastName || "");
                setLastName(data.lastName || "");
                setTelephone(data.telephone || "");
                setCep(data.zipCode || "");
                setEmail(data.email || "");
                setAddress(data.address || "");
            }
        };

        fetchUser();
    }, []);


    return (
        <div className="flex justify-center items-center">
        <Card className="w-full">
            <div className="flex flex-col h-[calc(100vh-40px)] gap-5 p-10 bg-white">
                <h1 className="text-xl font-bold">Perfil</h1>
                <div className="flex flex-col lg:flex-row gap-30">
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-fit h-fit rounded-md border-2 border-slate-200 overflow-hidden">
                            {user?.profilePicture ? (
                                <img
                                    src={user.profilePicture}
                                    alt="Foto de perfil"
                                    className="w-[150px] h-[150px] object-cover"
                                />
                            ) : (
                                <MdOutlinePerson4 className="text-slate-300" size={150} />
                            )}
                        </div>

                        {!blockEdit && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            const base64Full = reader.result as string;
                                            const base64 = base64Full.split(',')[1];
                                            setProfilePicture(base64);
                                            setUser((prev) =>
                                                prev ? { ...prev, profilePicture: `data:image/jpeg;base64,${base64}` } : null
                                            );
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        )}

                        <Button order={`${blockEdit ? "primary" : "cancel"}`} text={`${blockEdit ? "Editar" : "Cancelar"}`} action={() => {
                            handleEdit()
                        }} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <Input label={"Primeiro Nome"} type="text" id="firstName" name="firstName" value={firstName} setValue={setFirstName} placeholder={`${user?.firstName ?? ""}`} inactive={blockEdit} mandatory={false} />
                            <Input label={"Sobrenome"} type="text" id="lastName" name="lastName" value={lastName} setValue={setLastName} placeholder={`${user?.lastName ?? ""}`} inactive={blockEdit} mandatory={false} />
                        </div>
                        <Input label={"Telefone"} type="number" id="tel" name="tel" value={telephone} setValue={setTelephone} className="w-full" placeholder={`${user?.telephone ?? ""}`} inactive={blockEdit} mandatory={false} />
                        <Input label={"Email"} type="email" id="email" name="email" value={email} setValue={setEmail} placeholder={`${user?.email ?? ""}`} inactive={blockEdit} mandatory={false} />
                        <Input label={"Endereço"} type="text" id="address" name="address" value={address} setValue={setAddress} placeholder={`${user?.address ?? ""}`} inactive={blockEdit} mandatory={false} />
                        <Input label={"CEP"} type="number" id="cep" name="cep" value={cep} setValue={setCep} placeholder={`${user?.zipCode ?? ""}`} inactive={blockEdit} mandatory={false} />
                        <div className="flex flex-col gap-4 items-center mt-4">
                            <Button order="quit" text="Sair" action={handleLogout} />
                        </div>

                        {!blockEdit && 
                        <Button order={`primary`} text="Salvar" action={async () => {
                            const payload: any = {
                                firstName,
                                lastName,
                                telephone,
                                zipCode: cep,
                                email,
                                address,
                            };

                            if (profilePicture) {
                                payload.profilePicture = profilePicture;
                            }

                            const [data, error] = await UserService.updateProfile(payload);
                            if (!error) {
                                setBlockEdit(true);
                                alert("Perfil atualizado com sucesso!");

                                const [updatedUser, err] = await UserService.getCurrentUser();
                                if (updatedUser) setUser(updatedUser);
                            } else {
                                console.error("Erro ao atualizar perfil:", error);
                                alert("Erro ao atualizar perfil. Verifique os dados e tente novamente.");
                            }
                        }} />
                        }
                    </div>
                </div>
            </div>
        </Card>
        </div>
    )
}