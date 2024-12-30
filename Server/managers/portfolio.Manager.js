const skillModel = require("../models/skill.model")
const userModel = require("../models/user.model")
const projectModel = require('../models/project.model')
const { transporter } = require('../configs/mail.config')
const { success, error } = require("../utils/response.utils")

const getDashboardData = async (req) => {
    try {
        const { name, jobTitle, projectsCount, experience, image } = await userModel.findOne({}).lean()
        if (!name || !jobTitle || !projectsCount || !experience || !image) {
            return error('Data not found !!!')
        }
        let data = {
            name,
            jobTitle,
            projectsCount,
            experience,
            image,
        }
        return success({ data })
    } catch (error) {

    }
}

const getJobAnalytic = async () => {
    try {
        const { projectsCount, experience } = await userModel.findOne({}).lean()
        if (!projectsCount || !experience) {
            return error('Data not found !!!')
        }
        let data = {
            projectsCount,
            experience,
        }
        return success({ data })
    } catch (error) {

    }

}

const getProfileData = async () => {
    try {
        const { image, jobBrief, socialLinks, resume } = await userModel.findOne({}).lean()
        if (!image || !jobBrief || !socialLinks || !resume) {
            return error('Data not found !!!')
        }
        let data = {
            image, jobBrief, socialLinks, resume
        }
        return success({ data })
    } catch (error) {

    }

}

const getSkills = async () => {
    try {
        const skills = await skillModel.find({ isActive: true }).lean();

        // Group skills by skillType
        const groupedSkills = skills.reduce((acc, skill) => {
            acc[skill.skillType] = acc[skill.skillType] || [];
            acc[skill.skillType].push(skill.image);
            return acc;
        }, {});

        // Create skill arrays and labeled skill types
        const skillArray = Object.entries(groupedSkills).map(([key, data]) => ({ key, data }));
        const Techskill = Object.keys(groupedSkills).map((key) => ({
            key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
        }));

        return success({ data: skillArray, Techskill });
    } catch (error) {
        console.error('Error fetching skills:', error);
        return error({ message: 'Failed to fetch skills.' });
    }
};

const getProjects = async () => {
    try {
        let projects = await projectModel.aggregate([
            { $match: {} },
            {
                $lookup: {
                    from: 'skills',
                    localField: 'techSkill',
                    foreignField: '_id',
                    as: 'techSkillDetails'
                }
            },
            {
                $project: {
                    projectTitle: 1,
                    projectBrief: 1,
                    projectImage: 1,
                    tech_stack: {
                        $map: {
                            input: "$techSkillDetails",
                            as: "skill",
                            in: "$$skill.title" // Extract only the title field from techSkillDetails
                        }
                    }, // Include the fetched tech skills
                }
            }
        ])
        return success({ data: projects });
    } catch (error) {
        console.error('Error fetching skills:', error);
        return error({ message: 'Failed to fetch skills.' });
    }
}

const getContactDetails = async () => {
    try {
        let contact_details = await userModel.findOne({}).lean();
        let data = {
            address: [
                {
                    street: contact_details.street,
                    city: contact_details.city,
                    state: contact_details.state,
                    zip_code: contact_details.zip_code,
                }
            ],
            socialLinks: contact_details.socialLinks
        }
        return success({ data });
    } catch (error) {
        console.error('Error fetching skills:', error);
        return error({ message: 'Failed to fetch skills.' });
    }
}

const sendEmail = async ({ body }) => {
    const { email, subject, message } = body;
    console.log("Received message from:", email, "Subject:", subject, "Message:", message);

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,       // Your email (sender's email for Gmail, actual sending address)
            to: process.env.EMAIL_USER,         // Your email (where you want to receive the message)
            subject: subject,                  // Subject line
            text: message,                     // Message body
            replyTo: email,
        });

        console.log("Email sent:", info.response);
        return success({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email.", error };
    }
};
module.exports = {
    getDashboardData,
    getJobAnalytic,
    getProfileData,
    getSkills,
    getProjects,
    getContactDetails,
    sendEmail
}