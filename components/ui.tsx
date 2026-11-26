import type { ReactNode } from "react";

export const TOTAL_SECTIONS = 8;

export function SectionHead({ index, label, dark = false }: { index: number; label: string; dark?: boolean }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div
      className={`label grid grid-cols-[1fr_2fr] gap-4 border-t pt-3 md:grid-cols-[361px_1fr] ${
        dark ? "border-black/25 text-black/60" : "border-white/10 text-ash"
      }`}
    >
      <span>
        [ {pad(index)} / {pad(TOTAL_SECTIONS)} ]
      </span>
      <span className={dark ? "text-black" : ""}>{label}</span>
    </div>
  );
}

export function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

export function PillLink({
  href,
  children,
  external = false,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 font-mono text-[12px] uppercase tracking-[0.02em] transition-colors duration-300 ${
        tone === "light"
          ? "border-white/25 text-bone hover:border-bone hover:bg-bone hover:text-void"
          : "border-black/30 text-void hover:bg-void hover:text-bone"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-coral transition-transform duration-300 group-hover:scale-150" aria-hidden />
      <Roll>{children}</Roll>
    </a>
  );
}
