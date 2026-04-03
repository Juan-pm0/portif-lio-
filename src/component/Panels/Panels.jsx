// ============================================================
//  COMPONENTES — src/components/Panels/Panels.jsx
//  Contém dois painéis deslizantes (slide-up):
//    - ProjectsPanel: exibe os projetos com filtros
//    - SobrePanel: exibe bio, skills, timeline e contatos
//  Props de ambos:
//    open    — boolean: true = painel visível
//    onClose — callback para fechar o painel
// ============================================================

import { useState, useEffect } from "react";
import curriculo from "../../assets/Curriculo.pdf";
import { PROJECTS, FILTERS, SKILLS, TIMELINE } from "../../data/index";
import euFoto from "../../assets/eu port.jpg";

// ── HOOK AUXILIAR: fecha com ESC e bloqueia scroll do body ──
function usePanelBehavior(open, onClose) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
}

// ============================================================
//  CARD DE PROJETO
//  Exibido dentro do ProjectsPanel.
//  Props:
//    project  — objeto do array PROJECTS
//    featured — boolean: card maior (destaque)
// ============================================================
function Card({ project, featured }) {
  return (
    <article className={`card${featured ? " card-featured" : ""}`}>
      {/* Imagem / monograma colorido */}
      <div className="card-img">
        <div className={`card-img-inner ${project.color}`}>{project.emoji}</div>
        <span className="card-num">0{project.id}</span>
        {/* Overlay com botão "Ver projeto" que aparece no hover */}
        <div className="card-overlay">
          <a href="#" className="overlay-link" onClick={(e) => e.preventDefault()}>
            Ver projeto →
          </a>
        </div>
      </div>

      {/* Corpo do card */}
      <div className="card-body">
        {/* Tags de tecnologia */}
        <div className="card-tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.desc}</p>

        {/* Rodapé: links e ano */}
        <div className="card-footer">
          <div className="card-links">
            <a href="#" className="card-link" onClick={(e) => e.preventDefault()}>↗ GitHub</a>
            <a href="#" className="card-link" onClick={(e) => e.preventDefault()}>↗ Live</a>
          </div>
          <span className="card-year">{project.year}</span>
        </div>
      </div>
    </article>
  );
}

