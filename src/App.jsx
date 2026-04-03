// ============================================================
//  APP.JSX — src/App.jsx
//  Componente raiz. Apenas monta os componentes e gerencia
//  qual painel está aberto. Toda a lógica está nos componentes.
//
//  Estrutura do projeto:
//    src/
//    ├── App.jsx                          ← você está aqui
//    ├── data/index.js                    ← todos os dados estáticos
//    ├── styles/globalStyles.js           ← estilos CSS como string
//    ├── hooks/useScrolled.js             ← hook de scroll
//    └── components/
//        ├── Loading/LoadingScreen.jsx    ← tela de carregamento
//        ├── Navbar/Navbar.jsx            ← barra de navegação
//        ├── Hero/Hero.jsx                ← seção principal (hero)
//        ├── Panels/Panels.jsx            ← painel Projetos + painel Sobre
//        └── Contact/ContactSection.jsx   ← seção de contato + formulário
// ============================================================

import { useState } from "react";

// Estilos globais (injetados como <style> no head)
import styles from "./styles/globalStyles";

// Hook: detecta se o usuário rolou mais de 40px
import { useScrolled } from "./hooks/useScrolled";

// Componentes
import LoadingScreen   from "./component/Loading/LoadingScreen";
import Navbar          from "./component/Navbar/Navbar";
import Hero            from "./component/Hero/Hero";
import { ProjectsPanel, SobrePanel } from "./component/Panels/Panels";
import ContactSection  from "./component/Contact/ContactSection";

export default function App() {
  // true após o LoadingScreen terminar
  const [loaded, setLoaded] = useState(false);

  // "projetos" | "sobre" | null (nenhum painel aberto)
  const [panel, setPanel] = useState(null);

  // true quando o usuário rolou > 40px (usada para estilizar a Navbar)
  const scrolled = useScrolled(40);

  return (
    <>
      {/* Estilos globais injetados */}
      <style>{styles}</style>

      {/* Tela de carregamento — desaparece após a animação */}
      <LoadingScreen onDone={() => setLoaded(true)} />

      {/* Conteúdo principal — aparece em fade após o loading */}
      <div style={{
        opacity:    loaded ? 1 : 0,
        transform:  loaded ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.8s var(--ease), transform 0.8s var(--ease)",
      }}>
        <Navbar
          scrolled={scrolled}
          onOpen={setPanel}
          onCloseAll={() => setPanel(null)}
        />
        <main>
          <Hero onOpen={setPanel} />
          <ContactSection />
        </main>
      </div>

      {/* Painéis deslizantes (ficam fora do main para sobrepor tudo) */}
      <ProjectsPanel
        open={panel === "projetos"}
        onClose={() => setPanel(null)}
      />
      <SobrePanel
        open={panel === "sobre"}
        onClose={() => setPanel(null)}
      />
    </>
  );
}
