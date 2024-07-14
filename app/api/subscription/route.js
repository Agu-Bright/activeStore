const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const productId = "prod_PzPdFRRYDt40bS";
const priceId = "price_1PF6eLFxvZCJxGjnOPix67fm";

export const POST = async (req, res) => {
  //   const product = await stripe.products.create({
  //     name: "Basic Plan",
  //   });

  const price = await stripe.prices.create({
    product: productId,
    unit_amount: 9500,
    currency: "gbp",
    recurring: {
      interval: "month",
    },
  });

  return Response.json(
    {
      success: true,
    },
    { status: 200 }
  );
};

//creating a subscription

//==> get the pricing model
