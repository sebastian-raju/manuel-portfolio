"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { principles } from "@/content";
import { SectionHead } from "./ui";

export default function Principles() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".principles-band",
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      // Each principle lights up as it crosses the middle of the screen.
      gsap.utils.toArray<HTMLElement>(".principle").forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 62%", end: "bottom 38%", scrub: true } })
          .to(row, { color: "#f4f1ee", duration: 1, ease: "none" })
          .to(row, { color: "#3d3d3d", duration: 1, ease: "none" }, "+=0.4");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-void pb-32 md:pb-48">
      <div className="principles-band flex w-max gap-[0.25em] whitespace-nowrap text-[clamp(4.5rem,8.35vw,7.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.01em] text-smoke" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i}>Principles</span>
        ))}
      </div>

      <div className="mt-24 px-5 md:mt-40 md:px-10">
        <SectionHead index={6} label="Principles" />
        <ol className="mt-16 md:mt-24">
          {principles.map((p, i) => (
            <li
              key={p}
              className="principle grid grid-cols-[3.2em_1fr] font-mono text-[clamp(1.1rem,2.36vw,2.125rem)] font-medium uppercase leading-[1.2] tracking-[-0.03em] text-smoke md:grid-cols-[90px_1fr]"
            >
              <span>{String(i + 1).padStart(3, "0")}.</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
