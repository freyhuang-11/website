"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 三层降级：WebGL shader 流场 → Canvas2D 粒子 → CSS 渐变光晕。
 * 保证所有客户首屏视觉一致（密度可降，结构不变）。
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tier, setTier] = useState<"webgl" | "canvas2d" | "css">("css");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const probe = document.createElement("canvas");
    const gl =
      (probe.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (probe.getContext("webgl") as WebGLRenderingContext | null);

    if (gl) {
      const cleanup = startWebGL(canvas);
      setTier("webgl");
      return cleanup;
    }
    const cleanup2d = startCanvas2D(canvas);
    setTier("canvas2d");
    return cleanup2d;
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* CSS bottom layer — always visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 80%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_95%)]" />
      <span className="sr-only">render tier: {tier}</span>
    </div>
  );
}

function startWebGL(canvas: HTMLCanvasElement): () => void {
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  };
  resize();
  window.addEventListener("resize", resize);

  const vs = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;
  // Flow-field shader: layered noise → lime-tinted plasma
  const fs = `
    precision highp float;
    uniform float u_t;
    uniform vec2 u_res;

    // hash + value noise
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p); vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.5;
      for(int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
      return v;
    }

    void main(){
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
      float t = u_t * 0.06;
      vec2 q = vec2(fbm(uv * 1.6 + vec2(0.0, t)), fbm(uv * 1.6 + vec2(5.2, -t)));
      float n = fbm(uv * 2.0 + q * 1.5 + t);
      // lime accent (#84CC16) → near-black
      vec3 lime = vec3(0.518, 0.8, 0.086);
      vec3 dark = vec3(0.04, 0.04, 0.04);
      float glow = smoothstep(0.3, 0.85, n);
      vec3 col = mix(dark, lime, glow * 0.8);
      // streak lines
      float lines = smoothstep(0.48, 0.5, fract(n * 6.0 + t * 2.0));
      col += lime * lines * 0.2;
      // fade edges
      float r = length(uv);
      col *= smoothstep(1.2, 0.2, r);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const compile = (src: string, type: number) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(vs, gl.VERTEX_SHADER));
  gl.attachShader(prog, compile(fs, gl.FRAGMENT_SHADER));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  // fullscreen tri
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uT = gl.getUniformLocation(prog, "u_t");
  const uR = gl.getUniformLocation(prog, "u_res");

  let raf = 0;
  const start = performance.now();
  const render = () => {
    const t = (performance.now() - start) / 1000;
    gl.uniform1f(uT, t);
    gl.uniform2f(uR, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(render);
  };
  render();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}

function startCanvas2D(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
  };
  resize();
  window.addEventListener("resize", resize);

  const N = 90;
  const parts = Array.from({ length: N }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3 * dpr,
    vy: (Math.random() - 0.5) * 0.3 * dpr,
    r: 1 + Math.random() * 1.5 * dpr,
  }));

  let raf = 0;
  const render = () => {
    ctx.fillStyle = "rgba(10,10,10,0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(132,204,22,0.55)";
      ctx.fill();
    }
    raf = requestAnimationFrame(render);
  };
  render();
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}
