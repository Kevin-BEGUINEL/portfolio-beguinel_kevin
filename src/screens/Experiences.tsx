import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Experience, Formation } from "../utils/types";
import { useData } from "../context/DataContext";

export default function Timeline() {
    const data = useData();
    const [experiences] = data?.experiences ? useState(data.experiences) : useState<Experience[]>([]);
    const [formations] = data?.formations ? useState(data.formations) : useState<Formation[]>([]);
    const [skillColors] = data?.skillscolors ? useState(data.skillscolors) : useState<{ [key: string]: string }>({});

    const [hoverInfo, setHoverInfo] = useState<{ item: Experience | Formation; left: string; top: string } | null>(null);

    const DATE_DEBUT = new Date("2022-01-01").getTime();
    const DATE_FIN = new Date("2026-01-01").getTime();
    // Calcul du nombre d'années entre DATE_DEBUT et DATE_FIN
    const startYear = new Date(DATE_DEBUT).getFullYear();
    const endYear = new Date(DATE_FIN).getFullYear();
    const numberOfYears = endYear - startYear + 1;

    const sectionRef = useRef<HTMLDivElement | null>(null);  // Création de la référence

    const getPosition = (startDate: string, endDate: string) => {
        const start = new Date(startDate.replace(/(\d{2})\/(\d{4})/, "$2-$1-01")).getTime();
        const end = new Date(endDate.replace(/(\d{2})\/(\d{4})/, "$2-$1-01")).getTime();
        const totalDuration = DATE_FIN - DATE_DEBUT;
        const startPosition = ((start - DATE_DEBUT) / totalDuration) * 100;
        const endPosition = ((end - DATE_DEBUT) / totalDuration) * 100;
        return { left: `${startPosition}%`, width: `${endPosition - startPosition}%` };
    };

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>, item: Experience | Formation) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoverInfo({
            item: item,
            left: `${rect.left}px`, 
            top: `${rect.bottom + 10}px`,
        });
    };

    // return (
    //     <section ref={sectionRef} className="min-h-screen bg-gray-800 py-10 px-6 relative">
    //         <h2 className="text-4xl font-bold text-center text-white mb-10">Expériences & Formations</h2>
    //         <div className="relative w-full max-w-6xl mx-auto h-40 mt-10 flex flex-col">

    //             {/* Lignes timeline */}
    //             <div className="w-full h-20 bg-gray-500 rounded-xl flex items-center justify-center relative">
    //                 {experiences.map((exp, index) => {
    //                     const pos = getPosition(exp.date_debut, exp.date_fin);
    //                     return (
    //                         <motion.div
    //                             key={index}
    //                             className="absolute h-8 bg-blue-400 rounded-lg cursor-pointer"
    //                             style={{ left: pos.left, width: pos.width, top: "0rem" }}
    //                             whileHover={{ scale: 1.1 }}
    //                             onMouseEnter={(e) => handleMouseEnter(e, exp)}
    //                             onMouseLeave={() => setHoverInfo(null)}
    //                         />
    //                     );
    //                 })}
    //                 {formations.map((formation, index) => {
    //                     const pos = getPosition(formation.date_debut, formation.date_fin);
    //                     return (
    //                         <motion.div
    //                             key={index}
    //                             className="absolute h-8 bg-yellow-400 rounded-lg cursor-pointer"
    //                             style={{ left: pos.left, width: pos.width, top: "3rem" }}
    //                             whileHover={{ scale: 1.1 }}
    //                             onMouseEnter={(e) => handleMouseEnter(e, formation)}
    //                             onMouseLeave={() => setHoverInfo(null)}
    //                         />
    //                     );
    //                 })}
    //             </div>
    //             {/* Années sur la timeline */}
    //             <div className="w-full flex justify-between text-white text-sm relative">
    //                 {Array.from({ length: numberOfYears }, (_, i) => {
    //                     const year = startYear + i;
    //                     return (
    //                         <div key={year} className="absolute" style={{ left: `${(i / (numberOfYears - 1)) * 100}%`, transform: "translateX(-50%)" }}>
    //                             {year}
    //                         </div>
    //                     );
    //                 })}
    //             </div>
    //         </div>
    //         {/* Utilisation du portail pour le Tooltip */}
    //         {createPortal(
    //             <AnimatePresence>
    //                 {hoverInfo && (
    //                     <motion.div
    //                         className="fixed bg-black text-white p-4 rounded-lg shadow-lg w-64"
    //                         style={{ left: hoverInfo.left, top: hoverInfo.top, transform: "translateX(-50%)" }}
    //                         initial={{ opacity: 0, y: -10 }}
    //                         animate={{ opacity: 1, y: 0 }}
    //                         exit={{ opacity: 0, y: -10 }}
    //                     >
    //                         <h4 className={`text-xl font-bold ${"poste" in hoverInfo.item ? "text-blue-400" : "text-yellow-400"}`}>
    //                             {"poste" in hoverInfo.item ? hoverInfo.item.poste : hoverInfo.item.diplome}
    //                         </h4>
    //                         <p className="text-white text-sm">
    //                             {"entreprise" in hoverInfo.item ? hoverInfo.item.entreprise : hoverInfo.item.ecole} - {hoverInfo.item.lieu}
    //                         </p>
    //                         <p className="text-gray-400 text-xs">{hoverInfo.item.date_debut} - {hoverInfo.item.date_fin}</p>
    //                         <p className="text-gray-300 mt-2">{hoverInfo.item.description}</p>
    //                         <div className="flex flex-wrap gap-2 mt-3">
    //                             {(hoverInfo.item.skills || []).map((tech: string, i: number) => (
    //                                 <span key={i} className={`px-2 py-1 text-xs font-semibold text-white rounded-lg ${skillColors[tech] || "bg-gray-500"}`}>
    //                                     {tech}
    //                                 </span>
    //                             ))}
    //                         </div>
    //                     </motion.div>
    //                 )}
    //             </AnimatePresence>,
    //             document.getElementById("tooltip-root") as HTMLElement // Le tooltip s'affiche ici
    //         )}
    //     </section>
    // );
    return (
        <section ref={sectionRef} className="min-h-screen bg-gray-800 py-10 px-6 relative">
            <h2 className="text-4xl font-bold text-center text-white mb-10">
                <span className="hover:underline decoration-wavy decoration-blue-400">Expériences</span>  
                <span> & </span>
                <span className="hover:underline decoration-wavy decoration-yellow-400">Formations</span>
            </h2>
            <div className="relative w-full max-w-5xl h-[calc(100vh-16rem)] mx-auto mt-10 flex flex-row items-center justify-center">

                {/* Timeline container */}
                <div className="relative w-full h-24 flex flex-col">
                    {/* Timeline */}
                    <div className="relative h-full flex flex-col rounded-l-lg border-none">
                        {/* Experiences */}
                        <div className="w-full h-1/2 timelineColor border-b border-black rounded-tl-lg relative">
                            {experiences.map((exp, index) => {
                                const pos = getPosition(exp.date_debut, exp.date_fin);
                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute h-full bg-blue-400 rounded-lg cursor-pointer"
                                        style={{ left: pos.left, width: pos.width, top: "0rem" }}
                                        whileHover={{ scale: 1.1 }}
                                        onMouseEnter={(e) => handleMouseEnter(e, exp)}
                                        onMouseLeave={() => setHoverInfo(null)}
                                    />
                                );
                            })}
                        </div>
                        {/* Formations */}
                        <div className="w-full h-1/2 timelineColor rounded-bl-lg relative">
                            {formations.map((formation, index) => {
                                const pos = getPosition(formation.date_debut, formation.date_fin);
                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute h-full bg-yellow-400 rounded-lg cursor-pointer"
                                        style={{ left: pos.left, width: pos.width, top: "0rem" }}
                                        whileHover={{ scale: 1.1 }}
                                        onMouseEnter={(e) => handleMouseEnter(e, formation)}
                                        onMouseLeave={() => setHoverInfo(null)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {/* Années sur la timeline */}
                    <div className="w-full flex justify-between text-white text-sm relative mt-2">
                        {Array.from({ length: numberOfYears-1 }, (_, i) => {
                            const year = startYear + i;
                            return (
                                <div key={year} className="absolute" style={{ left: `${(i / (numberOfYears - 1)) * 100}%`, transform: "translateX(-50%)" }}>
                                    {year}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Flèche à la fin de la timeline */}
                <div className="flex items-center justify-center md:w-30 w-15 h-40 relative">
                    <div className="absolute inset-0 timelineColor clip-triangle border-none"></div>
                </div>
            </div>
            {/* Utilisation du portail pour le Tooltip */}
            {createPortal(
                <AnimatePresence>
                    {hoverInfo && (
                        <motion.div
                            className="fixed bg-black text-white p-4 rounded-lg shadow-lg w-64"
                            style={{ left: hoverInfo.left, top: hoverInfo.top, transform: "translateX(-50%)" }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <h4 className={`text-xl font-bold ${"poste" in hoverInfo.item ? "text-blue-400" : "text-yellow-400"}`}>
                                {"poste" in hoverInfo.item ? hoverInfo.item.poste : hoverInfo.item.diplome}
                            </h4>
                            <p className="text-white text-sm">
                                {"entreprise" in hoverInfo.item ? hoverInfo.item.entreprise : hoverInfo.item.ecole} - {hoverInfo.item.lieu}
                            </p>
                            <p className="text-gray-400 text-xs">{hoverInfo.item.date_debut} - {hoverInfo.item.date_fin}</p>
                            <p className="text-gray-300 mt-2">{hoverInfo.item.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {(hoverInfo.item.skills || []).map((tech: string, i: number) => (
                                    <span key={i} className={`px-2 py-1 text-xs font-semibold text-white rounded-lg ${skillColors[tech] || "bg-gray-500"}`}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.getElementById("tooltip-root") as HTMLElement // Le tooltip s'affiche ici
            )}
        </section>
    );
}