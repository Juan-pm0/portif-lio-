import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   MetallicJP — Canvas/WebGL Metallic Paint
   Drop-in replacement for .hero__visual-inner
───────────────────────────────────────────── */
export default function MetallicJP() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
    if (!gl) return;

    /* ── resize ── */
    const resize = () => {
      const pr = window.devicePixelRatio || 1;
      const w  = canvas.clientWidth;
      const h  = canvas.clientHeight;
      canvas.width  = w * pr;
      canvas.height = h * pr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── mouse / touch ── */
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.tx = (cx - r.left) / r.width;
      mouse.ty = 1 - (cy - r.top)  / r.height;
    };
    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("touchmove",  onMove, { passive: true });

    /* ════════════════════════════════════════
       VERTEX SHADER
    ════════════════════════════════════════ */
    const vert = `
      attribute vec2 a_pos;
      varying   vec2 v_uv;
      void main(){
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    /* ════════════════════════════════════════
       FRAGMENT SHADER — Metallic Paint
    ════════════════════════════════════════ */
    const frag = `
      precision highp float;
      varying vec2 v_uv;

      uniform float u_time;
      uniform vec2  u_res;
      uniform vec2  u_mouse;

      /* ── SDF helpers ── */
      float sdRoundedBox(vec2 p, vec2 b, float r){
        vec2 q = abs(p) - b + r;
        return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r;
      }

      float sdCircle(vec2 p, float r){ return length(p) - r; }

      float sdBox(vec2 p, vec2 b){
        vec2 d = abs(p)-b;
        return length(max(d,0.0))+min(max(d.x,d.y),0.0);
      }

      /* smooth union / subtraction */
      float opU(float a, float b){ return min(a,b); }
      float opS(float a, float b){ return max(a,-b); }
      float smin(float a,float b,float k){
        float h=max(k-abs(a-b),0.0);
        return min(a,b)-h*h*0.25/k;
      }

      /* ── Letter J ── */
      float letterJ(vec2 p){
        /* stem */
        float stem = sdBox(p - vec2(0.11, -0.06), vec2(0.055, 0.28));
        /* top bar */
        float top  = sdBox(p - vec2(0.05,  0.22), vec2(0.12,  0.055));
        /* bottom hook */
        vec2  hc   = p - vec2(-0.04, -0.30);
        float hook = sdCircle(hc, 0.13);
        float inner= sdCircle(hc, 0.065);
        float arc  = opS(hook, inner);
        /* cut right half of hook */
        float cut  = sdBox(p - vec2(0.08, -0.30), vec2(0.14, 0.16));
        arc = opS(arc, cut);
        /* join */
        float j = smin(stem, top, 0.04);
        j = smin(j, arc, 0.04);
        return j;
      }

      /* ── Letter P ── */
      float letterP(vec2 p){
        /* stem */
        float stem = sdBox(p - vec2(-0.13, 0.0), vec2(0.055, 0.34));
        /* bowl outer */
        vec2 bc = p - vec2(-0.07, 0.10);
        float bowlO = sdRoundedBox(bc, vec2(0.12, 0.14), 0.10);
        /* bowl inner */
        vec2 bci = p - vec2(-0.04, 0.10);
        float bowlI = sdRoundedBox(bci, vec2(0.06, 0.09), 0.07);
        float bowl = opS(bowlO, bowlI);
        float pp = smin(stem, bowl, 0.04);
        return pp;
      }

      /* ── Combined JP SDF ── */
      float glyphSDF(vec2 uv){
        /* center, scale */
        vec2 p = (uv - 0.5) * 2.2;
        /* aspect correction */
        p.x *= u_res.x / u_res.y;

        vec2 pj = p - vec2( 0.22, 0.0);
        vec2 pp = p - vec2(-0.22, 0.0);

        float j = letterJ(pj);
        float l = letterP(pp);
        return smin(j, l, 0.02);
      }

      /* ── Noise (cheap) ── */
      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        f=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                   mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
      }
      float fbm(vec2 p){
        float v=0.0,a=0.5;
        for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.1; a*=0.5; }
        return v;
      }

      /* ── Metallic palette ── */
      vec3 metallic(float t, float fresnel){
        /* dark copper/bronze base matching the reference */
        vec3 dark   = vec3(0.18, 0.09, 0.06);
        vec3 mid    = vec3(0.46, 0.28, 0.18);
        vec3 bright = vec3(0.78, 0.58, 0.42);
        vec3 spec   = vec3(0.95, 0.88, 0.78);

        vec3 col = mix(dark, mid, smoothstep(0.0, 0.45, t));
        col = mix(col, bright, smoothstep(0.35, 0.72, t));
        col = mix(col, spec,   smoothstep(0.68, 1.0,  t));

        /* fresnel rim — keep it subtle */
        col = mix(col, spec * 1.15, fresnel * 0.35);
        return col;
      }

      void main(){
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_res.x / u_res.y, 1.0);

        float t   = u_time * 0.28;
        vec2 muv  = u_mouse; /* already 0-1 */

        /* ── SDF ── */
        float d = glyphSDF(uv);

        /* soft AA band */
        float px   = 1.5 / min(u_res.x, u_res.y);
        float mask = 1.0 - smoothstep(-px, px, d);
        if(mask < 0.001) {
          gl_FragColor = vec4(0.0);
          return;
        }

        /* ── surface coordinate along glyph ── */
        vec2 p = (uv - 0.5) * 2.2;
        p.x *= u_res.x / u_res.y;

        /* gradient direction from mouse */
        vec2 light = muv * 2.0 - 1.0;
        light.y   *= u_res.y / u_res.x;

        /* ── Flowing metallic layers ── */
        /* 1. base flow — slow, large scale */
        vec2 fp  = p * 0.9 + vec2(t * 0.12, t * 0.07);
        float f1 = fbm(fp + 1.7);

        /* 2. secondary flow — medium */
        vec2 fp2 = p * 1.6 - vec2(t * 0.09, t * 0.14) + muv * 0.4;
        float f2 = fbm(fp2 + 3.1);

        /* 3. fine detail */
        vec2 fp3 = p * 3.2 + vec2(t * 0.18, -t * 0.11);
        float f3 = fbm(fp3 + 5.7);

        float flow = f1 * 0.5 + f2 * 0.32 + f3 * 0.18;

        /* ── Directional specular (Phong-ish) ── */
        /* normal from SDF gradient */
        float eps = 0.004;
        vec2 uvE  = uv;
        float dR  = glyphSDF(vec2(uv.x + eps, uv.y));
        float dU  = glyphSDF(vec2(uv.x, uv.y + eps));
        vec2 grad = vec2(dR - d, dU - d) / eps;
        vec3 norm = normalize(vec3(grad * 0.8, 1.0));

        vec3 ldir  = normalize(vec3(light * 1.2, 0.9));
        float diff = clamp(dot(norm, ldir), 0.0, 1.0);

        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfV   = normalize(ldir + viewDir);
        float spec   = pow(clamp(dot(norm, halfV), 0.0, 1.0), 48.0);

        /* ── Fresnel ── */
        float fresnel = pow(1.0 - clamp(dot(norm, viewDir), 0.0, 1.0), 3.0);

        /* ── Mouse highlight ── */
        float mDist = length(uv - muv);
        float mGlow = exp(-mDist * mDist * 8.0) * 0.55;

        /* ── Compose ── */
        float tVal = flow * 0.62 + diff * 0.28 + spec * 0.14 + mGlow * 0.20 + fresnel * 0.12;
        tVal = clamp(tVal, 0.0, 1.0);

        /* subtle internal shadow near edge */
        float edgeShadow = smoothstep(0.0, 0.06, -d) * 0.25;
        tVal *= 1.0 - edgeShadow * 0.5;

        vec3 col = metallic(tVal, fresnel);

        /* add spec highlight on top */
        col += vec3(0.95, 0.88, 0.76) * spec * 0.65;
        col += vec3(0.90, 0.75, 0.60) * mGlow * 0.3;

        /* edge depth darkening */
        float edgeDark = smoothstep(0.04, 0.0, -d);
        col *= mix(0.55, 1.0, edgeDark);

        /* subtle noise grain */
        float grain = (hash(uv * u_res * 0.5 + t) - 0.5) * 0.018;
        col += grain;

        gl_FragColor = vec4(col * mask, mask);
      }
    `;

    /* ── compile ── */
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    /* ── quad ── */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    /* ── uniforms ── */
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    /* ── loop ── */
    let raf;
    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform1f(uTime,  ts * 0.001);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width:  "100%",
        height: "100%",
        display: "block",
        background: "transparent",
      }}
    />
  );
}
