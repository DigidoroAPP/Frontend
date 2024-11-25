import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useBlockNavigation = (shouldBlock, message) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!shouldBlock) return;

    const unblock = navigate.listen((nextLocation) => {
      if (location.pathname !== nextLocation.pathname) {
        const confirmLeave = window.confirm(message);
        if (!confirmLeave) {
          return false; // Block navigation
        }
      }
    });

    return () => unblock(); // Cleanup listener when no longer needed
  }, [shouldBlock, message, navigate, location]);
};

export default useBlockNavigation;
