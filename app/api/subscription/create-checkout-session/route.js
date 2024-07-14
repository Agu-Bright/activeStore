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

    //this is only created one time
    const stripeSession = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: process.env.PRICE_ID,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: session?.user?.email,
      success_url: `${process.env.DOMAIN}/dashboard-pricing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/cancel`,

      subscription_data: {
        trial_period_days: 30,
      },
    });

    //add checkout session url to the user database just in case the user doesnt get to update the user model
    const user = await User.findByIdAndUpdate(session?.user?.id, {
      sessionId: stripeSession?.id,
    });

    return Response.json(
      { message: "success", session: stripeSession },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
