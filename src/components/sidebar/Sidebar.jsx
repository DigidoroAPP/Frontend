import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, PomodoroIcon, TaskIcon } from "../generic/Icons";
import PropTypes from "prop-types";

const Sidebar = ({ horizontalOrientation }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: <HomeIcon width={40} height={40} />, text: "Home", path: "/" },
    { icon: <TaskIcon width={30} height={30} />, text: "Task", path: "/tasks" },
    {
      icon: <PomodoroIcon width={30} height={30} />,
      text: "Pomo",
      path: "/pomodoro",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor={horizontalOrientation ? "bottom" : "left"}
      PaperProps={{
        style: {
          width: horizontalOrientation ? "100%" : "80px",
          height: horizontalOrientation ? "80px" : "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: horizontalOrientation ? "row" : "column",
          alignItems: "center",
          justifyContent: horizontalOrientation ? "center" : "flex-start",
          backgroundColor: "#fff",
        },
      }}
    >
      <List
        style={{
          width: "100%",
          display: "flex",
          flexDirection: horizontalOrientation ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {items.map((item, index) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              button
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: horizontalOrientation ? "100%" : "100px",
                textAlign: "center",
                backgroundColor: isSelected ? "#e7e7e7" : "transparent",
                color: "#202124",
              }}
            >
              <ListItemIcon
                style={{
                  justifyContent: "center",
                  color: "#202124",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                style={{
                  fontSize: "11px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  display: "contents",
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  horizontalOrientation: PropTypes.bool,
};

export default Sidebar;
