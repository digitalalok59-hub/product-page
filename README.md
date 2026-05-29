# WarmBox Cash On Delivery Funnel

This is a complete Next.js product sales funnel for WarmBox Portable Food Warmer.

## Recommended Tech Stack

- Next.js App Router for landing pages and secure API routes
- Tailwind CSS for a premium mobile-friendly design
- Google Sheets API for order storage
- Nodemailer with Gmail SMTP for order notification emails
- Zod for backend validation
- Vercel for deployment

## Order Flow

1. Customer clicks a CTA button on the landing page.
2. Product name, quantity, price per piece, and total price are passed to `/checkout`.
3. Customer enters name, phone, email, and exact location.
4. Checkout submits the order to `POST /api/order`.
5. The API validates the order, creates an Order ID, adds date/time, sets payment method to `Cash On Delivery`, and sets status to `New Order`.
6. The order is saved to Google Sheets.
7. A professional order notification email is sent to the business email.
8. A customer confirmation email is sent to the customer.
9. The customer is redirected to `/thank-you`.

## Checkout Form Data

The checkout page automatically receives:

- Product Name
- Quantity
- Price Per Piece
- Total Price

Customers only enter:

- Full Name
- Phone Number
- Email Address
- Exact Location

## Google Spreadsheet Setup

Create a Google Spreadsheet and add a tab named:

```text
warmbox order
```

Add these columns in row 1:

```text
Order ID
Date & Time
Customer Name
Phone Number
Email Address
Exact Location
Product Name
Quantity
Price Per Piece
Total Price
Payment Method
Order Status
Notes
```

### Add Filters

1. Select row 1.
2. Go to `Data`.
3. Click `Create a filter`.

### Add Order Status Dropdown

1. Select the `Order Status` column.
2. Go to `Data` then `Data validation`.
3. Add dropdown options:

```text
New Order
Order Confirmed
Order Ongoing
Delivered
Cancelled
```

### Get the Google Sheet ID

Open your spreadsheet URL:

```text
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
```

Copy the value between `/d/` and `/edit`.

### Google Service Account

1. Create a Google Cloud project.
2. Enable the Google Sheets API.
3. Create a Service Account.
4. Create a JSON key for that service account.
5. Copy `client_email` into `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
6. Copy `private_key` into `GOOGLE_PRIVATE_KEY`.
7. Share your Google Sheet with the service account email and give it editor access.

## Email Notification Setup

This project uses Nodemailer with SMTP. For Gmail, use an App Password rather than your normal Gmail password.

Required email variables:

```text
BUSINESS_EMAIL=digital.alok59@gmail.com
EMAIL_FROM=WarmBox <digital.alok59@gmail.com>
BRAND_NAME=WarmBox
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=digital.alok59@gmail.com
SMTP_PASS=your_gmail_app_password
```

The API sends:

- Business email subject: `New Product Order Received - [Order ID]`
- Customer email subject: `Your Order Has Been Received - WarmBox`

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BUSINESS_EMAIL=digital.alok59@gmail.com
EMAIL_FROM=WarmBox <digital.alok59@gmail.com>
BRAND_NAME=WarmBox

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=warmbox order
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=digital.alok59@gmail.com
SMTP_PASS=

EMAIL_SERVICE_API_KEY=

FRONTEND_URL=http://localhost:3000
```

## How to Test Order Submission

1. Add all required values in `.env.local`.
2. Start the app:

```bash
npm run dev
```

3. Open `http://localhost:3000`.
4. Click `Order Now`.
5. Fill in checkout details.
6. Submit the order.
7. Confirm:

- A new row appears in Google Sheets.
- The business email receives the order notification.
- The customer email receives the confirmation email.
- The browser redirects to the thank you page.

If credentials are missing or incorrect, the checkout page will show a clear error and will not redirect.

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add every value from `.env.example` in Vercel Project Settings.
4. Set `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to your production domain.
5. Deploy.

The API route `/api/order` runs server-side on Vercel, so Google credentials and SMTP passwords are not exposed to customers.

## Product Notes

- Online payment is not included.
- Payment method is fixed as `Cash On Delivery`.
- The product reels section is not included because no reel links were provided.
- Product images are stored in `public/images` as PNG files.
