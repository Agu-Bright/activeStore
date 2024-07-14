import Restaurant from "@models/restaurant";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import User from "@models/user";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export const POST = async (req, { params }) => {
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
    const { session_id } = await req.json();
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    const returnUrl = `${process.env.DOMAIN}/dashboard`;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });

    //update user customer id
    const user = await User.findByIdAndUpdate(session?.user?.id, {
      customerId: checkoutSession.customer,
    });

    return Response.json(
      { message: "success", data: portalSession },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
