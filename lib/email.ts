import { CompleteOrder } from "@/lib/order-schema";
import nodemailer from "nodemailer";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function money(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailShell(content: string) {
  return `
  <div style="margin:0;padding:0;background:#fff7f3;font-family:Arial,Helvetica,sans-serif;color:#1f2428;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fff7f3;padding:24px 0;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border-collapse:collapse;background:#ffffff;border:1px solid #f0ded5;border-radius:8px;overflow:hidden;">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

function row(label: string, value: string | number) {
  return `
    <tr>
      <td style="padding:10px 0;color:#6b7280;font-size:14px;">${label}</td>
      <td align="right" style="padding:10px 0;color:#1f2428;font-size:14px;font-weight:700;">${value}</td>
    </tr>`;
}

export function businessOrderEmail(order: CompleteOrder, brandName: string) {
  const safeBrand = escapeHtml(brandName);
  return emailShell(`
    <tr>
      <td style="background:#1f2428;padding:28px 28px;color:#ffffff;">
        <div style="font-size:22px;font-weight:800;">${safeBrand}</div>
        <div style="margin-top:8px;font-size:15px;color:#ffd7cc;">New product order received</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px;">
        <div style="display:inline-block;background:#e9f7ed;color:#216f3d;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:800;">New Order</div>
        <h1 style="margin:18px 0 8px;font-size:26px;line-height:1.2;color:#1f2428;">Please call the customer soon to confirm this order.</h1>
        <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.7;">Order ID: <strong>${escapeHtml(order.orderId)}</strong><br/>Date & Time: ${escapeHtml(order.dateTime)}</p>

        <h2 style="margin:28px 0 10px;font-size:17px;color:#1f2428;">Customer Details</h2>
        <table role="presentation" width="100%" style="border-collapse:collapse;border-top:1px solid #f1e2dc;border-bottom:1px solid #f1e2dc;">
          ${row("Customer Name", escapeHtml(order.fullName))}
          ${row("Phone Number", escapeHtml(order.phone))}
          ${row("Email Address", escapeHtml(order.email))}
          ${row("Exact Location", escapeHtml(order.location))}
        </table>

        <h2 style="margin:28px 0 10px;font-size:17px;color:#1f2428;">Product Details</h2>
        <table role="presentation" width="100%" style="border-collapse:collapse;border-top:1px solid #f1e2dc;border-bottom:1px solid #f1e2dc;">
          ${row("Product Name", escapeHtml(order.productName))}
          ${row("Quantity", order.quantity)}
          ${row("Price Per Piece", money(order.pricePerPiece))}
          ${row("Total Price", money(order.totalPrice))}
        </table>

        <h2 style="margin:28px 0 10px;font-size:17px;color:#1f2428;">Payment Details</h2>
        <table role="presentation" width="100%" style="border-collapse:collapse;border-top:1px solid #f1e2dc;border-bottom:1px solid #f1e2dc;">
          ${row("Payment Method", order.paymentMethod)}
          ${row("Order Status", order.orderStatus)}
        </table>
      </td>
    </tr>`);
}

export function customerOrderEmail(order: CompleteOrder, brandName: string, supportEmail: string) {
  const safeBrand = escapeHtml(brandName);
  return emailShell(`
    <tr>
      <td style="background:#ef5138;padding:28px 28px;color:#ffffff;">
        <div style="font-size:22px;font-weight:800;">${safeBrand}</div>
        <div style="margin-top:8px;font-size:15px;color:#ffe9e3;">Your order has been received</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px;">
        <h1 style="margin:0 0 12px;font-size:26px;line-height:1.2;color:#1f2428;">Hi ${escapeHtml(order.fullName)}, thank you for your order.</h1>
        <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.7;">We have received your order successfully. Our sales representative will call you soon to confirm your order.</p>

        <div style="margin:24px 0;padding:18px;background:#fff7f3;border:1px solid #f5d4c8;border-radius:8px;">
          <div style="font-size:13px;color:#6b7280;">Order ID</div>
          <div style="margin-top:4px;font-size:18px;font-weight:800;color:#1f2428;">${escapeHtml(order.orderId)}</div>
        </div>

        <table role="presentation" width="100%" style="border-collapse:collapse;border-top:1px solid #f1e2dc;border-bottom:1px solid #f1e2dc;">
          ${row("Product", escapeHtml(order.productName))}
          ${row("Quantity", order.quantity)}
          ${row("Total Price", money(order.totalPrice))}
          ${row("Payment Method", order.paymentMethod)}
        </table>

        <p style="margin:24px 0 0;color:#6b7280;font-size:14px;line-height:1.7;">For support, reply to this email or contact ${escapeHtml(supportEmail)}.</p>
        <p style="margin:20px 0 0;color:#1f2428;font-size:15px;line-height:1.7;">Thank you,<br/><strong>${safeBrand}</strong></p>
      </td>
    </tr>`);
}

export async function sendOrderEmails(order: CompleteOrder) {
  const brandName = process.env.BRAND_NAME || "WarmBox";
  const businessEmail = requiredEnv("BUSINESS_EMAIL");
  const emailFrom = requiredEnv("EMAIL_FROM");
  const smtpHost = requiredEnv("SMTP_HOST");
  const smtpPort = Number(requiredEnv("SMTP_PORT"));
  const smtpUser = requiredEnv("SMTP_USER");
  const smtpPass = requiredEnv("SMTP_PASS");

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  await transporter.sendMail({
    from: emailFrom,
    to: businessEmail,
    replyTo: order.email,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessOrderEmail(order, brandName)
  });

  await transporter.sendMail({
    from: emailFrom,
    to: order.email,
    replyTo: businessEmail,
    subject: `Your Order Has Been Received - ${brandName}`,
    html: customerOrderEmail(order, brandName, businessEmail)
  });
}
