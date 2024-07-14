"use client";
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Avatar, IconButton } from "@mui/material";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./Modal";

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
    "Created At",
    "Actions",
  ];
  const [state, setState] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/get-all-wallet`);
        setWallets(data?.wallets.reverse());
      } catch (error) {
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
      }
    })();
  }, [state]);

  const options = {
    responsive: "standard",
  };

  const [active, setActive] = useState();
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);

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
        order?.createdAt,
        <IconButton
          onClick={() => {
            setActive(order);
            handleOpen();
          }}
        >
          <DeleteIcon />
        </IconButton>,
      ])
    );
  return (
    <>
      <MUIDataTable
        title="User Details"
        data={data}
        columns={columns}
        options={options}
      />
      <DeleteModal
        open={open}
        setOpen={setOpen}
        active={active}
        setActive={setActive}
        setState={setState}
      />
      <ToastContainer />
    </>
  );
};

export default Table;
