import React, { useContext } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import "./flutterstyle.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
export default function FlutterButton({ session, amount, activeLog, count }) {
  const { setLoading, handleClose } = useContext(RestaurantContext);
  const config = {
    public_key: "FLWPUBK_TEST-9c639107aa2385eb475cd1f773702b60-X",
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: session?.user?.email,
      name: session?.user?.username,
    },
    customizations: {
      title: "Active Store",
      description: `Payment for ${activeLog?.social} account`,
      logo: "/img/logo.png",
    },
  };

  const router = useRouter();

  const handleOrder = async (res) => {
    console.log(res);
    closePaymentModal();
    try {
      closePaymentModal();
      setLoading(true);
      await axios.post("/api/logs/order-log", {
        number: count,
        log: activeLog?._id,
        status: res?.status,
        transactionId: res?.transaction_id,
        txRef: res?.tx_ref,
        amount: res?.charged_amount,
      });
      toast.success("Purchase successful", {
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
      setLoading(false);
      router.push("/user/orders");
      handleClose();
      // closePaymentModal();
    } catch (error) {
      setLoading(false);
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
      console.log(error);
    }
  };

  const fwConfig = {
    ...config,
    text: "Process Order",
    callback: async (response) => {
      await handleOrder(response);
    },
    onClose: () => {
      console.log("closed");
    },
    className: "btn-md btn-block flutter_style",
  };

  return <FlutterWaveButton {...fwConfig} />;
}
