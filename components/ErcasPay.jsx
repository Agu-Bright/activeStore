"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

export default function PaymentButton({ session, amount }) {
  const { setLoading, handleClose, setOpen, setState, setActiveLoading } =
    useContext(RestaurantContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [reference, setReference] = useState("");

  const baseUrl = " https://api.ercaspay.com/api/v1";
  const secretKey = "ECRS-LIVE-SKaFF2rOeaMLVGptmUjQaKZ2vxlnysAhtg8CXYjkHG";
  const initializePayment = async () => {
    setLoading(true);
    const reference = `REF-${Date.now()}`;
    try {
      const response = await fetch(`${baseUrl}/payment/initiate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
          amount,
          paymentReference: reference,
          paymentMethods: "card,bank-transfer,ussd,qrcode",
          customerName: "active user",
          customerEmail: session?.user?.email,
          redirectUrl: "https://activestore.org/user/add-fund",
          description: "Account Topup",
          currency: "NGN",
          feeBearer: "customer",
          metadata: {
            email: session?.user?.email,
          },
        }),
      });

      const result = await response.json();

      if (result?.responseCode === "success") {
        // Redirect user to payment page
        setReference(reference);
        window.location.href = result.responseBody.checkoutUrl;
      } else {
        toast.error(
          result?.responseMessage || "Payment initialization failed.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            transition: Bounce,
          }
        );
      }
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      toast.error("An error occurred during payment initialization.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const transRef = searchParams.get("transRef"); // Get transRef from URL
    if (transRef) {
      console.log("THERE IS TRANSACTION REFERENCE");
      verifyPayment(transRef);
    }
  }, [searchParams]);

  const verifyPayment = async (transactionRef) => {
    setActiveLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/payment/transaction/verify/${transactionRef}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result?.requestSuccessful) {
        await axios.post("/api/deposit/create-deposit/", {
          amount: result?.responseBody?.amount,
          method: "ErcasPay",
        });
        toast.success("Payment verified and deposit successful.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          transition: Bounce,
        });
        setState((prev) => !prev);
        // handleClose();
      } else {
        toast.error(result?.responseMessage || "Payment verification failed.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error("An error occurred during payment verification.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        transition: Bounce,
      });
    } finally {
      setActiveLoading(false);
    }
  };

  return (
    <button onClick={initializePayment} className="btn-md">
      TEST MODE, DONT PAY
    </button>
  );
}
