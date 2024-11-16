import { Link } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CustomLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      sx={{
        color: "#202124",
        textDecoration: "underline",
        "&:hover": {
          textDecoration: "none",
        },
      }}
      className="!text-lg"
    >
      {title}
    </Link>
  );
};

CustomLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CustomLink;
