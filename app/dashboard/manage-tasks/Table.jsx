"use client";
import React, { useContext, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Balance from "./Balance";
import { useRouter } from "next/navigation";
import { RestaurantContext } from "@context/RestaurantContext";
import Comission from "./Comission";
import EditIcon from "@mui/icons-material/Edit";
const Table = () => {
  const { task, setTask } = useContext(RestaurantContext);

  const columns = [
    "Account Name",
    "Phone Number",
    "badge",
    "Account Balance",
    "Time Requested",
    "Actions",
  ];
  const columns2 = [
    "Account Name",
    "Phone Number",
    "Account Balance",
    "Commision",
    "Total Tasks",
    "completed Tasks",
    "Actions",
  ];

  const [users, setUsers] = useState([]);
  const [active, setActive] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/task/get-requests`);
        setUsers(data?.users.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const { data } = await axios.get(`/api/task/get-active-tasks`);
        setActive(data?.users.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [task]);
  const [balance, setBalance] = useState("");
  const router = useRouter();

  const handleAssign = async (id) => {
    try {
      const { data } = await axios.get(`/api/getBalance/${id}`);
      router.push(
        `/dashboard/assign-tasks?task-id=${data?.balance || 0}&userId=${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    responsive: "standard",
  };

  const data = [];
  users &&
    users.map((order) =>
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
            src={`${order?.sex === "male" ? "/img/man.png" : "/img/woman.png"}`}
            alt="avatar"
          />

          <span style={{ marginLeft: "5px" }}>{order?.accountName} </span>
        </div>,

        order?.phoneNumber,
        order?.badge,
        <Balance id={order?._id} />,
        order?.createdAt,
        <button
          onClick={() => handleAssign(order?._id)}
          style={{
            cursor: "pointer",
            color: "white",
            background: "orange",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          Assign
        </button>,
      ])
    );
  const data2 = [];
  active &&
    active.map((order) =>
      data2.push([
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
            src={`${order?.sex === "male" ? "/img/man.png" : "/img/woman.png"}`}
            alt="avatar"
          />

          <span style={{ marginLeft: "5px" }}>{order?.accountName} </span>
        </div>,

        order?.phoneNumber,
        <Balance id={order?._id} />,
        <Comission id={order?._id} />,
        25,
        order?.completed.length,
        <IconButton
          onClick={() =>
            router.push(`/dashboard/update-task?userId=${order?._id}`)
          }
        >
          <EditIcon />
        </IconButton>,
      ])
    );

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <MUIDataTable
          title="Task Reset Request"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <MUIDataTable
          title="Active Tasks"
          data={data2}
          columns={columns2}
          options={options}
        />
      </div>

      <ToastContainer />
    </>
  );
};

export default Table;
