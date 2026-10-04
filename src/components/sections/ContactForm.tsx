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

export function ContactForm({
  defaultType,
  productSlug,
}: {
  defaultType?: string;
  productSlug?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

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
        setStatus("sent");
      }}
    >
      <Field label="Name" name="name" required />
      <Field label="Phone" name="phone" type="tel" required />
      <Field label="Email" name="email" type="email" required />
      <div>
        <label htmlFor="type" className="text-xs uppercase tracking-[0.16em] text-taupe">
          Enquiry Type
        </label>
        <select
          id="type"
          name="type"
          defaultValue={initialType}
          className="mt-2 w-full border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-champagne"
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
        <label htmlFor="message" className="text-xs uppercase tracking-[0.16em] text-taupe">
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
          className="mt-2 w-full border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-champagne"
        />
      </div>
      <Button type="submit" variant="primary" size="lg">
        Send Enquiry
      </Button>
      {status === "sent" ? (
        <p className="text-sm text-charcoal/70" role="status">
          Thank you. This demo form captures your enquiry locally — connect a
          real endpoint or email service before launch.
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
      <label htmlFor={name} className="text-xs uppercase tracking-[0.16em] text-taupe">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-champagne"
      />
    </div>
  );
}
