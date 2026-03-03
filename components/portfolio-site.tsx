"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiInstagram, FiLinkedin, FiMail, FiPlayCircle, FiTwitter } from "react-icons/fi";

type PortfolioItem = {
  title: string;
  category: "Campaign" | "Social" | "Video" | "Blog";
  result: string;
};

type SubmitState = "idle" | "sending" | "sent" | "error";

const portfolioItems: PortfolioItem[] = [
  { title: "Spring Beauty Launch", category: "Campaign", result: "4.2x ROAS" },
  { title: "Fashion Reel Series", category: "Social", result: "+180% engagement" },
  { title: "Product Story Ad", category: "Video", result: "2.1M views" },
  { title: "Growth Strategy Breakdown", category: "Blog", result: "Top newsletter post" },
  { title: "Holiday Conversion Push", category: "Campaign", result: "38% CVR lift" },
  { title: "Creator UGC Sprint", category: "Social", result: "9.4% CTR" },
];

const testimonials = [
  {
    name: "Nia R.",
    role: "Brand Manager",
    quote: "The campaign storytelling and short-form strategy transformed our quarterly pipeline.",
  },
  {
    name: "Michael T.",
    role: "Startup Founder",
    quote: "Clear creative direction, fast iteration, and measurable growth in every channel we launched.",
  },
];

const insights = [
  "How to build a social-first product launch funnel",
  "3 paid media creative tests every team should run monthly",
  "Turning video watch-time into qualified leads",
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
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.45 }}
          className="mb-16 flex flex-wrap items-center justify-between gap-6"
        >
          <p className="text-lg font-semibold tracking-tight">Media Marketer Portfolio</p>
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
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-1 text-sm">
              <FiPlayCircle /> Creative Growth Strategy
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Modern social and web media marketing, built to convert.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-foreground/80 sm:text-lg">
              I help brands scale with high-impact campaigns, social content systems, and performance-led storytelling.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90">
                View Projects
              </a>
              <a href="#contact" className="rounded-full border border-foreground/30 px-6 py-3 text-sm font-medium transition hover:bg-foreground/5">
                Start a Project
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["48+", "Campaigns"],
              ["6.8M", "Ad Impressions"],
              ["92%", "Client Retention"],
              ["4x", "Average ROAS"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                className="rounded-2xl border border-foreground/15 p-5"
              >
                <p className="text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-foreground/70">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Portfolio Highlights</h2>
          <p className="mt-3 text-foreground/75">Filter by service area and explore recent campaign outcomes.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "border border-foreground/30 text-foreground hover:bg-foreground/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-2xl border border-foreground/15 p-5"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/65">{item.category}</p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-5 text-sm text-foreground/80">Result: {item.result}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Client Testimonials</h2>
          <div className="mt-6 space-y-4">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={testimonial.name}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-2xl border border-foreground/15 p-5"
              >
                <p className="text-sm text-foreground/85">“{testimonial.quote}”</p>
                <footer className="mt-4 text-sm font-medium">
                  {testimonial.name} · <span className="text-foreground/70">{testimonial.role}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp} transition={{ duration: 0.45, delay: 0.05 }}>
          <h2 className="text-3xl font-semibold tracking-tight">Latest Insights</h2>
          <div className="mt-6 space-y-3">
            {insights.map((post) => (
              <article key={post} className="rounded-2xl border border-foreground/15 p-5">
                <p className="text-base font-medium">{post}</p>
                <p className="mt-2 text-sm text-foreground/70">Read in the blog section.</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} transition={{ duration: 0.45 }}>
            <h2 className="text-3xl font-semibold tracking-tight">Let’s Build Your Next Growth Campaign</h2>
            <p className="mt-3 max-w-xl text-foreground/80">
              Share your goals, timeline, and channels. I’ll send a tailored media strategy and creative direction.
            </p>
            <a href="mailto:hello@portfolio.dev" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:opacity-80">
              <FiMail /> hello@portfolio.dev
            </a>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.45, delay: 0.05 }}
            onSubmit={handleContactSubmit}
            className="space-y-3 rounded-2xl border border-foreground/15 p-5"
          >
            <input name="name" required placeholder="Name" className="w-full rounded-xl border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/25" />
            <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/25" />
            <input name="projectType" required placeholder="Project Type" className="w-full rounded-xl border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/25" />
            <textarea name="message" required placeholder="Tell me about your goals" rows={4} className="w-full rounded-xl border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/25" />
            <button type="submit" disabled={contactStatus === "sending"} className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
              {contactStatus === "sending" ? "Sending..." : "Send Inquiry"}
            </button>
            {contactStatus === "sent" && <p className="text-sm text-foreground/75">Thanks — your inquiry has been received.</p>}
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
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-foreground/15 p-5 sm:flex-row"
        >
          <input
            name="newsletterEmail"
            type="email"
            required
            placeholder="Enter email for newsletter updates"
            className="w-full rounded-xl border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/25"
          />
          <button
            type="submit"
            disabled={newsletterStatus === "sending"}
            className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {newsletterStatus === "sending" ? "Joining..." : "Join Newsletter"}
          </button>
          {newsletterStatus === "sent" && <p className="self-center text-sm text-foreground/75">You’re in.</p>}
          {newsletterStatus === "error" && <p className="self-center text-sm text-red-600">Please try again.</p>}
        </motion.form>
      </section>
    </main>
  );
}
