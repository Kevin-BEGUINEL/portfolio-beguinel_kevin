import React, { useEffect } from "react";
import { Project } from "../utils/types";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
    skillColors: { [key: string]: string }; // Ajout des couleurs des compétences
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, skillColors }) => {
    if (!project) return null;

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose(); // Ferme la modale si on clique en dehors
        }
    };

    // Désactiver le scroll de la page lorsqu'une modale est ouverte
    useEffect(() => {
        document.body.style.overflow = "hidden"; // Désactive le scroll
        return () => {
            document.body.style.overflow = ""; // Réactive le scroll
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleOutsideClick} // Gère le clic en dehors de la modale
        >
            <div className="bg-gray-800 text-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative overflow-y-auto max-h-[80vh]">
                {/* Bouton de fermeture */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Contenu de la modale */}
                <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                <p className="text-gray-300 mb-4">{project.description}</p>

                {/* Informations détaillées */}
                {project.details && (
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Détails du projet :</h4>
                        {/* Liste en flex sur 2 colonnes */}
                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 list-disc list-inside text-gray-400 mb-4">
                            <li><strong>Catégorie :</strong> {project.details.categorie}</li>
                            <li><strong>Date :</strong> {project.details.date}</li>
                            <li><strong>Équipe :</strong> {project.details.equipe}</li>
                            <li><strong>Fonction :</strong> {project.details.fonction}</li>
                            <li><strong>Contexte :</strong> {project.details.contexte}</li>
                            {project.details.github && (
                                <li>
                                    <strong>GitHub :</strong>{" "}
                                    <a
                                        href={project.details.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        {project.details.github}
                                    </a>
                                </li>
                            )}
                            {project.details.url && (
                                <li>
                                    <strong>URL :</strong>{" "}
                                    <a
                                        href={project.details.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        {project.details.url}
                                    </a>
                                </li>
                            )}
                        </ul>

                        {/* Tâches réalisées */}
                        {project.details.information?.map((info, index) => (
                            <div key={index} className="mb-4">
                                {info.sousTitre && <h4 className="text-lg font-semibold">{info.sousTitre}</h4>}
                                {info.texte && (
                                    <ul className="list-disc list-inside text-gray-400">
                                        {info.texte.map((task, i) => (
                                            <li key={i}>{task}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                        {/* Compétences */}
                        {project.skills && (
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-2">Compétences travaillées :</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className={`px-3 py-1 text-sm font-semibold text-white rounded-lg ${skillColors[skill] || "bg-gray-500"
                                                }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectModal;