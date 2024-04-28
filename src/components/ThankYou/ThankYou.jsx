import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Partials/Layout";

function ThankYou() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full text-center justify-center items-center col lg:space-x-[30px]">
              <p className="text-6xl font-bold pt-9">Thank You !</p>
              <p className="text-gray-500 my-2">
                Thank you for placing an order. The processing of your order
                will begin shortly!
              </p>
              <div className=" flex justify-center items-center">
                <img src="/src/assets/images/checkmark.jpg" width={180} />
              </div>
              <div className=" flex justify-center items-center">
                <Link to="/profile#order">
                  <p className="bg-red-700 text-white p-4 font-semibold rounded-lg">
                    View Order Details
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ThankYou;
