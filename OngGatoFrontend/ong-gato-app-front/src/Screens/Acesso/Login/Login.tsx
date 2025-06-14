import Input from "../../../Components/data-input/Input"
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../../Components/Layout/Button";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { UserService } from "../../../API/user";
import { useAuth } from "../../../Contexts/AuthContext"
import { useToast } from '../../../Contexts/ToastContext';

function Login() {

    const { login: loginContext } = useAuth()
    const { showToast } = useToast();

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [canCreate, setCanCreate] = useState<boolean> (false)

    const handleLogin = async (email: string, password: string) => {
        const [response, error] = await UserService.login(email, password)
        if (error) {
            console.log("Erro ao fazer login:" + error)
            showToast("Erro ao fazer login. Verifique suas credenciais.", "error");
        } else {
            console.log("Login realizado com sucesso:", response)
            showToast("Login realizado com sucesso!", "success");
            loginContext(response.user, response.token); 
            navigate("/homePage");
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
        <div className="flex flex-col gap-20">
            
            <div className="flex justify-start">
                <h1 className="font-bold text-xl " style={{ color: "var(--title-color)" }}>LOGIN</h1>
            </div>

            <div className="flex flex-col gap-4">
                <Input label="E-mail" type="text" icon={<CiMail></CiMail>} id="email" name="email" placeholder="seuemail@email.com" value={email} setValue={setEmail}></Input>
                <Input label="Senha" type="password" icon={<IoKeyOutline></IoKeyOutline>} id="password" name="password" placeholder="Insira sua senha" value={password} setValue={setPassword}></Input>

                <Button order={canCreate ? `primary` : `inactive`} text="Login" action={() => {
                    handleLogin(email, password)
                    }}></Button>

                <a className="text-sky-700 cursor-pointer hover:text-sky-900" onClick={() => navigate("/inicio/signup")}>Não possui uma conta ainda?</a>
            </div>
        </div>
    )
}

export default Login

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
}