import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname.startsWith(path);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = (e) => {
        e.stopPropagation();
        setMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const logOutuser=()=>{
        localStorage.removeItem("persistantState");
        window.location.href = '/'
    }
    return (
        <>
            <div className="navbar sticky top-0 w-full bg-white border-b border-gray-100">
                <div className="container flex justify-between items-center py-3 px-2.5">
                    <div className="logo text-2xl text-center">
                        BHUPENDRA<span className="text-primary text-2xl">.</span>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            aria-controls="default-sidebar1"
                            type="button"
                            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                    onClick={closeMobileMenu}
                ></div>
                <aside
                    id="default-sidebar1"
                    className={`fixed left-0 z-40 w-64 h-full bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0 top-0" : "-translate-x-full"
                        } md:translate-x-0`}
                >
                    <div className="h-full px-3 py-4 bg-gray-100 dark:bg-gray-800">
                        <div className="logo text-2xl p-2 sm:hidden">
                            BHUPENDRA<span className="text-primary text-2xl">.</span>
                        </div>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link
                                    to='/superadmin/profile_manager'
                                    className={`flex items-center p-2 text-gray-900 rounded-lg ${isActive('/superadmin/profile_manager') && 'bg-gray-200'} dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Profile View</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/superadmin/skill_manager"
                                    className={`flex items-center p-2 text-gray-900 rounded-lg ${isActive('/superadmin/skill_manager') && 'bg-gray-200'} dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
                                >
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M10.59 2.2c.4-.15.81-.2 1.23-.2s.83.05 1.23.2l.79 2.36c.34.08.67.21.98.36l2.08-.79a2.4 2.4 0 011.74 0l1.74.65c.4.15.73.47.92.87l.79 1.74c.2.4.2.84 0 1.23l-2.08.79c-.15.31-.28.64-.36.98l2.36.79c.15.4.2.81.2 1.23s-.05.83-.2 1.23l-2.36.79c-.08.34-.21.67-.36.98l2.08.79c.2.4.2.84 0 1.23l-.79 1.74c-.15.4-.47.73-.87.92l-1.74.79a2.4 2.4 0 01-1.23 0l-.79-2.08c-.34-.08-.67-.21-.98-.36l-2.36.79c-.4.15-.81.2-1.23.2s-.83-.05-1.23-.2l-.79-2.36c-.34-.08-.67-.21-.98-.36l-2.08.79a2.4 2.4 0 01-1.74 0l-1.74-.79a2.1 2.1 0 01-.92-.87l-.79-1.74c-.2-.4-.2-.84 0-1.23l2.08-.79c.15-.31.28-.64.36-.98L2.2 11.41c-.15-.4-.2-.81-.2-1.23s.05-.83.2-1.23l2.36-.79c.08-.34.21-.67.36-.98l-2.08-.79c-.2-.4-.2-.84 0-1.23l.79-1.74c.15-.4.47-.73.87-.92l1.74-.79a2.4 2.4 0 011.23 0l.79 2.08c.34.08.67.21.98.36l.79-2.36zM12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    </svg>

                                    <span className="flex-1 ms-3 whitespace-nowrap">Skills</span>
                                </Link>
                            </li>
                            <li className="relative group">

                                <p
                                    className={`flex items-center p-2 text-gray-900 rounded-lg cursor-pointer hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 ${isActive('/superadmin/project_manager') && 'bg-gray-200'}`}
                                >
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 15.586 2H4zm10 2.414L18.586 9H15a1 1 0 0 1-1-1V5.414zM6 12a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm1 3h6a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Projects</span>
                                </p>

                                <div
                                    className="absolute sm:left-[200px] sm:top-0 hidden w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg group-hover:block dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <Link
                                        to="/superadmin/project_manager/manage"
                                        className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Manage Projects
                                    </Link>
                                    <Link
                                        to="/superadmin/project_manager/view"
                                        className="block px-4 py-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        View Projects
                                    </Link>
                                </div>
                            </li>
                            <li className="">
                                <Link
                                    to="/superadmin/change_password"
                                    className={`flex items-center p-2 text-gray-900 rounded-lg ${isActive('/superadmin/change_password') && 'bg-gray-200'} dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
                                >
                                    {/* New SVG for Change Password */}
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 2c-3.31 0-6 2.69-6 6v4H6v10h12V12h-2V8c0-3.31-2.69-6-6-6zm4 12H8v-4c0-2.21 1.79-4 4-4s4 1.79 4 4v4z" />
                                    </svg>

                                    <span className="flex-1 ms-3 whitespace-nowrap">Change Password</span>
                                </Link>
                            </li>

                            <li className="">
                                <div
                                    onClick={logOutuser}
                                    className={`flex cursor-pointer items-center p-2 text-gray-900 rounded-lg ${isActive('/superadmin/skill_manager') && 'bg-gray-200'} dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
                                >
                                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </aside>  </div>
        </>
    );
};

export default Sidebar;
