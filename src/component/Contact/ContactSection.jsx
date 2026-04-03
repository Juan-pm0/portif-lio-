// ============================================================
//  COMPONENTE — src/components/Contact/ContactSection.jsx
// ============================================================

import { useState } from "react";
import emailjs from "emailjs-com"; // ✅ ADICIONADO
import { CONTACT_INFO, SOCIALS } from "../../data/index";
import LogoLoop from "../LogoLoop";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiTailwindcss, SiPhp, SiLaravel, SiMysql
} from "react-icons/si";

const TECH_LOGOS = [
  { node: <SiHtml5 color="#E44D26" />, alt: "HTML" },
  { node: <SiCss color="#1572B6" />, alt: "CSS" },
  { node: <SiJavascript color="#F7DF1E" />, alt: "JavaScript" },
  { node: <SiTypescript color="#3178C6" />, alt: "TypeScript" },
  { node: <SiReact color="#61DAFB" />, alt: "React" },
  { node: <SiTailwindcss color="#38BDF8" />, alt: "Tailwind" },
  { node: <SiPhp color="#8892BF" />, alt: "PHP" },
  { node: <SiLaravel color="#FF2D20" />, alt: "Laravel" },
  { node: <SiMysql color="#4479A1" />, alt: "SQL" },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "", email: "", subject: "", budget: "", message: "",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    setStatus({ type: "err", msg: "⚠ Preencha os campos obrigatórios." });
    return;
  }

  if (!/\S+@\S+\.\S+/.test(form.email)) {
    setStatus({ type: "err", msg: "⚠ Email inválido." });
    return;
  }

  setLoading(true);
  setStatus({ type: "", msg: "" });

try {
  await emailjs.send(
    "service_hljl4m8",
    "template_o8af53m",
    {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    },
    "UcyTv6H5O09Rg3IHB"
  );

  setStatus({ type: "ok", msg: "✓ Mensagem enviada! Respondo em breve." });
  setForm({ name: "", email: "", subject: "", budget: "", message: "" });

} catch (error) {
  console.error(error);
  setStatus({ type: "err", msg: "❌ Erro ao enviar. Tente novamente." });
}

  setLoading(false);
  setTimeout(() => setStatus({ type: "", msg: "" }), 5000);
};

  return (
    <section className="contact" id="contato">
      <div className="ccontainer">

        <div className="logo-loop-wrap">
          <p className="logo-loop-label">Tecnologias que uso</p>
          <LogoLoop
            logos={TECH_LOGOS}
            speed={60}
            logoHeight={24}
            gap={40}
            pauseOnHover
            fadeOut
            fadeOutColor="var(--bg-surface)"
            scaleOnHover
          />
        </div>

        <div className="cg">

          <div>
            <span className="sn">03 — Contato</span>
            <h2 className="st">Vamos construir <em>algo juntos</em></h2>
            <p className="cdesc">
              Tem um projeto interessante ou uma oportunidade que quer discutir?
              Estou sempre aberto a conversar sobre novas ideias,{" "}
              <strong>colaborações</strong> ou simplesmente bater um papo sobre tecnologia.
            </p>

            <div className="cinfo">
              {CONTACT_INFO.map(({ icon, label, val, href }) =>
                href ? (
                  <a key={label} href={href} className="ci-item">
                    <span className="ci-icon">{icon}</span>
                    <div>
                      <span className="ci-label">{label}</span>
                      <span className="ci-val">{val}</span>
                    </div>
                  </a>
                ) : (
                  <div key={label} className="ci-item">
                    <span className="ci-icon">{icon}</span>
                    <div>
                      <span className="ci-label">{label}</span>
                      <span className="ci-val">{val}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="socials">
              {SOCIALS.map(({ code, title, href, icon: Icon }) => (
                <a key={code} href={href} className="soc" title={title}
                  target="_blank" rel="noopener noreferrer">
                  <Icon />
                </a>
              ))}
            </div>

            <div className="avail">
              <span className="av-dot" />
              <div>
                <div className="av-title">Disponível para projetos</div>
                <div className="av-sub">Freelance · Full-time · Colaboração</div>
              </div>
              <span className="av-badge">Open to work</span>
            </div>
          </div>

          <form className="cform" onSubmit={handleSubmit} noValidate style={{ marginTop: "4rem" }}>

            <div className="fr2">
              <div className="fg">
                <label className="fl" htmlFor="name">Nome <span>*</span></label>
                <input
                  id="name" name="name" className="fi" type="text"
                  placeholder="Seu nome" value={form.name}
                  onChange={handleChange} required autoComplete="name"
                />
              </div>
              <div className="fg">
                <label className="fl" htmlFor="email">Email <span>*</span></label>
                <input
                  id="email" name="email" className="fi" type="email"
                  placeholder="seu@email.com" value={form.email}
                  onChange={handleChange} required autoComplete="email"
                />
              </div>
            </div>

            <div className="fg">
              <label className="fl" htmlFor="subject">Assunto</label>
              <input
                id="subject" name="subject" className="fi" type="text"
                placeholder="Sobre o que é?" value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="fg" style={{ marginTop: "1.5rem" }}>
              <label className="fl" htmlFor="budget">Orçamento estimado</label>
              <div style={{ position: "relative" }}>
                <select
                  id="budget" name="budget" className="fi fsel"
                  value={form.budget} onChange={handleChange}
                  style={{ appearance: "none", WebkitAppearance: "none", paddingRight: "2.5rem" }}
                >
                  <option value="" disabled>Selecione uma faixa</option>
                  <option>Menos de R$1.000</option>
                  <option>R$1.000 – R$5.000</option>
                  <option>R$5.000 – R$10.000</option>
                  <option>Acima de R$10.000</option>
                  <option>A combinar</option>
                </select>
              </div>
            </div>

            <div className="fg" style={{ marginTop: "1.5rem" }}>
              <label className="fl" htmlFor="message">Mensagem <span>*</span></label>
              <textarea
                id="message" name="message" className="ft" rows={5}
                placeholder="Conte um pouco sobre seu projeto ou ideia..."
                value={form.message} onChange={handleChange} required
              />
            </div>

            <div className="fsr">
              <button type="submit" className="cbtn" disabled={loading}>
                {loading ? (
                  <><span className="spin" />&nbsp;Enviando...</>
                ) : (
                  <>Enviar mensagem <span className="cba">→</span></>
                )}
              </button>
              {status.msg && (
                <p className={`fstatus ${status.type}`} role="status" aria-live="polite">
                  {status.msg}
                </p>
              )}
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}