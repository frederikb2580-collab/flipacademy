import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-06-24.dahlia",
      typescript: true,
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export async function createCheckoutSession({
  courseId,
  courseTitle,
  priceInDKK,
  customerEmail,
  couponCode,
  affiliateCode,
  successUrl,
  cancelUrl,
}: {
  courseId: string;
  courseTitle: string;
  priceInDKK: number;
  customerEmail?: string;
  couponCode?: string;
  affiliateCode?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const s = getStripe();
  const session = await s.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    currency: "dkk",
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: "dkk",
          product_data: {
            name: courseTitle,
            description: `Lifetime adgang til ${courseTitle}`,
          },
          unit_amount: priceInDKK * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      courseId,
      couponCode: couponCode ?? "",
      affiliateCode: affiliateCode ?? "",
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}
