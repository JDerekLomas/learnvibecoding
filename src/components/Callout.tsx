interface CalloutProps {
  type?: "info" | "tip" | "warning" | "exercise";
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: "border-blue-200 bg-blue-50",
  tip: "border-emerald-200 bg-emerald-50",
  warning: "border-amber-200 bg-amber-50",
  exercise: "border-violet-200 bg-violet-50",
};

const iconColors = {
  info: "bg-blue-500 text-white",
  tip: "bg-emerald-500 text-white",
  warning: "bg-amber-500 text-white",
  exercise: "bg-violet-500 text-white",
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
    <div className={`border-l-4 rounded-r-xl p-5 my-6 ${styles[type]}`}>
      {title && (
        <p className="font-bold text-stone-900 mb-1.5 flex items-center gap-2">
          <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${iconColors[type]}`}>
            {icons[type]}
          </span>
          {title}
        </p>
      )}
      <div className="text-sm text-stone-600 [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
