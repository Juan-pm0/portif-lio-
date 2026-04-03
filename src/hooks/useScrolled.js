// ============================================================
//  HOOK CUSTOMIZADO — src/hooks/useScrolled.js
//  Detecta se o usuário rolou mais de `threshold` pixels.
//  Uso: const scrolled = useScrolled(40)
//  Retorna: true/false
// ============================================================

import { useState, useEffect } from "react";

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Função que atualiza o estado ao rolar a página
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    // Adiciona o listener de scroll (passive = melhor performance)
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Remove o listener quando o componente desmonta (evita memory leak)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
