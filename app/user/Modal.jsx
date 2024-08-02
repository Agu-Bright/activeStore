import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius, color, minHeight } from "@mui/system";
import { Avatar, Divider, Stack } from "@mui/material";
import { RestaurantContext } from "@context/RestaurantContext";

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
  const { activeLog } = React.useContext(RestaurantContext);
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
          <Typography sx={{ color: "white", fontSize: "1.5em" }}>
            Order Details
          </Typography>
          <Stack spacing={10} direction="row" alignItems="start">
            <Avatar
              src={`/img/${activeLog?.social}.png`}
              alt="social"
              sx={{ borderRadius: "1px", width: 56, height: 56 }}
            />
            <Stack direction="column">
              <div style={{ color: "white" }}>{activeLog?.description}</div>
              <Typography sx={{ color: "gray" }}>
                The account format includes username, password, email and email
                password
              </Typography>
            </Stack>
          </Stack>
          <Divider
            sx={{ color: "white", borderColor: "#878383", margin: "20px 0px" }}
          />
        </Box>
      </Modal>
    </div>
  );
}
