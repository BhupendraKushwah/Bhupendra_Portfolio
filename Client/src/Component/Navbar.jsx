import React, { useState } from "react";
import Button from './Button';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="navbar w-full border-b border-gray-100">
                <div className="container flex justify-between items-center py-3 px-2.5">
                    {/* Logo */}
                    <div className="logo text-2xl text-center">
                        BHUPENDRA<span className="text-primary text-2xl">.</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="nav-content hidden md:flex items-center justify-center space-x-6">
                        <li className="nav-item cursor-pointer">Home</li>
                        <li className="nav-item cursor-pointer">About</li>
                        <li className="nav-item cursor-pointer">Portfolio</li>
                        <Button Button_text="Contact" />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleMobileMenu}>
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Overlay Navigation */}
                <div
                    className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-all ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} `} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" onClick={toggleMobileMenu}
                // Close the menu when clicked outside
                >

                    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                            <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-1 border-b py-3">
                                {/* <img src="/logo.svg" className="h-6 me-3 sm:h-7" alt="Portfolio Logo" /> */}
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"> BHUPENDRA<span className="text-primary text-2xl">.</span></span>
                            </a>
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
                                        </svg>
                                        <span className="ms-3">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">About</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M6 2h12c1.1 0 1.99.9 1.99 2L20 20c0 1.1-.89 2-1.99 2H4c-1.1 0-1.99-.9-1.99-2L4 4c0-1.1.89-2 1.99-2zm1 2v16h12V4H7z" />

                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Portfolio</span>
                                    </a>
                                </li>
                                <li>
                                    <Button Button_text="Contact" />
                                </li>
                            </ul>
                        </div>
                    </aside>

                </div>

            </div>
        </>
    );
};

export default Navbar;
