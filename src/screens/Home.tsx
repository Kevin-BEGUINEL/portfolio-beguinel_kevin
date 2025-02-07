import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import Experiences from "./Experiences";
import Projects from "./Projects";
import Navbar from "../components/Navbar";
import Skills from "./Skills";
// import Contact from "./Contact";

import { ReactNode } from "react";

import photoProfil from "../assets/img/photo_profil.jpg";
import { scrollToSection } from "../utils/utils";

export default function Home() {
    return (
        <div className="relative scrollbar-hidden">
            <header>
                <Navbar />
            </header>

            <main>
                <Section id="accueil">
                    {/* Section Accueil */}
                    <motion.div className="flex flex-col items-center justify-center h-screen text-center bg-slate-900 text-white px-6">
                        <motion.img
                            src={photoProfil}
                            alt="Profil"
                            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                        <motion.h1
                            className="text-4xl font-bold mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            Bienvenue sur mon Portfolio
                        </motion.h1>
                        <motion.p
                            className="text-lg text-gray-300 mb-6 max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            Je suis <span className="text-blue-400 font-semibold">BÉGUINEL Kévin</span>, un développeur passionné par la création d'applications web performantes et modernes.
                        </motion.p>
                        <motion.div
                            className="flex space-x-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            <button onClick={() => scrollToSection("projets")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
                                Voir mes Projets
                            </button>
                            <button onClick={() => scrollToSection("contact")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
                                Me contacter
                            </button>
                        </motion.div>
                    </motion.div>
                </Section>

                {/* Section Expériences */}
                {/* <Section id="experiences">
                    <Experiences />
                </Section> */}

                {/* Section Projets */}
                <Section id="projets">
                    <Projects />
                </Section>

                {/* Section Skills */}
                <Section id="competences">
                    <Skills />
                </Section>

                {/* Section Contact */}
                {/* <Section id="contact">
                    <Contact />
                </Section> */}
            </main>
        </div>
    );
}




function Section({ children, id }: { children: ReactNode, id?: string }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <motion.section
            ref={ref}
            id={id}
            className="opacity-0"
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.section>
    );
}

