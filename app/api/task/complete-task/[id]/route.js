import User from "@models/user";
import Wallet from "@models/wallet";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Task from "@models/task";
import Profit from "@models/Profit";
import { Walter_Turncoat } from "next/font/google";
//get single restaurant
export const GET = async (req, { params }) => {
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
  }
  try {
    await connectDB;
    const id = params.id;
    const task = await Task.findById(id);
    if (!task) {
      return Response.json(
        { message: `No Task found with Id: ${id}` },
        { status: 404 }
      );
    }
    if (task.status === "complete") {
      return Response.json(
        { message: `Task already comleted` },
        { status: 404 }
      );
    }
    const user = await User.findById(session.user.id);
    if (!user) {
      return Response.json(
        { message: `No User found with Id: ${id}` },
        { status: 404 }
      );
    }
    //fetch user wallet
    const wallet = await Wallet.findOne({ user: task?.user.toString() });
    if (!wallet) {
      return Response.json(
        { message: `No user wallet found with Id: ${id}` },
        { status: 404 }
      );
    }
    //check if user have available balance
    const legitBalance = Number(wallet.balance) > Number(task.price);
    if (!legitBalance) {
      return Response.json(
        { message: `You have insifficient balance to compete this task` },
        { status: 404 }
      );
    }
    //debit cost from user account
    wallet.balance = Number(wallet.balance) - Number(task.price);
    //add profit to user account
    wallet.profit =
      Number(wallet.profit) + Number(task.commision) + Number(task.price);
    await wallet.save();
    //update task
    task.status = "complete";
    await task.save();
    //create profit
    await Profit.create({
      user: session?.user.id,
      wallet: wallet._id,
      amount: Number(task.commision) + Number(task.price),
      status: "success",
    });
    user.assignedTasks.pop(task._id);
    user.completed.push(task._id);
    await user.save();

    return Response.json({ success: true, task }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
