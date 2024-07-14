import Restaurant from "@models/restaurant";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import Reservation from "@models/booking";
import { NextResponse } from "next/server";
import ApiFeatures from "@utils/apiFeatures";
import { sendMail } from "@utils/nodemailer";

export const POST = async (req, { params }) => {
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
  }
  try {
    await connectDB;
    const id = params.id;
    const data = await req.json();
    //find restaurant
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return Response.json(
        { success: false, message: "No Restaurant Found" },
        { status: 404 }
      );
    }
    //create reservation
    const rservation = await Reservation.create({
      ...data,
      restaurant: restaurant?._id,
      resOwner: restaurant?.user,
      customer: session.user.id,
    });

    await sendMail(
      "createReservation",
      session?.user?.name,
      session?.user.email,
      restaurant?.name,
      id
    );

    restaurant.dailyBookedCount = Number(restaurant.dailyBookedCount) + 1;
    await restaurant.save();

    return Response.json({ message: "success", rservation }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
