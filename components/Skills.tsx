"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { skills, site } from "@/content";
import { PillLink, SectionHead } from "./ui";

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Each skill lights up as it passes the middle of the screen, then dims again.
      gsap.utils.toArray<HTMLElement>(".skill").forEach((el) => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 25%", scrub: true } })
          .fromTo(el, { color: "#2e2e2e", x: 0 }, { color: "#f4f1ee", x: 24, ease: "power1.out", duration: 1 })
          .to(el, { color: "#2e2e2e", x: 0, ease: "power1.in", duration: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-void px-5 pb-32 pt-10 md:px-10 md:pb-48">
      <SectionHead index={2} label="Skills" />
      <div className="mt-20 grid gap-16 md:mt-40 md:grid-cols-[1fr_1fr] md:gap-10">
        <div className="md:sticky md:top-[30vh] md:self-start">
          <h2 className="text-[40px] leading-[1.2] tracking-[-0.025em]">{skills.title}</h2>
          <p className="mt-5 max-w-[600px] text-[16px] leading-[1.5] text-bone/90">{skills.body}</p>
          <div className="mt-12">
            <PillLink href={site.linkedin} external>
              View LinkedIn
            </PillLink>
          </div>
        </div>
        <ul className="md:pl-[calc(50%-363px)] md:pt-[6vh]">
          {skills.items.map((s) => (
            <li
              key={s}
              className="skill text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.3] tracking-[-0.04em] text-bone"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
