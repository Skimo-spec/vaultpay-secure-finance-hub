import * as React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Coffee,
  ShoppingBag,
  Bus,
  Receipt,
  Film,
  HeartPulse,
  RefreshCcw,
  Repeat2,
} from "lucide-react";
import type { Tx, TxCategory } from "@/lib/mock-data";
import { MoneyAmount } from "./MoneyAmount";
import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";

const iconMap: Record<TxCategory, React.ComponentType<{ className?: string }>> = {
  Food: Coffee,
  Shopping: ShoppingBag,
  Transport: Bus,
  Bills: Receipt,
  Entertainment: Film,
  Health: HeartPulse,
  Income: ArrowDownLeft,
  Transfer: Repeat2,
  Subscriptions: RefreshCcw,
};

export function TransactionRow({ tx, className }: { tx: Tx; className?: string }) {
  const Icon = iconMap[tx.category] ?? ArrowUpRight;
  const isIn = tx.amount > 0;
  return (
    <div className={cn("flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-muted/50", className)}>
      <div className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
        isIn ? "bg-success/10 text-success" : "bg-muted text-foreground",
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{tx.merchant}</p>
          {tx.status === "pending" && (
            <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-medium text-warning">Pending</span>
          )}
          {tx.status === "failed" && (
            <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-medium text-destructive">Failed</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{tx.category} · {formatRelative(tx.date)}</p>
      </div>
      <MoneyAmount value={tx.amount} signed size="sm" className={cn(!isIn && "text-foreground")} />
    </div>
  );
}
