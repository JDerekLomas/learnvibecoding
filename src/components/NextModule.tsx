import Link from "next/link";

interface NextModuleProps {
  href: string;
  label: string;
  description?: string;
}

export default function NextModule({ href, label, description }: NextModuleProps) {
  return (
    <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-2">
        Next up
      </p>
      <Link
        href={href}
        className="group flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
      >
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
            {label}
          </p>
          {description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {description}
            </p>
          )}
        </div>
        <span className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors text-xl">
          &rarr;
        </span>
      </Link>
    </div>
  );
}
