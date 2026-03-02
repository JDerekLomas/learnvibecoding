interface CalloutProps {
  type?: "info" | "tip" | "warning" | "exercise";
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
  tip: "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
  warning:
    "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
  exercise:
    "border-violet-300 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30",
};

const icons = {
  info: "i",
  tip: "~",
  warning: "!",
  exercise: ">",
};

export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  return (
    <div className={`border-l-4 rounded-r-lg p-4 my-6 ${styles[type]}`}>
      {title && (
        <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-xs font-mono">
            {icons[type]}
          </span>
          {title}
        </p>
      )}
      <div className="text-sm text-zinc-700 dark:text-zinc-300 [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
