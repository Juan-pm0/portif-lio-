// ============================================================
//  COMPONENTE — src/components/Loading/LoadingScreen.jsx
//  Tela de carregamento animada que aparece ao entrar no site.
//  Props:
//    onDone — callback chamado quando o loading termina (100%)
// ============================================================

import { useState, useEffect } from "react";
import { LD_STEPS } from "../../data/index";

export default function LoadingScreen({ onDone }) {
  const [pct,  setPct]  = useState(0);   // porcentagem atual da barra
  const [out,  setOut]  = useState(false); // true = iniciando animação de saída
  const [gone, setGone] = useState(false); // true = componente removido do DOM

  useEffect(() => {
    let i = 0;
    let timer;

    // Avança a barra de progresso passo a passo conforme LD_STEPS
    function step() {
      if (i >= LD_STEPS.length) return;
      const [target, delay] = LD_STEPS[i];

      timer = setTimeout(() => {
        setPct(target);
        i++;

        if (target < 100) {
          // Ainda não chegou a 100%, continua avançando
          step();
        } else {
          // Chegou a 100%: espera 400ms e inicia a saída
          setTimeout(() => {
            setOut(true);
            // Após a animação de saída (750ms), remove do DOM e chama onDone
            setTimeout(() => {
              setGone(true);
              onDone?.();
            }, 750);
          }, 400);
        }
      }, delay);
    }

    step();
    return () => clearTimeout(timer); // limpa o timer se o componente desmontar
  }, [onDone]);

  // Se already gone, não renderiza nada
  if (gone) return null;

  return (
    <div
      className={`loader-wrap${out ? " out" : ""}`}
      role="status"
      aria-label="Carregando portfólio"
    >
      {/* Blobs decorativos de fundo */}
      <div className="ld-blob ld-blob1" aria-hidden="true" />
      <div className="ld-blob ld-blob2" aria-hidden="true" />
      <div className="ld-noise"         aria-hidden="true" />

      {/* Conteúdo central: logo + tagline + barra */}
      <div className="ld-inner">
        <div className="ld-logo">
          Juan<span>.</span>Dev
        </div>
        <div className="ld-tag">Bem-vindo ao meu portfólio</div>
        <div className="ld-bar-wrap">
          <div className="ld-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="ld-count">{pct}%</div>
      </div>
    </div>
  );
}
