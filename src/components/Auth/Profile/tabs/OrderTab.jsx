import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../../contexts";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import LoaderStyleOne from "../../../Helpers/Loaders/LoaderStyleOne";

export default function OrderTab() {
  const { profile } = useAppContext();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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

  console.log(profile?.orders)

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Order Id
              </td>
              <td className="py-4 whitespace-nowrap text-center">Date</td>
              <td className="py-4 whitespace-nowrap text-center">Status</td>
              <td className="py-4 whitespace-nowrap text-center">Amount</td>
              <td className="py-4 whitespace-nowrap  text-center">Action</td>
            </tr>
            {/* table heading end */}
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
                        {order.payment.amount}
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
        <div className="flex justify-center mt-6 ">
          {" "}
          <Pagination
            count={profile?.orders?.pagination?.pages}
            page={page}
            onChange={handlePageChange}
            color="error"
          />
        </div>
      </div>
    </>
  );
}
