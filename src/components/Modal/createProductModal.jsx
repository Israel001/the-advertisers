/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomEditor from "./CustomEditor";
import { RiLoader2Fill } from "react-icons/ri";

function CreateProductModal({ isEditMode, product }) {
  const productId = localStorage.getItem("productId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState(
    isEditMode ? product.name : ""
  );
  const [productQuantity, setProductQuantity] = useState(
    isEditMode ? product.quantity.toString() : ""
  );
  const [outOfStock, setOutOfStock] = useState(
    isEditMode ? product.outOfStock : false
  );
  const [productPrice, setProductPrice] = useState(
    isEditMode ? product.price : ""
  );
  const [discountPrice, setDiscountPrice] = useState(
    isEditMode ? product.discountPrice : ""
  );
  const [brand, setBrand] = useState(isEditMode ? product.brand : "");
  const [description, setDescription] = useState(
    isEditMode ? product.description : ""
  );
  const [published] = useState(isEditMode ? product.published : false);
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    isEditMode ? product.category.id.toString() : ""
  );
  const [selectedMainCategory, setSelectedMainCategory] = useState(
    isEditMode ? product.mainCategory.id.toString() : ""
  );
  const [featuredImage, setFeaturedImage] = useState(
    isEditMode
      ? `${import.meta.env.VITE_HOST_URL}/${product.featuredImage}`
      : undefined
  );
  const [featuredImageForBackend, setFeaturedImageForBackend] = useState(null);
  const [images, setImages] = useState(
    isEditMode
      ? product.images
          .split(",")
          .map((image) => `${import.meta.env.VITE_HOST_URL}/${image}`)
      : []
  );

  useEffect(() => {
    if (product && isEditMode) {
      setProductName(product.name);
      setProductQuantity(product.quantity.toString());
      setOutOfStock(product.outOfStock);
      setProductPrice(product.price);
      setDiscountPrice(product.discountPrice);
      setBrand(product.brand);
      setDescription(product.description);
      // setPublished(product.published);
      setSelectedCategory(product.category.id.toString());
      setSelectedMainCategory(product.mainCategory.id.toString());
      setFeaturedImage(
        `${import.meta.env.VITE_HOST_URL}/${product.featuredImage}`
      );
      setImages(
        product.images
          .split(",")
          .map((image) => `${import.meta.env.VITE_HOST_URL}/${image}`)
      );
    }
  }, [product, isEditMode]);

  const [imagesForBackend, setImagesForBackend] = useState([]);
  const [productNameError, setProductNameError] = useState(
    "Product name is required"
  );
  const [productQuantityError, setProductQuantityError] = useState(
    "Product quantity is required"
  );
  const [productPriceError, setProductPriceError] = useState(
    "Product price is required"
  );
  const [discountPriceError, setDiscountPriceError] = useState("");
  const [brandError, setBrandError] = useState("Brand is required");
  const [categoryError, setCategoryError] = useState("Category is required");
  const [mainCategoryError, setMainCategoryError] = useState(
    "Main category is required"
  );
  const [featuredImageError, setFeaturedImageError] = useState(
    "Featured image is required"
  );
  const [imagesError, setImagesError] = useState("Images are required");

  const fetchCategories = async (categoryId) => {
    const accessToken = localStorage.getItem("accessToken");
    await axios
      .get(
        `${
          import.meta.env.VITE_HOST_URL
        }/category/${categoryId}/all-sub-categories`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.statusCode === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          localStorage.removeItem("date");
          navigate.push("/login");
        }
      });
  };

  const fetchMainCategories = async () => {
    const accessToken = localStorage.getItem("accessToken");
    await axios
      .get(`${import.meta.env.VITE_HOST_URL}/category/all-main-categories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setMainCategories(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.statusCode === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          localStorage.removeItem("date");
          navigate.push("/login");
        }
      });
  };

  useEffect(() => {
    fetchCategories(selectedMainCategory);
  }, [selectedMainCategory]);

  useEffect(() => {
    fetchMainCategories();
  }, []);

  const handleMainCategoryChange = async (event) => {
    event.target.value
      ? setMainCategoryError("")
      : setMainCategoryError("Main category is required");
    setSelectedMainCategory(event.target.value);
  };

  const handleSubCategoryChange = async (event) => {
    event.target.value
      ? setCategoryError("")
      : setCategoryError("Category is required");
    setSelectedCategory(event.target.value);
  };

  const previewImage = (event, isFeaturedImage) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", (ev) => {
              resolve(ev.target.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        (images) => {
          if (isFeaturedImage) {
            setFeaturedImage(images[0]);
            setFeaturedImageForBackend(files[0]);
          } else {
            setImages(images);
            setImagesForBackend(files);
          }
        },
        (error) => console.error(error)
      );
    }
  };

  const editorRef = useRef(null);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !mainCategoryError &&
      !categoryError &&
      !featuredImageError &&
      !imagesError &&
      !productNameError &&
      !productQuantityError &&
      !productPriceError &&
      !discountPriceError &&
      !brandError
    ) {
      const formData = new FormData();
      formData.append("mainCategoryId", selectedMainCategory);
      formData.append("categoryId", selectedCategory);
      if (featuredImageForBackend)
        formData.append("featuredImage", featuredImageForBackend);
      formData.append("name", productName);
      formData.append("quantity", productQuantity);
      formData.append("outOfStock", String(outOfStock));
      formData.append("price", productPrice);
      if (discountPrice) formData.append("discountPrice", discountPrice);
      if (editorRef.current) {
        const desc = editorRef.current.getData();
        formData.append("description", desc);
      }
      formData.append("brand", brand);
      if (imagesForBackend.length)
        imagesForBackend.forEach((image) => {
          formData.append("images", image);
        });
      formData.append("published", String(published));
      if (isEditMode) {
        axios
          .put(
            `${import.meta.env.VITE_HOST_URL}/products/${productId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then(() => {
            console.log(formData);
            navigate("/profile#product");
            setLoading(false);
          })
          .catch((error) => {
            if (error.response?.data?.statusCode === 401) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("user");
              localStorage.removeItem("date");
              navigate.push("/login");
              setLoading(false);
            } else {
              alert(error.response?.data?.message);
              setLoading(false);
            }
          });
      } else {
        axios
          .post(`${import.meta.env.VITE_HOST_URL}/products`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then(() => {
            // window.location.reload();
            navigate("/profile#product");
            console.log(formData);
          })
          .catch((error) => {
            if (error.response?.data?.statusCode === 401) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("user");
              localStorage.removeItem("date");
              navigate.push("/login");
            } else {
              console.log(error);
              alert(error.response?.data?.message);
              setLoading(false);
            }
          });
      }
    }
  };

  return (
    <div>
      <h2 className="text-[18px] font-[600]">Create Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="productName">Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => {
              e.target.value.trim()
                ? setProductNameError("")
                : setProductNameError("Product name is required");
              setProductName(e.target.value);
            }}
            style={
              productNameError ? { border: "1px solid red", color: "red" } : {}
            }
            className="rounded h-[50px] pl-2 outline-none border border-gray-400"
          />
          {productNameError && (
            <span style={{ color: "red" }}>{productNameError}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="productQuantity">Quantity:</label>
          <input
            type="text"
            id="productQuantity"
            value={productQuantity}
            onChange={(e) => {
              e.target.value.trim()
                ? setProductQuantityError("")
                : setProductQuantityError("Product quantity is required");
              setProductQuantity(e.target.value);
            }}
            style={
              productQuantityError
                ? { border: "1px solid red", color: "red" }
                : {}
            }
            className="rounded h-[50px] pl-2 outline-none border border-gray-400"
          />
          {productQuantityError && (
            <span style={{ color: "red" }}>{productQuantityError}</span>
          )}
        </div>
        {/* <div className="flex  justify-between"> */}
        <div className="flex gap-2">
          <label>Out of Stock:</label>
          <input
            type="checkbox"
            name="outOfStock"
            checked={outOfStock}
            onChange={() => setOutOfStock(!outOfStock)}
          />
        </div>
        <div className="flex gap-2">
          <label>Published:</label>
          <input
            type="checkbox"
            name="published"
            checked={published}
            // onChange={() => setPublished(!published)}
          />
        </div>
        {/* </div> */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="productPrice">Price:</label>
            <input
              type="text"
              id="productPrice"
              value={productPrice}
              onChange={(e) => {
                e.target.value.trim()
                  ? setProductPriceError("")
                  : setProductPriceError("Product price is required");
                setProductPrice(e.target.value);
              }}
              style={
                productPriceError
                  ? { border: "1px solid red", color: "red" }
                  : {}
              }
              className="rounded h-[50px] pl-2 outline-none border border-gray-400"
            />
            {productPriceError && (
              <span style={{ color: "red" }}>{productPriceError}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="productPrice">Discount Price:</label>
            <input
              type="text"
              id="discountPrice"
              value={discountPrice}
              onChange={(e) => {
                setDiscountPrice(e.target.value);
              }}
              style={
                discountPriceError
                  ? { border: "1px solid red", color: "red" }
                  : {}
              }
              className="rounded h-[50px] pl-2 outline-none border border-gray-400"
            />
            {discountPriceError && (
              <span style={{ color: "red" }}>{discountPriceError}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium">Description:</label>
          <CustomEditor description={description} editorRef={editorRef} />
        </div>
        <div>
          <label htmlFor="mainCategory">Main Category:</label>
          <select
            id="state"
            value={selectedMainCategory}
            onChange={handleMainCategoryChange}
            style={
              mainCategoryError ? { border: "1px solid red", color: "red" } : {}
            }
          >
            <option value="">Select Main Category</option>
            {mainCategories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subCategory">Sub Category:</label>
          <select
            id="state"
            value={selectedCategory}
            onChange={handleSubCategoryChange}
            style={
              categoryError ? { border: "1px solid red", color: "red" } : {}
            }
          >
            <option value="">Select Sub Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => {
              e.target.value
                ? setBrandError("")
                : setBrandError("Brand is required");
              setBrand(e.target.value);
            }}
            style={brandError ? { border: "1px solid red", color: "red" } : {}}
            className="rounded h-[50px] pl-2 outline-none border border-gray-400"
          />
          {brandError && <span style={{ color: "red" }}>{brandError}</span>}
        </div>
        <div>
          <label htmlFor="featuredImage">Featured Image:</label>
          <input
            type="file"
            id="featuredImage"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            onChange={(e) => {
              !e.target.files || !e.target.files.length
                ? setFeaturedImageError("Featured image is required")
                : setFeaturedImageError("");
              previewImage(e, true);
            }}
            style={
              featuredImageError
                ? { border: "1px solid red", color: "red" }
                : {}
            }
          />
          {featuredImageError && (
            <span style={{ color: "red", display: "block" }}>
              {featuredImageError}
            </span>
          )}
          {featuredImage && (
            <img
              src={featuredImage}
              alt="Featured Image"
              style={{ maxHeight: "200px", marginTop: "1rem" }}
            />
          )}
        </div>
        <div>
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 10) {
                alert("You can only upload a maximum of 10 images");
                e.target.value = null;
                setLoading(false);
              } else {
                previewImage(e, false);
              }
              !e.target.files || !e.target.files.length || !e.target.value
                ? setImagesError("Images are required")
                : setImagesError("");
            }}
            style={imagesError ? { border: "1px solid red", color: "red" } : {}}
            multiple
          />
          {imagesError && (
            <span style={{ color: "red", display: "block" }}>
              {imagesError}
            </span>
          )}
          {images.length > 0 ? (
            images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Image ${idx}`}
                style={{ maxHeight: "200px", marginTop: "1rem" }}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center m-auto mt-4 rounded justify-center gap-3 bg-red-700 h-[60px] w-[250px] transform focus:scale-75 hover:scale-105 duration-500 text-white text-[16px]"
        >
          {loading ? (
            <RiLoader2Fill size={20} className="animate-spin" />
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateProductModal;
