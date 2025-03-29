import { Project } from "../utils/types";
import { useData } from "../context/DataContext";
import React, { useState, useMemo, useCallback } from "react";
import ProjectModal from "../components/ProjectModal";

export default function Projets() {
    const data = useData();

    // Utilisation directe des données depuis le DataContext
    const skillsData = data?.skills ?? [];
    const projects = data?.projects ?? [];
    const skillColors = data?.skillscolors ?? {};

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(6); // Pagination

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Utilisation de useMemo pour éviter le recalcul à chaque re-render
    const filteredProjects = useMemo(() => {
        return projects.filter((project) =>
            selectedSkills.length === 0 || project.skills.some((skill) => selectedSkills.includes(skill))
        );
    }, [projects, selectedSkills]);

    // Toggle de la catégorie (ajout/suppression des skills associés)
    const toggleCategory = useCallback((category: string) => {
        const categoryData = skillsData.find((c) => c.category === category);
        if (!categoryData) return;

        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
            setSelectedSkills(selectedSkills.filter((skill) => !categoryData.lstSkills.includes(skill)));
        } else {
            setSelectedCategories([...selectedCategories, category]);
            setSelectedSkills([...selectedSkills, ...categoryData.lstSkills]);
        }
    }, [selectedCategories, selectedSkills, skillsData]);

    // Toggle d'un skill individuel
    const toggleSkill = useCallback((skill: string) => {
        const newSelectedSkills = selectedSkills.includes(skill)
            ? selectedSkills.filter((s) => s !== skill)
            : [...selectedSkills, skill];

        setSelectedSkills(newSelectedSkills);

        const category = skillsData.find((cat) => cat.lstSkills.includes(skill));
        if (!category) return;

        const allSkillsSelected = category.lstSkills.every((s) => newSelectedSkills.includes(s));

        if (allSkillsSelected) {
            if (!selectedCategories.includes(category.category)) {
                setSelectedCategories([...selectedCategories, category.category]);
            }
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c !== category.category));
        }
    }, [selectedSkills, selectedCategories, skillsData]);

    // Toggle d'affichage des skills d'une catégorie
    const toggleCategoryExpand = useCallback((category: string) => {
        setExpandedCategories(expandedCategories.includes(category)
            ? expandedCategories.filter((c) => c !== category)
            : [...expandedCategories, category]);
    }, [expandedCategories]);

    return (
        <section className="flex flex-col items-center min-h-screen bg-gray-900 py-10">
            <h2 className="text-4xl font-bold text-center text-white mb-10">Mes Projets</h2>

            {/* Bouton pour afficher/masquer les filtres */}
            <button
                className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? "Fermer les filtres" : "Afficher les filtres"}
            </button>

            {/* Section des filtres affichée */}
            {showFilters && (
                <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-4 mx-auto w-full max-w-6xl ">
                    <h3 className="text-xl text-white font-semibold mb-4">Filtres</h3>

                    {/* Catégories */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {skillsData.map((category) => (
                            <div key={category.category} className="bg-gray-700 p-3 rounded-lg">
                                <div className="flex justify-between items-center relative">
                                    <button
                                        className={`relative text-white font-bold px-3 py-1 rounded-lg transition w-full text-left overflow-hidden bg-gray-600`}
                                        onClick={() => toggleCategory(category.category)}
                                    >
                                        {/* Barre de progression des skills sélectionnés de la catégorie */}
                                        <div
                                            className={`absolute top-0 left-0 h-full rounded-l-lg transition-all duration-300 pointer-events-none
                                                ${category.lstSkills.some(skill => selectedSkills.includes(skill)) ? category.color : ""}`}
                                            style={{
                                                width: `${(category.lstSkills.filter(skill =>
                                                    selectedSkills.includes(skill)).length / category.lstSkills.length) * 100}%`
                                            }}
                                        />
                                        <span className="relative z-20">
                                            {category.category} ({category.lstSkills.length})
                                        </span>
                                    </button>
                                    <button
                                        className="text-white text-xl ml-2 relative z-10"
                                        onClick={() => toggleCategoryExpand(category.category)}
                                    >
                                        {expandedCategories.includes(category.category) ? "▼" : "▶"}
                                    </button>
                                </div>

                                {/* Skills affichés sous la catégorie sélectionnée */}
                                {expandedCategories.includes(category.category) && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {category.lstSkills.map((skill) => (
                                            <label key={skill} className={`px-3 py-1 text-white font-semibold rounded-lg cursor-pointer transition ${selectedSkills.includes(skill) ? category.color : "bg-gray-600"}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSkills.includes(skill)}
                                                    onChange={() => toggleSkill(skill)}
                                                    className="hidden"
                                                />
                                                {skill}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Affichage des projets filtrés avec pagination */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {filteredProjects.slice(0, visibleCount).map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            skillColors={skillColors}
                            onClick={() => setSelectedProject(project)} // Ouvre la modale
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-300">Aucun projet ne correspond aux critères sélectionnés.</p>
            )}

            <div className="flex justify-center mt-4 gap-4">
                {visibleCount < filteredProjects.length && (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
                        onClick={() => setVisibleCount(visibleCount + 6)}
                    >
                        Voir plus
                    </button>
                )}
                {visibleCount > 6 && (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
                        onClick={() => setVisibleCount(visibleCount - 6)}
                    >
                        Voir moins
                    </button>
                )}
            </div>

            {/* Modale pour afficher les détails du projet */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)} // Ferme la modale
                    skillColors={skillColors} // Passe les couleurs des compétences
                />
            )}
        </section>
    );
}

const ProjectCard = React.memo(({ project, skillColors, onClick }: { project: Project; skillColors: { [key: string]: string }; onClick: () => void }) => {
    return (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer" onClick={onClick}>
            <img src={project.logo} alt={project.title} className="w-full h-40 object-cover rounded-t-2xl" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.description}</p>

                {/* Affichage des compétences */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {project.skills.map((skill, i) => (
                        <span key={i} className={`px-2 py-1 text-xs font-semibold text-white rounded-lg ${skillColors[skill] || "bg-gray-500"}`}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
});