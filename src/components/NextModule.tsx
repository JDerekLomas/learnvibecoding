import Link from "next/link";

interface NextModuleProps {
  href: string;
  label: string;
  description?: string;
}

export default function NextModule({ href, label, description }: NextModuleProps) {
  return (
    <div className="mt-12 pt-8 border-t border-stone-200">
      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
        Next up
      </p>
      <Link
        href={href}
        className="group flex items-center justify-between rounded-2xl border-2 border-stone-200 bg-stone-50 p-5 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-200/40 transition-all duration-200"
      >
        <div>
          <p className="font-extrabold text-stone-900 group-hover:text-indigo-600 transition-colors">
            {label}
          </p>
          {description && (
            <p className="text-sm font-medium text-stone-500 mt-1">
              {description}
            </p>
          )}
        </div>
        <span className="text-stone-400 group-hover:text-indigo-500 transition-colors text-xl">
          &rarr;
        </span>
      </Link>
    </div>
  );
}
