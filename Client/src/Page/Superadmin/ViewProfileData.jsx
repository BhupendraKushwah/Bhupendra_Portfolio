import React, { useEffect, useState } from "react";
import useInstance from "../../hooks/Instance";
import { Link } from "react-router-dom";

const ProfileData = () => {
  const [profile, setProfile] = useState([]);
  const Instance = useInstance();

  useEffect(() => {
    const getProfileData = async () => {
      let response = await Instance.get('/superadmin/getProfileData');
      setProfile(response.data);
    };
    getProfileData();
  }, []);

  return (
    <>
      <div className="m-2 flex justify-end w-full">
        <Link to='/superadmin/profile_manager' className="px-4 py-2 bg-primary text-white border rounded">
          Back
        </Link>
      </div>

      {!profile.length ? (
        // "No data found" message that spans full width
        <div className="flex justify-center items-center w-full h-full p-8 text-xl text-gray-600">
          No data found
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.map((data) => (
            <div key={data._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                {/* Profile Image */}
                <div className="w-20 h-20 rounded-full border-2 border-indigo-500 overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${data.image}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{data.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{data.brief}</p>

                  {/* Social Links */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600">Social</h4>
                    <ul className="space-y-2 mt-2 text-sm text-gray-600">
                      {Object.entries(data.socialLinks).map(([key, value]) => (
                        <li key={key}>
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {key}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resume Link */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600">Resume</h4>
                    <a
                      href={`http://localhost:5000/uploads/${data.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      Download
                    </a>
                  </div>

                  {/* Status */}
                  <div className="text-sm text-gray-600 flex justify-between items-center">
                    <p>Status: <span className={`font-semibold ${data.isActive ? "text-green-500" : "text-red-500"}`}>{data.isActive ? "Active" : "Inactive"}</span></p>
                    <p>Created At: <span className="font-semibold">{new Date(data.createdAt).toLocaleString()}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileData;
