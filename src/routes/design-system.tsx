import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { GlassCard } from "@/components/vp/GlassCard";
import { Info, AlertTriangle, Check } from "lucide-react";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design system — VaultPay" },
      { name: "description", content: "VaultPay design tokens, components and patterns." },
    ],
  }),
  component: DesignSystem,
});

const colors = [
  ["background", "Background"],
  ["foreground", "Foreground"],
  ["primary", "Primary · Deep blue"],
  ["accent", "Accent · Teal"],
  ["success", "Success"],
  ["warning", "Warning"],
  ["destructive", "Destructive"],
  ["muted", "Muted"],
  ["border", "Border"],
  ["card", "Card"],
];

const spacing = [1, 2, 3, 4, 6, 8, 12, 16];

function DesignSystem() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-12 p-4 sm:p-6">
        <header>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Design system</h1>
          <p className="mt-2 text-sm text-muted-foreground">The building blocks behind VaultPay. Premium, accessible, restrained.</p>
        </header>

        <Section title="Typography" subtitle="Inter for UI, Space Grotesk for display & numbers">
          <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <div className="font-display text-5xl font-semibold tracking-tight">Display 5xl</div>
            <div className="font-display text-3xl font-semibold tracking-tight">Heading 3xl</div>
            <div className="font-display text-xl font-semibold">Subheading xl</div>
            <div className="text-base">Body — Inter at 16px is the workhorse for everything legible.</div>
            <div className="text-sm text-muted-foreground">Small — secondary explanations and metadata.</div>
            <div className="tabular font-display text-2xl">$24,582.40 — tabular numerals</div>
          </div>
        </Section>

        <Section title="Color" subtitle="Semantic tokens defined in oklch · adapt to light & dark">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {colors.map(([token, label]) => (
              <div key={token} className="overflow-hidden rounded-xl border border-border">
                <div className="h-20" style={{ background: `var(--color-${token})` }} />
                <div className="space-y-0.5 p-3">
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-muted-foreground">--color-{token}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-6">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section title="Inputs">
          <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
            <div><Label>Text</Label><Input className="mt-1" placeholder="Type here" /></div>
            <div><Label>Email</Label><Input className="mt-1" type="email" placeholder="you@example.com" /></div>
            <div className="sm:col-span-2"><Label>Textarea</Label><Textarea className="mt-1" placeholder="Add a note…" /></div>
          </div>
        </Section>

        <Section title="Cards & glass">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-sm font-semibold">Standard card</div>
              <p className="mt-1 text-sm text-muted-foreground">Default container with border and card surface.</p>
            </div>
            <GlassCard className="p-6">
              <div className="text-sm font-semibold">Glass card</div>
              <p className="mt-1 text-sm text-muted-foreground">Translucent with blur. Use for hero & balance surfaces.</p>
            </GlassCard>
          </div>
        </Section>

        <Section title="Alerts">
          <div className="space-y-3">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Your statement is ready to download.</AlertDescription>
            </Alert>
            <Alert className="border-warning/30 bg-warning/10 text-warning [&>svg]:text-warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Review needed</AlertTitle>
              <AlertDescription>Unusual sign-in from a new device.</AlertDescription>
            </Alert>
            <Alert className="border-success/30 bg-success/10 text-success [&>svg]:text-success">
              <Check className="h-4 w-4" />
              <AlertTitle>All good</AlertTitle>
              <AlertDescription>Two-factor authentication is active.</AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section title="Badges & status">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-6">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Failed</Badge>
            <Badge variant="outline">Outline</Badge>
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">Completed</span>
            <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning">Pending</span>
            <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-medium text-destructive">Failed</span>
          </div>
        </Section>

        <Section title="Modal">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm action</DialogTitle>
                  <DialogDescription>This is how confirmation dialogs look across the app. Concise, calm, clear.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Section>

        <Section title="Spacing scale">
          <div className="flex items-end gap-4 rounded-2xl border border-border bg-card p-6">
            {spacing.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className="rounded bg-primary" style={{ width: s * 4, height: s * 4 }} />
                <div className="text-xs text-muted-foreground tabular">{s}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
