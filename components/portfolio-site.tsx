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
    summary: "Assisted with baseline reviews for industrial and operational environments, documenting assets, exposures, and high-priority remediation actions.",
    result: "Improved visibility of critical OT assets and risks",
  },
  {
    project: "Network Security Monitoring Support",
    category: "Network",
    summary: "Supported monitoring and investigation workflows across network security tooling, escalating suspicious patterns and improving analyst handover quality.",
    result: "Faster triage with clearer investigation notes",
  },
  {
    project: "Vulnerability & Patch Tracking Workflow",
    category: "Governance",
    summary: "Contributed to vulnerability review and remediation tracking, helping prioritize issues by severity and business impact.",
    result: "More consistent patch tracking and follow-through",
  },
  {
    project: "Security Awareness & Phishing Guidance",
    category: "Governance",
    summary: "Helped create practical guidance for user awareness and secure behavior, translating technical risks into clear internal messaging.",
    result: "Better end-user understanding of common threats",
  },
  {
    project: "Home Lab: Detection & Hardening Exercises",
    category: "Labs",
    summary: "Built a personal lab to practice network hardening, log analysis, and incident response scenarios aligned with Security+ objectives.",
    result: "Stronger practical blue-team foundations",
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
    description: "Structured checklist for identifying critical assets, trust boundaries, and immediate security controls in operational environments.",
    format: "Template: Assessment Sheet",
  },
  {
    title: "Alert Triage Notes Template",
    description: "Repeatable format for documenting investigations, evidence points, severity, and escalation actions for security events.",
    format: "Template: Incident Notes",
  },
  {
    title: "Security Posture Update Snapshot",
    description: "Simple internal report format for open vulnerabilities, remediation status, and upcoming hardening priorities.",
    format: "Template: Weekly Report",
  },
];

