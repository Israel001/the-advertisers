// import Orders from "../../../../data/orders";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../../contexts";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import LoaderStyleOne from "../../../Helpers/Loaders/LoaderStyleOne";

const ProductTab = () => {
  const { profile } = useAppContext();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [allProducts, setAllProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProductData = () => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_HOST_URL
        }/products/store-products?pagination[page]=${page}&pagination[limit]=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setAllProducts(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductData();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <LoaderStyleOne />;
  }
  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Image
              </td>
              <td className="py-4 whitespace-nowrap text-center">Name</td>
              {/* <td className="py-4 whitespace-owrap text-center">Status</td> */}
              <td className="py-4 whitespace-nowrap text-center">Amount</td>
              <td className="py-4 whitespace-nowrap  text-center">Action</td>
            </tr>
            {/* table heading end */}
            {allProducts?.map((product) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={product.id}
              >
                <td className="text-center py-4">
                  <img
                    src={`${import.meta.env.VITE_HOST_URL}/${
                      product.featuredImage
                    }`}
                    alt={product.name}
                    className="w-[200px] h-auto"
                  />
                </td>
                <td className="text-center py-4 px-2">
                  <span className="text-base text-qgray  whitespace-nowrap">
                    {product.name.length > 20
                      ? `${product.name.substring(0, 20)}...`
                      : product.name}{" "}
                  </span>
                  <br />
                  {product.published === true ? "(Published)" : "(Unpublished)"}
                </td>

                <td className="text-center py-4 px-2">
                  <span className="text-base text-qblack whitespace-nowrap px-2 ">
                    {product.price}
                  </span>
                </td>
                <td className="text-center py-4">
                  <Link to={`/profile#/view-product/${product?.id}`}>
                    <button
                      type="button"
                      onClick={() =>
                        localStorage.setItem("productId", product?.id)
                      }
                      className="w-[116px] h-[46px] text-white bg-qyellow font-bold"
                    >
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-6 ">
          {" "}
          <Pagination
            count={profile?.orders?.pagination?.total / limit}
            page={page}
            onChange={handlePageChange}
            color="error"
          />
        </div>
      </div>
    </>
  );
};

export default ProductTab;
