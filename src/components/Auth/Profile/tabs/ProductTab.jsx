// import Orders from "../../../../data/orders";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../../contexts";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import LoaderStyleOne from "../../../Helpers/Loaders/LoaderStyleOne";
import { IoIosAddCircleOutline } from "react-icons/io";
import CreateProductModal from "../../../Modal/createProductModal";
import CustomModal from "../../../Modal/modal";
import { FaChevronDown } from "react-icons/fa";
import LoadingPulse from "../../../Helpers/LoadingPulse";

const ProductTab = () => {
  // const { profile } = useAppContext();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [allProducts, setAllProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [totalPages, setTotalPages] = useState(0);
  const [filterOptions, setFilterOptions] = useState(false);
  const [filter, setFilter] = useState("all");

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
        setTotalPages(Math.ceil(response?.data?.meta?.total / limit));
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <LoaderStyleOne />;
  }

  const filteredProducts = allProducts?.filter((product) => {
    if (filter === "published") return product.published;
    if (filter === "unpublished") return !product.published;
    return true;
  });

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <div className="flex items-center relative ">
          <button
            onClick={() => setFilterOptions(!filterOptions)}
            className="flex items-center gap-2"
          >
            Filter By
            <span>
              <FaChevronDown />
            </span>
          </button>
          <button
            onClick={handleOpen}
            className="flex items-center ml-auto rounded justify-center gap-3 bg-red-700 h-[60px] w-[180px] sm:w-[250px] transform hover:scale-105 duration-500 text-white text-[16px]"
          >
            <IoIosAddCircleOutline size={28} /> Create Product
          </button>
          {filterOptions && (
            <div className="bg-white p-4 rounded-md text-black flex flex-col gap-4 border border-gray-400 absolute w-[200px] left-[70px] top-[40px] ">
              <button
                onClick={() => setFilter("all")}
                className="bg-opacity-0 hover:bg-opacity-100 py-2 duration-700 hover:duration-700 hover:bg-red-500 rounded"
              >
                All
              </button>
              <button
                onClick={() => setFilter("published")}
                className="bg-opacity-0 hover:bg-opacity-100 py-2 duration-700 hover:duration-700 hover:bg-red-500 rounded"
              >
                Published
              </button>
              <button
                onClick={() => setFilter("unpublished")}
                className="bg-opacity-0 hover:bg-opacity-100 py-2 duration-700 hover:duration-700 hover:bg-red-500 rounded"
              >
                Unpublished
              </button>
            </div>
          )}
        </div>

        {/* Desktop View */}
        <section className=" sm:flex hidden gap-6 items-center m-auto justify-center ">
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
              {filteredProducts?.map((product) => (
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
                  <td className="text-center py-4 px-1 md:px-2">
                    <span className="text-base text-qgray md:flex hidden  whitespace-nowrap">
                      {product.name.length > 20
                        ? `${product.name.substring(0, 20)}...`
                        : product.name}{" "}
                    </span>
                    <span className="text-base text-qgray md:hidden flex  whitespace-nowrap">
                      {product.name.length > 20
                        ? `${product.name.substring(0, 9)}...`
                        : product.name}{" "}
                    </span>
                    <br />
                    <span className="text-center">
                      {product.published === true
                        ? "(Published)"
                        : "(Unpublished)"}
                    </span>
                  </td>

                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2 ">
                      {formatPrice(product?.price)}{" "}
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
        </section>
        {/* Mobile View */}

        <section className="flex flex-col sm:hidden mt-14">
          {filteredProducts?.map((product) => (
            <div
              key={product?.id}
              className="flex gap-8 items-center py-8 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div>
                <img
                  src={`${import.meta.env.VITE_HOST_URL}/${
                    product.featuredImage
                  }`}
                  alt={product.name}
                  className="w-[150px] h-[150px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[18px] font-bold ">
                  {product.name.length > 20
                    ? `${product.name.substring(0, 9)}...`
                    : product.name}
                </p>
                <p className="text-base text-qblack whitespace-nowrap">
                  {formatPrice(product?.price)}
                </p>
                <p className="text-[14px] text-gray-600 ">
                  {product.published === true ? "Published" : "Unpublished"}
                </p>
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
              </div>
            </div>
          ))}
        </section>

        <div className="flex justify-center mt-6 ">
          {" "}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
      <CustomModal open={open} handleClose={handleClose}>
        <CreateProductModal />
      </CustomModal>
    </>
  );
};

export default ProductTab;
