import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius } from "@mui/system";
import { Stack } from "@mui/material";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function BasicModal({
  open,
  handleClose,
  active,
  setState,
  setState2,
  type,
}) {
  const { formatMoney } = React.useContext(RestaurantContext);
  const handleApprove = async (_id) => {
    try {
      const { data } = await axios.post("/api/deposit/update-deposit", {
        id: _id,
        approve: "true",
      });
      setState((prev) => !prev);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  const handleApprove2 = async (_id) => {
    try {
      const { data } = await axios.post("/api/withdraw/update-withdraw", {
        id: _id,
        approve: "true",
      });
      console.log(data);
      setState2((prev) => !prev);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  const handleDecline = async (_id) => {
    try {
      const { data } = await axios.post("/api/deposit/update-deposit", {
        id: _id,
        approve: "false",
      });
      console.log(data);
      setState((prev) => !prev);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  const handleDecline2 = async (_id) => {
    try {
      const { data } = await axios.post("/api/withdraw/update-withdraw", {
        id: _id,
        approve: "false",
      });
      console.log(data);
      setState2((prev) => !prev);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  //=======================================create category=================================//
  const [category, setCategory] = React.useState("");
  const { setToggle } = React.useContext(RestaurantContext);

  const handleCreateCategory = async () => {
    if (!category) {
      toast.error("Category is required", {
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
    try {
      const { data } = await axios.post("/api/logs/createCategory", {
        category,
      });
      setToggle((prev) => !prev);
      handleClose();
    } catch (error) {
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

  if (type === "createCategory") {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Category{" "}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 0.5 }}>
              Enter the category name that corresponds to the log you intend to
              create.
            </Typography>
            <div className="form-group" style={{ width: "100%" }}>
              <input
                type="text"
                name="category"
                className="input-text"
                placeholder="Category"
                style={{ width: "100%" }}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </div>
            <Stack justifyContent="space-between" direction="row">
              <Button sx={{ color: "red", visibility: "hidden" }}></Button>
              <Button onClick={() => handleCreateCategory()}>Create</Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  } else
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
            {active?.transactionHash || active?.screenShot ? (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Credit Account{" "}
              </Typography>
            ) : (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirm Withdrawal{" "}
              </Typography>
            )}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to credit{" "}
              <span style={{ fontWeight: "750" }}>
                {active?.user?.username}
              </span>{" "}
              with the sum of ₦
              <span style={{ fontWeight: "750" }}>
                {formatMoney(Number(active?.amount))}
              </span>
            </Typography>
            <Stack justifyContent="space-between" direction="row">
              <Button
                sx={{ color: "red" }}
                onClick={() =>
                  active?.transactionHash || active?.screenShot
                    ? handleDecline(active?._id)
                    : handleDecline2(active?._id)
                }
              >
                Decline
              </Button>
              <Button
                onClick={() =>
                  active?.transactionHash || active?.screenShot
                    ? handleApprove(active?._id)
                    : handleApprove2(active?._id)
                }
              >
                Approve
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
}
