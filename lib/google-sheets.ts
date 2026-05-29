import { CompleteOrder } from "@/lib/order-schema";
import { google } from "googleapis";

const columns = [
  "Order ID",
  "Date & Time",
  "Customer Name",
  "Phone Number",
  "Email Address",
  "Exact Location",
  "Product Name",
  "Quantity",
  "Price Per Piece",
  "Total Price",
  "Payment Method",
  "Order Status",
  "Notes"
];

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export async function appendOrderToGoogleSheet(order: CompleteOrder) {
  const sheetId = requiredEnv("GOOGLE_SHEET_ID");
  const clientEmail = requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = requiredEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || "Orders";

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `'${tabName}'!A:M`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          order.orderId,
          order.dateTime,
          order.fullName,
          order.phone,
          order.email,
          order.location,
          order.productName,
          order.quantity,
          order.pricePerPiece,
          order.totalPrice,
          order.paymentMethod,
          order.orderStatus,
          order.notes
        ]
      ]
    }
  });
}

export { columns as googleSheetColumns };
