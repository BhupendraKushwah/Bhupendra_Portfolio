import { useEffect, useState } from "react";
import JobAnalytics from "./JobAnalytics";
import Button from "./Button";
import useInstance from "../hooks/Instance";
import { toast, ToastContainer } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link as ScrollLink } from "react-scroll";

const Dashboard = () => {
  const Instance = useInstance();
  const [dashboardData, setDashboardData] = useState(null); // Null indicates loading state
  const [loading, setLoading] = useState(true); // Global loading state

  const getDashboardData = async () => {
    try {
      const response = await Instance.get("user/get_dashboard");
      setDashboardData(response.data);
    } catch (error) {
      toast.error(error.response?.data || "Something went wrong !!!");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading when data is fetched
    }
  };

  useEffect(() => {
    getDashboardData();

    // Limit scrolling to the Dashboard component height while loading
    if (loading) {
      document.body.style.height = "auto";
      document.body.style.overflow = "hidden";
    }
    return () => {
      // Cleanup: Re-enable scrolling when the component unmounts
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <>
      <ToastContainer />
      <div className="dashboard pb-[200px] lg:pb-[280px] md:pb-0 bg-dash-linear">
        <div className="container flex flex-col md:flex-row lg:flex-row justify-around h-screen items-center p-6">
          {/* Left Section */}
          <div className="text-area flex flex-col h-full justify-evenly w-full lg:w-1/2 mb-8 lg:mb-0">
            {/* Profile Info */}
            <div className="profile-info flex flex-col items-start justify-center">
              <div className="profile-text my-2">
                <h3 className="font-bold text-2xl md:text-3xl lg:text-5xl leading-snug md:leading-relaxed lg:leading-tight">
                  {loading ? (
                    <SkeletonTheme baseColor="#fff" highlightColor="#ccc">
                      <p>
                        <Skeleton width={250} />
                      </p>
                    </SkeletonTheme>
                  ) : (
                    <>Hello, I&apos;m <br /> </>)
                  }
                  {loading ? (
                    <SkeletonTheme baseColor="#fff" highlightColor="#ccc">
                      <p>
                        <Skeleton width={350} />
                      </p>
                    </SkeletonTheme>
                  ) : (
                    dashboardData?.name)
                  }
                </h3>
              </div>
              <div className="designation-text my-2 text-sm sm:text-base lg:text-lg">
                {loading ? (
                  <SkeletonTheme baseColor="#fff" highlightColor="#ccc">
                    <p>
                      <Skeleton width={150} />
                    </p>
                  </SkeletonTheme>
                ) : (
                  <p>I&rsquo;m a {dashboardData?.jobTitle || "Professional"}</p>
                )}
              </div>
              <div className="contact-btn my-4">
                <ScrollLink to="contact" smooth={true} duration={500}>
                  <Button Button_text="Hire me" />
                </ScrollLink>
              </div>
            </div>

            {/* Job Analytics Section */}
            <div className="job-analytics w-full sm:w-3/4 md:w-2/3">
              {loading ? (
                <SkeletonTheme baseColor="#fff" highlightColor="#ccc">
                  <p>
                    <Skeleton height={80} />
                  </p>
                </SkeletonTheme>
              ) :
                <JobAnalytics experience={dashboardData.experience} projectsCount={dashboardData.projectsCount} />
              }
            </div>
          </div>

          {/* Right Section: Profile Image */}
          <div className="profile-img w-full lg:w-2/5">
            {loading ? (
              <SkeletonTheme baseColor="#fff" highlightColor="#ccc">
                <p>
                  <Skeleton
                    className="sm:w-2/3 md:w-3/4 lg:w-4/5 h-72 sm:h-80 md:h-80 lg:h-96 rounded-[30px] m-auto"
                  />
                </p>
              </SkeletonTheme>

            ) : (
              <img
                className="sm:w-2/3 md:w-3/4 lg:w-4/5 h-72 sm:h-80 md:h-80 lg:h-96 rounded-[30px] m-auto object-cover"
                src={dashboardData?.image || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