// ============================================================
//  PAINEL DE PROJETOS
// ============================================================
export function ProjectsPanel({ open, onClose }) {
  // Filtro ativo (categoria selecionada)
  const [active, setActive] = useState("all");

  // Fecha com ESC e bloqueia scroll
  usePanelBehavior(open, onClose);

  // Filtra projetos pela categoria ativa
  const visible  = (p) => active === "all" || p.category === active;
  const featured = PROJECTS.filter((p) => p.featured && visible(p));
  const rest     = PROJECTS.filter((p) => !p.featured && visible(p));

  return (
    <div className={`panel${open ? " open" : ""}`}>
      <div className="panel__sheet" role="dialog" aria-modal="true">

        {/* Barra superior fixa */}
        <div className="panel__bar">
          <span className="panel__label">
            <span>02</span>Projetos
          </span>
          <button className="panel__close" onClick={onClose}>
            <span className="panel__close-x">✕</span> Fechar
          </button>
        </div>

        {/* Conteúdo rolável */}
        <div className="panel__content">
          <div className="projects-section">

            {/* Cabeçalho com título e filtros */}
            <div className="ph">
              <div className="ph-left">
                <span className="section-num">Portfólio — 2026</span>
                <h2 className="section-title">Trabalhos <em>selecionados</em></h2>
              </div>
              <div className="ph-right">
                <div className="filters">
                  {FILTERS.map((f) => (
                    <button
                      key={f.value}
                      className={`filter-btn${active === f.value ? " active" : ""}`}
                      onClick={() => setActive(f.value)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <a href="#" className="view-all" onClick={(e) => e.preventDefault()}>
                  Ver todos <span className="view-all-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Cards em destaque (2 colunas) */}
            {featured.length > 0 && (
              <div className="featured-row">
                {featured.map((p) => <Card key={p.id} project={p} featured />)}
              </div>
            )}

            {/* Cards normais (3 colunas) */}
            {rest.length > 0 && (
              <div className="cards-grid">
                {rest.map((p) => <Card key={p.id} project={p} />)}
              </div>
            )}

            {/* Mensagem quando nenhum projeto bate o filtro */}
            {featured.length === 0 && rest.length === 0 && (
              <div style={{
                textAlign: "center", padding: "4rem",
                color: "var(--text-sec)", fontFamily: "var(--fm)", fontSize: ".85rem",
                border: "1px solid var(--border)", borderRadius: "16px",
              }}>
                Nenhum projeto nessa categoria ainda.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  PAINEL SOBRE MIM
// ============================================================
export function SobrePanel({ open, onClose }) {
  // Fecha com ESC e bloqueia scroll
  usePanelBehavior(open, onClose);

  return (
    <div className={`panel${open ? " open" : ""}`}>
      <div className="panel__sheet" role="dialog" aria-modal="true">

        {/* Barra superior fixa */}
        <div className="panel__bar">
          <span className="panel__label">
            <span>01</span>Sobre mim
          </span>
          <button className="panel__close" onClick={onClose}>
            <span className="panel__close-x">✕</span> Fechar
          </button>
        </div>

        {/* Conteúdo rolável */}
        <div className="panel__content">

          {/* ── GRID: texto + foto ── */}
          <div className="sobre-grid">
            <div>
              <span className="sobre-eyebrow">Juan Pinho — Dev</span>
              <h2 className="sobre-heading">
                Código limpo,<br /><em>design intencional.</em>
              </h2>
              <p className="sobre-bio">
                Olá! Sou <strong>Juan Pinho</strong>, desenvolvedor Full Stack em formação,
                movido por desafios e aprendizado constante. Busco uma oportunidade como
                estagiário ou desenvolvedor júnior para transformar conhecimento em prática
                e evoluir dentro de projetos reais.
              </p>
              <p className="sobre-bio">
                Trabalho do <strong>front-end ao back-end</strong>, com foco em React,
                JavaScript e PHP. Gosto de projetos desafiadores que exigem tanto raciocínio
                técnico quanto sensibilidade visual.
              </p>
              <p className="sobre-bio">
                Quando não estou codando, estou estudando design, explorando novas tecnologias
                ou ouvindo música boa. <strong>Disponível para projetos freelance</strong> e colaborações.
              </p>
              <div className="sobre-ctas">
                <a href="mailto:juanpinho997@gmail.com" className="btn btn-primary">
                  Entrar em contato <span className="btn-arrow">→</span>
                </a>
                <a href={curriculo} download="Curriculo-Juan-Pinho.pdf" className="btn btn-secondary">
                  Baixar CV ↓
                </a>
              </div>
            </div>

           {/* Foto / avatar */}
<div className="sobre-visual">
  <div className="sobre-avatar">
    <img
      src={euFoto}
      alt="Juan Pinho"
      className="sobre-avatar-photo"
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
                
                <div className="sobre-avatar-blob sobre-avatar-blob--1" />
                <div className="sobre-avatar-blob sobre-avatar-blob--2" />
                <div className="sobre-avatar-overlay" />
                <span className="sobre-avatar-mono">JP</span>
                <span className="sobre-avatar-tag">Full Stack Dev</span>
              </div>
            </div>
          </div>

          {/* ── SKILLS ── */}
          <div className="sobre-skills-section">
            <span className="sobre-skills-title">Stack técnico</span>
            <div className="sobre-skills-grid">
              {SKILLS.map((s) => (
                <div key={s.name} className="sobre-skill-card">
                  <span className="sobre-skill-icon">{s.icon}</span>
                  <span className="sobre-skill-name">{s.name}</span>
                  <span className="sobre-skill-level">{s.level}</span>
                  <div className="sobre-skill-bar">
                    <div className="sobre-skill-fill" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── TIMELINE ── */}
          <div className="sobre-timeline-section">
            <span className="sobre-timeline-title">Trajetória</span>
            <div className="sobre-timeline">
              {TIMELINE.map((item, i) => (
                <div key={i} className="sobre-tl-item">
                  <span className="sobre-tl-year">{item.year}</span>
                  <div className="sobre-tl-line">
                    <span className="sobre-tl-dot" />
                    {/* Barra conectora (não aparece no último item) */}
                    {i < TIMELINE.length - 1 && <span className="sobre-tl-bar" />}
                  </div>
                  <div className="sobre-tl-body">
                    <p className="sobre-tl-role">{item.role}</p>
                    <p className="sobre-tl-company">{item.company}</p>
                    <p className="sobre-tl-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── STRIP: "vamos trabalhar juntos" ── */}
          <div className="sobre-contact-strip">
            <div>
              <h3>Vamos trabalhar juntos?</h3>
              <p>Aberto a projetos freelance, colaborações e oportunidades.</p>
            </div>
            <div className="sobre-contact-links">
              <a href="mailto:juanpinho997@gmail.com" className="sobre-contact-link">✉️ E-mail</a>
              <a href="https://instagram.com/JUAN__PINHO" target="_blank" rel="noopener noreferrer" className="sobre-contact-link">📷 Instagram</a>
              <a href="https://linkedin.com/in/juan-pinho-526227299" target="_blank" rel="noopener noreferrer" className="sobre-contact-link">💼 LinkedIn</a>
              <a href="https://github.com/Juan-pm0" target="_blank" rel="noopener noreferrer" className="sobre-contact-link">🐙 GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
