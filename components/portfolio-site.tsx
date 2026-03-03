"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCode,
  FiCheckCircle,
  FiFolder,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiRefreshCw,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiX,
  FiUser,
  FiBriefcase,
  FiAward,
} from "react-icons/fi";

type SubmitState = "idle" | "sending" | "sent" | "error";
type NavSection = "dashboard" | "projects" | "skills" | "contact" | "about";

type Project = {
  id: string;
  title: string;
  category: "Web Development" | "Security" | "Design" | "Other";
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
};

type Skill = {
  name: string;
  level: number; // 0-100
  category: "Frontend" | "Backend" | "Security" | "Tools";
};

// PLACEHOLDER PROJECTS - Replace these with your actual projects
const projects: Project[] = [
  {
    id: "1",
    title: "📌 Your First Project",
    category: "Web Development",
    description: "Replace this with your actual project description. Explain what you built, the problem it solves, and what you learned.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    status: "planned",
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "2",
    title: "📌 Security Project",
    category: "Security",
    description: "Add a cyber security project here - could be a vulnerability assessment, security tool, penetration test, or security awareness initiative.",
    technologies: ["Python", "Nmap", "Wireshark"],
    status: "planned",
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "3",
    title: "📌 Creative Design Work",
    category: "Design",
    description: "Showcase any design work - UI/UX projects, branding, graphics, or web designs you've created.",
    technologies: ["Figma", "Adobe XD", "Photoshop"],
    status: "planned",
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "4",
    title: "📌 Backend API Project",
    category: "Web Development",
    description: "Describe a backend project - REST API, database design, authentication system, or any server-side work.",
    technologies: ["Node.js", "PostgreSQL", "Express"],
    status: "planned",
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: "5",
    title: "📌 Personal Learning Project",
    category: "Other",
    description: "Add any other projects here - automation scripts, home lab setups, certifications, or learning initiatives.",
    technologies: ["Add your tools here"],
    status: "planned",
    imageUrl: undefined,
    liveUrl: undefined,
    githubUrl: undefined,
  },
];

// YOUR SKILLS - Update these with your actual skills and proficiency levels
const skills: Skill[] = [
  { name: "HTML/CSS", level: 85, category: "Frontend" },
  { name: "JavaScript", level: 75, category: "Frontend" },
  { name: "React", level: 70, category: "Frontend" },
  { name: "TypeScript", level: 65, category: "Frontend" },
  { name: "Node.js", level: 60, category: "Backend" },
  { name: "Python", level: 65, category: "Backend" },
  { name: "Network Security", level: 70, category: "Security" },
  { name: "Cyber Security Fundamentals", level: 75, category: "Security" },
  { name: "Git/GitHub", level: 80, category: "Tools" },
  { name: "VS Code", level: 85, category: "Tools" },
];

// STATS - These will auto-update based on your projects
const getProjectStats = () => {
  const completed = projects.filter(p => p.status === "completed").length;
  const inProgress = projects.filter(p => p.status === "in-progress").length;
  const planned = projects.filter(p => p.status === "planned").length;
  return { completed, inProgress, planned, total: projects.length };
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "completed":
      return "text-emerald-400 bg-emerald-950/40 border-emerald-800";
    case "in-progress":
      return "text-amber-400 bg-amber-950/40 border-amber-800";
    case "planned":
      return "text-blue-400 bg-blue-950/40 border-blue-800";
    default:
      return "text-slate-400 bg-slate-950/40 border-slate-800";
  }
};

const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/20 text-emerald-300";
    case "in-progress":
      return "bg-amber-500/20 text-amber-300";
    case "planned":
      return "bg-blue-500/20 text-blue-300";
    default:
      return "bg-slate-500/20 text-slate-300";
  }
};

