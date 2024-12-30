const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger.utils');
const UserModel = require('../models/user.model');
const skillModel = require('../models/skill.model');
const projectModel = require('../models/project.model');
const cloudinary = require('../configs/cloudinary')
const { success, error, Unauthorized, NotFound } = require('../utils/response.utils');

const loginUser = async (body) => {
    try {
        let { password } = body;
        let user = await UserModel.findOne({})
        if (!user) {
            return NotFound({ message: 'User not found' });
        }
        let isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return Unauthorized({ message: 'Invalid password' })
        }
        const token = jwt.sign({ userId: user._id, type: 'superAdmin' }, process.env.JWT_TOKEN, { expiresIn: '1h' });
        return success({ message: 'Login successfully', token })
    } catch (error) {
        logger.error(`Error: ${error.message}`, { functionName: 'loginUser', stack: error.stack, body })
        return error(error)
    }
}

const UpdatePassword = async (body ) => {
    try {
        const { email, password } = body;
        console.log(email,password)
        const user = await UserModel.findOne({ contactEmail: email }).lean();
        if (!user)
            return NotFound('User not found !!!')
        const hashedPassword =await bcrypt.hash(password, 12)
        const result = await UserModel.updateOne({ contactEmail: email }, { $set: { password: hashedPassword } });
        if (result.nModified === 0) {
            return error('Password update failed. Please try again.');
        }
        return success({ message: 'Password updated successfully.' })
    } catch (error) {
        console.error(error);
        logger.error(`Error: ${error.message}, { functionName: 'UpdatePassword', stack: ${error.stack}, body:${body} }`);
        return error(error);
    }
}
const manageProfile = async ({ body, files }) => {
    try {
        const { jobTitle, first_name, last_name, email, experience, projectsCount, github, linkedIn, x, instagram, about, street, city, state, zip_code } = body;
        const { file, resume } = files;

        if (!file || !resume) return { error: 'No files uploaded' };

        if (!jobTitle || !first_name || !last_name || !email || !experience || !projectsCount || !github || !linkedIn || !x || !instagram) {
            return { error: "Missing required fields" };
        }

        const socialLinks = { github, linkedIn, x, instagram };
        const imageUploadResult = await cloudinary.uploader.upload(file[0].path);
        const imageSecureUrl = imageUploadResult.secure_url;
        const resumeUploadResult = await cloudinary.uploader.upload(resume[0].path);
        const resumeSecureUrl = resumeUploadResult.secure_url;

        let data = {
            name: `${first_name} ${last_name}`,
            street,
            city,
            state,
            zip_code,
            contactEmail: email,
            experience,
            projectsCount,
            jobTitle,
            jobBrief: about,
            image: imageSecureUrl,
            resume: resumeSecureUrl,
            socialLinks,
            isActive: true
        };

        const activeUser = await UserModel.findOne({ isActive: true });

        if (activeUser) {
            await UserModel.updateOne({ _id: activeUser._id }, { $set: data });
            return success({ message: 'Profile Updated successfully', data });
        } else {
            let profileData = new UserModel(data);
            await profileData.save();
            return success({ message: 'Profile Added successfully', data });
        }
    } catch (error) {
        console.error(error);
        logger.error(`Error: ${error.message}, { functionName: 'manageProfile', stack: ${error.stack}, body:${body} }`);
        return error(error);
    }
};

const addSkill = async ({ body, file }) => {
    try {
        const { Skill_type, title } = body;

        // Upload the image to the 'skills' folder in Cloudinary
        const imageUploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'skills', // Specify the folder
        });

        const imageSecureUrl = imageUploadResult.secure_url; // Get the secure URL of the uploaded image

        let data = {
            skillType: Skill_type,
            title,
            image: imageSecureUrl, // Save the Cloudinary URL instead of the local filename
            isActive: true
        };

        // Save the skill data to the database
        let skillData = new skillModel(data);
        await skillData.save();

        return success({ message: 'Skills Added successfully', data });
    } catch (error) {
        console.error(error);
        logger.error(`Error: ${error.message}`, { functionName: 'addSkill', stack: error.stack, body });
        return error(error);
    }
};

