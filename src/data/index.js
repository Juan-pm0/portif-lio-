// ============================================================
//  DADOS ESTÁTICOS — src/data/index.js
//  Contém: todos os arrays de dados usados nos componentes.
//  Para adicionar um projeto novo, basta editar PROJECTS abaixo.
//  Para mudar skills ou timeline, edite SKILLS e TIMELINE.
// ============================================================

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

// ── LISTA DE PROJETOS (exibida no ProjectsPanel) ──
export const PROJECTS = [
  {
    id: 1,
    title: "TaskFlow — Gestão de Tarefas",
    desc: "Plataforma de produtividade com boards kanban em tempo real, colaboração em equipe e analytics de performance integrado.",
    tags: ["React", "Node.js", "WebSocket", "PostgreSQL"],
    category: "fullstack",
    color: "t-red",
    emoji: "TF",
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "Mercado API",
    desc: "API RESTful robusta para e-commerce com autenticação JWT, pagamentos Stripe e deploy automatizado em Docker/AWS.",
    tags: ["Node.js", "Express", "Stripe", "Docker"],
    category: "backend",
    color: "t-warm",
    emoji: "MA",
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio CMS",
    desc: "Sistema headless CMS customizado com editor rich-text, gestão de mídia e preview ao vivo para criadores de conteúdo.",
    tags: ["Next.js", "GraphQL", "MongoDB"],
    category: "fullstack",
    color: "t-blue",
    emoji: "PC",
    year: "2023",
  },
  {
    id: 4,
    title: "DevRadar",
    desc: "App mobile para localizar devs próximos com mapa interativo, filtros por stack e chat em tempo real.",
    tags: ["React Native", "Socket.io", "MongoDB"],
    category: "mobile",
    color: "t-purple",
    emoji: "DR",
    year: "2023",
  },
  {
    id: 5,
    title: "AI Image Lab",
    desc: "Laboratório de geração e edição de imagens com IA, integrado com Stable Diffusion e APIs de modelos de difusão.",
    tags: ["Python", "FastAPI", "React", "AI"],
    category: "fullstack",
    color: "t-green",
    emoji: "AI",
    year: "2024",
  },
  {
    id: 6,
    title: "Auth Microservice",
    desc: "Serviço de autenticação escalável com OAuth2, MFA, rate limiting e logs estruturados para produção.",
    tags: ["Node.js", "Redis", "JWT", "Docker"],
    category: "backend",
    color: "t-teal",
    emoji: "AM",
    year: "2023",
  },
];

// ── FILTROS DO PAINEL DE PROJETOS ──
export const FILTERS = [
  { label: "Todos",      value: "all"       },
  { label: "Full Stack", value: "fullstack" },
  { label: "Back-end",   value: "backend"   },
  { label: "Mobile",     value: "mobile"    },
];

// ── HABILIDADES TÉCNICAS (exibidas no SobrePanel) ──
export const SKILLS = [
  { icon: "🌐", name: "HTML",       level: "Avançado", pct: 92 },
  { icon: "🎨", name: "CSS",        level: "Avançado", pct: 90 },
  { icon: "⚡", name: "JavaScript", level: "Avançado", pct: 88 },
  { icon: "⚛️", name: "React",      level: "Médio",    pct: 70 },
  { icon: "🌊", name: "Tailwind",   level: "Médio",    pct: 72 },
  { icon: "📘", name: "TypeScript", level: "Médio",    pct: 60 },
  { icon: "🐘", name: "PHP",        level: "Básico",   pct: 42 },
  { icon: "🔥", name: "Laravel",    level: "Básico",   pct: 38 },
  { icon: "🗄️", name: "SQL",        level: "Básico",   pct: 40 },
];

// ── LINHA DO TEMPO / TRAJETÓRIA (exibida no SobrePanel) ──
export const TIMELINE = [
  {
    year: "2026",
    role: "Desenvolvedor em formação (Back-end)",
    company: "ADS — 5º Período",
    desc: "Aprofundando conhecimentos em desenvolvimento back-end, com foco em PHP, Laravel, bancos de dados SQL e construção de APIs. Evoluindo na criação de sistemas completos e escaláveis.",
  },
  {
    year: "2025",
    role: "Desenvolvedor Full Stack em evolução",
    company: "B7Web — Formação Profissional",
    desc: "Aprofundamento em desenvolvimento web moderno com foco em JavaScript, React e Tailwind. Experiência com versionamento utilizando Git e GitHub, além de estudos em PHP, Laravel e integração com banco de dados.",
  },
  {
    year: "2024",
    role: "Início na programação",
    company: "Análise e Desenvolvimento de Sistemas + Cursos complementares",
    desc: "Início da jornada na programação com foco em lógica, algoritmos, HTML, CSS e JavaScript através de cursos complementares (Curso em Vídeo) e graduação em ADS. Desenvolvimento dos primeiros projetos práticos.",
  },
];

// ── INFORMAÇÕES DE CONTATO (exibidas na ContactSection) ──
export const CONTACT_INFO = [
  { icon: "✉",  label: "Email",       val: "juanpinho997@gmail.com",      href: "mailto:juanpinho997@gmail.com" },
  { icon: "📍", label: "Localização", val: "Brasil — Remoto & Presencial", href: null },
  { icon: "⏱", label: "Resposta",    val: "Em até 24 horas",              href: null },
];

// ── REDES SOCIAIS (botões na ContactSection) ──
// icon = referência ao componente (sem JSX), renderize com <Icon /> no componente
export const SOCIALS = [
  { code: "GH", title: "GitHub",    href: "https://github.com/Juan-pm0",                 icon: FaGithub    },
  { code: "LI", title: "LinkedIn",  href: "https://linkedin.com/in/juan-pinho-526227299", icon: FaLinkedin  },
  { code: "IG", title: "Instagram", href: "https://www.instagram.com/juan__pinho/",       icon: FaInstagram },
];

// ── PASSOS DA BARRA DE LOADING ──
export const LD_STEPS = [
  [15, 180],
  [35, 220],
  [55, 260],
  [72, 200],
  [88, 240],
  [100, 300],
];
