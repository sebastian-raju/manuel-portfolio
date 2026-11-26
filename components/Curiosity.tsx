"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { curiosity } from "@/content";
import { SectionHead } from "./ui";
import Orb from "./Orb";

export default function Curiosity() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".curiosity-stage", start: "top 70%", end: "center center", scrub: true },
      });
      tl.from(".curiosity-orb", { scale: 0.4, autoAlpha: 0, ease: "none" }, 0).fromTo(
        ".curiosity-char",
        { color: "#262626" },
        { color: "#e9e9e9", stagger: 0.03, ease: "none" },
        0,
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-void px-5 pb-32 md:px-10 md:pb-48">
      <SectionHead index={7} label="The curiosity" />
      <div className="curiosity-stage relative mt-16 flex min-h-[90vh] flex-col items-center justify-center text-center">
        <Orb className="curiosity-orb absolute left-1/2 top-1/2 h-[80vh] w-[80vh] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 opacity-40" points={900} speed={0.6} />
        <h2 className="relative max-w-[690px] text-[clamp(2.75rem,4.5vw,4rem)] leading-none tracking-[-0.03em]">
          {curiosity.title.split("").map((c, i) => (
            <span key={i} className="curiosity-char">
              {c}
            </span>
          ))}
        </h2>
        <p className="relative mt-8 max-w-[560px] text-[16px] leading-[1.5] text-mist">{curiosity.body}</p>
      </div>
    </section>
  );
}
