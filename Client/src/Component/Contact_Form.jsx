import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useInstance from "../hooks/Instance";
import { toast, ToastContainer } from "react-toastify";

const ContactForm = () => {
    const Instance = useInstance();
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({ mode: "onChange" });
    const [contactData, setContactData] = useState(null);

    const handleFormSubmit = async (formdata) => {
        try {
            let response = await Instance.post('/user/send-mail', formdata)
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const getContactDetails = async () => {
        try {
            const { data } = await Instance.get("user/get_contact");
            setContactData(data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
            console.error(error);
        }
    };

    useEffect(() => {
        getContactDetails();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="contact_me">
                <div className="container border p-7 max-w-[950px] mx-auto flex flex-col md:flex-row lg:flex-row justify-around gap-8">
                    {/* Contact Details Section */}
                    <div className="contact_details basis-2/5">
                        <h1 className="text-3xl font-bold">Let's Connect</h1>
                        <p className="text-sm mt-2">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, quas!
                        </p>
                        <div className="address contact-box p-3 my-4 border rounded flex items-center gap-4 bg-secondary">
                            <i className="fa fa-solid fa-location-dot text-3xl text-primary"></i>
                            <div className="details">
                                <h3 className="text-primary text-sm">Address</h3>
                                <p className="text-base text-text-color">
                                    {contactData?.address?.[0]
                                        ? `${contactData.address[0].street}, ${contactData.address[0].city}, ${contactData.address[0].state}, ${contactData.address[0].zip_code}`
                                        : "Address not available"}
                                </p>
                            </div>
                        </div>
                        <div className="social-media list-none justify-evenly flex bg-white text-primary rounded border border-0 shadow-lg text-lg bottom-[-10px] p-2 gap-2">
                            {["github", "linkedin", "x", "instagram"].map((platform) => (
                                <a
                                    key={platform}
                                    href={contactData?.socialLinks?.[platform] || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer hover:text-white hover:bg-primary py-1 px-2 transition duration-300"
                                >
                                    <i className={`fa-brands fa-${platform == 'x' ? platform + '-twitter' : platform}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="contact_form w-full md:w-1/2 lg:w-1/2">
                        <p className="text-sm mb-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, accusamus.
                        </p>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            {["name", "email", "contact", "subject", "message"].map((field) => (
                                <div className="form-group" key={field}>
                                    <input
                                        id={field}
                                        type={field === "email" ? "email" : "text"}
                                        name={field}
                                        className={`input-group rounded ${errors[field] && "border-red-500 animate-shake"}`}
                                        {...register(field, { required: true })}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor={field}
                                        className={`label cursor-text text-placeholder text-[15px] ${errors[field] && "text-red"}`}
                                    >
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white border rounded"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactForm;
