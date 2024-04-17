import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Banner({ className }) {
  const [slider, setSlider] = useState("");

  useEffect(() => {
    fetchSlider();
  }, []);

  const fetchSlider = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/admin/get-slider`
    );
    setSlider(`${import.meta.env.VITE_HOST_URL}/${response.data}`);
  };

  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px]  mb-[30px]">
              <div style={{ width: "100%" }}>
                <Link to="/single-product">
                  <picture>
                    <source media="(min-width:1025px)" srcSet={`${slider}`} />
                    <img
                      src={`${slider}`}
                      alt=""
                      className="w-full max-w-full h-auto object-cover"
                      style={{ width: "100%", height: "300px" }}
                    />
                  </picture>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
