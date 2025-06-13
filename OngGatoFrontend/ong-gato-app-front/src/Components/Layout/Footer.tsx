import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-200 mt-16 text-blue-900 relative">
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
              className="p-2 rounded text-blue-900 bg-white placeholder-blue-900"
            />
            <button type="submit" className="bg-blue-900 text-white font-semibold rounded p-2 hover:bg-blue-400">
              Inscrever-se
            </button>
          </form>
        </div>
      </div>

      {/* Mapa */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h3 className="text-lg font-semibold mb-3">Como Chegar</h3>

        <div className="flex gap-4 items-start">
          <div className="w-4/5">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d22778.951734303624!2d-49.252747!3d-25.451569!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce4fa6efc3181%3A0x8b0f452491a6f477!2sPUCPR%20-%20Pontif%C3%ADcia%20Universidade%20Cat%C3%B3lica%20do%20Paran%C3%A1!5e1!3m2!1spt-BR!2sbr!4v1749784580425!5m2!1spt-BR!2sbr"
                className="w-full h-64 rounded"
                style={{ border:0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div className="w-1/5">
              <img src="/Images/OngLogo.png" alt="Localização da ONG" className="w-full h-auto rounded" />
            </div>
        </div>
      </div>


      {/* Direitos autorais */}
      <div className="border-t border-sky-400 py-4 text-center text-sm">
        © {new Date().getFullYear()} Meownager. Todos os direitos reservados.
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
  );
};
