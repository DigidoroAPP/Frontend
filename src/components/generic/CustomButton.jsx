import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({
  as: Component = "button",
  action = () => {},
  to = "",
  className = "",
  children,
  props,
}) => {
  const CustomButtonProps =
    Component === "button" ? { onClick: action } : { to };

  return (
    <Component
      className={clsx(
        "w-full cursor-pointer flex flex-shrink-0 text-xl justify-center items-center py-3.5 px-3 rounded-full bg-[#202124] text-white text-center font-extrabold hover:bg-accent_color transition-all md:text-lg",
        className
      )}
      {...CustomButtonProps}
      {...props}
    >
      {children}
    </Component>
  );
};

CustomButton.propTypes = {
  as: PropTypes.elementType,
  action: PropTypes.func,
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
};

export default CustomButton;
