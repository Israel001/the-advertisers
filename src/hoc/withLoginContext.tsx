import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withLoginContext = (Component: () => JSX.Element) => {
  return () => {
    const navigate = useNavigate();

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      const date = localStorage.getItem("date");
      const expiredToken = date && new Date().getTime() - +date > 3.6e6;
      if (accessToken && user && expiredToken === false) navigate("/profile");
    }, []);

    return <Component />;
  };
};

export default withLoginContext;
