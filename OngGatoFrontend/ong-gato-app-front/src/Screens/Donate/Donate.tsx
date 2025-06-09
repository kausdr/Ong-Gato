import Input from "../../Components/data-input/Input";
import { CiMail } from "react-icons/ci";
import { FaBrazilianRealSign, FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { FaBrazilianRealSign } from "react-icons/fa6";
import Button from "../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../Components/Layout/Card";
import { Donation, DonationService } from "../../API/donation";
import { BiDonateHeart } from "react-icons/bi";



function Donate() {

    const navigate = useNavigate();
    const [donateValue, setDonateValue] = useState<number>(0)
    const [canDonate, setCanDonate] = useState<boolean>(false)
    const [donationCategory, setDonationCategory] = useState<'dinheiro' | 'roupa' | 'alimento'>()
    const [pixCode, setPixCode] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)



    useEffect(() => {
        if (donateValue || amount) {
            setCanDonate(true)
        } else {
            setCanDonate(false)
        }
    }, [donateValue, amount])


    const createDonation = async (donation: Donation) => {
        const [response, erro] = await DonationService.createDonation(donation)

        if (erro) {
            console.log("erro ao criar doação "+erro)
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="flex flex-col gap-10 p-5 bg-white max-w-[500px]">
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-bold">Escolha em qual categoria doar:</h1>
                    <div className="flex gap-3">
                        <Button order={`${donationCategory == 'dinheiro' ? 'active' : 'secondary'}`} text="Dinheiro" action={() => {
                            setDonationCategory('dinheiro')
                            setAmount(0)

                        }} />
                        <Button order={`${donationCategory == 'roupa' ? 'active' : 'secondary'}`} text="Roupa" action={() => {
                            setDonationCategory('roupa')
                            setAmount(0)
                        }} />
                        <Button order={`${donationCategory == 'alimento' ? 'active' : 'secondary'}`} text="Alimentação" action={() => {
                            setDonationCategory('alimento')
                            setAmount(0)
                        }} />
                    </div>
                </div>
                {donationCategory == undefined ? (
                   <div className="w-full h-full flex flex-col gap-3 justify-center items-center mb-10">
                        <BiDonateHeart size={100} className="text-sky-100"/>
                        <h3 className="text-xl font-normal text-gray-400 ">Escolha uma categoria de doação</h3>
                   </div>
                ) : donationCategory == 'dinheiro' ? (
                     <>
                        {!pixCode ? (
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-1">
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

                                <Input label="Deseja inserir um valor personalizado?" type="number" icon={<FaBrazilianRealSign className="text-green-600" />} id="valor" name="valor" placeholder="Digite um valor para doar, ex: 15" value={donateValue} setValue={setDonateValue} mandatory={false} />

                                <Button order={canDonate ? `primary` : `inactive`} text="Doar" action={() => {
                                    setPixCode(true)
                                    // createDonation(
                                    //     {
                                    //         amount: donateValue,
                                    //         date: new Date().toISOString().replace('Z', '+00:00'),
                                    //         donatorId: 9,
                                    //         typeId: 8
                                    //     }
                                    // )

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
                    </>
                ) : donationCategory == 'roupa' ? (
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-xl font-bold">Doar</h1>
                                    <p className="text-slate-600">Registre a doação feita pessoalmente.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold">Tipo: <span className="text-sky-700">Roupa</span></h3>

                                    <Input type={'number'} id={"quantidade"} name={"quantidade"} label="Quantidade (unidades):" value={amount} setValue={setAmount}/>

                                </div>

                                <Button order={canDonate ? `primary` : `inactive`} text="Doar" action={() => {
                                    // createDonation(
                                    //     {
                                    //         amount: amount,
                                    //         date: new Date().toISOString().replace('Z', '+00:00'),
                                    //         donatorId: 9,
                                    //         typeId: 7
                                    //     }
                                    // )

                                }} />
                            </div>
                        )
                        : donationCategory == 'alimento' ? (
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-xl font-bold">Doar</h1>
                                    <p className="text-slate-600">Registre a doação feita pessoalmente.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold">Tipo: <span className="text-sky-700">Alimento</span></h3>

                                    <Input type={'number'} id={"quantidade"} name={"quantidade"} label="Quantidade (kg):" value={amount} setValue={setAmount}/>

                                </div>

                                <Button order={canDonate ? `primary` : `inactive`} text="Doar" action={() => {
                                    // createDonation(
                                    //     {
                                    //         amount: amount,
                                    //         date: new Date().toISOString().replace('Z', '+00:00'),
                                    //         donatorId: 9,
                                    //         typeId: 9
                                    //     }
                                    // )

                                }} />
                            </div>
                        )
                        : ""
                
                }


            </Card>
        </div>

    )
}

function Donate() {
  const navigate = useNavigate();
  const [donateValue, setDonateValue] = useState<number>(0);
  const [canDonate, setCanDonate] = useState<boolean>(false);
  const [pixCode, setPixCode] = useState<boolean>(false);
  useEffect(() => {
    setCanDonate(donateValue > 0);
  }, [donateValue]);

  return (
    <>
      <div className="min-h-full">
        <div className="w-full h-screen flex justify-center bg-white items-center">
          <Card className="flex flex-col gap-10 p-5 bg-white max-w-[500px]">
            {!pixCode ? (
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  <h1 className="text-xl font-bold">Doar</h1>
                  <p className="text-slate-600">Após escolher um valor, iremos gerar um código PIX para você realizar a doação por meio do seu banco de preferência.</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[10, 40, 55, 90, 150, 240].map((val) => (
                    <Button
                      key={val}
                      order="secondary"
                      text={val.toString()}
                      icon={<FaBrazilianRealSign className="text-green-600" />}
                      action={() => setDonateValue(val)}
                    />
                  ))}
                </div>

                <Input
                  label="Deseja inserir um valor personalizado?"
                  type="number"
                  icon={<FaBrazilianRealSign className="text-green-600" />}
                  id="valor"
                  name="valor"
                  placeholder="Digite um valor para doar, ex: 15"
                  value={donateValue}
                  setValue={setDonateValue}
                  mandatory={false}
                />

                <Button
                  order={canDonate ? "primary" : "inactive"}
                  text="Doar"
                  action={() => setPixCode(true)}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <h3 className="text-xl font-bold">Nós e nossos pets agradecemos a doação!</h3>
                <p>Seu código PIX está sendo gerado...</p>
                <Button
                  order="primary"
                  text="Doar mais"
                  action={() => {
                    setPixCode(false);
                    setDonateValue(0);
                  }}
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Donate;
