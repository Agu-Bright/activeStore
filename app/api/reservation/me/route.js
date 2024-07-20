// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import Reservation from "@models/booking";
// import { NextResponse } from "next/server";
// import ApiFeatures from "@utils/apiFeatures";
// import User from "@models/user";

// //sub-admin get my reservations
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
//   const now = new Date();
//   try {
//     await connectDB;

//     const reservations = await Reservation.find({
//       customer: session.user.id.toString(),
//     }).populate("customer restaurant");

//     const activeReservations = reservations.filter((reservation) => {
//       const [hours, minutes] = reservation.reservationTime.split(":");
//       const reservationDateTime = new Date(reservation.reservationDate);
//       reservationDateTime.setUTCHours(hours, minutes, 0, 0); // Set hours and minutes in UTC

//       return reservationDateTime >= now;
//     });

//     return Response.json(
//       {
//         activeReservations,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(`${error}`, { status: 500 });
//   }
// };
