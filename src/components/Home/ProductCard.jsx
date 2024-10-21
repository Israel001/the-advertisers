/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ThickLove from "../Helpers/icons/ThickLove";
import ThinLove from "../Helpers/icons/ThinLove";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import { useAppContext } from "../../contexts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { toast } from "react-toastify";

export function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} absolute left-[2px] top[200px] z-40`}
      onClick={onClick}
    >
      <div className=" left0 bg-white rounded-full w-[40px] absolute top-[-10px] h-[40px] flex items-center justify-center shadow-md">
        <ChevronLeft size={20} color="red" />
      </div>
    </div>
  );
}

export function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} absolute right-[0px] top-[200px]`}
      onClick={onClick}
    >
      <div className=" right-0 bg-white rounded-full w-[40px] absolute top-[-10px] h-[40px] flex items-center justify-center shadow-md">
        <ChevronRight size={20} color="red" />
      </div>
    </div>
  );
}

export default function ProductCard({
  className,
  sectionTitle,
  seeMoreUrl,
  products,
}) {
  // const [allProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page] = useState(1);

  const {
    addToCart,
    isLoggedIn,
    profile,
    addToWishlist,
    removeFromWishlist,
    isAddToCartLoading,
    formatMoney,
    isProductId,
  } = useAppContext();
  // const [quantity, setQuantity] = useState(5);

  console.log("another test;")

  // useEffect(() => {
  //   fetchProducts();
  // }, [page]);

  let user = JSON.parse(localStorage.getItem("user"));
  let role = user?.role?.name;

  const navigate = useNavigate();

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${
  //         import.meta.env.VITE_HOST_URL
  //       }/products?pagination[page]=${page}&pagination[limit]=8`
  //     );

  //     const updatedProducts = [...allProducts, ...response.data.data];
  //     setProducts(updatedProducts);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const renderStars = () => {
    const rating = parseFloat(products?.avgRating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500 mt-2">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300 mt-2">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  const slidesToShowDynamic = products.length >= 4 ? 4 : products.length;

  const settings = {
    // className: "center",
    centerMode: true,
    infinite: true,
    // centerPadding: "60px",
    slidesToShow: slidesToShowDynamic,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    cssEase: "linear",
    dots: false,
    arrows: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.8,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: false,
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: false,
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: false,
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
          cssEase: "linear",
        },
      },
    ],
  };

  return (
    <div className={` section-style-one ${className || ""}`}>
      <ViewMoreTitle
        categoryTitle={sectionTitle}
        seeMoreUrl={seeMoreUrl}
        showViewMore={false}
        viewAll=""
      >
        <div className=" products-section w-full">
          <div className="">
            {loading ? (
              <div className="flex justify-center items-center h-[450px]">
                <Loader size={50} className="animate-spin text-red-600" />
              </div>
            ) : (
              <Slider {...settings} className="w-full bg-white">
                {products.map((product) => {
                  const isInCart = profile?.cart?.find(
                    (c) => c.id === product.id
                  );
                  return (
                    <Link to={`/single-product/${product.id}`} key={product.id}>
                      <div className="product-card-one w-fit mx-2 shadow-sm hover:shadow-md h-[400px] bg-white relative group overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_HOST_URL}/${
                            product?.featuredImage || product?.featured_image
                          }`}
                          alt={product?.name}
                          className="w-[300px] h-[200px] object-cover"
                        />
                        {/* <div className=""> */}
                        <div
                          className="  absolute w-full flex justify-around h-15 px-[30px] py-[5px] opacity-0 group-hover:opacity-100 left-0 group-hover:bottom- -mt-12 
                      transition-all duration-500 ease-in-out bg-white "
                        >
                          <span
                            style={{ borderRadius: "50%" }}
                            title={isInCart ? "View Cart" : "Add to Cart"}
                            className=" hover:bg-red-600 duration-500 flex justify-center items-center p-[0px 10px] w-10 h-10 "
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              if (role === "Owner") {
                                toast.error(
                                  "Action cannot be undertaken by sellers."
                                );
                                return;
                              }
                              if (isInCart) {
                                navigate("/cart");
                              } else {
                                addToCart(product);
                              }
                            }}
                          >
                            {isProductId === product.id &&
                            isAddToCartLoading ? (
                              <LoaderStyleOne />
                            ) : isInCart ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current transition-colors duration-300"
                              >
                                <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                              </svg>
                            )}
                          </span>

                          {profile?.wishlist?.find(
                            (item) => item.id === product.id
                          ) ? (
                            <div
                              style={{ borderRadius: "50%" }}
                              className=" flex justify-center items-center p-[0px 10px] w-10 h-10 "
                            >
                              <a
                                href="#"
                                onClick={(event) => {
                                  event.preventDefault();
                                  if (role === "Owner") {
                                    toast.error(
                                      "Action cannot be undertaken by owners."
                                    );
                                    return;
                                  }
                                  if (!isLoggedIn) navigate("/login");
                                  const isProductWishlisted =
                                    profile?.wishlist?.find(
                                      (item) => item.id === product.id
                                    );
                                  if (isProductWishlisted) {
                                    removeFromWishlist(product);
                                  } else {
                                    addToWishlist(product);
                                  }
                                }}
                              >
                                <span className="w-8 h-8 flex justify-center items-center rounded">
                                  <ThickLove />
                                </span>
                              </a>
                            </div>
                          ) : (
                            <div
                              style={{ borderRadius: "50%" }}
                              className=" hover:bg-red-600 duration-500 flex justify-center items-center p-[0px 10px] w-10 h-10 "
                            >
                              <a
                                href="#"
                                onClick={(event) => {
                                  event.preventDefault();
                                  if (role === "Owner") {
                                    toast.error(
                                      "Action cannot be undertaken by owners."
                                    );
                                    return;
                                  }
                                  if (!isLoggedIn) navigate("/login");
                                  const isProductWishlisted =
                                    profile?.wishlist?.find(
                                      (item) => item.id === product.id
                                    );
                                  if (isProductWishlisted) {
                                    removeFromWishlist(product);
                                  } else {
                                    addToWishlist(product);
                                  }
                                }}
                              >
                                {" "}
                                <ThinLove
                                  fill="black"
                                  className="hover:text-white"
                                />
                              </a>
                            </div>
                          )}
                        </div>
                        {/* </div> */}

                        {/* start */}

                        <div className="product-card-details mt-6 px-[30px] pb-[30px] relative flex flex-col items-left">
                          <p className="price text-[15px]">
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
                          <p className="title mt-0 mb-0 text-[14px] w-[250px] font-600 text-qblack leading-[24px] line-clamp-2 duration-500 hover:text-blue-600 text-left">
                            {product.name}
                          </p>

                          <div className="reviews flex space-x-[1px] mb-1 mt-0">
                            {renderStars()}
                          </div>
                        </div>
                        {/* stop */}
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
