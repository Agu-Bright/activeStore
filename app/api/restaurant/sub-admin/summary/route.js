import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Reservation from "@models/booking";
import Restaurant from "@models/restaurant";
import ApiFeatures from "@utils/apiFeatures";
// import { authOptions } from "@utils/auth";
import connectDB from "@utils/connectDB";
import { getServerSession } from "next-auth";
export const GET = async (req, res) => {
  const session = await getServerSession(
    req,
    {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value),
    },
    authOptions
  );
  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  } else if (session && session?.user?.role !== "sub-admin") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }

  try {
    await connectDB;

    //find my restaurant
    const myRestaurant = await Restaurant.findOne({ user: session?.user?.id });
    if (!myRestaurant) {
      return Response.json({ message: "No Rstaurant Found" }, { status: 404 });
    }
    //get total of all reservations for this restaurant
    const totalreservation = await Reservation.countDocuments({
      restaurant: myRestaurant?._id,
    });
    //get total of todays reservations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const reservations = await Reservation.find({
      reservationDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    //get total review count
    const reviewCount = myRestaurant.reviews.length;

    //get rating
    const rating = myRestaurant.rating;

    const data = {
      totalReservations: totalreservation,
      todaysReservations: reservations.length,
      revCount: reviewCount,
      rating: rating,
    };

    return Response.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};
