import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useInstance from "../../hooks/Instance";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from "react-toastify";

const ProfileManager = () => {
    const [FileName, setFileName] = useState(null);
    const [resumeName, setResumeName] = useState(null);
    const [imageValidation, setImageValidation] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [resumeTypeValidation, setResumeTypeValidation] = useState('');
    const Instance = useInstance();

    let { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({ mode: "onChange" });

    const handleFormSubmit = (formData) => {
        const data = new FormData();

        // Append form data
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        // Append files
        data.append('file', FileName);
        data.append('resume', resumeName);

        try {
            // Post the data
            Instance.post('superadmin/manage_profile', data)
                .then(response => {
                    toast.success(response.data.message)
                    Object.keys(data).forEach(key => { setValue(key, data[key]); });
                })
                .catch(error => {
                    console.error('Error during form submission:', error)
                });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };


    const handleFileChange = (e, source) => {
        const selectedFiles = e.target.files[0];
        if (selectedFiles) {
            if (source === 'image') {
                const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                if (imageTypes.includes(selectedFiles.type)) {
                    setImageValidation('');
                    setFileName(selectedFiles);
                    const imageUrl = URL.createObjectURL(selectedFiles);
                    setImagePreview(imageUrl);
                } else {
                    setImageValidation('Invalid image file. Accepted formats: JPEG, JPG, PNG, WEBP');
                    setFileName(null);
                    setImagePreview(null);
                }
            } else {
                const resumeTypes = [
                    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/rtf'
                ];
                if (resumeTypes.includes(selectedFiles.type)) {
                    setResumeTypeValidation('');
                    setResumeName(selectedFiles);
                } else {
                    setResumeTypeValidation('Invalid file. Accepted formats: PDF, DOC, DOCX, TXT, RTF');
                    setResumeName(null);
                }
            }
        }
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const result = await Instance.get('superadmin/getProfileData');
                const data = result.data;
                if (data.image) {
                    setImagePreview(data.image);
                    console.log(data.image);
                }
                Object.entries(data).forEach(([key, value]) => setValue(key, value));
            } catch (error) {
                console.error(error);
                alert(error?.response?.data?.message || 'An error occurred while fetching profile data');
            }
        }; fetchProfileData();
    }, [setValue]);
    return (
        <div className="p-6">
            <ToastContainer />
            <div className="border p-4">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
                            {/* Profile Photo */}
                            <div className="col-span-full">
                                <div className="mt-2 flex flex-col items-center gap-y-4">
                                    {/*  */}
                                    {imagePreview ?
                                        <img src={imagePreview} alt="Image Description" className="sm:w-1/4 rounded-full" />
                                        :
                                        <UserCircleIcon aria-hidden="true" className="w-1/5 rounded-full text-gray-300" />}
                                    <input type="file" id="file" name="file" className={`hidden ${errors.file ? 'border-red-500' : ''}`} {...register('file', { required: true })} onChange={(e) => handleFileChange(e, 'image')} />
                                    <label htmlFor="file" className="px-2 py-1 bg-secondary text-primary hover:bg-primary hover:text-white cursor-pointer border rounded">Image</label>
                                    {errors.file && !FileName && (
                                        <span className="text-red-500 text-sm">Please select an image</span>
                                    )}
                                    {imageValidation && <span className="text-red-500 text-sm">{imageValidation}</span>}
                                </div>
                            </div>
                            {/* Job Title */}
                            <div className="sm:col-span-6">
                                <label htmlFor="jobTitle" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.jobTitle ? 'text-red-500' : ''}`}>Job Title</label>
                                <input
                                    id="jobTitle"
                                    name="jobTitle"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.jobTitle ? 'border-red-500' : ''}`}
                                    {...register('jobTitle', { required: true })}
                                />
                            </div>
                            {/* First Name */}
                            <div className="sm:col-span-3">
                                <label htmlFor="first_name" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.first_name ? 'text-red-500' : ''}`}>First Name</label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.first_name ? 'border-red-500' : ''}`}
                                    {...register('first_name', { required: true })}
                                />
                            </div>

                            {/* Last Name */}
                            <div className="sm:col-span-3">
                                <label htmlFor="last_name" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.last_name ? 'text-red-500' : ''}`}>Last Name</label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.last_name ? 'border-red-500' : ''}`}
                                    {...register('last_name', { required: true })}
                                />
                            </div>
                            {/* Password */}
                            <div className="sm:col-span-3">
                                <label htmlFor="password" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.password ? 'text-red-500' : ''}`}>Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.password ? 'border-red-500' : ''}`}
                                    {...register('password', { required: true })}
                                />
                            </div>

                            {/* Email Address */}
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.email ? 'text-red-500' : ''}`}>Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.email ? 'border-red-500' : ''}`}
                                    {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}
                                />
                            </div>
                            {/* Experience */}
                            <div className="sm:col-span-3">
                                <label htmlFor="experience" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.experience ? 'text-red-500' : ''}`}>Experience</label>
                                <input
                                    id="experience"
                                    name="experience"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.experience ? 'border-red-500' : ''}`}
                                    {...register('experience', { required: true })}
                                />
                            </div>
                            {/* projectsCount */}
                            <div className="sm:col-span-3">
                                <label htmlFor="projectsCount" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.projectsCount ? 'text-red-500' : ''}`}>Projects Count</label>
                                <input
                                    id="projectsCount"
                                    name="projectsCount"
                                    type="text"
                                    maxLength={1}
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.projectsCount ? 'border-red-500' : ''}`}
                                    {...register('projectsCount', { required: true })}
                                />
                            </div>
                            {/* Github */}
                            <div className="sm:col-span-3">
                                <label htmlFor="github" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.github ? 'text-red-500' : ''}`}>Github</label>
                                <input
                                    id="github"
                                    name="github"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.github ? 'border-red-500' : ''}`}
                                    {...register('github', { required: true })}
                                />
                            </div>
                            {/* LinkedIn */}
                            <div className="sm:col-span-3">
                                <label htmlFor="linkedIn" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.linkedIn ? 'text-red-500' : ''}`}>LinkedIn</label>
                                <input
                                    id="linkedIn"
                                    name="linkedIn"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.linkedIn ? 'border-red-500' : ''}`}
                                    {...register('linkedIn', { required: true })}
                                />
                            </div>
                            {/* X */}
                            <div className="sm:col-span-3">
                                <label htmlFor="x" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.x ? 'text-red-500' : ''}`}>X</label>
                                <input
                                    id="x"
                                    name="x"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.x ? 'border-red-500' : ''}`}
                                    {...register('x', { required: true })}
                                />
                            </div>
                            {/* Instagram */}
                            <div className="sm:col-span-3">
                                <label htmlFor="instagram" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.instagram ? 'text-red-500' : ''}`}>Instagram</label>
                                <input
                                    id="instagram"
                                    name="instagram"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.instagram ? 'border-red-500' : ''}`}
                                    {...register('instagram', { required: true })}
                                />
                            </div>

                            {/* About */}
                            <div className="col-span-full">
                                <label htmlFor="about" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.about ? 'text-red-500' : ''}`}>About</label>
                                <textarea
                                    id="about"
                                    name="about"
                                    rows="3"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.about ? 'border-red-500' : 's'}`}
                                    {...register('about', { required: true })}
                                />
                            </div>

                            {/* Resume Upload */}
                            <div className="col-span-full">
                                <div className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 ${errors.resume ? 'border-red-500' : 'border-gray-900/25'}`}>
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                        <div className="my-4 text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <input type="file" id="resume" name="resume" className={`input-group hidden rounded ${errors.resume && 'border-red-500 '}`} {...register('resume', { required: true })} placeholder=" " onChange={(e) => handleFileChange(e, 'cv')} />
                                                <label htmlFor="resume" className='px-4 py-2 bg-secondary text-primary hover:bg-primary hover:text-white hover:border-primary cursor-pointer border rounded text-[15px] transition duration-300 ease' >Upload a file</label>
                                                {errors.resume && <p className="text-red-600 text-xs/5 mt-2">{console.log(errors.resume)}</p>}
                                                {resumeTypeValidation &&
                                                    <div className="">
                                                        <p className="text-red-600 text-xs/5 mt-2">{resumeTypeValidation}</p></div>}
                                                <p className="text-secondary-text text-xs/5 mt-2" >{resumeName && resumeName.name}</p>
                                            </label>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            {/* Address Fields */}
                            <div className="sm:col-span-2">
                                <label htmlFor="street" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.street ? 'text-red-500' : ''}`}>Street Address</label>
                                <input
                                    id="street"
                                    name="street"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.street ? 'border-red-500' : ''}`}
                                    {...register('street', { required: true })}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="city" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.city ? 'text-red-500' : ''}`}>City</label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.city ? 'border-red-500' : ''}`}
                                    {...register('city', { required: true })}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="state" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.state ? 'text-red-500' : ''}`}>State</label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.state ? 'border-red-500' : ''}`}
                                    {...register('state', { required: true })}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="zip_code" className={`block text-sm font-medium text-gray-900 text-placeholder ${errors.zip_code ? 'text-red-500' : ''}`}>Zip Code</label>
                                <input
                                    id="zip_code"
                                    name="zip_code"
                                    type="text"
                                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 text-sm/6 ${errors.zip_code ? 'border-red-500' : ''}`}
                                    {...register('zip_code', { required: true })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileManager;
