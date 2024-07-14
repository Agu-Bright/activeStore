import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import Withdraw from "@models/Withdrawal";
import bcrypt from "bcryptjs";
export const POST = async (req, res) => {
  const session = await getServerSession(
    req,
    {
      ...NextResponse,
      getHeader: (name) => NextResponse.headers?.get(name),
      setHeader: (name, value) => NextResponse.headers?.set(name, value),
    },
    authOptions
  );
  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  try {
    await connectDB;
    const body = await req.json();
    if (!body || !body.amount || !body.withdrawalPassword)
      return new Response(
        JSON.stringify({ success: false, message: "Incomplet upload details" }),
        {
          status: 404,
        }
      );

    const result = await User.findOne({
      accountName: session.user.accountName,
    });
    if (!result) {
      return new Response(
        JSON.stringify({ success: false, message: "No user found" }),
        {
          status: 404,
        }
      );
    }

    //authenticate password
    const isPasswordCorrect = await bcrypt.compare(
      body.withdrawalPassword,
      result.password
    );
    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid Credentials" }),
        {
          status: 404,
        }
      );
    }

    const wallet = await Wallet.findOne({ user: session?.user?.id });
    if (!wallet) {
      return new Response(
        JSON.stringify({ success: false, message: "No wallet found" }),
        {
          status: 404,
        }
      );
    }
    //create wallet for this user
    const withdraw = await Withdraw.create({
      user: session?.user.id,
      wallet: wallet._id,
      amount: body.amount,
    });
    return new Response(JSON.stringify({ success: true, withdraw }), {
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
