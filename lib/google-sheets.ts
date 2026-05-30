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

  await ensureSheetAndHeaders(sheets, sheetId, tabName);
  await ensurePremiumSheetFormatting(sheets, sheetId, tabName);

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

async function ensureSheetAndHeaders(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string
) {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties(sheetId,title)"
  });

  const sheetExists = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === tabName
  );

  if (!sheetExists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: tabName
              }
            }
          }
        ]
      }
    });
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${tabName}'!A1:M1`
  });

  const existingHeaders = headerResponse.data.values?.[0] || [];
  const hasHeaders = columns.every((column, index) => existingHeaders[index] === column);

  if (!hasHeaders) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${tabName}'!A1:M1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [columns]
      }
    });
  }
}

async function ensurePremiumSheetFormatting(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string
) {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields:
      "sheets.properties(sheetId,title,gridProperties),sheets.basicFilter,sheets.conditionalFormats"
  });

  const sheet = spreadsheet.data.sheets?.find(
    (item) => item.properties?.title === tabName
  );
  const sheetId = sheet?.properties?.sheetId;

  if (!sheet || sheetId === undefined || sheetId === null) {
    return;
  }

  const existingRowCount = sheet.properties?.gridProperties?.rowCount || 1000;
  const hasStatusConditionalRules = Boolean(
    sheet?.conditionalFormats?.some((rule) =>
      rule.ranges?.some(
        (range) => range.sheetId === sheetId && range.startColumnIndex === 11
      )
    )
  );

  const requests: any[] = [
    {
      updateSheetProperties: {
        properties: {
          sheetId,
          gridProperties: {
            frozenRowCount: 1,
            rowCount: Math.max(existingRowCount, 1000),
            columnCount: 13
          }
        },
        fields: "gridProperties.frozenRowCount,gridProperties.rowCount,gridProperties.columnCount"
      }
    },
    {
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: columns.length
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.12, green: 0.14, blue: 0.16 },
            horizontalAlignment: "CENTER",
            verticalAlignment: "MIDDLE",
            textFormat: {
              foregroundColor: { red: 1, green: 1, blue: 1 },
              bold: true,
              fontSize: 11
            }
          }
        },
        fields:
          "userEnteredFormat(backgroundColor,horizontalAlignment,verticalAlignment,textFormat)"
      }
    },
    {
      updateDimensionProperties: {
        range: {
          sheetId,
          dimension: "ROWS",
          startIndex: 0,
          endIndex: 1
        },
        properties: {
          pixelSize: 42
        },
        fields: "pixelSize"
      }
    },
    ...[
      150, 170, 170, 140, 210, 260, 200, 100, 140, 140, 170, 160, 220
    ].map((pixelSize, index) => ({
      updateDimensionProperties: {
        range: {
          sheetId,
          dimension: "COLUMNS",
          startIndex: index,
          endIndex: index + 1
        },
        properties: { pixelSize },
        fields: "pixelSize"
      }
    })),
    {
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 1,
          endRowIndex: 1000,
          startColumnIndex: 0,
          endColumnIndex: columns.length
        },
        cell: {
          userEnteredFormat: {
            verticalAlignment: "MIDDLE",
            wrapStrategy: "WRAP",
            textFormat: {
              foregroundColor: { red: 0.12, green: 0.14, blue: 0.16 },
              fontSize: 10
            }
          }
        },
        fields: "userEnteredFormat(verticalAlignment,wrapStrategy,textFormat)"
      }
    },
    {
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 1,
          endRowIndex: 1000,
          startColumnIndex: 11,
          endColumnIndex: 12
        },
        cell: {
          dataValidation: {
            condition: {
              type: "ONE_OF_LIST",
              values: [
                { userEnteredValue: "New Order" },
                { userEnteredValue: "Order Confirmed" },
                { userEnteredValue: "Order Ongoing" },
                { userEnteredValue: "Delivered" },
                { userEnteredValue: "Cancelled" }
              ]
            },
            strict: true,
            showCustomUi: true
          }
        },
        fields: "dataValidation"
      }
    },
    {
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 1,
          endRowIndex: 1000,
          startColumnIndex: 8,
          endColumnIndex: 10
        },
        cell: {
          userEnteredFormat: {
            numberFormat: {
              type: "NUMBER",
              pattern: '"Rs." #,##0'
            }
          }
        },
        fields: "userEnteredFormat.numberFormat"
      }
    }
  ];

  if (!sheet?.basicFilter) {
    requests.push({
      setBasicFilter: {
        filter: {
          range: {
            sheetId,
            startRowIndex: 0,
            endRowIndex: 1000,
            startColumnIndex: 0,
            endColumnIndex: columns.length
          }
        }
      }
    });
  }

  if (!hasStatusConditionalRules) {
    requests.push(
      ...[
        ["New Order", { red: 1, green: 0.95, blue: 0.82 }, { red: 0.56, green: 0.36, blue: 0 }],
        ["Order Confirmed", { red: 0.87, green: 0.94, blue: 1 }, { red: 0.06, green: 0.29, blue: 0.55 }],
        ["Order Ongoing", { red: 1, green: 0.9, blue: 0.84 }, { red: 0.64, green: 0.19, blue: 0.09 }],
        ["Delivered", { red: 0.87, green: 0.96, blue: 0.89 }, { red: 0.1, green: 0.44, blue: 0.23 }],
        ["Cancelled", { red: 0.98, green: 0.88, blue: 0.88 }, { red: 0.62, green: 0.12, blue: 0.12 }]
      ].map(([status, backgroundColor, foregroundColor]) => ({
        addConditionalFormatRule: {
          rule: {
            ranges: [
              {
                sheetId,
                startRowIndex: 1,
                endRowIndex: 1000,
                startColumnIndex: 11,
                endColumnIndex: 12
              }
            ],
            booleanRule: {
              condition: {
                type: "TEXT_EQ",
                values: [{ userEnteredValue: status }]
              },
              format: {
                backgroundColor,
                textFormat: {
                  foregroundColor,
                  bold: true
                }
              }
            }
          },
          index: 0
        }
      }))
    );
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests
    }
  });
}

export { columns as googleSheetColumns };
