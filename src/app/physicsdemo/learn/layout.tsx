import Link from "next/link";
import LearnProgress from "@/components/physics/LearnProgress";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/physicsdemo"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-400 hover:text-stone-600 transition-colors no-underline"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Hub
        </Link>
        <LearnProgress />
      </div>
      <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-sm p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}
