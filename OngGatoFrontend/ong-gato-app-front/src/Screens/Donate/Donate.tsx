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

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
  };

  const navigation = [
    { name: 'Home Page', href: '/home-page', current: false },
    { name: 'Fazer Doação', href: '/doar', current: true },
    { name: 'Relatórios', href: '/relatorio', current: false },
    { name: 'Doadores', href: '/doadores', current: false },
    { name: 'Gerenciar', href: '/gerenciar', current: false },
    { name: 'Histórico', href: '/historico', current: false },
  ];

  const userNavigation = [
    { name: 'Your Profile', href: '/perfil' },
    { name: 'Sign out', href: '#' },
  ];

  useEffect(() => {
    setCanDonate(donateValue > 0);
  }, [donateValue]);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-emerald-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <LiaCatSolid className="text-white" size={40} />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-white text-emerald-600'
                            : 'text-white hover:bg-white hover:text-emerald-600',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <IoPersonCircleOutline className="text-white" size={32} />
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="block size-6" aria-hidden="true" />
                  <XMarkIcon className="hidden size-6" aria-hidden="true" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <IoPersonCircleOutline className="text-white" size={40} />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <div className="w-full h-screen flex justify-center bg-gray-800 items-center">
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

        <footer className="bg-emerald-500 mt-16 text-white relative">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

                  {/* Contato */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contato</h3>
                    <p>Email: meownager@email.com</p>
                    <p>Telefone: (41) 99999-9999</p>
                  </div>

                  {/* Endereço */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Endereço</h3>
                    <p>Rua Imac. Conceição - 1155</p>
                    <p>Prado Velho</p>
                    <p>Curitiba - PR</p>
                    <p>CEP: 80215-901</p>
                  </div>

                  {/* Redes Sociais */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Redes Sociais</h3>
                    <div className="flex gap-4 text-2xl">
                      <a href="#" aria-label="Instagram" className="hover:text-gray-200"><FaInstagram /></a>
                      <a href="#" aria-label="Facebook" className="hover:text-gray-200"><FaFacebookF /></a>
                      <a href="#" aria-label="Twitter" className="hover:text-gray-200"><FaTwitter /></a>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Receba Novidades</h3>
                    <form className="flex flex-col gap-2">
                      <input
                        type="email"
                        placeholder="Seu e-mail"
                        className="p-2 rounded text-black"
                      />
                      <button type="submit" className="bg-white text-emerald-600 font-semibold rounded p-2 hover:bg-gray-100">
                        Inscrever-se
                      </button>
                    </form>
                  </div>
                </div>

                {/* Mapa */}
                <div className="max-w-7xl mx-auto px-4 pb-12">
                  <h3 className="text-lg font-semibold mb-3">Como Chegar</h3>
                  <iframe
                    className="w-full h-64 rounded"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114150.02542633498!2d-49.36581905533019!3d-25.456349027170665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dcef60aa2e91d5%3A0x1cbb729ef2b3fd4d!2sPUCPR%20-%20Pontif%C3%ADcia%20Universidade%20Cat%C3%B3lica%20do%20Paran%C3%A1!5e0!3m2!1spt-BR!2sbr!4v1716769830052!5m2!1spt-BR!2sbr"
                    loading="lazy"
                  />
                </div>

                {/* Direitos autorais */}
                <div className="border-t border-emerald-400 py-4 text-center text-sm">
                  © {new Date().getFullYear()} MeowNager. Todos os direitos reservados.
                </div>

                {/* WhatsApp Flutuante */}
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
                >
                  <FaWhatsapp className="text-2xl" />
                </a>
              </footer>
      </div>
    </>
  );
}

export default Donate;
