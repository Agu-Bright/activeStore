import mongoose from "mongoose";

const orderModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  logs: [
    {
      log: {
        type: String,
      },
      available: {
        type: Boolean,
        default: true,
      },
    },
  ],
  orderLog: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Log",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.models.Order || mongoose.model("Order", orderModel);

export default Order;