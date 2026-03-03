"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiGlobe,
  FiLinkedin,
  FiLogOut,
  FiMail,
  FiMenu,
  FiRefreshCw,
  FiSearch,
  FiServer,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";

type SubmitState = "idle" | "sending" | "sent" | "error";
type NavSection = "dashboard" | "incidents" | "cases" | "settings" | "about";

type CaseStudy = {
  id: string;
  title: string;
  category: "ICS/OT" | "Network" | "Governance" | "Labs";
  summary: string;
  outcome: string;
  severity: "critical" | "high" | "medium";
  timestamp: string;
  status: "resolved" | "in-progress" | "documented";
};

type IncidentAlert = {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  timestamp: string;
  status: "open" | "investigating" | "resolved";
  description: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "ICS/OT Security Baseline Review",
    category: "ICS/OT",
    summary: "Baseline assessment of control zone architecture and critical asset exposure.",
    outcome: "Identified 8 high-priority remediation items; mapped trust boundaries.",
    severity: "high",
    timestamp: "2025-02-15T14:32:00Z",
    status: "resolved",
  },
  {
    id: "2",
    title: "Network Security Monitoring Support",
    category: "Network",
    summary: "Design and deployment of network detection telemetry pipelines.",
    outcome: "Established SIEM baseline with 15+ detection rules for lateral movement.",
    severity: "high",
    timestamp: "2025-02-10T09:18:00Z",
    status: "resolved",
  },
  {
    id: "3",
    title: "Vulnerability & Patch Tracking",
    category: "Governance",
    summary: "Cross-platform vulnerability lifecycle management and remediation workflow.",
    outcome: "Reduced mean time-to-patch by 3 weeks; standardized triage notes.",
    severity: "medium",
    timestamp: "2025-02-01T11:42:00Z",
    status: "resolved",
  },
  {
    id: "4",
    title: "Security Awareness & Training",
    category: "Governance",
    summary: "Phishing simulation and user security behavior guidance program.",
    outcome: "25% reduction in suspicious link clicks; elevated security awareness.",
    severity: "medium",
    timestamp: "2025-01-25T16:05:00Z",
    status: "resolved",
  },
  {
    id: "5",
    title: "Home Lab: Detection & Hardening",
    category: "Labs",
    summary: "Personal lab environment for detection engineering and incident response practice.",
    outcome: "Built 10+ lab scenarios; practiced blue-team response and log analysis.",
    severity: "medium",
    timestamp: "2025-01-15T10:20:00Z",
    status: "in-progress",
  },
];

const recentIncidents: IncidentAlert[] = [
  {
    id: "INC-2025-0847",
    title: "OT Zone Auth Anomaly Detected",
    severity: "high",
    timestamp: "Today, 14:32",
    status: "investigating",
    description: "Unusual authentication pattern from PLC-02 in Zone-A. Baseline deviation detected. Triage in progress.",
  },
  {
    id: "INC-2025-0846",
    title: "Firewall Rule Drift Alert",
    severity: "medium",
    timestamp: "Today, 12:18",
    status: "investigating",
    description: "Outbound rule modification detected on Edge-FW-01 outside of change window. Policy check initiated.",
  },
  {
    id: "INC-2025-0845",
    title: "Patch Compliance Update",
    severity: "low",
    timestamp: "Yesterday, 08:45",
    status: "resolved",
    description: "Monthly patch cycle completed. 98% compliance rate achieved. 2 exemptions documented.",
  },
];

const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case "critical":
      return "text-red-400 bg-red-950/40 border-red-800";
    case "high":
      return "text-orange-400 bg-orange-950/40 border-orange-800";
    case "medium":
      return "text-amber-400 bg-amber-950/40 border-amber-800";
    case "low":
      return "text-emerald-400 bg-emerald-950/40 border-emerald-800";
    default:
      return "text-slate-400 bg-slate-950/40 border-slate-800";
  }
};

const getSeverityBadgeColor = (severity: string): string => {
  switch (severity) {
    case "critical":
    case "high":
      return "bg-red-500/20 text-red-300";
    case "medium":
      return "bg-amber-500/20 text-amber-300";
    case "low":
      return "bg-emerald-500/20 text-emerald-300";
    default:
      return "bg-slate-500/20 text-slate-300";
  }
};

