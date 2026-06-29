import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json().catch(() => ({}));
    const { courseId, couponCode, affiliateCode } = body as {
      courseId?: string;
      couponCode?: string;
      affiliateCode?: string;
    };

    const course = await db.course.findFirst({
      where: courseId
        ? { id: courseId, published: true }
        : { published: true },
      orderBy: { order: "asc" },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Kursus ikke fundet" },
        { status: 404 }
      );
    }

    let price = course.price;

    if (couponCode) {
      const coupon = await db.coupon.findUnique({
        where: { code: couponCode },
      });

      if (
        coupon &&
        coupon.active &&
        (!coupon.expiresAt || coupon.expiresAt > new Date()) &&
        (!coupon.maxUses || coupon.usedCount < coupon.maxUses)
      ) {
        if (coupon.type === "PERCENTAGE") {
          price = Math.round(price * (1 - coupon.value / 100));
        } else {
          price = Math.max(0, price - coupon.value);
        }
      }
    }

    const origin = req.headers.get("origin") ?? process.env.NEXTAUTH_URL!;

    const checkoutSession = await createCheckoutSession({
      courseId: course.id,
      courseTitle: course.title,
      priceInDKK: price,
      customerEmail: session?.user?.email ?? undefined,
      couponCode,
      affiliateCode,
      successUrl: `${origin}/dashboard?success=true`,
      cancelUrl: `${origin}/#pris`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Kunne ikke oprette betalingssession" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin") ?? process.env.NEXTAUTH_URL!;

  const course = await db.course.findFirst({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  if (!course) {
    return NextResponse.redirect(`${origin}/#pris`);
  }

  const url = new URL(req.url);
  const couponCode = url.searchParams.get("coupon") ?? undefined;
  const affiliateCode = url.searchParams.get("ref") ?? undefined;

  let price = course.price;

  if (couponCode) {
    const coupon = await db.coupon.findUnique({
      where: { code: couponCode },
    });

    if (
      coupon &&
      coupon.active &&
      (!coupon.expiresAt || coupon.expiresAt > new Date()) &&
      (!coupon.maxUses || coupon.usedCount < coupon.maxUses)
    ) {
      if (coupon.type === "PERCENTAGE") {
        price = Math.round(price * (1 - coupon.value / 100));
      } else {
        price = Math.max(0, price - coupon.value);
      }
    }
  }

  const checkoutSession = await createCheckoutSession({
    courseId: course.id,
    courseTitle: course.title,
    priceInDKK: price,
    couponCode,
    affiliateCode,
    successUrl: `${origin}/dashboard?success=true`,
    cancelUrl: `${origin}/#pris`,
  });

  return NextResponse.redirect(checkoutSession.url!);
}
