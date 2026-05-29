"use client";

import { product } from "@/lib/product";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#fffaf7] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato-600">
            Questions
          </p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-9 space-y-3">
          {product.faqs.map((faq, index) => (
            <div key={faq.question} className="rounded-lg border border-ink/10 bg-white">
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-ink"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 transition ${open === index ? "rotate-180" : ""}`}
                />
              </button>
              {open === index ? (
                <div className="px-5 pb-5 text-sm leading-7 text-ink/70">{faq.answer}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
