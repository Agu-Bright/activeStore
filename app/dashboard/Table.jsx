"use client";
import React, { useContext, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Avatar } from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicModal from "./Modal";
import { RestaurantContext } from "@context/RestaurantContext";

const Table = () => {
  const { formatMoney, formatDateToReadable } = useContext(RestaurantContext);

  const [wallets, setWallets] = useState([]);
  const [page, setPage] = useState(0); // MUIDataTable uses zero-based indexing
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);

  const columns = [
    "Account Name",
    "Email",
    "Payment Method",
    "Amount",
    "USDT",
    "Network",
    "Screenshot",
    "Status",
    "Created At",
    "Actions",
  ];

  // Fetch paginated data
  const fetchDeposits = async (page, limit) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/deposit/get-deposits`, {
        params: { page: page + 1, limit }, // Adjust for zero-based indexing
      });
      setWallets(data.deposits);
      setTotalRows(data.pagination.total);
    } catch (error) {
      toast.error("Failed to fetch deposits.", { transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const getColor = (status) => {
    if (status === "success") return "green";
    if (status === "pending") return "orange";
    if (status === "rejected") return "red";
  };

  const data = wallets.map((order) => [
    <div style={{ display: "flex", alignItems: "center" }}>
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
      <span style={{ marginLeft: "5px" }}>{order?.user?.username}</span>
    </div>,
    order?.user?.email,
    order?.method,
    <div>{formatMoney(order?.amount)}</div>,
    <div>{order?.usdt}</div>,
    <div>{order?.network}</div>,
    order?.screenShot ? (
      <a href={order?.screenShot} target="_blank">
        View Screenshot
      </a>
    ) : (
      "No screenshot"
    ),
    <div
      style={{ textDecoration: "underline", color: getColor(order?.status) }}
    >
      {order?.status}
    </div>,
    formatDateToReadable(order?.createdAt),
    <button
      onClick={() => {
        if (order?.status !== "success") {
          setActive(order);
          setTimeout(() => handleOpen(), 1000);
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
      {order?.status !== "success" ? "Update" : "Complete"}
    </button>,
  ]);

  const options = {
    responsive: "standard",
    serverSide: true, // Enable server-side pagination
    count: totalRows, // Total number of rows
    rowsPerPage,
    page,
    onChangePage: (newPage) => setPage(newPage),
    onChangeRowsPerPage: (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setPage(0); // Reset to first page
    },
    textLabels: {
      body: {
        noMatch: loading ? (
          <div style={{ textAlign: "center", padding: "10px" }}>Loading...</div>
        ) : (
          "No matching records found"
        ),
      },
    },
  };

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MUIDataTable
        title="Account Top Ups"
        data={data}
        columns={columns}
        options={options}
      />
      <ToastContainer />
      <BasicModal
        open={open}
        handleClose={handleClose}
        active={active}
        setState={() => fetchDeposits(page, rowsPerPage)}
      />
    </>
  );
};

export default Table;
