// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import Reservation from "@models/booking";
// import { NextResponse } from "next/server";
// import ApiFeatures from "@utils/apiFeatures";
// import RestaurantOwner from "@models/restaurantOwner";
// import User from "@models/user";
// import { sendMail } from "@utils/nodemailer";

// //admin get my reservations
// export const PUT = async (req, { params }) => {
//   //check if user is authenticated and is an admin
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
//   } else if (session && session?.user?.role !== "admin") {
//     return Response.json({ message: "Forbidden request" }, { status: 403 });
//   }

//   try {
//     await connectDB;
//     const { id } = params;
//     const result = await RestaurantOwner.findById(id).populate("user");

//     if (!result) {
//       return Response.json(
//         { message: "No restaurant request found" },
//         { status: 404 }
//       );
//     }

//     const user = await User.findById(result?.user?._id);
//     if (!user) {
//       return Response.json(
//         { message: "No user with id found" },
//         { status: 404 }
//       );
//     }

//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(expirationDate.getDate() + 30);

//     //update user
//     user.isRestaurant = true;
//     user.expiryDate = expirationDate;
//     user.role = "sub-admin";
//     await user.save();

//     //update restaurantOwner
//     result.isSubscribed = true;
//     result.expiryDate = expirationDate;
//     result.status = "approved";
//     result.isRestaurant = "true";
//     await result.save();

//     //send Email to user--- TODO
//     await sendMail("acceptRequest", user.fullName, user.email);

//     return Response.json(
//       {
//         success: true,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(`${error}`, { status: 500 });
//   }
// };
