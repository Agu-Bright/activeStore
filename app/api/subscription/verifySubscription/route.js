import Restaurant from "@models/restaurant";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import User from "@models/user";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export const GET = async (req, { params }) => {
  //check if user is authenticated is have a role of seller
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
  } else if (session && session?.user?.role !== "sub-admin") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }

  try {
    await connectDB;
    if (!session?.user?.customerId) {
      return Response.json(
        { message: "success", status: "no_subscription" },
        { status: 200 }
      );
    }
    const subscriptions = await stripe.subscriptions.list({
      customer: session?.user?.customerId,
    });
    const subStatus = subscriptions.data[0].status;

    return Response.json(
      { message: "success", status: subStatus },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
