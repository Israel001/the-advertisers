/* eslint-disable react/display-name */
import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../contexts";

const withDashboardContext2 = (Component) => {
  return () => {
    const { setIsLoggedIn, setProfile } = useAppContext();

    const getProfile = async (accessToken) => {
      await axios
        .get(`${import.meta.env.VITE_HOST_URL}/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          if (error.response?.data?.statusCode === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            localStorage.removeItem("date");
            setIsLoggedIn(false);
          }
        });
      return true;
    };

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      const date = localStorage.getItem("date");
      const expiredToken = date && new Date().getTime() - +date > 3.6e6;
      if (!accessToken || !user || expiredToken !== false) {
        setIsLoggedIn(false);
      }
      setIsLoggedIn(true);
      getProfile(accessToken);
    }, []);

    return <Component />;
  };
};

export default withDashboardContext2;
