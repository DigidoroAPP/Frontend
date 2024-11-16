import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { PresenceAnimation } from "./FadeIn";

/**
 * Este es el input generico del sistema, el cual se le puede enviar lo siguiente
 * errors: un objeto con la propiedad message para mostrar un mensaje de error
 * icon: un icono para mostrar en el input
 * innerRef: una referencia para el input usado en react-hook-form
 */

const CustomInput = ({
  innerRef,
  name,
  type = "text",
  placeholder,
  ariaLabel,
  errors,
  icon,
  ...props
}) => {
  const hasError = !!errors?.message;

  return (
    <div>
      <TextField
        fullWidth
        {...innerRef}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-label={ariaLabel}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: icon && (
              <InputAdornment
                position="start"
                color={hasError ? "error" : "primary"}
              >
                {React.cloneElement(icon, {
                  style: {
                    color: hasError ? "#FF6B6B" : "#202124",
                  },
                })}
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.5rem",
            borderColor: hasError ? "#FF6B6B" : "#202124",
            boxShadow: hasError
              ? "4px 4px 0px 0px #FF6B6B"
              : "4px 4px 0px 0px #000",
            "&:hover": {
              borderColor: hasError ? "#FF6B6B" : "#000",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "0.5rem",
            borderWidth: "2px",
            borderColor: hasError ? "#FF6B6B !important" : "#202124 !important",
          },
        }}
        {...props}
      />

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {errors && errors.message && (
            <PresenceAnimation
              as="p"
              id={`${name}-error`}
              role="alert"
              className="mx-5 mt-2 text-red-500 text-sm"
            >
              {errors.message || ""}
            </PresenceAnimation>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

CustomInput.propTypes = {
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),
  icon: PropTypes.element, // Para íconos personalizados
};

export default CustomInput;
