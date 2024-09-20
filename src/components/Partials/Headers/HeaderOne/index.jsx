import { Link } from "react-router-dom";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { useAppContext } from "../../../../contexts";
import { useEffect, useState } from "react";

export default function HeaderOne({ className, drawerAction, type = 1 }) {
  const { profile } = useAppContext();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={` ${className || ""} header-section-wrapper relative `}
      style={{ background: "rgb(185 28 28 / 1)", border: "1px solid red" }}
    >
      {/* <TopBar className="quomodo-shop-top-bar" /> */}

      <div
        className={`${
          isFixed
            ? "fixed top-0 left-0 w-full z-50 bg-white shadow-lg animate-slideDown"
            : "relative"
        } transition-all duration-300 ease-in-out`}
      >
        <Middlebar
          type={type}
          className="quomodo-shop-middle-bar lg:block hidden"
        />
        <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
          <div className="w-full h-full flex justify-between items-center px-5">
            <div onClick={drawerAction}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <div>
              {type === 3 ? (
                <Link to="/">
                  <img
                    width="152"
                    height="36"
                    src={`${
                      import.meta.env.VITE_PUBLIC_URL
                    }/assets/images/logo-3.svg`}
                    alt="logo"
                  />
                </Link>
              ) : type === 4 ? (
                <Link to="/">
                  <img
                    width="152"
                    height="36"
                    src={`${
                      import.meta.env.VITE_PUBLIC_URL
                    }/assets/images/logo-4.svg`}
                    alt="logo"
                  />
                </Link>
              ) : (
                <Link to="/">
                  <img
                    width="152"
                    height="36"
                    src={`${
                      import.meta.env.VITE_PUBLIC_URL
                    }/assets/images/logo.svg`}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <div className="cart relative cursor-pointer">
              <Link to={"/cart"}>
                <span>
                  <ThinBag />
                </span>
              </Link>
              {profile?.cart?.length > 0 && (
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                    type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                  }`}
                  style={{ color: "white" }}
                >
                  {profile.cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
        <Navbar type={type} className="quomodo-shop-nav-bar lg:block hidden" />
      </div>
    </header>
  );
}
