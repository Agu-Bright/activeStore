import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius, color, minHeight } from "@mui/system";
import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { RestaurantContext } from "@context/RestaurantContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "37%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 600, xs: 300 },
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
  const [index, setIndex] = React.useState(1);
  const router = useRouter();
  React.useEffect(() => {
    setIndex(1);
  }, [activeLog]);

  const handleIncrement = () => {
    const maxLength = Number(activeLog?.logs.length);
    if (count < maxLength) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecreament = () => {
    const length = Number(activeLog?.logs.length);
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const handleBuy = () => {
    if (count === 0) {
      toast.error("Order Count must be greater than one", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    setIndex(2);
  };

  const [loading, setLoading] = React.useState(false);

  const handleOrder = async () => {
    try {
      setLoading(true);
      await axios.post("/api/logs/order-log", {
        number: count,
        log: activeLog?._id,
      });
      toast.success("Purchase successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
      handleClose();
      router.push("/user/orders");
    } catch (error) {
      setLoading(false);

      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {index === 1 && (
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
                sx={{
                  color: "white",
                  borderColor: "#878383",
                  margin: "20px 0px",
                }}
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
                  <Box
                    sx={{
                      color: "white",
                      fontSize: { md: "1em", xs: "0.7em" },
                    }}
                  >
                    {activeLog?.description}
                  </Box>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { md: "1em", xs: "0.7em" },
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>Stock:</span>{" "}
                    {activeLog?.logs?.length}
                  </Typography>
                </Stack>
              </Stack>
              <Typography sx={{ color: "gray" }}>
                The account format includes username, password, email and email
                password
              </Typography>
              <Divider
                sx={{
                  color: "white",
                  borderColor: "#878383",
                  margin: "20px 0px",
                }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row">
                  <IconButton
                    onClick={() => handleDecreament()}
                    sx={{ border: "1px solid gray", margin: "0px 10px" }}
                  >
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
                  <IconButton
                    onClick={() => handleIncrement()}
                    sx={{ border: "1px solid gray", margin: "0px 10px" }}
                  >
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
              <Button
                onClick={() => handleBuy()}
                style={{
                  display: "flex",
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
                <Typography sx={{ color: "white" }}>Buy </Typography>
                <IconButton>
                  <LocalMallIcon sx={{ color: "white" }} />
                </IconButton>
              </Button>
            </Box>
          )}
          {index === 2 && (
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "white" }}
              >
                Complete Order{" "}
              </Typography>
              <Typography sx={{ color: "white" }}>
                You are about to order
              </Typography>
              <Divider
                sx={{
                  color: "white",
                  borderColor: "#878383",
                  margin: "20px 0px",
                }}
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
                  <Box
                    sx={{
                      color: "white",
                      fontSize: { md: "1em", xs: "0.7em" },
                    }}
                  >
                    {activeLog?.description}
                  </Box>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { md: "1em", xs: "0.7em" },
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>Stock:</span>{" "}
                    {activeLog?.logs?.length}
                  </Typography>
                </Stack>
              </Stack>
              <Typography sx={{ color: "gray" }}>
                The account format includes username, password, email and email
                password
              </Typography>
              <Divider
                sx={{
                  color: "white",
                  borderColor: "#878383",
                  margin: "20px 0px",
                }}
              />

              <Button
                onClick={() => handleOrder()}
                style={{
                  display: "flex",
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
                {!loading ? (
                  <Typography sx={{ color: "white" }}>
                    Confirm Purchase{" "}
                  </Typography>
                ) : (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                )}
                <IconButton>
                  <LocalMallIcon sx={{ color: "white" }} />
                </IconButton>
              </Button>
            </Box>
          )}
        </div>
      </Modal>
    </div>
  );
}
