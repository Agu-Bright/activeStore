// import Restaurant from "@models/restaurant";
// import connectDB from "@utils/connectDB";
// import User from "@models/user";
// //get single restaurant
// export const GET = async (req, { params }) => {
//   try {
//     await connectDB;
//     const id = params.id;
//     const restaurnt = await Restaurant.findById(id).populate("reviews.user");
//     if (!restaurnt) {
//       return Response.json(
//         { message: `No restaurant found with Id: ${id}` },
//         { status: 404 }
//       );
//     }
//     return Response.json(restaurnt, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// };
