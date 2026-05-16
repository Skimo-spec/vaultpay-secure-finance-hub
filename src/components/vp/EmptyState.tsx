import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: { label: string; onClick?: () => void };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center", className)}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-soft">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && (
        <Button className="mt-5" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
