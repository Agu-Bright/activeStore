"use client";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { RestaurantContext } from "@context/RestaurantContext";
import TaskModal from "./TaskModal";

export default function Home() {
  const { myWallet, setToggleWallet, totalP, user, setToggle } =
    useContext(RestaurantContext);
  const photos = new Array(24).fill(null).map((_, index) => ({
    id: index,
    src: `https://via.placeholder.com/150?text=photo+${index + 1}`,
  }));
  console.log("user", user);
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleOrderReq = async () => {
    try {
      await axios.get("/api/task/request");
      toast.success("Request Sent", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 18000,
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(null);
  const [uncompletedTasks, setUnCompletedTasks] = useState(null);
  const [state, setState] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/task/get-my-tasks");
        setTasks(data?.tasks);
      } catch (error) {
        toast.error("Error Fetching Tasks", {
          position: "top-center",
          autoClose: 18000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    })();
  }, [state]);

  useEffect(() => {
    if (tasks.length !== 0) {
      const _completedTasks = tasks.filter(
        (task) => task.status === "complete"
      );
      const _uncompletedTasks = tasks.filter(
        (task) => task.status === "pending"
      );
      setUnCompletedTasks(_uncompletedTasks);
      setCompletedTasks(_completedTasks);
    }
  }, [tasks, state]);

  const handleBookTicket = () => {
    if (user?.assignedTasks.length === 0) {
      toast.error(
        <div style={{ width: "200px", marginTop: "50px" }}>
          <Typography sx={{ fontWeight: "800", fontSize: "1.3em" }}>
            Book Ticket
          </Typography>
          <Divider sx={{ margin: "20px 0px" }} />
          <Typography>
            There is currently no order. Please contact customer service to
            enable task permission
          </Typography>
          <button
            style={{
              width: "70%",
              marginTop: "20px",
              background: "orange",
              color: "white ",
              borderRadius: "10px",
              padding: "10px 0px",
              cursor: "pointer",
            }}
            onClick={() => handleOrderReq()}
          >
            Submit{" "}
          </button>
        </div>,
        {
          position: "top-center",
          autoClose: 18000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
      return;
    }

    handleOpen();
  };

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress style={{ color: "orange" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else if (user)
    return (
      <NavPage>
        <div
          className="contact-section overview-bgi"
          style={{ height: "95%", overflow: "hidden", color: "white" }}
        >
          {/* <div>welcome {session?.user?.accountName}</div> */}
          <div
            className="container"
            style={{
              zIndex: "999",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              className="details"
              style={{
                height: "100vh",
                overflowY: "scroll",
                marginTop: "70px",
                marginBottom: "70px",
              }}
            >
              <div
                style={{
                  maxWidth: "100%",
                  marginBottom: "150px",
                }}
              >
                <div style={{ height: "inherit" }}>
                  <div className="gridContainer">
                    {/* first 6============================================ */}
                    <motion.div
                      className="gridItem"
                      variants={{
                        up: {
                          y: [0, -10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                        down: {
                          y: [0, 10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                      }}
                      animate={{
                        y: [0, -20, 0],
                        transition: { duration: 0.8, repeat: Infinity },
                      }}
                    >
                      <img
                        src="/img/ironman.jpg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <div className="gridItem">
                      <img
                        src="/img/mg.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <motion.div
                      className="gridItem"
                      variants={{
                        up: {
                          y: [0, -10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                        down: {
                          y: [0, 10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                      }}
                      animate={{
                        y: [0, -20, 0],
                        transition: { duration: 0.8, repeat: Infinity },
                      }}
                    >
                      <img
                        src="/img/jok.jpg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <div className="gridItem">
                      <img
                        src="/img/fla.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <div className="gridItem">
                      <img
                        src="/img/love.jpg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <motion.div
                      className="gridItem"
                      variants={{
                        scale: {
                          scale: [1, 1.2, 1], // Increase to 1.2x and then back to 1x
                          transition: { duration: 2, repeat: Infinity }, // Adjust duration and repetition as needed
                        },
                      }}
                      animate={{
                        scale: [1, 1.2, 1], // Increase to 1.2x and then back to 1x
                        transition: {
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }, // Adjust duration and repetition as needed
                      }}
                    >
                      <img
                        src="/img/inte.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>

                    {/* second 6 =========================================== */}
                    <motion.div
                      className="gridItem"
                      variants={{
                        up: {
                          y: [0, -10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                        down: {
                          y: [0, 10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                      }}
                      animate={{
                        y: [0, -20, 0],
                        transition: { duration: 0.8, repeat: Infinity },
                        scale: [1, 1.2, 1], // Increase to 1.2x and then back to 1x
                        transition: {
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 1,
                        },
                      }}
                    >
                      <img
                        src="/img/venom.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <div className="gridItem">
                      <img
                        src="/img/thumb.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <motion.div
                      className="gridItem"
                      variants={{
                        up: {
                          y: [0, -10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                        down: {
                          y: [0, 10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                      }}
                      animate={{
                        y: [0, -20, 0],
                        transition: { duration: 0.8, repeat: Infinity },
                      }}
                    >
                      <img
                        src="/img/jum.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <motion.div
                      className="gridItem"
                      animate={{
                        scale: [1, 1.2, 1], // Increase to 1.2x and then back to 1x
                        transition: {
                          duration: 0.8,
                          delay: 3,
                          repeat: Infinity,
                          repeatDelay: 1,
                        },
                      }}
                    >
                      <img
                        src="/img/jun.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <div className="gridItem">
                      <img
                        src="/img/mav.jpg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <div className="gridItem">
                      <img
                        src="/img/rok.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    {/* third 6 ======================================================*/}
                    <div className="gridItem">
                      <img
                        src="/img/ad.jpg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <div className="gridItem">
                      <img
                        src="/img/images.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <motion.div
                      className="gridItem"
                      variants={{
                        up: {
                          y: [0, -10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                        down: {
                          y: [0, 10, 0],
                          transition: { duration: 0.8, repeat: Infinity },
                        },
                      }}
                      animate={{
                        y: [0, -20, 0],
                        transition: { duration: 0.8, repeat: Infinity },
                      }}
                    >
                      <img
                        src="/img/hd.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <motion.div
                      className="gridItem"
                      variants={{
                        left: {
                          x: [0, -10, 0],
                          transition: { duration: 1, repeat: Infinity },
                        },
                        right: {
                          x: [0, 10, 0],
                          transition: { duration: 1, repeat: Infinity },
                        },
                      }}
                      animate={{
                        x: [0, -10, 0],
                        transition: { duration: 1, repeat: Infinity },
                      }}
                    >
                      <img
                        src="/img/batman.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <motion.div
                      className="gridItem"
                      variants={{
                        left: {
                          x: [0, -10, 0],
                          transition: { duration: 1, repeat: Infinity },
                        },
                        right: {
                          x: [0, 10, 0],
                          transition: { duration: 1, repeat: Infinity },
                        },
                      }}
                      animate={{
                        x: [0, -10, 0],
                        transition: { duration: 1, repeat: Infinity },
                      }}
                    >
                      <img
                        src="/img/batty.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <motion.div
                      className="gridItem"
                      variants={{
                        left: {
                          x: [0, -10, 0],
                          transition: { duration: 1, repeat: Infinity },
                        },
                        right: {
                          x: [0, 10, 0],
                          transition: { duration: 1, repeat: Infinity },
                        },
                      }}
                      animate={{
                        x: [0, -10, 0],
                        transition: { duration: 1, repeat: Infinity },
                        scale: [1, 1.2, 1], // Increase to 1.2x and then back to 1x
                        transition: {
                          duration: 0.8,
                          delay: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        },
                      }}
                    >
                      <img
                        src="/img/batman2.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>

                    {/* last 6 ================================ */}
                    <motion.div
                      className="gridItem"
                      variants={{
                        scale: {
                          scale: [1, 1.2, 1], // Increase to 1.2x and then back to 1x
                          transition: { duration: 2, repeat: Infinity }, // Adjust duration and repetition as needed
                        },
                      }}
                      animate={{
                        scale: [1, 1.2, 1], // Increase to 1.2x and then back to 1x
                        transition: {
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }, // Adjust duration and repetition as needed
                      }}
                    >
                      <img
                        src="/img/noa.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </motion.div>
                    <div className="gridItem">
                      <img
                        src="/img/at1.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <div className="gridItem">
                      <img
                        src="/img/f1.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <div className="gridItem">
                      <img
                        src="/img/holywood.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <div className="gridItem">
                      <img
                        src="/img/avatar.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                    <div className="gridItem">
                      <img
                        src="/img/flash1.jpeg"
                        alt={`Photo ${photos[0].id + 1}`}
                      />
                    </div>
                  </div>
                </div>
                <Box
                  sx={{
                    marginTop: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Paper
                    sx={{
                      width: { md: "70%", xs: "100%" },
                      borderRadius: "10px",
                      minHeight: "30vh",
                      paddingBottom: "20px",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "800",
                          fontSize: "1.3em",
                        }}
                      >
                        {session?.user?.accountName}
                      </Typography>
                      <IconButton>
                        <Avatar
                          sx={{ borderRadius: "0px" }}
                          src="/img/bronze-medal.png"
                          alt="profile"
                        />{" "}
                      </IconButton>
                    </Box>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      sx={{ marginTop: "20px" }}
                    >
                      <IconButton>
                        <Avatar
                          sx={{ borderRadius: "0px" }}
                          src="/img/icons/wallet.png"
                          alt="profile"
                        />{" "}
                      </IconButton>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "800",
                            fontSize: { md: "1.3em", xs: "0.9em" },
                            color: "orange",
                            textAlign: "start",
                          }}
                        >
                          Today's Commision
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "800", textAlign: "start" }}
                        >
                          USD {myWallet?.profit || 0}.00
                        </Typography>
                      </Box>
                      <Typography
                        style={{
                          fontSize: { md: "1em", xs: "0.9em" },
                          textAlign: "start",
                        }}
                      >
                        The System will automatically update the today's profit
                      </Typography>
                    </Stack>

                    <Divider sx={{ margin: "20px 0px" }} />
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      sx={{ marginTop: "20px" }}
                    >
                      <IconButton>
                        <Avatar
                          sx={{ borderRadius: "0px" }}
                          src="/img/icons/dollar.png"
                          alt="profile"
                        />{" "}
                      </IconButton>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "800",
                            fontSize: { md: "1.3em", xs: "0.9em" },
                            color: "orange",
                            textAlign: "start",
                          }}
                        >
                          Account Balance{" "}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "800", textAlign: "start" }}
                        >
                          USD {myWallet?.balance || 0}.00
                        </Typography>
                      </Box>
                      <Typography
                        style={{
                          fontSize: { md: "1em", xs: "0.9em" },
                          textAlign: "start",
                        }}
                      >
                        Profit from each order will be added to the total
                        balance{" "}
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>

                <button
                  style={{
                    width: "70%",
                    marginTop: "20px",
                    background: "orange",
                    color: "white ",
                    borderRadius: "10px",
                    padding: "10px 0px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleBookTicket()}
                >
                  Book ticket ({user?.completed.length}
                  /25)
                </button>

                <div
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      sx={{
                        width: "100%",
                        textAlign: "start",
                        fontWeight: "800",
                        color: "white",
                      }}
                    >
                      Important Notice
                    </Typography>
                    <ul style={{ listStyleType: "circle" }}>
                      <li style={{ textAlign: "start", color: "white" }}>
                        {" "}
                        Operation hours [MON] - [SUN]: 10:00:00 23:59:00{" "}
                      </li>
                      <li style={{ textAlign: "start", color: "white" }}>
                        {" "}
                        For Applicant related Enquires, please refer to the
                        support{" "}
                      </li>
                      <li style={{ textAlign: "start", color: "white" }}>
                        {" "}
                        All members should read our terms and conditions
                        properly before using our service
                      </li>
                      <li style={{ textAlign: "start", color: "white" }}>
                        {" "}
                        If you have any enquiry, kindly contact our customer
                        service for further assistance
                      </li>
                      <li style={{ textAlign: "start", color: "white" }}>
                        {" "}
                        Only one account can be registered for one mobile Phone
                        Number. To prevent malicious use of a series of illegal
                        acts, and entrust the platform to set the corresponding
                        progress rules. The system will automatically match
                        orders for the agent member when he or she makes a
                        ticket. After completing ticketing each day, the amount
                        can be withdrawn to a present or bound bank account.
                        Platform deposite are only allowed to be tranfered by
                        the account owner, transfer from one people or anonymous
                        people will affect the security of the account.
                      </li>
                      <li style={{ textAlign: "start", color: "white" }}>
                        {" "}
                        All tickets are randomly assigned by the system, so it's
                        not possible to change, cancel or skip tickets once
                        recieved
                      </li>
                      <li
                        style={{
                          textAlign: "start",
                          color: "white",
                          marginBottom: "80px",
                        }}
                      >
                        {" "}
                        Each order is simplified by different merchant, so
                        naturally the profit varies. Therefore you will need to
                        ask customer service for the merchant's address before
                        each deposit is made
                      </li>
                    </ul>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TaskModal
          open={open}
          setOpen={setOpen}
          tasks={uncompletedTasks}
          completedTasks={completedTasks}
          setState={setState}
          setToggleWallet={setToggleWallet}
          setToggle={setToggle}
        />
        <ToastContainer />
      </NavPage>
    );
}
