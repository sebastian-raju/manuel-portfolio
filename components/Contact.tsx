"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { contact, site } from "@/content";
import { SectionHead } from "./ui";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".contact-line", {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".contact-title", start: "top 85%" },
      });
      gsap.from(".faq", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".faq-grid", start: "top 85%" },
      });
      gsap.from(".cta-text", {
        yPercent: 100,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cta", start: "top 95%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="relative bg-coral text-void">
      <div className="px-5 pb-24 pt-10 md:px-10 md:pb-40">
        <SectionHead index={8} label="Contact" dark />
        <div className="mt-16 grid gap-16 md:mt-28 md:grid-cols-[442px_1fr] md:gap-10">
          <h2 className="contact-title text-[clamp(3rem,4.5vw,4rem)] leading-none tracking-[-0.03em]">
            {contact.title.map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <span className="contact-line block">{l}</span>
              </span>
            ))}
          </h2>
          <ul className="faq-grid grid gap-x-12 gap-y-14 sm:grid-cols-2">
            {contact.faq.map((f, i) => (
              <li key={f.q} className="faq grid grid-cols-[28px_1fr] gap-x-2">
                <span className="label pt-2 text-black/55">00{i + 1}</span>
                <div>
                  <h3 className="text-[28px] leading-[1.2] tracking-[-0.055em]">{f.q}</h3>
                  <p className="mt-3 max-w-[40ch] text-[16px] leading-[1.5] text-black/80">
                    {f.a}
                    {i === contact.faq.length - 1 && (
                      <>
                        {" "}
                        <a className="underline underline-offset-4 hover:no-underline" href={`mailto:${site.email}`}>
                          {site.email}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={`mailto:${site.email}`}
        className="cta group flex flex-wrap items-center justify-between gap-6 bg-void px-5 py-10 md:px-10 md:py-14"
      >
        <span className="overflow-hidden">
          <span className="cta-text block text-[clamp(2.5rem,5.4vw,4.9rem)] font-semibold uppercase leading-none tracking-[-0.065em] text-bone">
            Send a message
          </span>
        </span>
        <span className="rounded-full bg-bone px-8 py-3 text-[clamp(2.5rem,5.4vw,4.9rem)] font-semibold uppercase leading-none tracking-[-0.065em] text-void transition-[background-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-coral group-hover:px-14">
          Here
        </span>
      </a>

      <footer className="label flex flex-col gap-2 bg-void px-5 pb-8 text-ash md:flex-row md:justify-between md:px-10">
        <span>
          © {site.year} {site.firstName} {site.lastName}
        </span>
        <span>{site.location}</span>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
          LinkedIn
        </a>
      </footer>
    </section>
  );
}
