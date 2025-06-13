import Input from "../../../Components/data-input/Input"
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { UserService, User } from "../../../API/user.tsx"
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from '../../../Contexts/ToastContext';

const validateEmailRegex = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(password);

const validateTelephone = (telephone: string) => {
  const numbersOnly = telephone.replace(/\D/g, "");
  return /^\d{10,11}$/.test(numbersOnly);
};

const validateCEP = async (cep: string) => {
  try {
    const res = await axios.get(`/viacep/ws/${cep}/json/`);
    return !res.data.erro;
  } catch (err) {
    return false;
  }
}

const validateCPF = (rawCpf: string) => {
  const cpf = rawCpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let check = 11 - (sum % 11);
  if (check > 9) check = 0;
  if (check !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  check = 11 - (sum % 11);
  if (check > 9) check = 0;
  return check === parseInt(cpf[10]);
};

const formatCPF = (value: string) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 11);
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, p1, p2, p3, p4) =>
    `${p1}.${p2}.${p3}${p4 ? '-' + p4 : ''}`
  );
};

const formatPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 11);
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, p1, p2, p3) =>
      `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`
    );
  } else {
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, p1, p2, p3) =>
      `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`
    );
  }
};

const formatCEP = (value: string) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 8);
  return cleaned.replace(/(\d{5})(\d{0,3})/, (_, p1, p2) => `${p1}${p2 ? '-' + p2 : ''}`);
};

function Signup() {

    const navigate = useNavigate()
    const { showToast } = useToast();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [canCreate, setCanCreate] = useState<boolean>(false)
    const [cpf, setCpf] = useState<string>('')

    useEffect(() => {
      if (firstName && lastName && telephone && cep && email && address && password && confirmPassword && cpf) {
        setCanCreate(true)
      } else {
        setCanCreate(false)
      }
    }, [firstName, lastName, telephone, cep, email, address, password, confirmPassword, cpf])

    return (
        <div className="flex flex-col gap-20">
            <div className="flex justify-start">
                <h1 className="font-bold text-blue-900 text-xl ">CADASTRO</h1>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Input label="Primeiro nome" type="text" id="fname" name="fname" value={firstName} setValue={setFirstName} placeholder="Insira seu primeiro nome" />
                    <Input label="Último nome" type="text" id="lname" name="lname" value={lastName} setValue={setLastName} placeholder="Insira seu sobrenome" />
                </div>

                <div className="flex gap-2">
                    <Input label="Telefone" type="tel" id="tel" name="tel" placeholder="Digite seu telefone" value={telephone} setValue={(value) => setTelephone(formatPhone(value))} helperText="Digite apenas os números" className="w-full" />
                    <Input label="CPF" type="text" id="cpf" name="cpf" placeholder="Digite seu CPF" value={cpf} setValue={(value) => setCpf(formatCPF(value))} helperText="Digite apenas os números" className="w-full" />
                </div>
                <Input label="Endereço" type="text" id="adress" name="adress" placeholder="ex.: Av. Oswaldo Matoro, 176" value={address} setValue={setAddress} />
                <Input label="CEP" type="text" id="cep" name="cep" placeholder="Digite seu CEP" value={cep} setValue={(value) => setCep(formatCEP(value))} helperText="Digite apenas os números"/>

                <Input label="E-mail" type="email" icon={<CiMail />} id="email" name="email" placeholder="seuemail@email.com" value={email} setValue={setEmail} />
                <Input label="Senha" type="password" icon={<IoKeyOutline />} id="password" name="password" placeholder="Insira sua senha" value={password} setValue={setPassword} />
                <Input label="Confirme sua senha" type="password" icon={<IoKeyOutline />} id="password2" name="password2" placeholder="Confirme sua senha" value={confirmPassword} setValue={setConfirmPassword} />

                <Button 
                    order={canCreate ? `primary` : `inactive`} 
                    text="CADASTRE-SE" 
                    action={async () => {
                        if (!validateTelephone(telephone)) {
                            showToast("Telefone inválido! Use 10 ou 11 dígitos numéricos.", "error");
                            return;
                        }

                        const isCepValid = await validateCEP(cep);
                        if (!isCepValid) {
                            showToast("CEP inválido ou não encontrado.", "error");
                            return;
                        }

                        if (!validateEmailRegex(email)) {
                            showToast("E-mail inválido!", "error");
                            return;
                        }

                        if (!validatePassword(password)) {
                            showToast(
                                "Senha inválida! A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
                                "error"
                            );
                            return;
                        }

                        if (password !== confirmPassword) {
                            showToast("As senhas não coincidem!", "error");
                            return;
                        }

                        const [emailExists, error] = await UserService.validateEmail(email);
                        if (emailExists) {
                            showToast("Este e-mail já está cadastrado.", "warning");
                            console.log("E-mail já existente no sistema:" + error);
                            return;
                        }

                        if (!validateCPF(cpf)) {
                            showToast("CPF inválido!", "error");
                            return;
                        }

                        const newUser: User = {
                            userTypeID: 333,
                            firstName: firstName,
                            lastName: lastName,
                            telephone: telephone.replace(/\D/g, ''),
                            zipCode: cep.replace(/\D/g, ''),
                            email,
                            password,
                            address,
                            cpf: cpf.replace(/\D/g, ''),
                        };

                        const [response, creationError] = await UserService.createUser(newUser);
                        if (creationError) {
                            showToast("Erro ao criar usuário.", "error");
                        } else {
                            showToast("Usuário criado com sucesso!", "success");
                            console.log("Usuário criado com sucesso:", response);
                            navigate("/inicio/login");
                        }

                    }}
                />
                <a className="text-sky-700 cursor-pointer hover:text-sky-900" onClick={() => navigate("/inicio/login")}>Já possui uma conta?</a>
            </div>
        </div>
    )
}

export default Signup