const addProjects = async ({ body, file }) => {
    try {
        const { title, brief, techSkill } = body;
        let skill = JSON.parse(techSkill)
        const imageUploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'project',
        });
        let imageSecureUrl = imageUploadResult.secure_url;
        let data = {
            projectTitle: title,
            projectBrief: brief,
            techSkill: skill,
            projectImage: imageSecureUrl
        }
        let projectData = new projectModel(data);
        await projectData.save();
        return success({ message: 'Project Added successfully', data });
    } catch (error) {
        console.error(error)
        logger.error(`Error: ${error.message}`, { functionName: 'addProjects', stack: error.stack, body })
        return error(error)
    }
}
const getProfileData = async (req) => {
    try {
        const profileData = await UserModel.findOne({}).select('-password').lean();

        if (!profileData || profileData.length === 0) {
            return error({ message: "No Profile data found" });
        }
        let { name, password, street, city, state, zip_code, contactEmail, experience, projectsCount, jobTitle, jobBrief, image, resume, socialLinks, isActive } = profileData;
        const { github, linkedIn, x, instagram } = socialLinks;
        const [first_name = "", last_name = ""] = name.split(" ");
        let data = {
            jobTitle,
            first_name,
            last_name,
            password,
            email: contactEmail,
            experience,
            projectsCount,
            github,
            linkedIn,
            x,
            instagram,
            about: jobBrief,
            street,
            city,
            state,
            zip_code,
            image,
            resume,
            isActive
        }
        return success({ data });
    } catch (error) {
        console.error(error);
        logger.error(`Error: ${error.message}`, {
            functionName: 'getDashboardData',
            stack: error.stack,
            params: req.query
        });

        return error({ message: "An error occurred while fetching dashboard data", details: error.message });
    }
}

const getSkillData = async (req) => {
    try {
        const skillData = await skillModel.find({}).lean();

        if (!skillData || skillData.length === 0) {
            return error({ message: "No skill data found" });
        }
        return success({ data: skillData });
    } catch (error) {
        console.error(error);
        logger.error(`Error: ${error.message}`, {
            functionName: 'getSkillData',
            stack: error.stack,
            params: req.query
        });

        return error({ message: "An error occurred while fetching dashboard data", details: error.message });
    }
}

const getProjectData = async (req) => {
    try {
        const projectData = await projectModel.aggregate([
            {
                $match: {} // Match all documents (you can add conditions here)
            },
            {
                $lookup: {
                    from: 'skills', // The name of the skills collection in the database
                    localField: 'techSkill', // Field in projectModel containing skill IDs
                    foreignField: '_id', // Field in skillModel to match against
                    as: 'techSkillDetails' // The resulting array field in the output
                }
            },
            {
                $project: {
                    projectTitle: 1,
                    projectBrief: 1,
                    projectImage: 1,
                    techSkillDetails: {
                        $map: {
                            input: "$techSkillDetails",
                            as: "skill",
                            in: "$$skill.title" // Extract only the title field from techSkillDetails
                        }
                    }, // Include the fetched tech skills
                }
            }
        ]);

        if (!projectData || projectData.length === 0) {
            return error({ message: "No skill data found" });
        }
        return success({ data: projectData });
    } catch (error) {
        console.error(error);
        logger.error(`Error: ${error.message}`, {
            functionName: 'getSkillData',
            stack: error.stack,
            params: req.query
        });

        return error({ message: "An error occurred while fetching dashboard data", details: error.message });
    }
}

const deleteSkill = async ({ body }) => {
    try {
        const { skillId } = body;
        if (!skillId) {
            return error({ message: 'Skill ID is required.' });
        }
        const skillData = await skillModel.findByIdAndDelete({ _id: skillId });
        if (!skillData)
            return error({ message: 'No skill found to delete !!!' })
        else
            return success({ message: 'Skill deleted successfully.' })

    } catch (error) {
        console.error(error);
        logger.error(`Error: ${error.message}`, {
            functionName: 'deleteSkill',
            stack: error.stack,
            body: body
        });

        return error({ message: "An error occurred while fetching dashboard data", details: error.message });
    }
}

const editSkill = async (req) => {
    try {
        let imageUploadResult;
        const { skill_type, title, skill_image, _id } = req.body;

        // If there is a skill image (base64 string or file), upload it to Cloudinary
        if (skill_image) {
            imageUploadResult = await cloudinary.uploader.upload(skill_image, {
                folder: 'skills', // Specify the folder where you want to store the image
            });
        }

        const data = {};
        if (skill_type) data.skillType = skill_type;
        if (title) data.title = title;
        if (skill_image && imageUploadResult) data.image = imageUploadResult.secure_url;

        // Update the skill in the database
        let skillData = await skillModel.findByIdAndUpdate({ _id }, {
            $set: data,  // Update only the fields that are changed
        }, { new: true });

        return success({ message: "Skill updated successfully", skillData });
    } catch (error) {
        console.error(error);
        logger.error(`Error: ${error.message}`, {
            functionName: 'editSkill',
            stack: error.stack,
            body: req.body
        });

        return error({ message: "An error occurred while updating skill", details: error.message });
    }
};

module.exports = {
    loginUser,
    UpdatePassword,
    manageProfile,
    addSkill,
    addProjects,
    getProfileData,
    getProjectData,
    getSkillData,
    deleteSkill,
    editSkill
}