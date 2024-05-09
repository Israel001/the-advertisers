import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import datas from "../../../data/products.json";
import BreadcrumbCom from "../../BreadcrumbCom";
import Layout from "../../Partials/Layout";
import IcoAdress from "./icons/IcoAdress";
import IcoCart from "./icons/IcoCart";
import IcoDashboard from "./icons/IcoDashboard";
import IcoLogout from "./icons/IcoLogout";
import IcoLove from "./icons/IcoLove";
import IcoPassword from "./icons/IcoPassword";
import IcoPayment from "./icons/IcoPayment";
import IcoPeople from "./icons/IcoPeople";
import IcoReviewHand from "./icons/IcoReviewHand";
import IcoSupport from "./icons/IcoSupport";
import AddressesTab from "./tabs/AddressesTab";
import Dashboard from "./tabs/Dashboard";
import OrderTab from "./tabs/OrderTab";
import PasswordTab from "./tabs/PasswordTab";
import Payment from "./tabs/Payment";
import ProfileTab from "./tabs/ProfileTab";
import ReviewTab from "./tabs/ReviewTab";
import SupportTab from "./tabs/SupportTab";
import WishlistTab from "./tabs/WishlistTab";
import ProductTab from "./tabs/ProductTab";
import withDashboardContext from "../../../hoc/withDashboardContext";
import { useAppContext } from "../../../contexts";
import ViewOrder from "../../ViewOrder/ViewOrder";
import ViewProduct from "../../ViewProduct/ViewProduct";
import { RiMenu4Fill } from "react-icons/ri";

