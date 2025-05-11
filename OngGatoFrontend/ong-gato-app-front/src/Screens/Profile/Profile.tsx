import { useEffect, useState } from "react";
import Card from "../../Components/Layout/Card"
import { MdOutlinePerson4 } from "react-icons/md";
import Input from "../../../src/Components/data-input/Input.tsx"
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../Components/Layout/Button";

export const Profile = () => {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [canCreate, setCanCreate] = useState<boolean>(false)
    const [blockEdit, setBlockEdit] = useState<boolean>(true)

    const user = {
        name: 'Carlos',
        lastName: 'Silva',
        telephone: '11987654321',
        cep: '01234-567',
        email: 'carlos.silva@email.com',
        address: 'Rua das Flores, 123 - São Paulo, SP',
    };

    const handleEdit = () => {
        setBlockEdit(!blockEdit)
    }


    useEffect(() => {
        setName(name)
        setLastName(lastName)
        setTelephone(telephone)
        setEmail(email)
    }, [])


    return (
        <div className="flex justify-center items-center">
        <Card>
            <div className="flex flex-col h-[calc(100vh-40px)] gap-5 p-10 bg-white">
                <h1 className="text-xl font-bold">Perfil</h1>
                <div className="flex flex-row gap-30">
                    <div className="flex flex-col gap-2">
                        <div className="w-fit h-fit rounded rounded-md border-2 border-slate-200">
                            <MdOutlinePerson4 className={`text-slate-300`} size={150} />
                        </div>

                        <Button order={`${blockEdit ? "primary" : "cancel"}`} text={`${blockEdit ? "Editar" : "Cancelar"}`} action={() => {
                            handleEdit()
                        }} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <Input label={"Nome"} type="text" id="fname" name="fname" value={name} setValue={setName} placeholder={`${user.name}`} inactive={blockEdit} mandatory={false} />
                            <Input label={"Sobrenome"} type="text" id="lname" name="lname" value={lastName} setValue={setLastName} placeholder={`${user.lastName}`} inactive={blockEdit} mandatory={false} />
                        </div>

                        <div className="flex gap-2">
                            <Input label={"Telefone"} type="number" id="tel" name="tel" value={telephone} setValue={setTelephone} className="w-full" placeholder={`${user.telephone}`} inactive={blockEdit} mandatory={false} />
                        </div>
                        <Input label={"Endereço"} type="text" id="adress" name="adress" value={address} setValue={setAddress} placeholder={`${user.address}`} inactive={blockEdit} mandatory={false} />
                        <Input label={"CEP"} type="number" id="cep" name="cep" value={cep} setValue={setCep} placeholder={`${user.cep}`} inactive={blockEdit} mandatory={false} />

                        {!blockEdit && 
                        <Button order={`primary`} text="Salvar" action={() => {
                            setBlockEdit(true)
                        }} />}


                    </div>
                </div>
            </div>
        </Card>
        </div>
    )
}