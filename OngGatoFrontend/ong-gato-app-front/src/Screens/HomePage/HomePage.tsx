import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { LiaCatSolid } from 'react-icons/lia'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
  return (
    <>
      <div className="min-h-full">
      {/* Section Sobre Nós */}
        <section className="flex flex-col lg:flex-row items-center justify-between bg-white p-8 shadow-md max-w-6xl mx-auto gap-8 mt-6">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-sky-800 mb-4">🐾 Sobre Nós</h2>
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Somos uma organização dedicada a transformar a vida de gatos em situação de risco por meio da solidariedade.
              Nosso sistema de gerenciamento de doações foi criado para facilitar o apoio de pessoas que desejam contribuir
              com alimentos, medicamentos, dinheiro ou outros recursos.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed">
              Com transparência e praticidade, conectamos doadores a necessidades reais, garantindo que cada ajuda chegue
              onde realmente importa. Juntos, podemos construir um futuro mais seguro e cheio de amor para os nossos amigos
              felinos. 💙🩵
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/Images/gato_ong.png"
              alt="Doação para gatos"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>
        </section>
      </div>

      {/* Section Junte-se à Causa */}
      <section className="mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-sky-800 mb-4">🌟 Junte-se à Nossa Causa</h2>
          <p className="text-lg text-gray-700 mb-6">
            Cada doação faz a diferença na vida de um gatinho. Contribua agora e ajude a espalhar amor e esperança. 💚
          </p>
          <a
            href="/doar"
            className="inline-block rounded-md bg-sky-800 px-6 py-3 text-white font-medium hover:bg-sky-900 transition"
          >
            Fazer uma Doação
          </a>
        </div>
      </section>

      {/* Section Nosso Impacto */}
      <section className="bg-white py-16 mt-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nosso Impacto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="bg-sky-800 p-6 rounded-xl shadow-lg">
              <p className="text-4xl font-extrabold text-white">5.000+</p>
              <p className="mt-2 text-white">Doações realizadas</p>
            </div>
            <div className="bg-sky-800 p-6 rounded-xl shadow-lg">
              <p className="text-4xl font-extrabold text-white">357</p>
              <p className="mt-2 text-white">Gatinhos ajudados</p>
            </div>
            <div className="bg-sky-800 p-6 rounded-xl shadow-lg">
              <p className="text-4xl font-extrabold text-white">R$ 11.000</p>
              <p className="mt-2 text-white">Reais arrecadados</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
