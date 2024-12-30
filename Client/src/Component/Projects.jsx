import React, { useEffect, useState } from "react";
import Button from "./Button";
import useInstance from '../hooks/Instance'
import { toast, ToastContainer } from "react-toastify";

const Projects = () => {
    const Instance = useInstance();
    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        try {
            let response = await Instance.get('user/get_projects')
            setProjects(response.data)
        } catch (error) {
            toast.error(error.response.data || 'Something went wrong !!!')
            console.log(error)
        }
    }

    useEffect(() => {
        getProjects();
    }, [])

    // let projects = [
    //     {
    //         projectTitle: 'Mloflo',
    //         projectImage: 'mloflo.png',
    //         tech_stack: 'React Js, Node Js, Express Js, MongoDB',
    //         projectBrief: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui aliquam nemo vero molestias earum! Molestias expedita quas repellat quos iure magni dolor soluta rerum.'
    //     },
    //     {
    //         projectTitle: 'Moserbus',
    //         projectImage: 'moserbus.png',
    //         tech_stack: 'Vue Js, Node Js, Express Js, MongoDB',
    //         projectBrief: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui aliquam nemo vero molestias earum! Molestias expedita quas repellat quos iure magni dolor soluta rerum.'
    //     },
    //     {
    //         projectTitle: 'Schezy',
    //         projectImage: 'schezy.png',
    //         tech_stack: 'Angular Js, Php, Mysql',
    //         projectBrief: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui aliquam nemo vero molestias earum! Molestias expedita quas repellat quos iure magni dolor soluta rerum.'
    //     }
    // ]

    return (
        <>
            <ToastContainer />
            <div className="Projects bg-linear">
                <div className="container p-4">
                    <div className="section-heading text-center">
                        <div className="heading text-text-color text-3xl font-bold my-4 uppercase">
                            Projects
                        </div>
                        <div className="text-sm">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil eveniet omnis ipsam?
                        </div>
                    </div>
                    <div className="project-items flex lg:flex-nowrap md:flex-nowrap flex-wrap justify-around px-5 my-5 gap-7">
                        {projects?.length ? projects.map((project, index) => (
                            <div className="project-card bg-secondary flex flex-col justify-between items-center border rounded p-5" key={index}>
                                <div className="project-img w-full h-[150px]">
                                    <img src={project.projectImage} className="w-full h-full object-contain p-2" alt="" />
                                </div>
                                <div className="project-detail w-full flex flex-col items-start justify-between">
                                    <div className="tech-stack text-sm my-1 text-secondary-text uppercase">
                                        <p>{project.tech_stack.join(', ')}</p>
                                    </div>
                                    <div className="project-name text-xl my-2 font-bold">
                                        <h4>{project.projectTitle}</h4>
                                    </div>
                                    <div className="project-description my-1 text-sm text-secondary-text">
                                        {project.projectBrief}
                                    </div>
                                    {/* <div className="my-2">
                                        <Button Button_text="Case study" isInvert={true} icon={<i className="fa-solid fa-arrow-right"></i>} />
                                    </div> */}
                                </div>
                            </div>
                        ))
                            :
                            <p>{projects}</p>
                        }

                    </div>
                    <div className="flex justify-center my-3">
                        <Button Button_text='More Soon' icon={<i className="fa-solid fa-spinner"></i>} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projects;