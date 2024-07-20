// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import Restaurant from "@models/restaurant";
// // import { authOptions } from "@utils/auth";
// import connectDB from "@utils/connectDB";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";
// //get single restaurant
// export const DELETE = async (req, { params }) => {
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
//   } else if (session && session?.user?.role !== "sub-admin") {
//     return Response.json({ message: "Forbidden request" }, { status: 403 });
//   }

//   try {
//     await connectDB;
//     const id = params.id;
//     const restaurant = await Restaurant.findById(id);
//     if (!restaurant) {
//       return Response.json(
//         { message: `No restaurant found with Id: ${id}` },
//         { status: 404 }
//       );
//     }
//     const state =
//       restaurant?.user._id.toString() === session?.user?.id.toString();
//     if (!state) {
//       return Response.json(
//         { message: `You are not authorized to perform this operation` },
//         { status: 403 }
//       );
//     }

//     await Restaurant.findByIdAndDelete(id);
//     return Response.json({ success: true }, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// };
