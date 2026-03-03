import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 mb-6 mt-10 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-stone-900 mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed text-stone-600 mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-stone-600">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-lg text-stone-600">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-stone-300 pl-4 italic text-stone-500 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => {
      const isBlock =
        typeof children === "string" && children.includes("\n");
      if (isBlock) {
        return (
          <code
            className="block bg-stone-100 rounded-xl p-4 text-sm font-mono overflow-x-auto my-4"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code
          className="bg-stone-100 rounded px-1.5 py-0.5 text-sm font-mono text-stone-800"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-stone-100 rounded-xl p-4 text-sm font-mono overflow-x-auto my-4">
        {children}
      </pre>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-600 transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    hr: () => (
      <hr className="border-stone-200 my-8" />
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-stone-900">
        {children}
      </strong>
    ),
    ...components,
  };
}
