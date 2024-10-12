/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import { useRef, useState, useEffect } from "react";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../contexts";
import withLoginContext from "../../hoc/withLoginContext";

function BecomeSaller() {
  const [profileImg, setProfileImg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  // logo img
  const logoImgInput = useRef(null);
  const browseLogoImg = () => {
    logoImgInput.current.click();
  };
  const logoImgChangHandler = (e) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setLogoImg(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]);
    }
  };
  // profile img
  const profileImgInput = useRef(null);
  const browseProfileImg = () => {
    profileImgInput.current.click();
  };
  const profileImgChangHandler = (e) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setProfileImg(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]);
    }
  };
  // cover img
  const coverImgInput = useRef(null);
  const browseCoverImg = () => {
    coverImgInput.current.click();
  };
  const coverImgChangHandler = (e) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setCoverImg(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]);
    }
  };

  const [checked, setValue] = useState(false);
  const rememberMe = () => {
    setValue(!checked);
  };

  const [fullname, setFullname] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedState, setSelectedState] = useState();
  const [states, setStates] = useState([]);
  const [street, setStreet] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullnameError, setFullnameError] = useState("Full name is required");
  const [storeNameError, setStoreNameError] = useState(
    "Store name is required"
  );
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
      !storeNameError &&
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
          .post(`${import.meta.env.VITE_HOST_URL}/users/store`, {
            storeName,
            contactName: fullname,
            contactPhone: phone,
            contactEmail: email,
            password,
            stateId: +selectedState,
            street,
            houseNo,
            landmark,
          })
          .then(() => {
            return axios.post(`${import.meta.env.VITE_HOST_URL}/auth/login`, {
              emailOrPhone: email,
              password,
              type: "STORE",
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
      <div className="become-saller-wrapper w-full">
        <div className="title mb-10">
          <PageTitle
            title="Seller Application"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "Become Saller", path: "/become-saller" },
            ]}
          />
        </div>
        <div className="content-wrapper w-full mb-10">
          <div className="container-x mx-auto">
            <div className="w-full bg-white sm:p-[30px] p-3">
              <div className="flex xl:flex-row flex-col-reverse xl:space-x-11">
                <div className="w-full">
                  <div className="title w-full mb-4">
                    <h1 className="text-[22px] font-semibold text-qblack mb-1">
                      Seller Information
                    </h1>
                    <p className="text-[15px] text-qgraytwo">
                      Fill the form below to create a new store account
                    </p>
                  </div>
                  <div className="input-area w-full">
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
                  </div>

                  {/* ============================================================== */}
                  <div className="title w-full mb-4">
                    <h1 className="text-[22px] font-semibold text-qblack mb-1">
                      Shop Information
                    </h1>
                    <p className="text-[15px] text-qgraytwo">
                      Fill the form below or write us .We will help you as soon
                      as possible.
                    </p>
                  </div>
                  <div className="input-area">
                    <div className="mb-5">
                      <InputCom
                        placeholder="Your shop name here"
                        label="Shop Name*"
                        name="shopname"
                        type="text"
                        inputClasses="h-[50px]"
                        inputHandler={(event) => {
                          event.target.value.trim()
                            ? setStoreNameError("")
                            : setStoreNameError("Full name is required");
                          setStoreName(event.target.value);
                        }}
                        style={
                          storeNameError
                            ? { border: "1px solid red", color: "red" }
                            : {}
                        }
                      />
                      {storeNameError && (
                        <span style={{ color: "red" }}>{storeNameError}</span>
                      )}
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
                    </div>

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
                        label="House No"
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
                            <span style={{ color: "red" }}>
                              {passwordError}
                            </span>
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
                          className="black-btn text-sm text-white w-[490px] h-[50px] font-semibold flex justify-center bg-purple items-center"
                          onClick={handleSignup}
                        >
                          <span>Create Seller Account</span>
                        </button>
                      </div>
                    </div>

                    <div className="signup-area flex justify-center">
                      <p className="text-sm text-qgraytwo font-normal">
                        Alrady have an Account?
                        <Link to="/login" className="ml-2 text-qblack">
                          Log In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="flex-1 mb-10 xl:mb-0">
                  <div className="update-profile w-full mb-9">
                    <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                      Update Profile
                      <span className="ml-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                            fill="#374557"
                            fillOpacity="0.6"
                          />
                        </svg>
                      </span>
                    </h1>
                    <p className="text-sm text-qgraytwo mb-5">
                      Profile of at least Size
                      <span className="ml-1 text-qblack">300x300</span>. Gifs
                      work too.
                      <span className="ml-1 text-qblack">Max 5mb</span>.
                    </p>
                    <div className="flex xl:justify-center justify-start">
                      <div className="relative">
                        <img
                          src={
                            profileImg ||
                            `${
                              import.meta.env.VITE_PUBLIC_URL
                            }/assets/images/edit-profileimg.jpg`
                          }
                          alt=""
                          className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden object-cover"
                        />
                        <input
                          ref={profileImgInput}
                          onChange={(e) => profileImgChangHandler(e)}
                          type="file"
                          className="hidden"
                        />
                        <div
                          onClick={browseProfileImg}
                          className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px]  hover:bg-[#F539F8] bg-[#F539F8] rounded-full cursor-pointer"
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                              fill="white"
                            />
                            <path
                              d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="update-logo w-full mb-9">
                    <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                      Update Logo
                      <span className="ml-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                            fill="#374557"
                            fillOpacity="0.6"
                          />
                        </svg>
                      </span>
                    </h1>
                    <p className="text-sm text-qgraytwo mb-5">
                      Profile of at least Size
                      <span className="ml-1 text-qblack">300x300</span>. Gifs
                      work too.
                      <span className="ml-1 text-qblack">Max 5mb</span>.
                    </p>
                    <div className="flex xl:justify-center justify-start">
                      <div className="relative">
                        <img
                          src={
                            logoImg ||
                            `${
                              import.meta.env.VITE_PUBLIC_URL
                            }/assets/images/edit-logoimg.jpg`
                          }
                          alt=""
                          className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden object-cover"
                        />
                        <input
                          ref={logoImgInput}
                          onChange={(e) => logoImgChangHandler(e)}
                          type="file"
                          className="hidden"
                        />
                        <div
                          onClick={browseLogoImg}
                          className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px]  hover:bg-[#F539F8] bg-[#F539F8] rounded-full cursor-pointer"
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                              fill="white"
                            />
                            <path
                              d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="update-cover w-full">
                    <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                      Update Cover
                      <span className="ml-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                            fill="#374557"
                            fillOpacity="0.6"
                          />
                        </svg>
                      </span>
                    </h1>
                    <p className="text-sm text-qgraytwo mb-5">
                      Cover of at least Size
                      <span className="ml-1 text-qblack">1170x920</span>.
                    </p>
                    <div className="flex justify-center">
                      <div className="w-full relative">
                        <img
                          src={
                            coverImg ||
                            `${
                              import.meta.env.VITE_PUBLIC_URL
                            }/assets/images/edit-coverimg.jpg`
                          }
                          alt=""
                          className="w-full h-[120px] rounded-lg overflow-hidden object-cover"
                        />
                        <input
                          ref={coverImgInput}
                          onChange={(e) => coverImgChangHandler(e)}
                          type="file"
                          className="hidden"
                        />
                        <div
                          onClick={browseCoverImg}
                          className="w-[32px] h-[32px] absolute -bottom-4 right-4 bg-[#F539F8] hover:bg-[#F539F8] rounded-full cursor-pointer"
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                              fill="white"
                            />
                            <path
                              d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withLoginContext(BecomeSaller);
