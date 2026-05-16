import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Snowflake, Eye, EyeOff, RefreshCw, Plus, CreditCard as CardIcon, ShieldCheck, Wifi, Globe, MoreHorizontal } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { VirtualCard } from "@/components/vp/VirtualCard";
import { MoneyAmount } from "@/components/vp/MoneyAmount";
import { cards as initialCards } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "Cards — VaultPay" },
      { name: "description", content: "Manage your VaultPay virtual and physical cards. Freeze, set limits, replace." },
    ],
  }),
  component: CardsPage,
});

const spendByMerchant = [
  { name: "Whole Foods", value: 220 },
  { name: "Amazon", value: 412 },
  { name: "Apple", value: 1249 },
  { name: "Uber", value: 88 },
  { name: "Netflix", value: 16 },
  { name: "Costco", value: 211 },
];

function CardsPage() {
  const [cards, setCards] = useState(initialCards);
  const [activeId, setActiveId] = useState(cards[0].id);
  const active = cards.find((c) => c.id === activeId)!;
  const [reveal, setReveal] = useState(false);
  const [replaceOpen, setReplaceOpen] = useState(false);
  const [dailyLimit, setDailyLimit] = useState([800]);
  const [monthlyLimit, setMonthlyLimit] = useState([5000]);

  function toggleFreeze() {
    setCards((cs) => cs.map((c) => (c.id === activeId ? { ...c, frozen: !c.frozen } : c)));
    toast(active.frozen ? "Card unfrozen" : "Card frozen", {
      description: active.frozen ? "Transactions are allowed again." : "All transactions are blocked until you unfreeze.",
    });
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Cards</h1>
            <p className="text-sm text-muted-foreground">Virtual & physical · {cards.length} active</p>
          </div>
          <Button><Plus className="mr-1.5 h-4 w-4" /> New virtual card</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          {/* Card list */}
          <div className="space-y-3">
            {cards.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "block w-full text-left transition-all",
                  activeId === c.id ? "scale-100" : "scale-[0.97] opacity-80 hover:opacity-100",
                )}
              >
                <VirtualCard card={c} reveal={reveal && activeId === c.id} />
                <div className="mt-2 flex items-center justify-between px-1 text-xs text-muted-foreground">
                  <span>•• {c.last4} · {c.type}</span>
                  <span className="tabular">
                    <MoneyAmount value={c.monthSpend} size="sm" /> / ${c.monthLimit.toLocaleString()}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-2">
              <Button variant="ghost" size="sm" onClick={() => setReveal((v) => !v)}>
                {reveal ? <EyeOff className="mr-1.5 h-4 w-4" /> : <Eye className="mr-1.5 h-4 w-4" />} {reveal ? "Hide" : "Reveal"} details
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleFreeze}>
                <Snowflake className="mr-1.5 h-4 w-4" /> {active.frozen ? "Unfreeze" : "Freeze"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setReplaceOpen(true)}>
                <RefreshCw className="mr-1.5 h-4 w-4" /> Replace
              </Button>
              <div className="ml-auto">
                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display text-base font-semibold">Spending limits</h3>
                <p className="text-xs text-muted-foreground">Apply to this card only</p>
                <div className="mt-4 space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <Label>Daily limit</Label>
                      <span className="tabular font-medium">${dailyLimit[0].toLocaleString()}</span>
                    </div>
                    <Slider min={0} max={5000} step={50} value={dailyLimit} onValueChange={setDailyLimit} className="mt-3" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <Label>Monthly limit</Label>
                      <span className="tabular font-medium">${monthlyLimit[0].toLocaleString()}</span>
                    </div>
                    <Slider min={0} max={20000} step={100} value={monthlyLimit} onValueChange={setMonthlyLimit} className="mt-3" />
                  </div>
                  <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                    Current month spend: <span className="tabular font-medium text-foreground">${active.monthSpend.toLocaleString()}</span> of ${monthlyLimit[0].toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display text-base font-semibold">Security</h3>
                <p className="text-xs text-muted-foreground">Toggle what this card can do</p>
                <div className="mt-4 space-y-3">
                  {[
                    { icon: Wifi, label: "Contactless payments", on: true },
                    { icon: Globe, label: "Online purchases", on: true },
                    { icon: CardIcon, label: "ATM withdrawals", on: true },
                    { icon: ShieldCheck, label: "International transactions", on: false },
                  ].map((s) => (
                    <SwitchRow key={s.label} icon={s.icon} label={s.label} defaultChecked={s.on} />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold">Card analytics</h3>
                  <p className="text-xs text-muted-foreground">Top merchants this month</p>
                </div>
                <div className="text-xs text-muted-foreground tabular">
                  Total <span className="font-medium text-foreground">${spendByMerchant.reduce((s, x) => s + x.value, 0).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendByMerchant} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="var(--color-chart-2)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={replaceOpen} onOpenChange={setReplaceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace this card?</DialogTitle>
            <DialogDescription>
              Your current card will stop working immediately. A new card with the same limits will be issued — virtual cards are ready in seconds, physical cards arrive in 3–5 days.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplaceOpen(false)}>Cancel</Button>
            <Button onClick={() => { setReplaceOpen(false); toast.success("New card requested"); }}>Replace card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function SwitchRow({ icon: Icon, label, defaultChecked }: { icon: React.ComponentType<{ className?: string }>; label: string; defaultChecked: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
      </div>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}
