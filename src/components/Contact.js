import { FaEnvelope, FaDiscord } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className=" text-white py-16 px-4 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">
          Mes Contacts
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-12">
          {/* Colonne Discord */}
          <div className="flex-1 p-6 rounded-xl shadow-xl border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Mission Freelance</h3>
            <p className="text-gray-300 mb-6">
              Pour toute mission freelance ou projet ponctuel, vous pouvez me contacter directement sur Discord.
            </p>
            <a
              href="https://discord.com/users/817506409850994728"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7289DA] to-[#99AAB5] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <FaDiscord /> Me contacter sur Discord
            </a>
          </div>

          {/* Colonne Mail */}
          <div className="flex-1 p-6 rounded-xl shadow-xl border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Alternance / Opportunités</h3>
            <p className="text-gray-300 mb-6">
              Je suis actuellement à la recherche d'une alternance ou de nouvelles opportunités. Mon CV est disponible sur demande par email.
            </p>
            <a
              href="mailto:raton.mod@gmail.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#13B0F5] to-[#E70FAA] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <FaEnvelope /> Envoyer un email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
