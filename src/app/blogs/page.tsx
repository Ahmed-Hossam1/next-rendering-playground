import Link from "next/link";

const blogs = [
  {
    slug: "modern-interception",
    title: "Mastering Interception",
    description: "Learn how to build seamless modals using Next.js 15+ intercepting routes.",
    date: "May 10, 2026",
  },
  {
    slug: "aesthetic-ui-design",
    title: "Aesthetic UI Design",
    description: "The secret to creating premium dark-themed interfaces that wow your users.",
    date: "May 08, 2026",
  },
  {
    slug: "performance-optimization",
    title: "Performance First",
    description: "Optimizing your Next.js application for lightning fast interactions.",
    date: "May 05, 2026",
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <header className="mb-16 text-center lg:text-left">
          <h1 className="gradient-text text-5xl font-extrabold tracking-tight lg:text-7xl">
            Mini Blog Project
          </h1>
          <p className="mt-4 text-xl text-zinc-400">
            Showcasing Next.js Intercepting Routes & Parallel Routes.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="glass glass-hover group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8"
            >
              <div className="relative z-10">
                <span className="text-sm font-medium text-blue-400">{blog.date}</span>
                <h2 className="mt-4 text-2xl font-bold text-white group-hover:text-blue-400">
                  {blog.title}
                </h2>
                <p className="mt-3 text-zinc-400 line-clamp-2">
                  {blog.description}
                </p>
              </div>
              
              <div className="relative z-10 mt-8 flex items-center text-sm font-semibold text-white">
                Read Article
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Decorative gradient blur */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}