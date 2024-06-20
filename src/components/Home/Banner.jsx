import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Banner({ className }) {
  const [slider, setSlider] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlider();
  }, []);

  const fetchSlider = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/admin/get-slider`
    );
    setSlider(`${import.meta.env.VITE_HOST_URL}/${response.data}`);
    setLoading(false);
  };

  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px]  mb-[30px]">
              <div style={{ width: "100%" }}>
                <div>
                  <picture>
                    <source media="(min-width:1025px)" srcSet={`${slider}`} />
                    {loading ? (
                      <div className="bg-gray-500 animate-pulse h-[300px] w-full "></div>
                    ) : (
                      <img
                        src={`${slider}`}
                        alt=""
                        className="w-full max-w-full h-auto object-cover"
                        style={{ width: "100%", height: "300px" }}
                      />
                    )}
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
