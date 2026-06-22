import Link from "next/link";
import { cookies } from "next/headers";
import {
  Activity,
  Bell,
  CheckCircle,
  ChevronRight,
  Clock,
  Globe,
  LayoutDashboard,
  Shield,
  Zap,
} from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

// ─── Inline reusable primitives ──────────────────────────────────────────────

const StatusDot = ({ status }: { status: "UP" | "DOWN" | "PENDING" }) => {
  const colors = {
    UP: "bg-emerald-500",
    DOWN: "bg-red-500",
    PENDING: "bg-amber-500",
  };
  const labels = {
    UP: "bg-emerald-100 text-emerald-800",
    DOWN: "bg-red-100 text-red-800",
    PENDING: "bg-amber-100 text-amber-800",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${labels[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${colors[status]}`} />
      {status}
    </span>
  );
};

// ─── Nav ─────────────────────────────────────────────────────────────────────

const Nav = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <header className="border-border/50 animate-slide-down sticky top-0 z-50 border-b bg-[#0a0a0a]/80 backdrop-blur-md">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="font-semibold tracking-tight text-white">Uptime Monitor</span>
      </Link>

      <div className="hidden items-center gap-6 text-sm text-neutral-400 sm:flex">
        <a href="#features" className="transition-colors hover:text-white">
          Features
        </a>
        <a href="#how-it-works" className="transition-colors hover:text-white">
          How it works
        </a>
      </div>

      {!isAuthenticated && (
        <div className="flex items-center gap-3">
          <Link
            href="/auth/signin"
            className="hidden text-sm text-neutral-400 transition-colors hover:text-white sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:bg-neutral-200 active:scale-95"
          >
            Get started
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </nav>
  </header>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <section className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
    {/* Dot grid */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    {/* Emerald radial glow */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.14) 0%, transparent 70%)",
      }}
    />

    <div className="relative mx-auto max-w-6xl px-6 py-28 text-center md:py-36">
      {/* Badge — animates first */}
      <div
        className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400"
        style={{ animationDelay: "0ms" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        All systems operational
      </div>

      {/* Headline */}
      <h1
        className="animate-fade-up mx-auto max-w-3xl text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
        style={{ animationDelay: "120ms" }}
      >
        Know when your services go down.{" "}
        <span
          style={{
            background:
              "linear-gradient(135deg, #6ee7b7 0%, #3b82f6 40%, #a78bfa 80%, #6ee7b7 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 5s ease infinite",
          }}
        >
          Before your users do.
        </span>
      </h1>

      {/* Sub-headline */}
      <p
        className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-neutral-400"
        style={{ animationDelay: "260ms" }}
      >
        Real-time HTTP monitoring with instant alerts via email, Slack, and webhooks. Track
        incidents, resolve faster, sleep better.
      </p>

      {/* CTAs */}
      <div
        className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
        style={{ animationDelay: "400ms" }}
      >
        {isAuthenticated ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all hover:bg-neutral-100 hover:shadow-white/20 active:scale-95"
          >
            Go to dashboard
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <>
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all hover:bg-neutral-100 hover:shadow-white/20 active:scale-95"
            >
              Start monitoring free
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/signin"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
            >
              Sign in to dashboard
            </Link>
          </>
        )}
      </div>

      {/* Hero mockup */}
      <div
        className="animate-fade-up relative mx-auto mt-16 max-w-3xl"
        style={{ animationDelay: "560ms" }}
      >
        {/* Gradient glow behind card */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-2xl opacity-25 blur-3xl"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
          }}
        />

        {/* Floating card wrapper */}
        <div className="animate-float relative">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-1 shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 rounded-t-xl bg-neutral-800/80 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <div className="ml-3 flex h-5 flex-1 items-center rounded bg-neutral-700/60 px-2.5">
                <span className="text-xs text-neutral-500">app.uptimemonitor.io/dashboard</span>
              </div>
            </div>

            {/* Dashboard mockup content */}
            <div className="rounded-b-xl bg-neutral-950 p-5 text-left">
              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Monitors", value: "12", accent: "border-emerald-500/30" },
                  { label: "Open incidents", value: "0", accent: "border-emerald-500/30" },
                  { label: "Endpoints", value: "4", accent: "border-neutral-700" },
                  { label: "Active rules", value: "9", accent: "border-neutral-700" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={`rounded-lg border ${card.accent} bg-neutral-900 p-3`}
                  >
                    <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                      {card.label}
                    </p>
                    <p className="mt-1.5 text-xl font-semibold text-white">{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Monitor health table */}
              <div className="mt-4 overflow-hidden rounded-lg border border-neutral-800">
                <table className="min-w-full divide-y divide-neutral-800 text-sm">
                  <thead className="bg-neutral-900/80">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium tracking-wide text-neutral-500 uppercase">
                        Monitor
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium tracking-wide text-neutral-500 uppercase">
                        Status
                      </th>
                      <th className="hidden px-3 py-2 text-left text-xs font-medium tracking-wide text-neutral-500 uppercase sm:table-cell">
                        Last checked
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {[
                      {
                        name: "Production API",
                        url: "api.example.com",
                        status: "UP",
                        checked: "30s ago",
                      },
                      {
                        name: "Auth Service",
                        url: "auth.example.com",
                        status: "UP",
                        checked: "45s ago",
                      },
                      {
                        name: "Payments",
                        url: "pay.example.com",
                        status: "DOWN",
                        checked: "1m ago",
                      },
                      {
                        name: "CDN Edge",
                        url: "cdn.example.com",
                        status: "PENDING",
                        checked: "2m ago",
                      },
                    ].map((row) => (
                      <tr key={row.name} className="hover:bg-neutral-900/50">
                        <td className="px-3 py-2.5">
                          <p className="font-medium text-white">{row.name}</p>
                          <p className="text-xs text-neutral-500">{row.url}</p>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                              row.status === "UP"
                                ? "bg-emerald-500/15 text-emerald-400"
                                : row.status === "DOWN"
                                  ? "bg-red-500/15 text-red-400"
                                  : "bg-amber-500/15 text-amber-400"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                row.status === "UP"
                                  ? "bg-emerald-500"
                                  : row.status === "DOWN"
                                    ? "bg-red-500"
                                    : "bg-amber-500"
                              } ${row.status === "DOWN" ? "animate-pulse" : ""}`}
                            />
                            {row.status}
                          </span>
                        </td>
                        <td className="hidden px-3 py-2.5 text-xs text-neutral-500 sm:table-cell">
                          {row.checked}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Stats strip ──────────────────────────────────────────────────────────────

const StatsStrip = () => (
  <section className="border-border bg-muted/30 border-y">
    <AnimateIn variant="fadeUp">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y px-6 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[
          { value: "< 60s", label: "Alert delivery time", sub: "From detection to your inbox" },
          { value: "99.9%", label: "Uptime SLA tracked", sub: "Across all your monitors" },
          { value: "3", label: "Notification channels", sub: "Email · Slack · Webhook" },
        ].map((stat) => (
          <div key={stat.label} className="px-8 py-4 text-center first:pl-0 last:pr-0">
            <p className="text-foreground text-4xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-foreground mt-1 text-sm font-medium">{stat.label}</p>
            <p className="text-muted-foreground mt-0.5 text-xs">{stat.sub}</p>
          </div>
        ))}
      </div>
    </AnimateIn>
  </section>
);

// ─── Features ─────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Activity,
    title: "Real-time HTTP monitoring",
    description:
      "Continuously poll your HTTP endpoints on configurable intervals. Get accurate, up-to-the-minute status for every service.",
  },
  {
    icon: Bell,
    title: "Instant multi-channel alerts",
    description:
      "Receive notifications via email, Slack, or custom webhooks the moment a monitor changes state. Never miss an outage.",
  },
  {
    icon: Shield,
    title: "Incident history & tracking",
    description:
      "Every downtime event is logged as an incident with start time, resolution, and duration. Full audit trail at your fingertips.",
  },
  {
    icon: Globe,
    title: "Per-monitor notification rules",
    description:
      "Configure different alert channels and thresholds for each monitor. Critical services get paged; test environments stay quiet.",
  },
  {
    icon: LayoutDashboard,
    title: "At-a-glance dashboard",
    description:
      "See your entire infrastructure health in one view. Stat cards, status tables, and incident summaries — all live.",
  },
  {
    icon: Zap,
    title: "Simple setup, no code",
    description:
      "Add a monitor by entering a URL. Configure alerts in seconds. No scripts, no agents, no infrastructure to manage.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="mx-auto max-w-6xl px-6 py-24">
    <AnimateIn variant="fadeUp" className="text-center">
      <p className="text-primary text-sm font-semibold tracking-widest uppercase">Features</p>
      <h2 className="text-foreground mt-2 text-4xl font-bold tracking-tight">
        Everything you need to stay informed
      </h2>
      <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base">
        Built for developers and ops teams who need reliable uptime visibility without complexity.
      </p>
    </AnimateIn>

    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <AnimateIn key={f.title} variant="fadeUp" delay={i * 80}>
            <div className="border-border bg-card hover:border-border/80 hover:bg-muted/30 group h-full rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-primary/8 text-primary mb-4 inline-flex rounded-lg p-2.5 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-foreground font-semibold">{f.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{f.description}</p>
            </div>
          </AnimateIn>
        );
      })}
    </div>
  </section>
);

