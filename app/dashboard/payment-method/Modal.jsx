import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import { borderRadius } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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

export default function WalletModal({
  open,
  setOpen,
  activeWallet,
  setState,
  setActive,
}) {
  const handleClose = () => setOpen(false);
  const [walletAddress, setWalletAddress] = React.useState("");
  const [submiting, setSubmiting] = React.useState(false);
  React.useEffect(() => {
    return () => {
      setActive("");
    };
  }, []);
  const handleUpdateWalletAddress = async () => {
    try {
      setSubmiting(true);
      const { data } = await axios.post(`/api/admin-update-wallet`, {
        network: activeWallet?.network,
        walletAddress,
      });
      if (data?.success) {
        toast.success("Success", {
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
      setState((prev) => !prev);
      setSubmiting(false);
      setActive("");
      setWalletAddress("");
      setOpen(false);
    } catch (error) {
      setSubmiting(false);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Wallet Address{" "}
          </Typography>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group" style={{ marginTop: "10px" }}>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="walletAddress"
                  className="input-text"
                  placeholder="Wallet Address"
                  onChange={(e) => setWalletAddress(e.target.value)}
                  //   onChange={(e) => setWalletAddress(e.target.value)}
                  value={walletAddress || activeWallet?.walletAddress}
                />
              </div>
              <div className="form-group" style={{ display: "flex" }}>
                <h5>Wallet Network:</h5>{" "}
                <Typography style={{ fontWeight: "800", paddingLeft: "15px" }}>
                  {activeWallet?.network}
                </Typography>
              </div>
              <>
                <button
                  onClick={handleUpdateWalletAddress}
                  className="btn-md button-theme btn-block"
                  //   disabled={submiting}
                  style={{ background: "orange" }}
                >
                  {submiting ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Update"
                  )}
                </button>
              </>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
