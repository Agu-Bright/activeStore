import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Restaurant from "@models/restaurant";
import connectDB from "@utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//hide/unhide single restaurant
export const PATCH = async (req, { params }) => {
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
    const id = params.id;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return Response.json(
        { message: `No restaurant found with Id: ${id}` },
        { status: 404 }
      );
    }
    const state =
      restaurant?.user._id.toString() === session?.user?.id.toString();

    if (!state) {
      return Response.json(
        { message: `You are not authorized to perform this operation` },
        { status: 403 }
      );
    }

    const data = await req.json();

    const res = await Restaurant.findByIdAndUpdate(id, { hide: data?.hide });

    return Response.json({ success: true, res }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
