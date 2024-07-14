import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import Wallet from "@models/wallet";
import Withdraw from "@models/Withdrawal";

export const POST = async (req) => {
  //check if user is authenticated
  const session = await getServerSession(
    req,
    {
      ...NextResponse,
      getHeader: (name) => NextResponse.headers?.get(name),
      setHeader: (name, value) => NextResponse.headers?.set(name, value),
    },
    authOptions
  );
  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  } else if (session?.user?.role === "user") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }
  try {
    await connectDB;
    const data = await req.json();
    const withdraw = await Withdraw.findById(data.id);
    if (!withdraw) {
      return Response.json({ message: "No Withdraw found" }, { status: 401 });
    }
    const wallet = await Wallet.findOne({ user: withdraw.user });
    if (!wallet) {
      return Response.json({ message: "No user found" }, { status: 401 });
    }
    if (data.approve === "true") {
      //check if wallet balance is greater than withdrawal balance
      const walletBalance = Number(wallet.balance) + Number(wallet.profit);
      const isValid = walletBalance >= Number(withdraw.amount);
      if (!isValid) {
        withdraw.status = "rejected";
        await withdraw.save();
        return Response.json(
          { message: "User doesn't have a sufficient balance" },
          { status: 401 }
        );
      }
      //upadte user account balance
      withdraw.status = "success";
      //update wallet status
      if (wallet.profit >= withdraw.amount) {
        wallet.profit = wallet.profit - Number(withdraw.amount);
        await wallet.save();
      } else if (wallet.balance >= withdraw.amount) {
        wallet.balance = wallet.balance - Number(withdraw.amount);
        await wallet.save();
      } else {
        const amount = Number(withdraw.amount);
        const totalbal = wallet.balance + wallet.profit;
        const remainingBal = totalbal - amount;
        console.log("bal", remainingBal);
        wallet.balance = remainingBal;
        wallet.profit = 0;
        await wallet.save();
      }
      await withdraw.save();
    } else {
      //upadte user account balance
      withdraw.status = "rejected";
      //update wallet status
      await withdraw.save();
    }

    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
