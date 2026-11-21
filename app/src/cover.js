/* Vice Coast cover engine — every panel is a real photo run through a comic
   treatment (posterize + ink edges + halftone + gradient-map grade), drawn on
   canvas. No game art, no game fonts: lettering is a system condensed stack. */

export const LAYOUTS = [
  {
    id: "hero-three", name: "Hero + Three", note: "Big hero, three stacked",
    panels: [
      { x: 0.0, y: 0.0, w: 0.60, h: 1.0, rot: 0 },
      { x: 0.62, y: 0.0, w: 0.38, h: 0.323, rot: 0 },
      { x: 0.62, y: 0.338, w: 0.38, h: 0.324, rot: 0 },
      { x: 0.62, y: 0.677, w: 0.38, h: 0.323, rot: 0 },
    ],
  },
  {
    id: "four-corners", name: "Four Corners", note: "Classic 2 × 2 poster grid",
    panels: [
      { x: 0.0, y: 0.0, w: 0.49, h: 0.485, rot: 0 },
      { x: 0.51, y: 0.0, w: 0.49, h: 0.485, rot: 0 },
      { x: 0.0, y: 0.515, w: 0.49, h: 0.485, rot: 0 },
      { x: 0.51, y: 0.515, w: 0.49, h: 0.485, rot: 0 },
    ],
  },
  {
    id: "nine-panel", name: "Nine Panel", note: "Dense 3 × 3 comic grid",
    panels: [
      { x: 0.0, y: 0.0, w: 0.326, h: 0.326, rot: 0 },
      { x: 0.337, y: 0.0, w: 0.326, h: 0.326, rot: 0 },
      { x: 0.674, y: 0.0, w: 0.326, h: 0.326, rot: 0 },
      { x: 0.0, y: 0.337, w: 0.326, h: 0.326, rot: 0 },
      { x: 0.337, y: 0.337, w: 0.326, h: 0.326, rot: 0 },
      { x: 0.674, y: 0.337, w: 0.326, h: 0.326, rot: 0 },
      { x: 0.0, y: 0.674, w: 0.326, h: 0.326, rot: 0 },
      { x: 0.337, y: 0.674, w: 0.326, h: 0.326, rot: 0 },
      { x: 0.674, y: 0.674, w: 0.326, h: 0.326, rot: 0 },
    ],
  },
  {
    id: "full-bleed", name: "Full Bleed", note: "One huge photo, big type",
    panels: [{ x: 0.0, y: 0.0, w: 1.0, h: 1.0, rot: 0 }],
  },
  {
    id: "tilted", name: "Tilted Snaps", note: "Scattered polaroid energy",
    panels: [
      { x: 0.05, y: 0.03, w: 0.60, h: 0.94, rot: -2 },
      { x: 0.69, y: 0.04, w: 0.28, h: 0.44, rot: 3 },
      { x: 0.69, y: 0.52, w: 0.28, h: 0.44, rot: -3 },
    ],
  },
  {
    id: "film-strip", name: "Film Strip", note: "Four frames over a hero",
    panels: [
      { x: 0.0, y: 0.0, w: 0.2425, h: 0.40, rot: 0 },
      { x: 0.2525, y: 0.0, w: 0.2425, h: 0.40, rot: 0 },
      { x: 0.505, y: 0.0, w: 0.2425, h: 0.40, rot: 0 },
      { x: 0.7575, y: 0.0, w: 0.2425, h: 0.40, rot: 0 },
      { x: 0.0, y: 0.415, w: 1.0, h: 0.585, rot: 0 },
    ],
  },
];

