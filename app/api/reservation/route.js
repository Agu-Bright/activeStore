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
//   } else if (session && session?.user?.role !== "sub-admin") {
//     return Response.json({ message: "Forbidden request" }, { status: 403 });
//   }

//   const searchParams = req.nextUrl.searchParams;
//   const queryParams = {};

//   searchParams.forEach((value, key) => {
//     queryParams[key] = value;
//   });
//   try {
//     await connectDB;

//     //get user
//     const user = await User.findById(session?.user?.id);
//     if (!user) {
//       return Response.json(
//         { message: "No user with this id found" },
//         { status: 403 }
//       );
//     }

//     //fetch reservation for this users restaurant
//     const resperpage = 8;
//     const reservationCount = await Reservation.countDocuments({
//       resOwner: session?.user?.id,
//     });
//     const apiFeatures = new ApiFeatures(
//       Reservation.find({ restaurant: user?.restaurant }).populate(
//         "customer restaurant"
//       ),
//       queryParams
//     )
//       .search()
//       .filter()
//       .sort();

//     apiFeatures.paginate(resperpage);
//     let reservations = await apiFeatures.query;
//     let filteredReservationCount = reservations.length;
//     const numberOfPages = Math.ceil(reservationCount / resperpage);
//     const searchNumberOfPages = Math.ceil(
//       filteredReservationCount / resperpage
//     );

//     return Response.json(
//       {
//         success: true,
//         reservations,
//         reservationCount,
//         filteredReservationCount,
//         resperpage,
//         numberOfPages,
//         searchNumberOfPages,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(`${error}`, { status: 500 });
//   }
// };
