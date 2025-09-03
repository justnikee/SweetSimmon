import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
  typescript: true,
});

export async function POST(request: NextRequest) {
  const body = await request.text();

  // Fix 1: Await headers() and use proper typing
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      console.error("Missing stripe signature or webhook secret");
      return NextResponse.json(
        { error: "Missing stripe signature or webhook secret" },
        { status: 400 }
      );
    }

    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  console.log(`✅ Webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session.metadata?.userId) {
          console.error("Missing userId in session metadata");
          return NextResponse.json(
            { error: "Missing userId in session metadata" },
            { status: 400 }
          );
        }

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          {
            expand: ["data.price.product"],
          }
        );

        // Fix 2: Handle undefined values properly
        const customerEmail =
          session.customer_email || session.customer_details?.email || null;

        await storePurchaseInDatabase({
          userId: session.metadata.userId,
          sessionId: session.id,
          customerEmail: customerEmail, // Now properly typed as string | null
          totalAmount: session.amount_total || 0,
          currency: session.currency || "usd",
          items: lineItems.data,
          status: "completed",
        });

        console.log(`✅ Order created for session: ${session.id}`);
        break;

      case "checkout.session.async_payment_succeeded":
        const asyncSession = event.data.object as Stripe.Checkout.Session;
        console.log(`✅ Async payment succeeded: ${asyncSession.id}`);
        await updateOrderStatus(asyncSession.id, "completed");
        break;

      case "checkout.session.async_payment_failed":
        const failedSession = event.data.object as Stripe.Checkout.Session;
        console.log(`❌ Async payment failed: ${failedSession.id}`);
        await updateOrderStatus(failedSession.id, "failed");
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error: any) {
    console.error(`❌ Error processing webhook: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook processing error: ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function storePurchaseInDatabase(purchaseData: {
  userId: string;
  sessionId: string;
  customerEmail: string | null; // Properly typed
  totalAmount: number;
  currency: string;
  items: Stripe.LineItem[];
  status: string;
}) {
  try {
    await prisma.$transaction(async (tx) => {
      const order = await tx.orders.create({
        data: {
          profile_id: purchaseData.userId,
          session_id: purchaseData.sessionId,
          customer_email: purchaseData.customerEmail,
          total_amount: purchaseData.totalAmount,
          currency: purchaseData.currency,
          status: purchaseData.status,
        },
      });

      const orderItemsData = purchaseData.items.map((item) => {
        const product = item.price?.product as Stripe.Product;
        const productName =
          typeof product === "string"
            ? item.description || "Unknown Product"
            : product?.name || item.description || "Unknown Product";

        return {
          order_id: order.id,
          product_id:
            typeof product === "string" ? product : product?.id || null,
          product_name: productName,
          quantity: item.quantity || 1,
          price_per_unit: item.price?.unit_amount || 0,
          total_price: item.amount_total || 0,
        };
      });

      if (orderItemsData.length > 0) {
        await tx.order_items.createMany({
          data: orderItemsData,
        });
      }

      console.log(
        `✅ Successfully stored order ${order.id} with ${orderItemsData.length} items`
      );
    });
  } catch (error: any) {
    console.error(`❌ Database error: ${error.message}`);
    throw new Error(`Failed to store purchase: ${error.message}`);
  }
}

async function updateOrderStatus(sessionId: string, status: string) {
  try {
    await prisma.orders.updateMany({
      where: {
        session_id: sessionId,
      },
      data: {
        status: status,
      },
    });

    console.log(
      `✅ Updated order status to ${status} for session: ${sessionId}`
    );
  } catch (error: any) {
    console.error(`❌ Failed to update order status: ${error.message}`);
    throw error;
  }
}
