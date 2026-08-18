"use client";

import { useEffect } from "react";
import * as THREE from "three";

import { BG_FRAG, BG_VERT, GHOST_FRAG, GHOST_VERT } from "./shaders";

/** Bu genişliğin altında efekt hiç açılmaz. */
const MIN_WIDTH = 900;

function cssVar(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/** Hero satırlarını canvas'a yazıp doku üretir. */
function heroTexture(lines: string[]) {
  const W = 1024;
  const H = 560;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    const base = 250;
    const pad = 8;

    lines.forEach((line, index) => {
      let size = base;
      ctx.font = "800 " + size + "px Syne, sans-serif";
      while (ctx.measureText(line).width > W - pad * 2 && size > 40) {
        size -= 8;
        ctx.font = "800 " + size + "px Syne, sans-serif";
      }
      ctx.fillText(line, pad, H * 0.44 + index * (H * 0.44) - 10);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

/**
 * Tasarımdaki fx.js'in portu: arka planda gürültü + imleçten kaçan nokta
 * ızgarası, hero yazısının deforme olan yankısı ve projeler arasında dönen
 * tel-kafes gövde. Dar ekranda, reduced motion'da veya data-fx="off" iken
 * hiç başlamaz.
 */
export default function FxScene() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fxOff = () => root.getAttribute("data-fx") === "off";
    const tooSmall = () => window.innerWidth < MIN_WIDTH;

    if (fxOff() || tooSmall() || reduced.matches) return;

    const h1 = document.querySelector("h1");
    if (!h1) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "0",
      pointerEvents: "none",
      opacity: "0",
      transition: "opacity 1.1s ease",
    });
    document.body.appendChild(canvas);
    renderer.setClearAlpha(0);
    renderer.autoClear = false;

    const state = {
      mx: 0.5,
      my: 0.35,
      tmx: 0.5,
      tmy: 0.35,
      scroll: 0,
      tscroll: 0,
      acc: new THREE.Color("#ff4a17"),
      dark: 1,
      tdark: 1,
    };

    /* 1 — gürültü + imleçten kaçan nokta ızgarası */
    const bgScene = new THREE.Scene();
    const flatCam = new THREE.Camera();
    const bgUniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAcc: { value: new THREE.Color("#ff4a17") },
      uDark: { value: 1 },
      uInt: { value: 1 },
    };
    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERT,
      fragmentShader: BG_FRAG,
      uniforms: bgUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    bgScene.add(new THREE.Mesh(bgGeo, bgMat));

    /* 2 — hero yazısının deforme yankısı */
    const heroScene = new THREE.Scene();
    const heroCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    heroCam.position.z = 2;

    const readLines = () =>
      Array.from(h1.querySelectorAll("span"))
        .map((span) => (span.textContent || "").trim())
        .filter(Boolean);

    let lines = readLines();
    const ghostUniforms = {
      uTex: { value: heroTexture(lines) },
      uAcc: { value: new THREE.Color("#ff4a17") },
      uOpacity: { value: 0 },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uAmp: { value: 1 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };
    const ghostGeo = new THREE.PlaneGeometry(2, 2, 84, 44);
    const ghostMat = new THREE.ShaderMaterial({
      vertexShader: GHOST_VERT,
      fragmentShader: GHOST_FRAG,
      uniforms: ghostUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const ghost = new THREE.Mesh(ghostGeo, ghostMat);
    heroScene.add(ghost);

    // fontlar yüklendikten sonra dokuyu tazele
    if (document.fonts) {
      document.fonts.ready.then(() => {
        lines = readLines();
        ghostUniforms.uTex.value.dispose();
        ghostUniforms.uTex.value = heroTexture(lines);
      });
    }

    /* 3 — iki proje arasındaki tel-kafes gövde */
    const objScene = new THREE.Scene();
    const objCam = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    objCam.position.z = 5.2;
    const bridge = new THREE.Group();
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.55, 1)),
      new THREE.LineBasicMaterial({
        color: 0xff4a17,
        transparent: true,
        opacity: 0.55,
      }),
    );
    const solid = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      }),
    );
    bridge.add(edges, solid);
    objScene.add(bridge);

    const resize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      bgUniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    };
    resize();

    const onMove = (event: PointerEvent) => {
      state.tmx = event.clientX / window.innerWidth;
      state.tmy = 1 - event.clientY / window.innerHeight;
    };

    const onScroll = () => {
      const height =
        Math.max(root.scrollHeight, document.body.scrollHeight) -
        window.innerHeight;
      const top = Math.max(window.scrollY || 0, root.scrollTop || 0);
      state.tscroll = height > 0 ? Math.min(1, Math.max(0, top / height)) : 0;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    onScroll();

    let raf = 0;
    let frame = 0;
    let last = 0;
    let textKey = lines.join("|");
    canvas.style.opacity = "1";

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || fxOff()) return;
      if (tooSmall()) {
        canvas.style.opacity = "0";
        return;
      }
      if (now - last < 30) return;

      const dt = Math.min((now - last) / 1000, 0.06);
      last = now;
      frame++;
      canvas.style.opacity = "1";

      state.mx += (state.tmx - state.mx) * 0.055;
      state.my += (state.tmy - state.my) * 0.055;
      state.scroll += (state.tscroll - state.scroll) * 0.08;

      if (frame % 20 === 1) {
        state.acc.set(cssVar("--ac", "#ff4a17"));
        const bg = new THREE.Color(cssVar("--bg", "#0c0c0e"));
        state.tdark = bg.getHSL({ h: 0, s: 0, l: 0 }).l > 0.5 ? 0 : 1;

        const key = readLines().join("|");
        if (key && key !== textKey) {
          textKey = key;
          ghostUniforms.uTex.value.dispose();
          ghostUniforms.uTex.value = heroTexture(readLines());
        }
      }
      state.dark += (state.tdark - state.dark) * 0.12;

      bgUniforms.uTime.value += dt;
      bgUniforms.uMouse.value.set(state.mx, state.my);
      bgUniforms.uAcc.value.copy(state.acc);
      bgUniforms.uDark.value = state.dark;
      bgUniforms.uInt.value = 0.55 + state.dark * 0.45;

      renderer.clear();
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
      renderer.render(bgScene, flatCam);

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      /* hero yankısı, DOM başlığının canlı konumuna oturur */
      const r = h1.getBoundingClientRect();
      if (r.bottom > -80 && r.top < vh + 80 && r.width > 10) {
        ghost.position.set(
          ((r.left + r.width / 2) / vw) * 2 - 1 + 0.006,
          -(((r.top + r.height / 2) / vh) * 2 - 1) - 0.004,
          0,
        );
        ghost.scale.set(r.width / vw, r.height / vh, 1);
        ghostUniforms.uTime.value += dt;
        ghostUniforms.uScroll.value = state.scroll * 6;
        ghostUniforms.uMouse.value.set(state.mx * 2 - 1, state.my * 2 - 1);
        ghostUniforms.uAcc.value.copy(state.acc);
        ghostUniforms.uOpacity.value = 0.3 + state.dark * 0.16;
        renderer.render(heroScene, heroCam);
      }

      /* gövde, yalnızca yuvası ekrandayken */
      const slot = document.querySelector("[data-fx-bridge]");
      if (slot) {
        const b = slot.getBoundingClientRect();
        if (b.bottom > 0 && b.top < vh && b.width > 8 && b.height > 8) {
          const t = 1 - (b.top + b.height / 2) / vh;
          bridge.rotation.y = t * 3.1 + state.mx * 0.5;
          bridge.rotation.x = -t * 1.5 + (state.my - 0.5) * 0.4;
          bridge.position.y = (0.5 - t) * 0.7;
          edges.material.color.copy(state.acc);
          solid.material.color.set(state.dark > 0.5 ? 0x000000 : 0xffffff);
          objCam.aspect = b.width / b.height;
          objCam.updateProjectionMatrix();
          renderer.setScissorTest(true);
          renderer.setViewport(b.left, vh - b.bottom, b.width, b.height);
          renderer.setScissor(b.left, vh - b.bottom, b.width, b.height);
          renderer.render(objScene, objCam);
          renderer.setScissorTest(false);
        }
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      ghostUniforms.uTex.value.dispose();
      bgGeo.dispose();
      bgMat.dispose();
      ghostGeo.dispose();
      ghostMat.dispose();
      edges.geometry.dispose();
      edges.material.dispose();
      solid.geometry.dispose();
      solid.material.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return null;
}
