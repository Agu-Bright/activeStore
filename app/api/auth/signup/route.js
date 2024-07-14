import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { sendMail } from "@utils/nodemailer";

export const POST = async (req, res) => {
  try {
    await connectDB;
    const body = await req.json();
    if (
      !body ||
      !body.accountName ||
      !body.phoneNumber ||
      !body.withdrawalPassword ||
      !body.password ||
      !body.confirmPassword ||
      !body.sex
    )
      return new Response(
        JSON.stringify({ success: false, message: "provide form data" }),
        {
          status: 404,
        }
      );
    if (body.password !== body.confirmPassword) {
      return new Response(
        JSON.stringify({ success: false, message: "passwords dont match" }),
        {
          status: 400,
        }
      );
    }
    const user = await User.create({
      accountName: body.accountName,
      phoneNumber: body.phoneNumber,
      withdrawalPassword: body.withdrawalPassword,
      password: body.password,
      confirmPassword: body.confirmPassword,
      sex: body.sex,
      referalCode: body?.referalCode,
      email: body?.email,
    });

    //create wallet for this user
    const _wallet = await Wallet.create({
      user: user._id,
    });
    await sendMail("welcome", user.accountName, user.email);

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (error) {
    if ((error.code = 11000 && error.keyPattern && error.keyValue)) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exist" }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
