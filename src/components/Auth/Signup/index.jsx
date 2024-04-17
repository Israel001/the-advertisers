/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import InputCom from "../../Helpers/InputCom";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { Link, useNavigate } from "react-router-dom";
import withLoginContext from "../../../hoc/withLoginContext";
import axios from "axios";
import { useAppContext } from "../../../contexts";

function Signup() {
  const [checked, setValue] = useState(false);
  const rememberMe = () => {
    setValue(!checked);
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedState, setSelectedState] = useState();
  const [street, setStreet] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [states, setStates] = useState([]);

  const [fullnameError, setFullnameError] = useState("Full name is required");
  const [emailError, setEmailError] = useState("Email is required");
  const [phoneError, setPhoneError] = useState("Phone is required");
  const [selectedStateError, setSelectedStateError] =
    useState("State is required");
  const [streetError, setStreetError] = useState("Street is required");
  const [passwordError, setPasswordError] = useState("Password is required");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setConfirmPasswordError("Passwords do not match");
    } else {
      password
        ? setPasswordError("")
        : setPasswordError("Password is required");
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const fetchStates = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/lists/states`
    );
    setStates(response.data);
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const { setIsLoggedIn } = useAppContext();

  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    if (
      !fullnameError &&
      !emailError &&
      !phoneError &&
      !selectedStateError &&
      !streetError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      if (!checked) {
        alert("You must accept all terms and conditions");
      } else {
        axios
          .post(`${import.meta.env.VITE_HOST_URL}/users/customer`, {
            fullName: fullname,
            phone,
            email,
            stateId: +selectedState,
            street,
            houseNo,
            landmark,
            password,
          })
          .then(() => {
            return axios.post(`${import.meta.env.VITE_HOST_URL}/auth/login`, {
              emailOrPhone: email,
              password,
              type: "CUSTOMER",
            });
          })
          .then((response) => {
            localStorage.setItem("accessToken", response?.data?.accessToken);
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            localStorage.setItem("date", new Date().getTime().toString());
            setIsLoggedIn(true);
            navigate("/");
          })
          .catch((error) => {
            alert(error.response?.data?.message);
          });
      }
    }
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[900px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Create Account
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Your full name here"
                      label="Fullname*"
                      name="fullname"
                      type="text"
                      inputClasses="h-[50px]"
                      inputHandler={(event) => {
                        event.target.value.trim()
                          ? setFullnameError("")
                          : setFullnameError("Full name is required");
                        setFullname(event.target.value);
                      }}
                      style={
                        fullnameError
                          ? { border: "1px solid red", color: "red" }
                          : {}
                      }
                    />
                    {fullnameError && (
                      <span style={{ color: "red" }}>{fullnameError}</span>
                    )}
                  </div>

                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                    <InputCom
                      placeholder="Demo@gmail.com"
                      label="Email Address*"
                      name="email"
                      type="email"
                      inputClasses="h-[50px]"
                      inputHandler={(event) => {
                        event.target.value
                          ? /^\S+@\S+\.\S+$/.test(event.target.value)
                            ? setEmailError("")
                            : setEmailError("Invalid email")
                          : setEmailError("Email is required");
                        setEmail(event.target.value);
                      }}
                      style={
                        emailError
                          ? { border: "1px solid red", color: "red" }
                          : {}
                      }
                      children={
                        emailError && (
                          <span style={{ color: "red" }}>{emailError}</span>
                        )
                      }
                    />

                    <InputCom
                      placeholder="E.g. 08032213090"
                      label="Phone*"
                      name="phone"
                      type="text"
                      inputClasses="h-[50px]"
                      inputHandler={(event) => {
                        event.target.value
                          ? event.target.value.trim().length === 11
                            ? setPhoneError("")
                            : setPhoneError("Invalid phone number")
                          : setPhoneError("Phone number is required");
                        setPhone(event.target.value);
                      }}
                      style={
                        phoneError
                          ? { border: "1px solid red", color: "red" }
                          : {}
                      }
                      children={
                        phoneError && (
                          <span style={{ color: "red" }}>{phoneError}</span>
                        )
                      }
                    />
                  </div>

                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                    <div className="w-full">
                      <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                        State
                      </h6>
                      <div
                        className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2"
                        style={
                          selectedStateError
                            ? { border: "1px solid red", color: "red" }
                            : {}
                        }
                      >
                        <select
                          style={{ outline: "none", width: "100%" }}
                          onChange={(event) => {
                            event.target.value
                              ? setSelectedStateError("")
                              : setSelectedStateError("State is required");
                            setSelectedState(event.target.value);
                          }}
                        >
                          <option value="">Choose state</option>
                          {states.map((state) => {
                            return (
                              <option value={state.id} key={state.id}>
                                {state.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {selectedStateError && (
                        <span style={{ color: "red" }}>
                          {selectedStateError}
                        </span>
                      )}
                    </div>
                    {/* <div className="w-1/2">
                      <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                        LGA
                      </h6>
                      <div
                        className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2"
                        style={
                          selectedLgaError
                            ? { border: "1px solid red", color: "red" }
                            : {}
                        }
                      >
                        <span className="text-[13px] text-qgraytwo">
                          Maiyami
                        </span>
                        <span>
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                              fill="#222222"
                            />
                          </svg>
                        </span>
                        <select
                          style={{ outline: "none" }}
                          onChange={(event) => {
                            event.target.value
                              ? setSelectedLgaError("")
                              : setSelectedLgaError("LGA is required");
                            setSelectedLga(event.target.value);
                          }}
                        >
                          <option value="">Choose LGA</option>
                        </select>
                      </div>
                      {selectedLgaError && (
                        <span style={{ color: "red" }}>{selectedLgaError}</span>
                      )}
                    </div> */}
                  </div>

                  {/* <div className="input-item mb-5">
                    <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                      Country*
                    </h6>
                    <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                      <span className="text-[13px] text-qgraytwo">
                        Select Country
                      </span>
                      <span>
                        <svg
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                            fill="#222222"
                          />
                        </svg>
                      </span>
                    </div>
                  </div> */}

                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Your street here"
                      label="Street*"
                      name="street"
                      type="text"
                      inputClasses="h-[50px]"
                      inputHandler={(event) => {
                        event.target.value.trim()
                          ? setStreetError("")
                          : setStreetError("Street is required");
                        setStreet(event.target.value.trim());
                      }}
                      style={
                        streetError
                          ? { border: "1px solid red", color: "red" }
                          : {}
                      }
                      children={
                        streetError && (
                          <span style={{ color: "red" }}>{streetError}</span>
                        )
                      }
                    />
                  </div>

                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                    <InputCom
                      placeholder="Your House No Here"
                      label="House No*"
                      name="houseNo"
                      type="text"
                      inputClasses="h-[50px]"
                      inputHandler={(event) => {
                        setHouseNo(event.target.value.trim());
                      }}
                    />

                    <InputCom
                      placeholder="Your Landmark Here"
                      label="Landmark"
                      name="landmark"
                      type="text"
                      inputClasses="h-[50px]"
                      inputHandler={(event) => {
                        setLandmark(event.target.value);
                      }}
                    />
                  </div>

                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                    <InputCom
                      placeholder="Your password here"
                      label="Password*"
                      name="password"
                      type="password"
                      inputClasses="h-[50px]"
                      inputHandler={(event) => {
                        if (event.target.value.trim()) {
                          setPasswordError("");
                          setConfirmPasswordError("");
                        } else {
                          setPasswordError("Password is required");
                        }
                        setPassword(event.target.value.trim());
                      }}
                      style={
                        passwordError
                          ? { border: "1px solid red", color: "red" }
                          : {}
                      }
                      children={
                        passwordError && (
                          <span style={{ color: "red" }}>{passwordError}</span>
                        )
                      }
                    />

                    <InputCom
                      placeholder="Re-type your password here"
                      label="Confirm password*"
                      name="confirmPassword"
                      type="password"
                      inputClasses="h-[50px]"
                      inputHandler={(event) => {
                        setConfirmPassword(event.target.value.trim());
                      }}
                      style={
                        confirmPasswordError
                          ? { border: "1px solid red", color: "red" }
                          : {}
                      }
                      children={
                        confirmPasswordError && (
                          <span style={{ color: "red" }}>
                            {confirmPasswordError}
                          </span>
                        )
                      }
                    />
                  </div>

                  <div className="forgot-password-area mb-7">
                    <div className="remember-checkbox flex items-center space-x-2.5">
                      <button
                        onClick={rememberMe}
                        type="button"
                        className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                      >
                        {checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <span
                        onClick={rememberMe}
                        className="text-base text-black"
                      >
                        I agree to all
                        <span className="text-qblack">
                          {" "}
                          terms and conditions{" "}
                        </span>
                        in The-advertisers.
                      </span>
                    </div>
                  </div>
                  <div className="signin-area mb-3">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="black-btn text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        onClick={handleSignup}
                      >
                        <span>Create Account</span>
                      </button>
                    </div>
                  </div>

                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Already have an Account?
                      <Link to="/login" className="ml-2 text-qblack">
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withLoginContext(Signup);
