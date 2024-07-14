"use client";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
export default function Home() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [active, setActive] = useState("password");
  //==================================================================================
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const style = {
    width: "100%",
    bgcolor: "background.paper",
    borderRadius: "5px",
  };
  const handlePasswordUpdate = async (type) => {
    if (type === "profile") {
      if (!phoneNumber) {
        toast.error("Phone Number is required", {
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
        setIsSubmiting(true);
        const { data } = await axios.put(`/api/auth/update`, {
          phoneNumber: phoneNumber,
        });
        setIsSubmiting(false);
        toast.success("phone Number updated", {
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
        await update({
          ...session,
          user: {
            ...session.user,
            phoneNumber: phoneNumber,
          },
        });
        setPhoneNumber("");
        handleClose();
      } catch (error) {
        setIsSubmiting(false);
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
        console.log(error);
      }
    } else {
      if (
        !passwordUpdate.oldPassword &&
        !passwordUpdate.newPassword &&
        !passwordUpdate.confirmNewPassword
      ) {
        toast.error("Every Detail is required", {
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
        setIsSubmiting(true);
        const { data } = await axios.post(
          type === "password"
            ? `/api/auth/password-update`
            : `/api/auth/withdrawal-password`,
          passwordUpdate
        );
        console.log(data);
        setIsSubmiting(false);
        toast.success(
          type === "password"
            ? "Password Updated"
            : "Withdrawal Password Updated",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        setPasswordUpdate({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        handleClose();
      } catch (error) {
        setIsSubmiting(false);
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
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    if (
      e.target.name === "oldPassword" ||
      e.target.name === "newPassword" ||
      e.target.name === "confirmNewPassword"
    ) {
      setPasswordUpdate((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  //--------====================================================================
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
  } else
    return (
      <NavPage buttonNav={false} topNav={true} title="Security">
        <div
          className="contact-section overview-bgi"
          style={{ height: "95%", overflow: "hidden" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Form content box start --> */}
                <div className="form-content-box">
                  {/* <!-- details --> */}
                  <div
                    className="details"
                    style={{
                      height: "100vh",
                      color: "black",
                      overflowY: "scroll",
                    }}
                  >
                    <div
                      style={{
                        height: "auto",
                        marginTop: "100px",
                        marginBottom: "60px",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-around">
                        <Typography
                          onClick={() => setActive("password")}
                          sx={{
                            fontWeight: "750",
                            fontSize: "15px",
                            cursor: "pointer",
                            color: `${
                              active === "password" ? "orange" : "black"
                            }`,
                          }}
                        >
                          Change Login Password{" "}
                        </Typography>
                        <Typography
                          onClick={() => setActive("withdraw")}
                          sx={{
                            fontWeight: "750",
                            fontSize: "15px",
                            cursor: "pointer",
                            color: `${
                              active === "withdraw" ? "orange" : "black"
                            }`,
                          }}
                        >
                          Change Wthdrawal Password{" "}
                        </Typography>
                      </Stack>
                      <Divider sx={{ margin: "10px 0px" }} />

                      <div
                        style={{
                          display: "flex",
                          textAlign: "start",
                          fontWeight: "800",
                          margin: "20px 0px",
                        }}
                      >
                        <LockIcon />
                        <Typography>
                          {active === "password"
                            ? "Change Login Password"
                            : "Change Withdrawal Password"}{" "}
                        </Typography>
                      </div>
                      {/*======================== passord and withdrwal passord update ================*/}
                      <Box sx={style}>
                        <>
                          <div
                            className="form-group"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ width: "100%" }}
                              type="password"
                              name="oldPassword"
                              className="input-text"
                              placeholder={
                                active === "password"
                                  ? "Current Password"
                                  : "Current Withdrawal Password"
                              }
                              onChange={handleChange}
                              value={passwordUpdate.oldPassword}
                            />
                          </div>
                          <Divider sx={{ margin: "10px 0px" }} />
                          <div
                            className="form-group"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ width: "100%" }}
                              type="password"
                              name="newPassword"
                              className="input-text"
                              placeholder={
                                active === "password"
                                  ? "New Password"
                                  : "New Withdrawal Password"
                              }
                              onChange={handleChange}
                              value={passwordUpdate.newPassword}
                            />
                          </div>
                          <div
                            className="form-group"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ width: "100%" }}
                              type="password"
                              name="confirmNewPassword"
                              className="input-text"
                              placeholder={
                                active === "password"
                                  ? "Confirm New Password"
                                  : "Confirm New Withdrawal Password"
                              }
                              onChange={handleChange}
                              value={passwordUpdate.confirmNewPassword}
                            />
                          </div>
                          <div className="form-group mb-0">
                            <button
                              onClick={() =>
                                handlePasswordUpdate(
                                  active === "password"
                                    ? "password"
                                    : "withdrawal"
                                )
                              }
                              className="btn-md button-theme btn-block"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "white" }}
                                />
                              ) : (
                                "Update"
                              )}
                            </button>
                          </div>
                        </>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </NavPage>
    );
}
