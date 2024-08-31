import { useEffect, useState } from "react";
import datas from "../../data/products.json";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import ProductsAds from "./ProductsAds";
import axios from "axios";
import withDashboardContext2 from "../../hoc/withDashboardContext2";
import Display1 from "../../assets/images/display1.jpg";
import Display2 from "../../assets/images/display2.jpg";
import Display3 from "../../assets/images/display3.jpg";

function Home() {
  const { products } = datas;
  const brands = [];
  products.forEach((product) => {
    brands.push(product.brand);
  });

  const [topSellingProducts, setTopSellingProducts] = useState([]);
  // const

  useEffect(() => {
    fetchTopSellingProducts();
  }, []);

  const fetchTopSellingProducts = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/products/top-selling`
    );
    setTopSellingProducts(response.data);
  };

  return (
    <>
      <Layout>
        <div className="btn w-5 h-5 "></div>
        <Banner className="banner-wrapper mb-[60px]" />
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Top Selling Products"
          showViewMore={false}
        >
          <SectionStyleTwo products={topSellingProducts} />
        </ViewMoreTitle>
        {/* <ProductsAds
          ads={[
            `${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-1.png`,
            `${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-2.png`,
          ]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        /> */}
        <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Categories"
          showViewMore={false}
        >
          <BestSellers />
        </ViewMoreTitle>
        <div className="container-x mx-auto flex justify-center items-center my-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-3 place-content-center gap-3">
            <img src={Display1} alt="Show Image" className="w-full" />
            <img src={Display2} alt="Show Image" className="w-full" />
            <img src={Display3} alt="Show Image" className="w-full" />
          </div>
        </div>
        <SectionStyleOne
          categoryBackground={`${
            import.meta.env.VITE_PUBLIC_URL
          }/assets/images/section-category-2.jpg`}
          products={products.slice(4, products.length)}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
          showViewMore={false}
        />

        <SectionStyleThree
          products={products}
          sectionTitle="Explore your interests"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
          showViewMore={false}
        />
        <div className="best-services w-full bg-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10">
          <div className="item">
            <div className="flex space-x-5 items-center">
              <div>
                <span>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1H5.63636V24.1818H35"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M34.9982 1H11.8164V18H34.9982V1Z"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M11.8164 7.18164H34.9982"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                  Free Shipping
                </p>
                <p className="text-sm text-qgray">When ordering over $100</p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="flex space-x-5 items-center">
              <div>
                <span>
                  <svg
                    width="32"
                    height="34"
                    viewBox="0 0 32 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M30.7 2L29.5 10.85L20.5 9.65"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                  Free Return
                </p>
                <p className="text-sm text-qgray">Get Return within 30 days</p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="flex space-x-5 items-center">
              <div>
                <span>
                  <svg
                    width="32"
                    height="38"
                    viewBox="0 0 32 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                  Secure Payment
                </p>
                <p className="text-sm text-qgray">100% Secure Online Payment</p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="flex space-x-5 items-center">
              <div>
                <span>
                  <svg
                    width="32"
                    height="35"
                    viewBox="0 0 32 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M16 28V22"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
                      stroke="#b72323"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                  Best Quality
                </p>
                <p className="text-sm text-qgray">
                  Original Product Guarenteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default withDashboardContext2(Home);
