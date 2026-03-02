"use client";

interface Project {
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

interface ProjectShowcaseProps {
  projects: Project[];
  caption?: string;
}

export default function ProjectShowcase({
  projects,
  caption,
}: ProjectShowcaseProps) {
  return (
    <div className="my-8">
      {caption && (
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
          {caption}
        </p>
      )}
      <div className={`grid gap-4 ${projects.length === 1 ? "" : "sm:grid-cols-2"}`}>
        {projects.map((project) => (
          <a
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <div className="aspect-[16/9] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://image.thum.io/get/width/640/crop/400/${project.url}`}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="px-4 py-3">
              <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100 group-hover:underline">
                {project.title}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="flex gap-1.5 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
