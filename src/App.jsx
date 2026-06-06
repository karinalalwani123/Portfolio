import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "LangGraph (StateGraph)", level: 92, category: "ai" },
  { name: "LangChain", level: 90, category: "ai" },
  { name: "Meta LLaMA 3.3 70B", level: 88, category: "ai" },
  { name: "Groq API", level: 87, category: "ai" },
  { name: "Prompt Engineering", level: 90, category: "ai" },
  { name: "Multi-Agent Orchestration", level: 85, category: "ai" },
  { name: "RAG", level: 86, category: "ai" },
  { name: "NLP", level: 82, category: "ai" },
  { name: "Email Classification", level: 84, category: "ai" },
  { name: "Confidence Scoring", level: 80, category: "ai" },
  { name: "ML Pipelines", level: 78, category: "ai" },
  { name: "Model Deployment", level: 76, category: "ai" },
  { name: "Python", level: 93, category: "lang" },
  { name: "JavaScript", level: 82, category: "lang" },
  { name: "TypeScript", level: 76, category: "lang" },
  { name: "FastAPI", level: 88, category: "backend" },
  { name: "REST APIs", level: 87, category: "backend" },
  { name: "OAuth 2.0 (Google)", level: 82, category: "backend" },
  { name: "Gmail API", level: 85, category: "backend" },
  { name: "Tavily Search API", level: 80, category: "backend" },
  { name: "Python Threading", level: 78, category: "backend" },
  { name: "Background Job Scheduling", level: 75, category: "backend" },
  { name: "React.js", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 83, category: "frontend" },
  { name: "React Router", level: 80, category: "frontend" },
  { name: "Axios", level: 82, category: "frontend" },
  { name: "Web Speech API", level: 76, category: "frontend" },
  { name: "Real-time UI Sync", level: 78, category: "frontend" },
  { name: "Firebase Firestore", level: 84, category: "db" },
  { name: "Firebase Auth", level: 85, category: "db" },
  { name: "Real-time Listeners", level: 82, category: "db" },
  { name: "Per-user Data Isolation", level: 80, category: "db" },
  { name: "Vercel", level: 85, category: "devops" },
  { name: "Render", level: 80, category: "devops" },
  { name: "Git & GitHub", level: 88, category: "devops" },
  { name: "CI/CD", level: 75, category: "devops" },
  { name: "UptimeRobot", level: 72, category: "devops" },
  { name: "Cloud Infrastructure", level: 74, category: "devops" },
];

const projects = [
  {
    title: "Zentra AI",
    tag: "LangGraph + LLM",
    tagColor: "#7C3AED",
    desc: "Production-ready AI email automation platform using LangGraph StateGraph with 14 workflow modules, Groq LLaMA 3.3 70B, and Tavily search. Secure multi-user Gmail OAuth2 integration with AI-powered classification, auto-replies, scheduling, and chat interface.",
    stack: ["LangGraph", "LLaMA 3.3 70B", "Groq", "FastAPI", "React", "Firebase", "Tailwind", "OAuth2"],
    emoji: "⚡",
    metrics: [{ label: "Workflow Modules", val: "14" }, { label: "Hosting", val: "24/7" }],
    link: "https://your-deployed-url.com",
  },
  {
    title: "Calorie Bot",
    tag: "NLP / Health AI",
    tagColor: "#059669",
    desc: "Conversational calorie tracking bot built with Python and Streamlit. Users describe meals in natural language and the bot estimates nutritional values, tracks daily intake, and provides health insights in real time.",
    stack: ["Python", "Streamlit", "NLP"],
    emoji: "🥗",
    metrics: [{ label: "Interface", val: "Chat" }, { label: "Input", val: "Natural Language" }],
    link: "https://your-deployed-url.com",
  },
  {
    title: "ChatLearn",
    tag: "NLP / AI",
    tagColor: "#38BDF8",
    desc: "AI-powered chatbot for language learning using NLP algorithms and speech recognition. Intent-classification pipeline maps spoken queries to contextual responses for natural, real-time human–machine interaction.",
    stack: ["Python", "NLP", "Speech Recognition", "Intent Classification"],
    emoji: "🗣️",
    metrics: [{ label: "Query Accuracy", val: "95%" }, { label: "Real-time", val: "Yes" }],
    link: null,
  },

];

