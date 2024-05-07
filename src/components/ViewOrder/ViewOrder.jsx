import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts";
import axios from "axios";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";

function ViewOrder() {
  const { profile } = useAppContext();
  const orderId = localStorage.getItem("orderId");
  const [order, setOrder] = useState(null);
  const orderObject = order && JSON.parse(order?.details);
  const [loading, setLoading] = useState(false);

  const getOrder = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_HOST_URL}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setOrder(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (loading) {
    return <LoaderStyleOne />;
  }
  return (
    <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
      <div className="checkout-main-content w-full">
        <div className="container-x mx-auto">
          <div className="w-full  ">
            <div className=" w-full">
              <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                Personal Details
              </h1>

              <div className="form-area">
                <form>
                  <div className="sm:flex sm:space-x-5 items-center mb-6">
                    <div className="sm:w-1/2  mb-5 sm:mb-0">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        First Name{" "}
                      </h1>
                      <div className="w-full h-[50px] appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none mb-2">
                        {orderObject?.personalDetails?.full_name?.split(" ")[0]}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Last Name{" "}
                      </h1>
                      <div className="w-full h-[50px] appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none mb-2">
                        {orderObject?.personalDetails?.full_name?.split(" ")[1]}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-5 items-center mb-6">
                    <div className="w-1/2">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Email Address{" "}
                      </h1>
                      <div className="w-full h-[50px] appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none mb-2">
                        {orderObject?.personalDetails?.email}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Phone Number{" "}
                      </h1>
                      <div className="w-full h-[50px] appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none mb-2">
                        {orderObject?.personalDetails?.phone}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                      Address{" "}
                    </h1>
                    <div className="w-full h-[50px] appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none mb-2">
                      {orderObject?.personalDetails?.address}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                Order Summary
              </h1>

              <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                <div className="sub-total mb-6">
                  <div className=" flex justify-between mb-5">
                    <p className="text-[13px] font-medium text-qblack uppercase">
                      product
                    </p>
                    <p className="text-[13px] font-medium text-qblack uppercase">
                      total
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                </div>
                <div className="product-list w-full mb-[30px]">
                  <ul className="flex flex-col space-y-5">
                    {orderObject?.cart?.map((x, idx) => (
                      <a key={idx} href={`/single-product/${x.id}`}>
                        <li>
                          <div className="flex justify-between items-center gap-14">
                            <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                              <img
                                src={`${import.meta.env.VITE_HOST_URL}/${
                                  x.image
                                }`}
                                alt="product"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <h4 className="text-[15px] text-left text-qblack mb-2.5">
                                {x?.name}
                                <sup className="text-[13px] text-qgray ml-2 mt-2">
                                  x{x.quantity}
                                </sup>
                              </h4>
                            </div>
                            <div>
                              <span className="text-[15px] text-qblack font-medium">
                                N{x.price}
                              </span>
                            </div>
                          </div>
                        </li>
                      </a>
                    ))}
                  </ul>
                </div>
                <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                <div className="mt-[30px]">
                  <div className=" flex justify-between mb-5">
                    <p className="text-[13px] font-medium text-qblack uppercase">
                      SUBTOTAL
                    </p>
                    <p className="text-[15px] font-medium text-qblack uppercase">
                      N
                      {orderObject?.cart?.reduce(
                        (prev, cur) => prev + cur.total,
                        0
                      )}
                    </p>
                  </div>
                </div>

                <div className="w-full mt-[30px]">
                  <div className="flex justify-between sub-total mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Shipping (
                      {`${orderObject?.shipping?.type
                        .split("_")
                        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                        .join(" ")}`}
                      )
                    </span>
                    <span className="text-[15px] text-normal text-qgraytwo">
                      N{orderObject?.shipping?.amount}
                    </span>
                  </div>
                </div>

                <div className="mt-[30px]">
                  <div className=" flex justify-between mb-5">
                    <p className="text-[13px] font-medium text-qblack uppercase">
                      TOTAL
                    </p>
                    <p className="text-[15px] font-medium text-qblack uppercase">
                      N
                      {orderObject?.cart?.reduce(
                        (prev, cur) => prev + cur.total,
                        0
                      ) + orderObject?.shipping?.amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
