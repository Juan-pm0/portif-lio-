// ─────────────────────────────────────────────────────────
// 1. Coloca o arquivo jp-monogram.svg em: src/assets/jp-monogram.svg
// ─────────────────────────────────────────────────────────

// 2. No topo do App.jsx, adiciona os imports:
import MetallicPaint from "./component/MetallicPaint";
import jpMonogram    from "./assets/jp-monogram.svg";

// ─────────────────────────────────────────────────────────
// 3. No componente Hero, substitui o bloco .hero__visual inteiro por:
// ─────────────────────────────────────────────────────────

{/* HERO VISUAL — MetallicPaint JP */}
<div className="hero__visual" aria-hidden="true">
  <div style={{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderLeft: "1px solid var(--border)",
    background: "linear-gradient(160deg,rgba(249,220,197,.03) 0%,rgba(255,47,47,.02) 100%)",
    opacity: 0,
    animation: "slideLeft 1s ease forwards",
    animationDelay: ".5s",
    overflow: "hidden",
  }}>
    <div style={{ width: "80%", maxWidth: "420px", aspectRatio: "1/1" }}>
      <MetallicPaint
        imageSrc={jpMonogram}
        seed={12}
        scale={4.5}
        refraction={0.015}
        blur={0.012}
        liquid={0.85}
        speed={0.25}
        brightness={2.1}
        contrast={0.55}
        angle={0}
        fresnel={1.2}
        lightColor="#f5e6d0"
        darkColor="#1a0a04"
        patternSharpness={1.1}
        waveAmplitude={0.9}
        noiseScale={0.45}
        chromaticSpread={2.2}
        mouseAnimation={true}
        distortion={0.8}
        contour={0.15}
        tintColor="#c87941"
      />
    </div>
  </div>
</div>
