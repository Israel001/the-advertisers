import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";
import CustomEditor from "./CustomEditor";

function EditProductModal() {
  const productId = localStorage.getItem("particularId");
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    discountPrice: "",
    description: "",
    quantity: 0,
    outOfStock: true,
    published: true,
    brand: "",
    category: { id: "" },
    mainCategory: { id: "" },
    images: "",
    featuredImage: "",
  });
  const [featuredImage, setFeaturedImage] = useState("");
  const [images, setImages] = useState([]);
  const [featuredImageForBackend, setFeaturedImageForBackend] = useState(null);
  const [imagesForBackend, setImagesForBackend] = useState([]);
  // const [mainCategories, setMainCategories] = useState([]);
  // const [subCategories, setSubCategories] = useState([]);

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
        const productData = response.data;
        setProduct(productData);
        setFeaturedImage(
          `${import.meta.env.VITE_HOST_URL}/${productData.featuredImage}`
        );
        setImages(
          productData.images
            .split(",")
            .map((image) => `${import.meta.env.VITE_HOST_URL}/${image}`)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // fetchMainCategories();
    getProduct();
  }, []);

  // const fetchMainCategories = async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   await axios
  //     .get(`${import.meta.env.VITE_HOST_URL}/category/all-main-categories`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       setMainCategories(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response?.data?.statusCode === 401) {
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("user");
  //         localStorage.removeItem("date");
  //         // navigate.push("/login");
  //       }
  //     });
  // };

  // const fetchSubCategories = async (categoryId) => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   await axios
  //     .get(
  //       `${
  //         import.meta.env.VITE_HOST_URL
  //       }/category/${categoryId}/all-sub-categories`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setSubCategories(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response?.data?.statusCode === 401) {
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("user");
  //         localStorage.removeItem("date");
  //       }
  //     });
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleMainCategoryChange = async (e) => {
  //   const selectedCategoryId = e.target.value;
  //   const selectedCategory = mainCategories.find(
  //     (category) => category.id === selectedCategoryId
  //   );

  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     mainCategory: { id: selectedCategoryId, name: selectedCategory?.name },
  //     category: { id: "" },
  //   }));
  //   await fetchSubCategories(selectedCategoryId);
  // };

  // const handleSubCategoryChange = (e) => {
  //   const selectedSubCategoryId = e.target.value;
  //   const selectedSubCategory = subCategories.find(
  //     (category) => category.id === selectedSubCategoryId
  //   );

  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     category: {
  //       id: selectedSubCategoryId,
  //       name: selectedSubCategory?.name,
  //     },
  //   }));
  // };

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
            const newImages = images.map((image, index) => ({
              src: image,
              file: files[index],
            }));
            setImages((prevImages) => [...prevImages, ...newImages]);
            setImagesForBackend((prevImages) => [...prevImages, ...files]);
          }
        },
        (error) => console.error(error)
      );
    }
  };
  const editorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("discountPrice", product.discountPrice);
    if (editorRef.current) {
      const desc = editorRef.current.getData();
      formData.append("description", desc);
    }
    formData.append("quantity", product.quantity);
    formData.append("outOfStock", product.outOfStock);
    formData.append("published", product.published);
    formData.append("brand", product.brand);
    formData.append("categoryId", product.category.id);
    formData.append("mainCategoryId", product.mainCategory.id);
    if (featuredImageForBackend)
      formData.append("featuredImage", featuredImageForBackend);
    imagesForBackend.forEach((image) => {
      formData.append("images", image);
    });

    axios
      .put(`${import.meta.env.VITE_HOST_URL}/products/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        // console.log(response.data);
        setLoading(false);
        // alert("Product updated");
        // navigate(`/profile#/view-product/${productId}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("error", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Discount Price
          </label>
          <input
            type="number"
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <CustomEditor
            description={product.description}
            editorRef={editorRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-700">
            Out of Stock
          </label>
          <input
            type="checkbox"
            name="outOfStock"
            checked={product.outOfStock}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className="mb-4 flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-700">Published</label>
          <input
            type="checkbox"
            name="published"
            checked={product.published}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        {/* <div className="flex flex-col gap-2">
          <label
            htmlFor="mainCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Main Category:
          </label>
          <select
            id="state"
            value={product.mainCategory.id}
            onChange={handleMainCategoryChange}
            className="h-[40px] w-full mt-1 rounded-md p-2 outline-none"
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
          <label
            htmlFor="subCategory"
            className="block text-sm py-3 font-medium text-gray-700"
          >
            Sub Category:
          </label>
          <select
            id="subCategory"
            value={product.category.id}
            onChange={handleSubCategoryChange}
            className="h-[40px] w-full mt-1 rounded-md p-2 outline-none"
          >
            <option value="">Select Sub Category</option>
            {subCategories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/gif,image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => previewImage(e, true)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {featuredImage && (
            <img
              src={featuredImage}
              alt="Featured Image"
              style={{ maxHeight: "200px", marginTop: "1rem" }}
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <input
            type="file"
            accept="image/gif,image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={(e) => previewImage(e, false)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {images.length > 0 &&
            images.map((image, idx) => (
              <img
                key={idx}
                src={image.src}
                alt={`Image ${idx}`}
                style={{ maxHeight: "200px", marginTop: "1rem" }}
              />
            ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center m-auto mt-4 rounded justify-center gap-3 bg-red-700 h-[60px] w-[250px] transform focus:scale-75 hover:scale-105 duration-500 text-white text-[16px]"
        >
          {loading ? (
            <RiLoader2Fill size={20} className="animate-spin" />
          ) : (
            "Update Product"
          )}
        </button>
      </form>
    </div>
  );
}

export default EditProductModal;