const timeline = [
  {
    year: "2021–2025",
    title: "Bachelor of Technology — Computer Science",
    place: "Jhulelal Institute of Technology",
    note: "Graduated with 82.90%. Specialized in AI, ML, and full-stack development.",
    icon: "🎓",
  },
  {
    year: "Jul–Aug 2024",
    title: "Software Development Intern",
    place: "CPMCD Tech Platform",
    note: "Completed 6+ development modules in a 4-week internship, building an Employee Attendance System under mentor guidance. Gained hands-on experience in full-stack development, covering authentication, attendance tracking, reporting, and database management using Flask and SQLite.",
    icon: "💻",
  },
  {
    year: "Sep–Oct 2023",
    title: "Python Developer Intern",
    place: "Arcane Path Pvt. Ltd.",
    note: "Completed 5+ modules in a 4-week internship by developing a Quiz Game, gaining hands-on experience in game logic, scoring system, and full-stack development under mentor guidance.",
    icon: "🐍",
  },
  {
    year: "Apr–May 2023",
    title: "Backend Developer Intern",
    place: "Webakruti Pvt. Ltd.",
    note: "Completed 5+ modules in a 4-week internship by developing a Job Tracker, gaining hands-on experience in task management, workflow tracking, database handling, and full-stack development under mentor guidance.",
    icon: "🔧",
  },
];

