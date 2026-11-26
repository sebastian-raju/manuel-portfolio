"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { work, site } from "@/content";
import { PillLink, SectionHead } from "./ui";

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      // Project cards stack: each one pins, then shrinks back as the next arrives.
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.94,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          });
        });
      });

      // Focus cards float at different speeds.
      gsap.utils.toArray<HTMLElement>(".focus-card").forEach((card) => {
        const speed = Number(card.dataset.speed);
        gsap.fromTo(
          card,
          { y: 160 * speed },
          {
            y: -160 * speed,
            ease: "none",
            scrollTrigger: { trigger: ".focus-field", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      gsap.fromTo(
        ".focus-word",
        { xPercent: 10 },
        {
          xPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: ".focus-field", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="bg-void pb-32 md:pb-40">
      <div className="px-5 md:px-10">
        <SectionHead index={4} label="Projects" />

        <div className="mt-20 grid gap-16 md:mt-40 md:grid-cols-[minmax(0,469px)_1fr] md:gap-[10vw]">
          <div className="md:sticky md:top-[15vh] md:self-start">
            <h2 className="text-[48px] leading-none tracking-[-0.02em]">
              {work.title[0]}
              <br />
              <span className="text-[#8e8e8e]">{work.title[1]}</span>
            </h2>
            {work.body.map((p) => (
              <p key={p} className="mt-6 text-[16px] leading-[1.5] text-mist">
                {p}
              </p>
            ))}
            <div className="mt-12">
              <PillLink href={site.github} external>
                GitHub
              </PillLink>
            </div>
          </div>

          <ul className="flex flex-col gap-6">
            {work.projects.map((p, i) => (
              <li key={p.name} className="project-card origin-top md:sticky"
                style={{ top: `calc(12vh + ${i * 28}px)` }}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-[24px] border border-white/10 bg-panel transition-colors duration-500 hover:border-white/25"
                >
                  <div className="relative aspect-[5/4] overflow-hidden bg-[radial-gradient(120%_90%_at_70%_0%,#2a2a2a_0%,#111_55%,#0a0a0a_100%)] md:aspect-[16/11]">
                    <span className="absolute left-6 top-6 font-mono text-[12px] text-ember">[0{i + 1}]</span>
                    <span className="label absolute right-6 top-6 flex items-center gap-2 text-ash">
                      <span className={`h-1.5 w-1.5 rounded-full ${p.status === "Production" ? "bg-coral" : "border border-ash"}`} />
                      {p.status}
                    </span>
                    <p className="absolute bottom-6 left-6 right-6 text-[clamp(2.5rem,5.5vw,5.5rem)] uppercase leading-[0.9] tracking-[-0.06em] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
                      {p.name}
                    </p>
                  </div>
                  <div className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-end">
                    <p className="max-w-[46ch] font-mono text-[12px] uppercase leading-[1.55] text-[#9a9a9a]">{p.body}</p>
                    <ul className="flex flex-wrap gap-2">
                      {p.tools.map((t) => (
                        <li key={t} className="label rounded-full border border-white/15 px-2.5 py-1 text-mist">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Focus areas: glass cards floating over a giant word. */}
      <div className="focus-field relative mt-32 overflow-hidden px-5 py-24 md:mt-48 md:h-[1200px] md:px-10 md:py-0">
        <p
          className="focus-word pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[26vw] font-semibold leading-none tracking-[-0.07em] text-[#141414] md:block"
          aria-hidden
        >
          on the pitch
        </p>
        <ul className="relative grid gap-4 md:block">
          {work.focus.map((f, i) => {
            const pos = ["md:left-[18%] md:top-[140px]", "md:left-[58%] md:top-[360px]", "md:left-[31%] md:top-[720px]"][i];
            return (
              <li
                key={f.name}
                data-speed={[0.6, 1.2, 0.9][i]}
                className={`focus-card rounded-[16px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl md:absolute md:w-[300px] ${pos}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[20px] uppercase leading-[1.25]">{f.name}</h3>
                  <span className="font-mono text-[12px] text-ember">[0{i + 1}]</span>
                </div>
                <p className="mt-16 font-mono text-[14px] uppercase leading-[1.35] text-bone/90">{f.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
