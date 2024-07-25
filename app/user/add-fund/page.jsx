"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Paper,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "#CDC5B4" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <div class="container">
          <div class="row p-3">
            <div class="col-12">
              <form
                action="https://v2.logmarketplace.com/user/deposit/insert"
                method="POST"
              >
                <input
                  type="hidden"
                  name="_token"
                  value="Gb5PbOqLlLdJh5BpT2LbuQfNeVshcSHabkTfXluW"
                />

                <p class="mt-3" style={{fontWeight:"700"}}>
                  Top up your wallet easily using Bank Transfer or Card
                </p>

                <div class="card">
                  <div class="card-body">
                    <h6 style={{fontWeight: "700"}}>Enter Amount (NGN)</h6>
                    <input
                      style={{ margin: "10px 0px" }}
                      placeholder="Enter amount"
                      type="number"
                      name="amount"
                      class="text-dark p-2 form-control"
                      required=""
                    />
                  </div>
                </div>

                {amount && (
                  <div class="card">
                    <div class="card-body">
                      <h6 class="mb-1 mt-1">Select Payment Gateway</h6>
                      <div class="d-flex align-items-center mb-3">
                        <div class="col-12">
                          <select
                            class="text-dark form-control2 p-2"
                            name="gateway"
                            required=""
                          >
                            <option value="">Select payment method</option>
                            <option value="250">Instant Payment</option>
                            <option value="1000">Manual Payment</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    border: "none",
                    color: "white",
                    fontWeight: "800",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    background:
                      "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                  }}
                  // style={{background: linear-gradient(279deg, #FF0B9E -6.58%, #FF6501 121.69%); color: white;"}}
                  class="btn  w-100 mt-3"
                  id="btn-confirm"
                >
                  Continue{" "}
                </button>
              </form>
            </div>

            <Divider sx={{ margin: "20px 0px" }} />

            <div class="col-md-12">
              <h5 class="mt-4 mb-4">Latest Payments History</h5>
              <div class="card">
                <div class="card-body text-center p-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.699126 22.1299L11.4851 0.936473C11.6065 0.697285 11.7856 0.49768 12.0036 0.358621C12.2215 0.219562 12.4703 0.146179 12.7237 0.146179C12.9772 0.146179 13.2259 0.219562 13.4439 0.358621C13.6618 0.49768 13.841 0.697285 13.9624 0.936473L24.7483 22.1299C24.8658 22.3607 24.9253 22.6205 24.9209 22.8835C24.9165 23.1466 24.8484 23.4039 24.7234 23.6301C24.5983 23.8562 24.4206 24.0434 24.2078 24.1732C23.995 24.303 23.7543 24.3708 23.5097 24.3701H1.93781C1.69314 24.3708 1.45252 24.303 1.23968 24.1732C1.02684 24.0434 0.849131 23.8562 0.724084 23.6301C0.599037 23.4039 0.530969 23.1466 0.526592 22.8835C0.522216 22.6205 0.581682 22.3607 0.699126 22.1299ZM14.2252 14.2749L14.9815 9.39487C15.0039 9.25037 14.9967 9.10237 14.9605 8.96116C14.9243 8.81995 14.8599 8.6889 14.7719 8.57713C14.6838 8.46536 14.5742 8.37554 14.4506 8.31391C14.327 8.25228 14.1925 8.22033 14.0563 8.22026H11.3912C11.255 8.22033 11.1204 8.25228 10.9969 8.31391C10.8733 8.37554 10.7637 8.46536 10.6756 8.57713C10.5876 8.6889 10.5232 8.81995 10.487 8.96116C10.4508 9.10237 10.4436 9.25037 10.466 9.39487L11.2223 14.2749H14.2252ZM14.7882 18.1096C14.7882 17.5208 14.5707 16.9561 14.1835 16.5398C13.7964 16.1234 13.2713 15.8895 12.7237 15.8895C12.1762 15.8895 11.6511 16.1234 11.2639 16.5398C10.8768 16.9561 10.6593 17.5208 10.6593 18.1096C10.6593 18.6984 10.8768 19.2631 11.2639 19.6794C11.6511 20.0957 12.1762 20.3296 12.7237 20.3296C13.2713 20.3296 13.7964 20.0957 14.1835 19.6794C14.5707 19.2631 14.7882 18.6984 14.7882 18.1096Z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  <br />
                  <br />

                  <h6>No data found</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavPage>
    );
}
