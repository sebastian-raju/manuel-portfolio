"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * A slowly turning sphere of points, drawn on canvas. Points nearer the viewer
 * are larger and brighter; the pointer tilts it. Stands in for a 3D hero object
 * without shipping a 3D library.
 */
export default function Orb({ className = "", points = 2400, speed = 1 }: { className?: string; points?: number; speed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const still = prefersReducedMotion();

    // Fibonacci sphere, with a little noise so it reads as organic, not mechanical.
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < points; i++) {
      const y = 1 - (i / (points - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      const wobble = 1 + Math.sin(i * 12.9898) * 0.035;
      pts.push([Math.cos(t) * r * wobble, y * wobble, Math.sin(t) * r * wobble]);
    }

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let tx = 0, ty = 0, mx = 0, my = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      ty = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    let angle = 0;
    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      raf = requestAnimationFrame(draw);
      if (!visible && !still) return;
      angle += dt * 0.00018 * speed;
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2, cy = h / 2;
      const ay = angle + mx, ax = 0.35 + my;
      const cosY = Math.cos(ay), sinY = Math.sin(ay), cosX = Math.cos(ax), sinX = Math.sin(ax);

      for (const [x0, y0, z0] of pts) {
        const x1 = x0 * cosY - z0 * sinY;
        const z1 = x0 * sinY + z0 * cosY;
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2; // 0 back, 1 front
        const persp = 1 / (1.9 - z2 * 0.5);
        const px = cx + x1 * R * persp * 1.6;
        const py = cy + y2 * R * persp * 1.6;
        const size = 0.6 + depth * 1.9;
        ctx.globalAlpha = 0.1 + depth * depth * 0.9;
        ctx.fillStyle = "#f4f1ee";
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }
      if (still) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [points, speed]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
