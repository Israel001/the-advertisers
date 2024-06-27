import React from "react";
import Layout from "../../Partials/Layout";
import InputCom from "../../Helpers/InputCom";

const ForgotPassword = () => {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Reset Password
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="172"
                      height="29"
                      viewBox="0 0 172 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                        stroke="#FFBB38"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <form>
                    <InputCom
                      label={`Email Address:`}
                      inputClasses={`h-[70px]`}
                      type="email"
                      placeholder="Enter your email"
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit">Send OTP</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
