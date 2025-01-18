import useInstance from "../../hooks/Instance";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
    let { handleSubmit, register, watch, formState: { errors, isSubmitting } } = useForm({ mode: "onChange" });
    const Instance = useInstance();
    const handleFormSubmit = async (formdata) => {
        try {
            Instance.post('superadmin/login', formdata)
                .then(loginData => {
                    console.log(loginData)
                    localStorage.setItem("persistantState", JSON.stringify({ authToken: loginData.token }))
                    window.location.href = '/superadmin/profile_manager';
                    toast.success(loginData.message);
                })
                .catch(error => {
                    toast.error(error.response?.data?.message)
                });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(errorMessage);
        }
    }
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('persistantState'))?.authToken;
        if (token)
            window.location.href = '/superadmin/profile_manager';
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="login-bg-pic h-screen flex flex-wrap content-center justify-center items-center">
                <div className="login rounded mt-[6rem] lg:mt-0 flex flex-col p-3 justify-between m-auto w-[80%] md:w-auto lg:w-auto">
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-3 gap-2 flex items-center w-full h-full flex-col lg:flex-row md:flex-row">
                        <div className="form-group w-full login-inp">
                            <input id="password" type="password" name="password" className={`bg-transparent w-full rounded ${errors.password && 'border-red-500 animate-shake'}`}  {...register('password', { required: true })} placeholder="User Pass" />
                        </div>
                        <div className="">
                            <button className="px-4 py-2 bg-primary text-white border border-primary rounded-full" type="submit" disabled={isSubmitting}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;