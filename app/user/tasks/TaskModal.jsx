"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius, height } from "@mui/system";
import { CircularProgress, Divider, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ConfettiExplosion from "react-confetti-explosion";

import "swiper/css";
import "swiper/css/free-mode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { RestaurantContext } from "@context/RestaurantContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function TaskModal({
  open,
  setOpen,
  tasks,
  completedTasks,
  setState,
  setToggleWallet,
  setToggle,
}) {
  const handleClose = () => setOpen(false);
  const [canSwipe, setCanSwipe] = React.useState(false);
  const [swiperInstance, setSwiperInstance] = React.useState(null);
  console.log(swiperInstance);
  const [loading, setLoading] = React.useState(false);
  const { user } = React.useContext(RestaurantContext);

  const swiperRef = React.useRef(null);

  const handleCompleteClick = async (id) => {
    // if (swiperRef.current) {
    //   setCanSwipe(true);
    //   const swiperInstance = swiperRef.current.swiper;
    //   if (swiperInstance) {
    //     await swiperInstance.slideNext();
    //   }
    // }
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/task/complete-task/${id}`);
      console.log(data);
      toast.success("task completed", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setState((prev) => !prev);
      setToggleWallet((prev) => !prev);
      setToggle((prev) => !prev);
      setLoading(false);
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
      setLoading(false);
    }
  };

  const handleSwiperInit = (swiper) => {
    setSwiperInstance(swiper);
  };
  //   const handleTouchMove = (swiper) => {
  //     if (!canSwipe) {
  //       swiper.allowSlideNext = false;
  //       swiper.allowSlidePrev = false;
  //     } else {
  //       swiper.allowSlideNext = true;
  //       swiper.allowSlidePrev = true;
  //     }
  //   };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between">
            {completedTasks && (
              <Typography id="modal-modal-title" variant="h4" component="h2">
                My Tasks ({user?.completed.length}/25)
              </Typography>
            )}
            <IconButton onClick={() => handleClose()}>
              <CloseIcon sx={{ color: "red" }} />
            </IconButton>
          </Stack>
          <Divider sx={{ margin: "20px 10px" }} />

          {tasks && tasks.length > 0 ? (
            <Box
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={5}
                allowSlideNext={canSwipe}
                allowSlidePrev={true}
                onSwiper={(swiper) => handleSwiperInit(swiper)}
                //   onTouchMove={(swiper) => handleTouchMove(swiper)}
              >
                {tasks &&
                  tasks.map((item) => {
                    return (
                      <SwiperSlide
                        key={item?._id}
                        style={{
                          border: "1px solid #d6d0d0",
                          width: "100%",
                          height: "auto",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        <Stack direction={{ md: "row", xs: "column" }}>
                          <img
                            alt="task"
                            src={item.image}
                            style={{
                              width: "30%",
                              height: "100%",
                              borderRadius: "10px",
                            }}
                          />
                          <Box
                            sx={{
                              marginLeft: "15px",
                              width: "100%",
                              height: "cover",
                            }}
                          >
                            <Stack
                              direction="column"
                              sx={{ width: "100%", height: "100%" }}
                              justifyContent="space-between"
                            >
                              <Box>
                                <Typography
                                  sx={{ fontWeight: "800", fontSize: "2em" }}
                                >
                                  {item?.name}
                                </Typography>
                                <Typography>
                                  Ticket Price: <span>${item?.price}</span>
                                </Typography>
                                <Typography>
                                  Ticket Commision:{" "}
                                  <span>${item?.commision || 0}</span>
                                </Typography>
                              </Box>
                              <Box sx={{ width: "100%" }}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <div></div>
                                  <button
                                    id="swipe_id"
                                    onClick={() =>
                                      !loading && handleCompleteClick(item?._id)
                                    }
                                    style={{
                                      border: "none",
                                      background: "orange",
                                      color: "white",
                                      padding: "10px 11px",
                                      borderRadius: "10px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {loading ? (
                                      <CircularProgress
                                        size={15}
                                        sx={{ color: "white" }}
                                      />
                                    ) : (
                                      "Complete"
                                    )}
                                  </button>
                                </Stack>
                              </Box>
                            </Stack>
                          </Box>
                        </Stack>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </Box>
          ) : (
            <div>
              <ConfettiExplosion />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
