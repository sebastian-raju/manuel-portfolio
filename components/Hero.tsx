"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { hero, stack } from "@/content";
import Orb from "./Orb";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".hero-orb", { autoAlpha: 0, scale: 0.7, y: -60, duration: 2.2, ease: "expo.out" }, 0)
        .from(words, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.06 }, 0.25)
        // A light sweep across the headline: characters warm from smoke to bone.
        .fromTo(chars, { color: "#3d3d3d" }, { color: "#f4f1ee", duration: 0.5, ease: "none", stagger: 0.022 }, 0.55)
        .from(".hero-stack", { autoAlpha: 0, y: 20, duration: 1, ease: "expo.out" }, 1.1);

      // As the About card rises over it, the hero sinks back.
      gsap.to(".hero-inner", {
        scale: 0.92,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="sticky top-0 h-svh min-h-[640px] overflow-hidden">
      <div className="hero-inner relative flex h-full flex-col items-center">
        <Orb className="hero-orb absolute left-1/2 top-[-4%] h-[62vh] w-[62vh] max-w-[92vw] -translate-x-1/2" />

        <h1 className="relative z-10 mt-auto px-4 pb-[18vh] text-center text-[clamp(2.75rem,8.35vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.05em] md:pb-[22vh]">
          {hero.lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              {line.split(" ").map((word, wi, arr) => (
                <span key={wi} className="hero-word inline-block whitespace-nowrap">
                  {word.split("").map((c, ci) => (
                    <span key={ci} className="hero-char">
                      {c}
                    </span>
                  ))}
                  {wi < arr.length - 1 && " "}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="hero-stack absolute inset-x-0 bottom-6 md:bottom-8">
          <p className="label mb-5 text-center text-smoke">Tech stack</p>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <ul className="marquee flex w-max gap-16 pr-16" style={{ ["--speed" as string]: "45s" }}>
              {[...stack, ...stack].map((s, i) => (
                <li key={i} className="whitespace-nowrap text-[18px] font-medium tracking-[-0.02em] text-[#8a8a8a]" aria-hidden={i >= stack.length}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
