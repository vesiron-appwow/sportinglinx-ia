export type SportingCategory =
  | "equipment"
  | "apparel"
  | "memorabilia"
  | "events"
  | "accessories"
  | "regulated";

export const CATEGORIES: { slug: SportingCategory; label: string; blurb: string }[] = [
  { slug: "equipment", label: "Equipment", blurb: "Gear and kit for sport and outdoor use." },
  { slug: "apparel", label: "Apparel", blurb: "Clothing, footwear, and branded wear." },
  { slug: "memorabilia", label: "Memorabilia", blurb: "Collectables, signed items, and heritage pieces." },
  { slug: "events", label: "Events", blurb: "Tickets, experiences, clubs, and fixtures." },
  { slug: "accessories", label: "Accessories", blurb: "Extras, spares, add-ons, and small items." },
  { slug: "regulated", label: "Regulated Goods", blurb: "Visible publicly. Action is subscription-gated. Compliance notices apply." }
];

export function categoryLabel(slug: string): string {
  const c = CATEGORIES.find(x => x.slug === slug);
  return c ? c.label : "Category";
}