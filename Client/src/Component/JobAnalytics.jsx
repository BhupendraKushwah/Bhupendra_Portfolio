import React, { useEffect, useState } from "react";
import useInstance from "../hooks/Instance";
import { toast, ToastContainer } from "react-toastify";

const JobAnalytics = () => {
    const Instance = useInstance();
    const [analyticData, setAnalyticData] = useState({})
    const getAnalyticData = async () => {
        try {
            const response = await Instance.get('user/get_analytic');
            setAnalyticData(response.data)
        } catch (error) {
            toast.error(error.response.data || 'Something went wrong !!!')
            console.log(error)
        }
    }
    useEffect(() => {
        getAnalyticData();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="job-analytics shadow-lg flex border border-0 mx-5 rounded-lg bg-secondary">
                <div className="experience-time p-2 md:p-2 lg:p-3 border-x-0 border-r border basis-1/2 text-center">
                    <span className="font-bold text-2xl">{analyticData.experience} Years</span> <br />
                    <span className="text-sm">Experience</span>
                </div>
                <div className="worked-project p-2 md:p-2 lg:p-3 basis-1/2 text-center">
                    <span className="font-bold text-2xl">{analyticData.projectsCount}+</span> <br />
                    <span className="text-sm">working projects</span>
                </div>
            </div>
        </>
    )
}

export default JobAnalytics