function Profile({ action }) {
  const [switchDashboard, setSwitchDashboard] = useState(false);
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");

  const { profile } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );
  }, [getHashContent]);

  const navigate = useNavigate();

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="profile-page-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full my-10">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "profile", path: "/profile" },
              ]}
            />
            <div className="w-full bg-white px-6 md:px-10 py-9">
              <div className="title-area w-full flex gap-6 items-center">
                <button className="md:hidden flex" onClick={toggleNavbar}>
                  <RiMenu4Fill size={30} />
                </button>
                <h1 className="text-[22px] font-bold text-qblack">
                  Your Dashboard
                </h1>
              </div>
              <div className="profile-wrapper w-full mt-8 flex md:space-x-10">
                {/* For the mobile navbar beginning */}

                {isOpen && (
                  <div
                    className={`w-[280px] transition-all duration-300 ease-in-out h-[400px] overflow-y-auto overflow-x-hidden overflow-style-none bg-white absolute z-50 `}
                  >
                    {/* <div className="w-[ min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]"> */}
                    <div className="flex flex-col space-x-6 space-y-10">
                      <div className={`item group `}>
                        <Link to="/profile#dashboard">
                          <div
                            className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                              active === "dashboard"
                                ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                                : ""
                            } `}
                          >
                            <span>
                              <IcoDashboard />
                            </span>
                            <span className={` font-normal text-base`}>
                              Dashboard
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="item group">
                        <Link to="/profile#order">
                          <div
                            className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                              active === "order" ||
                              active.includes("/view-order/")
                                ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                                : ""
                            } `}
                          >
                            <span>
                              <IcoCart />
                            </span>
                            <span className=" font-normal text-base">
                              Order
                            </span>
                          </div>
                        </Link>
                      </div>
                      {profile?.type === "STORE" && (
                        <div className="item group">
                          <Link to="/profile#product">
                            <div
                              className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                                active === "product" ||
                                active.includes("/view-product/")
                                  ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                                  : ""
                              } `}
                            >
                              <span>
                                <IcoCart />
                              </span>
                              <span className=" font-normal text-base">
                                Product
                              </span>
                            </div>
                          </Link>
                        </div>
                      )}
                      {profile?.type !== "STORE" && (
                        <>
                          <div className="item group">
                            <Link to="/profile#address">
                              <div
                                className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                                  active === "address"
                                    ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                                    : ""
                                } `}
                              >
                                <span>
                                  <IcoAdress />
                                </span>
                                <span className="font-normal text-base">
                                  Address
                                </span>
                              </div>
                            </Link>
                          </div>
                        </>
                      )}
                      <div className="item group">
                        <Link to="/profile#password">
                          <div
                            className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                              active === "password"
                                ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                                : ""
                            } `}
                          >
                            <span>
                              <IcoPassword />
                            </span>
                            <span className=" font-normal text-base">
                              Change Password
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="item group"
                        style={{ cursor: "pointer" }}
                        onClick={(event) => {
                          event.preventDefault();
                          localStorage.removeItem("accessToken");
                          localStorage.removeItem("user");
                          localStorage.removeItem("date");
                          navigate("/");
                        }}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoLogout />
                          </span>
                          <span className=" font-normal text-base">Logout</span>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                )}
                {/* For the mobile navabar ending */}
                <div className="w-[236px] md:flex hidden min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
                  <div className="flex flex-col space-y-10">
                    <div className={`item group `}>
                      <Link to="/profile#dashboard">
                        <div
                          className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                            active === "dashboard"
                              ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                              : ""
                          } `}
                        >
                          <span>
                            <IcoDashboard />
                          </span>
                          <span className={` font-normal text-base`}>
                            Dashboard
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#order">
                        <div
                          className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                            active === "order" ||
                            active.includes("/view-order/")
                              ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                              : ""
                          } `}
                        >
                          <span>
                            <IcoCart />
                          </span>
                          <span className=" font-normal text-base">Order</span>
                        </div>
                      </Link>
                    </div>
                    {profile?.type === "STORE" && (
                      <div className="item group">
                        <Link to="/profile#product">
                          <div
                            className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                              active === "product" ||
                              active.includes("/view-product/")
                                ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                                : ""
                            } `}
                          >
                            <span>
                              <IcoCart />
                            </span>
                            <span className=" font-normal text-base">
                              Product
                            </span>
                          </div>
                        </Link>
                      </div>
                    )}
                    {profile?.type !== "STORE" && (
                      <>
                        <div className="item group">
                          <Link to="/profile#address">
                            <div
                              className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                                active === "address"
                                  ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                                  : ""
                              } `}
                            >
                              <span>
                                <IcoAdress />
                              </span>
                              <span className="font-normal text-base">
                                Address
                              </span>
                            </div>
                          </Link>
                        </div>
                      </>
                    )}
                    <div className="item group">
                      <Link to="/profile#password">
                        <div
                          className={`flex space-x-3 items-center text-qgray hover:text-qblack ${
                            active === "password"
                              ? " bg-red-700 text-white px-2 py-3 hover:text-white"
                              : ""
                          } `}
                        >
                          <span>
                            <IcoPassword />
                          </span>
                          <span className=" font-normal text-base">
                            Change Password
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div
                      className="item group"
                      style={{ cursor: "pointer" }}
                      onClick={(event) => {
                        event.preventDefault();
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("user");
                        localStorage.removeItem("date");
                        navigate("/");
                      }}
                    >
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoLogout />
                        </span>
                        <span className=" font-normal text-base">Logout</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="item-body dashboard-wrapper w-full">
                    {active === "dashboard" ? (
                      <Dashboard />
                    ) : active === "profile" ? (
                      <>
                        <ProfileTab />
                      </>
                    ) : active === "payment" ? (
                      <>
                        <Payment />
                      </>
                    ) : active === "order" ? (
                      <>
                        <OrderTab />
                      </>
                    ) : active === "product" ? (
                      <>
                        <ProductTab />
                      </>
                    ) : active === "wishlist" ? (
                      <>
                        <WishlistTab />
                      </>
                    ) : active === "address" ? (
                      <>
                        <AddressesTab />
                      </>
                    ) : active === "password" ? (
                      <>
                        <PasswordTab />
                      </>
                    ) : active === "support" ? (
                      <>
                        <SupportTab />
                      </>
                    ) : active === "review" ? (
                      <>
                        <ReviewTab products={datas.products} />
                      </>
                    ) : active.includes("/view-product/") ? (
                      <>
                        <ViewProduct />
                      </>
                    ) : active.includes("/view-order/") ? (
                      <>
                        <ViewOrder />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withDashboardContext(Profile);
