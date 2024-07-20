import Star from "./icons/Star";
import { Link, useNavigate } from "react-router-dom";
import ThinLove from "./icons/ThinLove";
import { useAppContext } from "../../contexts";
import ThickLove from "./icons/ThickLove";
import { useState } from "react";
import LoadingPulse from "./LoadingPulse";
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
    isAddToCartLoading,
    formatMoney,
  } = useAppContext();
  const [quantity, setQuantity] = useState(5);
  const navigate = useNavigate();

  console.log("isAddToCartLoading", isAddToCartLoading);

  return (
    <div
      className={`section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 ${
        className || ""
      }`}
    >
      {products.map((product) => {
        const isInCart = profile.cart.find((c) => c.id === product.id);

        return (
          <div key={product.id} className="item w-full">
            <div
              className={`product-row-card-style-one w-full h-[250px] bg-white group relative overflow-hidden ${
                className || ""
              }`}
            >
              <Link to={`/single-product/${product.id}`}>
                <div className="flex space-x-5 items-center w-full h-full lg:p-[30px] sm:p-5 p-2">
                  <div className="lg:w-1/2 w-1/3 h-full">
                    <img
                      src={`${import.meta.env.VITE_HOST_URL}/${
                        product.featured_image
                      }`}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center h-full">
                    <div>
                      {/* reviews */}
                      <div className="flex space-x-1 mb-3">
                        {Array.from(Array(product.avg_rating)).map((rating) => {
                          return (
                            <span key={rating}>
                              <Star />
                            </span>
                          );
                        })}
                      </div>
                      <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                        {product.name}
                      </p>
                      <p className="price mb-[26px]">
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
                      {isInCart ? (
                        <div className="flex gap-2 items-center">
                          {/* <p>(1 item(s) added)</p> */}
                          <div
                            className="w-[120px] bg-[#b91c1c] h-[40px] px-[26px] flex items-center border border-qgray-border"
                            style={{ borderRadius: "5px" }}
                          >
                            <div className="flex justify-between items-center w-full">
                              <button
                                onClick={(event) => {
                                  event.preventDefault();

                                  if (isInCart?.quantity > 1) {
                                    updateCartQty(
                                      product,
                                      isInCart?.quantity - 1
                                    );
                                    setQuantity(isInCart?.quantity - 1);
                                  }
                                }}
                                type="button"
                                className="text-base  text-white"
                              >
                                -
                              </button>
                              <span className="text-white">
                                {isAddToCartLoading ? (
                                  <LoaderStyleOne />
                                ) : (
                                  isInCart?.quantity
                                )}
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
                                className="text-base text-white"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="w-[120px] h-[40px] "
                          onClick={(event) => {
                            event.preventDefault();
                            addToCart(product);
                          }}
                        >
                          <span
                            className={type === 3 ? "blue-btn" : "yellow-btn"}
                            style={{ color: "white", borderRadius: "5px" }}
                          >
                            {" "}
                            Add To Cart
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              {/* quick-access-btns */}
              <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[30px]  transition-all duration-300 ease-in-out">
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
          </div>
        );
      })}
    </div>
  );
}
