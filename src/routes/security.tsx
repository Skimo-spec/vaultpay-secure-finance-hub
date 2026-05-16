import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Smartphone, Key, AlertTriangle, LogOut, Check } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { loginHistory, devices } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — VaultPay" },
      { name: "description", content: "Manage 2FA, devices, login history and password. Trust built into every layer." },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  const score = 86;
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Security center</h1>
          <p className="text-sm text-muted-foreground">Trust built into every layer of your account.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Score */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-base font-semibold">Security score</h3>
            <p className="text-xs text-muted-foreground">Updated continuously</p>
            <div className="mt-6 flex flex-col items-center">
              <ScoreRing value={score} />
              <div className="mt-4 text-sm font-medium text-success">Strong</div>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                Enable biometric login to reach 100.
              </p>
            </div>
          </div>

          {/* 2FA */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-base font-semibold">Two-factor authentication</h3>
            <p className="text-xs text-muted-foreground">Add a second layer to every sign-in</p>
            <div className="mt-4 space-y-3">
              <TwoFactorRow
                icon={Smartphone}
                title="Authenticator app"
                desc="Use Google Authenticator, 1Password or Authy."
                enabled
              />
              <TwoFactorRow icon={Key} title="SMS code" desc="Get a 6-digit code via text message." enabled={false} />
              <TwoFactorRow icon={ShieldCheck} title="Biometric login" desc="Face ID and Touch ID on iOS / Android." enabled={false} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Login history */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-base font-semibold">Recent sign-ins</h3>
            <p className="text-xs text-muted-foreground">Review where your account has been accessed</p>
            <ul className="mt-4 divide-y divide-border">
              {loginHistory.map((l) => (
                <li key={l.id} className="flex items-start gap-3 py-3 text-sm">
                  <div className={cn(
                    "mt-0.5 h-2 w-2 rounded-full",
                    l.status === "current" && "bg-success",
                    l.status === "trusted" && "bg-muted-foreground/60",
                    l.status === "flagged" && "bg-destructive",
                  )} />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{l.device}</div>
                    <div className="text-xs text-muted-foreground">{l.location} · {l.ip} · {l.time}</div>
                  </div>
                  {l.status === "current" && <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">This device</span>}
                  {l.status === "flagged" && <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-medium text-destructive">Review</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Devices */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-semibold">Trusted devices</h3>
                <p className="text-xs text-muted-foreground">Revoke any device you don't recognize</p>
              </div>
              <Button variant="outline" size="sm">Sign out all</Button>
            </div>
            <ul className="mt-4 space-y-2">
              {devices.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2.5 text-sm">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.last}</div>
                  </div>
                  {d.trusted ? (
                    <Button variant="ghost" size="sm" onClick={() => toast("Device signed out")}><LogOut className="mr-1.5 h-3.5 w-3.5" /> Revoke</Button>
                  ) : (
                    <Button variant="destructive" size="sm" onClick={() => toast.success("Device blocked")}>Block</Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Change password */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-base font-semibold">Change password</h3>
            <p className="text-xs text-muted-foreground">Use a strong, unique password.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); }}
              className="mt-4 space-y-3"
            >
              <div>
                <Label htmlFor="cur">Current password</Label>
                <Input id="cur" type="password" placeholder="••••••••" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" placeholder="At least 12 characters" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cnf">Confirm new password</Label>
                <Input id="cnf" type="password" placeholder="Re-enter password" className="mt-1" />
              </div>
              <Button type="submit">Update password</Button>
            </form>
          </div>

          {/* Fraud alerts */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-base font-semibold">Fraud alerts</h3>
            <p className="text-xs text-muted-foreground">Recent activity flagged by our system</p>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
                <div className="flex-1">
                  <div className="font-medium">Unusual login attempt — Berlin, DE</div>
                  <div className="text-xs text-muted-foreground">3 days ago · Blocked automatically</div>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">It wasn't me</Button>
                    <Button size="sm" variant="ghost">Dismiss</Button>
                  </div>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-success/30 bg-success/10 p-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-success" />
                <div>
                  <div className="font-medium">2FA enabled successfully</div>
                  <div className="text-xs text-muted-foreground">5 days ago</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="var(--color-muted)" strokeWidth="12" fill="none" />
        <circle
          cx="70"
          cy="70"
          r={r}
          stroke="var(--color-success)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-3xl font-semibold tabular">{value}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">of 100</div>
      </div>
    </div>
  );
}

function TwoFactorRow({ icon: Icon, title, desc, enabled }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; enabled: boolean }) {
  const [on, setOn] = useState(enabled);
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </div>
      </div>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}
