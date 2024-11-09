// CustomModal.jsx
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaTimes } from "react-icons/fa";
import OtpInput from "./OtpInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: "14px 34px 34px 34px",
  outline: "none",
  height: "250px",
  width: "350px",
  overflow: "scroll",
  "::-webkit-scrollbar": {
    display: "none",
  },
};

export default function CustomModal({
  open,
  handleClose,
  onVerify,
  resendOtp,
}) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="w-[350px] sm:w-[600px]" sx={style}>
        <div className="flex justify-end">
          <FaTimes
            onClick={handleClose}
            size={22}
            color="red"
            className="cursor-pointer"
          />
        </div>
        <OtpInput onVerify={onVerify} resendOtp={resendOtp} />
      </Box>
    </Modal>
  );
}
