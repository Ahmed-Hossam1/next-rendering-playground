import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-20 lg:px-20">
      <Link href="/blogs" className="gradient-text bg-clip-text underline text-transparent bg-gradient-to-r from-blue-400 to-violet-400 text-5xl font-extrabold tracking-tight lg:text-7xl"> go to Blogs </Link>
    </main>
  );
}
