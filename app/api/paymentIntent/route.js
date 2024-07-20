// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import { NextResponse } from "next/server";
// import User from "@models/user";
// const stripe = require("stripe")(process.env.STRIPE_API_KEY);

// export const POST = async (req, { params }) => {
//   //check if user is authenticated is have a role of seller
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

//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000,
//       currency: "gbp",
//       // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     return Response.json(
//       { message: "success", clientSecret: paymentIntent.client_secret },
//       { status: 200 }
//     );
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// };
