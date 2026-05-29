import { CheckoutForm } from "@/app/checkout/CheckoutForm";
import Link from "next/link";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-bold text-tomato-700 hover:text-tomato-600">
          Back to product
        </Link>
        <div className="mt-8">
          <Suspense>
            <CheckoutForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
