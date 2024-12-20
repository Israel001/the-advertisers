import { useState, useEffect } from "react";
import { useAppContext } from "../../../../contexts";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import LoaderStyleOne from "../../../Helpers/Loaders/LoaderStyleOne";
import { FileQuestion } from "lucide-react";

export default function OrderTab() {
  const { profile } = useAppContext();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [allOrders, setAllOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOrderData = () => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_HOST_URL
        }/order?pagination[page]=${page}&pagination[limit]=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setAllOrders(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrderData();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <LoaderStyleOne />;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        {profile?.type !== "STORE" ? (
          <>
            {/* Desktop view */}
            <section className=" sm:flex hidden">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  {/* table heading */}
                  <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
                    <td className="py-4 block whitespace-nowrap text-center">
                      Order Id
                    </td>
                    <td className="py-4 whitespace-nowrap text-center">Date</td>
                    <td className="py-4 whitespace-nowrap text-center">
                      Status
                    </td>
                    <td className="py-4 whitespace-nowrap text-center">
                      Amount
                    </td>
                    <td className="py-4 whitespace-nowrap  text-center">
                      Action
                    </td>
                  </tr>
                  {allOrders?.length === 0 ? (
                    <div className="flex justify-center items-center flex-col gap-4">
                      <FileQuestion size={100} />
                      <p>No orders, yet!</p>
                    </div>
                  ) : (
                    <>
                      {allOrders?.map((order) => {
                        return (
                          <>
                            <tr
                              className="bg-white border-b hover:bg-gray-50"
                              key={order.id}
                            >
                              <td className="text-center py-4">
                                <span className="text-lg text-qgray font-medium">
                                  #{order.reference}
                                </span>
                              </td>
                              <td className="text-center py-4 px-2">
                                <span className="text-base text-qgray  whitespace-nowrap">
                                  {moment(order.createdAt).format("lll")} {}
                                </span>
                              </td>
                              <td className="text-center py-4 px-2">
                                {/* <span className="text-sm rounded text-green-500 bg-green-100 p-2"> */}
                                {order.status}
                                {/* </span> */}
                              </td>
                              <td className="text-center py-4 px-2">
                                <span className="text-base text-qblack whitespace-nowrap px-2 ">
                                  {formatPrice(order.payment.amount)}
                                </span>
                              </td>
                              <td className="text-center py-4">
                                <Link to={`/profile#/view-order/${order?.id}`}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      localStorage.setItem("orderId", order?.id)
                                    }
                                    className="w-[116px] h-[46px] text-white bg-qyellow font-bold"
                                  >
                                    View Details
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </section>
            {/* Mobile View */}
            <section className="flex flex-col sm:hidden mt-14">
              {allOrders?.length === 0 ? (
                <div className="flex justify-center items-center flex-col gap-4">
                  <FileQuestion size={100} />
                  <p>No orders, yet!</p>
                </div>
              ) : (
                <>
                  {allOrders?.map((order) => (
                    <div
                      key={order?.id}
                      className="flex flex-col gap-6 border-b hover:bg-gray-50 py-8 cursor-pointer"
                    >
                      <div>
                        <span className="text-[18px] font-bold ">
                          #{order.reference}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-[18px] font-bold ">
                          <span className="text-base text-qgray  whitespace-nowrap">
                            {moment(order.createdAt).format("lll")} {}
                          </span>
                        </p>
                        <p className="text-base text-qblack whitespace-nowrap">
                          {order.status}
                        </p>
                        <p className="text-[14px] text-gray-600 ">
                          <span className="text-base text-qblack whitespace-nowrap px-2 ">
                            {formatPrice(order.payment.amount)}
                          </span>
                        </p>
                        <Link to={`/profile#/view-order/${order?.id}`}>
                          <button
                            type="button"
                            onClick={() =>
                              localStorage.setItem("orderId", order?.id)
                            }
                            className="w-[116px] h-[46px] text-white bg-qyellow font-bold"
                          >
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </section>
          </>
        ) : (
          // Desktop View
          <>
            {allOrders?.length === 0 ? (
              <div className="flex justify-center items-center flex-col gap-4">
                <FileQuestion size={100} />
                <p>No orders, yet!</p>
              </div>
            ) : (
              <table className="w-full hidden sm:flex text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  {/* table heading */}
                  <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
                    <td className="py-4 block whitespace-nowrap text-center">
                      Order Id
                    </td>
                    <td className="py-4 whitespace-nowrap text-center">Date</td>
                    <td className="py-4 whitespace-nowrap text-center">
                      Status
                    </td>
                    <td className="py-4 whitespace-nowrap text-center">
                      Amount
                    </td>
                    <td className="py-4 whitespace-nowrap  text-center">
                      Action
                    </td>
                  </tr>

                  {allOrders?.map((order) => {
                    return (
                      <>
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={order.id}
                        >
                          <td className="text-center py-4">
                            <span className="text-lg text-qgray font-medium">
                              #{order.reference}
                            </span>
                          </td>
                          <td className="text-center py-4 px-2">
                            <span className="text-base text-qgray  whitespace-nowrap">
                              {moment(order.createdAt).format("lll")} {}
                            </span>
                          </td>
                          <td className="text-center py-4 px-2">
                            {/* <span className="text-sm rounded text-green-500 bg-green-100 p-2"> */}
                            {order.status}
                            {/* </span> */}
                          </td>
                          <td className="text-center py-4 px-2">
                            <span className="text-base text-qblack whitespace-nowrap px-2 ">
                              {formatPrice(order.payment.amount)}
                            </span>
                          </td>
                          <td className="text-center py-4">
                            <Link to={`/profile#/view-order/${order?.id}`}>
                              <button
                                type="button"
                                onClick={() =>
                                  localStorage.setItem("orderId", order?.id)
                                }
                                className="w-[116px] h-[46px] text-white bg-qyellow font-bold"
                              >
                                View Details
                              </button>
                            </Link>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            )}
            {/* Mobile View */}
            <section className="flex flex-col sm:hidden mt-14">
              {allOrders?.length === 0 ? (
                <div className="flex justify-center items-center flex-col gap-4">
                  <FileQuestion size={100} />
                  <p>No orders, yet!</p>
                </div>
              ) : (
                <>
                  {allOrders?.map((order) => (
                    <div
                      key={order?.id}
                      className="flex flex-col gap-6 border-b hover:bg-gray-50 cursor-pointer py-8"
                    >
                      <div>
                        <span className="text-[18px] font-bold ">
                          #{order.reference}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-[18px] font-bold ">
                          <span className="text-base text-qgray  whitespace-nowrap">
                            {moment(order.createdAt).format("lll")} {}
                          </span>
                        </p>
                        <p className="text-base text-qblack whitespace-nowrap">
                          {order.status}
                        </p>
                        <p className="text-[14px] text-gray-600 ">
                          <span className="text-base text-qblack whitespace-nowrap px-2 ">
                            {formatPrice(order.payment.amount)}
                          </span>
                        </p>
                        <Link to={`/profile#/view-order/${order?.id}`}>
                          <button
                            type="button"
                            onClick={() =>
                              localStorage.setItem("orderId", order?.id)
                            }
                            className="w-[116px] h-[46px] text-white bg-qyellow font-bold"
                          >
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </section>
          </>
        )}

        {allOrders?.length < 11 ? (
          ""
        ) : (
          <div className="flex justify-center mt-6 ">
            {" "}
            <Pagination
              count={profile?.orders?.pagination?.pages}
              page={page}
              onChange={handlePageChange}
              color="error"
            />
          </div>
        )}
      </div>
    </>
  );
}
