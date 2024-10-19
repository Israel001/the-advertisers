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

  // Handle slide change to trigger animations
  const handleSlideChange = (index) => {
    setAnimate(false); // Reset animation
    setActiveSlide(index); // Update active slide
    // Re-trigger animation after a short delay
    setTimeout(() => {
      setAnimate(true);
    }, 100); // Adjust delay as needed
  };

  // Detect screen size and disable auto-play for mobile devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
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
                          <p className="text-left text-[13px]">{slide.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>

                <div className="flex flex-col w-full sm:w-[30%] gap-4">
                  <img
                    className="w-full max-w-full sm:h-[195px] object-cover"
                    src={Extra1}
                    alt="Extra 1"
                  />
                  <img
                    className="w-full max-w-full sm:h-[195px] object-cover"
                    src={Extra2}
                    alt="Extra 2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
