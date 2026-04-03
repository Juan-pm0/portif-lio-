// ============================================================
//  COMPONENTE — src/components/Navbar/Navbar.jsx
//  Barra de navegação fixa no topo da página.
//  Props:
//    scrolled   — boolean: true se rolou > 40px (fundo aparece)
//    onOpen     — função para abrir um painel: onOpen("projetos") ou onOpen("sobre")
//    onCloseAll — função para fechar todos os painéis
// ============================================================

import { useState, useEffect } from "react";

// Links do menu — em ordem de exibição
const NAV_LINKS = ["Home", "Sobre", "Projetos", "Contato"];

export default function Navbar({ scrolled, onOpen, onCloseAll }) {
  // Controla se o menu mobile (drawer) está aberto
  const [menuOpen, setMenuOpen] = useState(false);

  // Bloqueia o scroll do body enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Decide a ação de cada link da navbar
  const handleLink = (label) => {
    setMenuOpen(false); // fecha o menu mobile em qualquer clique

    if      (label === "Projetos") onOpen("projetos");
    else if (label === "Sobre")    onOpen("sobre");
    else if (label === "Contato")  {
      onCloseAll();
      // Scroll suave até a seção de contato
      document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
    }
    else onCloseAll(); // "Home" fecha tudo e volta ao topo
  };

  return (
    <>
      {/* ── NAVBAR PRINCIPAL ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav__inner">
          <div className="nav__left">
            {/* Logo */}
            <a className="nav__logo" onClick={() => handleLink("Home")} style={{ cursor: "pointer" }}>
              Juan<span>.</span>Dev
            </a>

            {/* Links desktop */}
            <ul className="nav__links">
              {NAV_LINKS.map((label) => (
                <li key={label}>
                  <button className="nav__link" onClick={() => handleLink(label)}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Botão "Hire me" (desktop) */}
          <div className="nav__right">
            <button
              className="btn btn-primary"
              style={{ padding: "10px 22px", fontSize: ".875rem" }}
            >
              contratar
            </button>
          </div>

          {/* Botão hamburguer (mobile) */}
          <button
            className={`nav__burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className="nav__burger-line" />
            <span className="nav__burger-line" />
            <span className="nav__burger-line" />
          </button>
        </div>
      </nav>

      {/* ── MENU DRAWER (mobile) ── */}
      <div className={`nav__drawer${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map((label) => (
          <button
            key={label}
            className="nav__drawer-link"
            onClick={() => handleLink(label)}
          >
            {label}
          </button>
        ))}
        <button className="btn btn-primary" onClick={() => setMenuOpen(false)}>
          contratar
        </button>
      </div>
    </>
  );
}
