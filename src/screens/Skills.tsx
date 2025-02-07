import { useState, useEffect } from "react";

interface SkillCategory {
    category: string;
    lstSkills: string[];
    color: string;
}

export default function Skills() {
    const [skills, setSkills] = useState<SkillCategory[]>([]);

    useEffect(() => {
        import("../data/skills.json")
            .then((data) => setSkills(data.skills))
            .catch((error) => console.error("Erreur lors du chargement des compétences:", error));
    }, []);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-stone-800 py-10">
            <h2 className="text-4xl font-bold text-center text-white mb-10">Mes Compétences</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-6xl">
                {skills.map((category, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 ${category.color} text-white hover:underline`}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4 text-center ">
                            {category.category}
                        </h3>
                        <ul className="flex flex-wrap justify-center gap-2">
                            {category.lstSkills.map((skill, i) => (
                                <li
                                    key={i}
                                    className="bg-white text-blue-900 px-4 py-2 rounded-lg shadow-md font-medium no-underline"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
