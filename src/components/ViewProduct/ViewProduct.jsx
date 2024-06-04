import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { TiDelete } from "react-icons/ti";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineEdit } from "react-icons/ai";
import CustomModal from "../Modal/modal";
import EditProductModal from "../Modal/EditProductModal";

function ViewProduct() {
  const productId = localStorage.getItem("productId");
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(false);
  // const [openDeleteQuery, setDeleteQuery] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  const [images, setImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState("");

  const getProduct = useCallback(() => {
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
        const productData = response.data;
        setProduct(productData);
        setFeaturedImage(
          `${import.meta.env.VITE_HOST_URL}/${productData.featuredImage}`
        );
        const imageUrls = [
          `${import.meta.env.VITE_HOST_URL}/${productData.featuredImage}`,
          ...productData.images
            .split(",")
            .map((image) => `${import.meta.env.VITE_HOST_URL}/${image}`),
        ];
        // console.log(imageUrls);
        setImages(imageUrls);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = useCallback(() => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_HOST_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        navigate("/profile#product");
        setLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
        setLoading(false);
        // Handle error during deletion
      });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  if (loading) {
    return <LoaderStyleOne />;
  }

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: "14px 34px 34px 34px",
    outline: "none",
    overflow: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
  };

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    dots: false,
  };

  const handleUpdate = () => {
    localStorage.setItem("particularId", productId);
    handleEditOpen();
  };

  return (
    <>
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="flex items-center gap-6">
          <button
            onClick={handleOpen}
            className="flex items-center ml-auto mb-2"
          >
            <MdDelete size={30} />
          </button>
          <button onClick={handleUpdate}>
            <AiOutlineEdit size={30} />
          </button>
        </div>
        <Modal open={open}>
          <Box sx={style}>
            <TiDelete
              size={30}
              className="flex items-center ml-auto right-0 cursor-pointer"
              color="red"
              onClick={handleClose}
            />
            <p className="py-4 text-center font-[500] text-[16px]">
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center justify-center gap-6 mt-3">
              <button
                className="h-[40px] text-[15px] font-[500] w-[80px] rounded bg-red-600 transform hover:scale-110 duration-300"
                onClick={deleteProduct}
              >
                Yes
              </button>
              <button
                className="h-[40px] text-[15px] font-[500] w-[80px] rounded bg-white shadow-lg transform hover:scale-110 duration-300"
                onClick={handleClose}
              >
                No
              </button>
            </div>
          </Box>
        </Modal>
        <div className="checkout-main-content w-full">
          <div className="w-full  ">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <img
                // src={`${import.meta.env.VITE_HOST_URL}/${
                //   product?.featuredImage
                // }`}
                src={featuredImage}
                alt={product?.name}
                className="lg:w-[300px] lg:h-[300px] w-full rounded-lg"
              />

              <div className="lg:w-[50%] flex flex-col gap-4 w-full h-[300px]">
                <p className="font-[500] text-[16px]">{product?.name} </p>
                <p className="text-gray-400 text-[14px]">
                  {product?.category.name} | {product?.mainCategory.name}{" "}
                  <span
                    className={`${
                      product?.outOfStock === true
                        ? "bg-pink-500/40 p-2 text-red-700 rounded-lg"
                        : "bg-green-500/40 p-2 text-green-700 rounded-lg"
                    } text-[11px] w-[60px]`}
                  >
                    {product?.outOfStock === true ? "Out of Stock" : "In stock"}
                  </span>
                </p>
                <p className="text-[12px]">
                  Brand: <span className="text-blue-700">{product?.brand}</span>
                </p>
                <p className="text-[14px] text-gray-400 font-[400]">
                  Quantity: {product?.quantity}{" "}
                </p>
                <p className="text-[18px] md:font-[20px] font-bold flex gap-4 items-center">
                  {formatPrice(product?.price)}{" "}
                  <span className="text-gray-400 line-through text-[12px]">
                    {product?.discountPrice === "0" ? (
                      <></>
                    ) : (
                      <>{formatPrice(product?.discountPrice)} </>
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
            {product?.images === "" ? (
              ""
            ) : (
              <Slider className="w-[300px] sm:mt-6 flex gap-4" {...settings}>
                {images.map((url, index) => (
                  <div
                    key={index}
                    className="w-[0px]"
                    onClick={() => setFeaturedImage(url)}
                  >
                    <img
                      className="w-[50px] h-[50px] rounded"
                      src={url}
                      alt=""
                    />
                  </div>
                ))}
                {/* <img
                  src={`${import.meta.env.VITE_HOST_URL}/${
                    product?.featuredImage
                  }`}
                  className="w-[50px] h-[50px] mr-4 rounded"
                  alt=""
                /> */}
              </Slider>
            )}

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
      <CustomModal open={openEdit} handleClose={handleEditClose}>
        <EditProductModal />
      </CustomModal>
    </>
  );
}

export default ViewProduct;
