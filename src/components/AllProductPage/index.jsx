/* eslint-disable no-unused-vars */
import { useState } from "react";
import productDatas from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Star from "../Helpers/icons/Star";
import ThinLove from "../Helpers/icons/ThinLove";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import withDashboardContext2 from "../../hoc/withDashboardContext2";
import { useAppContext } from "../../contexts";
import ThickLove from "../Helpers/icons/ThickLove";
import { Loader } from "lucide-react";

function AllProductPage() {
  const [filters, setFilter] = useState({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const mainCategoryId = searchParams.get("mainCategoryId");
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [allProducts, setProducts] = useState([]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(5);

  useEffect(() => {
    fetchProducts();
  }, [page, search, mainCategoryId]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = search
        ? mainCategoryId
          ? `${
              import.meta.env.VITE_HOST_URL
            }/products?pagination[page]=${page}&pagination[limit]=18&search=${search}&filter[mainCategoryId]=${mainCategoryId}`
          : `${
              import.meta.env.VITE_HOST_URL
            }/products?pagination[page]=${page}&pagination[limit]=18&search=${search}`
        : mainCategoryId
        ? `${
            import.meta.env.VITE_HOST_URL
          }/products?pagination[page]=${page}&pagination[limit]=18&filter[mainCategoryId]=${mainCategoryId}`
        : `${
            import.meta.env.VITE_HOST_URL
          }/products?pagination[page]=${page}&pagination[limit]=18`;
      const response = await axios.get(url);
      setShowMore(
        response.data.pagination.page !== response.data.pagination.pages
      );
      const updatedProducts = [...allProducts, ...response.data.data];
      setProducts(
        (search || mainCategoryId) && page === 1
          ? response.data.data
          : updatedProducts
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [volume, setVolume] = useState({ min: 200, max: 500 });

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);

  const { products } = productDatas;

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

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="flex-1">
                {loading ? (
                  <div className="flex items-center justify-center h-[300px]">
                    <Loader size={50} className="animate-spin text-red-600" />
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 xl:gap-[30px] gap-5 mb-[40px]">
                    {allProducts.map((product) => {
                      const isInCart = profile?.cart?.find(
                        (c) => c.id === product.id
                      );
                      const renderStars = () => {
                        const rating = parseFloat(product?.avgRating);
                        const stars = [];
                        for (let i = 1; i <= 5; i++) {
                          if (i <= rating) {
                            stars.push(
                              <span key={i} className="text-yellow-500 mt-4">
                                ★
                              </span>
                            );
                          } else {
                            stars.push(
                              <span key={i} className="text-gray-300 mt-4">
                                ★
                              </span>
                            );
                          }
                        }
                        return stars;
                      };
                      return (
                        <Link
                          to={`/single-product/${product.id}`}
                          key={product.id}
                          className="w-full"
                        >
                          <div className="product-card-one w-full h-[350px] bg-white relative group overflow-hidden shadow-sm hover:shadow-md">
                            <img
                              src={`${import.meta.env.VITE_HOST_URL}/${
                                product.featuredImage
                              }`}
                              alt={product?.name}
                              className="h-[200px] w-full object-cover"
                            />
                            <div className="product-card-details px-[30px] pb-[30px] relative">
                              <div
                                className="  absolute w-full flex justify-around h-15 px-[30px] py-[5px] opacity-0 group-hover:opacity-100 left-0 group-hover:bottom- -mt-12 group-hover:top-[-13px 
                    transition-all duration-500 ease-in-out bg-white "
                              >
                                <span
                                  style={{ borderRadius: "50%" }}
                                  title={isInCart ? "View Cart" : "Add to Cart"}
                                  className=" hover:bg-red-600 duration-500 flex justify-center items-center p-[0px 10px] w-10 h-10 "
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
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
                              <p className="title mt-4 mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                                {product.name}
                              </p>
                              <p
                                className="price 
 text-[15px]"
                              >
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
                              <div className="reviews flex space-x-[1px] mb-1">
                                {renderStars()}
                              </div>
                            </div>
                            {/* quick-access-btns */}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
                {showMore && (
                  <div
                    style={{
                      marginTop: "30px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <button
                      type="button"
                      className="w-[110px] h-[40px]"
                      onClick={() => {
                        if (allProducts.length) {
                          setLoading(true);
                          setPage(page + 1);
                        }
                      }}
                    >
                      <span className={"yellow-btn"} style={{ color: "white" }}>
                        {" "}
                        Show More
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default withDashboardContext2(AllProductPage);
