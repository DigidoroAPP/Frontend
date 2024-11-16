import React from "react";
import Digi from "../../assets/icons/igi.svg";

const DigiLogo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={Digi} alt="Digidoro" width={60} height={60} />
      <p className="text-[#202124] text-3xl font-extrabold ml-2">digidoro</p>
    </div>
  );
};

export default DigiLogo;
