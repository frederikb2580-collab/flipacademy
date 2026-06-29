import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import bcrypt from "bcryptjs";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendWelcomeEmail, sendOrderConfirmation } from "@/lib/email";
import { assignRole } from "@/lib/discord";
import { generateAffiliateCode } from "@/lib/utils";
import { logPurchase, logRefund, logNewUser, logError } from "@/lib/discord-logger";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const courseId = session.metadata?.courseId;
    const couponCode = session.metadata?.couponCode;
    const affiliateCodeStr = session.metadata?.affiliateCode;

    if (!courseId || !session.customer_details?.email) {
      return NextResponse.json({ received: true });
    }

    const email = session.customer_details.email;
    const name =
      session.customer_details.name ?? email.split("@")[0];

    let user = await db.user.findUnique({ where: { email } });

    if (!user) {
      const tempPassword = await bcrypt.hash(
        Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
        12
      );

      user = await db.user.create({
        data: {
          email,
          name,
          password: tempPassword,
        },
      });

      await logNewUser(email, name);
    }

    let couponId: string | undefined;
    if (couponCode) {
      const coupon = await db.coupon.findUnique({
        where: { code: couponCode },
      });
      if (coupon) {
        couponId = coupon.id;
        await db.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    let affiliateCodeId: string | undefined;
    if (affiliateCodeStr) {
      const affiliateCode = await db.affiliateCode.findUnique({
        where: { code: affiliateCodeStr },
      });
      if (affiliateCode) {
        affiliateCodeId = affiliateCode.id;

        const commission = Math.round(
          (session.amount_total! / 100) * (affiliateCode.commissionRate / 100)
        );

        await db.affiliateCode.update({
          where: { id: affiliateCode.id },
          data: { totalEarned: { increment: commission } },
        });

        await db.referral.create({
          data: {
            affiliateCodeId: affiliateCode.id,
            referredUserId: user.id,
            commission,
          },
        });
      }
    }

    const order = await db.order.create({
      data: {
        userId: user.id,
        courseId,
        status: "COMPLETED",
        amount: session.amount_total! / 100,
        currency: session.currency?.toUpperCase() ?? "DKK",
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent as string,
        couponId,
        affiliateCodeId,
      },
    });

    await db.transaction.create({
      data: {
        orderId: order.id,
        type: "PAYMENT",
        amount: session.amount_total! / 100,
        currency: session.currency?.toUpperCase() ?? "DKK",
        stripeEventId: event.id,
      },
    });

    const existingAffiliate = await db.affiliateCode.findUnique({
      where: { userId: user.id },
    });

    if (!existingAffiliate) {
      await db.affiliateCode.create({
        data: {
          userId: user.id,
          code: generateAffiliateCode(),
        },
      });
    }

    const course = await db.course.findUnique({ where: { id: courseId } });

    await logPurchase(
      email,
      name,
      session.amount_total! / 100,
      course?.title ?? "FlipAcademy Kursus",
      couponCode || undefined
    );

    try {
      await sendWelcomeEmail(email, name);
      await sendOrderConfirmation(email, name, course?.title ?? "FlipAcademy Kursus", session.amount_total! / 100);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      await logError("Email", String(emailErr));
    }

    const discordUser = await db.discordUser.findUnique({
      where: { userId: user.id },
    });

    if (discordUser) {
      try {
        await assignRole(discordUser.discordId);
        await db.discordUser.update({
          where: { id: discordUser.id },
          data: { roleAssigned: true },
        });
      } catch (discordErr) {
        console.error("Discord role assignment failed:", discordErr);
      }
    }

    await db.log.create({
      data: {
        userId: user.id,
        action: "PURCHASE_COMPLETED",
        details: `Course: ${course?.title}, Amount: ${session.amount_total! / 100} ${session.currency?.toUpperCase()}`,
      },
    });
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;

    const order = await db.order.findFirst({
      where: { stripePaymentId: charge.payment_intent as string },
      include: { user: { include: { discordUser: true } } },
    });

    if (order) {
      await db.order.update({
        where: { id: order.id },
        data: { status: "REFUNDED" },
      });

      await db.transaction.create({
        data: {
          orderId: order.id,
          type: "REFUND",
          amount: charge.amount_refunded / 100,
          currency: charge.currency.toUpperCase(),
          stripeEventId: event.id,
        },
      });

      if (order.user.discordUser) {
        try {
          const { removeRole } = await import("@/lib/discord");
          await removeRole(order.user.discordUser.discordId);
          await db.discordUser.update({
            where: { id: order.user.discordUser.id },
            data: { roleAssigned: false },
          });
        } catch (discordErr) {
          console.error("Discord role removal failed:", discordErr);
        }
      }

      await logRefund(order.user.email, charge.amount_refunded / 100, order.id);

      await db.log.create({
        data: {
          userId: order.userId,
          action: "ORDER_REFUNDED",
          details: `Order: ${order.id}, Amount: ${charge.amount_refunded / 100}`,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