export function PortfolioSite() {
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<SubmitState>("idle");
  const stats = getProjectStats();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1b] via-[#0f1621] to-[#0a0e15] text-slate-100">
      {/* HEADER BAR */}
      <header className="border-b border-teal-900/30 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            <div>
              <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold">Portfolio</p>
              <h1 className="text-lg font-bold text-slate-100">Tom Baptist | Cyber Security Engineer</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-950/40 border border-teal-900/50">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-teal-300 font-medium">Available</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* LEFT SIDEBAR NAVIGATION */}
        <nav
          className={`fixed md:static w-56 h-[calc(100vh-57px)] bg-[#0d1117]/95 border-r border-teal-900/30 overflow-y-auto transition-transform md:translate-x-0 z-40 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-2">
            {[
              { id: "dashboard" as const, label: "Overview", icon: FiTrendingUp },
              { id: "projects" as const, label: "My Projects", icon: FiCode },
              { id: "skills" as const, label: "Skills", icon: FiAward },
              { id: "contact" as const, label: "Get in Touch", icon: FiMail },
              { id: "about" as const, label: "About Me", icon: FiUser },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveNav(id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition text-sm font-medium ${
                  activeNav === id
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                    : "text-slate-300 hover:bg-slate-800/50 border border-transparent"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          <div className="border-t border-teal-900/30 p-4 mt-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Project Stats</p>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <p className="text-xs text-slate-400">Completed</p>
                <p className="text-xl font-bold text-emerald-400">{stats.completed}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <p className="text-xs text-slate-400">In Progress</p>
                <p className="text-xl font-bold text-amber-400">{stats.inProgress}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <p className="text-xs text-slate-400">Planned</p>
                <p className="text-xl font-bold text-blue-400">{stats.planned}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-teal-900/30 p-4 mt-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Connect</p>
            <div className="space-y-2">
              <a
                href="https://www.linkedin.com/in/tom-b-a81271132"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-teal-300 hover:text-teal-200 transition"
              >
                <FiLinkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-teal-300 hover:text-teal-200 transition"
              >
                <FiGithub size={16} /> GitHub
              </a>
              <a
                href="mailto:tom@jogn.co.uk"
                className="flex items-center gap-2 text-xs text-teal-300 hover:text-teal-200 transition"
              >
                <FiMail size={16} /> Email
              </a>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-auto">
          {activeNav === "dashboard" && (
            <div className="p-4 sm:p-6 space-y-6">
              {/* WELCOME SECTION */}
              <section className="border border-teal-900/30 rounded-lg bg-gradient-to-br from-teal-950/20 to-slate-900/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-teal-500/20 border border-teal-500/40">
                    <FiUser size={32} className="text-teal-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Welcome to My Portfolio!</h2>
                    <p className="text-slate-300 text-sm mb-4">
                      👋 This is your creative portfolio dashboard. Replace this text with your introduction.
                      Tell visitors who you are, what you do, and what makes you passionate about your work.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-medium">
                        Cyber Security
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
                        Web Development
                      </span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                        Problem Solver
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* QUICK STATS */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Projects",
                    value: stats.total.toString(),
                    color: "text-teal-400",
                    icon: FiFolder,
                  },
                  {
                    label: "Completed",
                    value: stats.completed.toString(),
                    color: "text-emerald-400",
                    icon: FiCheckCircle,
                  },
                  {
                    label: "In Progress",
                    value: stats.inProgress.toString(),
                    color: "text-amber-400",
                    icon: FiRefreshCw,
                  },
                  {
                    label: "Skills",
                    value: skills.length.toString(),
                    color: "text-blue-400",
                    icon: FiAward,
                  },
                ].map((metric) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-lg border border-teal-900/30 bg-slate-900/30 hover:bg-slate-900/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400">{metric.label}</p>
                        <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                      </div>
                      <metric.icon className={metric.color} size={24} />
                    </div>
                  </motion.div>
                ))}
              </section>

              {/* FEATURED PROJECTS */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border border-teal-900/30 rounded-lg bg-slate-900/30 overflow-hidden"
              >
                <div className="p-4 border-b border-teal-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiCode className="text-teal-400" />
                    <h2 className="text-lg font-semibold">Recent Projects</h2>
                  </div>
                  <button
                    onClick={() => setActiveNav("projects")}
                    className="text-sm text-teal-300 hover:text-teal-200 transition"
                  >
                    View All →
                  </button>
                </div>
                <div className="p-4 grid md:grid-cols-2 gap-4">
                  {projects.slice(0, 4).map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-lg border border-teal-900/20 bg-slate-950/40 hover:bg-slate-900/60 transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-base">{project.title}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(
                            project.status
                          )}`}
                        >
                          {project.status.replace("-", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* GETTING STARTED GUIDE */}
              <section className="border border-amber-900/30 rounded-lg bg-amber-950/10 p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FiBriefcase className="text-amber-400" />
                  Getting Started - Update Your Portfolio
                </h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>✏️ Edit <code className="px-2 py-1 bg-slate-900/60 rounded text-xs">portfolio-site.tsx</code> to customize</p>
                  <p>📁 Replace placeholder projects with your actual work</p>
                  <p>💪 Update your skills and proficiency levels</p>
                  <p>👤 Customize the "About Me" section with your story</p>
                  <p>🔗 Add links to your GitHub, live demos, and project screenshots</p>
                </div>
              </section>
            </div>
          )}

          {activeNav === "projects" && (
            <div className="p-4 sm:p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Projects</h2>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FiFolder size={16} />
                  {stats.total} Total
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project) => {
                  const categoryColors: Record<string, string> = {
                    "Web Development": "bg-blue-500/20 text-blue-300",
                    "Security": "bg-red-500/20 text-red-300",
                    "Design": "bg-purple-500/20 text-purple-300",
                    "Other": "bg-slate-500/20 text-slate-300",
                  };

                  return (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-lg border-l-4 ${getStatusColor(project.status)}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            categoryColors[project.category] || categoryColors["Other"]
                          }`}
                        >
                          {project.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(
                            project.status
                          )}`}
                        >
                          {project.status.toUpperCase().replace("-", " ")}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-sm text-slate-300 mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-teal-300 hover:text-teal-200 transition"
                          >
                            <FiGlobe size={14} /> Live Demo
                          </a>
                        ) : (
                          <span className="text-slate-500 text-xs">No live demo yet</span>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-teal-300 hover:text-teal-200 transition"
                          >
                            <FiGithub size={14} /> Code
                          </a>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* ADD PROJECT REMINDER */}
              <div className="border border-dashed border-teal-900/40 rounded-lg p-8 text-center">
                <FiCode className="mx-auto text-teal-400 mb-3" size={48} />
                <h3 className="text-lg font-semibold mb-2">Ready to add your projects?</h3>
                <p className="text-sm text-slate-400">
                  Edit the <code className="px-2 py-1 bg-slate-900/60 rounded">projects</code> array in{" "}
                  <code className="px-2 py-1 bg-slate-900/60 rounded">portfolio-site.tsx</code> to showcase
                  your work
                </p>
              </div>
            </div>
          )}

          {activeNav === "skills" && (
            <div className="p-4 sm:p-6 space-y-6 max-w-4xl">
              <h2 className="text-2xl font-bold">Skills & Technologies</h2>

              {["Frontend", "Backend", "Security", "Tools"].map((category) => {
                const categorySkills = skills.filter((s) => s.category === category);
                if (categorySkills.length === 0) return null;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-6 space-y-4"
                  >
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FiAward className="text-teal-400" />
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">{skill.name}</p>
                            <span className="text-xs text-teal-300">{skill.level}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800/60 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-teal-500 to-teal-400"
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {/* SKILLS TIP */}
              <div className="border border-blue-900/30 rounded-lg bg-blue-950/10 p-6">
                <h3 className="text-lg font-semibold mb-3">💡 Customize Your Skills</h3>
                <p className="text-sm text-slate-300">
                  Update the <code className="px-2 py-1 bg-slate-900/60 rounded text-xs">skills</code> array
                  to reflect your actual proficiency levels. Add new skills or remove ones that don't apply to
                  you.
                </p>
              </div>
            </div>
          )}

          {activeNav === "contact" && (
            <div className="p-4 sm:p-6 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="text-slate-300">
                Interested in collaborating or have a question? Send me a message and I'll get back to you as
                soon as possible.
              </p>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleContactSubmit}
                className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-teal-900/30 bg-slate-950/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-teal-900/30 bg-slate-950/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    name="projectType"
                    required
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 rounded-lg border border-teal-900/30 bg-slate-950/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Your message..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-teal-900/30 bg-slate-950/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === "sending"}
                  className="w-full px-6 py-3 rounded-lg font-semibold bg-teal-600 hover:bg-teal-700 text-white transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiMail size={18} />
                  {contactStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
                {contactStatus === "sent" && (
                  <p className="text-sm text-emerald-400">✓ Message sent successfully! I'll respond shortly.</p>
                )}
                {contactStatus === "error" && (
                  <p className="text-sm text-red-400">✗ Error sending message. Please try again or email me directly.</p>
                )}
              </motion.form>

              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="mailto:tom@jogn.co.uk"
                  className="p-4 rounded-lg border border-teal-900/30 bg-slate-900/30 hover:bg-slate-900/50 transition text-center"
                >
                  <FiMail className="mx-auto text-teal-400 mb-2" size={24} />
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-slate-400 mt-1">tom@jogn.co.uk</p>
                </a>
                <a
                  href="https://www.linkedin.com/in/tom-b-a81271132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg border border-teal-900/30 bg-slate-900/30 hover:bg-slate-900/50 transition text-center"
                >
                  <FiLinkedin className="mx-auto text-teal-400 mb-2" size={24} />
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="text-xs text-slate-400 mt-1">Connect with me</p>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg border border-teal-900/30 bg-slate-900/30 hover:bg-slate-900/50 transition text-center"
                >
                  <FiGithub className="mx-auto text-teal-400 mb-2" size={24} />
                  <p className="text-sm font-medium">GitHub</p>
                  <p className="text-xs text-slate-400 mt-1">View my code</p>
                </a>
              </div>
            </div>
          )}

          {activeNav === "about" && (
            <div className="p-4 sm:p-6 space-y-6 max-w-3xl">
              <h2 className="text-2xl font-bold">About Me</h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-6 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-teal-500/20 border border-teal-500/40">
                    <FiUser size={48} className="text-teal-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Tom Baptist</h3>
                    <p className="text-slate-300 mb-4">
                      <strong>👤 Replace this section with your introduction!</strong>
                      <br />
                      <br />
                      Tell your story here. Who are you? What drives you? What are you passionate about in tech
                      and cyber security? Share your journey, your goals, and what makes you unique.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-teal-900/30 space-y-3">
                  <div>
                    <span className="text-teal-300 font-semibold">🏢 Current Role:</span>
                    <p className="text-slate-300 mt-1">
                      Apprentice Cyber Security Engineer at Tekgem UK LTD
                    </p>
                  </div>
                  <div>
                    <span className="text-teal-300 font-semibold">🎯 Focus Areas:</span>
                    <p className="text-slate-300 mt-1">
                      ICS/OT Security, SIEM Detection, Network Analysis, Incident Response
                    </p>
                  </div>
                  <div>
                    <span className="text-teal-300 font-semibold">🏆 Certifications:</span>
                    <p className="text-slate-300 mt-1">CompTIA Security+ (Active)</p>
                  </div>
                  <div>
                    <span className="text-teal-300 font-semibold">📍 Location:</span>
                    <p className="text-slate-300 mt-1">United Kingdom</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold">What I Do</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: FiShield, title: "ICS/OT Security", desc: "Protecting critical infrastructure" },
                    { icon: FiCode, title: "Detection Engineering", desc: "Building SIEM rules and alerts" },
                    { icon: FiBriefcase, title: "Incident Response", desc: "Triage and investigation" },
                    { icon: FiAward, title: "Continuous Learning", desc: "Always expanding my skillset" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <item.icon className="text-teal-400 mt-1" size={20} />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border border-blue-900/30 rounded-lg bg-blue-950/10 p-6"
              >
                <h3 className="text-lg font-semibold mb-3">💡 Customize This Section</h3>
                <p className="text-sm text-slate-300">
                  This "About Me" section is a placeholder. Replace it with your actual background, experience,
                  goals, and what makes you unique. This is your chance to tell your story!
                </p>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
