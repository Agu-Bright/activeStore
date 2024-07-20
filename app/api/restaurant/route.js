// import Restaurant from "@models/restaurant";
// import ApiFeatures from "@utils/apiFeatures";
// import connectDB from "@utils/connectDB";

// export const GET = async (req, res) => {
//   const searchParams = req.nextUrl.searchParams;
//   const queryParams = {};

//   searchParams.forEach((value, key) => {
//     queryParams[key] = value;
//   });

//   try {
//     await connectDB;
//     const resperpage = 8;
//     const restaurantCount = await Restaurant.countDocuments();
//     const apiFeatures = new ApiFeatures(Restaurant.find(), queryParams)
//       .search()
//       .filter()
//       .sort();

//     apiFeatures.paginate(resperpage);
//     let restaurants = await apiFeatures.query;
//     let filteredRestaurantCount = restaurants.length;
//     const numberOfPages = Math.ceil(restaurantCount / resperpage);
//     const searchNumberOfPages = Math.ceil(filteredRestaurantCount / resperpage);

//     return Response.json(
//       {
//         success: true,
//         restaurants,
//         restaurantCount,
//         filteredRestaurantCount,
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
