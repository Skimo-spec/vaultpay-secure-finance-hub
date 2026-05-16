import * as React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-2xl shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