export const GRADES = [
  {
    id: "sunset", name: "Vice Sunset", note: "Orange → pink dusk",
    stops: [[0, [26, 8, 38]], [0.28, [122, 28, 74]], [0.55, [232, 84, 60]], [0.8, [255, 178, 92]], [1, [255, 244, 214]]],
    glow: "rgba(255,122,24,0.34)", sky: "#ff7a18",
  },
  {
    id: "neon-night", name: "Neon Night", note: "Magenta + teal after dark",
    stops: [[0, [8, 6, 34]], [0.3, [64, 16, 96]], [0.55, [214, 38, 140]], [0.8, [64, 224, 208]], [1, [232, 252, 250]]],
    glow: "rgba(255,46,136,0.38)", sky: "#ff2e88",
  },
  {
    id: "vice-pink", name: "Vice Pink", note: "Bubblegum + violet",
    stops: [[0, [30, 6, 44]], [0.3, [128, 30, 110]], [0.55, [255, 94, 168]], [0.8, [255, 178, 220]], [1, [255, 246, 250]]],
    glow: "rgba(255,94,168,0.32)", sky: "#ff5ea8",
  },
  {
    id: "golden-hour", name: "Golden Hour", note: "Warm amber light",
    stops: [[0, [24, 16, 6]], [0.3, [110, 66, 18]], [0.55, [214, 138, 44]], [0.8, [255, 204, 110]], [1, [255, 248, 224]]],
    glow: "rgba(255,179,71,0.36)", sky: "#ffb347",
  },
  {
    id: "ink-noir", name: "Ink Noir", note: "High-contrast comic ink",
    stops: [[0, [8, 8, 10]], [0.35, [52, 52, 58]], [0.6, [140, 140, 148]], [0.85, [214, 214, 220]], [1, [255, 250, 238]]],
    glow: "rgba(255,244,214,0.20)", sky: "#e8e2d4",
  },
];

export const SIZES = [
  { id: "square", name: "Square", note: "1080 × 1080", w: 1080, h: 1080 },
  { id: "portrait", name: "Portrait", note: "1080 × 1350", w: 1080, h: 1350 },
  { id: "wide", name: "Wide", note: "1920 × 1080", w: 1920, h: 1080 },
];

export function layoutById(id) {
  return LAYOUTS.find((l) => l.id === id) || LAYOUTS[0];
}
export function gradeById(id) {
  return GRADES.find((g) => g.id === id) || GRADES[0];
}
export function sizeById(id) {
  return SIZES.find((s) => s.id === id) || SIZES[2];
}

function gradeColor(grade, t) {
  const stops = grade.stops;
  if (t <= 0) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1];
      const [t1, c1] = stops[i];
      const f = (t - t0) / (t1 - t0);
      return [c0[0] + (c1[0] - c0[0]) * f, c0[1] + (c1[1] - c0[1]) * f, c0[2] + (c1[2] - c0[2]) * f];
    }
  }
  return stops[stops.length - 1][1];
}

/* Turn one photo into one comic panel: cover-fit crop, posterize, Sobel ink
   edges, halftone dots in the shadows, gradient-map grade, grain, vignette. */
export function comicPanel(img, pw, ph, panel, grade, inkAmt, halfAmt) {
  const c = document.createElement("canvas");
  c.width = Math.max(2, pw);
  c.height = Math.max(2, ph);
  const g = c.getContext("2d");
  g.fillStyle = "#111";
  g.fillRect(0, 0, pw, ph);
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const zoom = (panel.zoom || 100) / 100;
  const base = Math.max(pw / iw, ph / ih) * zoom;
  const dw = iw * base;
  const dh = ih * base;
  // Clamp the pan so the photo always covers the whole panel (no gaps).
  const rawDx = (pw - dw) / 2 + ((panel.panX || 0) / 100) * pw * 0.5;
  const rawDy = (ph - dh) / 2 + ((panel.panY || 0) / 100) * ph * 0.5;
  const dx = Math.min(0, Math.max(pw - dw, rawDx));
  const dy = Math.min(0, Math.max(ph - dh, rawDy));
  g.drawImage(img, dx, dy, dw, dh);

  const data = g.getImageData(0, 0, pw, ph);
  const px = data.data;
  const lum = new Float32Array(pw * ph);
  for (let i = 0; i < pw * ph; i++) {
    const r = px[i * 4], gg = px[i * 4 + 1], b = px[i * 4 + 2];
    lum[i] = (0.299 * r + 0.587 * gg + 0.114 * b) / 255;
  }
  const ink = inkAmt / 100;
  const half = halfAmt / 100;
  const cx = pw / 2, cy = ph / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);
  for (let y = 0; y < ph; y++) {
    for (let x = 0; x < pw; x++) {
      const i = y * pw + x;
      const at = (xx, yy) => {
        const qx = Math.min(pw - 1, Math.max(0, xx));
        const qy = Math.min(ph - 1, Math.max(0, yy));
        return lum[qy * pw + qx];
      };
      const gx =
        -at(x - 1, y - 1) - 2 * at(x - 1, y) - at(x - 1, y + 1) +
        at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1);
      const gy =
        -at(x - 1, y - 1) - 2 * at(x, y - 1) - at(x + 1, y - 1) +
        at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1);
      const edge = Math.min(1, Math.sqrt(gx * gx + gy * gy) / 1.6);
      let t = Math.round(lum[i] * 4) / 4;
      t = Math.min(1, Math.max(0, t));
      const col = gradeColor(grade, t);
      let r = col[0], gg = col[1], b = col[2];
      // Ink: pull strong edges toward black.
      const e = edge * ink;
      r *= 1 - e; gg *= 1 - e; b *= 1 - e;
      // Halftone: dot grid darkens the shadows.
      if (half > 0 && lum[i] < 0.52) {
        const cell = 6;
        const ox = x % cell - cell / 2;
        const oy = y % cell - cell / 2;
        const rad = (0.52 - lum[i]) * 7.5;
        if (ox * ox + oy * oy < rad * rad) {
          const d = half * 0.75;
          r *= 1 - d; gg *= 1 - d; b *= 1 - d;
        }
      }
      // Vignette + grain.
      const dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)) / maxDist;
      const vig = 1 - 0.22 * dist * dist;
      const grain = (Math.random() - 0.5) * 16;
      px[i * 4] = Math.max(0, Math.min(255, r * vig + grain));
      px[i * 4 + 1] = Math.max(0, Math.min(255, gg * vig + grain));
      px[i * 4 + 2] = Math.max(0, Math.min(255, b * vig + grain));
    }
  }
  g.putImageData(data, 0, 0);
  return c;
}

