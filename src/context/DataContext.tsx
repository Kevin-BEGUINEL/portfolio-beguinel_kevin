import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DataPortfolio, SkillCategory } from "../utils/types";

const DataContext = createContext<DataPortfolio | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<DataPortfolio | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Charger les fichiers JSON en parallèle
                const [expResponse, skillsResponse, projectsResponse, contactResponse] = await Promise.all([
                    import("../data/experiences.json"),
                    import("../data/skills.json"),
                    import("../data/projects.json"),
                    import("../data/contact.json"),
                ]);

                // Vérification des données
                if (!expResponse || !skillsResponse || !projectsResponse || !contactResponse) {
                    throw new Error("Erreur: Données manquantes !");
                }

                // Mapping des couleurs pour chaque skill
                const colorMap: { [key: string]: string } = {};
                skillsResponse.skills.forEach((category: SkillCategory) => {
                    category.lstSkills.forEach((skill) => {
                        colorMap[skill] = category.color;
                    });
                });

                // Mise à jour des données
                setData({
                    experiences: expResponse.experiences || [],
                    formations: expResponse.formations || [],
                    projects: projectsResponse.projects || [],
                    contact: contactResponse.contact || [],
                    skills: skillsResponse.skills || [],
                    skillscolors: colorMap,
                });
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            }
        };

        fetchData();
    }, []);

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export const useData = () => {
    const context = useContext(DataContext);
    // if (!context) {
    //     throw new Error("useData doit être utilisé à l'intérieur d'un DataProvider");
    // }
    return context;
};