const catColors = {
  ai: "#7C3AED", lang: "#0891B2", backend: "#D97706",
  frontend: "#059669", db: "#DB2777", devops: "#6B7280",
};
const catLabels = {
  ai: "AI & LLMs", lang: "Languages", backend: "Backend",
  frontend: "Frontend", db: "Database & Auth", devops: "DevOps & Tooling",
};

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function SkillBar({ name, level, color, delay }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", color: "#C4B5FD" }}>{name}</span>
        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 4,
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          width: inView ? `${level}%` : "0%",
          transition: `width 1s ease ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, idx }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: "24px",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${idx * 100}ms, transform 0.6s ease ${idx * 100}ms`,
      cursor: "pointer", position: "relative", overflow: "hidden",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; e.currentTarget.style.background = "rgba(167,139,250,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${project.tagColor}, transparent)` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 22 }}>{project.emoji}</span>
          <h3 style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 600, color: "#F9FAFB", fontFamily: "'Syne', sans-serif" }}>{project.title}</h3>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 20, background: `${project.tagColor}22`, color: project.tagColor, border: `1px solid ${project.tagColor}44`, whiteSpace: "nowrap" }}>
          {project.tag}
        </span>
      </div>
      <p style={{ fontSize: 13.5, color: "#9CA3AF", lineHeight: 1.65, margin: "0 0 16px" }}>{project.desc}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {project.stack.map(s => (
          <span key={s} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "#D1D5DB", fontFamily: "'IBM Plex Mono', monospace" }}>{s}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 16 }}>
          {project.metrics.map(m => (
            <div key={m.label}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#A78BFA", fontFamily: "'Syne', sans-serif" }}>{m.val}</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>{m.label}</div>
            </div>
          ))}
        </div>
        {project.link
  ? <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(16,185,129,0.1)", color: "#10B981", fontFamily: "'IBM Plex Mono', monospace", border: "1px solid rgba(16,185,129,0.25)" }}>✓ Deployed</span>
  : <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "#6B7280", fontFamily: "'IBM Plex Mono', monospace", border: "1px solid rgba(255,255,255,0.06)" }}>Local / Not Deployed</span>
}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [typed, setTyped] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  const roles = ["AI Engineer", "LangGraph Builder", "LLM Developer", "Full Stack Dev"];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => setCursorOn(c => !c), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout;
    function tick() {
      const role = roles[roleRef.current];
      if (dirRef.current === 1) {
        charRef.current++;
        if (charRef.current === role.length) { dirRef.current = -1; timeout = setTimeout(tick, 1800); return; }
      } else {
        charRef.current--;
        if (charRef.current === 0) { roleRef.current = (roleRef.current + 1) % roles.length; dirRef.current = 1; }
      }
      setTyped(role.slice(0, charRef.current));
      timeout = setTimeout(tick, dirRef.current === 1 ? 80 : 45);
    }
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);

  const filteredSkills = activeFilter === "all" ? skills : skills.filter(s => s.category === activeFilter);
  const filters = [
    { val: "all", label: "All" },
    { val: "ai", label: "AI & LLMs" },
    { val: "lang", label: "Languages" },
    { val: "backend", label: "Backend" },
    { val: "frontend", label: "Frontend" },
    { val: "db", label: "DB & Auth" },
    { val: "devops", label: "DevOps" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#050508", color: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Ambient blobs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "40%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 5%", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", background: "rgba(5,5,8,0.7)" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#A78BFA", letterSpacing: "0.04em" }}>Portfolio.</span>
        <div style={{ display: "flex", gap: 28 }}>
          {["About", "Skills", "Projects", "Timeline", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 13, color: "#9CA3AF", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#F9FAFB"}
              onMouseLeave={e => e.target.style.color = "#9CA3AF"}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 8% 60px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 14px", borderRadius: 20, border: "1px solid rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.07)", marginBottom: 28 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981" }} />
              <span style={{ fontSize: 12, color: "#A78BFA", letterSpacing: "0.06em", fontFamily: "'IBM Plex Mono', monospace" }}>Open to opportunities</span>
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              KARINA LALWANI
            </h1>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 2.8vw, 38px)", fontWeight: 400, margin: "0 0 24px", minHeight: "1.4em", color: "transparent", background: "linear-gradient(135deg, #A78BFA, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {typed}<span style={{ opacity: cursorOn ? 1 : 0, WebkitTextFillColor: "#A78BFA" }}>|</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#9CA3AF", marginBottom: 32 }}>
              Fresher AI engineer specializing in LangGraph multi-agent systems, LLM orchestration, and full-stack AI products. I build production-grade AI workflows that go from prototype to 24/7 deployed systems.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "linear-gradient(135deg, #7C3AED, #6D28D9)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                View Projects →
              </a>
              <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", color: "#D1D5DB", textDecoration: "none", fontSize: 14, fontWeight: 500, background: "transparent", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}>
                Get in Touch
              </a>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
              {[{ n: "3", l: "Projects" }, { n: "3", l: "Internships" }, { n: "14", l: "LangGraph Modules" }, { n: "95%", l: "NLP Accuracy" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#A78BFA" }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — Terminal */}
          <Terminal />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "80px 8%", position: "relative", zIndex: 1 }}>
        <SectionLabel label="Skills" />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 700, margin: "8px 0 32px", letterSpacing: "-0.02em" }}>Technical Stack</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f.val} onClick={() => setActiveFilter(f.val)} style={{
              padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid",
              borderColor: activeFilter === f.val ? "#7C3AED" : "rgba(255,255,255,0.1)",
              background: activeFilter === f.val ? "rgba(124,58,237,0.2)" : "transparent",
              color: activeFilter === f.val ? "#A78BFA" : "#9CA3AF",
              transition: "all 0.2s", letterSpacing: "0.04em",
            }}>{f.label}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 40 }}>
          {Object.entries(catLabels).map(([cat, label]) => {
            const catSkills = filteredSkills.filter(s => s.category === cat);
            if (!catSkills.length) return null;
            return (
              <div key={cat}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: catColors[cat] }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: catColors[cat], textTransform: "uppercase" }}>{label}</span>
                </div>
                {catSkills.map((s, i) => <SkillBar key={s.name} name={s.name} level={s.level} color={catColors[s.category]} delay={i * 80} />)}
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "80px 8%", position: "relative", zIndex: 1 }}>
        <SectionLabel label="Projects" />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 700, margin: "8px 0 36px", letterSpacing: "-0.02em" }}>Things I've Built</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" style={{ padding: "80px 8%", position: "relative", zIndex: 1 }}>
        <SectionLabel label="Experience" />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 700, margin: "8px 0 48px", letterSpacing: "-0.02em" }}>Education & Internships</h2>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #7C3AED44, transparent)" }} />
          {timeline.map((item, i) => <TimelineItem key={i} item={item} idx={i} />)}
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: "0 8% 80px", position: "relative", zIndex: 1 }}>
        <SectionLabel label="Certifications" />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 700, margin: "8px 0 28px", letterSpacing: "-0.02em" }}>Certified In</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Ambient Agents with LangGraph", org: "LangChain Academy", year: "2026" },
            { name: "LangGraph Essentials — Python", org: "LangChain Academy", year: "2026" },
            { name: "Intro to LangGraph — Python", org: "LangChain Academy", year: "2026" },
            { name: "Python Crash Course", org: "Udemy", year: "2022" },
            { name: "Digital Skills: AI", org: "Accenture", year: "2022" },
          ].map(c => (
            <div key={c.name} style={{ padding: "12px 18px", borderRadius: 10, border: "1px solid rgba(124,58,237,0.25)", background: "rgba(124,58,237,0.07)" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#E9D5FF", marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#7C3AED", fontFamily: "'IBM Plex Mono', monospace" }}>{c.org} · {c.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "80px 8% 100px", position: "relative", zIndex: 1 }}>
        <SectionLabel label="Contact" />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 700, margin: "8px 0 12px", letterSpacing: "-0.02em" }}>Let's Build Together</h2>
        <p style={{ fontSize: 15, color: "#9CA3AF", marginBottom: 40, maxWidth: 480, lineHeight: 1.7 }}>
          I'm actively looking for AI/ML engineering roles. Whether it's LangGraph agents, LLM pipelines, or full-stack AI products — let's connect.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            { label: "kareenalalwani123@gmail.com", icon: "📧", href: "mailto:kareenalalwani123@gmail.com" },
            { label: "linkedin.com/in/karina-lalwani", icon: "💼", href: "https://www.linkedin.com/in/karina-lalwani-803b11271" },
            { label: "github.com/karinalalwani123", icon: "💻", href: "https://github.com/karinalalwani123" },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 20px",
              borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none",
              color: "#D1D5DB", fontSize: 13, background: "rgba(255,255,255,0.02)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; e.currentTarget.style.color = "#A78BFA"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#D1D5DB"; }}>
              <span>{c.icon}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>{c.label}</span>
            </a>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "24px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#4B5563", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", position: "relative", zIndex: 1 }}>
        Built with React · Vite · 2025
      </footer>
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: 18, height: 1, background: "#7C3AED" }} />
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#7C3AED", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>{label}</span>
    </div>
  );
}

