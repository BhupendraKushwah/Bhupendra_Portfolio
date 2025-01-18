import { useEffect, useState } from 'react';
import Dashboard from '../../Component/Dashboard';
import Skills from '../../Component/Skills';
import Projects from '../../Component/Projects';
import Discuss from '../../Component/Discuss';
import ContactForm from '../../Component/Contact_Form';
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";

const Portfolio = () => {
    const [isDark, setIsDark] = useState(() => {
        // Retrieve the saved theme from localStorage or default to current state
        return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
    });

    const toggleDarkMode = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        // Toggle the dark mode on the document element
        document.documentElement.classList.toggle('dark', newMode);
        // Save the theme preference to localStorage
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    useEffect(() => {
        // Sync the DOM with the theme preference
        const theme = localStorage.getItem('theme');
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, []);

    return (
        <>
            {/* Dark Mode Toggle Button */}
            <div className="fixed top-[200px] left-0 z-10">
                <div>
                    <input
                        type="checkbox"
                        checked={isDark}
                        onChange={toggleDarkMode}
                        className="checkbox opacity-0 absolute"
                        id="checkbox"
                    />
                    <label htmlFor="checkbox" className="checkbox-label bg-white dark:bg-slate-900 cursor-pointer px-2">
                        <i className={`fas fa-moon text-xl`}></i>
                        <i className={`fas fa-sun text-xl`}></i>
                        <span className="ball bg-slate-900 dark:bg-white"></span>
                    </label>
                </div>
            </div>

            {/* Apply dark mode globally */}
            <div className="min-h-screen  dark:bg-slate-800 dark:text-white transition-colors duration-300">
                <Navbar />
                <div id="dashboard"> 
                    <Dashboard />
                </div>
                <div id="skills">
                    <Skills />
                </div>
                <div id="projects">
                    <Projects />
                </div>
                <div id="discuss">
                    <Discuss />
                </div>
                <div id="contact">
                    <ContactForm />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Portfolio;
