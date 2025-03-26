export interface DataPortfolio {
    experiences: Experience[];
    formations: Formation[];
    projects: Project[];
    contact: Contact;
    skills: SkillCategory[];
    skillscolors: { [key: string]: string };
}

export interface SkillCategory {
    category: string;
    lstSkills: string[];
    color: string;
  }

export interface Project {
    title: string;
    description: string;
    image: string;
    skills: string[];
}

export interface Experience {
    poste: string;
    entreprise: string;
    lieu: string;
    date_debut: string;
    date_fin: string;
    typeExperience: string;
    description: string;
    skills: string[];
}

export interface Formation {
    diplome: string;
    ecole: string;
    lieu: string;
    date_debut: string;
    date_fin: string;
    description: string;
    skills: string[];
}

export interface Contact {
    email: string;
    social: Social[];
}

export interface Social {
    name: string;
    url: string;
    icon: string;
}

