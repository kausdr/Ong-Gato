import Input from "../../../Components/data-input/Input"
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { UserService, User } from "../../../API/user.tsx"
import { useEffect, useState } from "react";

function Signup() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [canCreate, setCanCreate] = useState<boolean> (false)


    const createUser = async (newUser: User) => {
        const [response, error] = await UserService.createUser(newUser)

        console.log("sucesso ao criar user: " + response)
        if (error) {
            console.log("erro criar user " + error)
        }
    }


    useEffect(() => {
        if (name && lastName && telephone && cep && email && address && password && confirmPassword) {
            setCanCreate(true)
        } else {
            setCanCreate(false)
        }
    }, [name, lastName, telephone, cep, email, address, password, confirmPassword])



    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-center">
                <h1 className="font-medium">SIGNUP</h1>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Input label="Primeiro nome" type="text" id="fname" name="fname" value={name} setValue={setName} placeholder="Insira seu primeiro nome" />
                    <Input label="Último nome" type="text" id="lname" name="lname" value={lastName} setValue={setLastName} placeholder="Insira seu sobrenome" />
                </div>

                <div className="flex gap-2">
                    <Input label="Telefone" type="number" id="tel" name="tel" placeholder="Digite seu telefone" value={telephone} setValue={setTelephone} className="w-full" />
                </div>
                <Input label="Endereço" type="text" id="adress" name="adress" placeholder="Av. Oswaldo Matoro, 176" value={address} setValue={setAddress} />
                <Input label="CEP" type="number" id="cep" name="cep" placeholder="63748912" value={cep} setValue={setCep} />

                <Input label="E-mail" type="text" icon={<CiMail></CiMail>} id="email" name="email" placeholder="seuemail@email.com" value={email} setValue={setEmail}/>
                <Input label="Senha" type="password" icon={<IoKeyOutline></IoKeyOutline>} id="password" name="password" placeholder="Insira sua senha" value={password} setValue={setPassword} />
                <Input label="Confirme sua senha" type="password" icon={<IoKeyOutline></IoKeyOutline>} id="password" name="password" placeholder="Confirme sua senha" value={confirmPassword} setValue={setConfirmPassword} />

                <Button order={canCreate ? `primary` : `inactive`} text="SIGNUP" action={() => {
                    console.log("criou conta")
                    // createUser(
                    //     {
                    //         id: 3223,
                    //         userTypeID: 562,
                    //         birthDate: new Date(),
                    //         name: name,
                    //         telephone: telephone,
                    //         zipCode: cep,
                    //         email: email,
                    //         password: password,
                    //         address: ""
                    //     }
                    
                }}/>

                <a className="text-sky-700 cursor-pointer hover:text-sky-900" onClick={() => navigate("/access/login")}>Already have an account?</a>
            </div>
        </div>
    )
}

export default Signup