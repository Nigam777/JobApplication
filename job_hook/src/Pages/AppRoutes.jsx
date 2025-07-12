
import Home from "./Home";
import FindJobs from "./FindJobs";
import FindTalent from "./FindTalent";
import PostJobPages from "./PostJobPages";
import JobDescPages from "./JobDescPages";
import ApplyJob from "./ApplyJob";
import CompanyPages from "./CompanyPages";
import PostedJobPages from "./PostedJobPages";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import JobHistoryPage from "./JobHistoryPage";
import Talent_profilePage from "./Talent_profilePage";

const AppRoutes = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="find-talent" element={<FindTalent />} />
      <Route path="job-history" element={<JobHistoryPage />} />
      <Route path="find-job" element={<FindJobs />} />
      <Route path="jobs/:id" element={<JobDescPages />} />
      <Route path="apply-job/:id" element={<ApplyJob />} />
      <Route path="company" element={<CompanyPages />} />
      <Route path="posted-job/:id" element={<PostedJobPages />} />
      <Route
        path="signup"
        element={user ? <Navigate to="/" /> : <SignUpPage />}
      />
      <Route
        path="login"
        element={user ? <Navigate to="/" /> : <SignUpPage />}
      />
      <Route path="profile-page" element={<ProfilePage />} />
      <Route path="Talent-profile-page/:id" element={<Talent_profilePage />} />
      <Route path="post-job" element={<PostJobPages />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
