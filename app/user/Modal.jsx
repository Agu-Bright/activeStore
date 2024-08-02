import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius, color, minHeight } from "@mui/system";
import { Avatar, Divider, IconButton, Stack } from "@mui/material";
import { RestaurantContext } from "@context/RestaurantContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const style = {
  position: "absolute",
  top: "32%",
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
  const { activeLog, formatMoney } = React.useContext(RestaurantContext);
  const [count, setCount] = React.useState(1);
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
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <IconButton sx={{ border: "1px solid gray", margin: "0px 10px" }}>
                <RemoveIcon sx={{ color: "white" }} />
              </IconButton>{" "}
              <div
                style={{
                  border: "0.1px solid gray",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                }}
              >
                {count}
              </div>
              <IconButton sx={{ border: "1px solid gray", margin: "0px 10px" }}>
                <AddIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "white", textAlign: "center" }}>
                {formatMoney(activeLog?.price)}
              </Typography>
            </Box>
          </Stack>
          <button
            style={{
              border: "none",
              color: "white",
              fontWeight: "800",
              borderRadius: "10px",
              fontSize: "1.2em",
              marginTop: "20px",
              textAlign: "center",
              background:
                "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
            }}
            className="btn-md  btn-block"
          >
            Buy{" "}
          </button>
        </Box>
      </Modal>
    </div>
  );
}
