const EnabledBadge = ({ enabled }: { enabled: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
      enabled
        ? "border-emerald-200/80 bg-emerald-50 text-emerald-800 ring-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25"
        : "border-border bg-muted text-muted-foreground ring-border"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 shrink-0 rounded-full ${enabled ? "bg-emerald-500" : "bg-muted-foreground"}`}
      aria-hidden
    />
    {enabled ? "Enabled" : "Disabled"}
  </span>
);

export default EnabledBadge;
