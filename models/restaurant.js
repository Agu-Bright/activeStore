import mongoose from "mongoose";
import cron from "node-cron";
const restaurantModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  addressLine: {
    type: String,
    required: [true, "Provide your restaurat address"],
  },
  country: {
    type: String,
    enum: {
      values: ["United Kingdom", "others"],
    },
    required: [true, "Provide your country"],
  },
  city: {
    type: String,
    enum: {
      values: ["York City", "others"],
    },
    required: [true, "Provide your city"],
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  postalCode: {
    type: Number,
    required: [true, "Provide your postal code"],
  },

  priceRange: {
    type: [String],
    required: [true, "Provide your restaurant Price Range"],
  },

  phoneNumber: {
    type: String,
    required: [true, "Provide your phone number"],
  },
  description: {
    type: String,
    required: [true, "GIve a brief description of your restaurant"],
  },
  photos: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  menu: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  locationData: {
    longitude: {
      type: Number,
      required: [true, "Longitude value is required"],
    },
    latitude: {
      type: Number,
      required: [true, "Latitude value is required"],
    },
    formattedAddress: {
      type: String,
    },
    googlePlaceId: {
      type: String,
    },
  },
  cuisine: {
    type: String,
    enum: {
      values: [
        "American",
        "Italian",
        "Chinese",
        "Mexican",
        "Japanese",
        "Indian",
        "French",
        "Thai",
        "Spanish",
        "Greek",
        "Mediterranean",
        "Vietnamese",
        "Korean",
        "Lebanese",
        "Turkish",
        "Brazilian",
        "Moroccan",
        "Ethiopian",
        "Russian",
        "British",
        "Cajun/Creole",
        "Caribbean",
        "German",
        "Irish",
        "Australian",
        "Swiss",
        "Canadian",
        "Scandinavian",
        "Middle Eastern",
        "African",
        "Sea food",
        "Vegetarian",
        "Barbecue",
      ],
    },
  },
  segmentation: {
    type: String,
    // required: [true, "Please select the category for this product"],
    enum: {
      values: ["Expensive", "Medium", "Normal"],
      message: "Please select the correct categoty for this resturant",
    },
  },

  schedule: {
    monday: {
      type: [String, String, Boolean],
      required: [true],
    },
    tuesday: {
      type: [String],
      required: [true],
    },
    wednesday: {
      type: [String],
      required: [true],
    },
    thursday: {
      type: [String],
      required: [true],
    },
    friday: {
      type: [String],
      required: [true],
    },
    saturday: {
      type: [String],
      required: [true],
    },
    sunday: {
      type: [String],
      required: [true],
    },
  },

  rating: {
    type: Number,
    default: 0,
  },

  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      foodRating: {
        type: Number,
        required: true,
      },
      serviceRating: {
        type: Number,
        required: true,
      },
      ambianceRating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      photo: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      reply: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
        },
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  website: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Enter Restaurant Email"],
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  youtube: {
    type: String,
  },
  twitter: {
    type: String,
  },

  dailyBookedCount: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  open: {
    type: Boolean,
  },
  Amenities: {
    type: Array,
  },
  maxReservation: {
    type: Number,
  },
  extraDetail: {
    type: String,
  },
  hide: {
    type: Boolean,
    default: false,
  },
  video: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantModel);

cron.schedule(
  "0 12 * * *",
  async () => {
    try {
      await Restaurant.updateMany({}, { $set: { dailyBookedCount: 0 } });
    } catch (error) {
      console.error("Error Setting Daily Booked Count", error);
    }
  },
  {
    timezone: "Europe/London", // Specify the time zone for York City, UK
  }
);

export default Restaurant;