function fitTitleFont(ctx, text, maxWidth, startPx) {
  let px = startPx;
  const fam = '"Arial Black", "Arial Narrow", "Helvetica Neue", sans-serif';
  while (px > 24) {
    ctx.font = `900 ${px}px ${fam}`;
    if (ctx.measureText(text).width * 0.86 <= maxWidth) return px;
    px -= 4;
  }
  return px;
}

function drawLettering(ctx, state, W, H) {
  const title = (state.title || "VICE COAST").toUpperCase();
  const sub = state.subtitle || "";
  const badge = state.badge || "";
  const heat = state.heat || 0;
  const bandH = Math.round(H * 0.235);
  const bandY = H - bandH;
  // Title band: dark gradient rising from the bottom edge.
  const band = ctx.createLinearGradient(0, bandY - H * 0.05, 0, H);
  band.addColorStop(0, "rgba(10,4,18,0)");
  band.addColorStop(0.35, "rgba(10,4,18,0.72)");
  band.addColorStop(1, "rgba(10,4,18,0.92)");
  ctx.fillStyle = band;
  ctx.fillRect(0, bandY - H * 0.05, W, bandH + H * 0.05);
  // Hot rule line above the title.
  ctx.fillStyle = "#ff2e88";
  ctx.fillRect(0, bandY + 2, W, Math.max(3, H * 0.006));
  ctx.fillStyle = "#ffb347";
  ctx.fillRect(0, bandY + 2 + Math.max(3, H * 0.006), W, Math.max(2, H * 0.003));

  // Title: condensed, black outline, sunset gradient fill, hard shadow.
  const maxW = W * 0.94;
  const size = fitTitleFont(ctx, title, maxW, Math.round(H * 0.155));
  ctx.save();
  ctx.translate(W / 2, bandY + bandH * 0.52);
  ctx.scale(0.86, 1);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.85)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = Math.round(size * 0.045);
  ctx.shadowOffsetY = Math.round(size * 0.06);
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(4, size * 0.11);
  ctx.strokeStyle = "#0a0412";
  ctx.strokeText(title, 0, 0);
  ctx.shadowColor = "transparent";
  const fill = ctx.createLinearGradient(0, -size * 0.5, 0, size * 0.55);
  fill.addColorStop(0, "#fff8ec");
  fill.addColorStop(0.45, "#ffb347");
  fill.addColorStop(0.75, "#ff5e8a");
  fill.addColorStop(1, "#7b2fff");
  ctx.fillStyle = fill;
  ctx.fillText(title, 0, 0);
  ctx.lineWidth = Math.max(1.5, size * 0.018);
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.strokeText(title, 0, 0);
  ctx.restore();

  // Subtitle: italic script-style line under the title.
  if (sub) {
    ctx.save();
    ctx.font = `italic 700 ${Math.round(H * 0.042)}px Georgia, "Times New Roman", serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.lineWidth = Math.max(2, H * 0.004);
    ctx.strokeStyle = "#0a0412";
    const sy = bandY + bandH * 0.82;
    ctx.strokeText(sub, W / 2, sy);
    ctx.fillStyle = "#ffe9f2";
    ctx.fillText(sub, W / 2, sy);
    ctx.restore();
  }

  // Badge ribbon, top-left, slight tilt.
  if (badge) {
    ctx.save();
    ctx.translate(W * 0.035, H * 0.045);
    ctx.rotate(-0.06);
    ctx.font = `900 ${Math.round(H * 0.032)}px "Arial Narrow", Arial, sans-serif`;
    const bw = ctx.measureText(badge.toUpperCase()).width + H * 0.05;
    const bh = H * 0.062;
    ctx.fillStyle = "#0a0412";
    ctx.fillRect(-4, -4, bw + 8, bh + 8);
    ctx.fillStyle = "#ff2e88";
    ctx.fillRect(0, 0, bw, bh);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(badge.toUpperCase(), bw / 2, bh / 2 + 1);
    ctx.restore();
  }

  // Heat stars, top-right.
  if (heat > 0) {
    ctx.save();
    ctx.font = `${Math.round(H * 0.042)}px Arial, sans-serif`;
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    const stars = "★".repeat(heat) + "☆".repeat(5 - heat);
    ctx.lineWidth = Math.max(2, H * 0.005);
    ctx.strokeStyle = "#0a0412";
    ctx.strokeText(stars, W * 0.97, H * 0.035);
    ctx.fillStyle = "#ffd23e";
    ctx.fillText(stars, W * 0.97, H * 0.035);
    ctx.restore();
  }
}

/* Draw the whole cover into ctx at W×H. photos: array of loaded images
   (HTMLImageElement). state.panels[i].photo is an index into photos. */
export function drawCover(ctx, state, W, H, photos) {
  const layout = layoutById(state.layout);
  const grade = gradeById(state.grade);
  ctx.save();
  ctx.fillStyle = "#0a0412";
  ctx.fillRect(0, 0, W, H);
  // Warm glow wash behind the panels.
  const glow = ctx.createRadialGradient(W * 0.82, H * 0.08, 0, W * 0.82, H * 0.08, W * 0.75);
  glow.addColorStop(0, grade.glow);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  layout.panels.forEach((p, i) => {
    const pw = Math.round(p.w * W);
    const ph = Math.round(p.h * H);
    const px = Math.round(p.x * W);
    const py = Math.round(p.y * H);
    const panelState = state.panels[i] || { photo: 0, zoom: 100, panX: 0, panY: 0 };
    const img = photos[panelState.photo] || photos[0];
    ctx.save();
    if (p.rot) {
      ctx.translate(px + pw / 2, py + ph / 2);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.translate(-pw / 2, -ph / 2);
    } else {
      ctx.translate(px, py);
    }
    // White polaroid-style frame around the panel.
    ctx.fillStyle = "#fff6ec";
    ctx.fillRect(-Math.max(3, W * 0.004), -Math.max(3, W * 0.004), pw + Math.max(6, W * 0.008), ph + Math.max(6, W * 0.008));
    if (img) {
      const treated = comicPanel(img, pw, ph, panelState, grade, state.ink, state.halftone);
      ctx.drawImage(treated, 0, 0);
    } else {
      ctx.fillStyle = "#2a1445";
      ctx.fillRect(0, 0, pw, ph);
      ctx.fillStyle = "#c9a8e8";
      ctx.font = `${Math.round(ph * 0.08)}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("ADD A PHOTO", pw / 2, ph / 2);
    }
    ctx.strokeStyle = "rgba(10,4,18,0.9)";
    ctx.lineWidth = Math.max(2, W * 0.002);
    ctx.strokeRect(0, 0, pw, ph);
    ctx.restore();
  });
  ctx.restore();
  drawLettering(ctx, state, W, H);
}

/* Render a cover to a fresh canvas at the requested size. */
export function renderCover(state, size, photos) {
  const c = document.createElement("canvas");
  c.width = size.w;
  c.height = size.h;
  const ctx = c.getContext("2d");
  drawCover(ctx, state, size.w, size.h, photos);
  return c;
}
