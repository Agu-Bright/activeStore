"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
const InfoCards = ({ summary }) => {
  const { data: session, status } = useSession();
  return (
    <>
      <Stack
        sx={{
          margin: "0px",
          padding: "0px",
          display: { md: "flex", sm: "flex", xs: "none" },
        }}
      >
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="ui-item bg-success">
              <div className="left">
                {session?.user?.role === "admin" && <p>Orders</p>}

                {session?.user?.role === "admin" && (
                  <h4>{summary?.totalReservations || "0"}</h4>
                )}
              </div>
              {/* <div className="right">
                <i className="fa fa-map-marker"></i>
              </div> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="ui-item bg-warning">
              <div className="left">
                {session?.user?.role === "admin" && <p>Todays Deposit</p>}
                {session?.user?.role === "admin" && (
                  <h4>{summary?.totalRestaurants || "0"}</h4>
                )}
                {session?.user?.role === "sub-admin" && (
                  <h4>{summary?.todaysReservations || "0"}</h4>
                )}
                {/* <p>Listing Views</p> */}
              </div>
              {/* <div className="right">
                <i className="fa fa-eye"></i>
              </div> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="ui-item bg-active">
              <div className="left">
                {session?.user?.role === "admin" && <p>Logs</p>}
                {session?.user?.role === "sub-admin" && <p>Logs</p>}
                {session?.user?.role === "admin" && (
                  <h4>{summary?.totalSubsc || "0"}</h4>
                )}
                {session?.user?.role === "sub-admin" && (
                  <h4>{summary?.revCount || "0"}</h4>
                )}
              </div>
              {/* <div className="right">
                <i className="fa fa-comments-o"></i>
              </div> */}
            </div>
          </div>

          {session?.user?.role === "admin" && (
            <div className="col-lg-3 col-md-3 col-sm-6">
              <div className="ui-item bg-dark">
                <div className="left">
                  {session?.user?.role === "admin" && <p>Users</p>}
                  {session?.user?.role === "admin" && (
                    <h4>{summary?.totalUsers || "0"}</h4>
                  )}

                  {/* <p>Bookmarked</p> */}
                </div>
                {/* <div className="right">
                  <i className="fa fa-heart-o"></i>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </Stack>
      <Box
        sx={{
          margin: "0px",
          padding: "0px",
          display: { md: "none", sm: "none", xs: "flex" },
        }}
      >
        <Swiper
          slidesPerView={1.2}
          spaceBetween={5}
          freeMode={true}
          modules={[FreeMode]}
          navigation
        >
          <SwiperSlide>
            <div
              className="col-lg-3 col-md-3 col-sm-6"
              style={{ paddingRight: "0px", paddingLeft: "0px" }}
            >
              <div className="ui-item bg-success">
                <div className="left">
                  {session?.user?.role === "admin" && <p>Deposits</p>}
                  {session?.user?.role === "admin" && (
                    <h4>{summary?.restaurantRequests || "NGN 0"}</h4>
                  )}
                </div>
                <div className="right">
                  <i className="fa fa-map-marker"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="col-lg-3 col-md-3 col-sm-6"
              style={{ paddingRight: "0px", paddingLeft: "0px" }}
            >
              <div className="ui-item bg-warning">
                <div className="left">
                  {session?.user?.role === "admin" && <p> Todays Deposits</p>}
                  {session?.user?.role === "admin" && (
                    <h4>{summary?.totalRestaurants || "0"}</h4>
                  )}
                  {session?.user?.role === "sub-admin" && (
                    <h4>{summary?.todaysReservations || "0"}</h4>
                  )}
                  {/* <p>Listing Views</p> */}
                </div>
                <div className="right">
                  <i className="fa fa-eye"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="ui-item bg-active">
                  <div className="left">
                    {session?.user?.role === "admin" && <p>Empty Logs</p>}
                    {session?.user?.role === "admin" && (
                      <h4>{summary?.totalSubsc || "0"}</h4>
                    )}
                  </div>
                  <div className="right">
                    <i className="fa fa-comments-o"></i>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {session?.user?.role === "admin" && (
            <SwiperSlide>
              <div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="ui-item bg-dark">
                    <div className="left">
                      {session?.user?.role === "admin" && <p>Users</p>}
                      {session?.user?.role === "admin" && (
                        <h4>{summary?.totalUsers || "0"}</h4>
                      )}

                      {/* <p>Bookmarked</p> */}
                    </div>
                    <div className="right">
                      <i className="fa fa-heart-o"></i>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )}
          {session?.user?.role === "admin" && (
            <SwiperSlide>
              <div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="ui-item bg-dark">
                    <div className="left">
                      {session?.user?.role === "admin" && (
                        <p>Customer Service</p>
                      )}
                      {session?.user?.role === "admin" && (
                        <h4>{summary?.totalUsers || "0"}</h4>
                      )}

                      {/* <p>Bookmarked</p> */}
                    </div>
                    <div className="right">
                      <i className="fa fa-heart-o"></i>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </Box>
    </>
  );
};

export default InfoCards;
