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
  category: "Campaign" | "Social" | "Video" | "Blog";
  summary: string;
  result: string;
};

type SubmitState = "idle" | "sending" | "sent" | "error";

const portfolioItems: PortfolioItem[] = [
  {
    project: "British Heritage Seasonal Campaigns",
    category: "Campaign",
    summary: "Planned and ran multi-phase campaigns for British heritage sites across peak visitor periods.",
    result: "+44% event attendance uplift",
  },
  {
    project: "Heritage & Schools Social Management",
    category: "Social",
    summary: "Managed Instagram and Facebook channels for heritage organisations and schools with weekly publishing calendars.",
    result: "+61% engagement rate growth",
  },
  {
    project: "School Admissions Awareness Push",
    category: "Campaign",
    summary: "Campaign strategy and paid/organic support focused on admissions and open-day awareness.",
    result: "+37% enquiry submissions",
  },
  {
    project: "Heritage Reels Video Production",
    category: "Video",
    summary: "Created long-form and short-form video content, including on-site reels for heritage storytelling.",
    result: "1.9M total reel views",
  },
  {
    project: "Insights & Reporting Content",
    category: "Blog",
    summary: "Produced analytics-led reports and content performance summaries for leadership and stakeholders.",
    result: "Reporting time cut by 35%",
  },
];

const testimonials = [
  {
    name: "Maya C.",
    role: "E-commerce Manager",
    quote: "The content strategy was clean, creative, and performance-led. Every week had measurable wins.",
  },
  {
    name: "Daniel R.",
    role: "Startup Founder",
    quote: "From concept to execution, the campaign system made our social channels finally feel premium and consistent.",
  },
];

const templates = [
  {
    title: "Monthly Content Calendar",
    description: "A repeatable planning framework for campaigns, posts, and community moments.",
    format: "Template: Notion / Sheets",
  },
  {
    title: "Campaign Brief Template",
    description: "A creative brief structure covering goals, audience, hooks, and channel outputs.",
    format: "Template: Brief Doc",
  },
  {
    title: "Performance Report Deck",
    description: "Weekly reporting format with KPI narrative, wins, losses, and next actions.",
    format: "Template: Slides",
  },
];

