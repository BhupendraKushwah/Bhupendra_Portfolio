import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import useInstance from "../../hooks/Instance";
import { toast, ToastContainer } from "react-toastify";

const ProjectManager = () => {
    let { handleSubmit, register, control, formState: { errors, isSubmitting }, reset } = useForm({ mode: "onChange" });
    const [FileName, setFileName] = useState('')
    const [skillData, setSkillData] = useState([])
    const [imageValidation, setImageValidation] = useState('');
    const Instance = useInstance();

    const handleFormSubmit = async (formdata) => {
        try {
            console.log(formdata);
            let data = new FormData();
            // Process the techSkill field separately
            if (formdata.techSkill && Array.isArray(formdata.techSkill)) {
                const techSkillValues = formdata.techSkill.map((skill) => skill.value); // Extract the `value` property
                data.append('techSkill', JSON.stringify(techSkillValues)); // Append as a JSON string
            }

            // Append other fields to FormData
            Object.keys(formdata).forEach((key) => {
                if (key !== 'techSkill') {
                    data.append(key, formdata[key]);
                }
            });
            data.append('projectImage', FileName);
            let response = await Instance.post('superadmin/add-project-details', data);
            toast.success(response.message)
            // reset()
        }
        catch (error) {
            toast.error(error.response.data.message)
            console.error('Error:', error);
        }
    }
    const handleFileChange = (e) => {
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

    const getSkillData = async () => {
        try {
            const { data } = await Instance.get('superadmin/getSkillData');
            const formattedData = data.map(({ _id,title }) => ({
                value: _id,
                label: title.charAt(0).toUpperCase() + title.slice(1),
            }));
            setSkillData(formattedData);
        } catch (error) {
            console.error("Error fetching skill data:", error);
        }
    };


    useEffect(() => {
        getSkillData();
    }, [])

    return (
        <>
            <ToastContainer />
            <div className="p-2">
                <div className="border p-4">
                    <div className="form">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="form-group w-full">
                                <input id="title" type="text" name="title" className={`input-group rounded ${errors.title && 'border-red-500 animate-shake'}`}  {...register('title', { required: true })} placeholder=" " />
                                <label htmlFor="title" className={`label cursor-text text-placeholder text-[15px] ${errors.title && 'text-red'}`}>Title</label>
                            </div>
                            <div className="form-group w-full">
                                <textarea
                                    id="brief"
                                    name="brief"
                                    className={`input-group h-[120px] rounded ${errors.brief && 'border-red-500 animate-shake'}`}
                                    {...register('brief', { required: "Brief is required" })}
                                    placeholder=" "
                                />
                                <label htmlFor="brief" className={`label cursor-text text-placeholder text-[15px] ${errors.brief && 'text-red'}`}>Brief</label>
                            </div>
                            <div className="form-group w-full border rounded p-2 m-1 flex items-center gap-3">
                                <input type="file" id="image" name="image" className={`input-group hidden rounded ${errors.image && 'border-red-500 '}`} {...register('image', { required: true })} placeholder=" " onChange={handleFileChange} />
                                <label htmlFor="image" className='px-4 py-2 bg-secondary text-primary hover:bg-primary hover:text-white hover:border-primary cursor-pointer border rounded text-[15px] transition duration-300 ease' >Image</label>
                                {(errors.image && !FileName) &&
                                    <span className="text-red-500 text-sm" >please select CV</span>
                                }
                                {imageValidation &&
                                    <span className="text-red-500 text-sm">{imageValidation}</span>}
                                <span className="text-secondary-text text-sm" >{FileName && FileName.name}</span>
                            </div>
                            <div className="form-group w-full border rounded p-2 m-1 flex items-center gap-3">
                                <Controller
                                    name="techSkill"
                                    control={control}
                                    rules={{ required: "Please select at least one tech" }}
                                    render={({ field }) => (
                                        <Select
                                            isMulti
                                            options={skillData}
                                            className="lg:w-1/2 w-full"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-end w-full">
                                <button className="px-4 py-2 bg-primary text-white border rounded" type="submit" disabled={isSubmitting}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectManager;