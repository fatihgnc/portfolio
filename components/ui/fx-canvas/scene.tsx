"use client";

import { useEffect } from "react";
import * as THREE from "three";

import { BG_FRAG, BG_VERT } from "./shaders";

/** Bu genişliğin altında efekt hiç açılmaz. */
const MIN_WIDTH = 900;

function cssVar(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/**
 * Tasarımdaki fx.js'in portu: arka planda gürültü + imleçten kaçan nokta
 * ızgarası ve projeler arasında dönen tel-kafes gövde. Dar ekranda, reduced
 * motion'da veya data-fx="off" iken hiç başlamaz.
 */
export default function FxScene() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fxOff = () => root.getAttribute("data-fx") === "off";
    const tooSmall = () => window.innerWidth < MIN_WIDTH;

    if (fxOff() || tooSmall() || reduced.matches) return;

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

    /* 2 — iki proje arasındaki tel-kafes gövde */
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

      const vh = window.innerHeight;

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
      bgGeo.dispose();
      bgMat.dispose();
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
