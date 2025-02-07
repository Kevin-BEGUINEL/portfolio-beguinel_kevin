import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../assets/css/App.css";
import photoProfil from "../assets/img/photo_profil.jpg";
import { scrollToSection } from "../utils/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);



  return (
    <nav className="bg-slate-700 shadow-md fixed w-full z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-stone-200">
            <div className="flex items-center">
              <button onClick={() => scrollToSection("accueil")} className="text-white mr-5">
                <img src={photoProfil} alt="Logo" className="h-8 object-contain rounded-full" />
              </button>
              <p>Mon Portfolio</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection("accueil")} className="text-white hover:text-blue-500">Accueil</button>
            <button onClick={() => scrollToSection("experiences")} className="text-white hover:text-blue-500">Expériences</button>
            <button onClick={() => scrollToSection("projets")} className="text-white hover:text-blue-500">Projets</button>
            <button onClick={() => scrollToSection("competences")} className="text-white hover:text-blue-500">Compétences</button>
            <button onClick={() => scrollToSection("contact")} className="text-white hover:text-blue-500">Contact</button>
          </div>

          {/* Menu Burger Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-slate-700 border-t shadow-md">
          <div className="flex flex-col space-y-2 p-4">
            <button onClick={() => { scrollToSection("accueil"); setIsOpen(false); }} className="text-white hover:text-blue-500">Accueil</button>
            <button onClick={() => { scrollToSection("experiences"); setIsOpen(false) }} className="text-white hover:text-blue-500">Expériences</button>
            <button onClick={() => { scrollToSection("projets"); setIsOpen(false) }} className="text-white hover:text-blue-500">Projets</button>
            <button onClick={() => { scrollToSection("competences"); setIsOpen(false) }} className="text-white hover:text-blue-500">Compétences</button>
            <button onClick={() => { scrollToSection("contact"); setIsOpen(false) }} className="text-white hover:text-blue-500">Contact</button>
          </div>
        </div>
      )
      }
    </nav >
  );
}

