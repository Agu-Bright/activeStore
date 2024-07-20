// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import Reservation from "@models/booking";
// import { NextResponse } from "next/server";
// import ApiFeatures from "@utils/apiFeatures";

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
//   } else if (session && session?.user?.role !== "sub-admin") {
//     return Response.json({ message: "Forbidden request" }, { status: 403 });
//   }

//   try {
//     await connectDB;

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const endOfDay = new Date(today);
//     endOfDay.setHours(23, 59, 59, 999);

//     const query = {
//       reservationDay: {
//         $gte: today, // Greater than or equal to the beginning of today
//         $lte: endOfDay, // Less than or equal to the end of today
//       },
//       resOwner: session?.user?.id,
//     };

//     const todayReservations = await Reservation.find(query).populate(
//       "customer restaurant"
//     );

//     return Response.json(
//       {
//         success: true,
//         reservations: todayReservations,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(`${error}`, { status: 500 });
//   }
// };
