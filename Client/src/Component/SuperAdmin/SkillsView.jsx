import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useInstance from '../../hooks/Instance';
import { toast, ToastContainer } from 'react-toastify';

const Modal = ({ isOpen, onClose, title, skill }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });
  const [previewImage, setPreviewImage] = useState(null);
  const Instance = useInstance();

  useEffect(() => {
    if (isOpen && skill) {
      setValue("title", skill.title || "");
      setValue("Skill_type", skill.skillType || "");
      setPreviewImage(skill.image || "/placeholder-image.jpg");
    }
  }, [isOpen, skill, setValue]);

  const handleUpdateSkill = async (formdata) => {
    try {
      // Prepare the data
      const data = new FormData();
      data.append('skill_type', formdata.Skill_type)
      data.append('title', formdata.title)

      if (previewImage && previewImage !== skill?.image) {
        data.append("skill_image", previewImage);
      }

      data.append("_id", skill._id);

      // Send the API request
      Instance.put("superadmin/edit_skill", data)
        .then(response => {
          toast.success(response.message || "Skill updated successfully!");
          onClose(true,response.skillData); // Pass `true` or skill data to indicate success
        })
        .catch(error => {
          throw new Error(error?.response?.message || "Failed to update skill.");
        })
    } catch (error) {
      // Log the error for debugging
      console.error("Error updating skill:", error);

      // Show user-friendly error message
      toast.error(
        error.response?.data?.message ||
        "An error occurred while updating the skill. Please try again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => onClose(false)} // Pass `false` to close without update
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          <form onSubmit={handleSubmit(handleUpdateSkill)}>
            {/* Skill Image */}
            <div className="mb-4">
              <img
                src={previewImage}
                alt={skill?.title || "Skill Image"}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-900 border rounded-lg bg-gray-50"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setPreviewImage(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            {/* Skill Type Select */}
            <select
              {...register("Skill_type", { required: "Skill Type is required" })}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4"
            >
              <option value="">Select Skill Type</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
            </select>
            {errors.Skill_type && (
              <p className="text-red-500 text-xs mt-1">{errors.Skill_type.message}</p>
            )}

            {/* Skill Title Input */}
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Skill Title"
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
            >
              Update Skill
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, handleDeleteSkill, updateSkill }) => {
  const skillTypeStyles = {
    frontend: "bg-blue-200 text-blue-800",
    backend: "bg-green-200 text-green-800",
    database: "bg-purple-200 text-purple-800",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[200px] w-full mx-auto bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Skill Image */}
      <div className="skill_img group w-full relative h-24 bg-gray-100 rounded-t-lg overflow-hidden">
        <img
          src={skill.image || "/placeholder-image.jpg"}
          alt={skill.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="action_btn hidden group-hover:flex gap-2 absolute bottom-2 right-2 z-10">
          <span onClick={() => setIsModalOpen(true)}>
            <i className="fa-solid fa-pen-to-square cursor-pointer text-white"></i>
          </span>
          <span onClick={() => handleDeleteSkill(skill._id)}>
            <i className="fa-solid fa-trash cursor-pointer text-white"></i>
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Skill Type Tag */}
        <div className={`text-xs font-semibold uppercase ${skillTypeStyles[skill.skillType]} px-3 py-1 rounded-full mb-2`}>
          {skill.skillType}
        </div>
        {/* Skill Title */}
        <h3 className="text-sm font-semibold text-gray-800 mb-2">{skill.title}</h3>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={(success,data) => {
          if (success) updateSkill(data); // Update the skill after success
          setIsModalOpen(false);
        }}
        title="Edit Skill"
        skill={skill}
      />
    </div>
  );
};

export default SkillCard;
