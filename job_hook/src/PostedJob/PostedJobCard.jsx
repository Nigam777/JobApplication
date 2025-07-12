import React from "react";
import { formatDate } from "../Services/Utilis";
import { Link, useParams } from "react-router-dom";

const PostedJobCard = ({ ...props }) => {
  const { id } = useParams();
  const isActive = (id == props.id);

 

  return (
    <Link
      to={`/posted-job/${props.id}`}
      className={`
        rounded-xl p-4 mt-3 border-l-4 transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-mine-shaft-800 text-yellow-200 shadow-md scale-[1.01]"
            : "bg-mine-shaft-900 hover:bg-mine-shaft-800"
        }
        border-bright-sun-400 text-white hover:shadow-md hover:scale-[1.01]
      `}
    >
      <div className={`text-sm font-semibold ${isActive ? "text-yellow-400" : ""}`}>
        {props.jobTitle}
      </div>
      <div className="text-sm text-mine-shaft-300 font-medium">
        {props.location}
      </div>
      <div className="text-xs text-mine-shaft-400 mt-1">
        {formatDate(props.postTime)}
      </div>
    </Link>
  );
};

export default PostedJobCard;
