import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/format";

export function MoneyAmount({
  value,
  currency = "USD",
  className,
  signed,
  size = "md",
}: {
  value: number;
  currency?: string;
  className?: string;
  signed?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
    xl: "text-4xl",
    "2xl": "text-6xl",
  };
  const tone = signed ? (value > 0 ? "text-success" : value < 0 ? "text-foreground" : "") : "";
  const prefix = signed && value > 0 ? "+" : "";
  return (
    <span className={cn("tabular font-display font-semibold", sizes[size], tone, className)}>
      {prefix}
      {formatMoney(value, currency)}
    </span>
  );
}
