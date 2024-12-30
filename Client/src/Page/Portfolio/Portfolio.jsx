import React from "react";
import Dashboard from '../../Component/Dashboard';
import Skills from '../../Component/Skills';
import Projects from '../../Component/Projects';
import Discuss from '../../Component/Discuss';
import ContactForm from '../../Component/Contact_Form';
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";

const Portfolio = () => {
    return (
        <>
            <Navbar />
            <Dashboard />
            <Skills />
            <Projects />
            <Discuss />
            <ContactForm />
            <Footer />
        </>
    )
}
export default Portfolio;