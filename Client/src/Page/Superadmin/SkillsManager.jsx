import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useInstance from "../../hooks/Instance";
import { ToastContainer, toast } from "react-toastify";
import SkillCard from "../../Component/SuperAdmin/SkillsView";

const SkillManager = () => {
    let { handleSubmit, register, watch, formState: { errors, isSubmitting }, setValue, reset } = useForm({ mode: "onChange" });
    const [FileName, setFileName] = useState(null)
    const [skillData, setSkillData] = useState([])
    const [imageValidation, setImageValidation] = useState('');
    const Instance = useInstance();

    const handleFormSubmit = async (formdata) => {
        try {
            let data = new FormData();
            Object.keys(formdata).forEach((key) => {
                data.append(key, formdata[key]);
            });
            data.append('skill_image', FileName);
            let response = await Instance.post('superadmin/add-skills', data);
            setSkillData(prev => [...prev, response.data])
            reset();
            setFileName(null);
            toast.success(response.message);
        }
        catch (error) {
            toast.error(error.response.data.message);
            if (error.response.status == 401)
                window.location.href = '/'
            console.error('Error :', error);
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            let imageType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
            if (imageType.includes(e.target.files[0].type)) {
                setImageValidation('')
                setFileName(e.target.files[0])
            }
            else {
                setImageValidation('Invalid image file. Accepted formats: JPEG, JPG, PNG, WEBP');
                setFileName(null)
            }
        }
    }

    const handleEditSkill = async (skill) => {
        try {
            Object.entries(skill).forEach(([key, value]) => setValue(key, value));
            console.log(skill)
            if (skill.skillType) {
                setValue('Skill_type', skill.skillType);
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong !!!')
        }
    }

    const handleDeleteSkill = async (skillId) => {
        try {
            const response = await Instance.delete('superadmin/delete_skill', { skillId });
            setSkillData((data) => data.filter((skill) => skill._id !== skillId)); // Update state to remove the deleted skill
            toast.success(response.message); // Show success message
        } catch (error) {
            if (error.response.status == 401)
                window.location.href = '/'
            console.error('Error during skill deletion:', error);
            console.error('Error during skill deletion:', error.response);
            toast.error(error.response?.message || 'Something went wrong !!!'); // Show error message
        }
    };

    const updateSkill = (skill) => {
        console.log(skill)
        setSkillData(prevData => {
            return prevData.map(data => {
                if (data._id === skill._id) {
                    console.log(data)
                    return { ...data, ...skill }; // Merge the old data with the new skill data
                }
                return data; // Keep other items unchanged
            });
        });
    }

    useEffect(() => {
        const getSkillData = async () => {
            let response = await Instance.get('superadmin/getSkillData');
            setSkillData(response.data)
        }
        getSkillData();
    }, [])
    return (
        <>
            <div className="p-6">
                <ToastContainer />
                <div className="border p-4">
                    {/* <div className=""> */}
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-12">
                            <div className="form-group">
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-slate-700 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="horizontal-list-radio-frontend" type="radio" value="frontend" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-slate-600 dark:border-gray-500" {...register('Skill_type', { required: true })} />
                                            <label htmlFor="horizontal-list-radio-frontend" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Frontend</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="horizontal-list-radio-backend" type="radio" value="backend" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-slate-600 dark:border-gray-500" {...register('Skill_type', { required: true })} />
                                            <label htmlFor="horizontal-list-radio-backend" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Backend</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="horizontal-list-radio-database" type="radio" value="database" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-slate-600 dark:border-gray-500" {...register('Skill_type', { required: true })} />
                                            <label htmlFor="horizontal-list-radio-database" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Database</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full">
                                <input id="title" type="text" name="title" className={`input-group rounded ${errors.title && 'border-red-500 animate-shake'}`}  {...register('title', { required: true })} placeholder=" " />
                                <label htmlFor="title" className={`label cursor-text text-placeholder text-[15px] ${errors.title && 'text-red'}`}>Title</label>
                            </div>
                            <div className="form-group w-full border rounded p-2 m-1 flex items-center gap-3">
                                <input type="file" id="image" name="image" className={`input-group hidden rounded ${errors.image && 'border-red-500 '}`} {...register('image', { required: true })} placeholder=" " onChange={handleFileChange} />
                                <label htmlFor="image" className='px-4 py-2 bg-secondary text-primary hover:bg-primary hover:text-white hover:border-primary cursor-pointer border rounded text-[15px] transition duration-300 ease' >Image</label>
                                {(errors.image && !FileName) &&
                                    <span className="text-red-500 text-sm" >please select Image</span>
                                }
                                {imageValidation &&
                                    <span className="text-red-500 text-sm">{imageValidation}</span>}
                                <span className="text-secondary-text text-sm" >{FileName && FileName.name}</span>
                            </div>
                            <div className="flex justify-end w-full">
                                <button className="px-4 py-2 bg-primary text-white border rounded" type="submit" disabled={isSubmitting}>Update</button>
                            </div>
                        </form>
                    {/* </div> */}
                    <div className="flex flex-wrap gap-2 mt-4 border p-2">
                        {skillData.length ? (
                            skillData.map((skill) => (
                                <SkillCard key={skill._id} skill={skill} handleDeleteSkill={handleDeleteSkill} handleEditSkill={handleEditSkill} updateSkill={updateSkill} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No skills available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkillManager;