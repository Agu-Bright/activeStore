import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Log from "@models/log";
import connectDB from "@utils/connectDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req, { params }) => {
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
    const body = await req.json();

    const updatedLog = await Log.findByIdAndUpdate(
      id,
      { $set: { logs: body?.logs || [] } }, // Ensure `body?.logs` is valid or use an empty array
      { new: true } // Optionally return the updated document
    );
    console.log("updated_logs", updatedLog);
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};