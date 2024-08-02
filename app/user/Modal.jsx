import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius, color, minHeight } from "@mui/system";
import { Avatar, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  minHeight: 300,
  bgcolor: "background.paper",
  border: "0.1px solid #dcd8d8",
  borderRadius: "10px",
  p: 4,
  background: "rgba(0, 0, 0, 0.85)",
};

export default function BasicModal({ open, setOpen, handleClose }) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "white" }}
          >
            Buy Log{" "}
          </Typography>
          <Typography sx={{ color: "white" }}>
            You are about to order
          </Typography>
          <Divider
            sx={{ color: "white", borderColor: "#878383", margin: "20px 0px" }}
          />
          <Typography sx={{ color: "white" }}>Order Details</Typography>
          <div>
            <Avatar src="/img/facebook.png" />
            <div>the description</div>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
