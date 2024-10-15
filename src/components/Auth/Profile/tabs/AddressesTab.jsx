import React, { useEffect } from "react";
import { useAppContext } from "../../../../contexts";
import CustomModal from "../../../Modal/modal";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import LoadingSvg from "../../../Modal/LoadingSvg";
import { toast } from "react-toastify";
import { BsTrash3Fill } from "react-icons/bs";

export default function AddressesTab() {
  const { profile } = useAppContext();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [allStates, setAllStates] = React.useState(null);
  const [selectedID, setSelectedID] = React.useState(null);
  const [addressDefaultValues, setAddressDefaultValues] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedID(null);
    setAddressDefaultValues(null);
  };
  const handleOpenDeleteModal = () => setOpenDelete(true);

  const handleCloseDeleteModal = () => {
    setOpenDelete(false);
    setSelectedID(null);
  };
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_HOST_URL}/lists/states`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(async (response) => {
        setAllStates(response.data);
      })
      .catch((error) => {
        toast.error("Error updating profile, try again later!");
      });
  }, []);

  useEffect(() => {
    const selectedAddress = profile?.addresses.find(
      (address) => address.id === selectedID
    );

    setAddressDefaultValues(selectedAddress);
  }, [selectedID]);

  const [formData, setFormData] = React.useState({
    name: "",
    stateId: 0,
    street: "",
    houseNo: "",
    landmark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDeleteAddress = (e) => {
    axios
      .delete(
        `${import.meta.env.VITE_HOST_URL}/users/customer/address/${selectedID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(async (response) => {
        setLoading(false);
        toast.success("Address deleted successfully");
        setOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error deleting address, try again later!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (selectedID && addressDefaultValues) {
      axios
        .put(
          `${
            import.meta.env.VITE_HOST_URL
          }/users/customer/address/${selectedID}`,
          {
            name: formData.name || addressDefaultValues?.name,
            street: formData.street || addressDefaultValues?.street,
            houseNo: formData.houseNo || addressDefaultValues?.houseNo,
            landmark: formData.landmark || addressDefaultValues?.landmark,
            stateId:
              Number(formData.stateId) ||
              Number(addressDefaultValues?.state?.id),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(async (response) => {
          setLoading(false);
          toast.success("Address updated successfully");
          setOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error updating address, try again later!");
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_HOST_URL}/users/customer/address`,
          { ...formData, stateId: Number(formData.stateId) },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(async (response) => {
          setLoading(false);
          toast.success("New address created successfully");
          setOpen(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error creaating address, try again later!");
        });
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-[30px]">
        {profile?.addresses?.map((x) => (
          <div className="w-full bg-primarygray p-5 border" key={x.id}>
            <div className="flex justify-between items-center">
              <p className="title text-[22px] font-semibold">Address #{x.id}</p>
              <div className="flex gap-4 items-center">
                <FaEdit
                  size={22}
                  color="green"
                  className=" cursor-pointer"
                  onClick={() => {
                    handleOpen();
                    setSelectedID(x.id);
                  }}
                />
                <BsTrash3Fill
                  size={22}
                  color="#b91c1c"
                  className=" cursor-pointer"
                  onClick={() => {
                    handleOpenDeleteModal();
                    setSelectedID(x.id);
                  }}
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex my-3">
                <p className="text-base text-qgraytwo w-[90px] block line-clamp-1">
                  Name:
                </p>
                <span className="text-base text-qblack line-clamp-1 font-medium">
                  {" "}
                  {x.name || "-----"}
                </span>
              </div>
              <div className="flex my-3">
                <p className="text-base text-qgraytwo w-[90px] block line-clamp-1">
                  House no:
                </p>
                <span className="text-base text-qblack line-clamp-1 font-medium">
                  {" "}
                  {x.houseNo || "-----"}
                </span>
              </div>
              <div className="flex my-3">
                <p className="text-base text-qgraytwo w-[90px] block line-clamp-1">
                  Landmark:
                </p>
                <span className="text-base text-qblack line-clamp-1 font-medium">
                  {" "}
                  {x.landmark || "-----"}
                </span>
              </div>
              <div className="flex my-3">
                <p className="text-base text-qgraytwo w-[90px] block line-clamp-1">
                  Street:
                </p>
                <span className="text-base text-qblack line-clamp-1 font-medium">
                  {" "}
                  {x.street || "-----"}
                </span>
              </div>
              <div className="flex my-3">
                <p className="text-base text-qgraytwo w-[90px] block line-clamp-1">
                  State:
                </p>
                <span className="text-base text-qblack line-clamp-1 font-medium">
                  {" "}
                  {x.state?.name || "-----"}
                </span>
              </div>
              <p className=" float-end text-[#b91c1c] font-semibold">
                {x.isMainAddress ? "Main Address" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[180px] h-[50px] mt-4">
        <button
          type="button"
          onClick={() => {
            handleOpen();
            setSelectedID(null);
          }}
          className="yellow-btn"
        >
          <div className="w-full text-white text-sm font-semibold">
            Add New Address
          </div>
        </button>
      </div>
      <CustomModal open={open} handleClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Address Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                required
                onChange={handleChange}
                defaultValue={
                  addressDefaultValues?.name ? addressDefaultValues?.name : ""
                }
                placeholder="Address name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="houseNo"
              >
                House Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="houseNo"
                name="houseNo"
                type="number"
                required
                onChange={handleChange}
                defaultValue={
                  addressDefaultValues?.houseNo
                    ? addressDefaultValues?.houseNo
                    : ""
                }
                placeholder="House number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="street"
              >
                Street
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="street"
                required
                name="street"
                type="text"
                onChange={handleChange}
                defaultValue={
                  addressDefaultValues?.street
                    ? addressDefaultValues?.street
                    : ""
                }
                placeholder="street"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="landmark"
              >
                Nearest Landmark
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="landmark"
                name="landmark"
                type="text"
                onChange={handleChange}
                defaultValue={
                  addressDefaultValues?.landmark
                    ? addressDefaultValues?.landmark
                    : ""
                }
                placeholder="landmark"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="stateId"
              >
                State
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="stateId"
                id="stateId"
                value={
                  addressDefaultValues?.state?.id
                    ? addressDefaultValues?.state?.id
                    : ""
                }
                onChange={handleChange}
              >
                <option value="">Select...</option>
                {allStates &&
                  allStates?.map((state) => (
                    <option value={state.id}>{state.name}</option>
                  ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-[#b91c1c] hover:bg-[#b91c1c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {loading ? <LoadingSvg /> : selectedID ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </CustomModal>
      <CustomModal open={openDelete} handleClose={handleCloseDeleteModal}>
        <p className=" text-center text-lg font-semibold mt-5">
          {" "}
          Are you sure you want to delete this address?
        </p>
        <div className="flex gap-6 my-7">
          <button
            type="button"
            onClick={handleCloseDeleteModal}
            className="gray-btn-full "
          >
            <div className="w-full text-sm font-semibold p-4">NO</div>
          </button>
          <button
            type="button"
            onClick={handleDeleteAddress}
            className="yellow-btn"
          >
            <div className="w-full text-white text-sm font-semibold p-4">
              YES
            </div>
          </button>
        </div>
      </CustomModal>
    </>
  );
}
