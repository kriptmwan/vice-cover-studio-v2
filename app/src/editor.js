/* Vice Coast editor — wires the cover engine to the page: photo uploads,
   layout / grade / size pickers, per-panel crop controls, undo-redo, PNG
   export, and the ?shot= scenes the screenshots are taken from. */
import { LAYOUTS, GRADES, SIZES, layoutById, gradeById, sizeById, drawCover, renderCover } from "./cover.js";

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const shot = params.get("shot") || "";

const state = {
  layout: "hero-three",
  grade: "sunset",
  ink: 70,
  halftone: 60,
  title: "VICE COAST",
  subtitle: "Neon nights & golden days",
  badge: "SUNSET EDITION",
  heat: 5,
  size: "wide",
  panels: [],
  selected: 0,
};
const photos = []; // { id, name, img }
let photoSeq = 0;
let history = [];
let future = [];
let renderTimer = 0;

function panelCount() {
  return layoutById(state.layout).panels.length;
}
function ensurePanels() {
  while (state.panels.length < panelCount()) {
    state.panels.push({ photo: state.panels.length % Math.max(1, photos.length), zoom: 100, panX: 0, panY: 0 });
  }
  state.panels.length = panelCount();
  state.panels.forEach((p) => {
    if (!photos[p.photo]) p.photo = 0;
  });
}
function snapshot() {
  return JSON.stringify({ ...state, panels: state.panels.map((p) => ({ ...p })) });
}
function restore(json) {
  const s = JSON.parse(json);
  Object.assign(state, s);
  state.panels = s.panels;
  syncControls();
}
function pushHistory() {
  history.push(snapshot());
  if (history.length > 60) history.shift();
  future = [];
  syncUndoButtons();
}
function syncUndoButtons() {
  $("btnUndo").disabled = history.length === 0;
  $("btnRedo").disabled = future.length === 0;
}

function previewDims() {
  const size = sizeById(state.size);
  const long = shot ? 1280 : 920;
  const scale = long / Math.max(size.w, size.h);
  return { w: Math.round(size.w * scale), h: Math.round(size.h * scale) };
}

function renderPreview() {
  const canvas = $("preview");
  const dims = previewDims();
  if (canvas.width !== dims.w || canvas.height !== dims.h) {
    canvas.width = dims.w;
    canvas.height = dims.h;
  }
  const ctx = canvas.getContext("2d");
  ensurePanels();
  const imgs = photos.map((p) => p.img);
  drawCover(ctx, state, dims.w, dims.h, imgs);
  document.body.dataset.ready = "1";
  $("statusLine").textContent = `Ready — ${panelCount()} panels · ${photos.length} photo${photos.length === 1 ? "" : "s"} · ${sizeById(state.size).note}`;
}
function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderPreview, 60);
}

/* ---------- photos ---------- */
function addPhoto(img, name) {
  photos.push({ id: ++photoSeq, name, img });
  rebuildTray();
  rebuildPanelPhotoSelect();
  rebuildThumbStrip();
  ensurePanels();
  scheduleRender();
}
function loadImageFromUrl(url, name) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { addPhoto(img, name); resolve(img); };
    img.onerror = () => reject(new Error("could not load " + name));
    img.src = url;
  });
}
function loadFile(file) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => { addPhoto(img, file.name); URL.revokeObjectURL(url); };
  img.src = url;
}
function rebuildTray() {
  const tray = $("photoTray");
  tray.innerHTML = "";
  photos.forEach((p, i) => {
    const el = document.createElement("img");
    el.src = p.img.src;
    el.alt = p.name;
    el.title = p.name + " — click to put in the selected panel";
    el.addEventListener("click", () => {
      pushHistory();
      ensurePanels();
      state.panels[state.selected].photo = i;
      rebuildTray();
      scheduleRender();
    });
    tray.appendChild(el);
  });
}
function rebuildPanelPhotoSelect() {
  const sel = $("panelPhoto");
  sel.innerHTML = "";
  photos.forEach((p, i) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = `${i + 1} · ${p.name}`;
    sel.appendChild(o);
  });
  if (photos.length === 0) {
    const o = document.createElement("option");
    o.textContent = "No photos yet";
    sel.appendChild(o);
  }
  ensurePanels();
  sel.value = String(state.panels[state.selected] ? state.panels[state.selected].photo : 0);
}