const examples = [
  {
    title: "Heritage Event Reel",
    sample: "Fast-cut location shots, voiceover context, and CTA to drive weekend visits.",
  },
  {
    title: "School Admissions Campaign Post",
    sample: "Parent-focused carousel with key dates, testimonials, and direct enquiry CTA.",
  },
  {
    title: "Monthly Analytics Snapshot",
    sample: "Instagram + Facebook KPI breakdown highlighting reach, saves, CTR, and next-month actions.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const categories: Array<PortfolioItem["category"] | "All"> = ["All", "Campaign", "Social", "Video", "Blog"];

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
    <main className="min-h-screen bg-gradient-to-b from-fuchsia-50 via-cyan-50 to-white text-zinc-900">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.45 }}
          className="mb-16 flex flex-wrap items-center justify-between gap-6"
        >
          <p className="text-lg font-semibold tracking-tight">Jogn · Social Media Marketing Portfolio</p>
          <div className="flex items-center gap-4 text-xl">
            <a aria-label="Instagram" href="#" className="transition hover:opacity-70">
              <FiInstagram />
            </a>
            <a aria-label="LinkedIn" href="#" className="transition hover:opacity-70">
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
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-white px-4 py-1 text-sm text-fuchsia-700">
              <FiStar /> Social Media Marketing Officer
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Bright ideas, bold content, measurable social growth.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-zinc-700 sm:text-lg">
              I am a social media marketing officer delivering campaign strategy, channel management, and creative production for heritage organisations and schools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-fuchsia-700">
                View Projects
              </a>
              <a href="#contact" className="rounded-full border border-cyan-300 bg-white px-6 py-3 text-sm font-medium text-cyan-800 transition hover:bg-cyan-50">
                Start a Project
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["40+", "Heritage Campaigns"],
              ["120+", "School Posts / Month"],
              ["1.9M", "Reel Views"],
              ["32%", "Avg. Engagement Lift"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                className="rounded-2xl border border-white bg-white/90 p-5 shadow-sm"
              >
                <p className="text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-zinc-600">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Portfolio Highlights</h2>
          <p className="mt-3 text-zinc-700">Filter projects by channel focus and review campaign outcomes.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-cyan-600 text-white"
                    : "border border-cyan-200 bg-white text-cyan-800 hover:bg-cyan-50"
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
                <p className="text-xs font-medium uppercase tracking-wide text-fuchsia-700">{item.category}</p>
                <h3 className="mt-2 text-lg font-semibold">{item.project}</h3>
                <p className="mt-3 text-sm text-zinc-700">{item.summary}</p>
                <p className="mt-5 text-sm font-medium text-cyan-700">Result: {item.result}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Templates</h2>
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
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  <FiFileText /> {template.format}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{template.title}</h3>
                <p className="mt-2 text-sm text-zinc-700">{template.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} transition={{ duration: 0.45, delay: 0.05 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Examples</h2>
          <div className="mt-6 space-y-3">
            {examples.map((example) => (
              <article key={example.title} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-fuchsia-700">
                  <FiLayers /> {example.title}
                </p>
                <p className="mt-2 text-base text-zinc-800">{example.sample}</p>
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
          className="rounded-3xl border border-white bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Instagram Reel Showcase</h2>
          <p className="mt-2 text-sm text-zinc-700">
            Dedicated space for your heritage reels. Replace the link below with your live Instagram Reel embed URL.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-2">
            <iframe
              title="Instagram Reel Embed"
              src="https://www.instagram.com/reel/DSK8bhgDNFf/embed"
              className="h-[560px] w-full rounded-xl"
              loading="lazy"
              allowTransparency
            />
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
          className="rounded-3xl bg-zinc-900 p-7 text-zinc-100"
        >
          <h2 className="text-2xl font-semibold tracking-tight">How I Work</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                icon: FiCheckCircle,
                title: "Audit + Insight",
                text: "Baseline analysis of channels, messaging, and audience behavior.",
              },
              {
                icon: FiStar,
                title: "Creative System",
                text: "Hook libraries, visual templates, and channel-native content formats.",
              },
              {
                icon: FiBarChart2,
                title: "Measure + Optimize",
                text: "Weekly reporting loop with creative tests and KPI-driven decisions.",
              },
            ].map((step) => (
              <article key={step.title} className="rounded-2xl border border-zinc-700 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <step.icon /> {step.title}
                </p>
                <p className="mt-2 text-sm text-zinc-300">{step.text}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl font-semibold tracking-tight">What Clients Say</h2>
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
                <p className="text-sm text-zinc-800">“{testimonial.quote}”</p>
                <footer className="mt-4 text-sm font-medium text-zinc-700">
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
            <h2 className="text-3xl font-semibold tracking-tight">Let’s Build Your Next Social Win</h2>
            <p className="mt-3 max-w-xl text-zinc-700">
              Share your goals, channels, and timeline. I’ll send back a tailored campaign concept and action plan.
            </p>
            <a href="mailto:hello@jogn.co.uk" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-800 hover:opacity-80">
              <FiMail /> hello@jogn.co.uk
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
            <input name="name" required placeholder="Name" className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300" />
            <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300" />
            <input name="projectType" required placeholder="Project Type" className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300" />
            <textarea name="message" required placeholder="Tell me about your goals" rows={4} className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300" />
            <button type="submit" disabled={contactStatus === "sending"} className="w-full rounded-full bg-fuchsia-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-60">
              {contactStatus === "sending" ? "Sending..." : "Send Inquiry"}
            </button>
            {contactStatus === "sent" && <p className="text-sm text-zinc-700">Thanks — your inquiry has been received.</p>}
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
            placeholder="Enter email for templates and campaign examples"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-300"
          />
          <button
            type="submit"
            disabled={newsletterStatus === "sending"}
            className="rounded-full bg-cyan-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {newsletterStatus === "sending" ? "Joining..." : "Join Newsletter"}
          </button>
          {newsletterStatus === "sent" && <p className="self-center text-sm text-zinc-700">You’re in.</p>}
          {newsletterStatus === "error" && <p className="self-center text-sm text-red-600">Please try again.</p>}
        </motion.form>
      </section>
    </main>
  );
}
