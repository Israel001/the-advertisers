import React, { useState } from "react";
import PasswordSvg from "./PasswordSvg";
import { FaEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import LoadingSvg from "../../../Modal/LoadingSvg";
import { toast } from "react-toastify";
import axios from "axios";

export default function PasswordTab() {
  const [oldPass, setOldPass] = useState("hide-password");
  const [newPass, setNewPass] = useState("hide-password");
  const [confirmPass, setConfirmPass] = useState("hide-password");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loading) {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      } else {
        setError("");
        setLoading(true);
        axios
          .post(
            `${import.meta.env.VITE_HOST_URL}/auth/change-password`,
            { newPassword: newPassword, oldPassword: oldPassword },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then(async (response) => {
            setLoading(false);
            toast.success("Password Changed successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.data?.statusCode) {
              return toast.error(
                "Provided old password is incorrect, try confirm and try again!"
              );
            }

            toast.error("Error changing password, try again later!");
          });
      }
    }
  };

  const showPassword = (value) => {
    const password = document.getElementById(`${value}`);
    if (value && value === "old_password") {
      if (password.type === "password") {
        password.type = "text";
        setOldPass("show-password");
      } else {
        password.type = "password";
        setOldPass("hide-password");
      }
    }
    if (value && value === "new_password") {
      if (password.type === "password") {
        password.type = "text";
        setNewPass("show-password");
      } else {
        password.type = "password";
        setNewPass("hide-password");
      }
    }
    if (value && value === "confirm_password") {
      if (password.type === "password") {
        password.type = "text";
        setConfirmPass("show-password");
      } else {
        password.type = "password";
        setConfirmPass("hide-password");
      }
    }
  };

  return (
    <div className="changePasswordTab w-full">
      <div className="w-full flex xl:flex-row flex-col-reverse space-x-5 xl:items-center">
        <div className="w-[397px] mb-10">
          <form onSubmit={handleSubmit}>
            <div className="input-field mb-6">
              <label
                className="input-label text-qgray text-sm block mb-2.5"
                htmlFor="old_password"
              >
                Old Password*
              </label>
              <div className="input-wrapper border border-[#E8E8E8] w-full  h-[58px] overflow-hidden relative ">
                <input
                  placeholder="● ● ● ● ● ●"
                  className="input-field placeholder:text-base text-bese px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none"
                  type="password"
                  required
                  id="old_password"
                  value={oldPassword}
                  onChange={(e) => handleChange(e, setOldPassword)}
                />
                <div
                  className="absolute right-6 bottom-[17px] z-10 cursor-pointer"
                  onClick={() => showPassword("old_password")}
                >
                  {oldPass === "show-password" ? (
                    <IoEye size={22} color={"#797979"} />
                  ) : (
                    <FaEyeSlash size={22} color={"#797979"} />
                  )}
                </div>
              </div>
            </div>
            <div className="input-field mb-6">
              <label
                className="input-label text-qgray text-sm block mb-2.5"
                htmlFor="old_password"
              >
                Password*
              </label>
              <div className="input-wrapper border border-[#E8E8E8] w-full  h-[58px] overflow-hidden relative ">
                <input
                  placeholder="● ● ● ● ● ●"
                  required
                  className="input-field placeholder:text-base text-bese px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none"
                  type="password"
                  id="new_password"
                  value={newPassword}
                  onChange={(e) => handleChange(e, setNewPassword)}
                />
                <div
                  className="absolute right-6 bottom-[17px] z-10 cursor-pointer"
                  onClick={() => showPassword("new_password")}
                >
                  {newPass === "show-password" ? (
                    <IoEye size={22} color={"#797979"} />
                  ) : (
                    <FaEyeSlash size={22} color={"#797979"} />
                  )}
                </div>
              </div>
            </div>
            <div className="input-field mb-6">
              <label
                className="input-label text-qgray text-sm block mb-2.5"
                htmlFor="old_password"
              >
                Re-enter Password*
              </label>
              <div className="input-wrapper border border-[#E8E8E8] w-full  h-[58px] overflow-hidden relative ">
                <input
                  placeholder="● ● ● ● ● ●"
                  required
                  className="input-field placeholder:text-base text-bese px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none"
                  type="password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => handleChange(e, setConfirmPassword)}
                />
                <div
                  className="absolute right-6 bottom-[17px] z-10 cursor-pointer"
                  onClick={() => showPassword("confirm_password")}
                >
                  {confirmPass === "show-password" ? (
                    <IoEye size={22} color={"#797979"} />
                  ) : (
                    <FaEyeSlash size={22} color={"#797979"} />
                  )}
                </div>
              </div>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}

            <div className="w-full mt-[30px] flex justify-start">
              <div className="sm:flex sm:space-x-[30px] items-center">
                <div className="w-[180px] h-[50px]">
                  <button type="submit" className="yellow-btn">
                    <div
                      className="w-full text-sm text-white font-semibold"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {loading ? <LoadingSvg /> : "Update Password"}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 sm:flex hidden justify-end">
          <PasswordSvg />
        </div>
      </div>
    </div>
  );
}
