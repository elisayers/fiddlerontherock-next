"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { LinkItem } from "@/lib/data";

export function ButtonLink({ link, variant = "primary" }: { link: LinkItem; variant?: "primary" | "ghost" }) {
  return <Link href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className={variant === "primary" ? "btn btn-primary" : "btn btn-ghost"}>{link.label}</Link>;
}

export function PageHero({ eyebrow, title, subtitle, image, ctas = [] }: { eyebrow?: string; title: string; subtitle?: string; image?: string; ctas?: LinkItem[] }) {
  return <section className="page-hero">{image ? <div className="hero-bg"><Image src={image} alt="" fill priority sizes="100vw" className="image-cover" /><div className="hero-overlay" /></div> : null}<motion.div variants={staggerContainer} initial="hidden" animate="visible" className="page-hero-inner">{eyebrow ? <motion.p variants={fadeUp} className="eyebrow">{eyebrow}</motion.p> : null}<motion.h1 variants={fadeUp}>{title}</motion.h1>{subtitle ? <motion.p variants={fadeUp} className="hero-subtitle">{subtitle}</motion.p> : null}{ctas.length ? <motion.div variants={fadeUp} className="button-row">{ctas.map((cta, index) => <ButtonLink key={cta.href} link={cta} variant={index === 0 ? "primary" : "ghost"} />)}</motion.div> : null}</motion.div></section>;
}

export function Section({ id, eyebrow, title, children, tone = "ink" }: { id?: string; eyebrow?: string; title?: string; children: React.ReactNode; tone?: "ink" | "soft" }) {
  return <section id={id} className={"section section-" + tone}><motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="section-inner">{eyebrow ? <motion.p variants={fadeUp} className="eyebrow">{eyebrow}</motion.p> : null}{title ? <motion.h2 variants={fadeUp} className="section-title">{title}</motion.h2> : null}{children}</motion.div></section>;
}

export function CardGrid({ children }: { children: React.ReactNode }) { return <motion.div variants={fadeUp} className="card-grid">{children}</motion.div>; }

export function InfoCard({ eyebrow, title, body, href, cta = "Explore" }: { eyebrow?: string; title: string; body: string; href?: string; cta?: string }) {
  const content = <motion.article whileHover={{ y: -4 }} className="info-card">{eyebrow ? <p className="card-eyebrow">{eyebrow}</p> : null}<h3>{title}</h3><p>{body}</p>{href ? <span className="text-link">{cta}</span> : null}</motion.article>;
  return href ? <Link href={href} className="card-link">{content}</Link> : content;
}

export function FeatureSplit({ image, alt, eyebrow, title, body, reverse = false, ctas = [] }: { image: string; alt: string; eyebrow?: string; title: string; body: string; reverse?: boolean; ctas?: LinkItem[] }) {
  return <motion.div variants={fadeUp} className={"feature-split " + (reverse ? "feature-reverse" : "")}><div className="feature-image"><Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="image-cover" /></div><div className="feature-copy">{eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}<h2>{title}</h2><p>{body}</p>{ctas.length ? <div className="button-row left">{ctas.map((cta, index) => <ButtonLink key={cta.href} link={cta} variant={index === 0 ? "primary" : "ghost"} />)}</div> : null}</div></motion.div>;
}
