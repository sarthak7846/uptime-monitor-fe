import { NotificationChannel } from "@/app/(signed)/notifications/types";

const channelStyles: Record<NotificationChannel, { badge: string; dot: string; label?: string }> = {
  EMAIL: {
    badge:
      "border-emerald-200/80 bg-emerald-50 text-emerald-800 ring-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25",
    dot: "bg-emerald-500",
  },
  SLACK: {
    badge:
      "border-violet-200/80 bg-violet-50 text-violet-800 ring-violet-500/20 dark:border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-500/25",
    dot: "bg-violet-500",
    label: "Coming soon",
  },
  WEBHOOK: {
    badge:
      "border-sky-200/80 bg-sky-50 text-sky-800 ring-sky-500/20 dark:border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/25",
    dot: "bg-sky-500",
    label: "Coming soon",
  },
};

const ChannelBadge = ({ channel }: { channel: NotificationChannel }) => {
  const styles = channelStyles[channel];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ring-1 ring-inset ${styles.badge}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`} aria-hidden />
      <span>{channel}</span>
      {styles.label && <span className="font-normal normal-case opacity-80">· {styles.label}</span>}
    </span>
  );
};

export default ChannelBadge;
