"use client";

import { useEffect, useRef } from "react";

export type ServiceCardItem = {
  icon: "cooling" | "heating" | "commercial" | "refrigeration" | "installation" | "maintenance";
  title: string;
  copy: string;
  category: "Residential" | "Commercial" | "HVAC/R";
  cta: string;
  href: string;
};

const serviceArtwork: Record<ServiceCardItem["icon"], string> = {
  cooling: "/images/service-cards/air-conditioning.png",
  heating: "/images/service-cards/heating.png",
  commercial: "/images/service-cards/commercial-hvac.png",
  refrigeration: "/images/service-cards/commercial-refrigeration.png",
  installation: "/images/service-cards/installation-replacement.png",
  maintenance: "/images/service-cards/preventive-maintenance.png",
};

const darkCards = new Set<ServiceCardItem["icon"]>(["heating", "refrigeration"]);

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
          entry.target.classList.add("is-art-active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: [0.55], rootMargin: "-8% 0px -8% 0px" });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <div className="service-grid" ref={gridRef}>
    {items.map((service) => {
      const isDark = darkCards.has(service.icon);

      return <a
        href={service.href}
        className={`service-card${isDark ? " service-card--dark" : ""}`}
        key={service.title}
      >
        <div className="service-card__category">{service.category}</div>
        <div className="service-card__body">
          <span className="service-card__title">{service.title}</span>
          <span className="service-card__copy">{service.copy}</span>
        </div>
        <div className="service-card__cta">{service.cta}<span aria-hidden="true">→</span></div>
        <div className="service-card__art" aria-hidden="true">
          {/* The supplied transparent PNG artwork is intentionally served directly. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={serviceArtwork[service.icon]} alt="" width="760" height="760" loading="lazy" decoding="async" />
        </div>
      </a>;
    })}
  </div>;
}
