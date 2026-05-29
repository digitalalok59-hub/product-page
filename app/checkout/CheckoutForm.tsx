"use client";

import { formatPrice, product } from "@/lib/product";
import { AlertCircle, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

type FieldErrors = Partial<Record<string, string[]>>;

function numberFromParam(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function CheckoutForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const orderDetails = useMemo(() => {
    const quantity = Math.max(1, Math.floor(numberFromParam(params.get("quantity"), 1)));
    const pricePerPiece = numberFromParam(params.get("price"), product.launchPrice);
    return {
      productName: params.get("product") || product.name,
      quantity,
      pricePerPiece,
      totalPrice: quantity * pricePerPiece
    };
  }, [params]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      location: String(formData.get("location") || ""),
      ...orderDetails
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Order submission failed. Please try again.");
        setFieldErrors(data.errors || {});
        return;
      }

      const thankYouParams = new URLSearchParams({
        product: data.order.productName,
        quantity: String(data.order.quantity),
        total: String(data.order.totalPrice),
        orderId: data.order.orderId
      });
      router.push(`/thank-you?${thankYouParams.toString()}`);
    } catch {
      setError("Something went wrong while submitting your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-md border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-tomato-500 focus:ring-4 focus:ring-tomato-500/10";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
      <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft sm:p-7">
        <h1 className="text-3xl font-black text-ink">Checkout</h1>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Fill in your delivery details. Payment will be collected through Cash On Delivery.
        </p>

        {error ? (
          <div className="mt-5 flex gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            <AlertCircle className="shrink-0" size={19} />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold text-ink">
            Full Name
            <input name="fullName" className={inputClass} autoComplete="name" required />
            {fieldErrors.fullName ? (
              <span className="mt-1 block text-xs text-red-600">{fieldErrors.fullName[0]}</span>
            ) : null}
          </label>
          <label className="text-sm font-bold text-ink">
            Phone Number
            <input name="phone" className={inputClass} autoComplete="tel" required />
            {fieldErrors.phone ? (
              <span className="mt-1 block text-xs text-red-600">{fieldErrors.phone[0]}</span>
            ) : null}
          </label>
          <label className="text-sm font-bold text-ink sm:col-span-2">
            Email Address
            <input name="email" type="email" className={inputClass} autoComplete="email" required />
            {fieldErrors.email ? (
              <span className="mt-1 block text-xs text-red-600">{fieldErrors.email[0]}</span>
            ) : null}
          </label>
          <label className="text-sm font-bold text-ink sm:col-span-2">
            Exact Location
            <textarea
              name="location"
              rows={4}
              className={inputClass}
              placeholder="Kindly share your exact location"
              required
            />
            {fieldErrors.location ? (
              <span className="mt-1 block text-xs text-red-600">{fieldErrors.location[0]}</span>
            ) : null}
          </label>
        </div>
      </div>

      <aside className="rounded-lg border border-ink/10 bg-[#fffaf7] p-5 shadow-soft sm:p-7">
        <div className="flex items-center gap-3 text-sm font-bold text-leaf-700">
          <ShieldCheck size={19} />
          Secure Cash On Delivery Order
        </div>
        <h2 className="mt-4 text-2xl font-black text-ink">Order Summary</h2>

        <div className="mt-6 space-y-4">
          <ReadOnlyField label="Product Name" value={orderDetails.productName} />
          <ReadOnlyField label="Quantity" value={String(orderDetails.quantity)} />
          <ReadOnlyField label="Price Per Piece" value={formatPrice(orderDetails.pricePerPiece)} />
          <ReadOnlyField label="Total Price" value={formatPrice(orderDetails.totalPrice)} strong />
        </div>

        <div className="mt-6 rounded-md bg-white p-4 text-sm leading-6 text-ink/70">
          <strong className="text-ink">Delivery:</strong> {product.deliveryText}
          <br />
          <strong className="text-ink">Payment Method:</strong> Cash On Delivery
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-tomato-600 px-6 py-3 text-sm font-black text-white shadow-soft transition hover:bg-tomato-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Submitting Order...
            </>
          ) : (
            <>
              <LockKeyhole size={18} />
              Order Now
            </>
          )}
        </button>
      </aside>
    </form>
  );
}

function ReadOnlyField({
  label,
  value,
  strong = false
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-[0.12em] text-ink/50">
        {label}
      </label>
      <input
        readOnly
        value={value}
        className={`mt-2 w-full rounded-md border border-ink/10 bg-white px-4 py-3 text-sm outline-none ${
          strong ? "font-black text-tomato-700" : "font-bold text-ink"
        }`}
      />
    </div>
  );
}
