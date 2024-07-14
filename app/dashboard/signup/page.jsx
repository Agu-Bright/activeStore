"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const postData = async (data) => {
  const Response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return Response;
};

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    accountName: "",
    phoneNumber: "",
    withdrawalPassword: "",
    password: "",
    confirmPassword: "",
    sex: "",
    referalCode: "",
  });

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session]);

  const [state, setState] = useState({
    accountName: {
      status: false,
      msg: "Username must be between 6 characters and 25 characters",
    },
    phoneNumber: { status: false, msg: "Invalid Phone Number" },
    withdrawalPassword: {
      status: false,
      msg: "Withdrawal Password must be between 6 characters to 32 characters",
    },
    password: {
      status: false,
      msg: "Password must be between 6 characters to 32 characters",
    },
    confirmPassword: { status: false, msg: "Confirm Password does not match" },
    sex: { status: false, msg: "select a gender" },
    referalCode: { status: false, msg: "Invalid Referral code" },
  });

  const handleChange = (e) => {
    if (e.target.name === "accountName" || e.target.name === "phoneNumber") {
      //validate before set
      setValues((prev) => {
        return { ...prev, [e.target.name]: e.target.value.trim() };
      });
    }
    if (
      e.target.name === "withdrawalPassword" ||
      e.target.name === "password" ||
      e.target.name === "confirmPassword" ||
      e.target.name === "referalCode" ||
      e.target.name === "sex"
    ) {
      //validate before set
      setValues((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
    console.log(values);
  };

  useEffect(() => {
    ///===============account name =====================
    if (
      values.accountName.split("").length >= 6 &&
      values.accountName.split("").length <= 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          accountName: {
            status: true,
            msg: "valid",
          },
        };
      });
    } else if (
      values.accountName.split("").length < 6 ||
      values.accountName.split("").length > 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          accountName: {
            status: false,
            msg: "Username must be between 6 characters and 25 characters",
          },
        };
      });
    }
    // ====================== phone number ===============
    if (
      values.phoneNumber.split("").length >= 6 &&
      values.phoneNumber.split("").length <= 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          phoneNumber: {
            status: true,
            msg: "valid",
          },
        };
      });
    } else if (
      values.phoneNumber.split("").length < 6 ||
      values.phoneNumber.split("").length > 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          phoneNumber: { status: false, msg: "Invalid Phone Number" },
        };
      });
    }
    // ====================== withdrawal password ===============
    if (
      values.withdrawalPassword.split("").length >= 6 &&
      values.withdrawalPassword.split("").length <= 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          withdrawalPassword: {
            status: true,
            msg: "valid",
          },
        };
      });
    } else if (
      values.withdrawalPassword.split("").length < 6 ||
      values.withdrawalPassword.split("").length > 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          withdrawalPassword: {
            status: false,
            msg: "Withdrawal Password must be between 6 characters to 32 characters",
          },
        };
      });
    }
    // ====================== password ===============
    if (
      values.password.split("").length >= 6 &&
      values.password.split("").length <= 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          password: {
            status: true,
            msg: "valid",
          },
        };
      });
    } else if (
      values.password.split("").length < 6 ||
      values.password.split("").length > 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          password: {
            status: false,
            msg: "Password must be between 6 characters to 32 characters",
          },
        };
      });
    }
    // ====================== confirm password ===============
    if (
      values.confirmPassword.split("").length >= 6 &&
      values.confirmPassword.split("").length <= 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          confirmPassword: {
            status: true,
            msg: "valid",
          },
        };
      });
    } else if (
      values.confirmPassword.split("").length < 6 ||
      values.confirmPassword.split("").length > 25
    ) {
      setState((prev) => {
        return {
          ...prev,
          confirmPassword: {
            status: false,
            msg: "Confirm Password does not match",
          },
        };
      });
    }
    // ====================== gender ===============
    if (values.sex) {
      setState((prev) => {
        return {
          ...prev,
          sex: {
            status: true,
            msg: "valid",
          },
        };
      });
    } else if (values.sex) {
      setState((prev) => {
        return {
          ...prev,
          sex: { status: false, msg: "select a gender" },
        };
      });
    }

    // ====================== referral code ===============
    if (values.referalCode.split("").length === 6) {
      setState((prev) => {
        return {
          ...prev,
          referalCode: {
            status: true,
            msg: "valid",
          },
        };
      });
    } else if (
      values.referalCode.split("").length > 6 ||
      values.referalCode.split("").length > 6
    ) {
      setState((prev) => {
        return {
          ...prev,
          referalCode: { status: false, msg: "Invalid Referral code" },
        };
      });
    }
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const data = await postData(values);
      if (data.ok) {
        const status = await signIn("credentials", {
          redirect: false,
          accountName: values.accountName,
          password: values.password,
          callbackUrl: `/`,
        });
        if (status.ok) {
          setIsSubmitting(false);
          router.push("/");
        }
      }
      if (!data.ok) {
        setIsSubmitting(false);
        const res = await data.json();
        console.log(res);
        toast.error(res.message, {
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
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }

    console.log("submited");
  };

  return (
    <div
      className="contact-section overview-bgi"
      style={{ flexDirection: "column" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* <!-- Form content box start --> */}
            <div className="form-content-box">
              {/* <!-- details --> */}
              <div className="details">
                {/* <!-- Logo--> */}
                <a href="/" style={{ fontWeight: "900", fontSize: "1.5em" }}>
                  {/*
                   <img
                    src="img/logos/white-logo.png"
                    className="cm-logo"
                    alt="black-logo"
                  /> 
                  */}
                  Registration
                </a>
                {/* <!-- Name --> */}
                <h3>Please Enter your details to register an account</h3>
                {/* <!-- Form start--> */}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="accountName"
                      className="input-text"
                      placeholder="Account Name"
                      onChange={handleChange}
                      value={values.accountName}
                    />

                    <div
                      style={{
                        color: `${state.accountName.status ? "green" : "red"}`,
                        textAlign: "start",
                        width: "100%",
                      }}
                    >
                      {state.accountName.msg}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="phoneNumber"
                      className="input-text"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      value={values.phoneNumber}
                    />
                    <div
                      style={{
                        color: `${state.phoneNumber.status ? "green" : "red"}`,
                        textAlign: "start",
                        width: "100%",
                      }}
                    >
                      {state.phoneNumber.msg}
                    </div>{" "}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="withdrawalPassword"
                      className="input-text"
                      placeholder="Withdrawal Password"
                      onChange={handleChange}
                      value={values.withdrawalPassword}
                    />
                    <div
                      style={{
                        color: `${
                          state.withdrawalPassword.status ? "green" : "red"
                        }`,
                        textAlign: "start",
                        width: "100%",
                      }}
                    >
                      {state.withdrawalPassword.msg}
                    </div>{" "}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="input-text"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    <div
                      style={{
                        color: `${state.password.status ? "green" : "red"}`,
                        textAlign: "start",
                        width: "100%",
                      }}
                    >
                      {state.password.msg}
                    </div>{" "}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="input-text"
                      placeholder="Enter Passwod Again"
                      onChange={handleChange}
                      value={values.confirmPassword}
                    />
                    <div
                      style={{
                        color: `${
                          state.confirmPassword.status ? "green" : "red"
                        }`,
                        textAlign: "start",
                        width: "100%",
                      }}
                    >
                      {state.confirmPassword.msg}
                    </div>{" "}
                  </div>
                  <div className="form-group">
                    <select
                      name="sex"
                      className="input-text"
                      onChange={handleChange}
                      value={values.sex}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                    <div
                      style={{
                        color: `${state.sex.status ? "green" : "red"}`,
                        textAlign: "start",
                        width: "100%",
                      }}
                    >
                      {state.sex.msg}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="referalCode"
                      className="input-text"
                      placeholder="Referral Code"
                      onChange={handleChange}
                      value={values.referalCode}
                    />
                    <div
                      style={{
                        color: `${state.referalCode.status ? "green" : "red"}`,
                        textAlign: "start",
                        width: "100%",
                      }}
                    >
                      {state.referalCode.msg}
                    </div>{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <input
                        type="radio"
                        style={{
                          border: "2px solid black",
                          marginRight: "10px",
                        }}
                      />{" "}
                    </div>
                    <div>I have read and agreed to T & C</div>
                  </div>
                  <div className="form-group mb-0">
                    <button
                      type="submit"
                      className="btn-md button-theme btn-block"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        "Signup"
                      )}
                    </button>
                  </div>
                </form>
              </div>
              {/* <!-- Footer --> */}
              <div className="footer">
                <span>
                  Already a member? <Link href="login">Login here</Link>
                </span>
              </div>
            </div>
            {/* <!-- Form content box end --> */}
          </div>
        </div>
      </div>
      <p style={{ color: "white", zIndex: "999", marginTop: "30px" }}>
        Copyright @2024 Com Score. All Rights Reserved
      </p>
      <ToastContainer />
    </div>
  );
};

export default page;
