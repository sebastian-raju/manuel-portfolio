"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { about } from "@/content";
import { PillLink } from "./ui";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".about-word",
        { color: "#2e2e2e" },
        {
          color: "#f4f1ee",
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.from(".about-tag", {
        scale: 0,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".about-tag", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="about"
      ref={root}
      className="relative z-10 rounded-t-[28px] bg-panel px-5 pb-32 pt-28 md:rounded-t-[48px] md:px-10 md:pb-48 md:pt-40"
    >
      <div className="md:ml-[calc(29.2%-40px)] md:max-w-[620px]">
        <span className="about-tag label inline-block rounded-[3px] bg-coral px-2 py-0.5 text-bone">About</span>
        <p className="about-text mt-6 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.05em]">
          {about.split(" ").map((w, i) => (
            <span key={i} className="about-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <div className="mt-14">
          <PillLink href="#work">View work</PillLink>
        </div>
      </div>
    </section>
  );
}
