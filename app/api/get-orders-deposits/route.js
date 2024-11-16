import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import Order from "@models/order";

export const GET = async (req, res) => {
  const session = await getServerSession(
    req,
    {
      ...NextResponse,
      getHeader: (name) => NextResponse.headers?.get(name),
      setHeader: (name, value) => NextResponse.headers?.set(name, value),
    },
    authOptions
  );
  //   if (!session) {
  //     return Response.json(
  //       { message: "You must be logged in." },
  //       { status: 401 }
  //     );
  //   }
  try {
    await connectDB;
    // Fetch the latest 10 Orders
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // Sort in descending order of creation
      .limit(10) // Get the latest 10
      .select("-logs.log") // Exclude sensitive fields
      .lean()
      .populate(["user", "orderLog"]);

    // Fetch the latest 10 Deposits
    const deposits = await Deposit.find()
      .sort({ createdAt: -1 }) // Sort in descending order of creation
      .limit(10) // Get the latest 10
      .select("-wallet") // Exclude sensitive fields
      .lean()
      .populate("user");

    // Combine the two arrays
    const combined = [...orders, ...deposits];

    // Sort the combined array by createdAt in descending order
    combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return new Response(
      JSON.stringify({ success: true, values: combined.slice(0, 10) }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
