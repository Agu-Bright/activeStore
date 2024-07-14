import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Restaurant from "@models/restaurant";
import ApiFeatures from "@utils/apiFeatures";
import connectDB from "@utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
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

  const searchParams = req.nextUrl.searchParams;
  const queryParams = {};

  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  try {
    await connectDB;
    const restaurant = await Restaurant.findById(params.id);

    if (!restaurant) {
      return Response.json({ message: "No restaurant found" }, { status: 404 });
    }

    // const resperpage = 8;
    // const restaurantCount = await Restaurant.countDocuments();
    // const apiFeatures = new ApiFeatures(Restaurant.find(), queryParams)
    //   .search()
    //   .filter()
    //   .sort();

    // apiFeatures.paginate(resperpage);
    // let restaurants = await apiFeatures.query;
    // let filteredRestaurantCount = restaurants.length;
    // const numberOfPages = Math.ceil(restaurantCount / resperpage);
    // const searchNumberOfPages = Math.ceil(filteredRestaurantCount / resperpage);

    return Response.json(
      {
        success: true,
        // restaurants,
        // restaurantCount,
        // filteredRestaurantCount,
        // resperpage,
        // numberOfPages,
        // searchNumberOfPages,
      },
      { status: 200 }
    );
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};
