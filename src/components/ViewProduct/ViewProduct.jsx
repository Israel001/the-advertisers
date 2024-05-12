import { useState, useEffect } from "react";
// import { useAppContext } from "../../contexts";
import axios from "axios";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";

function ViewProduct() {
  //   const { profile } = useAppContext();
  const productId = localStorage.getItem("productId");
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProduct = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_HOST_URL}/products/store-products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("data", response.data);
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <LoaderStyleOne />;
  }
  //   console.log(profile);
  const renderStars = () => {
    const rating = parseFloat(product?.avgRating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };
  return (
    <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
      <div className="checkout-main-content w-full">
        <div className="w-full  ">
          <div className="flex flex-col lg:flex-row justify-center gap-6">
            <img
              src={`${import.meta.env.VITE_HOST_URL}/${product?.featuredImage}`}
              alt={product?.name}
              className="lg:w-[300px] lg:h-[300px] w-full rounded-lg"
            />

            <div className="lg:w-[50%] flex flex-col gap-4 w-full h-[300px]">
              <p className="font-[500] text-[16px]">{product?.name} </p>
              <p className="text-gray-400 text-[14px]">
                {product?.category.name} | {product?.mainCategory.name} {"   "}
                <span
                  className={`${
                    product?.outOfStock === true
                      ? "bg-green-500/40 p-2 text-green-700 rounded-lg"
                      : "bg-pink-500/40 p-2 text-red-700 rounded-lg"
                  } text-[11px] `}
                >
                  {product?.outOfStock === true ? "In stock" : "Out of Stock"}
                </span>
              </p>
              <p className="text-[12px]">
                Brand: <span className="text-blue-700">{product?.brand}</span>
              </p>
              <p className="text-[14px] text-gray-400 font-[400]">
                Quantity: {product?.quantity} {"   "}
              </p>
              <p className="text-[18px] md:font-[20px] font-bold flex gap-4 items-center">
                ₦ {product?.price}{" "}
                <span className="text-gray-400 line-through text-[12px]">
                  {product?.discountPrice === "0" ? (
                    <></>
                  ) : (
                    <>₦ {product?.discountPrice}</>
                  )}
                </span>
              </p>
              <p>{renderStars()}</p>
              <p className="text-gray-500 text-[12px] flex gap-14">
                <span>
                  Status:{" "}
                  {product?.published === true ? "Published" : "Unpublished"}
                </span>
              </p>
            </div>
          </div>
          {/* <div className="rounded-lg p-4 shadow-lg mt-10">
            <p className="font-semibold text-lg pb-4">Product Description</p>
            <div
              className="leading-[40px] text-[14px]"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </div> */}
          <div className="rounded-lg p-4 shadow-lg mt-10">
            <div className="flex gap-4">
              <button
                onClick={() => handleTabClick("description")}
                className={`${
                  activeTab === "description"
                    ? "bg-red-700 text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded outline-none`}
              >
                Description
              </button>
              <button
                onClick={() => handleTabClick("reviews")}
                className={`${
                  activeTab === "reviews"
                    ? "bg-red-700 text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded outline-none`}
              >
                Reviews
              </button>
            </div>
            <div className="mt-4">
              {activeTab === "description" && (
                <div
                  className="leading-[40px] text-[14px]"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
              )}
              {activeTab === "reviews" && (
                <div>
                  <p>
                    {product?.reviews === null
                      ? "No reviews yet"
                      : product?.reviews}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;

// Quantity
// OutOfStock - optional
// Description - optional
// DiscountPrice - optional
// Brand
// Average Rating
// Category
// Main Category
// Images - optional
