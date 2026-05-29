"use client";

import { product } from "@/lib/product";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

type CtaButtonProps = {
  quantity?: number;
  label?: string;
  variant?: "primary" | "secondary";
};

export function checkoutHref(quantity = 1) {
  const params = new URLSearchParams({
    product: product.name,
    quantity: String(quantity),
    price: String(product.launchPrice),
    total: String(product.launchPrice * quantity)
  });

  return `/checkout?${params.toString()}`;
}

export function CtaButton({
  quantity = 1,
  label = "Order Now",
  variant = "primary"
}: CtaButtonProps) {
  const className =
    variant === "primary"
      ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-tomato-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-tomato-700"
      : "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-tomato-500 hover:text-tomato-700";

  return (
    <Link href={checkoutHref(quantity)} className={className}>
      <ShoppingBag size={18} aria-hidden="true" />
      <span>{label}</span>
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
