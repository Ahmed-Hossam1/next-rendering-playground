"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function BlogModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  return (
    <Modal>
      <div className="glass overflow-hidden rounded-3xl text-white">
        {/* Modal Header */}
        <div className="relative h-48 w-full bg-linear-to-br from-blue-600 to-violet-700 p-8">
          <div className="absolute right-4 top-4">
            <button
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/40 transition-colors cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Quick Preview
          </span>
          <h2 className="mt-4 text-3xl font-bold">
            {slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          <p className="text-lg leading-relaxed text-zinc-300">
            This is a preview of the blog post. Intercepting routes allow you to
            show this content in a modal while keeping the list visible in the
            background.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={`/blogs/${slug}`}
              className="flex-1 rounded-2xl bg-blue-600 px-6 py-4 text-center font-bold text-white hover:bg-blue-500 transition-colors"
            >
              Read Full Article
            </a>
            <button
              onClick={() => router.back()}
              className="flex-1 rounded-2xl bg-zinc-800 px-6 py-4 text-center font-bold text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
