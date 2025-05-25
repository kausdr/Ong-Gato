import Input from "../../../Components/data-input/Input"
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../../Components/Layout/Button";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { UserService } from "../../../API/user";



function Login() {

    const navigate = useNavigate();
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [canCreate, setCanCreate] = useState<boolean> (false)


    const verifyLogin = async () => {
        const [response, error] = await UserService.login(email, password)
        
        if (response) {
            console.log("Login bem-sucedido:", response)
            navigate("/historico")
        } else {
            alert("Login falhou. Verifique suas credenciais.")
        }
    }

    const login = async (email: string, password: string) => {
        const [response, error] = await UserService.login(email, password)
        if (error) {
            console.log("erro ao fazer login "+error)
        } else {
            console.log("response login "+response)
        }
    }

    useEffect(() => {
            if (email && password ) {
                setCanCreate(true)
            } else {
                setCanCreate(false)
            }
        }, [email, password])

    return (
        <div className="flex flex-col gap-5">
            
            <div className="flex justify-center">
                <h1 className="font-medium">LOGIN</h1>
            </div>

            <div className="flex flex-col gap-4">
                <Input label="E-mail" type="text" icon={<CiMail></CiMail>} id="email" name="email" placeholder="seuemail@email.com" value={email} setValue={setEmail}></Input>
                <Input label="Senha" type="password" icon={<IoKeyOutline></IoKeyOutline>} id="password" name="password" placeholder="Insira sua senha" value={password} setValue={setPassword}></Input>

                <Button order={canCreate ? `primary` : `inactive`} text="Login" action={() => {
                    login(email, password)
                    }}></Button>

                <a className="text-sky-700 cursor-pointer hover:text-sky-900" onClick={() => navigate("/inicio/signup")}>Não tem uma conta ainda?</a>
            </div>
        </div>
    )
}

export default Login

export function logout() {
    localStorage.removeItem('token')
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
}