import React from "react";
import { useAppContext } from "../../../../contexts";
import moment from "moment";
import Pagination from "@mui/material/Pagination";

export default function OrderTab() {
  const { profile } = useAppContext();
  const [page, setPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    // You can use the value to fetch data for the new page, etc.
  };
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
            {profile?.orders?.data?.map((order) => {
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
                      <button
                        type="button"
                        className="w-[116px] h-[46px] bg-qyellow font-bold"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
            <tr>
              {" "}
              <Pagination
                count={profile?.orders?.length}
                page={page}
                onChange={handlePageChange}
                color="secondary"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
