import Input from "../../Components/data-input/Input";
import { CiMail } from "react-icons/ci";
import { FaBrazilianRealSign } from "react-icons/fa6";
import Button from "../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../Components/Layout/Card";



function Donate() {

    const navigate = useNavigate();
    const [donateValue, setDonateValue] = useState<number>(0)
    const [canDonate, setCanDonate] = useState<boolean>(false)
    const [pixCode, setPixCode] = useState<boolean>(false)



    useEffect(() => {
        if (donateValue) {
            setCanDonate(true)
        } else {
            setCanDonate(false)
        }
    }, [donateValue])


    return (
        <div className="w-full h-screen flex justify-center items-center">
        <Card className="flex flex-col gap-10 p-5 bg-white max-w-[500px]">
        {!pixCode ? (
            <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
            <h1 className="text-xl font-bold">Doar</h1>
            <p className="text-slate-600">Após escolher um valor iremos gerar um código PIX para você realizar a doação por meio do seu banco de preferência.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <Button order={"secondary"} text="10" icon={<FaBrazilianRealSign className="text-green-600" />} action={() => {
                    setDonateValue(10)
                }} />
                <Button order={"secondary"} text="40" icon={<FaBrazilianRealSign className="text-green-600" />} action={() => {
                    setDonateValue(40)
                }} />
                <Button order={"secondary"} text="55" icon={<FaBrazilianRealSign className="text-green-600" />} action={() => {
                    setDonateValue(55)
                }} />
                <Button order={"secondary"} text="90" icon={<FaBrazilianRealSign className="text-green-600" />} action={() => {
                    setDonateValue(90)
                }} />
                <Button order={"secondary"} text="150" icon={<FaBrazilianRealSign className="text-green-600" />} action={() => {
                    setDonateValue(150)
                }} />
                <Button order={"secondary"} text="240" icon={<FaBrazilianRealSign className="text-green-600" />} action={() => {
                    setDonateValue(240)
                }} />

            </div>

                <Input label="Deseja inserir um valor personalizado?" type="number" icon={<FaBrazilianRealSign className="text-green-600" />} id="valor" name="valor" placeholder="Digite um valor para doar, ex: 15" value={donateValue} setValue={setDonateValue} mandatory={false}/>

                <Button order={canDonate ? `primary` : `inactive`} text="Doar" action={() => {
                    setPixCode(true)
                }} />
        </div>
        ) : (
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-bold">Nós e nossos pets agradacemos a doação!</h3>
                <p>Seu código pix está sendo gerado...</p>
                <Button order={canDonate ? `primary` : `inactive`} text="Doar mais" action={() => {
                    setPixCode(false)
                }} />
            </div>
            
        )}
            
        </Card>
        </div>

    )
}

export default Donate