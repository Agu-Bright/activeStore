"use client";
import React, { useContext, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Avatar, IconButton } from "@mui/material";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./Modal";
import { RestaurantContext } from "@context/RestaurantContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Table = () => {
  const { formatDateToReadable, formatMoney, setType } =
    useContext(RestaurantContext);
  

  const [wallets, setWallets] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0); // For total orders
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [state, setState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/api/admin/get-orders?page=${page + 1}&limit=${rowsPerPage}`
        );
        setWallets(data?.orders);
        setTotalOrders(data?.pagination?.total); // Set total orders from response
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
  }, [page, rowsPerPage, state]);

  const options = {
    responsive: "standard",
    serverSide: true, // Enable server-side pagination
    count: totalOrders, // Total orders for pagination
    page, // Current page
    rowsPerPage, // Rows per page
    onChangePage: (newPage) => {
      setPage(newPage); // Update page
    },
    onChangeRowsPerPage: (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage); // Update rows per page
      setPage(0); // Reset to the first page
    },
  };

  const [active, setActive] = useState();
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
          <span style={{ marginLeft: "5px" }}>{order?.user?.username} </span>
        </div>,
        order?.user?.email,
        <div
          style={{
            color: `${order?.user?.role === "admin" ? "red" : "green"}`,
            fontWeight: "800",
          }}
        >
          {order?.user?.role}
        </div>,
        order?.social,
        formatMoney(Number(order?.logs.length * order?.orderLog?.price)),
        order?.logs.length,
        formatDateToReadable(order?.createdAt),
      ])
    );

  return (
    <>
      <MUIDataTable
        title="Orders"
        data={data}
        columns={[
          "Account Name",
          "Email",
          "Role",
          "Log",
          "Amount",
          "Logs",
          "Created At",
        ]}
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
