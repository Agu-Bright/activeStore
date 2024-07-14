import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import Withdraw from "@models/Withdrawal";
import bcrypt from "bcryptjs";
export const POST = async (req, res) => {
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
    const body = await req.json();
    if (!body || !body.userId) {
      return new Response(
        JSON.stringify({ success: false, message: "Bad Request" }),
        {
          status: 404,
        }
      );
    }
    const user = await User.findById(body.userId).populate("assignedTasks");

    return new Response(
      JSON.stringify({ success: true, tasks: user.assignedTasks }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if ((error.code = 11000 && error.keyPattern && error.keyValue)) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exist" }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
