"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { journey } from "@/content";
import { SectionHead } from "./ui";

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // The headline slides sideways with the scroll.
      gsap.fromTo(
        ".journey-band",
        { xPercent: 0 },
        {
          xPercent: -35,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(".journey-card", {
        y: 80,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".journey-cards", start: "top 80%" },
      });
      gsap.from(".journey-bar", {
        scaleX: 0,
        duration: 1.6,
        ease: "expo.inOut",
        stagger: 0.12,
        scrollTrigger: { trigger: ".journey-cards", start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-void pb-32 md:pb-48">
      <div className="px-5 md:px-10">
        <SectionHead index={3} label="My journey" />
        <p className="label mt-3 text-ash md:ml-[361px]">({journey.note})</p>
      </div>

      <h2 className="journey-band mt-20 whitespace-nowrap pl-5 text-[clamp(4rem,13vw,12.5rem)] leading-[0.9] tracking-[-0.06em] md:mt-32 md:pl-10">
        {journey.title} <span className="text-smoke">{journey.title}</span>
      </h2>

      <ol className="journey-cards mt-16 grid gap-3 px-5 md:mt-24 md:grid-cols-2 md:px-10 xl:grid-cols-5">
        {journey.steps.map((s, i) => (
          <li key={s.title} className="journey-card flex min-h-[340px] flex-col rounded-[20px] bg-panel p-6 md:p-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[12px] text-ember">0{i + 1}</span>
              <span className="label text-ash">{s.when}</span>
              <span className="journey-bar h-px flex-1 origin-left bg-white/15" aria-hidden />
            </div>
            <h3 className="mt-auto pt-20 text-[26px] leading-[1.1] tracking-[-0.04em]">{s.title}</h3>
            <p className="mt-4 font-mono text-[12px] uppercase leading-[1.5] text-[#868686]">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
