"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const enquiryTypes = [
  "General Enquiry",
  "Product Enquiry",
  "Bridal Jewellery",
  "Gold Rate Enquiry",
  "Product Availability",
] as const;

/**
 * Client-side enquiry form.
 * Wire `onSubmit` to email/CRM when Bullion messaging is configured.
 * Do not invent an API endpoint or claim successful delivery.
 */
export function ContactForm({
  defaultType,
  productSlug,
}: {
  defaultType?: string;
  productSlug?: string;
}) {
  const [status, setStatus] = useState<"idle" | "prepared">("idle");
  const [error, setError] = useState<string | null>(null);

  const initialType =
    defaultType === "bridal"
      ? "Bridal Jewellery"
      : defaultType === "gold-rate"
        ? "Gold Rate Enquiry"
        : defaultType === "product"
          ? "Product Enquiry"
          : defaultType === "availability"
            ? "Product Availability"
            : "General Enquiry";

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);

        const form = e.currentTarget;
        const data = new FormData(form);
        const phone = String(data.get("phone") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();

        if (!phone && !email) {
          setError("Please provide a phone number or email address.");
          return;
        }

        // Future integration point: POST enquiry payload to configured service.
        // const payload = Object.fromEntries(data.entries());
        setStatus("prepared");
      }}
    >
      <Field label="Name" name="name" required />
      <Field label="Phone" name="phone" type="tel" />
      <Field label="Email" name="email" type="email" />
      <div>
        <label
          htmlFor="type"
          className="text-xs uppercase tracking-[0.16em] text-taupe"
        >
          Enquiry Type
        </label>
        <select
          id="type"
          name="type"
          defaultValue={initialType}
          className="mt-2 min-h-12 w-full border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
        >
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {productSlug ? (
        <input type="hidden" name="product" value={productSlug} />
      ) : null}
      <div>
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-[0.16em] text-taupe"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={
            productSlug
              ? `I would like to enquire about ${productSlug}.`
              : undefined
          }
          className="mt-2 w-full border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
        />
      </div>
      {error ? (
        <p className="text-sm text-charcoal/80" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" variant="primary" size="lg">
        Send Enquiry
      </Button>
      {status === "prepared" ? (
        <p className="text-sm leading-relaxed text-charcoal/70" role="status">
          Thank you. Please contact the showroom to complete your enquiry.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs uppercase tracking-[0.16em] text-taupe"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 min-h-12 w-full border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
      />
    </div>
  );
}
