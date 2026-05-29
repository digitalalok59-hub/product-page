import { appendOrderToGoogleSheet } from "@/lib/google-sheets";
import { CompleteOrder, orderSchema } from "@/lib/order-schema";
import { sendOrderEmails } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

function createOrderId() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `WB-${Date.now()}-${random}`;
}

function isAllowedOrigin(request: NextRequest) {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) {
    return true;
  }

  const origin = request.headers.get("origin");
  return !origin || origin === frontendUrl;
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ message: "Request origin is not allowed." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please check the form and try again.",
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const expectedTotal = parsed.data.quantity * parsed.data.pricePerPiece;
    if (parsed.data.totalPrice !== expectedTotal) {
      return NextResponse.json(
        { message: "Total price does not match quantity and price per piece." },
        { status: 400 }
      );
    }

    const order: CompleteOrder = {
      ...parsed.data,
      orderId: createOrderId(),
      dateTime: new Intl.DateTimeFormat("en-NP", {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "Asia/Kathmandu"
      }).format(new Date()),
      paymentMethod: "Cash On Delivery",
      orderStatus: "New Order",
      notes: ""
    };

    await appendOrderToGoogleSheet(order);
    await sendOrderEmails(order);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order submission failed", error);
    const message =
      error instanceof Error
        ? error.message
        : "Order submission failed. Please try again.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
