"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiCheckCircle,
  FiFileText,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiStar,
} from "react-icons/fi";

type PortfolioItem = {
  project: string;
  category: "ICS/OT" | "Network" | "Governance" | "Labs";
  summary: string;
  result: string;
};

type SubmitState = "idle" | "sending" | "sent" | "error";

const portfolioItems: PortfolioItem[] = [
  {
    project: "ICS/OT Security Baseline Review",
    category: "ICS/OT",
    summary: "Assisted with baseline reviews for industrial and operational environments, documenting critical assets, exposures, and priority remediation actions.",
    result: "Improved visibility of high-impact OT risks",
  },
  {
    project: "Network Security Monitoring Support",
    category: "Network",
    summary: "Supported monitoring and investigation workflows, escalating suspicious activity and improving analyst handover quality.",
    result: "Faster triage and clearer escalation notes",
  },
  {
    project: "Vulnerability & Patch Tracking Workflow",
    category: "Governance",
    summary: "Contributed to vulnerability review and remediation tracking, helping prioritize fixes by severity and operational impact.",
    result: "More consistent remediation follow-through",
  },
  {
    project: "Security Awareness & Phishing Guidance",
    category: "Governance",
    summary: "Produced practical security guidance for users, translating technical risks into actionable behavior changes.",
    result: "Improved awareness of common attack vectors",
  },
  {
    project: "Home Lab: Detection & Hardening Exercises",
    category: "Labs",
    summary: "Built a personal cyber lab to practice network hardening, log analysis, and response scenarios aligned with Security+ objectives.",
    result: "Stronger practical blue-team capability",
  },
];

const testimonials = [
  {
    name: "Team Feedback",
    role: "Tekgem UK LTD",
    quote: "Tom consistently approaches security tasks with precision, strong documentation, and a clear focus on reducing operational risk.",
  },
  {
    name: "Mentor Perspective",
    role: "Cyber Security Training",
    quote: "A dependable apprentice with growing ICS/OT awareness, solid fundamentals, and a professional approach to continuous learning.",
  },
];

const templates = [
  {
    title: "ICS/OT Asset Risk Checklist",
    description: "Checklist for identifying critical assets, trust boundaries, and immediate control priorities in operational environments.",
    format: "Template: Assessment Sheet",
  },
  {
    title: "Alert Triage Notes Template",
    description: "Repeatable format for documenting evidence, severity, analyst decisions, and escalation actions.",
    format: "Template: Incident Notes",
  },
  {
    title: "Security Posture Update Snapshot",
    description: "Weekly summary for open vulnerabilities, remediation status, and hardening priorities.",
    format: "Template: Weekly Report",
  },
];

