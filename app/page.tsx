import { CtaButton } from "@/components/CtaButton";
import { FAQ } from "@/components/FAQ";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ScrollToTopOnLoad } from "@/components/ScrollToTopOnLoad";
import { formatPrice, product } from "@/lib/product";
import {
  CheckCircle2,
  Clock,
  Container,
  Headphones,
  PackageCheck,
  Plug,
  Ruler,
  ShieldCheck,
  Truck
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <ScrollToTopOnLoad />
      <section className="premium-surface overflow-hidden">
        <header className="flex w-full items-center px-2 pt-4 sm:px-4 lg:px-6">
          <div className="logo-glass -ml-2 flex h-28 w-72 items-center justify-start overflow-visible sm:-ml-4 sm:h-32 sm:w-[34rem] lg:-ml-6 lg:h-36 lg:w-[40rem]">
            <Image
              src="/images/warmbox-logo-cropped.png"
              alt="WarmBox logo"
              width={495}
              height={174}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </header>

        <div className="mx-auto grid min-h-[calc(92vh-100px)] max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-leaf-600/20 bg-white px-4 py-2 text-sm font-bold text-leaf-700">
              <PackageCheck size={17} />
              Cash On Delivery Available
            </div>
            <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-tomato-600">
              {product.brandName}
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black leading-[1.03] text-ink sm:text-6xl lg:text-7xl">
              {product.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/72">
              {product.subheadline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-ink/65">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton label="Purchase Now" />
              <CtaButton label="Order Now" variant="secondary" />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Fast delivery", Truck],
                ["Easy order process", CheckCircle2],
                ["Customer support", Headphones]
              ].map(([label, Icon]) => (
                <div
                  key={String(label)}
                  className="flex min-h-16 items-center gap-3 rounded-md bg-white/80 px-4 py-3 text-sm font-bold shadow-sm"
                >
                  <Icon className="text-leaf-600" size={19} />
                  <span>{String(label)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center pb-8 lg:pb-0">
            <div className="absolute inset-x-8 bottom-0 h-28 rounded-[50%] bg-tomato-500/10 blur-2xl" />
            <div className="image-theme-frame relative aspect-square w-full max-w-[560px] rounded-lg border border-tomato-100 p-6 shadow-soft">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-contain p-7"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase />

      <section className="bg-[#fffaf7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="image-theme-frame relative aspect-square overflow-hidden rounded-lg border border-tomato-100 shadow-soft">
              <Image
                src="/images/portable-warmer-features.png"
                alt="WarmBox product feature descriptions"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato-600">
                Product Features
              </p>
              <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
                Smart details that make daily meals easier
              </h2>
              <p className="mt-4 leading-8 text-ink/68">
                WarmBox includes practical carry, heating, safety, and cleaning
                features designed for everyday lunch routines.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {product.featureHighlights.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-lg border border-ink/10 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 shrink-0 text-leaf-600" size={19} />
                      <div>
                        <h3 className="text-sm font-black text-ink">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink/65">{feature.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <CtaButton label="Order Now" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700">
              Size & Material
            </p>
            <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              Compact outside, practical inside
            </h2>
            <div className="mt-7 grid gap-3">
              {product.specifications.map((spec, index) => {
                const Icon = index < 2 ? Container : Ruler;
                return (
                  <div
                    key={spec}
                    className="flex items-center gap-3 rounded-lg border border-ink/10 bg-[#fffaf7] p-4 text-sm font-bold text-ink"
                  >
                    <Icon className="shrink-0 text-tomato-600" size={19} />
                    <span>{spec}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="image-theme-frame relative aspect-square overflow-hidden rounded-lg border border-tomato-100 shadow-soft">
            <Image
              src="/images/portable-warmer-specs.png"
              alt="WarmBox size capacity and material details"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato-600">
                Why Buy
              </p>
              <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
                Built for people who carry lunch from home
              </h2>
              <p className="mt-4 leading-8 text-ink/68">
                WarmBox keeps homemade meals convenient, budget-friendly, and ready
                for busy routines.
              </p>
              <div className="mt-7">
                <CtaButton label="Order Now" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.detailedBenefits.map((benefit, index) => {
                const icons = [Plug, Truck, PackageCheck, Clock];
                const Icon = icons[index] ?? CheckCircle2;
                return (
                  <div
                    key={benefit.title}
                    className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex size-11 items-center justify-center rounded-md bg-tomato-50 text-tomato-600">
                      <Icon size={21} />
                    </div>
                    <h3 className="mt-5 text-lg font-black text-ink">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/66">{benefit.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700">
                Loved by customers
              </p>
              <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
                Real daily-use feedback
              </h2>
            </div>
            <CtaButton label="Buy Now" variant="secondary" />
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.testimonials.map((testimonial) => (
              <article
                key={testimonial.author}
                className="rounded-lg border border-ink/10 bg-[#fffaf7] p-6"
              >
                <div className="text-xl font-black text-tomato-600">“</div>
                <h3 className="text-lg font-black text-ink">{testimonial.quote}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/68">{testimonial.body}</p>
                <p className="mt-5 text-sm font-bold text-ink">{testimonial.author}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato-100">
            Limited Launch Offer
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            Order WarmBox today for {formatPrice(product.launchPrice)}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/72">
            Free delivery inside Kathmandu Valley. Payment method: Cash On Delivery.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaButton label="Purchase Now" />
            <CtaButton label="Order Now" variant="secondary" />
          </div>
        </div>
      </section>
    </main>
  );
}
