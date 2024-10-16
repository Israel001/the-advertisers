import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./banner.css";
import Shop1 from "../../assets/images/s1-1.jpg";
import Shop2 from "../../assets/images/s2-2.jpg";
import Shop3 from "../../assets/images/s3-2.jpg";

import Extra1 from "../../assets/images/b1.jpg";
import Extra2 from "../../assets/images/b2.jpg";

export default function Banner({ className }) {
  // const [slider, setSlider] = useState("");
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchSlider();
  // }, []);

  // const fetchSlider = async () => {
  //   const response = await axios.get(
  //     `${import.meta.env.VITE_HOST_URL}/admin/get-slider`
  //   );
  //   setSlider(`${import.meta.env.VITE_HOST_URL}/${response.data}`);
  //   setLoading(false);
  // };

  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px]  mb-[30px]">
              <div style={{ width: "100%" }}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-5 w-full">
                  <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={3000}
                    className="w-full sm:w-[70%]"
                  >
                    <div>
                      <img
                        className="w-full max-w-full h-[400px] object-cover"
                        src={Shop1}
                      />
                    </div>
                    <div>
                      <img
                        className="w-full max-w-full h-[400px] object-cover"
                        src={Shop2}
                      />
                    </div>
                    <div>
                      <img
                        // className="carousel-image"
                        className="w-full max-w-full h-[400px] object-cover"
                        src={Shop3}
                      />
                    </div>
                    {/* {slides.map((slide, index) => (
                    <div key={index}>
                      <img
                        src={slide}
                        alt={`Slide ${index + 1}`}
                        className="w-full max-w-full h-auto object-cover"
                        style={{ width: "100%", height: "300px" }}
                      />
                    </div>
                  ))} */}
                  </Carousel>
                  <div className="flex flex-col w-full sm:w-[30%] gap-4">
                    <img
                      className="w-full max-w-full sm:h-[195px] object-cover"
                      src={Extra1}
                    />
                    <img
                      className="w-full max-w-full sm:h-[195px] object-cover"
                      src={Extra2}
                    />
                  </div>
                </div>
                {/* <div>
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