export function PortfolioSite() {
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<SubmitState>("idle");

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
              <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold">OpManager</p>
              <h1 className="text-lg font-bold text-slate-100">Tom Baptist | Cyber OT Security</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-400 hidden sm:block">Last update: now</p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-950/40 border border-teal-900/50">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-teal-300 font-medium">Online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* LEFT SIDEBAR NAVIGATION */}
        <nav
          className={`fixed md:static w-56 h-[calc(100vh-57px)] bg-[#0d1117]/95 border-r border-teal-900/30 overflow-y-auto transition-transform md:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-2">
            {[
              { id: "dashboard" as const, label: "Dashboard", icon: FiTrendingUp },
              { id: "incidents" as const, label: "Incidents & Alerts", icon: FiAlertTriangle },
              { id: "cases" as const, label: "Case Studies", icon: FiServer },
              { id: "settings" as const, label: "Settings", icon: FiSettings },
              { id: "about" as const, label: "About", icon: FiShield },
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
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Quick Stats</p>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/">
                <p className="text-xs text-slate-400">Active Cases</p>
                <p className="text-xl font-bold text-teal-300">5</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/">
                <p className="text-xs text-slate-400">Open Incidents</p>
                <p className="text-xl font-bold text-orange-400">2</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/">
                <p className="text-xs text-slate-400">Resolved</p>
                <p className="text-xl font-bold text-emerald-400">3</p>
              </div>
            </div>
          </div>

          <div className="border-t border-teal-900/30 p-4 mt-4">
            <a
              href="https://www.linkedin.com/in/tom-b-a81271132"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-teal-300 hover:text-teal-200 transition"
            >
              <FiLinkedin size={16} /> LinkedIn Profile
            </a>
          </div>
        </nav>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-auto">
          {activeNav === "dashboard" && (
            <div className="p-4 sm:p-6 space-y-6">
              {/* TOP METRICS ROW */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Security Posture",
                    value: "98%",
                    color: "text-emerald-400",
                    icon: FiCheckCircle,
                  },
                  {
                    label: "MTTA Trend",
                    value: "↓ 22%",
                    color: "text-emerald-400",
                    icon: FiTrendingUp,
                  },
                  {
                    label: "Incident Queue",
                    value: "2",
                    color: "text-orange-400",
                    icon: FiAlertTriangle,
                  },
                  {
                    label: "Cert: Sec+",
                    value: "Active",
                    color: "text-teal-400",
                    icon: FiShield,
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

              {/* INCIDENT QUEUE */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border border-teal-900/30 rounded-lg bg-slate-900/30 overflow-hidden"
              >
                <div className="p-4 border-b border-teal-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiAlertTriangle className="text-orange-400" />
                    <h2 className="text-lg font-semibold">Incident Queue</h2>
                  </div>
                  <button className="p-2 hover:bg-slate-800/50 rounded-lg transition">
                    <FiRefreshCw size={18} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-teal-900/20 text-slate-400 text-xs uppercase">
                        <th className="px-4 py-3 text-left">ID</th>
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left">Severity</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-teal-900/20">
                      {recentIncidents.map((incident) => (
                        <tr
                          key={incident.id}
                          className="hover:bg-slate-800/20 transition border-b border-teal-900/10"
                        >
                          <td className="px-4 py-3 font-mono text-xs text-teal-300">{incident.id}</td>
                          <td className="px-4 py-3 text-slate-200">{incident.title}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityBadgeColor(
                                incident.severity
                              )}`}
                            >
                              {incident.severity.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={
                                incident.status === "investigating"
                                  ? "text-amber-400"
                                  : incident.status === "open"
                                  ? "text-red-400"
                                  : "text-emerald-400"
                              }
                            >
                              {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-400">{incident.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>

              {/* OPERATIONAL SUMMARY */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* OT ENVIRONMENT STATUS */}
                <div className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FiServer className="text-teal-400" />
                    OT Environment Status
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "ICS Zone-A", status: "healthy", detail: "All systems nominal" },
                      { name: "ICS Zone-B", status: "healthy", detail: "Baseline established" },
                      { name: "Network-OT", status: "healthy", detail: "Monitoring active" },
                      { name: "Patch Cycle", status: "healthy", detail: "98% compliance" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-teal-900/20"
                      >
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-slate-400">{item.detail}</p>
                        </div>
                        <FiCheckCircle className="text-emerald-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* SKILLS & FOCUS */}
                <div className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FiShield className="text-teal-400" />
                    Specialization
                  </h3>
                  <div className="space-y-3">
                    {[
                      { skill: "ICS/OT Security", level: "Apprentice-Advanced" },
                      { skill: "SIEM Detection", level: "Detection Engineering" },
                      { skill: "Network Analysis", level: "Threat Hunting" },
                      { skill: "Incident Response", level: "Triage & Escalation" },
                    ].map((item) => (
                      <div key={item.skill}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{item.skill}</p>
                          <span className="text-xs text-teal-300">{item.level}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800/60 rounded-full overflow-hidden">
                          <div className="h-full w-4/5 bg-gradient-to-r from-teal-500 to-teal-400"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>
          )}

          {activeNav === "incidents" && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-2xl font-bold">Incident & Alert Management</h2>
              <div className="grid gap-4">
                {recentIncidents.map((incident) => (
                  <motion.article
                    key={incident.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-l-4 ${getSeverityColor(incident.severity)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <code className="text-xs font-mono text-teal-300">{incident.id}</code>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityBadgeColor(
                              incident.severity
                            )}`}
                          >
                            {incident.severity.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{incident.title}</h3>
                        <p className="text-sm text-slate-300 mb-2">{incident.description}</p>
                        <p className="text-xs text-slate-400">Reported: {incident.timestamp}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                          incident.status === "investigating"
                            ? "bg-amber-500/20 text-amber-300"
                            : incident.status === "open"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {incident.status.charAt(0).toUpperCase() +
                          incident.status.slice(1).replace("-", " ")}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {activeNav === "cases" && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-2xl font-bold">Case Studies & Documentation</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {caseStudies.map((caseStudy) => (
                  <motion.article
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${getSeverityColor(caseStudy.severity)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                        {caseStudy.category}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityBadgeColor(
                          caseStudy.severity
                        )}`}
                      >
                        {caseStudy.severity.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base mb-2">{caseStudy.title}</h3>
                    <p className="text-sm text-slate-300 mb-3">{caseStudy.summary}</p>
                    <div className="p-3 rounded-lg bg-slate-950/40 mb-3 border border-slate-700/50">
                      <p className="text-xs text-slate-400 mb-1">OUTCOME</p>
                      <p className="text-sm text-emerald-300 font-medium">{caseStudy.outcome}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono">{caseStudy.timestamp.split("T")[0]}</span>
                      <span
                        className={
                          caseStudy.status === "resolved"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      >
                        {caseStudy.status.charAt(0).toUpperCase() + caseStudy.status.slice(1)}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {activeNav === "settings" && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-2xl font-bold">Get In Touch</h2>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleContactSubmit}
                className="max-w-2xl border border-teal-900/30 rounded-lg bg-slate-900/30 p-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-teal-900/30 bg-slate-950/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-teal-900/30 bg-slate-950/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role / Nature of Inquiry</label>
                  <input
                    name="projectType"
                    required
                    placeholder="e.g., SOC Analyst Role, SIEM Integration, OT Security Review"
                    className="w-full px-4 py-3 rounded-lg border border-teal-900/30 bg-slate-950/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell me about the opportunity or challenge..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-teal-900/30 bg-slate-950/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
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
                  <p className="text-sm text-emerald-400">✓ Message received. I'll respond shortly.</p>
                )}
                {contactStatus === "error" && (
                  <p className="text-sm text-red-400">✗ Error sending message. Please try again.</p>
                )}
              </motion.form>
            </div>
          )}

          {activeNav === "about" && (
            <div className="p-4 sm:p-6 space-y-6 max-w-3xl">
              <h2 className="text-2xl font-bold">About Tom Baptist</h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold">Professional Profile</h3>
                <p className="text-slate-300">
                  Apprentice Cyber Security Engineer at Tekgem UK LTD with specialization in Operational
                  Technology (OT) and Industrial Control Systems (ICS) security. Focused on detection
                  engineering, SIEM triage workflows, and practical incident response in OT environments.
                </p>
                <div className="pt-4 border-t border-teal-900/30 space-y-2">
                  <p>
                    <span className="text-teal-300 font-semibold">Company:</span> Tekgem UK LTD
                  </p>
                  <p>
                    <span className="text-teal-300 font-semibold">Role:</span> Apprentice Cyber Security
                    Engineer
                  </p>
                  <p>
                    <span className="text-teal-300 font-semibold">Focus Areas:</span> ICS/OT Security,
                    SIEM Detection, Network Threat Hunting
                  </p>
                  <p>
                    <span className="text-teal-300 font-semibold">Certification:</span> CompTIA Security+ (Active)
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold">Core Competencies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "ICS/OT Baseline Reviews",
                    "Network Security Monitoring",
                    "SIEM Detection Engineering",
                    "Vulnerability Management",
                    "Incident Triage",
                    "Security Awareness Training",
                    "Log Analysis & Correlation",
                    "Home Lab Development",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <FiCheckCircle className="text-teal-400" size={16} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border border-teal-900/30 rounded-lg bg-slate-900/30 p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Contact</h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <FiMail className="text-teal-400" size={16} />
                    <a href="mailto:tom@jogn.co.uk" className="text-teal-300 hover:text-teal-200">
                      tom@jogn.co.uk
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiLinkedin className="text-teal-400" size={16} />
                    <a
                      href="https://www.linkedin.com/in/tom-b-a81271132"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-300 hover:text-teal-200"
                    >
                      LinkedIn Profile
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
