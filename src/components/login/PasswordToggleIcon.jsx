import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from "prop-types";

const PasswordToggleIcon = ({ showPassword, onToggle }) => {
  const Icon = showPassword ? VisibilityOff : Visibility;
  return (
    <Icon
      onClick={onToggle}
      style={{ cursor: "pointer" }}
      width={30}
      height={30}
    />
  );
};

PasswordToggleIcon.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default PasswordToggleIcon;
