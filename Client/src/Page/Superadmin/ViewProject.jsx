import React, { useEffect, useState } from "react";
import useInstance from '../../hooks/Instance';
import { toast, ToastContainer } from "react-toastify";

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            {/* Project Image */}
            <img
                src={project.projectImage}
                alt={project.projectTitle}
                className="w-full h-48 object-cover"
            />

            {/* Card Content */}
            <div className="p-4">
                {/* Project Title */}
                <h2 className="text-lg font-bold text-gray-800">{project.projectTitle}</h2>

                {/* Project Brief */}
                <p className="text-sm text-gray-600 mt-2">{project.projectBrief}</p>

                {/* Tech Skills */}
                <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700">Tech Skills:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.techSkillDetails.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ViewProject = () => {
    const Instance = useInstance();
    const [projectData, setProjectData] = useState([])
    const getProjectData = async () => {
        try {
            const response = await Instance.get('superadmin/getProjectData');
            setProjectData(response.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something thing went wrong !!!')
            console.log("Error :", error)
        }
    }
    useEffect(() => {
        getProjectData();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="p-6">
                <div className="border p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {projectData.length ? projectData.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                            :
                            <p>No Data Found !!!</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProject;