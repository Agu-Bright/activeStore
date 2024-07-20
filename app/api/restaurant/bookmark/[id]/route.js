// const { default: cloudinary } = require("@utils/cloudinary");
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import { NextResponse } from "next/server";
// import User from "@models/user";
// import Restaurant from "@models/restaurant";

// export const GET = async (req, { params }) => {
//   //check if user is authenticated
//   const session = await getServerSession(
//     req,
//     {
//       ...NextResponse,
//       getHeader: (name) => NextResponse.headers?.get(name),
//       setHeader: (name, value) => NextResponse.headers?.set(name, value),
//     },
//     authOptions
//   );
//   if (!session) {
//     return Response.json(
//       { message: "You must be logged in." },
//       { status: 401 }
//     );
//   }
//   try {
//     await connectDB;
//     const id = params.id;
//     const restaurant = await Restaurant.findById(id);
//     const user = await User.findById(session.user.id);
//     if (!restaurant) {
//       return Response.json(
//         { success: false, message: "No restaurant found" },
//         { status: 404 }
//       );
//     }
//     if (!user) {
//       return Response.json(
//         { success: false, message: "No User found" },
//         { status: 404 }
//       );
//     }
//     //check if user already liked
//     const isLiked = restaurant.likes.find(
//       (id) => id.toString() === session.user.id.toString()
//     );
//     //if true, remove like
//     if (isLiked) {
//       restaurant.likes.pop(session.user.id);
//       user.likedRestaurants.pop(restaurant._id);
//     }
//     //else add like
//     else {
//       restaurant.likes.push(session.user.id);
//       user.likedRestaurants.push(restaurant._id);
//     }

//     await restaurant.save();
//     await user.save();

//     return Response.json({ message: "success", restaurant }, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { success: false, message: "Error uploading file" },
//       { status: 500 }
//     );
//   }
// };
