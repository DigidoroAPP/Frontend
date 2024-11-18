import { Container, Paper } from "@mui/material";
import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";

const LoginPageContainer = ({ children, sx = {} }) => {
  const gradientRef = useRef();
  let currentDeg = 50;

  useEffect(() => {
    let animationFrameId;
    let frameCounter = 0;

    const animateGradient = () => {
      frameCounter += 1;

      if (frameCounter % 4 === 0) {
        currentDeg = (currentDeg + 0.6) % 360;
        if (gradientRef.current) {
          gradientRef.current.style.background = `linear-gradient(${currentDeg}deg, #f1f6f8 50%, #8eb0ff 100%)`;
        }
      }

      animationFrameId = requestAnimationFrame(animateGradient);
    };

    animationFrameId = requestAnimationFrame(animateGradient);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <Paper
      ref={gradientRef}
      sx={{
        p: { xs: 0, sm: 2 },
        backgroundColor: "transparent",
        boxShadow: "none",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          ...sx,
        }}
      >
        {children}
      </Container>
    </Paper>
  );
};

LoginPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default LoginPageContainer;
