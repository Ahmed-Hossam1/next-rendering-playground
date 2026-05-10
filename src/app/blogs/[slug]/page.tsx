import Link from "next/link";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blogs"
          className="mb-12 inline-flex items-center text-sm font-semibold text-zinc-400 hover:text-blue-400 transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blogs
        </Link>

        <article className="glass rounded-3xl p-10 lg:p-16">
          <header className="mb-12">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-500">Full Article</span>
            <h1 className="mt-4 text-4xl font-extrabold text-white lg:text-6xl">
              {slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-tr from-blue-500 to-violet-500" />
              <div>
                <p className="font-bold text-white">Antigravity AI</p>
                <p className="text-sm text-zinc-500">Published on May 10, 2026</p>
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none text-zinc-300">
            <p className="text-xl leading-relaxed">
              This is the full view of the blog post. When you navigate here directly or refresh the page from the modal, Next.js renders this full page instead of the intercepted modal.
            </p>
            <p className="mt-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="my-12 h-64 w-full rounded-2xl bg-linear-to-br from-zinc-800 to-zinc-900" />
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}