"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiCheckCircle,
  FiFileText,
  FiInstagram,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiStar,
  FiTwitter,
} from "react-icons/fi";

type PortfolioItem = {
  project: string;
  category: "Campaign" | "Strategy" | "Content" | "Events";
  summary: string;
  result: string;
};

type SubmitState = "idle" | "sending" | "sent" | "error";

const portfolioItems: PortfolioItem[] = [
  {
    project: "Durham Fringe Festival Digital Rebrand",
    category: "Strategy",
    summary: "Led comprehensive digital communications strategy for Durham's flagship arts festival, establishing consistent brand voice across all platforms.",
    result: "40% increase in digital reach across channels",
  },
  {
    project: "Auckland Project Heritage Marketing Campaign",
    category: "Campaign",
    summary: "Developed integrated marketing strategy for major cultural heritage organization, positioning contemporary art within historic narrative.",
    result: "+58% visitor acquisition YoY",
  },
  {
    project: "Cathedral Schools Foundation Communications",
    category: "Content",
    summary: "Built editorial content strategy and managed digital communications for networked independent schools and cathedral foundation.",
    result: "120+ stories published; 65% email open rate",
  },
  {
    project: "Cultural Events Social Management",
    category: "Events",
    summary: "Managed full-cycle marketing for arts events, from audience research through post-event analysis and reporting.",
    result: "Avg. 45% ticket conversion from digital",
  },
  {
    project: "Digital Communications Framework",
    category: "Strategy",
    summary: "Designed reusable digital marketing systems, brand guidelines, and content frameworks for scaling cultural organization communications.",
    result: "35% faster campaign deployment",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Director, The Auckland Project",
    quote: "Neave brought strategic clarity and creative vision to our marketing. Her cultural sensitivity and data literacy are exceptional.",
  },
  {
    name: "James Turner",
    role: "Festival Director, Durham Fringe",
    quote: "Transformative work on our digital presence. Neave understands how to tell stories that resonate with arts audiences.",
  },
];

const templates = [
  {
    title: "Festival Campaign Brief",
    description: "Comprehensive framework for planning integrated cultural event marketing with audience personas, messaging hierarchy, and channel strategy.",
    format: "Reference: Strategy Doc",
  },
  {
    title: "Heritage Content Editorial Calendar",
    description: "12-month editorial planning doc balancing institutional announcements, storytelling, audience engagement, and seasonal moments.",
    format: "Template: Sheets/Notion",
  },
  {
    title: "Stakeholder Communications Report",
    description: "Executive-level monthly reporting covering reach metrics, audience sentiment analysis, and strategic recommendations.",
    format: "Template: Slides",
  },
];

const examples = [
  {
    title: "Arts Festival Campaign",
    sample: "Multi-channel campaign positioning independent artists, with audience journey from awareness through ticket conversion.",
  },
  {
    title: "Heritage Site Digital Story",
    sample: "Editorial narrative combining archival research, contemporary art, and visitor experience positioning across social and email.",
  },
  {
    title: "Educational Institution Announcement",
    sample: "Coordinated communications brief for student, parent, and alumni audiences with tailored messaging and channel strategy.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const categories: Array<PortfolioItem["category"] | "All"> = ["All", "Campaign", "Strategy", "Content", "Events"];

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
          <p className="text-lg font-semibold tracking-tight">Neave Heaton · Senior Marketing Officer</p>
          <div className="flex items-center gap-4 text-xl">
            <a aria-label="LinkedIn" href="https://linkedin.com/in/neave-heaton-3289a21b9/" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70">
              <FiLinkedin />
            </a>
            <a aria-label="Twitter" href="#" className="transition hover:opacity-70">
              <FiTwitter />
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
              <FiStar /> Arts & Heritage Marketing
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Cultural narratives, strategic marketing, meaningful audiences.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-700 sm:text-lg">
              I am a Senior Marketing Officer specializing in arts, heritage, and educational institutions. I develop integrated marketing strategies that authentically connect communities with cultural work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="rounded-full bg-indigo-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-800">
                View Work
              </a>
              <a href="#contact" className="rounded-full border border-amber-300 bg-white px-6 py-3 text-sm font-medium text-amber-800 transition hover:bg-amber-50">
                Start a Conversation
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["3", "Major Arts Organizations"],
              ["50+", "Integrated Campaigns"],
              ["6 Years", "Cultural Marketing"],
              ["First-Class", "Honours Degree"],
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
          <p className="mt-3 text-slate-700">Selected work across cultural marketing strategy, campaign delivery, content, and events.</p>

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
          <h2 className="text-3xl font-semibold tracking-tight">Strategic Frameworks</h2>
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
          <h2 className="text-3xl font-semibold tracking-tight">Case Examples</h2>
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
          <h2 className="text-2xl font-semibold tracking-tight">How I Approach Marketing</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                icon: FiCheckCircle,
                title: "Research & Insight",
                text: "Deep audience analysis, competitive positioning, and stakeholder interviews to inform strategy.",
              },
              {
                icon: FiStar,
                title: "Strategic Planning",
                text: "Integrated campaign frameworks, messaging architecture, and channel strategy tailored to audience segments.",
              },
              {
                icon: FiBarChart2,
                title: "Measure & Learn",
                text: "Continuous performance tracking, quarterly strategic reviews, and data-informed optimization.",
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
          <h2 className="text-3xl font-semibold tracking-tight">Recommendations</h2>
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
            <h2 className="text-3xl font-semibold tracking-tight">Let's Work Together</h2>
            <p className="mt-3 max-w-xl text-slate-700">
              I'm always interested in culturally-focused organizations looking to develop integrated marketing strategies. Let me know your vision and timeline.
            </p>
            <a href="mailto:neave.heaton@theaucklandproject.com" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-800 hover:opacity-80">
              <FiMail /> neave.heaton@theaucklandproject.com
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
            <input name="projectType" required placeholder="Organization Type" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
            <textarea name="message" required placeholder="Tell me about your organization and goals" rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
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
            placeholder="Enter email for cultural marketing insights"
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
