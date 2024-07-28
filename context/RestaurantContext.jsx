"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
export const RestaurantContext = createContext();

const RestaurantContextProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [myWallet, setMyWallet] = useState(null);
  const [user, setUser] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [refreshed, setRefreshed] = useState(false);
  const [restaurantIntent, setRestaurantIntent] = useState(false);
  const [state, setState] = useState("reservation");
  const [task, setTask] = useState(false);
  const [myCountry, setMyCountry] = useState("");
  //reservation Data
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [activeSub, setActiveSub] = useState();
  const [togggleWallet, setToggleWallet] = useState(true);
  const [toggle, setToggle] = useState(true);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState(false);
  const handleOpen = () => setOpen(true);

  const clearFilter = () => {
    setCuisine("");
    setSearch("");
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/auth/me`);
        setUser(data?.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [toggle]);

  //==================== score box =====================
  function formatDate(date) {
    const padZero = (num) => num.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // Months are zero-based
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} 00:00:00`;
  }

  const [active, setActive] = useState("home");
  const [totalP, setTotalp] = useState("home");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/get-wallet`);
        setMyWallet(data?.wallet);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [togggleWallet]);

  useEffect(() => {
    const today = new Date();
    const day = formatDate(today);
    console.log(day);

    (async () => {
      try {
        const { data } = await axios.post("/api/get-today-profit", {
          date: day,
        });
        setTotalp(data?.totalProfit);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [togggleWallet]);

  function formatMoney(number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  function formatDateToReadable(dateString) {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day} ${month} ${year}: ${hour}:${min}:${sec}`;
  }

  return (
    <RestaurantContext.Provider
      value={{
        cuisine,
        setCuisine,
        search,
        setSearch,
        page,
        setPage,
        clearFilter,
        date,
        setDate,
        time,
        setTime,
        refreshed,
        setRefreshed,
        restaurantIntent,
        setRestaurantIntent,
        activeSub,
        setActiveSub,
        state,
        setState,
        user,
        setUser,
        myCountry,
        //==================score box =========
        active,
        setActive,
        open,
        setOpen,
        handleOpen,
        myWallet,
        setMyWallet,
        task,
        setTask,
        setToggleWallet,
        totalP,
        setTotalp,
        formatMoney,
        formatDateToReadable,
        toggle,
        setToggle,
        type,
        setType,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;
