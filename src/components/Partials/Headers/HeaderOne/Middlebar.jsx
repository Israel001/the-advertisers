import { useAppContext } from "../../../../contexts";
import Cart from "../../../Cart";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { Link } from "react-router-dom";

export default function Middlebar({ className, type }) {
  const { isLoggedIn, profile } = useAppContext();

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
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
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="favorite relative">
                <Link to={isLoggedIn ? "/wishlist" : "/login"}>
                  <span>
                    <ThinLove />
                  </span>
                </Link>
                {isLoggedIn && profile?.wishlist?.length > 0 && (
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                      type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                    }`}
                    style={{ color: "white" }}
                  >
                    {profile.wishlist.length}
                  </span>
                )}
              </div>
              <div className="cart-wrapper group relative py-4">
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
                  <Cart
                    type={type}
                    className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                  />
              </div>
              <div>
                <Link to={isLoggedIn ? "/profile" : "/login"}>
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
