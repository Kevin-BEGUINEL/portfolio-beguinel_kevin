import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Navbar from "../components/Navbar";
import Skills from "./Skills";
import Contact from "./Contact";

import photoProfil from "../assets/img/photo_profil.jpg";
import { scrollToSection } from "../utils/utils";
import { useData } from "../context/DataContext";


export default function Home() {

    const data = useData();
    if (!data) {
        return <p className="text-white text-center">Chargement...</p>;
    }


    return (
        <div className="relative scrollbar-hidden">
            
            <header>
                <Navbar />
            </header>

            <main>
                <Section id="accueil">
                    {/* Section Accueil */}
                    <motion.div className="flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left bg-slate-900 text-white px-6">
                        {/* Photo de profil */}
                        <motion.img
                            src={photoProfil}
                            alt="Profil"
                            className="w-60 h-60 rounded-full border-4 border-blue-500 shadow-lg mb-6 lg:mb-0 lg:mr-8"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />

                        {/* Texte à droite de la photo */}
                        <div className="flex flex-col items-center lg:items-start">
                            <motion.h1
                                className="text-4xl lg:text-5xl font-bold mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                BÉGUINEL Kévin
                            </motion.h1>
                            <motion.h2
                                className="text-2xl lg:text-3xl text-blue-400 font-semibold mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                Développeur Web
                            </motion.h2>
                            <motion.p
                                className="text-lg text-gray-300 mb-6 max-w-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.4 }}
                            >
                                Je suis spécialisé dans la création d'applications web. Découvrez mes projets et compétences ci-dessous.
                            </motion.p>
                            <motion.div
                                className="flex space-x-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                <button
                                    onClick={() => scrollToSection("projets")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
                                >
                                    Voir mes Projets
                                </button>
                                <button
                                    onClick={() => scrollToSection("contact")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
                                >
                                    Me contacter
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </Section>

                {/* Section Expériences */}
                <Section id="experiences">
                    <Experiences />
                </Section>

                {/* Section Projets */}
                <Section id="projets">
                    <Projects />
                </Section>

                {/* Section Skills */}
                <Section id="competences">
                    <Skills />
                </Section>

                {/* Section Contact */}
                <Section id="contact">
                    <Contact />
                </Section>
            </main>
        </div>
    );
}




function Section({ children, id }: { children: ReactNode, id?: string }) {
    const { ref } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <motion.section
            ref={ref}
            id={id}
        >
            {children}
        </motion.section>
    );
}

