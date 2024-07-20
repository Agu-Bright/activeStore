// //admin get all restaurant owners
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import Restaurant from "@models/restaurant";
// import ApiFeatures from "@utils/apiFeatures";
// import connectDB from "@utils/connectDB";
// import { getServerSession } from "next-auth";
// import RestaurantOwner from "@models/restaurantOwner";
// export const GET = async (req, res) => {
//   const session = await getServerSession(
//     req,
//     {
//       ...res,
//       getHeader: (name) => res.headers?.get(name),
//       setHeader: (name, value) => res.headers?.set(name, value),
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

//   const searchParams = req.nextUrl.searchParams;
//   const queryParams = {};

//   searchParams.forEach((value, key) => {
//     queryParams[key] = value;
//   });
//   try {
//     await connectDB;
//     const { subscription } = queryParams;

//     if (!subscription) {
//       const result = await RestaurantOwner.find({ status: "pending" }).populate(
//         "user"
//       );

//       return Response.json(
//         {
//           success: true,
//           restaurantRequests: result.reverse(),
//         },
//         { status: 200 }
//       );
//     } else if (subscription === "true") {
//       const today = new Date();
//       const result = await RestaurantOwner.find({
//         expiryDate: { $gte: today },
//       }).populate("user");

//       return Response.json(
//         {
//           success: true,
//           activeRestaurants: result.reverse(),
//         },
//         { status: 200 }
//       );
//     } else if (subscription === "false") {
//       const result = await Restaurant?.find().populate("user");

//       return Response.json(
//         {
//           success: true,
//           restaurants: result.reverse(),
//         },
//         { status: 200 }
//       );
//     }
//   } catch (error) {
//     return new Response(`${error}`, { status: 500 });
//   }
// };
