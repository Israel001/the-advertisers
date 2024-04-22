import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import withDashboardContext from "../../hoc/withDashboardContext";
import { useAppContext } from "../../contexts";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import axios from "axios";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";

function CheakoutPage() {
  const { profile, cart, clearCart } = useAppContext();
  const [shippingAddress, setShippingAddressg] = useState(
    profile?.addresses[0]?.address
  );
  const [reference, setReference] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [selectedShippingType, setSelectedShippingType] =
    useState("free_shipping");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectedShipping(parseInt(e.target.value));
    setSelectedShippingType(e.target.name);
  };
  const config = {
    email: profile?.email,
    publicKey: import.meta.env.VITE_PAYSTACK_KEY,
    metadata: {
      address: shippingAddress,
      phone: profile?.phone,
    },
    amount:
      (profile?.cart?.reduce((prev, cur) => prev + cur.total, 0) +
        selectedShipping) *
      100,
  };

  const verifyPayment = (reference) => {
    setLoading(true);
    axios
      .post(
        `${
          import.meta.env.VITE_HOST_URL
        }/order/verify-transaction/${reference}`,
        {
          amount:
            profile?.cart?.reduce((prev, cur) => prev + cur.total, 0) +
            selectedShipping,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        axios
          .post(
            `${import.meta.env.VITE_HOST_URL}/order`,
            {
              details: JSON.stringify({
                cart: profile?.cart,
                personalDetails: {
                  full_name: profile?.fullname,
                  email: profile?.email,
                  phone: profile?.phone,
                  address: shippingAddress,
                },
                shipping: {
                  type: selectedShippingType,
                  amount: selectedShipping,
                },
              }),
              paymentId: Number(response?.data.id),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then(async () => {
            setLoading(false);
            clearCart().then(() => navigate("/profile#order"));
          })
          .catch((error) => {
            setLoading(false);
            toast.error("Error completing order, try again later!");
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error completing payment, try again later!");
      });
  };

  const onSuccess = ({ reference }) => {
    setReference(reference);
    verifyPayment(reference);
  };

  const onClose = () => {
    toast.error("Your payment was unsuccessful, try again later!");
  };

  const initializePayment = usePaystackPayment(config);

  if (loading) {
    return <LoaderStyleOne />;
  }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Checkout"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "checkout", path: "/checkout" },
            ]}
          />
        </div>
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Personal Details
                </h1>
                <span className="text-xs mb-5 block">
                  To edit or change your information, kindly{" "}
                  <Link to="/profile">
                    <span className="underline">click here</span>
                  </Link>
                </span>
                <div className="form-area">
                  <form>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0">
                        <InputCom
                          label="First Name*"
                          placeholder="Demo Name"
                          value={profile?.fullName.split(" ")[0]}
                          inputClasses="w-full h-[50px]"
                          disable
                        />
                      </div>
                      <div className="flex-1">
                        <InputCom
                          label="Last Name*"
                          placeholder="Last Name"
                          value={profile?.fullName.split(" ")[1]}
                          inputClasses="w-full h-[50px]"
                          disable
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5 items-center mb-6">
                      <div className="w-1/2">
                        <InputCom
                          label="Email Address*"
                          placeholder="demoemial@gmail.com"
                          inputClasses="w-full h-[50px]"
                          value={profile?.email}
                          disable
                        />
                      </div>
                      <div className="flex-1">
                        <InputCom
                          label="Phone Number*"
                          value={profile?.phone}
                          placeholder="012 3  *******"
                          inputClasses="w-full h-[50px]"
                          disable
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Address{" "}
                      </h1>
                      <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                        <select
                          style={{ outline: "none", width: "100%" }}
                          onChange={(event) => {
                            event.target.value
                              ? setShippingAddressg("")
                              : setShippingAddressg(
                                  "Shipping address is required"
                                );
                            setShippingAddressg(event.target.value);
                          }}
                        >
                          <option value="">
                            {profile?.addresses[0]?.address || "Choose address"}
                          </option>
                          {profile?.addresses.slice(1).map((state) => {
                            return (
                              <option value={state.id} key={state.id}>
                                {state.address}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Order Summary
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        product
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        total
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    <ul className="flex flex-col space-y-5">
                      {profile?.cart?.map((x) => (
                        <li>
                          <div className="flex justify-between items-center gap-14">
                            <div>
                              <h4 className="text-[15px] text-qblack mb-2.5">
                                {x?.name}
                                <sup className="text-[13px] text-qgray ml-2 mt-2">
                                  x{x.quantity}
                                </sup>
                              </h4>
                              {/* <p className="text-[13px] text-qgray">
                                64GB, Black, 44mm, Chain Belt
                              </p> */}
                            </div>
                            <div>
                              <span className="text-[15px] text-qblack font-medium">
                                N{x.price}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        SUBTOTAL
                      </p>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        N
                        {profile?.cart?.reduce(
                          (prev, cur) => prev + cur.total,
                          0
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="w-full mt-[30px]">
                    <div className="sub-total mb-6">
                      <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                        Shipping
                      </span>
                      <form>
                        <ul className="flex flex-col space-y-1">
                          <li>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-2.5 items-center">
                                <div className="input-radio">
                                  <input
                                    type="radio"
                                    name="free_shipping"
                                    value={0}
                                    className="accent-pink-500"
                                    onChange={handleChange}
                                    checked={selectedShipping === 0}
                                  />
                                </div>
                                <span className="text-[13px] text-normal text-qgraytwo">
                                  Free Shipping
                                </span>
                              </div>
                              <span className="text-[13px] text-normal text-qgraytwo">
                                +N00.00
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-2.5 items-center">
                                <div className="input-radio">
                                  <input
                                    type="radio"
                                    name="flat_rate"
                                    value={1000}
                                    onChange={handleChange}
                                    className="accent-pink-500"
                                    checked={selectedShipping === 1000}
                                  />
                                </div>
                                <span className="text-[13px] text-normal text-qgraytwo">
                                  Flat Rate
                                </span>
                              </div>
                              <span className="text-[13px] text-normal text-qgraytwo">
                                +N1000.00
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-2.5 items-center">
                                <div className="input-radio">
                                  <input
                                    type="radio"
                                    name="local_delivery"
                                    value={800}
                                    onChange={handleChange}
                                    className="accent-pink-500"
                                    checked={selectedShipping === 800}
                                  />
                                </div>
                                <span className="text-[13px] text-normal text-qgraytwo">
                                  Local Delivery
                                </span>
                              </div>
                              <span className="text-[13px] text-normal text-qgraytwo">
                                +N800.00
                              </span>
                            </div>
                          </li>
                        </ul>
                      </form>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">Total</p>
                      <p className="text-2xl font-medium text-qred">
                        N
                        {profile?.cart?.reduce(
                          (prev, cur) => prev + cur.total,
                          0
                        ) + selectedShipping}
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-[50px] black-btn flex justify-center items-center">
                    <button
                      onClick={() => {
                        initializePayment({
                          onSuccess,
                          onClose,
                        });
                      }}
                    >
                      <span className="text-sm font-semibold">
                        Place Order Now
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withDashboardContext(CheakoutPage);