// ─── How it works ─────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Add your monitors",
    description:
      "Enter any HTTP/HTTPS URL and set a check interval. We'll start pinging it immediately.",
  },
  {
    num: "02",
    title: "Configure notifications",
    description:
      "Add your email, Slack webhook, or any HTTP endpoint. Set rules per monitor or globally.",
  },
  {
    num: "03",
    title: "Stay ahead of outages",
    description:
      "Get alerted the instant something goes wrong. Resolve incidents and track history — all from the dashboard.",
  },
];

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    className="border-border border-y"
    style={{ background: "var(--color-muted, #f9f9f9)" }}
  >
    <div className="mx-auto max-w-6xl px-6 py-24">
      <AnimateIn variant="fadeUp" className="text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">How it works</p>
        <h2 className="text-foreground mt-2 text-4xl font-bold tracking-tight">
          Up and running in minutes
        </h2>
      </AnimateIn>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <AnimateIn key={step.num} variant="fadeUp" delay={i * 120}>
            <div className="relative flex flex-col items-start">
              {i < steps.length - 1 && (
                <div className="border-border absolute top-5 left-[calc(50%+2rem)] hidden w-[calc(100%-1rem)] border-t border-dashed sm:block" />
              )}
              <div className="bg-primary text-primary-foreground relative mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-transform duration-300 hover:scale-110">
                {step.num}
              </div>
              <h3 className="text-foreground font-semibold">{step.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);

