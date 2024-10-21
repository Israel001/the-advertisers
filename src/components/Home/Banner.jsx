import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./banner.css"; // Ensure this includes the animation styles
import Shop1 from "../../assets/images/s1-1.jpg";
import Shop2 from "../../assets/images/s2-2.jpg";
import Shop3 from "../../assets/images/s3-2.jpg";
import Extra1 from "../../assets/images/b1.jpg";
import Extra2 from "../../assets/images/b2.jpg";

export default function Banner({ className }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Define the slides array
  const slides = [
    {
      image: Shop1,
      alt: "Shop 1",
      subtitle: "Limited Edition",
      title: "EXPERIENCE FEEL GREATNESS WITH VIRTUAL REALITY JUST",
      price: "$599",
      description: "Exclusive deals available now.",
    },
    {
      image: Shop2,
      alt: "Shop 2",
      subtitle: "Weekend Promotion",
      title: "HAPPY SUMMER COMBO SUPER COOL UP TO",
      price: "40% OFF",
      description: "Exclusive deals available now.",
    },
    {
      image: Shop3,
      alt: "Shop 3",
      subtitle: "Limited Edition",
      title: "SCANDINAVIAN COLLECTION JUST FOR YOUR BEDROOM JUST",
      price: "$599",
      description: "Exclusive deals available now.",
    },
  ];

  const secondary = [
    {
      image: Extra1,
      alt: "Extra 1",
      title: "Unio Leather Bags",
      subtitle: "100% Leather Handmade",
      percentOff: "20% OFF",
    },
    {
      image: Extra2,
      alt: "Extra 2",
      title: "iPhone 6+ 32Gb",
      subtitle: "Experience with best smartphone on the world",
      percentOff: "40% OFF",
    },
  ];

  const handleSlideChange = (index) => {
    setAnimate(false);
    setActiveSlide(index);
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className="main-wrapper w-full">
          <div className="banner-card xl:flex xl:space-x-[30px] mb-[30px]">
            <div style={{ width: "100%" }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-7 w-full">
                <Carousel
                  selectedItem={activeSlide}
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={!isMobile}
                  interval={3000}
                  className="w-full sm:w-[70%]"
                  onChange={handleSlideChange}
                >
                  {slides.map((slide, index) => (
                    <div className="relative" key={index}>
                      <img
                        className="w-full max-w-full h-[400px] object-cover"
                        src={slide.image}
                        alt={slide.alt}
                      />
                      <div
                        className={`absolute top-0 left-4 w-4/5 md:2/3 h-full flex items-center justify-center text-black text-left p-4 lg:left-0 ${
                          animate ? "animate-text" : "reset-animations"
                        }`}
                      >
                        <div>
                          <p className="text-[10px] text-blue-400 sm:text-xs">
                            {slide.subtitle}
                          </p>
                          <h2 className="text-[15px] font-bold w-80 mt-6 mb-4 sm:text-xl">
                            {slide.title}{" "}
                            <span className="text-yellow-600">
                              {slide.price}
                            </span>
                          </h2>
                          <p className="text-left text-[13px]">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
                <div className="flex flex-col w-full sm:w-[30%] gap-4">
                  {secondary.map((child, index) => (
                    <div className="relative w-full sm:w-full" key={index}>
                      <img
                        className="w-full max-w-full sm:h-[195px] object-cover"
                        src={child.image}
                        alt={child.alt}
                      />
                      <div
                        className={`absolute top-0 left-4 w-4/5 md:w-3/5 h-full flex items-center justify-center text-black text-left p-4 lg:left-0 `}
                      >
                        <div>
                          <div className="flex justify-center items-center">
                            <h2 className="text-[10px] font-medium sm:text-[25px] w-25 leading-tight">
                              {child.title}
                            </h2>
                            <div className="flex border rounded-full bg-red-600 w-[100px] h-[65px] items-center justify-center">
                              <p className="text-[13px] w-[40%] text-white text-bold ">
                                {child.percentOff}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs w-[90px] mt-6 mb-4 sm:text-xs">
                            {child.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
