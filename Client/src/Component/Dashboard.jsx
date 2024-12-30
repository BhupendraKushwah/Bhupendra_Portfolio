import React, { useEffect, useState } from "react";
import JobAnalytics from "./JobAnalytics";
import Button from "./Button";
import useInstance from "../hooks/Instance";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const Instance = useInstance();
  const [dashboardData, setDashboardData] = useState({})
  const getDashboardData = async () => {
    try {
      const response = await Instance.get('user/get_dashboard');
      setDashboardData(response.data)
    } catch (error) {
      toast.error(error.response.data || 'Something went wrong !!!')
      console.log(error)
    }
  }
  useEffect(() => {
    getDashboardData();
  }, [])
  return (
    <>
      <ToastContainer />
      <div className="dashboard pb-[200px] lg:pb-[280px] md:pb-0 bg-dash-linear">
        <div className="container flex flex-col md:flex-row lg:flex-row justify-around h-screen items-center p-6">
          <div className="text-area flex flex-col h-full justify-evenly w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="profile-info flex flex-col items-start justify-center">
              <div className="profile-text my-2">
                <h3 className="font-bold text-2xl md:text-3xl lg:text-5xl leading-snug md:leading-relaxed lg:leading-tight">
                  Hello, I'm <br /> {dashboardData.name}
                </h3>
              </div>

              <div className="designation-text my-2 text-sm sm:text-base lg:text-lg">
                <p>I'm a {dashboardData.jobTitle}</p>
              </div>
              <div className="contact-btn my-4">
                <Button Button_text="Hire me" />
              </div>
            </div>

            {/* Job Analytics Section */}
            <div className="job-analytics w-full sm:w-3/4 md:w-2/3">
              <JobAnalytics />
            </div>
          </div>
          <div className="profile-img w-full lg:w-2/5">
            <img
              className=" sm:w-2/3 md:w-3/4 lg:w-4/5 h-72 sm:h-80 md:h-80 lg:h-96 rounded-[30px] m-auto object-cover"
              src={dashboardData.image}
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
