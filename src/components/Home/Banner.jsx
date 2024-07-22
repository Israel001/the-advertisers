import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./banner.css";

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
                <div>
                  <Carousel
                    showArrows={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={3000}
                  >
                    <div>
                      <img
                        className="carousel-image"
                        src={`${
                          import.meta.env.VITE_PUBLIC_URL
                        }/assets/Banner/shop1.jpg`}
                      />
                    </div>
                    <div>
                      <img
                        className="carousel-image"
                        src={`${
                          import.meta.env.VITE_PUBLIC_URL
                        }/assets/Banner/newshop.png`}
                      />
                    </div>
                    <div>
                      <img
                        className="carousel-image"
                        // className="w-full max-w-full h-auto object-cover"
                        src={`${
                          import.meta.env.VITE_PUBLIC_URL
                        }/assets/Banner/Shop3.png`}
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
