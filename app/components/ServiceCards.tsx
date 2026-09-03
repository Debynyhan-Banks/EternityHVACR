"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export type ServiceCardItem = {
  icon: "cooling" | "heating" | "commercial" | "refrigeration" | "installation" | "maintenance";
  title: string;
  copy: string;
  category: "Residential" | "Commercial" | "HVAC/R";
  cta: string;
  href: string;
};

type ServiceIconProps = {
  name: ServiceCardItem["icon"];
};

function ServiceIcon({ name }: ServiceIconProps) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  if (name === "cooling") {
    return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...shared}>
      <rect x="6" y="8" width="36" height="32" rx="4" />
      <path d="M11 13h26M12 35h5" />
      <circle cx="25" cy="26" r="9" />
      <path d="M25 17c3 3 3.5 5.7 1.2 8M34 26c-3 3-5.7 3.5-8 1.2M25 35c-3-3-3.5-5.7-1.2-8M16 26c3-3 5.7-3.5 8-1.2" />
      <circle cx="25" cy="26" r="1.6" />
    </svg>;
  }

  if (name === "heating") {
    return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...shared}>
      <rect x="10" y="8" width="28" height="33" rx="3" />
      <path d="M17 8V5h14v3M15 14h18M15 35h18" />
      <path d="M24 18c1.5 4-4.2 5.8-1.6 11.2 1.2 2.5 4.8 2.5 6.2.2 2.4-4-1.1-7.8-4.6-11.2Z" />
      <path d="M24.2 25.3c.4 1.5-.9 2.4-.4 3.7" />
    </svg>;
  }

  if (name === "commercial") {
    return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...shared}>
      <path d="m8 16 6-7h27l-5 7H8Zm0 0v24h28V16" />
      <path d="M36 16h5v19l-5 5M13 21h18v14H13z" />
      <circle cx="18" cy="16" r="3" /><circle cx="29" cy="16" r="3" />
      <path d="M16 26h12M16 30h12" />
    </svg>;
  }

  if (name === "refrigeration") {
    return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...shared}>
      <rect x="8" y="8" width="32" height="32" rx="3" />
      <path d="M8 17h32M15 12h7M13 24v10M9.5 29h7M11 25.5l5 7M16 25.5l-5 7" />
      <rect x="23" y="22" width="12" height="13" rx="2" />
      <path d="M26 26h6M26 30h6" />
    </svg>;
  }

  if (name === "installation") {
    return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...shared}>
      <path d="M10 9a8 8 0 0 0 8.7 11.5L31 32.8a4.3 4.3 0 1 0 6.1-6.1L24.8 14.4A8 8 0 0 0 14 5l5 5-4 4-5-5Z" />
      <rect x="7" y="27" width="17" height="14" rx="2" />
      <path d="M11 31h9M11 35h9" />
    </svg>;
  }

  return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...shared}>
    <circle cx="22" cy="23" r="14" />
    <path d="M22 14v3M13 23h3M28 23h3M16 17l2 2M28 17l-2 2M22 23l7-5" />
    <path d="m29 34 3.5 3.5L40 29" />
  </svg>;
}

const circuitPaths = [
  "M0 31H242C255 31 257 17 270 17H284C291 17 295 23 301 28C307 33 313 33 319 28C325 23 329 17 336 17C343 17 347 23 353 28C359 33 365 33 371 28C377 23 381 17 389 17H400",
  "M0 28H214C226 28 230 37 242 37H269C278 37 281 18 290 18C299 18 302 37 311 37C320 37 323 18 332 18C341 18 344 37 353 37H400",
  "M0 34H228L242 20H270C279 20 282 36 291 36C300 36 303 20 312 20C321 20 324 36 333 36C342 36 345 20 354 20H400",
] as const;

function ServiceCircuit({ variant }: { variant: number }) {
  const path = circuitPaths[variant % circuitPaths.length];
  return <svg className="service-circuit" viewBox="0 0 400 44" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path className="service-circuit__base" d={path} pathLength="1" />
    <path className="service-circuit__signal" d={path} pathLength="1" />
    <circle className="service-circuit__node service-circuit__node--navy" cx="291" cy={variant === 0 ? 24 : variant === 1 ? 27 : 28} r="2.2" />
    <circle className="service-circuit__node service-circuit__node--orange" cx="333" cy={variant === 0 ? 24 : variant === 1 ? 27 : 28} r="2.2" />
  </svg>;
}

export default function ServiceCards({ items }: { items: readonly ServiceCardItem[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !("IntersectionObserver" in window)) return;

    const touchOrNarrow = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 900px)");
    if (!touchOrNarrow.matches) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".service-card"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          entry.target.classList.add("is-circuit-active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: [0.55], rootMargin: "-8% 0px -8% 0px" });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <div className="service-grid" ref={gridRef}>
    {items.map((service, index) => (
      <a
        href={service.href}
        className="service-card"
        data-schematic={index % 3}
        key={service.title}
        style={{ "--circuit-delay": `${(index % 3) * 90}ms` } as CSSProperties}
      >
        <div className="service-card__schematic" aria-hidden="true" />
        <div className="service-card__top">
          <span className="service-card__icon"><ServiceIcon name={service.icon} /></span>
          <span className="service-card__category">{service.category}</span>
        </div>
        <div className="service-card__body">
          <span className="service-card__title">{service.title}</span>
          <span className="service-card__copy">{service.copy}</span>
        </div>
        <div className="service-card__cta">{service.cta}<span aria-hidden="true">→</span></div>
        <ServiceCircuit variant={index} />
      </a>
    ))}
  </div>;
}
