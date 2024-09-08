"use client";
import React, { useContext, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import BasicModal from "./Modal";
import { RestaurantContext } from "@context/RestaurantContext";

const Table = () => {
  const { formatMoney, formatDateToReadable } = useContext(RestaurantContext);
  const handleCopy = (address) => {
    // const referralCode = session?.user?.referalCode;
    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          toast.success("Copied to Clipboard", {
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
          // Optionally, display a notification or toast here
        })
        .catch((err) => {
          toast.error("copy failed", {
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
        });
    }
  };
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);

  const [wallets, setWallets] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const columns = [
    "Account Name",
    "Email",
    "Payment Method",
    "Amount",
    "screenshot",
    "status",
    "Created At",
    "Actions",
  ];

  withdraws && console.log(withdraws);
  state && console.log(state);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/deposit/get-deposits`);
        console.log(data);
        setWallets(data?.deposits.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/withdraw/get-withdrawal`);
        console.log(data);
        setWithdraws(data?.withdraws.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state2]);

  const options = {
    responsive: "standard",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [active, setActive] = useState(null);
  const data = [];

  const getColor = (status) => {
    if (status === "success") {
      return "green";
    }
    if (status === "pending") {
      return "orange";
    }
    if (status === "rejected") {
      return "red";
    }
  };
  wallets &&
    wallets.map((order) =>
      data.push([
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Avatar
            sx={{
              width: "25px",
              height: "25px",
              fontSize: "12px",
              background: "green",
            }}
            src="/img/man.png"
            alt="avatar"
          />

          <span style={{ marginLeft: "5px" }}>{order?.user?.username} </span>
        </div>,

        order?.user?.email,
        order?.method,
        <div>
          {" "}
          <span style={{ color: "black", fontWeight: "800" }}></span>{" "}
          {formatMoney(order?.amount)}
        </div>,

        <>
          {order?.screenShot && (
            <a href={order?.screenShot} target="_blank">
              view Screenshot
            </a>
          )}
        </>,
        <div
          style={{
            textDecoration: "underline",
            color: getColor(order?.status),
          }}
        >
          {order?.status}
        </div>,
        formatDateToReadable(order?.createdAt),
        <button
          onClick={() => {
            if (order?.status !== "success") {
              setActive(order);
              setTimeout(() => {
                handleOpen();
              }, 1000);
            }
          }}
          style={{
            cursor: "pointer",
            color: "white",
            background: getColor(order?.status),
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          {order?.status !== "success" ? "Update" : "complete"}
        </button>,
      ])
    );
  //========================================data2==================================

  // const column2 = [
  //   "Account Name",
  //   "Phone Number",
  //   "Account Balance",
  //   "Network",
  //   "Amount",
  //   "status",
  //   "Created At",
  //   "Actions",
  // ];
  // const data2 = [];

  // withdraws &&
  //   withdraws.map((order) =>
  //     data2.push([
  //       <div
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "flex-start",
  //         }}
  //       >
  //         <Avatar
  //           sx={{
  //             width: "25px",
  //             height: "25px",
  //             fontSize: "12px",
  //             background: "green",
  //           }}
  //           src={`${
  //             order?.user?.sex === "male" ? "/img/man.png" : "/img/woman.png"
  //           }`}
  //           alt="avatar"
  //         />

  //         <span style={{ marginLeft: "5px" }}>{order?.user?.accountName} </span>
  //       </div>,

  //       order?.user?.phoneNumber,
  //       order?.wallet?.balance,
  //       order?.wallet?.network,
  //       <div>
  //         {" "}
  //         <span style={{ color: "black", fontWeight: "800" }}>$</span>{" "}
  //         {order?.amount}
  //       </div>,
  //       <div
  //         style={{
  //           textDecoration: "underline",
  //           color: getColor(order?.status),
  //         }}
  //       >
  //         {order?.status}
  //       </div>,
  //       order?.createdAt,
  //       <button
  //         onClick={() => {
  //           if (order?.status !== "success") {
  //             setActive(order);
  //             setTimeout(() => {
  //               handleOpen();
  //             }, 1000);
  //           }
  //         }}
  //         style={{
  //           cursor: "pointer",
  //           color: "white",
  //           background: getColor(order?.status),
  //           textAlign: "center",
  //           borderRadius: "5px",
  //         }}
  //       >
  //         {order?.status !== "success" ? "Update" : "complete"}
  //       </button>,
  //     ])
  //   );

  return (
    <>
      <MUIDataTable
        title="Account Top Ups"
        data={data}
        columns={columns}
        options={options}
      />
      {/* <div style={{ marginTop: "20px" }}>
        <MUIDataTable
          title="Withdrawal Requests"
          data={data2}
          columns={column2}
          options={options}
        />
      </div> */}
      <ToastContainer />
      <BasicModal
        open={open}
        handleClose={handleClose}
        active={active}
        setState={setState}
        setState2={setState2}
      />
    </>
  );
};

export default Table;
