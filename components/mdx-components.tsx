import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Pemetaan elemen MDX → gaya design system.
 * Sengaja minimal: post Log berisi paragraf, penekanan, daftar, dan tautan.
 */
export const mdxComponents: MDXComponents = {
  p: (props) => <p className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  ul: (props) => (
    <ul className="list-disc space-y-2 pl-5 leading-relaxed" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal space-y-2 pl-5 leading-relaxed" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-10 text-(length:--step-1) font-semibold" {...props} />
  ),
  h3: (props) => <h3 className="mt-8 font-semibold" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-indigo-brand bg-secondary/60 border-l-[3px] px-5 py-4 leading-relaxed"
      {...props}
    />
  ),
  a: ({ href, ...props }) => {
    const target = href ?? "#";
    const className =
      "text-ink decoration-border hover:text-coral-ink hover:decoration-coral-ink underline underline-offset-4";

    if (target.startsWith("/")) {
      return <Link href={target} className={className} {...props} />;
    }
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      />
    );
  },
};
