import { formatPrice, product } from "@/lib/product";
import { CheckCircle2, Home } from "lucide-react";
import Link from "next/link";

type ThankYouPageProps = {
  searchParams: {
    product?: string;
    quantity?: string;
    total?: string;
    orderId?: string;
  };
};

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const productName = searchParams.product || product.name;
  const quantity = Number(searchParams.quantity || 1);
  const total = Number(searchParams.total || product.launchPrice);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-4 py-10">
      <section className="w-full max-w-2xl rounded-lg border border-ink/10 bg-white p-6 text-center shadow-soft sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-leaf-100 text-leaf-700">
          <CheckCircle2 size={34} />
        </div>
        <h1 className="mt-6 text-4xl font-black text-ink">Thank you for your order!</h1>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-ink/68">
          Our sales representative will call you soon to confirm your order.
        </p>

        <div className="mt-8 rounded-lg bg-[#fffaf7] p-5 text-left">
          {searchParams.orderId ? (
            <SummaryRow label="Order ID" value={searchParams.orderId} />
          ) : null}
          <SummaryRow label="Product ordered" value={productName} />
          <SummaryRow label="Quantity" value={String(quantity)} />
          <SummaryRow label="Total price" value={formatPrice(total)} />
          <SummaryRow label="Payment method" value="Cash On Delivery" />
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-tomato-600 px-6 py-3 text-sm font-black text-white shadow-soft transition hover:bg-tomato-700"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </section>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink/10 py-3 last:border-b-0">
      <span className="text-sm font-semibold text-ink/58">{label}</span>
      <span className="text-right text-sm font-black text-ink">{value}</span>
    </div>
  );
}