const examples = [
  {
    title: "OT Network Segmentation Review",
    sample: "Practical review of control zones, boundary policies, and access pathways to minimize unnecessary exposure.",
  },
  {
    title: "Vulnerability Prioritization Summary",
    sample: "Prioritized remediation list using severity, exploitability, and operational impact for efficient patch planning.",
  },
  {
    title: "Security Awareness Brief",
    sample: "Concise user guidance covering phishing indicators, credential hygiene, and escalation steps.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const categories: Array<PortfolioItem["category"] | "All"> = ["All", "ICS/OT", "Network", "Governance", "Labs"];

export function PortfolioSite() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [contactStatus, setContactStatus] = useState<SubmitState>("idle");
  const [newsletterStatus, setNewsletterStatus] = useState<SubmitState>("idle");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return portfolioItems;
    }

    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      event.currentTarget.reset();
      setContactStatus("sent");
    } catch {
      setContactStatus("error");
    }
  }

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("newsletterEmail") ?? ""),
    };

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Newsletter request failed");
      }

      event.currentTarget.reset();
      setNewsletterStatus("sent");
    } catch {
      setNewsletterStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#040b12] text-slate-100">
      <section className="border-b border-cyan-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_40%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.4 }}
            className="mb-10 flex items-center justify-between"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Tom Baptist · SOC / SIEM OT Console</p>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/tom-b-a81271132" target="_blank" rel="noopener noreferrer" className="text-xl text-slate-200 transition hover:text-cyan-300">
              <FiLinkedin />
            </a>
          </motion.nav>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-7 shadow-[0_0_32px_rgba(34,211,238,0.08)]">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                <FiStar /> SOC Monitoring | SIEM Detection | OT Threat Hunting
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Operational technology defence through a SOC / SIEM mindset.</h1>
              <p className="mt-5 max-w-2xl text-slate-300">
                Apprentice Cyber Security Engineer at Tekgem UK LTD, focused on OT-aware detection, triage quality, and practical incident response support across industrial and enterprise environments.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#portfolio" className="rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/30">
                  View Detection Cases
                </a>
                <a href="#contact" className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20">
                  Open Contact Channel
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["SIEM Stack", "Detection + Triage Workflows"],
                ["Coverage", "ICS / OT + Network Security"],
                ["Cert Status", "CompTIA Security+ Active"],
                ["Ops Priority", "Availability + Safety + Resilience"],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + index * 0.07 }}
                  className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-4"
                >
                  <p className="text-xs uppercase tracking-wide text-cyan-300">{label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-100">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[300px_1fr] lg:px-12">
        <motion.aside initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45 }} className="h-fit rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-5 lg:sticky lg:top-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-300">SOC Watchlist</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 font-mono">OT-ZONE-01: unauthorized route attempt</li>
            <li className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 font-mono">FW-EDGE: policy drift detected</li>
            <li className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 font-mono">SIEM: high-severity auth anomaly</li>
            <li className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 font-mono">PATCH-TRACK: overdue critical CVE</li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-300">SOC Metrics</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-2 text-slate-200">MTTA trend ↓</div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-2 text-slate-200">Security+ active</div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-2 text-slate-200">Triage notes standardized</div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-2 text-slate-200">UK SOC-ready</div>
          </div>
        </motion.aside>

        <div className="space-y-10">
          <section id="portfolio">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
              <h2 className="text-3xl font-semibold tracking-tight">Detection & Response Cases</h2>
              <p className="mt-2 text-slate-300">Filter by domain to view SOC-style detection, triage, and OT risk-reduction outcomes.</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      activeCategory === category
                        ? "border border-cyan-400/40 bg-cyan-500/20 text-cyan-100"
                        : "border border-slate-700 bg-slate-900/60 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {filteredItems.map((item, index) => (
                  <motion.article
                    key={item.project}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">{item.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-100">{item.project}</h3>
                    <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
                    <p className="mt-4 text-sm font-medium text-emerald-300">Outcome: {item.result}</p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </section>

          <section>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5"
            >
              <h2 className="text-2xl font-semibold tracking-tight">SIEM Telemetry Snapshot</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  ["high", "OT anomaly correlation", "PLC auth pattern deviates from baseline"],
                  ["medium", "Firewall drift", "Rule-set changed outside planned window"],
                  ["low", "Endpoint hygiene", "Patch cycle completed with minor exceptions"],
                ].map(([severity, signal, note]) => (
                  <article key={signal} className="rounded-xl border border-slate-700 bg-slate-950/40 p-4">
                    <p className={`text-xs font-semibold uppercase tracking-wide ${
                      severity === "high" ? "text-rose-300" : severity === "medium" ? "text-amber-300" : "text-emerald-300"
                    }`}>
                      {severity}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-100">{signal}</p>
                    <p className="mt-1 text-sm text-slate-300">{note}</p>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45 }} className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5">
              <h2 className="text-2xl font-semibold tracking-tight">Playbooks & Runbooks</h2>
              <div className="mt-4 space-y-3">
                {templates.map((template, index) => (
                  <motion.article
                    key={template.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="rounded-xl border border-slate-700 bg-slate-950/40 p-4"
                  >
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                      <FiFileText /> {template.format}
                    </p>
                    <h3 className="mt-1 text-base font-semibold">{template.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{template.description}</p>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45, delay: 0.05 }} className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5">
              <h2 className="text-2xl font-semibold tracking-tight">SIEM Detection Samples</h2>
              <div className="mt-4 space-y-3">
                {examples.map((example) => (
                  <article key={example.title} className="rounded-xl border border-slate-700 bg-slate-950/40 p-4">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                      <FiLayers /> {example.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">{example.sample}</p>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>

          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45 }} className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-6">
              <h2 className="text-2xl font-semibold tracking-tight">SOC Workflow Loop</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  {
                    icon: FiCheckCircle,
                    title: "Ingest & Baseline",
                    text: "Ingest telemetry, map OT assets, and establish normal operational behavior.",
                  },
                  {
                    icon: FiStar,
                    title: "Triage & Investigate",
                    text: "Correlate alerts, validate signal quality, and document investigation paths.",
                  },
                  {
                    icon: FiBarChart2,
                    title: "Contain & Improve",
                    text: "Escalate, contain, and feed findings back into stronger detection coverage.",
                  },
                ].map((step) => (
                  <article key={step.title} className="rounded-xl border border-slate-700 bg-slate-950/40 p-4">
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                      <step.icon /> {step.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">{step.text}</p>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>

          <section>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
              <h2 className="text-2xl font-semibold tracking-tight">Analyst Notes</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                  <motion.blockquote
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5"
                  >
                    <p className="text-sm text-slate-200">"{testimonial.quote}"</p>
                    <footer className="mt-3 text-sm font-medium text-slate-300">
                      {testimonial.name} · {testimonial.role}
                    </footer>
                  </motion.blockquote>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </section>

      <section id="contact" className="border-t border-cyan-500/20 bg-slate-950/40">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
              <h2 className="text-3xl font-semibold tracking-tight">Open to SOC / OT Opportunities</h2>
              <p className="mt-3 max-w-xl text-slate-300">
                Open to SOC, SIEM, and OT security roles where detection engineering, triage discipline, and operational resilience are core priorities.
              </p>
              <a href="mailto:tom@jogn.co.uk" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:opacity-80">
                <FiMail /> tom@jogn.co.uk
              </a>
            </motion.div>

            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.45, delay: 0.05 }}
              onSubmit={handleContactSubmit}
              className="space-y-3 rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5"
            >
              <input name="name" required placeholder="Name" className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400/50" />
              <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400/50" />
              <input name="projectType" required placeholder="Role / Project Type" className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400/50" />
              <textarea name="message" required placeholder="Tell me about the role, project, or security challenge" rows={4} className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400/50" />
              <button type="submit" disabled={contactStatus === "sending"} className="w-full rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60">
                {contactStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
              {contactStatus === "sent" && <p className="text-sm text-emerald-300">Thank you — I'll be in touch.</p>}
              {contactStatus === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
            </motion.form>
          </div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.45, delay: 0.1 }}
            onSubmit={handleNewsletterSubmit}
            className="mt-8 flex flex-col gap-3 rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5 sm:flex-row"
          >
            <input
              name="newsletterEmail"
              type="email"
              required
              placeholder="Enter email for SOC and SIEM notes"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400/50"
            />
            <button
              type="submit"
              disabled={newsletterStatus === "sending"}
              className="rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-5 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {newsletterStatus === "sending" ? "Subscribing..." : "Subscribe"}
            </button>
            {newsletterStatus === "sent" && <p className="self-center text-sm text-emerald-300">Welcome.</p>}
            {newsletterStatus === "error" && <p className="self-center text-sm text-red-600">Please try again.</p>}
          </motion.form>
        </div>
      </section>
    </main>
  );
}
