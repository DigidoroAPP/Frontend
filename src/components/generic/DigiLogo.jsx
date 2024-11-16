import React from "react";
import Digi from "../../assets/icons/igi.svg";
import clsx from "clsx";
import PropTypes from "prop-types";

const DigiLogo = ({ className }) => {
  return (
    <div className={clsx("flex items-center", className)}>
      <img src={Digi} alt="Digidoro" width={60} height={60} />
      <p className="text-[#202124] text-3xl font-extrabold ml-2">digidoro</p>
    </div>
  );
};

DigiLogo.propTypes = {
  className: PropTypes.string,
};

export default DigiLogo;
