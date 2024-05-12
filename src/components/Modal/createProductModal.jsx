import { useState } from "react";
import axios from "axios";
import { RiLoader2Fill } from "react-icons/ri";

function CreateProductModal() {
  const [productData, setProductData] = useState({
    name: "",
    quantity: null,
    outOfStock: true,
    published: true,
    price: null,
    discountPrice: null,
    description: "",
    attributes: "",
    categoryId: null,
    mainCategoryId: null,
    brand: "",
    featuredImage: "",
    images: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }
      formData.append("featuredImage", selectedFile);

      console.log("Data being sent:", formData);

      const response = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Product created:", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Error creating product. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-[18px] font-[600]">Create Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="border border-gray-400 pl-3 h-[40px] outline-none rounded"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            className="border border-gray-400 pl-3 h-[40px] outline-none rounded"
            required
          />
        </div>
        <div className="flex  justify-between">
          <div className="flex gap-2">
            <label>Out of Stock:</label>
            <input
              type="checkbox"
              name="outOfStock"
              checked={productData.outOfStock}
              onChange={(e) =>
                setProductData((prevData) => ({
                  ...prevData,
                  outOfStock: e.target.checked,
                }))
              }
            />
          </div>
          <div className="flex gap-2">
            <label>Published:</label>
            <input
              type="checkbox"
              name="published"
              checked={productData.published}
              onChange={(e) =>
                setProductData((prevData) => ({
                  ...prevData,
                  published: e.target.checked,
                }))
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between">
          <div className="flex flex-col gap-2">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="border w-[100%] border-gray-400 pl-3 h-[40px] outline-none rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Discount Price:</label>
            <input
              type="number"
              name="discountPrice"
              value={productData.discountPrice}
              onChange={handleChange}
              className="border w-[100%] border-gray-400 pl-3 h-[40px] outline-none rounded"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium">Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            className="border w-[100%] border-gray-400 pl-3 h-[60px] outline-none rounded"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium">Attributes:</label>
          <input
            type="text"
            name="attributes"
            value={productData.attributes}
            onChange={handleChange}
            className="border w-[100%] border-gray-400 pl-3 h-[40px] outline-none rounded"
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="number"
            name="categoryId"
            value={productData.categoryId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Main Category ID:</label>
          <input
            type="number"
            name="mainCategoryId"
            value={productData.mainCategoryId}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium">Brand:</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="border w-[100%] border-gray-400 pl-3 h-[40px] outline-none rounded"
            required
          />
        </div>
        <div>
          <label>Featured Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                images: e.target.files,
              }))
            }
          />
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
        <p className="text-center">{error && <p>{error}</p>}</p>
      </form>
    </div>
  );
}

export default CreateProductModal;
