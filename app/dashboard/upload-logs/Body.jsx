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
import LogsUpload from "./LogsUpload";

const postData = async (data) => {
  const Response = await fetch("/api/auth/create-customer", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return Response;
};
const Body = () => {
  const { data: session } = useSession();

  return (
    <div className="dashboard">
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div
            className="dashboard-content dashboard_row"
            style={{
              width: "100%",
              height: "100vh",
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
                    padding: "20px 0px",
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* <!-- Form content box start --> */}
                        <div>
                          {/* <!-- details --> */}
                          <a
                            href="/"
                            style={{ fontWeight: "900", fontSize: "1.5em" }}
                          >
                            Manage Logs{" "}
                          </a>
                          <div>
                            <LogsUpload />
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
