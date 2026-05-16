import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Shield,
  Zap,
  CreditCard,
  Globe,
  BarChart3,
  Lock,
  Check,
  Star,
} from "lucide-react";
import { MarketingNav, MarketingFooter } from "@/components/layout/Marketing";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/vp/GlassCard";
import { VirtualCard } from "@/components/vp/VirtualCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cards, faqs, testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VaultPay — Banking, transfers and cards reimagined" },
      { name: "description", content: "VaultPay is a premium digital bank prototype for young professionals and freelancers. Send money, manage cards, stay in control." },
      { property: "og:title", content: "VaultPay — Banking, transfers and cards reimagined" },
      { property: "og:description", content: "Premium fintech UI/UX prototype with dashboard, transfers, cards and security." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Zap, title: "Instant transfers", body: "Move money between VaultPay accounts in seconds. ACH and international clearly priced upfront." },
  { icon: CreditCard, title: "Virtual cards", body: "Spin up unlimited virtual cards for subscriptions, travel and one-time purchases." },
  { icon: BarChart3, title: "Smart insights", body: "Auto-categorized spending, monthly trends and gentle nudges that actually help." },
  { icon: Shield, title: "Bank-grade security", body: "2FA, biometrics and continuous fraud monitoring on every device, every session." },
  { icon: Globe, title: "Multi-currency", body: "Hold and spend in USD, EUR, GBP and CAD with mid-market rates. No silent markups." },
  { icon: Lock, title: "Privacy first", body: "Your data is never sold. Granular controls let you decide what's shared and when." },
];

const trustLogos = ["NORTHWIND", "ACME", "STELLAR", "AURORA", "VOYAGER", "HELIOS"];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-bg absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
              Now in private beta · 12,000+ on waitlist
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Smarter money for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                modern lives.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              VaultPay is the calmer bank for young professionals and freelancers. Track every dollar, send money in seconds and freeze a card before you finish your coffee.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Try the dashboard <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/transfer">See transfer flow</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> No hidden fees</div>
              <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> FDIC-equivalent insured*</div>
              <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> 2-min setup</div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
            <GlassCard className="w-full max-w-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Total balance</div>
                  <div className="font-display text-3xl font-semibold tabular">$24,582.40</div>
                </div>
                <div className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">+4.2%</div>
              </div>
              <div className="mt-6">
                <VirtualCard card={cards[0]} compact />
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { name: "Salary — Acme Co.", amount: "+$5,200.00", tag: "Income" },
                  { name: "Whole Foods", amount: "−$84.32", tag: "Food" },
                  { name: "Maya Rodriguez", amount: "−$120.00", tag: "Transfer" },
                ].map((r) => (
                  <div key={r.name} className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2.5 text-sm">
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.tag}</div>
                    </div>
                    <div className="tabular font-medium">{r.amount}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto grid max-w-7xl grid-cols-3 items-center gap-6 px-4 py-6 sm:px-6 md:grid-cols-6">
            {trustLogos.map((l) => (
              <div key={l} className="text-center font-display text-xs font-semibold tracking-[0.2em] text-muted-foreground/70">
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Features</div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Everything your money needs. Nothing it doesn't.</h2>
          <p className="mt-3 text-muted-foreground">A focused set of tools designed around how you actually live and work.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Card showcase */}
      <section className="relative overflow-hidden border-y border-border/60 bg-muted/30">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Cards</div>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">A card for every part of your life.</h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Spin up virtual cards for subscriptions, set spending limits per merchant, and freeze instantly with a single tap.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Per-card daily and monthly limits", "Instant freeze and replace", "Apple Pay & Google Pay supported"].map((i) => (
                <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-success" /> {i}</li>
              ))}
            </ul>
            <Button className="mt-7" asChild>
              <Link to="/cards">Explore cards <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-12 -z-10 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl" />
            <div className="relative h-[320px] w-full max-w-md">
              <div className="absolute left-0 top-12 w-[88%] rotate-[-6deg] transition-transform hover:rotate-[-3deg]">
                <VirtualCard card={cards[2]} />
              </div>
              <div className="absolute left-6 top-6 w-[88%] rotate-[-2deg] transition-transform hover:rotate-0">
                <VirtualCard card={cards[1]} />
              </div>
              <div className="absolute right-0 top-0 w-[88%] rotate-[4deg] transition-transform hover:rotate-[2deg]">
                <VirtualCard card={cards[0]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Lock, label: "256-bit encryption" },
                { icon: Shield, label: "Biometric login" },
                { icon: Check, label: "FDIC-equivalent*" },
                { icon: Star, label: "24/7 monitoring" },
              ].map((b) => (
                <div key={b.label} className="rounded-xl border border-border bg-background/60 p-4">
                  <b.icon className="h-5 w-5 text-accent" />
                  <div className="mt-3 text-sm font-medium">{b.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
          <div className="order-first lg:order-last">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Security</div>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Trust built into every layer.</h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Every transfer is signed, encrypted and monitored. We watch your account so you don't have to — and we give you the controls when something looks off.
            </p>
            <Button variant="outline" className="mt-6" asChild>
              <Link to="/security">View security center <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Loved by people who care about their money.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-xs font-semibold text-white">{t.avatar}</div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border card-gradient p-10 text-white sm:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Open a VaultPay account in 2 minutes.</h2>
            <p className="mt-3 text-white/80">No paperwork. No hidden fees. Just a calmer relationship with your money.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/dashboard">Open the demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10" asChild>
                <Link to="/transfer">Try a transfer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">FAQ</div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          * This is a UI/UX portfolio prototype. VaultPay is not a real bank and does not hold funds.
        </p>
      </section>

      <MarketingFooter />
    </div>
  );
}
