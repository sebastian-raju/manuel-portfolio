"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/content";
import { Roll } from "./ui";

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const nav = ref.current!;
    if (!prefersReducedMotion()) {
      gsap.from(nav.children, { y: -20, autoAlpha: 0, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.2 });
    }
    // Hide on the way down, return on the way up.
    ScrollTrigger.create({
      start: 120,
      end: "max",
      onUpdate: (self) => {
        gsap.to(nav, { yPercent: self.direction === 1 ? -120 : 0, duration: 0.5, ease: "power3.out", overwrite: true });
      },
    });
  });

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto] items-start gap-4 px-5 pt-5 md:grid-cols-[337px_1fr_1fr_auto] md:px-10 md:pt-6"
    >
      <a href="#top" className="label leading-[12px] text-bone" aria-label={`${site.firstName} ${site.lastName}, back to top`}>
        {site.firstName}—
        <br />©{site.year}
      </a>
      <a href={`mailto:${site.email}`} className="label hidden items-center gap-2 pt-[3px] text-[#8a8a8a] hover:text-bone md:flex">
        <span className="h-1.5 w-1.5 rounded-full border border-current" aria-hidden />
        <Roll>{site.email}</Roll>
      </a>
      <a href={site.linkedin} target="_blank" rel="noreferrer" className="label hidden items-center gap-2 pt-[3px] text-[#8a8a8a] hover:text-bone md:flex">
        <span className="h-1.5 w-1.5 rounded-full border border-current" aria-hidden />
        <Roll>LinkedIn</Roll>
      </a>
      <a href="#contact" className="label rounded-[3px] bg-coral px-2 py-1 text-white hover:bg-bone hover:text-void">
        <Roll>Contact</Roll>
      </a>
    </header>
  );
}
