// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";

// import User from "@models/user";
// // import { getAuthSession } from "@utils/auth";

// export const POST = async (req, res) => {
//   //check if user is authenticated is have a role of seller
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
//   } else if (session && session?.user?.role !== "sub-admin") {
//     return Response.json({ message: "Forbidden request" }, { status: 403 });
//   }
//   try {
//     await connectDB;

//     //check if this user already have a restaurant
//     const themainres = await Restaurant.find({ user: session?.user?.id });
//     if (themainres.length > 0) {
//       return Response.json(
//         { message: "You already have a restaurant" },
//         { status: 403 }
//       );
//     }

//     const formData = await req.formData();
//     const gallery = formData.getAll("gallery");
//     const [objects] = gallery.map((str) => JSON.parse(str));

//     const get = (name) => {
//       const value = formData.get(name); // Fix the parameter here
//       return value;
//     };

//     //now we have the images
//     const data = {
//       name: get("name"),
//       email: get("email"),
//       phoneNumber: get("phoneNumber"),
//       priceRange: [get("minPrice"), get("maxPrice")],
//       cuisine: get("cuisine"),
//       description: get("description"),
//       maxReservation: get("maxReservation"),
//       country: get("country"),
//       addressLine: get("addressLine"),
//       city: get("city"),
//       postalCode: get("postalCode"),
//       locationData: {
//         longitude: get("longitude"),
//         latitude: get("latitude"),
//       },
//       // extraDetail: get("extraDetail"),
//       schedule: {
//         monday: [get("monStart"), get("monEnd"), get("monClose")],
//         tuesday: [get("tuesStart"), get("tuesEnd"), get("tuesClose")],
//         wednesday: [get("wedStart"), get("wedEnd"), get("wedClose")],
//         thursday: [get("thursStart"), get("thursEnd"), get("thursClose")],
//         friday: [get("friStart"), get("friEnd"), get("friClose")],
//         saturday: [get("satStart"), get("satEnd"), get("satClose")],
//         sunday: [get("sunStart"), get("sunEnd"), get("sunClose")],
//       },
//       // website: get("website"),
//       // facebook: get("facebook"),
//       // instagram: get("instagram"),
//       // youtube: get("youtube"),
//       // twitter: get("twitter"),
//       photos: objects,
//       // menu: menusArray,
//       user: session?.user?.id,
//     };

//     const restaurant = await Restaurant.create(data);
//     await User.findByIdAndUpdate(session?.user?.id, {
//       restaurant: restaurant?._id,
//     });

//     return Response.json({ message: "success", restaurant }, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// };
