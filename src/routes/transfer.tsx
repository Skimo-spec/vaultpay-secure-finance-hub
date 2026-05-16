import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Shield,
  CheckCircle2,
  Download,
  Share2,
  Loader2,
  AlertTriangle,
  WifiOff,
  Clock,
  UserPlus,
  Plus,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StepIndicator } from "@/components/vp/StepIndicator";
import { MoneyAmount } from "@/components/vp/MoneyAmount";
import { GlassCard } from "@/components/vp/GlassCard";
import { EmptyState } from "@/components/vp/EmptyState";
import { beneficiaries, recentRecipients, balance } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/transfer")({
  head: () => ({
    meta: [
      { title: "Send money — VaultPay" },
      { name: "description", content: "Send money safely. Choose a recipient, review the details, confirm in one tap." },
    ],
  }),
  component: TransferPage,
});

const steps = ["Recipient", "Amount", "Review", "Done"];

type Recipient = (typeof beneficiaries)[number];

function TransferPage() {
  const [step, setStep] = useState(0);
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const amountNum = parseFloat(amount || "0") || 0;
  const fee = amountNum > 0 ? (currency === "USD" ? 0 : Math.max(0.5, amountNum * 0.005)) : 0;
  const total = amountNum + fee;
  const insufficient = total > balance.available;

  const filtered = useMemo(
    () =>
      beneficiaries.filter(
        (b) =>
          !query ||
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.handle.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  function confirm() {
    setStatus("processing");
    setStep(3);
    setTimeout(() => {
      // simulate occasional failure if amount ends in 7
      if (amountNum.toString().endsWith("7")) setStatus("failed");
      else setStatus("success");
    }, 1800);
  }

  function reset() {
    setStep(0);
    setRecipient(null);
    setAmount("");
    setNote("");
    setStatus("idle");
  }

  const refId = useMemo(
    () => `VP-${Math.floor(10000 + Math.random() * 89999)}-${(recipient?.avatar ?? "XX")}`,
    [recipient],
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Send money</h1>
            <p className="text-sm text-muted-foreground">Free between VaultPay accounts · Instant settlement</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Link>
          </Button>
        </div>

        <StepIndicator steps={steps} current={step} />

        <GlassCard className="p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Choose recipient</Label>
                <h2 className="mt-1 font-display text-xl font-semibold">Who are you paying?</h2>
              </div>

              <Tabs defaultValue="saved">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="saved">Beneficiaries</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="search">Search</TabsTrigger>
                </TabsList>

                <TabsContent value="saved" className="mt-4 space-y-2">
                  {beneficiaries.length === 0 ? (
                    <EmptyState
                      icon={UserPlus}
                      title="No saved beneficiaries"
                      description="Add a beneficiary to send money in one tap next time."
                      action={{ label: "Add beneficiary" }}
                    />
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {beneficiaries.map((b) => (
                        <RecipientCard key={b.id} b={b} selected={recipient?.id === b.id} onClick={() => setRecipient(b)} />
                      ))}
                      <button className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/60">
                        <Plus className="h-4 w-4" /> Add new beneficiary
                      </button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recent" className="mt-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {recentRecipients.map((b) => (
                      <RecipientCard key={b.id} b={b} selected={recipient?.id === b.id} onClick={() => setRecipient(b)} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="search" className="mt-4 space-y-3">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      autoFocus
                      placeholder="Search by name, @handle or email…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {filtered.length === 0 ? (
                    <EmptyState icon={Search} title="No matches" description="We couldn't find anyone with that name." />
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {filtered.map((b) => (
                        <RecipientCard key={b.id} b={b} selected={recipient?.id === b.id} onClick={() => setRecipient(b)} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex justify-end">
                <Button disabled={!recipient} onClick={() => setStep(1)}>
                  Continue <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && recipient && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-2.5">
                <Avatar b={recipient} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{recipient.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{recipient.bank} ·•• {recipient.last4}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep(0)}>Change</Button>
              </div>

              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Amount</Label>
                <div className="mt-2 flex items-end gap-3">
                  <span className="font-display text-4xl font-semibold text-muted-foreground">
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$"}
                  </span>
                  <input
                    autoFocus
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                    className="w-full bg-transparent font-display text-5xl font-semibold tabular outline-none placeholder:text-muted-foreground/40"
                  />
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>Available <MoneyAmount value={balance.available} size="sm" className="ml-1" /></span>
                  <div className="flex gap-1.5">
                    {[50, 100, 500].map((v) => (
                      <button key={v} onClick={() => setAmount(String(v))} className="rounded-full border border-border px-2.5 py-0.5 transition-colors hover:bg-muted">
                        ${v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-background/40 p-4 text-sm">
                <Row label="Transfer fee" value={`$${fee.toFixed(2)}`} hint={currency === "USD" ? "Free between VaultPay accounts" : "0.5% FX fee"} />
                <Row label="They receive" value={<MoneyAmount value={amountNum} currency={currency} size="sm" />} />
                <div className="my-1 border-t border-border" />
                <Row label="Total" value={<MoneyAmount value={total} currency={currency} size="sm" />} bold />
              </div>

              {insufficient && (
                <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <div className="font-medium">Insufficient balance</div>
                    <div className="text-xs text-destructive/90">You need ${(total - balance.available).toFixed(2)} more to send this transfer.</div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="note" className="text-xs">Note (optional)</Label>
                <Textarea id="note" placeholder="e.g. Dinner last night" value={note} onChange={(e) => setNote(e.target.value)} className="mt-1" />
              </div>

              <div className="flex justify-between gap-3">
                <Button variant="ghost" onClick={() => setStep(0)}><ArrowLeft className="mr-1.5 h-4 w-4" /> Back</Button>
                <Button disabled={amountNum <= 0 || insufficient} onClick={() => setStep(2)}>
                  Review <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && recipient && (
            <div className="space-y-6">
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Review & confirm</Label>
                <h2 className="mt-1 font-display text-xl font-semibold">Double-check before sending</h2>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-5">
                <div className="flex items-center gap-3">
                  <Avatar b={recipient} large />
                  <div>
                    <div className="font-medium">{recipient.name}</div>
                    <div className="text-xs text-muted-foreground">{recipient.bank} · account •• {recipient.last4}</div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-y-3 text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-right"><MoneyAmount value={amountNum} currency={currency} size="sm" /></span>
                  <span className="text-muted-foreground">Fee</span>
                  <span className="text-right tabular">${fee.toFixed(2)}</span>
                  <span className="text-muted-foreground">Total to debit</span>
                  <span className="text-right font-semibold"><MoneyAmount value={total} currency={currency} size="sm" /></span>
                  <span className="text-muted-foreground">Arriving</span>
                  <span className="text-right inline-flex items-center justify-end gap-1"><Clock className="h-3.5 w-3.5" /> Instant</span>
                  {note && (
                    <>
                      <span className="text-muted-foreground">Note</span>
                      <span className="text-right text-muted-foreground">"{note}"</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-muted-foreground">
                  This transfer is protected by VaultPay's fraud monitoring. Only confirm if you recognize this recipient — bank transfers can't be reversed.
                </p>
              </div>

              <div className="flex justify-between gap-3">
                <Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="mr-1.5 h-4 w-4" /> Back</Button>
                <Button onClick={confirm}>Confirm & send</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 py-2 text-center">
              {status === "processing" && (
                <div className="flex flex-col items-center gap-3 py-10">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <h2 className="font-display text-xl font-semibold">Sending securely…</h2>
                  <p className="max-w-xs text-sm text-muted-foreground">Encrypting and verifying with our partner bank. Please don't refresh.</p>
                </div>
              )}

              {status === "success" && recipient && (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="animate-check-pop flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold">Transfer sent</h2>
                  <p className="text-sm text-muted-foreground">
                    <MoneyAmount value={amountNum} currency={currency} size="sm" /> is on its way to {recipient.name}.
                  </p>
                  <div className="mt-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs tabular text-muted-foreground">
                    Ref · {refId}
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Receipt downloaded (demo)")}>
                      <Download className="mr-1.5 h-4 w-4" /> Download receipt
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast.success("Share link copied (demo)")}>
                      <Share2 className="mr-1.5 h-4 w-4" /> Share
                    </Button>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <Button variant="ghost" onClick={reset}>Send another</Button>
                    <Button onClick={() => navigate({ to: "/dashboard" })}>Back to dashboard</Button>
                  </div>
                </div>
              )}

              {status === "failed" && (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                    <AlertTriangle className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold">Transfer failed</h2>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    We couldn't complete this transfer. No funds left your account. Please try again or contact support.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" onClick={reset}>Start over</Button>
                    <Button onClick={confirm}>Try again</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </GlassCard>

        {/* Error state showcase */}
        <details className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
          <summary className="cursor-pointer font-medium">UX states reference</summary>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <StateCard icon={AlertTriangle} tone="destructive" title="Invalid account details" body="We couldn't verify the recipient. Re-check the account number." />
            <StateCard icon={Clock} tone="warning" title="Session expired" body="For your security, please sign in again to continue." />
            <StateCard icon={WifiOff} tone="muted" title="You're offline" body="Reconnect to send. Your draft is saved." />
            <StateCard icon={AlertTriangle} tone="destructive" title="Insufficient balance" body="Top up or choose a smaller amount." />
          </div>
        </details>
      </div>
    </AppShell>
  );
}

function Avatar({ b, large }: { b: Recipient; large?: boolean }) {
  return (
    <div className={cn(
      "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white font-semibold",
      b.color,
      large ? "h-12 w-12 text-base" : "h-10 w-10 text-sm",
    )}>
      {b.avatar}
    </div>
  );
}

function RecipientCard({ b, selected, onClick }: { b: Recipient; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-card px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft",
        selected ? "border-primary ring-2 ring-primary/30" : "border-border",
      )}
    >
      <Avatar b={b} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{b.name}</div>
        <div className="truncate text-xs text-muted-foreground">{b.bank} ·•• {b.last4}</div>
      </div>
    </button>
  );
}

function Row({ label, value, bold, hint }: { label: string; value: React.ReactNode; bold?: boolean; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className={cn("text-muted-foreground", bold && "text-foreground font-medium")}>{label}</div>
        {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
      </div>
      <div className={cn("tabular", bold && "font-semibold")}>{value}</div>
    </div>
  );
}

function StateCard({ icon: Icon, title, body, tone }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string; tone: "destructive" | "warning" | "muted" }) {
  const tones = {
    destructive: "border-destructive/30 bg-destructive/10 text-destructive",
    warning: "border-warning/30 bg-warning/10 text-warning",
    muted: "border-border bg-muted/40 text-muted-foreground",
  };
  return (
    <div className={cn("flex gap-2.5 rounded-xl border p-3 text-xs", tones[tone])}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="opacity-90">{body}</div>
      </div>
    </div>
  );
}
