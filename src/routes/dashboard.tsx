import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Send,
  ArrowDownLeft,
  Snowflake,
  UserPlus,
  Receipt,
  Eye,
  EyeOff,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Sparkles,
  Info,
  AlertTriangle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/vp/GlassCard";
import { MoneyAmount } from "@/components/vp/MoneyAmount";
import { TransactionRow } from "@/components/vp/TransactionRow";
import { balance, transactions, spendingByCategory, monthlyFlow, insights } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — VaultPay" },
      { name: "description", content: "Your VaultPay dashboard: balance, spending, insights and recent activity." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { label: "Send", icon: Send, to: "/transfer", tone: "primary" as const },
  { label: "Request", icon: ArrowDownLeft, to: "/transfer", tone: "muted" as const },
  { label: "Freeze card", icon: Snowflake, to: "/cards", tone: "muted" as const },
  { label: "Add beneficiary", icon: UserPlus, to: "/transfer", tone: "muted" as const },
  { label: "Pay bills", icon: Receipt, to: "/dashboard", tone: "muted" as const },
];

function Dashboard() {
  const [hidden, setHidden] = useState(false);
  const totalCategory = spendingByCategory.reduce((s, c) => s + c.value, 0);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back, Alex
            </h1>
            <p className="text-sm text-muted-foreground">Here's a quick look at your money today.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Balance + quick actions */}
          <div className="space-y-6 lg:col-span-2">
            <GlassCard className="relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                    Total balance
                    <button
                      onClick={() => setHidden((v) => !v)}
                      className="rounded p-1 hover:bg-muted"
                      aria-label={hidden ? "Show balance" : "Hide balance"}
                    >
                      {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <div className="mt-2 animate-count-up">
                    {hidden ? (
                      <div className="font-display text-4xl font-semibold tabular sm:text-5xl">$••••••</div>
                    ) : (
                      <MoneyAmount value={balance.total} size="2xl" />
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-success">
                      <TrendingUp className="h-3 w-3" /> +{balance.monthChange}% this month
                    </span>
                    <span className="text-muted-foreground tabular">
                      Available <MoneyAmount value={balance.available} size="sm" className="ml-1" />
                    </span>
                  </div>
                </div>
                <Button asChild>
                  <Link to="/transfer"><Send className="mr-1.5 h-4 w-4" /> Send money</Link>
                </Button>
              </div>

              {/* Quick actions */}
              <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {quickActions.map((a) => (
                  <Link
                    key={a.label}
                    to={a.to}
                    className={cn(
                      "group flex flex-col items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-soft",
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                      a.tone === "primary" ? "gradient-primary text-white" : "bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary",
                    )}>
                      <a.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            </GlassCard>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Income (30d)", value: 7320, delta: "+12%", tone: "success" as const, icon: TrendingUp },
                { label: "Spending (30d)", value: -3412, delta: "−4%", tone: "muted" as const, icon: TrendingDown },
                { label: "Savings rate", value: 32, suffix: "%", delta: "+6 pts", tone: "success" as const, icon: PiggyBank },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{k.label}</span>
                    <k.icon className={cn("h-4 w-4", k.tone === "success" ? "text-success" : "text-muted-foreground")} />
                  </div>
                  <div className="mt-2 font-display text-2xl font-semibold tabular">
                    {k.suffix ? `${k.value}${k.suffix}` : (
                      <MoneyAmount value={Math.abs(k.value)} size="lg" />
                    )}
                  </div>
                  <div className={cn("mt-1 text-xs", k.tone === "success" ? "text-success" : "text-muted-foreground")}>{k.delta} vs prev month</div>
                </div>
              ))}
            </div>

            {/* Income vs spending chart */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold">Income vs spending</h3>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--color-chart-1)]" /> Income</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--color-chart-2)]" /> Spending</span>
                </div>
              </div>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyFlow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="spd" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                    <Area type="monotone" dataKey="income" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#inc)" />
                    <Area type="monotone" dataKey="spending" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#spd)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent transactions */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold">Recent activity</h3>
                  <p className="text-xs text-muted-foreground">Your latest 8 transactions</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
              <div className="mt-2 divide-y divide-border">
                {transactions.slice(0, 8).map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-base font-semibold">Spending by category</h3>
              <p className="text-xs text-muted-foreground">This month</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="relative h-40 w-40 shrink-0">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={spendingByCategory} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                        {spendingByCategory.map((c, i) => (
                          <Cell key={i} fill={c.color} stroke="var(--color-background)" strokeWidth={2} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Total</div>
                    <div className="font-display text-lg font-semibold tabular">${totalCategory.toLocaleString()}</div>
                  </div>
                </div>
                <ul className="flex-1 space-y-2 text-sm">
                  {spendingByCategory.map((c) => (
                    <li key={c.name} className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                        {c.name}
                      </span>
                      <span className="tabular text-muted-foreground">${c.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold">Smart insights</h3>
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <ul className="mt-3 space-y-3">
                {insights.map((i) => {
                  const Icon = i.tone === "warning" ? AlertTriangle : i.tone === "success" ? TrendingUp : Info;
                  const tone = i.tone === "warning" ? "text-warning bg-warning/10" : i.tone === "success" ? "text-success bg-success/10" : "text-primary bg-primary/10";
                  return (
                    <li key={i.id} className="flex gap-3 rounded-xl border border-border bg-background/40 p-3">
                      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", tone)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{i.title}</div>
                        <div className="text-xs text-muted-foreground">{i.body}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl card-gradient p-5 text-white">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-white/70">Goals</div>
                <h3 className="mt-1 font-display text-lg font-semibold">Emergency fund</h3>
                <div className="mt-3 flex items-end justify-between">
                  <div className="font-display text-2xl font-semibold tabular">$6,130</div>
                  <div className="text-xs text-white/70 tabular">of $10,000</div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-white" style={{ width: "61%" }} />
                </div>
                <Button size="sm" variant="secondary" className="mt-4 bg-white text-primary hover:bg-white/90">
                  Add funds
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
