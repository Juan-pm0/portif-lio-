// ============================================================
//  COMPONENTE — src/components/Hero/Hero.jsx
//  Seção principal da home (tela cheia, acima do fold).
//  Props:
//    onOpen — função para abrir painéis: onOpen("projetos") ou onOpen("sobre")
// ============================================================

// Estatísticas exibidas abaixo dos botões CTA
const HERO_STATS = [
  { num: "3+",       label: "Anos de estudos"        },
  { num: "Buscando", label: "Estágio e vagas júnior" },
  { num: "✓",        label: "Open to work"           },
];

export default function Hero({ onOpen }) {
  return (
    <section className="hero" id="home">

      {/* ── BACKGROUND: blobs animados + noise ── */}
      <div className="hero__bg">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
        <div className="hero__noise" />
      </div>

      {/* ── LINHA LATERAL ESQUERDA (decorativa, some em mobile) ── */}
      <div className="hero__line" aria-hidden="true">
        <span className="hero__line-bar" />
        <span className="hero__line-label">Juan Dev — 2026</span>
        <span className="hero__line-bar" />
      </div>

      {/* ── MONOGRAMA DIREITA (decorativo, some em tablet) ── */}
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__visual-inner">
          <span className="hero__visual-monogram">JP</span>
        </div>
      </div>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div className="hero__inner">

        {/* Badge "Disponível para projetos" */}
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span className="hero__badge-text">Disponível para projetos — 2026</span>
        </div>

        {/* Título principal em três linhas */}
        <h1 className="hero__heading">
          <span className="hero__line-solid">Full Stack</span>
          <span className="hero__line-italic">Developer</span>
        </h1>

        {/* Subtítulo / descrição curta */}
        <p className="hero__sub">
          Olá, sou <strong>Juan Dev</strong>. Construo experiências digitais que combinam
          código limpo com design intencional — do back-end robusto até interfaces
          que fazem as pessoas pararem e olharem.
        </p>

        {/* Botões CTA */}
        <div className="hero__cta">
          <button className="btn btn-primary" onClick={() => onOpen("projetos")}>
            Ver Projetos <span className="btn-arrow">→</span>
          </button>
          <button className="btn btn-secondary" onClick={() => onOpen("sobre")}>
            Sobre mim
          </button>
        </div>

        {/* Estatísticas rápidas */}
        <div className="hero__stats">
          {HERO_STATS.map(({ num, label }) => (
            <div key={label}>
              <span className="hero__stat-num">{num}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── INDICADOR DE SCROLL ── */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">scroll</span>
      </div>
    </section>
  );
}
