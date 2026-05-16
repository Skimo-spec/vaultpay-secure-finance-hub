import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, ShieldCheck, CreditCard, Tag, CheckCheck, BellOff } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications as initial, type Notif } from "@/lib/mock-data";
import { formatRelative } from "@/lib/format";
import { EmptyState } from "@/components/vp/EmptyState";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — VaultPay" },
      { name: "description", content: "Stay updated on payments, security alerts and account activity." },
    ],
  }),
  component: NotificationsPage,
});

const iconMap = {
  Payments: CreditCard,
  Security: ShieldCheck,
  Account: Bell,
  Promotions: Tag,
} as const;

const toneMap = {
  Payments: "text-primary bg-primary/10",
  Security: "text-warning bg-warning/10",
  Account: "text-muted-foreground bg-muted",
  Promotions: "text-accent bg-accent/10",
} as const;

function NotificationsPage() {
  const [items, setItems] = useState<Notif[]>(initial);

  function markAll() {
    setItems((xs) => xs.map((n) => ({ ...n, read: true })));
  }

  const tabs = ["All", "Payments", "Security", "Account", "Promotions"] as const;

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Notifications</h1>
            <p className="text-sm text-muted-foreground">{items.filter((n) => !n.read).length} unread</p>
          </div>
          <Button variant="outline" size="sm" onClick={markAll}>
            <CheckCheck className="mr-1.5 h-4 w-4" /> Mark all read
          </Button>
        </div>

        <Tabs defaultValue="All">
          <TabsList className="w-full justify-start overflow-x-auto">
            {tabs.map((t) => (
              <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => {
            const filtered = t === "All" ? items : items.filter((n) => n.category === t);
            return (
              <TabsContent key={t} value={t} className="mt-4">
                {filtered.length === 0 ? (
                  <EmptyState icon={BellOff} title="You're all caught up" description="No notifications in this category." />
                ) : (
                  <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
                    {filtered.map((n) => {
                      const Icon = iconMap[n.category];
                      return (
                        <li key={n.id} className={cn("flex gap-3 p-4 transition-colors", !n.read && "bg-primary/[0.02]")}>
                          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", toneMap[n.category])}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium">{n.title}</div>
                              {!n.read && <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{n.body}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{n.category} · {formatRelative(n.date)}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </AppShell>
  );
}
