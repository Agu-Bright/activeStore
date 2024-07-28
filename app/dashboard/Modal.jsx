import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius } from "@mui/system";
import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";

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
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
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
  const { setToggle, catType } = React.useContext(RestaurantContext);

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

  //=======================================CREAT LOG=================================//
  const [index, setIndex] = React.useState(0);
  const [social, setSocial] = React.useState("facebook");
  const [description, setDesciption] = React.useState("");
  // const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [log, setLog] = React.useState("");
  const [logs, setLogs] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const handleUpload = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post("/api/logs/creatLog", {
        social,
        description,
        logs,
        catType,
      });
      console.log(data);
      setIndex(0);
      handleClose();
      setToggle((prev) => !prev);
      setUploading(false);
    } catch (error) {
      setUploading(false);
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
  } else if (type === "createLog") {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Log{" "}
            </Typography>
            <Divider />
            {index === 0 && (
              <Typography id="modal-modal-description" sx={{ mt: 0.5 }}>
                Choose the social Account Type
              </Typography>
            )}
            {index === 1 && (
              <Typography id="modal-modal-description" sx={{ mt: 0.5 }}>
                Log Description{" "}
              </Typography>
            )}
            {index === 0 && (
              <Stack spacing={2} sx={{ marginTop: "10px" }}>
                <Paper
                  onClick={() => setSocial("facebook")}
                  sx={{
                    padding: "15px 10px",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                    background: `${
                      social === "facebook"
                        ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                        : "white"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid white",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      display: "flex",
                    }}
                  >
                    <Box sx={{ width: "20%" }}>
                      <Avatar
                        src="/img/facebook.png"
                        sx={{ borderRadius: "2px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        width: "75%",
                        color: `${social === "facebook" ? "white" : "black"}`,
                        fontWeight: "800",
                        fontSize: "1.5em",
                      }}
                    >
                      Facebook
                    </Typography>
                  </Box>
                </Paper>
                {/* facebook */}
                <Paper
                  onClick={() => setSocial("instagram")}
                  sx={{
                    padding: "15px 10px",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                    background: `${
                      social === "instagram"
                        ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                        : "white"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid white",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      display: "flex",
                    }}
                  >
                    <Box sx={{ width: "20%" }}>
                      <Avatar
                        src="/img/instagram.png"
                        sx={{ borderRadius: "2px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        width: "75%",
                        color: `${social === "instagram" ? "white" : "black"}`,
                        fontWeight: "800",
                        fontSize: "1.5em",
                      }}
                    >
                      Instagram
                    </Typography>
                  </Box>
                </Paper>
                {/* twittter */}
                <Paper
                  onClick={() => setSocial("twitter")}
                  sx={{
                    padding: "15px 10px",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                    background: `${
                      social === "twitter"
                        ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                        : "white"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid white",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      display: "flex",
                    }}
                  >
                    <Box sx={{ width: "20%" }}>
                      <Avatar
                        src="/img/twitter.png"
                        sx={{ borderRadius: "2px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        width: "75%",
                        color: `${social === "twitter" ? "white" : "black"}`,
                        fontWeight: "800",
                        fontSize: "1.5em",
                      }}
                    >
                      Twitter
                    </Typography>
                  </Box>
                </Paper>
                <Paper
                  onClick={() => setSocial("gmail")}
                  sx={{
                    padding: "15px 10px",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                    background: `${
                      social === "gmail"
                        ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                        : "white"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid white",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      display: "flex",
                    }}
                  >
                    <Box sx={{ width: "20%" }}>
                      <Avatar
                        src="/img/gmail.png"
                        sx={{ borderRadius: "2px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        width: "75%",
                        color: `${social === "gmail" ? "white" : "black"}`,
                        fontWeight: "800",
                        fontSize: "1.5em",
                      }}
                    >
                      Gmail
                    </Typography>
                  </Box>
                </Paper>
                <Paper
                  onClick={() => setSocial("tiktok")}
                  sx={{
                    padding: "15px 10px",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                    background: `${
                      social === "tiktok"
                        ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                        : "white"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid white",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      display: "flex",
                    }}
                  >
                    <Box sx={{ width: "20%" }}>
                      <Avatar
                        src="/img/tiktok.png"
                        sx={{ borderRadius: "2px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        width: "75%",
                        color: `${social === "tiktok" ? "white" : "black"}`,
                        fontWeight: "800",
                        fontSize: "1.5em",
                      }}
                    >
                      Tiktok
                    </Typography>
                  </Box>
                </Paper>
                <Paper
                  onClick={() => setSocial("others")}
                  sx={{
                    padding: "15px 10px",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                    background: `${
                      social === "others"
                        ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                        : "white"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid white",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      display: "flex",
                    }}
                  >
                    <Box sx={{ width: "20%" }}>
                      <Avatar
                        src="/img/others.png"
                        sx={{ borderRadius: "2px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        width: "75%",
                        color: `${social === "others" ? "white" : "black"}`,
                        fontWeight: "800",
                        fontSize: "1.5em",
                      }}
                    >
                      Others
                    </Typography>
                  </Box>
                </Paper>
              </Stack>
            )}
            {index === 1 && (
              <div className="form-group" style={{ width: "100%" }}>
                <input
                  type="text"
                  name="log"
                  className="input-text"
                  placeholder="Aged Facebook | 0-5 friends"
                  style={{ width: "100%" }}
                  onChange={(e) => setDesciption(e.target.value)}
                  value={description}
                />
              </div>
            )}
            {index === 2 && (
              <div>
                <div>
                  {logs &&
                    logs.length > 0 &&
                    logs.map((log, _index) => (
                      <div
                        style={{
                          position: "relative",
                          border: "0.1px solid gray",
                          margin: "10px",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      >
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        >
                          <CancelIcon sx={{ color: "red" }} />
                        </IconButton>
                        <div>
                          details: <span>{log.log}</span>{" "}
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="form-group" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="log"
                      className="input-text"
                      placeholder="@username,password,email,password..."
                      style={{ width: "100%", marginTop: "5px" }}
                      onChange={(e) => setLog(e.target.value)}
                      value={log}
                    />
                  </div>
                  {log && (
                    <button
                      onClick={() => {
                        setLogs((prev) => {
                          return [...prev, { log: log }];
                        });
                        setLog("");
                        toast.success("Success, You can add more", {
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
                      }}
                      style={{
                        width: "20%",
                        border: "none",
                        borderRadius: "5px",
                        background: "rgba(128,117,255,1) 0%",
                        color: "white",
                        cursor: "pointer",
                        padding: "10px 0px",
                      }}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            )}

            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ marginTop: "10px" }}
            >
              <Button
                onClick={() => {
                  setIndex((prev) => prev - 1);
                }}
                sx={{
                  color: "red",
                  visibility: `${index === 0 ? "hidden" : "visible"}`,
                }}
              >
                Previous
              </Button>
              {!uploading && (
                <Button
                  onClick={() => {
                    if (index === 1) {
                      if (!description) {
                        toast.error("Description is required", {
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
                      setIndex((prev) => prev + 1);
                    } else if (index === 2) {
                      if (logs.length === 0) {
                        toast.error("Add at least one log to upload", {
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
                      handleUpload();
                    } else setIndex((prev) => prev + 1);
                  }}
                >
                  {`${index === 2 ? "Upload" : "Continue"}`}
                </Button>
              )}
              {uploading && (
                <Button>
                  <CircularProgress
                    size={20}
                    sx={{ color: "rgba(128,117,255,1) 0%" }}
                  />
                </Button>
              )}
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
