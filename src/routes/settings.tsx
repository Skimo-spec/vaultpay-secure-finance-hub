import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — VaultPay" },
      { name: "description", content: "Manage your profile, notifications, appearance and privacy." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your VaultPay experience.</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <form
              onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}
              className="space-y-5 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-xl font-semibold text-white">AM</div>
                <div>
                  <div className="font-medium">Alex Morgan</div>
                  <div className="text-xs text-muted-foreground">VaultPay Plus member since 2024</div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" defaultValue="Alex Morgan" />
                <Field label="Username" defaultValue="alexmorgan" />
                <Field label="Email" defaultValue="alex.morgan@vaultpay.demo" type="email" />
                <Field label="Phone" defaultValue="+1 (555) 010-9012" />
              </div>
              <Button type="submit">Save changes</Button>
            </form>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-2 rounded-2xl border border-border bg-card p-6">
            {[
              ["All transactions", "Get notified on every payment in or out."],
              ["Large transactions", "Anything over $500."],
              ["Security alerts", "Sign-ins, fraud and device changes. Recommended."],
              ["Weekly summary", "A digest of your spending every Sunday."],
              ["Product updates", "New features and announcements."],
            ].map(([label, desc], i) => (
              <SettingsToggle key={label} label={label} desc={desc} defaultChecked={i < 3} />
            ))}
          </TabsContent>

          <TabsContent value="appearance" className="mt-6 space-y-6 rounded-2xl border border-border bg-card p-6">
            <div>
              <Label>Theme</Label>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "system", label: "System", icon: Monitor },
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value as never)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5",
                      theme === t.value ? "border-primary ring-2 ring-primary/30" : "border-border",
                    )}
                  >
                    <t.icon className="h-4 w-4 text-muted-foreground" />
                    <div className="mt-3 text-sm font-medium">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6 space-y-2 rounded-2xl border border-border bg-card p-6">
            {[
              ["Hide balance on home", "Always blur balance until you tap to reveal."],
              ["Anonymous analytics", "Help us improve VaultPay with anonymized usage data."],
              ["Personalized offers", "Use my spending patterns to recommend rewards."],
            ].map(([l, d], i) => (
              <SettingsToggle key={l} label={l} desc={d} defaultChecked={i === 1} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input className="mt-1" defaultValue={defaultValue} type={type} />
    </div>
  );
}

function SettingsToggle({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-4 py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
