import { useEffect, useState, ChangeEvent } from "react";
import { MdOutlinePerson4 } from "react-icons/md";
import Input from "../../../src/Components/data-input/Input.tsx"
import Button from "../../Components/Layout/Button";
import { UserService, User } from "../../API/user.tsx"
import { useAuth } from "../../Contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useToast } from '../../Contexts/ToastContext';
import Footer from '../../Components/Layout/Footer'
import { FaRegEdit } from "react-icons/fa";

interface FormErrors {
    firstName?: string;
    lastName?: string;
    telephone?: string;
    cep?: string;
    address?: string;
}

export const Profile = () => {

    const { logout, updateUserContext } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [blockEdit, setBlockEdit] = useState<boolean>(true)

    const [user, setUser] = useState<User | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = "";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "";
        }

        if (!telephone.trim()) {
            newErrors.telephone = "";
        } else if (!/^\d{10,11}$/.test(telephone)) {
            newErrors.telephone = "O telefone deve conter 10 ou 11 dígitos.";
        }

        if (!cep.trim()) {
            newErrors.cep = "";
        } else if (!/^\d{8}$/.test(cep)) {
            newErrors.cep = "O CEP deve conter 8 dígitos.";
        }

        if (!address.trim()) {
            newErrors.address = "";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            showToast("Por favor, corrija os erros indicados.", "error");
            return;
        }

        const payload: any = {
            firstName,
            lastName,
            telephone,
            zipCode: cep,
            address,
        };

        const [data, error] = await UserService.updateProfile(payload);

        if (!error && data) {
            setBlockEdit(true);
            showToast("Perfil atualizado com sucesso!", "success");
            updateUserContext(data);
            setUser(data);
            setErrors({});
        } else {
            console.error("Erro ao atualizar perfil:", error);
            showToast("Erro ao atualizar perfil. Verifique os dados e tente novamente.", "error");
        }
    };

     const handlePictureUpload = async () => {
        if (!selectedFile) return;

        const [data, error] = await UserService.updateProfilePicture(selectedFile);

        if (!error && data) {
            showToast("Foto de perfil atualizada!", "success");
            updateUserContext(data);
            setUser(data);
            setPreviewUrl(null);
            setSelectedFile(null);
        } else {
            console.error("Erro ao enviar a foto:", error);
            showToast("Erro ao enviar a foto.", "error");
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEdit = () => {
        setBlockEdit(!blockEdit);
        if (!blockEdit) {
            setPreviewUrl(null);
            setSelectedFile(null);
        }
        setErrors({});
    };

    const handleLogout = () => {
        logout();
        navigate("/inicio");
    };

    useEffect(() => {
        const fetchUser = async () => {
            const [data] = await UserService.getCurrentUser();
            if (data) {
                setUser(data);
                setFirstName(data.firstName || "");
                setLastName(data.lastName || "");
                setTelephone(data.telephone || "");
                setCep(data.zipCode || "");
                setEmail(data.email || "");
                setAddress(data.address || "");
            }
        };

        fetchUser();
    }, []);

    const displayImageUrl = previewUrl || user?.profilePictureUrl;

    return (
        <div className="min-h-full flex flex-col">
            <div className="flex justify-center items-center flex-grow">
                <div className="flex flex-col  items-start gap-20 p-10" style={{ backgroundColor: "var(--bg-color)" }}>
                    <h1 className="font-bold text-xl " style={{ color: "var(--title-color)" }}>PERFIL</h1>
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="relative w-fit h-fit rounded-md border-2 border-slate-200 overflow-hidden ">
                                {displayImageUrl ? (
                                    <img
                                        src={displayImageUrl}
                                        alt="Foto de perfil"
                                        className="w-[150px] h-[150px] object-cover"
                                    />
                                ) : (
                                    <MdOutlinePerson4 className="text-slate-300" size={150} />
                                )}

                                {!blockEdit && (
                                    <div className="absolute bottom-2 right-2 flex justify-center items-center">
                                        <input
                                            id="profileUpload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label htmlFor="profileUpload" className=" cursor-pointer text-white font-semibold bg-[#28538f] hover:bg-[#214475] p-2 text-sm rounded-md transition">
                                            <FaRegEdit size={20}/>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {!blockEdit && selectedFile && (
                                <Button order="primary" onClick={handlePictureUpload} className="mt-2">
                                    Salvar Foto
                                </Button>
                            )}

                            <Button order={`${blockEdit ? "primary" : "cancel"}`} onClick={handleEdit} >
                                {blockEdit ? "Editar" : "Cancelar"}
                            </Button>
                            <Button order="quit" onClick={handleLogout} className="mt-10" >
                                Sair
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full">
                                    <Input label={"Primeiro Nome"} type="text" id="firstName" name="firstName" value={firstName} setValue={setFirstName} placeholder={`${user?.firstName ?? ""}`} inactive={blockEdit} mandatory={!blockEdit} />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>
                                <div className="w-full">
                                    <Input label={"Sobrenome"} type="text" id="lastName" name="lastName" value={lastName} setValue={setLastName} placeholder={`${user?.lastName ?? ""}`} inactive={blockEdit} mandatory={!blockEdit} />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div>
                                <Input label={"Telefone"} type="text" id="tel" name="tel" value={telephone} setValue={setTelephone} className="w-full" placeholder={`${user?.telephone ?? ""}`} inactive={blockEdit} mandatory={!blockEdit} />
                                {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                            </div>

                            <div>
                                <Input label={"Email"} type="email" id="email" name="email" value={email} setValue={setEmail} inactive={true} />
                                {!blockEdit && <p className="text-gray-500 text-xs mt-1">O e-mail não pode ser alterado.</p>}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div>
                                    <Input label={"CEP"} type="text" id="cep" name="cep" value={cep} setValue={setCep} placeholder={`${user?.zipCode ?? ""}`} inactive={blockEdit} mandatory={!blockEdit} />
                                    {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep}</p>}
                                </div>
                                <div className="w-full">
                                    <Input label={"Endereço"} type="text" id="address" name="address" value={address} setValue={setAddress} placeholder={`${user?.address ?? ""}`} inactive={blockEdit} mandatory={!blockEdit} />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-auto">
                                {!blockEdit &&
                                    <Button order={`primary`} className="w-full " onClick={handleSave} >
                                        Salvar Alterações
                                    </Button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}