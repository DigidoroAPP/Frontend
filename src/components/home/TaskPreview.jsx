import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TaskPreview = ({ title, date, dividerColor, link }) => {
  return (
    <Link
      to={link}
      className="flex overflow-hidden items-center w-full h-16 rounded-md border-2 border-gray-800 bg-white transition transform hover:scale-[1.01] hover:shadow-md"
      role="group"
      aria-labelledby="task-title"
    >
      <div
        className={`w-3 h-full ${dividerColor} border-r-2 border-gray-800`}
        aria-hidden="true"
      ></div>

      <div className="flex flex-col justify-center px-4 w-full">
        <h2
          id="task-title"
          className="text-black text-lg font-semibold truncate"
        >
          {title}
        </h2>
        <p className="text-gray-800 text-sm">{date}</p>
      </div>
    </Link>
  );
};

TaskPreview.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dividerColor: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default TaskPreview;