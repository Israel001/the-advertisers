import Star from "./icons/Star";
import { Link, useNavigate } from "react-router-dom";
import ThinLove from "./icons/ThinLove";
import { useAppContext } from "../../contexts";
import ThickLove from "./icons/ThickLove";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoaderStyleOne from "./Loaders/LoaderStyleOneSmaller";

/* eslint-disable react/prop-types */
export default function SectionStyleTwo({ className, products, type }) {
  const {
    addToCart,
    isLoggedIn,
    profile,
    updateCartQty,
    addToWishlist,
    removeFromWishlist,
    removeFromCart,
    isAddToCartLoading,
    formatMoney,
    isProductId,
  } = useAppContext();
  const [quantity, setQuantity] = useState(5);
  const navigate = useNavigate();

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="slick-arrow slick-next"
        style={{
          right: "10px",
          backgroundColor: "rgb(185,28,28)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
        onClick={onClick}
      ></div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="slick-arrow slick-prev"
        style={{
          left: "10px",
          backgroundColor: "rgb(185,28,28)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
        onClick={onClick}
      ></div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`section-content w-full ${className || ""}`}>
      <Slider {...settings}>
        {products.map((product) => {
          const isInCart = profile?.cart?.find((c) => c.id === product.id);

          return (
            <div key={product?.id} className="h-[400px] px-4">
              <Link to={`/single-product/${product?.id}`}>
                <div
                  className="product-card-oneb w-full h-full bg-white relative group overflow-hidden"
                  style={{
                    boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div
                    className="product-card-img w-full h-[300px]"
                    style={{
                      background: `url(${import.meta.env.VITE_HOST_URL}/${
                        product?.featured_image
                      }) no-repeat center`,
                    }}
                  ></div>
                  <div className="product-card-details px-[30px] pb-[30px] relative">
                    {isInCart ? (
                      <div>
                        {isProductId === product.id && isAddToCartLoading ? (
                          <LoaderStyleOne />
                        ) : (
                          <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[43px] transition-all duration-300 ease-in-out">
                            {isInCart.quantity === 0 ? (
                              <button
                                type="button"
                                className={"yellow-btn"}
                                onClick={(event) => {
                                  event.preventDefault();
                                  addToCart(product);
                                }}
                              >
                                <div
                                  className="flex items-center space-x-3"
                                  style={{ color: "white" }}
                                >
                                  <span>
                                    <svg
                                      width="14"
                                      height="16"
                                      viewBox="0 0 14 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="fill-current"
                                    >
                                      <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                                    </svg>
                                  </span>
                                  <span style={{ color: "white" }}>
                                    {isAddToCartLoading ? (
                                      <LoaderStyleOne />
                                    ) : (
                                      "Add To Cart"
                                    )}
                                  </span>
                                </div>
                              </button>
                            ) : (
                              <div className="flex justify-between items-center py-0 bg-red-700 w-full">
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();

                                    if (isInCart?.quantity > 1) {
                                      updateCartQty(
                                        product,
                                        isInCart?.quantity - 1
                                      );
                                      setQuantity(isInCart?.quantity - 1);
                                    } else if (isInCart?.quantity === 1) {
                                      removeFromCart(product);
                                      setQuantity(0);
                                    }
                                  }}
                                  type="button"
                                  className="text-base w-[40%] h-[40px] text-white"
                                >
                                  -
                                </button>

                                <span className="text-white w-[40%] justify-center h-[40px] flex items-center">
                                  {isInCart?.quantity}
                                </span>

                                <button
                                  onClick={(event) => {
                                    event.preventDefault();

                                    updateCartQty(
                                      product,
                                      isInCart?.quantity + 1
                                    );
                                    setQuantity(isInCart?.quantity + 1);
                                  }}
                                  type="button"
                                  className="text-base w-[40%] h-[40px] text-white"
                                >
                                  +
                                </button>
                              </div>
                              // </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[43px] transition-all duration-300 ease-in-out">
                        <button
                          type="button"
                          className={"yellow-btn"}
                          onClick={(event) => {
                            event.preventDefault();
                            addToCart(product);
                          }}
                        >
                          <div
                            className="flex items-center space-x-3"
                            style={{ color: "white" }}
                          >
                            <span>
                              <svg
                                width="14"
                                height="16"
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current"
                              >
                                <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                              </svg>
                            </span>
                            <span style={{ color: "white" }}>
                              {isAddToCartLoading ? (
                                <LoaderStyleOne />
                              ) : (
                                "Add To Cart"
                              )}
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                    <div className="reviews flex space-x-[1px] mb-3">
                      {Array.from(Array(product.avg_rating), () => (
                        <span key={product.avg_rating + Math.random()}>
                          <Star />
                        </span>
                      ))}
                    </div>
                    <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                      {product.name}
                    </p>
                    <p className="price">
                      {product.discount_price > 0 ? (
                        <>
                          <span className="main-price text-qgray line-through font-600 sm:text-[18px] text-base">
                            {formatMoney(product.price)}
                          </span>
                          <span className="offer-price text-qred font-600 sm:text-[18px] text-base ml-2">
                            {formatMoney(product.discount_price)}
                          </span>
                        </>
                      ) : (
                        <span className="offer-price text-qred font-600 sm:text-[18px] text-base">
                          {formatMoney(product.price)}
                        </span>
                      )}
                    </p>
                  </div>
                  {/* quick-access-btns */}
                  <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20  transition-all duration-300 ease-in-out">
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        if (!isLoggedIn) navigate("/login");
                        const isProductWishlisted = profile?.wishlist?.find(
                          (item) => item.id === product.id
                        );
                        if (isProductWishlisted) {
                          removeFromWishlist(product);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                    >
                      <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                        {profile?.wishlist?.find(
                          (item) => item.id === product.id
                        ) ? (
                          <ThickLove />
                        ) : (
                          <ThinLove />
                        )}
                      </span>
                    </a>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
