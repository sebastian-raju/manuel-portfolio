"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { process, site } from "@/content";
import { SectionHead } from "./ui";

const DURATION = 6;

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(panel.current!);
    return () => io.disconnect();
  }, []);

  // Cycle through the phases while the panel is on screen; a click takes over.
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const t = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, duration: DURATION, ease: "none", onComplete: () => setActive((a) => (a + 1) % process.phases.length) },
    );
    return () => {
      t.kill();
    };
  }, [active, inView]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".phase-body > *", { y: 24, autoAlpha: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 });
    },
    { scope: root, dependencies: [active] },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(panel.current, {
        y: 100,
        autoAlpha: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: panel.current, start: "top 85%" },
      });
    },
    { scope: root },
  );

  const phase = process.phases[active];

  return (
    <section ref={root} className="bg-void px-5 pb-32 md:px-10 md:pb-48">
      <SectionHead index={5} label="Philosophy" />

      <div className="mx-auto mt-24 max-w-[574px] text-center md:mt-28">
        <h2 className="text-[clamp(2.75rem,4.5vw,4rem)] leading-none tracking-[-0.03em] text-[#e9e9e9]">{process.title}</h2>
        <p className="mt-8 text-[16px] leading-[1.5] text-mist">{process.body}</p>
      </div>

      <div ref={panel} className="mx-auto mt-20 max-w-[1280px] overflow-hidden rounded-[24px] bg-[#0e0e0e] p-3 md:p-4">
        <div className="flex items-center justify-between px-3 pb-4 pt-2 md:px-5">
          <span className="text-[24px] tracking-[-0.04em]">{site.firstName}</span>
          <span className="label text-ash">Process</span>
        </div>
        <div className="grid gap-3 md:grid-cols-[280px_1fr]">
          <div role="tablist" aria-label="Phases" className="flex gap-2 overflow-x-auto md:flex-col">
            {process.phases.map((p, i) => (
              <button
                key={p.name}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`relative shrink-0 overflow-hidden rounded-[12px] px-5 py-5 text-left text-[14.6px] transition-colors duration-300 ${
                  i === active ? "bg-[#1f1f1f] text-bone" : "bg-[#141414] text-[#575757] hover:text-bone"
                }`}
              >
                Phase 0{i + 1}: {p.name}
                {i === active && (
                  <span ref={bar} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-coral" aria-hidden />
                )}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="phase-body grid min-h-[460px] gap-8 rounded-[12px] bg-[#141414] p-6 md:grid-cols-2 md:p-10">
            <div className="flex flex-col">
              <h3 className="text-[32px] leading-[1.2] tracking-[-0.03em] text-[#e9e9e9]">
                0{active + 1}. {phase.name}
              </h3>
              <p className="mt-3 max-w-[40ch] font-mono text-[12px] uppercase leading-[1.5] text-[#868686]">{phase.body}</p>
            </div>
            <div className="relative flex items-end justify-end overflow-hidden rounded-[10px] bg-[radial-gradient(100%_100%_at_100%_100%,#2a1212_0%,#141414_70%)]">
              <span className="text-[clamp(8rem,18vw,16rem)] font-semibold leading-[0.75] tracking-[-0.08em] text-[#1f1f1f]">
                0{active + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
