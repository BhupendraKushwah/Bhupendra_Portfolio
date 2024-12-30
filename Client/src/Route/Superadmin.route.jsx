import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileManager from "../Page/Superadmin/ProfileManager";
import Sidebar from "../Component/SuperAdmin/Sidebar";
import SkillManager from "../Page/Superadmin/SkillsManager";
import ProjectManager from "../Page/Superadmin/ProjectManager";
import ProtectedPage from "./PrivateRoute"
import ProfileData from "../Page/Superadmin/ViewProfileData";
import ViewProject from "../Page/Superadmin/ViewProject"
import UpdatePassword from "../Page/Superadmin/UpdatePassword";

export default function () {
    return (
        <>
            <Sidebar />
            <main className="sm:ml-64">
                <Routes>
                    <Route path="/" element={
                        <ProtectedPage>
                            <ProfileManager />
                        </ProtectedPage>} exact />
                    <Route path="/profile_manager" element={
                        <ProtectedPage>
                            <ProfileManager />
                        </ProtectedPage>} exact />
                    <Route path="/skill_manager" element={
                        <ProtectedPage>
                            <SkillManager />
                        </ProtectedPage>
                    } exact />
                    <Route path="/project_manager/manage" element={
                        <ProtectedPage>
                            <ProjectManager />
                        </ProtectedPage>
                    } exact />
                    <Route path="/project_manager/view" element={
                        <ProtectedPage>
                            <ViewProject />
                        </ProtectedPage>
                    } exact />
                    <Route path="/view_profile_list" element={
                        <ProtectedPage>
                            <ProfileData />
                        </ProtectedPage>
                    } exact />
                    <Route path="/change_password" element={
                        <ProtectedPage>
                            <UpdatePassword />
                        </ProtectedPage>
                    } exact />
                </Routes>
            </main>
        </>

    );
}
