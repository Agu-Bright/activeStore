"use client";
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Avatar, CircularProgress } from "@mui/material";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Table = () => {
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
  const [wallets, setWallets] = useState([]);
  const columns = [
    "Account Name",
    "Phone Number",
    "badge",
    "walletAddress",
    "network",
    "Account Balance",
    "password",
    "Created At",
    // "Actions",
  ];
  wallets && console.log(wallets);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/get-all-customer-service`);
        setWallets(data?.wallets.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleGetPassword = async (id) => {
    try {
      const { data } = await axios.get(`/api/auth/get-password/${id}`);
      console.log(data);
      const el = document.getElementById(id);
      if (el) {
        console.log(el);
        el.textContent = data?.pwd;
      }
      //   return data?.pwd;
    } catch (error) {
      toast.error("Error getting password, try again", {
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

  const options = {
    responsive: "standard",
  };

  const data = [];
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
            src={`${
              order?.user?.sex === "male" ? "/img/man.png" : "/img/woman.png"
            }`}
            alt="avatar"
          />

          <span style={{ marginLeft: "5px" }}>{order?.user?.accountName} </span>
        </div>,

        order?.user?.phoneNumber,
        order?.user?.badge,
        <div
          style={{ textDecoration: "underline" }}
          onClick={() => handleCopy(order?.walletAddress)}
        >
          {order?.walletAddress}
        </div>,
        order?.network,
        order?.balance,
        <div
          id={order?.user?._id}
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            handleGetPassword(order?.user?._id);
          }}
        >
          Get Password{" "}
        </div>,
        order?.createdAt,
      ])
    );
  return (
    <>
      <MUIDataTable
        title="Customer Service Details"
        data={data}
        columns={columns}
        options={options}
      />
      <ToastContainer />
    </>
  );
};

export default Table;