/* ---------- choice grids ---------- */
function buildChoiceGrid(el, items, current, onPick) {
  el.innerHTML = "";
  items.forEach((it) => {
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `${it.name}<small>${it.note}</small>`;
    if (it.id === current) b.classList.add("active");
    b.addEventListener("click", () => onPick(it.id));
    el.appendChild(b);
  });
}
function rebuildPickers() {
  buildChoiceGrid($("layoutGrid"), LAYOUTS, state.layout, (id) => {
    pushHistory();
    state.layout = id;
    ensurePanels();
    rebuildThumbStrip();
    rebuildPanelPhotoSelect();
    syncControls();
    scheduleRender();
  });
  buildChoiceGrid($("gradeGrid"), GRADES, state.grade, (id) => {
    pushHistory();
    state.grade = id;
    rebuildPickers();
    scheduleRender();
  });
  buildChoiceGrid($("sizeGrid"), SIZES, state.size, (id) => {
    pushHistory();
    state.size = id;
    rebuildPickers();
    scheduleRender();
  });
}
function rebuildThumbStrip() {
  const strip = $("thumbStrip");
  strip.innerHTML = "";
  for (let i = 0; i < panelCount(); i++) {
    const b = document.createElement("button");
    b.type = "button";
    const p = state.panels[i];
    const name = photos[p && p.photo] ? photos[p.photo].name : "empty";
    b.textContent = `Panel ${i + 1} · ${name}`;
    if (i === state.selected) b.classList.add("active");
    b.addEventListener("click", () => {
      state.selected = i;
      rebuildThumbStrip();
      syncPanelControls();
    });
    strip.appendChild(b);
  }
}

function syncPanelControls() {
  ensurePanels();
  const p = state.panels[state.selected];
  $("panelHint").textContent = `Panel ${state.selected + 1} of ${panelCount()} — crop it with the sliders, or pick another photo below.`;
  $("panelPhoto").value = String(p.photo);
  $("zoomRange").value = String(p.zoom);
  $("zoomVal").textContent = p.zoom + "%";
  $("panXRange").value = String(p.panX);
  $("panXVal").textContent = String(p.panX);
  $("panYRange").value = String(p.panY);
  $("panYVal").textContent = String(p.panY);
  rebuildThumbStrip();
}
function syncControls() {
  $("titleInput").value = state.title;
  $("subtitleInput").value = state.subtitle;
  $("badgeInput").value = state.badge;
  $("heatRange").value = String(state.heat);
  $("heatVal").textContent = "★".repeat(state.heat) + "☆".repeat(5 - state.heat);
  $("inkRange").value = String(state.ink);
  $("inkVal").textContent = String(state.ink);
  $("halfRange").value = String(state.halftone);
  $("halfVal").textContent = String(state.halftone);
  rebuildPickers();
  syncPanelControls();
}

/* ---------- events ---------- */
$("fileInput").addEventListener("change", (e) => {
  const files = [...e.target.files];
  if (!files.length) return;
  pushHistory();
  files.forEach(loadFile);
  e.target.value = "";
});
$("btnSampleA").addEventListener("click", () => {
  pushHistory();
  loadImageFromUrl("samples/boulevard.jpg", "Boulevard").catch(() => {});
});
$("btnSampleB").addEventListener("click", () => {
  pushHistory();
  loadImageFromUrl("samples/pier.jpg", "Pier").catch(() => {});
});
$("titleInput").addEventListener("input", (e) => { state.title = e.target.value; scheduleRender(); });
$("titleInput").addEventListener("change", () => pushHistory());
$("subtitleInput").addEventListener("input", (e) => { state.subtitle = e.target.value; scheduleRender(); });
$("subtitleInput").addEventListener("change", () => pushHistory());
$("badgeInput").addEventListener("input", (e) => { state.badge = e.target.value; scheduleRender(); });
$("badgeInput").addEventListener("change", () => pushHistory());
$("heatRange").addEventListener("input", (e) => {
  state.heat = Number(e.target.value);
  $("heatVal").textContent = "★".repeat(state.heat) + "☆".repeat(5 - state.heat);
  scheduleRender();
});
$("heatRange").addEventListener("change", () => pushHistory());
$("inkRange").addEventListener("input", (e) => {
  state.ink = Number(e.target.value);
  $("inkVal").textContent = String(state.ink);
  scheduleRender();
});
$("inkRange").addEventListener("change", () => pushHistory());
$("halfRange").addEventListener("input", (e) => {
  state.halftone = Number(e.target.value);
  $("halfVal").textContent = String(state.halftone);
  scheduleRender();
});
$("halfRange").addEventListener("change", () => pushHistory());
$("panelPhoto").addEventListener("change", (e) => {
  pushHistory();
  state.panels[state.selected].photo = Number(e.target.value);
  rebuildTray();
  rebuildThumbStrip();
  scheduleRender();
});
function bindPanelSlider(id, valId, key, fmt) {
  $(id).addEventListener("input", (e) => {
    state.panels[state.selected][key] = Number(e.target.value);
    $(valId).textContent = fmt(Number(e.target.value));
    scheduleRender();
  });
  $(id).addEventListener("change", () => pushHistory());
}
bindPanelSlider("zoomRange", "zoomVal", "zoom", (v) => v + "%");
bindPanelSlider("panXRange", "panXVal", "panX", (v) => String(v));
bindPanelSlider("panYRange", "panYVal", "panY", (v) => String(v));

