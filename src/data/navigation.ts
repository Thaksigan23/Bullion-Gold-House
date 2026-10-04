import type { NavItem } from "@/types";

/** Left zone of desktop header */
export const leftNavigation: NavItem[] = [
  {
    label: "Jewellery",
    href: "/jewellery",
    mega: "jewellery",
    children: [
      { label: "Necklaces", href: "/jewellery?category=necklaces" },
      { label: "Chains", href: "/jewellery?category=chains" },
      { label: "Bangles", href: "/jewellery?category=bangles" },
      { label: "Bracelets", href: "/jewellery?category=bracelets" },
      { label: "Earrings", href: "/jewellery?category=earrings" },
      { label: "Rings", href: "/jewellery?category=rings" },
      { label: "Pendants", href: "/jewellery?category=pendants" },
      { label: "Men's Jewellery", href: "/jewellery?category=mens" },
      { label: "Kids' Jewellery", href: "/jewellery?category=kids" },
      { label: "Diamond Jewellery", href: "/jewellery?category=diamond" },
      { label: "Lightweight Jewellery", href: "/jewellery?category=lightweight" },
    ],
  },
  {
    label: "Collections",
    href: "/jewellery?collection=signature",
    mega: "collections",
    children: [
      { label: "New Arrivals", href: "/jewellery?collection=new-arrivals" },
      { label: "Bestsellers", href: "/jewellery?collection=bestsellers" },
      { label: "Signature Collection", href: "/jewellery?collection=signature" },
      { label: "Wedding Collection", href: "/jewellery?collection=wedding" },
      { label: "Everyday Gold", href: "/jewellery?collection=everyday-gold" },
      { label: "Gifting", href: "/jewellery?collection=gifting" },
    ],
  },
  { label: "Bridal", href: "/bridal" },
  { label: "New Arrivals", href: "/jewellery?collection=new-arrivals" },
];

/** Right zone of desktop header (text links) */
export const rightNavigation: NavItem[] = [
  { label: "Gold Rate", href: "/gold-rate" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Full list for mobile menu */
export const mainNavigation: NavItem[] = [
  ...leftNavigation,
  ...rightNavigation,
];

export const footerNavigation = {
  jewellery: [
    { label: "Necklaces", href: "/jewellery?category=necklaces" },
    { label: "Bangles", href: "/jewellery?category=bangles" },
    { label: "Earrings", href: "/jewellery?category=earrings" },
    { label: "Rings", href: "/jewellery?category=rings" },
    { label: "Chains", href: "/jewellery?category=chains" },
    { label: "Pendants", href: "/jewellery?category=pendants" },
  ],
  collections: [
    { label: "New Arrivals", href: "/jewellery?collection=new-arrivals" },
    { label: "Signature", href: "/jewellery?collection=signature" },
    { label: "Wedding", href: "/jewellery?collection=wedding" },
    { label: "Everyday Gold", href: "/jewellery?collection=everyday-gold" },
    { label: "Gifting", href: "/jewellery?collection=gifting" },
  ],
  customerCare: [
    { label: "Contact Us", href: "/contact" },
    { label: "Gold Rate", href: "/gold-rate" },
    { label: "Returns / Exchange", href: "/contact" },
    { label: "Privacy Policy", href: "/contact" },
    { label: "Terms", href: "/contact" },
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Craftsmanship", href: "/about#craftsmanship" },
    { label: "Bridal", href: "/bridal" },
    { label: "Bespoke", href: "/contact?type=custom" },
  ],
};
