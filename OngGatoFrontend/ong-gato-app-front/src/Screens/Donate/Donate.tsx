import Input from "../../Components/data-input/Input";
import { CiMail } from "react-icons/ci";
import { FaBrazilianRealSign, FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import Button from "../../Components/Layout/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../Components/Layout/Card";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { LiaCatSolid } from 'react-icons/lia';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
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
