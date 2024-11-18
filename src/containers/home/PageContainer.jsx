import { Container, Paper } from "@mui/material";
import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";

const PageContainer = ({ children, sx = {} }) => {
  return (
    <Paper
      sx={{
        p: { xs: 0, sm: 2 },
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

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default PageContainer;
