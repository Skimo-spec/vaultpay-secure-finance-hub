import { cn } from "@/lib/utils";
import type { Card } from "@/lib/mock-data";
import { Wifi, Snowflake } from "lucide-react";

const colorMap: Record<Card["color"], string> = {
  midnight:
    "card-gradient",
  teal: "bg-[linear-gradient(135deg,oklch(0.45_0.13_200),oklch(0.32_0.09_240))]",
  metal:
    "bg-[linear-gradient(135deg,oklch(0.35_0.02_260),oklch(0.22_0.02_260))]",
};

export function VirtualCard({
  card,
  reveal,
  className,
  compact,
}: {
  card: Card;
  reveal?: boolean;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl text-white shadow-glow",
        colorMap[card.color],
        compact ? "aspect-[1.6/1] p-4" : "aspect-[1.586/1] p-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />

      {card.frozen && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-1 text-white/90">
            <Snowflake className="h-8 w-8" />
            <span className="text-xs font-medium">Frozen</span>
          </div>
        </div>
      )}

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">VaultPay</div>
            <div className="text-xs text-white/70">{card.type}</div>
          </div>
          <Wifi className="h-5 w-5 -rotate-90 text-white/70" />
        </div>

        <div className="space-y-3">
          <div className="tabular font-display text-lg sm:text-xl tracking-[0.2em]">
            {reveal ? card.number : `•••• •••• •••• ${card.last4}`}
          </div>
          <div className="flex items-end justify-between text-xs text-white/80">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/50">Holder</div>
              <div className="font-medium">{card.name}</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/50">Expires</div>
              <div className="tabular font-medium">{card.exp}</div>
            </div>
            <div className="font-display text-base italic font-bold">{card.network}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