$("btnUndo").addEventListener("click", () => {
  if (!history.length) return;
  future.push(snapshot());
  restore(history.pop());
  syncUndoButtons();
  scheduleRender();
});
$("btnRedo").addEventListener("click", () => {
  if (!future.length) return;
  history.push(snapshot());
  restore(future.pop());
  syncUndoButtons();
  scheduleRender();
});
$("btnShuffle").addEventListener("click", () => {
  pushHistory();
  state.layout = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)].id;
  state.grade = GRADES[Math.floor(Math.random() * GRADES.length)].id;
  ensurePanels();
  state.panels.forEach((p) => {
    p.photo = Math.floor(Math.random() * Math.max(1, photos.length));
    p.zoom = 90 + Math.floor(Math.random() * 60);
    p.panX = Math.floor(Math.random() * 41) - 20;
    p.panY = Math.floor(Math.random() * 41) - 20;
  });
  syncControls();
  scheduleRender();
});
$("btnExport").addEventListener("click", () => {
  const size = sizeById(state.size);
  ensurePanels();
  const canvas = renderCover(state, size, photos.map((p) => p.img));
  canvas.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `vice-coast-cover-${state.size}-${size.w}x${size.h}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    $("statusLine").textContent = `Exported ${size.w}×${size.h} PNG — check your downloads.`;
  }, "image/png");
});

/* Click a panel on the preview to select it. */
$("preview").addEventListener("click", (e) => {
  const rect = e.target.getBoundingClientRect();
  const fx = (e.clientX - rect.left) / rect.width;
  const fy = (e.clientY - rect.top) / rect.height;
  const panels = layoutById(state.layout).panels;
  for (let i = panels.length - 1; i >= 0; i--) {
    const p = panels[i];
    if (fx >= p.x && fx <= p.x + p.w && fy >= p.y && fy <= p.y + p.h) {
      state.selected = i;
      syncPanelControls();
      return;
    }
  }
});
/* Drag photos straight onto the cover. */
$("preview").addEventListener("dragover", (e) => e.preventDefault());
$("preview").addEventListener("drop", (e) => {
  e.preventDefault();
  const files = [...(e.dataTransfer.files || [])].filter((f) => f.type.startsWith("image/"));
  if (!files.length) return;
  pushHistory();
  files.forEach(loadFile);
});

/* ---------- shot scenes (for screenshots) ---------- */
function applyShotPreset() {
  if (shot === "cover") {
    document.body.classList.add("shot-cover");
    state.layout = "hero-three";
    state.grade = "sunset";
    state.size = "wide";
    state.title = "VICE COAST";
    state.subtitle = "Neon nights & golden days";
    state.badge = "SUNSET EDITION";
    state.heat = 5;
  } else if (shot === "portrait") {
    document.body.classList.add("shot-cover");
    state.layout = "four-corners";
    state.grade = "vice-pink";
    state.size = "portrait";
    state.title = "VICE COAST";
    state.subtitle = "Four corners of the coast";
    state.badge = "PINK HOUR";
    state.heat = 5;
  } else if (shot === "variant") {
    document.body.classList.add("shot-cover");
    state.layout = "nine-panel";
    state.grade = "neon-night";
    state.size = "wide";
    state.title = "VICE COAST";
    state.subtitle = "Nine frames after dark";
    state.badge = "NEON NIGHT";
    state.heat = 4;
  }
}

/* ---------- boot ---------- */
async function boot() {
  applyShotPreset();
  ensurePanels();
  syncControls();
  syncUndoButtons();
  renderPreview();
  try {
    await loadImageFromUrl("samples/boulevard.jpg", "Boulevard");
    await loadImageFromUrl("samples/pier.jpg", "Pier");
  } catch (err) {
    $("statusLine").textContent = "Sample photos could not load — add your own photos to begin.";
  }
  // Spread the two samples across the panels so every panel differs.
  ensurePanels();
  state.panels.forEach((p, i) => { p.photo = i % Math.max(1, photos.length); });
  if (shot === "cover") {
    state.panels[0].photo = 0;
    state.panels[0].panY = 28;
    state.panels[1].photo = 1;
    state.panels[1].panY = 32;
    state.panels[2].photo = 0;
    state.panels[2].panY = 10;
    state.panels[3].photo = 1;
    state.panels[3].panY = 32;
  }
  if (shot === "portrait") {
    state.panels[0].zoom = 140;
    state.panels[0].panX = 25;
    state.panels[0].panY = 30;
    state.panels[1].panY = 0;
    state.panels[3].panY = 0;
  }
  if (shot === "variant") {
    state.panels.forEach((p, i) => {
      p.photo = i % 2;
      p.zoom = 125 + (i % 3) * 20;
      p.panX = ((i % 3) - 1) * 20;
      p.panY = i % 2 === 0 ? 25 : -5;
    });
  }
  rebuildThumbStrip();
  renderPreview();
}
boot();
