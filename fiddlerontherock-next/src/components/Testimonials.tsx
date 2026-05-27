"use client";

import { InfoCard, Section, CardGrid } from "@/components/PagePrimitives";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return <Section eyebrow="What people say" title="A moment visitors remember after the trip ends." tone="soft"><CardGrid>{testimonials.map((item) => <InfoCard key={item.author} eyebrow={item.context} title={item.author} body={item.quote} />)}</CardGrid></Section>;
}
