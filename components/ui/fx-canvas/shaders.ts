/** Tasarımdaki fx.js'ten alınan shader'lar. */

export const BG_VERT = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

/** Gürültü + imleçten kaçan nokta ızgarası. */
export const BG_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime, uDark, uInt;
uniform vec2 uMouse;
uniform vec3 uAcc;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 4; i++){ v += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main(){
  vec2 asp = vec2(uRes.x / max(uRes.y, 1.0), 1.0);
  vec2 p = vUv * asp;
  vec2 mp = uMouse * asp;
  float t = uTime * 0.028;

  float n = fbm(p * 1.5 + vec2(t, -t * 0.62));
  n = fbm(p * 2.1 + vec2(n * 0.7, t * 0.45));

  float d = length(p - mp);
  float halo = exp(-d * 2.6);

  float cells = 44.0;
  vec2 gp = p * cells;
  vec2 id = floor(gp);
  vec2 f = fract(gp) - 0.5;
  vec2 cc = (id + 0.5) / cells;
  vec2 dir = cc - mp;
  float cd = length(dir);
  f += normalize(dir + 1e-5) * exp(-cd * 4.2) * 0.34;
  float dots = 1.0 - smoothstep(0.045, 0.115, length(f));
  dots *= 0.055 + exp(-cd * 3.0) * 0.42;
  dots *= 0.35 + n * 0.9;

  vec3 tint = mix(vec3(0.02, 0.02, 0.03), vec3(1.0), uDark);
  vec3 col = mix(tint, uAcc, 0.34 + halo * 0.4);

  float a = (0.018 + smoothstep(0.42, 1.0, n) * 0.052 + halo * 0.05) * uInt;
  a += dots * uInt * 0.9;

  gl_FragColor = vec4(col, clamp(a, 0.0, 0.5));
}`;

/** Hero yazısının deforme olan yankısı. */
export const GHOST_VERT = /* glsl */ `
varying vec2 vUv;
uniform float uTime, uScroll, uAmp;
uniform vec2 uMouse;
void main(){
  vUv = uv;
  vec3 pos = position;
  float w = sin(pos.x * 2.6 + uTime * 0.7) * cos(pos.y * 3.1 - uTime * 0.5);
  float pull = 1.0 - clamp(length(pos.xy - vec2(uMouse.x * 1.6, uMouse.y * 0.9)) * 0.7, 0.0, 1.0);
  pos.x += (w * 0.02 + pull * 0.05 * uMouse.x) * uAmp;
  pos.y += (w * 0.012 - uScroll * 0.06 + pull * 0.03) * uAmp;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

export const GHOST_FRAG = /* glsl */ `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec3 uAcc;
uniform float uOpacity;
void main(){
  float m = texture2D(uTex, vUv).a;
  if(m < 0.02) discard;
  gl_FragColor = vec4(uAcc, m * uOpacity);
}`;
