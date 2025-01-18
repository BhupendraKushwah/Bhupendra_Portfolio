import React, { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import useInstance from "../hooks/Instance";

const Skills = () => {
    const Instance = useInstance();
    const [skillData, setSkillData] = useState([]);
    const [activeSkill, setActiveSkill] = useState('');
    const [skillSet, setSkillSet] = useState([]);
    const [skills, setSkills] = useState([]);

    const fetchSkills = async () => {
        try {
            const response = await Instance.get('user/get_skills');
            const { data, Techskill } = response;

            setSkillSet(data);
            setSkills(Techskill);

            // Initialize active skill only after skillSet is updated
            if (Techskill.length > 0 && data.length > 0) {
                const initialSkillKey = Techskill[0].key;
                const initialSkill = data.find((skill) => skill.key === initialSkillKey);
                if (initialSkill) {
                    setSkillData(initialSkill.data);
                    setActiveSkill(initialSkillKey);
                }
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleSkillSwitch = (skillKey) => {
        const selectedSkill = skillSet.find((skill) => skill.key === skillKey);
        if (selectedSkill) {
            setSkillData(selectedSkill.data);
            setActiveSkill(skillKey);
        }
    };

    return (
        <div className="skill-section">
            <div id="profileView" className="dark:bg-slate-800 dark:text-white profile-view-main max-w-[950px] m-auto mt-[-150px] lg:mt-[-380px]">
                <ProfileView />
            </div>

            <div className="lg:container lg:px-6 max-w-[950px] flex flex-col lg:flex-row md:flex-row gap-2 justify-around pf-margin mb-5">
                <div className="skill_text w-full lg:w-1/2">
                    <div className="skill_heading text-base bg-white text-primary mx-auto dark:text-white">
                        Skills
                    </div>

                    <div className="skill_para mt-12">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro perferendis tempora doloremque odit distinctio saepe eaque! Praesentium porro odio, cupiditate alias nihil non labore fugiat, soluta eos reprehenderit saepe temporibus ullam maiores quia perferendis.
                    </div>
                </div>

                <div className="technical_skill w-full px-3 lg:w-1/2">
                    <div className="skill_nav text-lg mb-3">
                        <ul className="list-none flex lg:justify-start justify-between gap-2">
                            {skills.map((skill) => (
                                <li
                                    key={skill.key}
                                    onClick={() => handleSkillSwitch(skill.key)}
                                    className={`skill-nav-item py-2 px-4 border text-base rounded cursor-pointer ${activeSkill === skill.key ? 'active' : ''
                                        }`}
                                >
                                    {skill.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="skill_data">
                        <div className="skill-card flex justify-start flex-wrap gap-4 lg:gap-12">
                            {skillData.map((src, index) => (
                                <div className="skill-item cursor-pointer dark:bg-slate-800 dark:text-white" key={index}>
                                    <img src={src} alt={`Skill ${index}`} className="p-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
