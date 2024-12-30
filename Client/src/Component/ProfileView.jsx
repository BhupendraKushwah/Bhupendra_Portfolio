import React, { useEffect, useState } from "react";
import Button from './Button'
import useInstance from "../hooks/Instance";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
export default () => {
    const Instance = useInstance();
    const [profileData, setProfileData] = useState({})
    const getProfileData = async () => {
        try {
            const response = await Instance.get('user/get_profile');
            setProfileData(response.data)
        } catch (error) {
            toast.error(error.response.data || 'Something went wrong !!!')
            console.log(error)
        }
    }
    const handleDownloadPDF = async () => {
        try {
            axios.get(profileData.resume, {
                responseType: 'blob'
            })
                .then(response => {
                    // Create a URL for the blob
                    const url = window.URL.createObjectURL(new Blob([response.data]));

                    // Create a temporary anchor element
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Bhupendra_kushwah.pdf'); // Set the desired file name
                    document.body.appendChild(link);

                    // Trigger the download
                    link.click();

                    // Clean up
                    link.parentNode.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => console.log('ERROR:', error))
        } catch (error) {

        }
    }
    useEffect(() => {
        getProfileData();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="profile-view">
                <div className="container flex flex-col-reverse md:flex-row lg:flex-row justify-between items-center lg:justify-between rounded border border-0 bg-white p-6 lg:p-[5rem] gap-6">
                    <div className="profile-image relative flex items-center justify-center basis-2/5 p-4">
                        <div className="image rounded relative">
                            <img src={profileData.image} className="rounded relative z-10 border-0 border-0" alt="pic" />
                            <div className="img-back top-0 w-full h-full border-primary border-8 absolute"></div>
                        </div>
                        <div className="social-media list-none flex z-10 absolute bg-white text-primary rounded border border-0 shadow-lg text-lg bottom-[-10px] p-2 gap-2">
                            {["github", "linkedin", "x", "instagram"].map((platform) => (
                                <a
                                    key={platform}
                                    href={profileData?.socialLinks?.[platform] || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer hover:text-white hover:bg-primary py-1 px-2 transition duration-300 rounded border"
                                >
                                    <i className={`fa-brands fa-${platform == 'x' ? platform + '-twitter' : platform}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="about-me flex flex-col items-start basis-full lg:basis-1/2 md:basis-1/2">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-3">I Am a Professional Software Developer</h2>
                        <div className="description text-sm mb-2">
                            <p className="mb-1">{profileData.jobBrief}</p>
                        </div>
                        <div onClick={handleDownloadPDF} className="resume-btn my-5 text-sm lg:m-0 md:m-0 m-auto">
                            <Button Button_text='Download CV' isInvert={true} icon={<i className="fa-solid fa-download"></i>} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}