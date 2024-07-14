import InfoCards from "@components/InfoCard";
import Sidebar from "@components/Sidebar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; //
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const postData = async (data) => {
  const Response = await fetch("/api/auth/create-customer", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return Response;
};
const Body = () => {
  const [viewPassword, setViewPassword] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const summary = {};

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
      setIsSubmitting(false);
      router.push("/dashboard/customer-service");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div
            className="dashboard-content dashboard_row"
            style={{
              width: "100%",
              border: "0.1px solid #b7b2b2",
            }}
          >
            <div>
              <>
                <div className="dashboard-header clearfix">
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <h4>
                        Hi &#x1F44B;, {session?.user?.accountName}{" "}
                        {session?.user?.role === "admin" && (
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Admin
                          </span>
                        )}{" "}
                        {session?.user?.role === "sub-admin" && (
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Customer Service
                          </span>
                        )}{" "}
                      </h4>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="breadcrumb-nav">
                        <ul>
                          {/* <li>
                          <a href="/">Index</a>
                        </li> */}
                          <li>
                            <a href="/create-customer" className="active">
                              Create Customer Service
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    flexDirection: "column",
                    border: "1px solid #e3dcdc",
                    borderRadius: "10px",
                    justifyContent: "flex-start",
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* <!-- Form content box start --> */}
                        <div className="form-content-box">
                          {/* <!-- details --> */}
                          <a
                            href="/"
                            style={{ fontWeight: "900", fontSize: "1.5em" }}
                          >
                            {/*
                   <img
                    src="img/logos/white-logo.png"
                    className="cm-logo"
                    alt="black-logo"
                  /> 
                  */}
                            Create Customer Service{" "}
                          </a>
                          <div className="details">
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
                                    color: `${
                                      state.accountName.status ? "green" : "red"
                                    }`,
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
                                    color: `${
                                      state.phoneNumber.status ? "green" : "red"
                                    }`,
                                    textAlign: "start",
                                    width: "100%",
                                  }}
                                >
                                  {state.phoneNumber.msg}
                                </div>{" "}
                              </div>
                              <div className="form-group">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type={viewPassword ? "text" : "password"}
                                    name="withdrawalPassword"
                                    className="input-text"
                                    placeholder="Withdrawal Password"
                                    style={{ borderRight: "none" }}
                                    onChange={handleChange}
                                    value={values.withdrawalPassword}
                                  />
                                  <span
                                    style={{
                                      borderLeft: "none",
                                      height: "100%",
                                    }}
                                    onClick={() =>
                                      setViewPassword((prev) => !prev)
                                    }
                                    className="text-xl absolute font-bold right-[23px] top-[5px]"
                                  >
                                    {viewPassword ? (
                                      <VisibilityIcon
                                        fontSize="small"
                                        className="size-4 text-gray-500"
                                      />
                                    ) : (
                                      <VisibilityOffIcon
                                        fontSize="small"
                                        className="size-4 text-gray-500"
                                      />
                                    )}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    color: `${
                                      state.withdrawalPassword.status
                                        ? "green"
                                        : "red"
                                    }`,
                                    textAlign: "start",
                                    width: "100%",
                                  }}
                                >
                                  {state.withdrawalPassword.msg}
                                </div>{" "}
                              </div>
                              <div className="form-group">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type={viewPassword ? "text" : "password"}
                                    name="password"
                                    className="input-text"
                                    style={{ borderRight: "none" }}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    value={values.password}
                                  />
                                  <span
                                    style={{
                                      borderLeft: "none",
                                      height: "100%",
                                    }}
                                    onClick={() =>
                                      setViewPassword((prev) => !prev)
                                    }
                                    className="text-xl absolute font-bold right-[23px] top-[5px]"
                                  >
                                    {viewPassword ? (
                                      <VisibilityIcon
                                        fontSize="small"
                                        className="size-4 text-gray-500"
                                      />
                                    ) : (
                                      <VisibilityOffIcon
                                        fontSize="small"
                                        className="size-4 text-gray-500"
                                      />
                                    )}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    color: `${
                                      state.password.status ? "green" : "red"
                                    }`,
                                    textAlign: "start",
                                    width: "100%",
                                  }}
                                >
                                  {state.password.msg}
                                </div>{" "}
                              </div>
                              <div className="form-group">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type={viewPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    style={{ borderRight: "none" }}
                                    className="input-text"
                                    placeholder="Enter Passwod Again"
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                  />
                                  <span
                                    style={{
                                      borderLeft: "none",
                                      height: "100%",
                                    }}
                                    onClick={() =>
                                      setViewPassword((prev) => !prev)
                                    }
                                    className="text-xl absolute font-bold right-[23px] top-[5px]"
                                  >
                                    {viewPassword ? (
                                      <VisibilityIcon
                                        fontSize="small"
                                        className="size-4 text-gray-500"
                                      />
                                    ) : (
                                      <VisibilityOffIcon
                                        fontSize="small"
                                        className="size-4 text-gray-500"
                                      />
                                    )}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    color: `${
                                      state.confirmPassword.status
                                        ? "green"
                                        : "red"
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
                                    color: `${
                                      state.sex.status ? "green" : "red"
                                    }`,
                                    textAlign: "start",
                                    width: "100%",
                                  }}
                                >
                                  {state.sex.msg}
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "start",
                                  marginBottom: "10px",
                                }}
                              ></div>
                              <div className="form-group mb-0">
                                <button
                                  type="submit"
                                  className="btn-md button-theme btn-block"
                                  disabled={isSubmitting}
                                  style={{ background: "orange" }}
                                >
                                  {isSubmitting ? (
                                    <CircularProgress
                                      size={20}
                                      sx={{ color: "white" }}
                                    />
                                  ) : (
                                    "Signup"
                                  )}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Body;
