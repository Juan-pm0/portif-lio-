// ============================================================
//  ESTILOS GLOBAIS — src/styles/globalStyles.js
//  Contém: variáveis CSS, reset, fontes e todos os estilos
//  Importar em App.jsx com: import styles from './styles/globalStyles'
// ============================================================

const styles = `
  /* ── FONTES EXTERNAS ── */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

  /* ── VARIÁVEIS CSS (tokens de design) ── */
  :root {
    --primary:      #FF2F2F;         /* vermelho principal */
    --primary-dark: #CC1F1F;         /* vermelho escuro (hover) */
    --primary-glow: rgba(255,47,47,0.14); /* brilho vermelho suave */
    --secondary:    #F9DCC5;         /* bege/creme */
    --background:   #0F0D0C;         /* fundo escuro principal */
    --bg-surface:   #1A1714;         /* superfície levemente mais clara */
    --bg-elevated:  #232019;         /* elemento elevado (cards, inputs) */
    --text-primary: #F9DCC5;         /* texto principal */
    --text-sec:     #B8A898;         /* texto secundário/muted */
    --border:       rgba(249,220,197,0.11);  /* borda padrão sutil */
    --border-hover: rgba(249,220,197,0.22);  /* borda ao hover */
    --fd: 'Playfair Display', Georgia, serif;  /* fonte display/títulos */
    --fb: 'DM Sans', system-ui, sans-serif;    /* fonte corpo */
    --fm: 'DM Mono', monospace;                /* fonte mono/labels */
    --container: 1240px;    /* largura máxima do container */
    --rsm: 6px;             /* border-radius pequeno */
    --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* curva de animação */
  }

  /* ── RESET BÁSICO ── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
  body { font-family: var(--fb); background: var(--background); color: var(--text-primary); overflow-x: hidden; }
  ::selection { background: var(--primary); color: #fff; }
  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; border: none; background: none; font-family: var(--fb); }

  /* ── LOADING SCREEN ── */
  .loader-wrap {
    position: fixed; inset: 0; z-index: 9999;
    background: #0F0D0C;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    overflow: hidden;
    transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
  }
  .loader-wrap.out { opacity: 0; transform: translateY(-8px); pointer-events: none; }
  .ld-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0; animation: lbIn 1.2s ease forwards; }
  .ld-blob1 { width: 500px; height: 500px; background: radial-gradient(circle,#FF2F2F,transparent 68%); top:-150px; right:-100px; animation-delay:.1s; }
  .ld-blob2 { width: 350px; height: 350px; background: radial-gradient(circle,#F9DCC5,transparent 68%); bottom:-100px; left:-50px; animation-delay:.3s; }
  @keyframes lbIn { from{opacity:0} to{opacity:0.18} }
  .ld-noise { position:absolute; inset:0; opacity:.2; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
  .ld-inner { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; gap:2rem; }
  .ld-logo { font-family:var(--fd); font-size:clamp(3.5rem,10vw,7rem); font-weight:900; letter-spacing:-0.04em; line-height:1; color:var(--text-primary); opacity:0; transform:translateY(24px); animation:ldUp .8s var(--ease) forwards; animation-delay:.2s; }
  .ld-logo span { color:var(--primary); }
  .ld-tag { font-family:var(--fd); font-size:clamp(1rem,2.5vw,1.5rem); font-style:italic; font-weight:700; letter-spacing:.04em; color:var(--secondary); opacity:0; animation:ldFade .6s ease forwards; animation-delay:.55s; }
  .ld-bar-wrap { width:clamp(200px,40vw,320px); height:2px; background:var(--border); border-radius:2px; overflow:hidden; opacity:0; animation:ldFade .4s ease forwards; animation-delay:.7s; }
  .ld-bar { height:100%; background:linear-gradient(90deg,#FF2F2F,#FF6B35); border-radius:2px; transition:width .1s linear; }
  .ld-count { font-family:var(--fm); font-size:.72rem; color:var(--text-sec); letter-spacing:.1em; opacity:0; animation:ldFade .4s ease forwards; animation-delay:.75s; }
  @keyframes ldUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ldFade{ from{opacity:0} to{opacity:1} }

  /* ── NAVBAR ── */
  .nav { position:fixed; top:0; left:0; right:0; z-index:100; height:72px; display:flex; align-items:center; transition:background 400ms var(--ease),border-color 400ms var(--ease); }
  .nav.scrolled { background:rgba(15,13,12,0.88); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); }
  .nav__inner { display:flex; align-items:center; justify-content:space-between; width:100%; max-width:var(--container); margin:0 auto; padding:0 2.5rem; }
  .nav__left { display:flex; align-items:center; gap:2.5rem; }
  .nav__logo { font-family:var(--fd); font-size:1.25rem; font-weight:700; color:var(--text-primary); cursor:pointer; text-decoration:none; transition:color 200ms; }
  .nav__logo:hover { color:var(--secondary); }
  .nav__logo span { color:var(--primary); }
  .nav__links { display:flex; gap:2rem; list-style:none; }
  .nav__link { font-size:.875rem; color:var(--text-sec); cursor:pointer; position:relative; padding-bottom:3px; transition:color 200ms; background:none; border:none; font-family:var(--fb); }
  .nav__link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:var(--primary); transition:width 300ms var(--ease); }
  .nav__link:hover { color:var(--text-primary); }
  .nav__link:hover::after { width:100%; }
  .nav__burger { display:none; flex-direction:column; gap:5px; padding:8px; background:none; border:none; cursor:pointer; }
  .nav__burger-line { width:22px; height:1.5px; background:var(--text-primary); transition:all 350ms var(--ease); transform-origin:center; }
  .nav__burger.open .nav__burger-line:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
  .nav__burger.open .nav__burger-line:nth-child(2) { opacity:0; transform:scaleX(0); }
  .nav__burger.open .nav__burger-line:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }
  .nav__drawer { position:fixed; inset:0; background:var(--background); z-index:99; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:2rem; transform:translateY(-100%); opacity:0; transition:transform 600ms var(--ease),opacity 400ms var(--ease); pointer-events:none; }
  .nav__drawer.open { transform:translateY(0); opacity:1; pointer-events:all; }
  .nav__drawer-link { font-family:var(--fd); font-size:2.5rem; font-weight:700; color:var(--text-primary); cursor:pointer; background:none; border:none; transition:color 200ms; }
  .nav__drawer-link:hover { color:var(--primary); }
  @media(max-width:768px) { .nav__links,.nav__right{display:none} .nav__burger{display:flex} .nav__inner{padding:0 1.25rem} }

  /* ── BOTÕES (usados em vários componentes) ── */
  .btn { display:inline-flex; align-items:center; gap:8px; font-family:var(--fb); font-size:.9375rem; font-weight:500; border-radius:var(--rsm); padding:14px 28px; transition:all 300ms var(--ease); cursor:pointer; border:none; position:relative; overflow:hidden; text-decoration:none; }
  .btn-primary { background:var(--primary); color:#fff; }
  .btn-primary:hover { background:var(--primary-dark); transform:translateY(-2px); box-shadow:0 12px 32px rgba(255,47,47,.35); }
  .btn-secondary { background:transparent; color:var(--text-primary); border:1px solid var(--border-hover); }
  .btn-secondary:hover { border-color:var(--primary); color:var(--primary); transform:translateY(-2px); }
  .btn:active { transform:translateY(0)!important; box-shadow:none!important; }
  .btn-arrow { display:inline-block; transition:transform 200ms var(--ease); }
  .btn:hover .btn-arrow { transform:translateX(5px); }

  /* ── HERO ── */
  .hero { position:relative; height:100vh; min-height:600px; display:flex; align-items:center; overflow:hidden; background:linear-gradient(135deg,#0F0D0C 0%,#1A1714 42%,#241C15 100%); }
  .hero__bg { position:absolute; inset:0; z-index:0; overflow:hidden; }
  .hero__blob { position:absolute; border-radius:50%; filter:blur(100px); opacity:.22; animation:blobFloat 12s ease-in-out infinite alternate; }
  .hero__blob--1 { width:620px; height:620px; background:radial-gradient(circle,#FF2F2F,transparent 68%); top:-120px; right:-80px; animation-duration:14s; }
  .hero__blob--2 { width:420px; height:420pDx; background:radial-gradient(circle,#F9DCC5,transparent 68%); bottom:-60px; left:8%; animation-duration:10s; animation-delay:-4s; }
  .hero__blob--3 { width:280px; height:280px; background:radial-gradient(circle,#FF6B35,transparent 68%); top:38%; left:48%; animation-duration:16s; animation-delay:-8s; }
  @keyframes blobFloat { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(28px,-38px) scale(1.08)} 100%{transform:translate(-18px,18px) scale(.94)} }
  .hero__noise { position:absolute; inset:0; opacity:.22; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
  .hero__line { position:absolute; left:2.5rem; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; align-items:center; gap:12px; z-index:2; opacity:0; animation:fadeIn 1s ease forwards; animation-delay:1.4s; }
  .hero__line-bar { width:1px; height:80px; background:linear-gradient(to bottom,transparent,var(--border-hover),transparent); }
  .hero__line-label { font-family:var(--fm); font-size:.6rem; letter-spacing:.25em; text-transform:uppercase; color:var(--text-sec); writing-mode:vertical-rl; transform:rotate(180deg); }
  .hero__inner { position:relative; z-index:1; width:100%; max-width:var(--container); margin:0 auto; padding:0 2.5rem 0 6rem; display:flex; flex-direction:column; justify-content:center; height:100%; }
  .hero__badge { display:inline-flex; align-items:center; gap:10px; margin-bottom:1.2rem; padding:7px 14px; background:rgba(249,220,197,.06); border:1px solid var(--border); border-radius:100px; opacity:0; animation:fadeUp .7s ease forwards; animation-delay:.15s; width:fit-content; }
  .hero__badge-dot { width:7px; height:7px; border-radius:50%; background:var(--primary); animation:dotPulse 2s ease infinite; flex-shrink:0; }
  .hero__badge-text { font-family:var(--fm); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--text-sec); }
  .hero__heading { font-family:var(--fd); font-weight:900; line-height:.94; letter-spacing:-.025em; margin-bottom:1.2rem; font-size:clamp(2.8rem,7vw,7rem); opacity:0; animation:fadeUp .75s ease forwards; animation-delay:.3s; }
  .hero__line-solid  { display:block; color:var(--text-primary); }
  .hero__line-italic { display:block; font-style:italic; color:var(--secondary); }
  .hero__line-outline { display:block; color:transparent; -webkit-text-stroke:1.5px rgba(249,220,197,.45); }
  .hero__sub { max-width:500px; color:var(--text-sec); font-size:1rem; font-weight:300; line-height:1.75; margin-bottom:1.5rem; opacity:0; animation:fadeUp .75s ease forwards; animation-delay:.48s; }
  .hero__sub strong { color:var(--text-primary); font-weight:500; }
  .hero__cta { display:flex; align-items:center; gap:1rem; flex-wrap:wrap; margin-bottom:1.5rem; opacity:0; animation:fadeUp .75s ease forwards; animation-delay:.62s; }
  .hero__stats { display:flex; gap:3rem; padding-top:1.2rem; border-top:1px solid var(--border); opacity:0; animation:fadeUp .75s ease forwards; animation-delay:.78s; align-items:flex-start; margin-top:2rem; }
  .hero__stat-num { font-family:var(--fd); font-size:2.2rem; font-weight:700; color:var(--primary); line-height:1; display:block; }
  .hero__stat-label { font-size:.78rem; color:var(--text-sec); margin-top:4px; display:block; }
  .hero__scroll { position:absolute; bottom:1.5rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; z-index:2; opacity:0; animation:fadeIn 1s ease forwards; animation-delay:1.3s; }
  .hero__scroll-line { width:1px; height:40px; background:linear-gradient(to bottom,var(--primary),transparent); animation:scrollPulse 2s ease-in-out infinite; }
  .hero__scroll-text { font-family:var(--fm); font-size:.6rem; letter-spacing:.22em; text-transform:uppercase; color:var(--text-sec); writing-mode:vertical-rl; }
  .hero__visual { position:absolute; right:0; top:0; bottom:0; width:clamp(280px,38vw,520px); z-index:1; pointer-events:none; }
  .hero__visual-inner { width:100%; height:100%; background:linear-gradient(160deg,rgba(249,220,197,.05) 0%,rgba(255,47,47,.03) 100%); border-left:1px solid var(--border); display:flex; align-items:center; justify-content:center; padding-bottom:8rem; opacity:0; animation:slideLeft 1s ease forwards; animation-delay:.5s; }
  .hero__visual-monogram { font-family:var(--fd); font-size:clamp(8rem,16vw,18rem); font-weight:900; letter-spacing:-.06em; line-height:1; color:rgba(249,220,197,0.08); -webkit-text-stroke:1.5px rgba(249,220,197,0.35); user-select:none; }

  /* ── PANEL (base compartilhada entre ProjectsPanel e SobrePanel) ── */
  .panel { position:fixed; inset:0; z-index:400; pointer-events:none; }
  .panel__sheet { position:absolute; inset:0; width:100%; height:100%; background:var(--background); transform:translateY(100%); transition:transform 550ms cubic-bezier(0.16,1,0.3,1); overflow-y:auto; overflow-x:hidden; pointer-events:none; display:flex; flex-direction:column; }
  .panel.open .panel__sheet { transform:translateY(0); pointer-events:all; }
  .panel__bar { position:sticky; top:0; z-index:410; height:68px; display:flex; align-items:center; justify-content:space-between; padding:0 3rem; background:rgba(15,13,12,.95); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); flex-shrink:0; }
  .panel__label { font-family:var(--fm); font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:var(--text-sec); }
  .panel__label span { color:var(--primary); margin-right:8px; }
  .panel__close { display:flex; align-items:center; gap:8px; padding:8px 18px; border-radius:100px; border:1px solid var(--border); background:none; color:var(--text-sec); font-family:var(--fm); font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; transition:all 220ms var(--ease); cursor:pointer; }
  .panel__close:hover { border-color:var(--primary); color:var(--primary); background:var(--primary-glow); }
  .panel__close-x { font-size:1rem; line-height:1; transition:transform 300ms var(--ease); }
  .panel__close:hover .panel__close-x { transform:rotate(90deg); }
  .panel__content { padding:3.5rem 3rem 5rem; flex:1; max-width:1300px; width:100%; margin:0 auto; }

  /* ── PROJETOS (dentro do ProjectsPanel) ── */
  .projects-section { position:relative; overflow:hidden; }
  .projects-section::before { content:''; position:absolute; top:-300px; right:-200px; width:700px; height:700px; background:radial-gradient(circle,rgba(255,47,47,.05),transparent 65%); pointer-events:none; }
  .ph { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:3rem; gap:1rem; flex-wrap:wrap; }
  .section-num { font-family:var(--fm); font-size:.72rem; color:var(--text-sec); letter-spacing:.12em; text-transform:uppercase; display:block; margin-bottom:.75rem; }
  .section-title { font-family:var(--fd); font-size:clamp(1.8rem,3.5vw,3rem); font-weight:700; line-height:1.08; letter-spacing:-.02em; }
  .section-title em { font-style:italic; color:var(--secondary); }
  .ph-right { display:flex; align-items:center; gap:1.5rem; flex-shrink:0; flex-wrap:wrap; }
  .view-all { font-size:.875rem; color:var(--text-sec); display:flex; align-items:center; gap:6px; transition:color 200ms; white-space:nowrap; }
  .view-all:hover { color:var(--primary); }
  .view-all-arrow { transition:transform 200ms; }
  .view-all:hover .view-all-arrow { transform:translateX(4px); }
  .filters { display:flex; gap:8px; flex-wrap:wrap; }
  .filter-btn { font-family:var(--fm); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; padding:7px 16px; border-radius:100px; border:1px solid var(--border); color:var(--text-sec); background:transparent; transition:all 220ms var(--ease); cursor:pointer; }
  .filter-btn:hover { border-color:var(--border-hover); color:var(--text-primary); }
  .filter-btn.active { background:var(--primary); border-color:var(--primary); color:#fff; }
  .featured-row { display:grid; grid-template-columns:1.15fr 1fr; gap:10px; margin-bottom:10px; }
  .cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }

  /* ── CARDS DE PROJETO ── */
  .card { position:relative; border-radius:16px; overflow:hidden; background:var(--bg-surface); border:1px solid var(--border); transition:transform 360ms var(--ease),border-color 280ms,box-shadow 360ms var(--ease); cursor:pointer; display:flex; flex-direction:column; }
  .card:hover { transform:translateY(-6px); border-color:var(--border-hover); box-shadow:0 24px 56px rgba(0,0,0,.45),0 0 0 1px rgba(255,47,47,.08); }
  .card-img { position:relative; aspect-ratio:16/9; overflow:hidden; }
  .card-img-inner { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-family:var(--fd); font-size:3rem; font-weight:900; letter-spacing:-.06em; color:rgba(249,220,197,.14); transition:transform 400ms var(--ease); }
  .card:hover .card-img-inner { transform:scale(1.05); }
  /* cores de fundo dos cards */
  .t-red    { background:linear-gradient(140deg,#1C0D0D,#2E1414); }
  .t-warm   { background:linear-gradient(140deg,#1C1408,#2E2010); }
  .t-blue   { background:linear-gradient(140deg,#091320,#0F1F30); }
  .t-purple { background:linear-gradient(140deg,#13091E,#1F0F2E); }
  .t-green  { background:linear-gradient(140deg,#091A0E,#0F2A18); }
  .t-teal   { background:linear-gradient(140deg,#081A1A,#102828); }
  .card-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 55%); opacity:0; transition:opacity 300ms; display:flex; align-items:flex-end; padding:1.25rem; }
  .card:hover .card-overlay { opacity:1; }
  .overlay-link { display:inline-flex; align-items:center; gap:6px; background:var(--primary); color:#fff; font-size:.82rem; font-weight:500; padding:8px 14px; border-radius:6px; transition:background 180ms; }
  .overlay-link:hover { background:var(--primary-dark); }
  .card-num { position:absolute; top:1rem; left:1rem; font-family:var(--fm); font-size:.65rem; letter-spacing:.12em; color:rgba(249,220,197,.4); }
  .card-body { padding:1.25rem; flex:1; display:flex; flex-direction:column; }
  .card-tags { display:flex; gap:5px; flex-wrap:wrap; margin-bottom:10px; }
  .tag { font-family:var(--fm); font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; color:var(--primary); background:var(--primary-glow); padding:3px 8px; border-radius:4px; }
  .card-title { font-family:var(--fd); font-size:1.2rem; font-weight:700; line-height:1.2; margin-bottom:8px; color:var(--text-primary); }
  .card-desc { font-size:.875rem; color:var(--text-sec); line-height:1.65; margin-bottom:1rem; flex:1; }
  .card-footer { display:flex; align-items:center; justify-content:space-between; padding-top:.875rem; border-top:1px solid var(--border); margin-top:auto; }
  .card-links { display:flex; gap:12px; }
  .card-link { font-size:.8rem; font-weight:500; color:var(--text-sec); display:flex; align-items:center; gap:4px; transition:color 180ms; }
  .card-link:hover { color:var(--primary); }
  .card-year { font-family:var(--fm); font-size:.72rem; color:var(--text-sec); }
  .card-featured .card-img { aspect-ratio:3/2; }
  .card-featured .card-img-inner { font-size:4.5rem; }
  .card-featured .card-title { font-size:1.5rem; }

  /* ── SOBRE ── */
  .sobre-grid { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start; margin-bottom:5rem; }
  .sobre-eyebrow { font-family:var(--fm); font-size:.72rem; letter-spacing:.18em; text-transform:uppercase; color:var(--primary); margin-bottom:1.25rem; display:block; }
  .sobre-heading { font-family:var(--fd); font-size:clamp(2rem,4vw,3.2rem); font-weight:900; line-height:1.05; letter-spacing:-.025em; margin-bottom:1.75rem; }
  .sobre-heading em { font-style:italic; color:var(--secondary); }
  .sobre-bio { font-size:1rem; font-weight:300; line-height:1.85; color:var(--text-sec); margin-bottom:1.25rem; }
  .sobre-bio strong { color:var(--text-primary); font-weight:500; }
  .sobre-ctas { display:flex; gap:12px; flex-wrap:wrap; margin-top:2rem; }
  .sobre-visual { position:relative; }
  .sobre-avatar { width:100%; aspect-ratio:4/5; border-radius:20px; background:linear-gradient(145deg,#1C1410,#241C15); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; }
  .sobre-avatar-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center top; border-radius:20px; z-index:0; }
  .sobre-avatar-overlay { position:absolute; inset:0; background:linear-gradient(to bottom,rgba(15,13,12,0.18) 0%,rgba(15,13,12,0.10) 50%,rgba(15,13,12,0.55) 100%); z-index:1; border-radius:20px; }
 
.sobre-avatar-mono { 
  font-family:var(--fd); 
  font-size:clamp(6rem,12vw,10rem); 
  font-weight:900; 
  letter-spacing:-.06em; 
  color:transparent; 
  -webkit-text-stroke:2px rgba(249,220,197,0.6);
  user-select:none; 
  position:absolute; 
  top:50%; 
  left:50%; 
  transform:translate(-50%,-50%); 
  z-index:3; 
  mix-blend-mode:normal;
}


  .sobre-avatar-tag { position:absolute; bottom:1.5rem; left:1.5rem; background:var(--primary); color:#fff; padding:6px 14px; border-radius:var(--rsm); font-family:var(--fm); font-size:.68rem; letter-spacing:.1em; z-index:3; }
  .sobre-avatar-blob { position:absolute; border-radius:50%; filter:blur(60px); opacity:.3; pointer-events:none; z-index:1; }
  .sobre-avatar-blob--1 { width:220px; height:220px; background:radial-gradient(circle,#FF2F2F,transparent 68%); top:-40px; right:-40px; }
  .sobre-avatar-blob--2 { width:160px; height:160px; background:radial-gradient(circle,#F9DCC5,transparent 68%); bottom:-20px; left:-20px; }
  .sobre-skills-section { margin-bottom:4rem; }
  .sobre-skills-title { font-family:var(--fm); font-size:.72rem; letter-spacing:.18em; text-transform:uppercase; color:var(--text-sec); margin-bottom:1.5rem; display:block; padding-bottom:.75rem; border-bottom:1px solid var(--border); }
  .sobre-skills-grid { display:flex; gap:10px; overflow-x:auto; padding-bottom:8px; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; }
  .sobre-skills-grid::-webkit-scrollbar { height:3px; }
  .sobre-skills-grid::-webkit-scrollbar-thumb { background:var(--primary); border-radius:3px; }
  .sobre-skill-card { background:var(--bg-surface); border:1px solid var(--border); border-radius:12px; padding:1.1rem 1rem; display:flex; flex-direction:column; gap:8px; transition:border-color 220ms,transform 220ms var(--ease); flex-shrink:0; width:130px; scroll-snap-align:start; }
  .sobre-skill-card:hover { border-color:var(--border-hover); transform:translateY(-3px); }
  .sobre-skill-icon { font-size:1.4rem; line-height:1; }
  .sobre-skill-name { font-family:var(--fd); font-size:.95rem; font-weight:700; color:var(--text-primary); }
  .sobre-skill-level { font-family:var(--fm); font-size:.6rem; letter-spacing:.1em; text-transform:uppercase; color:var(--primary); }
  .sobre-skill-bar { height:2px; background:var(--border); border-radius:2px; overflow:hidden; }
  .sobre-skill-fill { height:100%; background:linear-gradient(90deg,var(--primary),#FF6B35); border-radius:2px; }
  .sobre-timeline-section { margin-bottom:4rem; }
  .sobre-timeline-title { font-family:var(--fm); font-size:.72rem; letter-spacing:.18em; text-transform:uppercase; color:var(--text-sec); margin-bottom:1.5rem; display:block; padding-bottom:.75rem; border-bottom:1px solid var(--border); }
  .sobre-timeline { display:flex; flex-direction:column; gap:0; }
  .sobre-tl-item { display:grid; grid-template-columns:120px 1px 1fr; gap:0 1.5rem; }
  .sobre-tl-year { font-family:var(--fm); font-size:.72rem; letter-spacing:.1em; color:var(--primary); padding-top:.2rem; text-align:right; }
  .sobre-tl-line { display:flex; flex-direction:column; align-items:center; }
  .sobre-tl-dot { width:8px; height:8px; border-radius:50%; background:var(--primary); flex-shrink:0; margin-top:4px; box-shadow:0 0 10px rgba(255,47,47,.5); }
  .sobre-tl-bar { width:1px; flex:1; min-height:32px; background:linear-gradient(to bottom,var(--primary-glow),transparent); }
  .sobre-tl-body { padding-bottom:2rem; }
  .sobre-tl-role { font-family:var(--fd); font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:4px; }
  .sobre-tl-company { font-family:var(--fm); font-size:.72rem; letter-spacing:.08em; color:var(--text-sec); margin-bottom:8px; }
  .sobre-tl-desc { font-size:.875rem; color:var(--text-sec); line-height:1.65; font-weight:300; }
  .sobre-contact-strip { background:var(--bg-surface); border:1px solid var(--border); border-radius:16px; padding:2rem 2.5rem; display:flex; align-items:center; justify-content:space-between; gap:2rem; flex-wrap:wrap; }
  .sobre-contact-strip h3 { font-family:var(--fd); font-size:1.4rem; font-weight:700; margin-bottom:4px; }
  .sobre-contact-strip p { font-size:.875rem; color:var(--text-sec); font-weight:300; }
  .sobre-contact-links { display:flex; gap:10px; flex-wrap:wrap; }
  .sobre-contact-link { display:inline-flex; align-items:center; gap:6px; padding:10px 20px; border-radius:8px; border:1px solid var(--border); color:var(--text-sec); font-size:.85rem; font-weight:500; transition:all 200ms var(--ease); }
  .sobre-contact-link:hover { border-color:var(--primary); color:var(--primary); background:var(--primary-glow); }

  /* ── SEÇÃO CONTATO ── */
  .contact { background:var(--bg-surface); padding:padding:0 0 8rem; position:relative; overflow:hidden; }
  .contact::before { content:''; position:absolute; bottom:-200px; right:-120px; width:600px; height:600px; background:radial-gradient(circle,rgba(255,47,47,.05),transparent 65%); pointer-events:none; }
  .contact::after  { content:''; position:absolute; top:-180px; left:-120px; width:500px; height:500px; background:radial-gradient(circle,rgba(249,220,197,.03),transparent 65%); pointer-events:none; }
.ccontainer { width:100%; max-width:var(--container); margin:0 auto; padding:0 2.5rem; position:relative; z-index:1; }

 .cg { display:grid; grid-template-columns:1fr 1.4fr; gap:4rem; align-items:start; padding-top:6rem; }
  .sn { font-family:var(--fm); font-size:.7rem; color:var(--text-sec); letter-spacing:.14em; text-transform:uppercase; display:block; margin-bottom:.75rem; }
  .st { font-family:var(--fd); font-size:clamp(2rem,3.8vw,3.1rem); font-weight:700; line-height:1.08; letter-spacing:-.022em; margin-bottom:1.5rem; }
  .st em { font-style:italic; color:var(--secondary); }
  .cdesc { color:var(--text-sec); font-size:1.04rem; font-weight:300; line-height:1.82; margin-bottom:2.25rem; }
  .cdesc strong { color:var(--text-primary); font-weight:500; }
  .cinfo { display:flex; flex-direction:column; gap:10px; margin-bottom:2rem; }
  .ci-item { display:flex; align-items:center; gap:1rem; font-size:.9375rem; color:var(--text-sec); text-decoration:none; transition:color 200ms; }
  .ci-item:hover { color:var(--text-primary); }
  .ci-icon { width:42px; height:42px; border-radius:8px; background:var(--bg-elevated); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; transition:border-color 200ms,transform 200ms; }
  .ci-item:hover .ci-icon { border-color:var(--primary); transform:scale(1.05); }
  .ci-label { font-size:.7rem; font-family:var(--fm); letter-spacing:.1em; text-transform:uppercase; color:var(--text-sec); display:block; margin-bottom:1px; }
  .ci-val { font-size:.9rem; color:var(--text-primary); }
  .socials { display:flex; gap:8px; margin-bottom:2.5rem; }
  .soc { width:44px; height:44px; border-radius:8px; background:var(--bg-elevated); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-family:var(--fm); font-size:.62rem; font-weight:500; color:var(--text-sec); text-decoration:none; transition:all 220ms var(--ease); }
  .soc:hover { border-color:var(--primary); color:var(--primary); background:var(--primary-glow); transform:translateY(-3px); }
  .avail { background:var(--bg-elevated); border:1px solid var(--border); border-radius:14px; padding:.75rem 1rem; display:inline-flex; align-items:center; gap:1rem; }
  .av-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; animation:gPulse 2s ease infinite; flex-shrink:0; }
  @keyframes gPulse { 0%{box-shadow:0 0 0 0 rgba(74,222,128,.5)} 70%{box-shadow:0 0 0 6px rgba(74,222,128,0)} 100%{box-shadow:0 0 0 0 rgba(74,222,128,0)} }
  .av-title { font-size:.9rem; font-weight:500; color:var(--text-primary); }
  .av-sub { font-size:.78rem; color:var(--text-sec); margin-top:2px; }
  .av-badge { font-family:var(--fm); font-size:.62rem; letter-spacing:.1em; text-transform:uppercase; color:var(--primary); background:var(--primary-glow); padding:5px 12px; border-radius:100px; border:1px solid rgba(255,47,47,.22); white-space:nowrap; }

  /* ── FORMULÁRIO DE CONTATO ── */
   .cform { display:flex; flex-direction:column; gap:2.5rem; }
  .fg { display:flex; flex-direction:column; gap: 5px; }
  .fl { font-family:var(--fm); font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:var(--text-sec); margin-left:-1px; }
  .fl span { color:var(--primary); }
  .fi, .ft, .fsel { width:100%; background:var(--bg-elevated); border:1px solid var(--border); border-radius:8px; padding:10px 17px; font-family:var(--fb); font-size:.9375rem; color:var(--text-primary); outline:none; resize:none; -webkit-appearance:none; transition:border-color 200ms,box-shadow 200ms; }
  .fsel { cursor:pointer; }
  .fsel option { background:#232019; }
  .fi::placeholder,.ft::placeholder { color:var(--text-sec); opacity:.55; }
  .fi:focus,.ft:focus,.fsel:focus { border-color:var(--primary); box-shadow:0 0 0 3px var(--primary-glow); }
  .ft { min-height:130px; line-height:1.65; }
  .fr2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
 .fsr { display:flex; align-items:center; gap:1.1rem; flex-wrap:wrap; justify-content:flex-end; }
  .cbtn { display:inline-flex; align-items:center; gap:8px; font-family:var(--fb); font-size:.9375rem; font-weight:500; border-radius:6px; padding:13px 26px; transition:all 280ms var(--ease); cursor:pointer; border:none; background:var(--primary); color:#fff; }
  .cbtn:hover { background:var(--primary-dark); transform:translateY(-2px); box-shadow:0 10px 28px rgba(255,47,47,.32); }
  .cbtn:disabled { opacity:.6; cursor:not-allowed; transform:none!important; box-shadow:none!important; }
  .cbtn:active { transform:translateY(0)!important; box-shadow:none!important; }
  .cba { display:inline-block; transition:transform 200ms; }
  .cbtn:hover .cba { transform:translateX(5px); }
  .spin { width:16px; height:16px; border:2px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }
  @keyframes spin { to{transform:rotate(360deg)} }
  .fstatus { font-size:.875rem; }
  .fstatus.ok  { color:#4ade80; }
  .fstatus.err { color:var(--primary); }
  .logo-loop-wrap { margin-top:0; padding:2rem 0; border-top:none; border-bottom:1px solid var(--border); }
.logo-loop-label { font-family:var(--fm); font-size:.68rem; letter-spacing:.18em; text-transform:uppercase; color:var(--text-sec); text-align:center; margin-bottom:1.5rem; }

  /* ── ANIMAÇÕES GLOBAIS ── */
  @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes slideLeft{ from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes dotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
  @keyframes scrollPulse { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }

  /* ── RESPONSIVIDADE ── */
  @media(max-width:1024px) {
    .hero__visual{display:none}
    .hero__inner{padding-left:2.5rem}
    .hero__line{display:none}
    .featured-row{grid-template-columns:1fr 1fr}
    .sobre-grid{grid-template-columns:1fr;gap:3rem}
    .sobre-visual{max-width:420px}
  }
  @media(max-width:900px)  { .cg{grid-template-columns:1fr;gap:3.5rem} }
  @media(max-width:840px)  { .featured-row{grid-template-columns:1fr} .cards-grid{grid-template-columns:repeat(2,1fr)} .card-featured .card-img{aspect-ratio:16/9} }
  @media(max-width:768px)  {
    .hero__inner{padding:0 1.25rem}
    .hero__stats{gap:1.5rem;flex-wrap:nowrap;flex-direction:row}
    .hero__heading{font-size:clamp(2.2rem,12vw,4rem)}
    .hero__line-outline{-webkit-text-stroke-width:1px}
    .panel__content{padding:2rem 1.25rem 3rem}
    .panel__bar{padding:0 1.25rem}
    .sobre-tl-item{grid-template-columns:80px 1px 1fr}
  }
  @media(max-width:560px)  {
    .cards-grid{grid-template-columns:1fr}
    .ph{flex-direction:column;align-items:flex-start}
    .ph-right{width:100%}
    .sobre-contact-strip{flex-direction:column;align-items:flex-start}
    .contact{padding:4rem 0 5rem}
    .ccontainer{padding:0 1.25rem}
    .fr2{grid-template-columns:1fr}
    .avail{flex-direction:column;align-items:flex-start}
  }
`;

export default styles;
