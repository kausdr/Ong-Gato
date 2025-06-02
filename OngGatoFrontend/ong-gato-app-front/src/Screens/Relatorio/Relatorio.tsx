import ReactECharts from 'echarts-for-react';
import Card from "../../Components/Layout/Card";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { LiaCatSolid } from 'react-icons/lia';
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
};

const navigation = [
  { name: 'Home Page', href: '/home-page', current: false },
  { name: 'Fazer Doação', href: '/doar', current: false },
  { name: 'Relatórios', href: '/relatorio', current: true },
  { name: 'Doadores', href: '/doadores', current: false },
  { name: 'Gerenciar', href: '/gerenciar', current: false },
  { name: 'Histórico', href: '/historico', current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '/perfil' },
  { name: 'Sign out', href: '#' },
];

export const Relatorio = () => {
  const donationByMonth = {
    months: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
    values: [12, 19, 9, 22, 15, 18, 25, 20, 30, 28, 26, 34]
  };

  const donationTypes = [
    { value: 15, name: 'Alimentos' },
    { value: 10, name: 'Roupas' },
    { value: 5, name: 'Dinheiro' },
    { value: 4, name: 'Outros' }
  ];

  const animalsReceived = [
    { name: 'Cães', value: 12 },
    { name: 'Gatos', value: 8 },
  ];

  const lineOptions = {
    title: { text: 'Doações por Mês (Últimos 12 meses)', left: 'center' },
    tooltip: { trigger: 'axis' as const },
    xAxis: { type: 'category' as const, data: donationByMonth.months },
    yAxis: { type: 'value' as const },
    series: [{
      data: donationByMonth.values,
      type: 'line' as const,
      smooth: true,
      areaStyle: {},
      color: '#3b82f6'
    }]
  };

  const pieOptions = {
    title: { text: 'Tipos de Doações (Último Mês)', left: 'center' },
    tooltip: { trigger: 'item' as const },
    legend: { orient: 'vertical' as const, left: 'left' },
    series: [{
      name: 'Tipo',
      type: 'pie' as const,
      radius: '60%',
      data: donationTypes,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  const barOptions = {
    title: { text: 'Animais Recebidos (Último Mês)', left: 'center' },
    tooltip: { trigger: 'axis' as const },
    xAxis: { type: 'category' as const, data: animalsReceived.map(a => a.name) },
    yAxis: { type: 'value' as const },
    series: [{
      data: animalsReceived.map(a => a.value),
      type: 'bar' as const,
      itemStyle: { color: '#10b981' },
      barWidth: '50%'
    }]
  };

  return (
    <>
      {/* NAVBAR */}
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
                  <Bars3Icon className="block size-6 data-[open=false]:block data-[open=true]:hidden" />
                  <XMarkIcon className="hidden size-6 data-[open=true]:block data-[open=false]:hidden" />
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

        {/* GRÁFICOS */}
        <main className="py-10 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <Card><ReactECharts option={lineOptions} /></Card>
            <Card><ReactECharts option={pieOptions} /></Card>
            <Card><ReactECharts option={barOptions} /></Card>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-emerald-500 mt-16 text-white relative">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-lg font-semibold mb-3">Contato</h3>
              <p>Email: meownager@email.com</p>
              <p>Telefone: (41) 99999-9999</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Endereço</h3>
              <p>Rua Imac. Conceição - 1155</p>
              <p>Prado Velho</p>
              <p>Curitiba - PR</p>
              <p>CEP: 80215-901</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Redes Sociais</h3>
              <div className="flex gap-4 text-2xl">
                <a href="#" aria-label="Instagram" className="hover:text-gray-200"><FaInstagram /></a>
                <a href="#" aria-label="Facebook" className="hover:text-gray-200"><FaFacebookF /></a>
                <a href="#" aria-label="Twitter" className="hover:text-gray-200"><FaTwitter /></a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
              <p>Receba atualizações sobre nossos resgates, eventos e necessidades.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
