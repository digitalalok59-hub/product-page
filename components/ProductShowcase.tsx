"use client";

import { CtaButton } from "@/components/CtaButton";
import { formatPrice, product } from "@/lib/product";
import { ChevronLeft, ChevronRight, Minus, Plus, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ProductShowcase() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const total = quantity * product.launchPrice;

  const move = (direction: number) => {
    setActiveImage((current) =>
      (current + direction + product.images.length) % product.images.length
    );
  };

  return (
    <section id="order" className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="rounded-lg border border-tomato-100 bg-[#fffaf7] p-4 shadow-soft">
          <div className="image-theme-frame relative flex aspect-square items-center justify-center overflow-hidden rounded-md">
            <Image
              src={product.images[activeImage]}
              alt={`${product.name} image ${activeImage + 1}`}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-contain p-7"
              priority={activeImage === 0}
            />
            <button
              type="button"
              aria-label="Previous product image"
              onClick={() => move(-1)}
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow transition hover:text-tomato-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next product image"
              onClick={() => move(1)}
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow transition hover:text-tomato-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setActiveImage(index)}
                className={`image-theme-frame relative aspect-square rounded-md border transition ${
                  activeImage === index ? "border-tomato-500" : "border-ink/10"
                }`}
                aria-label={`View product image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-contain p-3"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700">
            Cash On Delivery Available
          </p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/70">
            Carry your food. Plug it in. Enjoy a warm meal wherever you are.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.benefits.slice(0, 6).map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-md border border-ink/10 bg-white p-3 text-sm font-semibold"
              >
                <ShieldCheck className="shrink-0 text-leaf-600" size={18} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-lg border border-tomato-100 bg-tomato-50 p-5">
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <span className="text-4xl font-black text-tomato-700">
                {formatPrice(product.launchPrice)}
              </span>
              <span className="pb-1 text-base font-semibold text-ink/45 line-through">
                {formatPrice(product.regularPrice)}
              </span>
              <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-leaf-700">
                {product.deliveryText}
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink/65">
              Urgency price: {formatPrice(product.urgencyPrice)} for first 50 orders.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-ink/10 bg-white p-4">
            <div>
              <p className="text-sm font-bold text-ink">Quantity</p>
              <p className="text-sm text-ink/60">Live total updates instantly</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="flex size-10 items-center justify-center rounded-md border border-ink/15 bg-white"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-8 text-center text-lg font-black">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
                className="flex size-10 items-center justify-center rounded-md border border-ink/15 bg-white"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-ink p-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-white/70">Total Price</span>
              <span className="text-2xl font-black">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <CtaButton quantity={quantity} label="Purchase Now" />
            <CtaButton quantity={quantity} label="Buy Now" variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
