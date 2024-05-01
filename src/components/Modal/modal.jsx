import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaTimes } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: "14px 34px 34px 34px",
  outline:"none"
};

export default function CustomModal({ open, handleClose, children }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-end">
            {" "}
            <FaTimes
              onClick={handleClose}
              size={22}
              color="red"
              className=" cursor-pointer"
            />
          </div>
          <Box>{children}</Box>
        </Box>
      </Modal>
    </div>
  );
}