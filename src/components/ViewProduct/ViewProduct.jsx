import { useState, useEffect } from "react";
import { useAppContext } from "../../contexts";
import axios from "axios";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";

function ViewProduct() {
  //   const { profile } = useAppContext();
  const productId = localStorage.getItem("productId");
  const [product, setProduct] = useState(null);
  //   const productObject = product && JSON.parse(product?.details);
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

  if (loading) {
    return <LoaderStyleOne />;
  }
  //   console.log(profile);
  return (
    <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
      <div className="checkout-main-content w-full">
        <div className="w-full  ">
          <div className="flex flex-col lg:flex-row justify-center gap-6">
            <img
              src={`${import.meta.env.VITE_HOST_URL}/${product?.featuredImage}`}
              alt={product?.name}
              className="lg:w-[50%] w-full h-auto rounded-lg"
            />

            <div className="lg:w-[50%] w-full h-[300px] lg:h-auto shadow-lg p-6 border border-gray-200 rounded-lg">
              <p className="font-semibold text-lg pb-4">Product Description</p>
              <p className="text-gray-500 text-[14px]">{product?.name} </p>
              <p className="mt-10 text-gray-500 text-[12px] flex gap-14">
                <span>
                  Status:{" "}
                  {product?.published === true ? "Published" : "Unpublished"}
                </span>
                <span>Price: {product?.price}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
