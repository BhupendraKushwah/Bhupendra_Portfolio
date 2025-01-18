import PropTypes from "prop-types";
const JobAnalytics = ({ experience, projectsCount }) => {
    return (
        <div className="job-analytics shadow-lg flex border mx-5 rounded-lg bg-secondary">
            <div className="experience-time p-2 md:p-2 lg:p-3 border-r basis-1/2 text-center">
                <span className="font-bold text-2xl">{experience} Years</span>
                <br />
                <span className="text-sm">Experience</span>
            </div>
            <div className="worked-project p-2 md:p-2 lg:p-3 basis-1/2 text-center">
                <span className="font-bold text-2xl">{projectsCount}+</span>
                <br />
                <span className="text-sm">Working Projects</span>
            </div>
        </div>
    );
};

JobAnalytics.propTypes = {
    experience: PropTypes.number.isRequired,
    projectsCount: PropTypes.number.isRequired
};

export default JobAnalytics;
