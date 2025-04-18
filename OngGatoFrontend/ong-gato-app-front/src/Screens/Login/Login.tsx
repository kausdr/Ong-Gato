import Card from "../../Components/Layout/Card"
import Input from "../../Components/data-input/Input"
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Button from "../../Components/Layout/Button";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Signup from "../Signup/Signup";



function Login() {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-center">
                <h1 className="font-medium">LOGIN</h1>
            </div>

            <div className="flex flex-col gap-4">
                <Input label="E-mail" type="text" icon={<CiMail></CiMail>} id="email" name="email" placeholder="youremail@email.com"></Input>
                <Input label="Password" type="password" icon={<IoKeyOutline></IoKeyOutline>} id="password" name="password" placeholder="Insert your password"></Input>

                <Button order="primary" text="Login" action={() => { }}></Button>

                <a className="text-sky- 700 cursor-pointer hover:text-sky-900" onClick={() => navigate("/access/signup")}>Don't have an account?</a>
            </div>
        </div>

    )
}

export default Login