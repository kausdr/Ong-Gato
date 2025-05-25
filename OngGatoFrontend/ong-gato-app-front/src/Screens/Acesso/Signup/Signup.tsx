import Input from "../../../Components/data-input/Input"
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { UserService, User } from "../../../API/user.tsx"
import { useEffect, useState } from "react";
import axios from "axios";

const validateEmailRegex = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(password);

const validateTelephone = (telephone: string) =>
  /^\d{10,11}$/.test(telephone);

const validateCEP = async (cep: string) => {
  try {
    const res = await axios.get(`/viacep/ws/${cep}/json/`);
    return !res.data.erro;
  } catch (err) {
    return false;
  }
}

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
    const [canCreate, setCanCreate] = useState<boolean>(false)

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

                <Input label="E-mail" type="text" icon={<CiMail />} id="email" name="email" placeholder="seuemail@email.com" value={email} setValue={setEmail} />
                <Input label="Senha" type="password" icon={<IoKeyOutline />} id="password" name="password" placeholder="Insira sua senha" value={password} setValue={setPassword} />
                <Input label="Confirme sua senha" type="password" icon={<IoKeyOutline />} id="password" name="password" placeholder="Confirme sua senha" value={confirmPassword} setValue={setConfirmPassword} />

                <Button 
                    order={canCreate ? `primary` : `inactive`} 
                    text="SIGNUP" 
                    action={async () => {
                        if (!validateTelephone(telephone)) {
                            alert("Telefone inválido! Use 10 ou 11 dígitos numéricos.");
                            return;
                        }

                        const isCepValid = await validateCEP(cep);
                        if (!isCepValid) {
                            alert("CEP inválido ou não encontrado.");
                            return;
                        }

                        if (!validateEmailRegex(email)) {
                            alert("E-mail inválido!");
                            return;
                        }

                        if (!validatePassword(password)) {
                            alert(
                                "Senha inválida! A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
                            );
                            return;
                        }

                        if (password !== confirmPassword) {
                            alert("As senhas não coincidem!");
                            return;
                        }

                        const [emailExists, error] = await UserService.validateEmail(email);
                        if (emailExists) {
                            alert("Este e-mail já está cadastrado.");
                            return;
                        }

                        const newUser: User = {
                            userTypeID: 333,
                            birthDate: new Date().toISOString(),
                            name: `${name} ${lastName}`.trim(),
                            telephone,
                            zipCode: cep,
                            email,
                            password,
                            address,
                        };

                        const [response, creationError] = await UserService.createUser(newUser);
                        if (creationError) {
                            alert("Erro ao criar usuário.");
                        } else {
                            alert("Usuário criado com sucesso!");
                            navigate("/access/login");
                        }

                    }}
                />
                <a className="text-sky-700 cursor-pointer hover:text-sky-900" onClick={() => navigate("/inicio/login")}>Already have an account?</a>
            </div>
        </div>
    )
}

export default Signup