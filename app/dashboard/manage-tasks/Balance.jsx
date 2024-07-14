"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Balance = ({ id }) => {
  const [balance, setBalance] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/getBalance/${id}`);
        setBalance(data?.balance);
      } catch (error) {
        setBalance("loading...");
      }
    })();
  }, []);
  return <div>{balance}</div>;
};

export default Balance;
