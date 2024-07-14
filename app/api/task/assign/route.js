import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Task from "@models/task";
import User from "@models/user";

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
  } else if (session === "user") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }
  try {
    await connectDB;
    const body = await req.json();
    const user = await User.findById(body?.user);
    if (!user) {
      return Response.json({ message: "No User found" }, { status: 404 });
    }
    if (user.assignedTasks.length > 0) {
      return Response.json(
        { message: "User still have active task" },
        { status: 400 }
      );
    }
    const newBody = body.tasks.map((item) => {
      return { ...item, user: body.user };
    });
    const tasks = await Task.insertMany(newBody);
    user.request = false;
    tasks.forEach((item) => user.assignedTasks.push(item._id));
    user.completed = [];
    await user.save();
    return new Response(JSON.stringify({ success: true, tasks }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
