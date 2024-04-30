/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderStyleOne from "../components/Helpers/Loaders/LoaderStyleOne";
import { useAppContext } from "../contexts";

const withDashboardContext = (Component) => {
  return () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);

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
          setLoading(false);
        })
        .catch((error) => {
          if (error.response?.data?.statusCode === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            localStorage.removeItem("date");
            setIsLoggedIn(false);
            navigate("/login");
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
        navigate("/login");
      }
      setIsLoggedIn(true);
      getProfile(accessToken);
    }, []);

    return isLoading ? <LoaderStyleOne /> : <Component />;
  };
};

export default withDashboardContext;
