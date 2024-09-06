import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BestSellers({ className }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!categories.length) fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/products/random-categories`
    );
    setCategories(response.data);
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 xl:gap-[30px] gap-5">
        {categories.map((category) => {
          return (
            <Link
              data-aos="fade-left"
              data-aos-duration="500"
              className="item w-full flex flex-col items-center"
              key={category?.id}
              to={`/all-products?subCategoryId=${category.id}`}
            >
              <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
                <img
                  src={`${import.meta.env.VITE_HOST_URL}/${
                    category?.featured_image
                  }`}
                  alt=""
                />
              </div>
              <div>
                <p className="text-base font-500 text-center">
                  {category.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
