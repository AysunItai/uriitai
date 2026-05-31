"use client";

import { useEffect, useRef } from "react";

/**
 * Live mathematical artwork for the hero: a 4-point interpolatory
 * subdivision scheme (Dyn–Levin–Gregory). Control points orbit a slow
 * attractor, the cursor adds a soft perturbation, and the curve is
 * recomputed every frame across several refinement levels — drawing
 * the limit curve onto the page in real time.
 *
 * Picked deliberately because subdivision schemes are exactly Uri's
 * Ph.D. subject: refining sequences of geometric objects toward a
 * smooth limit. The site itself becomes a working illustration of his
 * research.
 */

type Pt = { x: number; y: number };

const TAU = Math.PI * 2;
const W4 = -1 / 16;
const W9 = 9 / 16;

function refineFourPoint(points: Pt[]): Pt[] {
  const n = points.length;
  if (n < 4) return points;
  const out: Pt[] = [];
  for (let i = 0; i < n - 1; i++) {
    const pm = points[Math.max(0, i - 1)];
    const p0 = points[i];
    const p1 = points[i + 1];
    const p2 = points[Math.min(n - 1, i + 2)];
    out.push(p0);
    out.push({
      x: W4 * pm.x + W9 * p0.x + W9 * p1.x + W4 * p2.x,
      y: W4 * pm.y + W9 * p0.y + W9 * p1.y + W4 * p2.y,
    });
  }
  out.push(points[n - 1]);
  return out;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    // Whether the canvas is currently in (or near) the viewport. We
    // pause the animation loop when it scrolls out of view — saves a
    // lot of battery on Samsung Galaxy / mid-range Android, where the
    // GPU can otherwise burn cycles repainting an off-screen canvas
    // for the entire scroll session.
    let inView = true;

    const pointer = { x: 0.5, y: 0.5, active: 0 };
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SEEDS = 7;
    type Seed = { ax: number; ay: number; rx: number; ry: number; phase: number; speed: number };
    const seeds: Seed[] = Array.from({ length: SEEDS }, (_, i) => ({
      ax: 0.12 + (i / (SEEDS - 1)) * 0.76,
      ay: 0.5 + Math.sin(i * 1.7) * 0.18,
      rx: 0.04 + (i % 3) * 0.018,
      ry: 0.06 + ((i + 1) % 3) * 0.022,
      phase: i * 0.9,
      speed: 0.00018 + (i % 4) * 0.00006,
    }));

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function controlPoints(t: number): Pt[] {
      const cx = width;
      const cy = height;
      const px = pointer.x * cx;
      const py = pointer.y * cy;
      return seeds.map((s, i) => {
        const tt = t * s.speed + s.phase;
        let x = (s.ax + Math.cos(tt) * s.rx) * cx;
        let y = (s.ay + Math.sin(tt * 1.13) * s.ry) * cy;
        const dx = px - x;
        const dy = py - y;
        const d2 = dx * dx + dy * dy;
        const radius = Math.min(width, height) * 0.45;
        const falloff = Math.exp(-d2 / (radius * radius));
        const pull = 0.18 * pointer.active * falloff * (i % 2 === 0 ? 1 : -1);
        x += dx * pull;
        y += dy * pull;
        return { x, y };
      });
    }

    function drawCurve(points: Pt[], opacity: number, weight: number) {
      if (!ctx || points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      const last = points.length - 1;
      ctx.quadraticCurveTo(
        points[last - 1].x,
        points[last - 1].y,
        points[last].x,
        points[last].y
      );
      ctx.strokeStyle = `rgba(20, 17, 15, ${opacity})`;
      ctx.lineWidth = weight;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    function drawDot(p: Pt, r: number, color: string) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, TAU);
      ctx.fillStyle = color;
      ctx.fill();
    }

    let t0 = performance.now();

    function frame(now: number) {
      if (!ctx) return;
      // Skip the actual render when the canvas isn't in view. We still
      // continue the rAF chain so that becoming-visible can resume
      // smoothly, but we avoid the repaint cost — the dominant
      // expense on low/mid-range Android.
      if (!inView) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const t = reduceMotion ? 0 : now - t0;

      ctx.clearRect(0, 0, width, height);

      const cps = controlPoints(t);

      // Draw progressive refinement levels — earlier levels lighter,
      // creating a ghost-trail of how the limit curve emerges.
      let pts = cps.slice();
      const levels = 5;
      for (let level = 0; level <= levels; level++) {
        const o = 0.05 + (level / levels) * 0.55;
        const w = level === levels ? 1.1 : 0.45;
        drawCurve(pts, o, w);
        if (level < levels) pts = refineFourPoint(pts);
      }

      // The polyline of control points — the "skeleton" of the curve.
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([2, 6]);
      ctx.moveTo(cps[0].x, cps[0].y);
      for (let i = 1; i < cps.length; i++) ctx.lineTo(cps[i].x, cps[i].y);
      ctx.strokeStyle = "rgba(139, 58, 31, 0.35)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();

      for (const p of cps) {
        drawDot(p, 2.5, "rgba(139, 58, 31, 0.9)");
        drawDot(p, 6, "rgba(139, 58, 31, 0.12)");
      }

      // Pointer attractor — only painted when active.
      if (pointer.active > 0.02) {
        ctx.beginPath();
        ctx.arc(
          pointer.x * width,
          pointer.y * height,
          22 * pointer.active,
          0,
          TAU
        );
        ctx.strokeStyle = `rgba(20, 17, 15, ${0.18 * pointer.active})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      pointer.active *= 0.985;

      raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.active = Math.min(1, pointer.active + 0.18);
    }

    function onLeave() {
      pointer.active = 0;
    }

    resize();
    raf = requestAnimationFrame(frame);

    // IntersectionObserver lets us pause the rAF loop when the hero
    // scrolls out of the viewport. rootMargin "200px" keeps the curve
    // running for a moment after it leaves view so that scrolling
    // *back* doesn't reveal a frozen frame.
    const io = new IntersectionObserver(
      ([entry]) => {
        const becameVisible = entry.isIntersecting && !inView;
        inView = entry.isIntersecting;
        if (becameVisible) {
          // Reset the time origin so the curve doesn't jump forward
          // by however many seconds we paused for.
          t0 = performance.now();
          raf = requestAnimationFrame(frame);
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
