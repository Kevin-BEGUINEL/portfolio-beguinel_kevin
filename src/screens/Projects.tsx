import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Project {
    title: string;
    description: string;
    image: string;
    skills: string[];
}

interface SkillCategory {
    category: string;
    lstSkills: string[];
    color: string;
}

export default function Projets() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [skillsData, setSkillsData] = useState<SkillCategory[]>([]);
    const [skillColors, setSkillColors] = useState<{ [key: string]: string }>({});

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    // Filtrage des projets
    const filteredProjects = projects.filter((project) =>
        selectedSkills.length === 0 ? true : project.skills.some((skill) => selectedSkills.includes(skill))
    );

    useEffect(() => {
        import("../data/projects.json")
            .then((data) => setProjects(data.projects))
            .catch((error) => console.error("Erreur lors du chargement des projets:", error));

        import("../data/skills.json")
            .then((data) => {
                setSkillsData(data.skills);
                const colorMap: { [key: string]: string } = {};
                data.skills.forEach((category: SkillCategory) => {
                    category.lstSkills.forEach((skill) => {
                        colorMap[skill] = category.color;
                    });
                });
                setSkillColors(colorMap);
            })
            .catch((error) => console.error("Erreur lors du chargement des compétences:", error));
    }, []);

    // Toggle de la catégorie (ajout/suppression des skills associés)
    const toggleCategory = (category: string) => {
        const categoryData = skillsData.find((c) => c.category === category);
        if (!categoryData) return;

        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
            setSelectedSkills(selectedSkills.filter((skill) => !categoryData.lstSkills.includes(skill)));
        } else {
            setSelectedCategories([...selectedCategories, category]);
            setSelectedSkills([...selectedSkills, ...categoryData.lstSkills]);
        }
    };

    // Toggle d'un skill individuel
    const toggleSkill = (skill: string) => {
        setSelectedSkills(selectedSkills.includes(skill)
            ? selectedSkills.filter((s) => s !== skill)
            : [...selectedSkills, skill]);
    };

    // Toggle d'affichage des skills d'une catégorie
    const toggleCategoryExpand = (category: string) => {
        setExpandedCategories(expandedCategories.includes(category)
            ? expandedCategories.filter((c) => c !== category)
            : [...expandedCategories, category]);
    };

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

            {/* Section des filtres affichée seulement si `showFilters` est vrai */}
            {showFilters && (
                <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-4 mx-auto w-full max-w-6xl ">
                    <h3 className="text-xl text-white font-semibold mb-4">Filtres</h3>

                    {/* Catégories */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {skillsData.map((category) => (
                            <div key={category.category} className="bg-gray-700 p-3 rounded-lg">
                                <div className="flex justify-between items-center relative">
                                    <button
                                        className={`text-white font-bold px-3 py-1 rounded-lg transition w-full text-left 
                                            ${selectedCategories.includes(category.category) ? category.color : "bg-gray-600"}`}
                                        onClick={() => toggleCategory(category.category)}
                                    >
                                        <p className="z-10">
                                            {category.category} ({category.lstSkills.length})
                                        </p>
                                    </button>
                                    {/* Div de superposition pour l'effet visuel */}
                                    <div
                                        className={`absolute top-0 left-0 h-full w-1/2 rounded-l-lg transition-all duration-300 pointer-events-none z-0
                                            ${category.lstSkills.some(skill => selectedSkills.includes(skill)) ? category.color : ""}`}
                                    />
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

            {/* Affichage des projets filtrés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} skillColors={skillColors} />
                    ))
                ) : (
                    <p className="text-gray-300">Aucun projet ne correspond aux critères sélectionnés.</p>
                )}
            </div>
        </section>
    );
}

function ProjectCard({ project, skillColors }: { project: Project; skillColors: { [key: string]: string } }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            <a href="#" className="block">
                <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-t-2xl" />
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
            </a>
        </motion.div>
    );
}
