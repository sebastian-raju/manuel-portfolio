"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { work, site } from "@/content";
import { PillLink, SectionHead } from "./ui";
import ProjectVisual from "./ProjectVisual";

// Each stacked card sits this far below the one before, leaving its title visible.
const STACK_STEP = 120;

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      // Project cards stack: as the next card slides up to its resting place,
      // the one underneath eases back and dims. Only transform and opacity are
      // animated (both GPU-composited), and the tween ends exactly when the
      // next card lands, so there's no jump at the hand-off.
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          const next = cards[i + 1];
          const shade = card.querySelector(".card-shade");
          gsap.set(card, { force3D: true });
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: next,
                // Start only once the next card actually reaches this card's
                // bottom edge, so a card is never dimmed while it's fully in view.
                start: () =>
                  `top ${(parseFloat(getComputedStyle(card).top) || 0) + card.offsetHeight}px`,
                end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            })
            .to(card, { scale: 0.96 }, 0)
            .to(shade, { opacity: 0.3 }, 0);
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

          <ul className="flex flex-col gap-6 md:gap-[30vh]">
            {work.projects.map((p, i) => (
              <li
                key={p.name}
                className="project-card origin-top will-change-transform md:sticky md:pb-[var(--release)]"
                // The extra bottom padding makes every card leave the stack at the
                // same moment, so the stack scrolls away as one piece instead of
                // collapsing card over card.
                style={{
                  top: `calc(10vh + ${i * STACK_STEP}px)`,
                  ["--release" as string]: `${(work.projects.length - 1 - i) * STACK_STEP}px`,
                }}
              >
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,#181818_0%,#0f0f0f_100%)] transition-colors duration-500 hover:border-white/25"
                >
                  <span className="card-shade pointer-events-none absolute inset-0 z-10 bg-black opacity-0" aria-hidden />

                  {/* Title strip: stays visible when the next card stacks on top. */}
                  <div className="flex items-start justify-between gap-6 px-6 pt-6 md:px-8 md:pt-7">
                    <h3 className="text-[clamp(1.9rem,3.2vw,3rem)] uppercase leading-[0.92] tracking-[-0.055em] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                      {p.name}
                    </h3>
                    <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
                      <span className="font-mono text-[12px] text-ember">[0{i + 1}]</span>
                      <span className="label flex items-center gap-2 text-ash">
                        <span className={`h-1.5 w-1.5 rounded-full ${p.status === "Production" ? "bg-coral" : "border border-ash"}`} />
                        {p.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 px-6 pt-5 md:grid-cols-[1fr_auto] md:items-start md:gap-8 md:px-8">
                    <p className="max-w-[48ch] font-mono text-[12px] uppercase leading-[1.55] text-[#a3a3a3]">{p.body}</p>
                    <ul className="flex flex-wrap gap-2 md:max-w-[220px] md:justify-end">
                      {p.tools.map((t) => (
                        <li key={t} className="label rounded-full border border-white/15 px-2.5 py-1 text-mist">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative mx-6 mb-6 mt-6 h-[150px] overflow-hidden rounded-[14px] border border-white/[0.06] bg-[radial-gradient(120%_120%_at_80%_100%,#2a1414_0%,#121212_60%)] p-4 md:mx-8 md:mb-8 md:h-[170px]">
                    <ProjectVisual index={i} />
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