// ─── Dashboard mockup section ─────────────────────────────────────────────────

const DashboardMockupSection = () => (
  <section className="mx-auto max-w-6xl px-6 py-24">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* Copy — slides in from left */}
      <AnimateIn variant="slideLeft">
        <div>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">Dashboard</p>
          <h2 className="text-foreground mt-2 text-4xl font-bold tracking-tight">
            Your infrastructure, at a glance
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            A single dashboard shows every monitor, its current status, and recent incidents. No
            digging through logs. No context-switching.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Live status badges — UP, DOWN, or PENDING",
              "Incident timeline with start & resolve times",
              "Notification coverage per endpoint",
              "One-click access to monitor settings",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckCircle className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/auth/signup"
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
          >
            See it live
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </AnimateIn>

      {/* Live-look card — slides in from right */}
      <AnimateIn variant="slideRight">
        <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="border-border border-b px-5 py-4">
            <h3 className="text-foreground text-sm font-semibold">Monitor health</h3>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Overview of monitor health, incidents, and alert configuration.
            </p>
          </div>

          {/* Stat row */}
          <div className="border-border grid grid-cols-2 divide-x border-b">
            {[
              { label: "Monitors", value: "12", hint: "All healthy" },
              { label: "Open incidents", value: "1", hint: "1 needs attention" },
            ].map((s) => (
              <div key={s.label} className="px-5 py-4">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  {s.label}
                </p>
                <p className="text-foreground mt-1.5 text-2xl font-semibold">{s.value}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">{s.hint}</p>
              </div>
            ))}
          </div>

          {/* Monitor list */}
          <table className="divide-border min-w-full divide-y text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-muted-foreground px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase">
                  Monitor
                </th>
                <th className="text-muted-foreground px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase">
                  Status
                </th>
                <th className="text-muted-foreground hidden px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase sm:table-cell">
                  Uptime
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {[
                {
                  name: "Production API",
                  url: "api.acme.io",
                  status: "UP" as const,
                  uptime: "99.98%",
                },
                {
                  name: "Auth Service",
                  url: "auth.acme.io",
                  status: "UP" as const,
                  uptime: "100%",
                },
                {
                  name: "Payments Svc",
                  url: "pay.acme.io",
                  status: "DOWN" as const,
                  uptime: "97.2%",
                },
                {
                  name: "Webhooks",
                  url: "hooks.acme.io",
                  status: "PENDING" as const,
                  uptime: "—",
                },
              ].map((m) => (
                <tr key={m.name} className="hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <p className="text-foreground font-medium">{m.name}</p>
                    <p className="text-muted-foreground text-xs">{m.url}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusDot status={m.status} />
                  </td>
                  <td className="text-muted-foreground hidden px-4 py-3 text-xs sm:table-cell">
                    {m.uptime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimateIn>
    </div>
  </section>
);

// ─── Alerts feature callout ───────────────────────────────────────────────────

const AlertsCallout = () => (
  <section className="border-border border-y">
    <div className="mx-auto max-w-6xl px-6 py-24" style={{ background: "var(--color-background)" }}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Alert cards mockup — staggered fade-up */}
        <div className="space-y-3">
          {[
            {
              channel: "Email",
              icon: "✉️",
              message: "ALERT: Payments Svc is DOWN",
              time: "Just now",
              color: "border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10",
              text: "text-red-900 dark:text-red-200",
              sub: "alert@acme.io",
            },
            {
              channel: "Slack",
              icon: "💬",
              message: "🔴 Payments Svc went DOWN at 22:14",
              time: "1s ago",
              color:
                "border-violet-200 bg-violet-50 dark:border-violet-500/30 dark:bg-violet-500/10",
              text: "text-violet-900 dark:text-violet-200",
              sub: "#ops-alerts",
            },
            {
              channel: "Webhook",
              icon: "⚡",
              message: 'POST {"status":"DOWN","monitor":"Payments…"}',
              time: "2s ago",
              color: "border-sky-200 bg-sky-50 dark:border-sky-500/30 dark:bg-sky-500/10",
              text: "text-sky-900 dark:text-sky-200",
              sub: "hooks.zapier.com/…",
            },
          ].map((alert, i) => (
            <AnimateIn key={alert.channel} variant="slideLeft" delay={i * 100}>
              <div
                className={`rounded-xl border px-4 py-3.5 ${alert.color} flex items-start gap-3 transition-transform duration-300 hover:-translate-y-0.5`}
              >
                <span className="mt-0.5 text-lg leading-none">{alert.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`truncate text-sm font-medium ${alert.text}`}>{alert.message}</p>
                    <span className="text-muted-foreground shrink-0 text-xs">{alert.time}</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-xs">{alert.sub}</p>
                </div>
              </div>
            </AnimateIn>
          ))}

          {/* Resolved notice */}
          <AnimateIn variant="slideLeft" delay={350}>
            <div className="rounded-xl border border-emerald-200/80 bg-emerald-50 px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  Incident resolved — Payments Svc is back UP
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Copy — slides from right */}
        <AnimateIn variant="slideRight" delay={100}>
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">Alerts</p>
            <h2 className="text-foreground mt-2 text-4xl font-bold tracking-tight">
              Get notified your way
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Connect the tools you already use. Email for audit trails, Slack for your ops channel,
              and webhooks to trigger any automation.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                {
                  label: "Email",
                  color:
                    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
                  icon: "✉️",
                },
                {
                  label: "Slack",
                  color: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
                  icon: "💬",
                },
                {
                  label: "Webhook",
                  color: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
                  icon: "⚡",
                },
              ].map((ch) => (
                <div
                  key={ch.label}
                  className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-4 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-md ${ch.color}`}
                >
                  <span className="text-2xl">{ch.icon}</span>
                  <span className="text-sm font-semibold">{ch.label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/auth/signup"
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Configure alerts
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimateIn>
      </div>
    </div>
  </section>
);

// ─── CTA ─────────────────────────────────────────────────────────────────────

const CTASection = () => (
  <section className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(16,185,129,0.10) 0%, transparent 70%)",
      }}
    />

    <div className="relative mx-auto max-w-2xl px-6 py-28 text-center">
      <AnimateIn variant="scaleUp" duration={700}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-300">
          <Clock className="h-3.5 w-3.5" />
          Set up in under 2 minutes
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Stop finding out from your users
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-neutral-400">
          Start monitoring your endpoints today. Get instant alerts and full incident history — free
          to start.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-white/20 active:scale-95"
          >
            Start monitoring free
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/auth/signin"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10"
          >
            Sign in →
          </Link>
        </div>
      </AnimateIn>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="border-border border-t">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
      <Link href="/" className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-foreground text-sm font-semibold">Uptime Monitor</span>
      </Link>

      <div className="text-muted-foreground flex flex-wrap gap-6 text-sm">
        <Link href="/auth/signin" className="hover:text-foreground transition-colors">
          Sign in
        </Link>
        <Link href="/auth/signup" className="hover:text-foreground transition-colors">
          Get started
        </Link>
        <a href="#features" className="hover:text-foreground transition-colors">
          Features
        </a>
      </div>

      <p className="text-muted-foreground text-xs">
        © {new Date().getFullYear()} Uptime Monitor. Built with Next.js.
      </p>
    </div>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("token");

  return (
    <>
      <Nav isAuthenticated={isAuthenticated} />
      <main>
        <Hero isAuthenticated={isAuthenticated} />
        <StatsStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <DashboardMockupSection />
        <AlertsCallout />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