const examples = [
  {
    title: "OT Network Segmentation Review",
    sample: "Practical review of control network zones, firewall rules, and access pathways to reduce unnecessary exposure.",
  },
  {
    title: "Vulnerability Prioritization Summary",
    sample: "Prioritized remediation list based on CVSS, exploitability, and operational impact for clearer patching decisions.",
  },
  {
    title: "Security Awareness Brief",
    sample: "Concise user guidance covering phishing indicators, password hygiene, and incident reporting pathways.",
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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.45 }}
          className="mb-16 flex flex-wrap items-center justify-between gap-6"
        >
          <p className="text-lg font-semibold tracking-tight">Tom Baptist · Apprentice Cyber Security Engineer</p>
          <div className="flex items-center gap-4 text-xl">
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/tom-b-a81271132" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70">
              <FiLinkedin />
            </a>
          </div>
        </motion.nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid gap-10 lg:grid-cols-[1.3fr_1fr]"
        >
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-1 text-sm text-amber-700">
              <FiStar /> ICS & OT Security Focus
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Securing critical systems with practical, detail-driven cyber defence.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-700 sm:text-lg">
              I am an Apprentice Cyber Security Engineer at Tekgem UK LTD, focused on Industrial Control Systems (ICS) and Operational Technology (OT) security, network defence, and continuous improvement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="rounded-full bg-indigo-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-800">
                View Projects
              </a>
              <a href="#contact" className="rounded-full border border-amber-300 bg-white px-6 py-3 text-sm font-medium text-amber-800 transition hover:bg-amber-50">
                Contact Me
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["1+", "Years in Cyber Apprenticeship"],
              ["CompTIA", "Security+ Certified"],
              ["19", "Core Security Skills"],
              ["12", "Search Appearances (7 Days)"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                className="rounded-2xl border border-white bg-white/90 p-5 shadow-sm"
              >
                <p className="text-2xl font-semibold text-indigo-700">{value}</p>
                <p className="mt-1 text-sm text-slate-600">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Portfolio Highlights</h2>
          <p className="mt-3 text-slate-700">Selected cyber security work focused on ICS/OT resilience, network defence, governance, and practical lab-based development.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-indigo-700 text-white"
                    : "border border-indigo-200 bg-white text-indigo-800 hover:bg-indigo-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.project}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-2xl border border-white bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-amber-700">{item.category}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.project}</h3>
                <p className="mt-3 text-sm text-slate-700">{item.summary}</p>
                <p className="mt-5 text-sm font-medium text-indigo-700">Result: {item.result}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Security Frameworks</h2>
          <div className="mt-6 space-y-4">
            {templates.map((template, index) => (
              <motion.article
                key={template.title}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-2xl border border-white bg-white p-5 shadow-sm"
              >
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  <FiFileText /> {template.format}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{template.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{template.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} transition={{ duration: 0.45, delay: 0.05 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Use Cases</h2>
          <div className="mt-6 space-y-3">
            {examples.map((example) => (
              <article key={example.title} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  <FiLayers /> {example.title}
                </p>
                <p className="mt-2 text-base text-slate-800">{example.sample}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-10 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: 0.45 }}
          className="rounded-3xl bg-indigo-900 p-7 text-indigo-50"
        >
          <h2 className="text-2xl font-semibold tracking-tight">How I Approach Security</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                icon: FiCheckCircle,
                title: "Assess & Baseline",
                text: "Identify critical assets, access pathways, and high-risk weaknesses across IT and OT environments.",
              },
              {
                icon: FiStar,
                title: "Harden & Document",
                text: "Apply practical controls, improve configurations, and maintain clear documentation for repeatable security operations.",
              },
              {
                icon: FiBarChart2,
                title: "Monitor & Improve",
                text: "Track findings, triage alerts, and feed lessons learned into stronger prevention and response workflows.",
              },
            ].map((step) => (
              <article key={step.title} className="rounded-2xl border border-indigo-700 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                  <step.icon /> {step.title}
                </p>
                <p className="mt-2 text-sm text-indigo-100">{step.text}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Professional Feedback</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={testimonial.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-2xl border border-white bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-slate-800">"{testimonial.quote}"</p>
                <footer className="mt-4 text-sm font-medium text-slate-700">
                  {testimonial.name} · {testimonial.role}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
            <h2 className="text-3xl font-semibold tracking-tight">Open to Cyber Opportunities</h2>
            <p className="mt-3 max-w-xl text-slate-700">
              I am open to cyber security opportunities and collaborations, especially roles involving ICS/OT security, network defence, and operational resilience.
            </p>
            <a href="mailto:tom@jogn.co.uk" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-800 hover:opacity-80">
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
            className="space-y-3 rounded-2xl border border-white bg-white p-5 shadow-sm"
          >
            <input name="name" required placeholder="Name" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
            <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
            <input name="projectType" required placeholder="Role / Project Type" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
            <textarea name="message" required placeholder="Tell me about the role, project, or security challenge" rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
            <button type="submit" disabled={contactStatus === "sending"} className="w-full rounded-full bg-indigo-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60">
              {contactStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
            {contactStatus === "sent" && <p className="text-sm text-slate-700">Thank you — I'll be in touch.</p>}
            {contactStatus === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
          </motion.form>
        </div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.45, delay: 0.1 }}
          onSubmit={handleNewsletterSubmit}
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-white bg-white p-5 shadow-sm sm:flex-row"
        >
          <input
            name="newsletterEmail"
            type="email"
            required
            placeholder="Enter email for cyber security notes and updates"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            disabled={newsletterStatus === "sending"}
            className="rounded-full bg-amber-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {newsletterStatus === "sending" ? "Subscribing..." : "Subscribe"}
          </button>
          {newsletterStatus === "sent" && <p className="self-center text-sm text-slate-700">Welcome.</p>}
          {newsletterStatus === "error" && <p className="self-center text-sm text-red-600">Please try again.</p>}
        </motion.form>
      </section>
    </main>
  );
}
