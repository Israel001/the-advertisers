import { useEffect, useRef, useState } from "react";
import data from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import InputCom from "../Helpers/InputCom";
import Layout from "../Partials/Layout";
import ProductView from "./ProductView";
import Reviews from "./Reviews";
import SallerInfo from "./SallerInfo";
import { useParams } from "react-router-dom";
import Star from "../Helpers/icons/Star";
import ThinLove from "../Helpers/icons/ThinLove";
import ThickLove from "../Helpers/icons/ThickLove";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import withDashboardContext2 from "../../hoc/withDashboardContext2";
import { useAppContext } from "../../contexts";
import { TfiWorld } from "react-icons/tfi";
import { GoPackageDependencies } from "react-icons/go";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { CiCreditCard1 } from "react-icons/ci";
import { IconContext } from "react-icons";
import ProductCard from "../Home/ProductCard";

function SingleProductPage() {
  const [tab, setTab] = useState("des");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [reviewLoading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const reviewElement = useRef(null);
  const [report, setReport] = useState(false);
  const [commnets, setComments] = useState([
    {
      id: Math.random(),
      author: "Rafiqul Islam",
      comments: `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the redi 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries but also the on leap into
                electronic typesetting, remaining`,
      review: 4,
      replys: [
        {
          id: Math.random(),
          name: "Willium Kingson",
          comments: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        },
      ],
    },
    {
      id: Math.random(),
      author: "Abdullah Mamun",
      comments: `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the redi 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries but also the on leap into
                electronic typesetting, remaining`,
      review: 5,
    },
  ]);
  const reviewAction = () => {
    setLoading(true);
    setTimeout(() => {
      if ((name, message, rating)) {
        setComments((prev) => [
          {
            id: Math.random(),
            author: name,
            comments: message,
            review: rating,
          },
          ...prev,
        ]);
        setLoading(false);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setRating(0);
        setHover(0);
        window.scrollTo({
          top: -reviewElement.current.getBoundingClientRect().top,
          left: 0,
          behavior: "smooth",
        });
      }
      setLoading(false);
      return false;
    }, 2000);
  };

  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setLoading1(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_URL}/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading1(false);
    }
  };

  const {
    addToCart,
    isLoggedIn,
    profile,
    addToWishlist,
    removeFromWishlist,
    formatMoney,
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <>
      <Layout childrenClasses="pt-0 pb-0">
        <div className="single-product-wrapper w-full ">
          <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
            <div className="breadcrumb-wrapper w-full ">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                  paths={[
                    { name: "home", path: "/" },
                    { name: product?.category?.name, path: "" },
                    {
                      name:
                        product?.name?.length > 22
                          ? product?.name?.substring(0, 22) + "..."
                          : product?.name,
                      path: "",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-initial w-5/6">
              <div className="w-full bg-white pb-[60px]">
                {loading1 ? (
                  <div
                    role="status"
                    class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center m-20"
                  >
                    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                      <svg
                        class="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                    <div class="w-full">
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div className="container-x m-6 lg:mx-auto">
                    <ProductView
                      reportHandler={() => setReport(!report)}
                      product={product}
                    />
                  </div>
                )}
              </div>
              <div
                className="product-des-wrapper w-full relative pb-[60px] m-5"
                ref={reviewElement}
              >
                <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
                  <div className="container-x mx-auto">
                    <ul className="flex space-x-12 ">
                      <li>
                        <span
                          id="des"
                          onClick={() => setTab("des")}
                          className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer  ${
                            tab === "des"
                              ? "border-qyellow text-qblack "
                              : "border-transparent text-qgray"
                          }`}
                        >
                          Description
                        </span>
                      </li>
                      <li>
                        <span
                          onClick={() => setTab("review")}
                          className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                            tab === "review"
                              ? "border-qyellow text-qblack "
                              : "border-transparent text-qgray"
                          }`}
                        >
                          Reviews
                        </span>
                      </li>
                      {/* <li>
                        <span
                          onClick={() => setTab("info")}
                          className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                            tab === "info"
                              ? "border-qyellow text-qblack "
                              : "border-transparent text-qgray"
                          }`}
                        >
                          Seller Info
                        </span>
                      </li> */}
                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
                </div>
                <div className="tab-contents w-full min-h-[400px] ">
                  <div className="container-x mx-auto">
                    {tab === "des" && (
                      <div
                        data-aos="fade-up"
                        className="w-full tab-content-item"
                        dangerouslySetInnerHTML={{
                          __html: product?.description,
                        }}
                      ></div>
                    )}
                    {tab === "review" && (
                      <div
                        data-aos="fade-up"
                        className="w-full tab-content-item"
                      >
                        {product.avgRating ? (
                          <>
                            <h6 className="text-[18px] font-medium text-qblack mb-2">
                              Reviews
                            </h6>
                            {/* review-comments */}
                            <div className="w-full">
                              <Reviews
                                reviewLoading={reviewLoading}
                                reviewAction={reviewAction}
                                comments={commnets.slice(0, 2)}
                                name={name}
                                nameHandler={(e) => setName(e.target.value)}
                                email={email}
                                emailHandler={(e) => setEmail(e.target.value)}
                                phone={phone}
                                phoneHandler={(e) => setPhone(e.target.value)}
                                message={message}
                                messageHandler={(e) =>
                                  setMessage(e.target.value)
                                }
                                rating={rating}
                                ratingHandler={setRating}
                                hoverRating={hover}
                                hoverHandler={setHover}
                              />
                            </div>
                          </>
                        ) : (
                          <>No Reviews</>
                        )}
                      </div>
                    )}
                    {tab === "info" && (
                      <div
                        data-aos="fade-up"
                        className="w-full tab-content-item"
                      >
                        <SallerInfo
                          products={data.products.slice(0, 8)}
                          product={product}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-1/10 lg:w-2/7">
              <div className="flex flex-col bg-slate-100 p-7 mt-0 gap-4 m-4 lg:mr-10">
                <div className="flex flex-row gap-8 align-center">
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <div>
                      <TfiWorld />
                    </div>
                  </IconContext.Provider>
                  <div>
                    <p className="text-left text-sm font-medium">
                      Shipping worldwide
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8 align-center ">
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <div>
                      <GoPackageDependencies />
                    </div>
                  </IconContext.Provider>
                  <div>
                    <p className="text-left text-sm font-medium">
                      Free 7-day return if eligible, so easy
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8 align-center">
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <div>
                      <LiaFileInvoiceDollarSolid />
                    </div>
                  </IconContext.Provider>
                  <div>
                    <p className="text-left text-sm font-medium">
                      Supplier give bills for this product.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8 align-center">
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <div>
                      <CiCreditCard1 />
                    </div>
                  </IconContext.Provider>
                  <div>
                    <p className="text-left text-sm font-medium">
                      Pay online or when receiving goods
                    </p>
                  </div>
                </div>
              </div>
              <div className=" flex justify-center m-4 lg:mr-10">
                <img src="/assets/Banner/iphonead.png" alt="iphone ad" />
              </div>
              <div className="m-4 lg:mr-10 border-solid border h-full ">
                <div className=" border-solid border-b">
                  <h3 className="sm:text-xl text-l font-600 text-qblacktext leading-none pb-3 pt-3 pl-5 bg-slate-100">
                    Same Brand
                  </h3>
                </div>
                {product?.otherProducts?.slice(0, 6).map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="flex flex-col items-center px-4 py-10 my-10 mx-3 hover:border gap-2"
                    >
                      <div>
                        <img
                          src={`${import.meta.env.VITE_HOST_URL}/${
                            product.featured_image
                          }`}
                          alt={product?.name}
                          className="h-[200px] w-[200px]"
                        />
                      </div>
                      <div>
                        <p className="text-wrap text-center w-[300px] text-sm">
                          {product?.name}
                        </p>
                      </div>
                      <div>
                        {Array.from(Array(product.avg_rating), (_, idx) => (
                          <span key={idx + Math.random()}>
                            <Star />
                          </span>
                        ))}
                      </div>
                      <div>
                        <p className="price text-[15px]">
                          {product.discount_price > 0 ? (
                            <>
                              <span className="main-price text-qgray line-through font-600">
                                {formatMoney(product.discount_price)}
                              </span>
                              <span className="offer-price text-qred font-600 ml-2">
                                {formatMoney(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="offer-price text-qred font-600">
                              {formatMoney(product.price)}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="related-product w-full bg-white">
            <div className="container-x mx-auto">
              <div className="w-full py-[60px]">
                <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                  Related Product
                </h1>
                <div
                  data-aos="fade-up"
                  // className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
                >
                  {product && product.relatedProducts?.length > 0 ? (
                    <ProductCard products={product.relatedProducts} />
                  ) : (
                    <div>No similar products</div>
                  )}
                  {/* <DataIteration
                    datas={data.products}
                    startLength={5}
                    endLength={9}
                  >
                    {({ datas }) => (
                      <div key={datas.id} className="item">
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {report && (
          <div className="w-full h-full flex fixed left-0 top-0 justify-center z-50 items-center">
            <div
              onClick={() => setReport(!report)}
              className="w-full h-full fixed left-0 right-0 bg-black  bg-opacity-25"
            ></div>
            <div
              data-aos="fade-up"
              className="sm:w-[548px] sm:h-[509px] w-full h-full bg-white relative py-[40px] px-[38px]"
              style={{ zIndex: "999" }}
            >
              <div className="title-bar flex items-center justify-between mb-3">
                <h6 className="text-2xl font-medium">Report Products</h6>
                <span
                  className="cursor-pointer"
                  onClick={() => setReport(!report)}
                >
                  <svg
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.9399 54.0001C12.0678 53.9832 -0.0210736 41.827 2.75822e-05 26.9125C0.0211287 12.0507 12.1965 -0.0315946 27.115 6.20658e-05C41.9703 0.0317188 54.0401 12.2153 54 27.1404C53.9599 41.9452 41.7972 54.0191 26.9399 54.0001ZM18.8476 16.4088C17.6765 16.4404 16.9844 16.871 16.6151 17.7194C16.1952 18.6881 16.3893 19.5745 17.1363 20.3258C19.0966 22.2906 21.0252 24.2913 23.0425 26.197C23.7599 26.8745 23.6397 27.2206 23.0045 27.8305C21.078 29.6793 19.2148 31.5956 17.3241 33.4802C16.9211 33.8812 16.5581 34.3012 16.4505 34.8857C16.269 35.884 16.6953 36.8337 17.5456 37.3106C18.4382 37.8129 19.5038 37.6631 20.3394 36.8421C22.3673 34.8435 24.3866 32.8365 26.3723 30.7999C26.8513 30.3082 27.1298 30.2871 27.6193 30.7915C29.529 32.7584 31.4851 34.6789 33.4201 36.6184C33.8463 37.0447 34.2831 37.4436 34.9098 37.5491C35.9184 37.7201 36.849 37.2895 37.3196 36.4264C37.7964 35.5548 37.6677 34.508 36.8912 33.7144C34.9731 31.756 33.0677 29.7806 31.0631 27.9149C30.238 27.1467 30.3688 26.7479 31.1031 26.0535C32.9896 24.266 34.8022 22.3982 36.6338 20.5516C37.7922 19.3845 37.8914 17.9832 36.9081 17.0293C35.9501 16.1007 34.5975 16.2146 33.4623 17.3416C31.5188 19.2748 29.5649 21.1995 27.6594 23.1664C27.1446 23.6983 26.8492 23.6962 26.3343 23.1664C24.4267 21.1974 22.4664 19.2811 20.5336 17.3374C19.9997 16.7971 19.4258 16.3666 18.8476 16.4088Z"
                      fill="#F34336"
                    />
                  </svg>
                </span>
              </div>

              <div className="inputs w-full">
                <div className="w-full mb-5">
                  <InputCom
                    label="Enter Report Ttile*"
                    placeholder="Reports Headline here"
                    type="email"
                    name="name"
                    inputClasses="h-[50px]"
                    labelClasses="text-[13px] font-600 leading-[24px] text-qblack"
                  />
                </div>
                <div className="w-full mb-[40px]">
                  <h6 className="input-label  capitalize text-[13px] font-600 leading-[24px] text-qblack block mb-2 ">
                    Enter Report Note*
                  </h6>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="6"
                    className="w-full focus:ring-0 focus:outline-none py-3 px-4 border border-qgray-border  placeholder:text-sm text-sm"
                    placeholder="Type Here"
                  ></textarea>
                </div>

                <button type="button" className="w-full h-[50px] black-btn">
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
      ;
    </>
  );
}

export default withDashboardContext2(SingleProductPage);
