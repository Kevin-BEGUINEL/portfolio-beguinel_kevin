import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useData } from "../context/DataContext";
import type { Contact } from "../utils/types";

import cvImage from "../assets/cv/CV_BEGUINEL_Kevin.png";
import cvPdf from "../assets/cv/CV_BEGUINEL_Kevin.pdf";

const iconMap: { [key: string]: JSX.Element } = {
    github: <FaGithub className="text-3xl hover:text-gray-400 transition-colors" />,
    linkedin: <FaLinkedin className="text-3xl hover:text-blue-500 transition-colors" />,
};

export default function Contact() {
    const data = useData();
    const contactData = data?.contact ? data.contact : ({} as Contact);

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                from_nom: formData.nom,
                from_prenom: formData.prenom,
                from_email: formData.email,
                message: formData.message,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(
            () => {
                setSuccessMessage("Message envoyé avec succès !");
                setFormData({ nom: "", prenom: "", email: "", message: "" });
            },
            (error) => {
                console.error("Erreur d'envoi :", error);
                setSuccessMessage("Erreur lors de l'envoi du message.");
            }
        ).finally(() => setIsSending(false));
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white py-10 px-6">
            <h2 className="text-4xl font-bold text-center mb-8">Contacts</h2>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Colonne gauche */}
                <div className="order-2 md:order-1 md:w-1/2 flex flex-col gap-8 ">
                    {/* Formulaire de contact */}
                    <h3 className="text-2xl font-bold text-center">Me contacter</h3>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="nom"
                                    placeholder="Votre nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                />
                            </div>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="prenom"
                                    placeholder="Votre prénom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                />
                            </div>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Votre email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                />
                            </div>
                            <div className="relative">
                                <textarea
                                    name="message"
                                    placeholder="Votre message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    rows={5}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <FaPaperPlane />
                                {isSending ? "Envoi en cours..." : "Envoyer"}
                            </button>
                            {successMessage && <p className="text-center mt-4">{successMessage}</p>}
                        </form>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="text-center">
                        <p className="text-lg">Retrouvez-moi sur :</p>
                        <div className="flex justify-center gap-6 mt-4">
                            {contactData.social.map((social, index) => (
                                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                                    {iconMap[social.name]}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Colonne droite */}
                <div className="order-1 md:order-2 md:w-1/2 flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-bold mb-8">Mon CV</h3>
                    <div className="relative group">
                        <a
                            href={cvPdf}
                            download="Kevin_Beguinel_CV.pdf"
                            //avertissement utilisateur téléchargement du CV au clic sur l'image lorsqu'il passe la souris sur l'image
                            title="Cliquez pour télécharger mon CV"
                        >
                            <img
                                src={cvImage}
                                alt="Aperçu du CV"
                                className="rounded-lg object-contain w-full h-auto max-w-sm transition-transform transform hover:scale-105 mx-auto"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
