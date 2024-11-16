import { Link } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CustomLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      sx={{
        color: "#202124",
        fontFamily: "'Inter', sans-serif",
        fontSize: "1.2rem",
        lineHeight: "65.354px",
        textDecoration: "underline",
        "&:hover": {
          textDecoration: "none",
        },
      }}
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