function Terminal() {
  const lines = [
    { text: "$ python zentra_ai.py", color: "#A78BFA", delay: 0 },
    { text: "✓ LangGraph StateGraph initialized", color: "#10B981", delay: 600 },
    { text: "✓ Groq LLaMA 3.3 70B connected", color: "#10B981", delay: 1200 },
    { text: "✓ Gmail OAuth2 authenticated", color: "#10B981", delay: 1800 },
    { text: "✓ Firebase Firestore linked", color: "#10B981", delay: 2400 },
    { text: "→ Loading 14 workflow modules...", color: "#38BDF8", delay: 3000 },
    { text: "→ RAG pipeline ready", color: "#38BDF8", delay: 3600 },
    { text: "→ Multi-agent orchestration active", color: "#38BDF8", delay: 4200 },
    { text: "✓ Deployed on Vercel + Render", color: "#10B981", delay: 4800 },
    { text: "$ _", color: "#A78BFA", delay: 5400 },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => setVisibleCount(i + 1), line.delay);
    });
  }, []);

  return (
    <div style={{ background: "#0D0D14", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 14, overflow: "hidden", boxShadow: "0 0 60px rgba(124,58,237,0.1)" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: "#6B7280", fontFamily: "'IBM Plex Mono', monospace" }}>karina@ai-engineer ~ zentra</span>
      </div>
      <div style={{ padding: "20px 24px", minHeight: 320, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, lineHeight: 2 }}>
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} style={{ color: line.color, animation: "fadeIn 0.3s ease" }}>{line.text}</div>
        ))}
        {visibleCount < lines.length && <div style={{ color: "#A78BFA" }}>▋</div>}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

function TimelineItem({ item, idx }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      display: "flex", gap: 24, marginBottom: 40, position: "relative",
      opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)",
      transition: `opacity 0.6s ease ${idx * 120}ms, transform 0.6s ease ${idx * 120}ms`,
    }}>
      <div style={{ position: "absolute", left: -28, top: 4, width: 16, height: 16, borderRadius: "50%", background: "#0F0F14", border: "2px solid #7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C3AED" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>{item.icon}</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "rgba(124,58,237,0.15)", color: "#A78BFA", fontFamily: "'IBM Plex Mono', monospace" }}>{item.year}</span>
            </div>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>{item.place}</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "6px 0 0 34px", lineHeight: 1.6 }}>{item.note}</p>
      </div>
    </div>
  );
}