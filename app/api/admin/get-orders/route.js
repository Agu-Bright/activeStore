import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Order from "@models/order";

export const GET = async (req) => {
  // Check if the user is authenticated
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
    return new Response(JSON.stringify({ message: "You must be logged in." }), {
      status: 401,
    });
  }

  if (session?.user.role !== "admin") {
    return new Response(JSON.stringify({ message: "Unauthorized route" }), {
      status: 403,
    });
  }

  try {
    await connectDB;

    // Parse query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 orders per page

    // Calculate skip value for MongoDB query
    const skip = (page - 1) * limit;

    // Fetch paginated orders
    const totalOrders = await Order.countDocuments(); // Total number of orders
    const orders = await Order.find()
      .populate("orderLog user")
      .sort({ createdAt: -1 }) // Sort orders by creation date (newest first)
      .skip(skip)
      .limit(limit)
      .lean();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Orders fetched successfully",
        orders,
        pagination: {
          total: totalOrders,
          page,
          limit,
          totalPages: Math.ceil(totalOrders / limit),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
