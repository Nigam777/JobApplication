import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { url: "/find-job", name: "Find Job" },
    { url: "/find-talent", name: "Find Talent" },
    { url: "/post-job", name: "Post Job" },
    { url: "/posted-job/0", name: "Posted Job" },
    { url: "/job-history", name: "Job History" },

    { url: "/Homes", name: "" },
  ];
  const location = useLocation();

  return (
    <div className="flex gap-5 text-mine-shaft-300 h-full items-center">
      {links.map((link, index) => (
        <div
          key={index}
          className={`border-t-[2px] h-full flex gap-5 items-center ${
            location.pathname === link.url
              ? "text-bright-sun-400 border-bright-sun-400"
              : "border-transparent"
          }`}
        >
          <Link to={link.url}>{link.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
