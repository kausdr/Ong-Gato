import Input from "../../../Components/data-input/Input"
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { UserService, User } from "../../../API/user.tsx"
import { useState } from "react";
import { number } from "echarts";

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


    const createUser = async (newUser: User) => {
        const [response, error] = await UserService.createUser(newUser)

            console.log("sucesso ao criar user: " + response)
        if (error) {
            console.log("erro criar user "  + error)
        }
    }

    return (
        <div>
            <div className="flex justify-center">
                <h1 className="font-medium">SIGNUP</h1>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Input label="First Name" type="text" id="fname" name="fname" value={name} setValue={setName} placeholder="Type your first name"/>
                    <Input label="Last Name" type="text" id="lname" name="lname" value={lastName} setValue={setLastName} placeholder="Type your last name"/>
                </div>

                <div className="flex gap-2">
                    <Input label="Telephone" type="number" id="tel" name="tel" placeholder="Type your telephone" value={telephone} setValue={setTelephone} className="w-full"/>
                </div>
                <Input label="Adress" type="text" id="adress" name="adress" placeholder="Av. Oswaldo Matoro, 176" value={address} setValue={setAddress}/>
                <Input label="CEP" type="number" id="cep" name="cep" placeholder="63748912" value={cep} setValue={setCep}/>

                <Input label="E-mail" type="text" icon={<CiMail></CiMail>} id="email" name="email" placeholder="youremail@email.com" value={email} setValue={setEmail}/>
                <Input label="Password" type="password" icon={<IoKeyOutline></IoKeyOutline>} id="password" name="password" placeholder="Insert your password" value={password} setValue={setPassword}/>
                <Input label="Confirm your password" type="password" icon={<IoKeyOutline></IoKeyOutline>} id="password" name="password" placeholder="Confirm password" value={confirmPassword} setValue={setConfirmPassword}/>

                <Button order="primary" text="SIGNUP" action={() => { 
                    createUser(
                        {
                            id: 3223,
                            userTypeID: 562,
                            birthDate: new Date(),
                            name: name,
                            telephone: telephone,
                            zipCode: cep,
                            email: email,
                            password: password
                        }
                    )
                 }}/>

                <a className="text-sky-700 cursor-pointer hover:text-sky-900" onClick={() => navigate("/access/login")}>Already have an account?</a>
            </div>
        </div>
    )
}

export default Signup