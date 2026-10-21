'use client';

import { useEffect, useRef } from 'react';

const PULSE_COLORS = ['#5ccff5', '#8b5cf6', '#2dd4bf', '#f5f3db'];
const CELL = 56;

interface Trace {
  points: [number, number][];
  length: number;
}

interface Pulse {
  trace: Trace;
  t: number;
  speed: number;
  color: string;
}

interface BinaryColumn {
  x: number;
  y: number;
  speed: number;
  chars: string;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildTraces(cols: number, rows: number, count: number): Trace[] {
  const traces: Trace[] = [];
  for (let i = 0; i < count; i++) {
    let x = Math.floor(rand(0, cols));
    let y = Math.floor(rand(0, rows));
    const points: [number, number][] = [[x * CELL, y * CELL]];
    let horizontal = Math.random() > 0.5;
    const segments = Math.floor(rand(2, 6));
    for (let s = 0; s < segments; s++) {
      const step = Math.floor(rand(1, 5)) * (Math.random() > 0.5 ? 1 : -1);
      if (horizontal) x = Math.max(0, Math.min(cols, x + step));
      else y = Math.max(0, Math.min(rows, y + step));
      points.push([x * CELL, y * CELL]);
      horizontal = !horizontal;
    }
    let length = 0;
    for (let p = 1; p < points.length; p++) {
      length += Math.abs(points[p][0] - points[p - 1][0]) + Math.abs(points[p][1] - points[p - 1][1]);
    }
    if (length > 0) traces.push({ points, length });
  }
  return traces;
}

function pointAt(trace: Trace, t: number): [number, number] {
  let remaining = t * trace.length;
  for (let p = 1; p < trace.points.length; p++) {
    const [x0, y0] = trace.points[p - 1];
    const [x1, y1] = trace.points[p];
    const seg = Math.abs(x1 - x0) + Math.abs(y1 - y0);
    if (remaining <= seg) {
      const k = seg === 0 ? 0 : remaining / seg;
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
    }
    remaining -= seg;
  }
  return trace.points[trace.points.length - 1];
}

/**
 * Full-screen animated circuit board: static traces, microchips and nodes are
 * painted once to an offscreen layer; light pulses and binary rain animate on
 * top. Honors prefers-reduced-motion by rendering a single still frame.
 */
export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staticLayer = document.createElement('canvas');
    const staticCtx = staticLayer.getContext('2d')!;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let binary: BinaryColumn[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      for (const c of [canvas, staticLayer]) {
        c.width = width * dpr;
        c.height = height * dpr;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      const density = width < 640 ? 0.35 : 0.6;
      traces = buildTraces(cols, rows, Math.floor(cols * rows * density * 0.25));
      pulses = traces
        .filter(() => Math.random() > 0.55)
        .map((trace) => ({
          trace,
          t: Math.random(),
          speed: rand(0.0015, 0.005),
          color: PULSE_COLORS[Math.floor(rand(0, PULSE_COLORS.length))],
        }));
      binary = Array.from({ length: Math.floor(width / 90) }, () => ({
        x: rand(0, width),
        y: rand(-height, height),
        speed: rand(0.2, 0.6),
        chars: Array.from({ length: 14 }, () => (Math.random() > 0.5 ? '1' : '0')).join(''),
      }));

      // Static layer: traces, vias and microchips.
      staticCtx.clearRect(0, 0, width, height);
      staticCtx.lineWidth = 1;
      for (const trace of traces) {
        staticCtx.strokeStyle = 'rgba(92, 207, 245, 0.10)';
        staticCtx.beginPath();
        trace.points.forEach(([x, y], i) => (i ? staticCtx.lineTo(x, y) : staticCtx.moveTo(x, y)));
        staticCtx.stroke();
        for (const [x, y] of [trace.points[0], trace.points[trace.points.length - 1]]) {
          staticCtx.strokeStyle = 'rgba(245, 243, 219, 0.22)';
          staticCtx.beginPath();
          staticCtx.arc(x, y, 2.6, 0, Math.PI * 2);
          staticCtx.stroke();
        }
      }
      const chips = Math.max(3, Math.floor((cols * rows) / 90));
      for (let i = 0; i < chips; i++) {
        const w = CELL * Math.floor(rand(1, 3)) + CELL / 2;
        const h = CELL * Math.floor(rand(1, 2)) + CELL / 2;
        const x = Math.floor(rand(0, cols)) * CELL - w / 2;
        const y = Math.floor(rand(0, rows)) * CELL - h / 2;
        const grad = staticCtx.createLinearGradient(x, y, x + w, y + h);
        grad.addColorStop(0, 'rgba(40, 56, 144, 0.32)');
        grad.addColorStop(1, 'rgba(47, 47, 44, 0.5)');
        staticCtx.fillStyle = grad;
        staticCtx.strokeStyle = 'rgba(245, 243, 219, 0.16)';
        staticCtx.beginPath();
        staticCtx.roundRect(x, y, w, h, 6);
        staticCtx.fill();
        staticCtx.stroke();
        staticCtx.strokeStyle = 'rgba(200, 200, 210, 0.18)';
        for (let px = x + 8; px < x + w - 4; px += 9) {
          staticCtx.beginPath();
          staticCtx.moveTo(px, y);
          staticCtx.lineTo(px, y - 6);
          staticCtx.moveTo(px, y + h);
          staticCtx.lineTo(px, y + h + 6);
          staticCtx.stroke();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(staticLayer, 0, 0, width, height);

      ctx.font = '600 11px Poppins, monospace';
      for (const col of binary) {
        for (let i = 0; i < col.chars.length; i++) {
          const alpha = 0.09 * (1 - i / col.chars.length);
          ctx.fillStyle = `rgba(92, 207, 245, ${alpha})`;
          ctx.fillText(col.chars[i], col.x, col.y - i * 14);
        }
        if (!reduceMotion) {
          col.y += col.speed;
          if (col.y - col.chars.length * 14 > height) col.y = rand(-200, 0);
        }
      }

      for (const pulse of pulses) {
        const [x, y] = pointAt(pulse.trace, pulse.t);
        const [tx, ty] = pointAt(pulse.trace, Math.max(0, pulse.t - 40 / pulse.trace.length));
        const tail = ctx.createLinearGradient(tx, ty, x, y);
        tail.addColorStop(0, 'transparent');
        tail.addColorStop(1, pulse.color);
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = pulse.color;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (!reduceMotion) {
          pulse.t += pulse.speed;
          if (pulse.t > 1) pulse.t = 0;
        }
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        cancelAnimationFrame(frame);
        setup();
        draw();
      }, 150);
    };

    setup();
    draw();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div aria-hidden className="no-print pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(40,56,144,0.55),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.22),transparent_50%),radial-gradient(ellipse_at_center,rgba(45,212,191,0.08),transparent_60%)]" />
      <div className="floor-grid" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(25,25,23,0.85)_100%)]" />
    </div>
  );
}
