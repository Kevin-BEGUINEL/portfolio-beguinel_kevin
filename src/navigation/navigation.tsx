import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Projects from "../screens/Projects";
// import Experiences from "../screens/Experiences";
// import Contact from "../screens/Contact";
import Skills from "../screens/Skills";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/experiences" element={<Experiences />} /> */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
