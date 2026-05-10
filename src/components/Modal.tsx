"use client";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-2xl px-6 animate-in fade-in zoom-in duration-300">
        {children}
      </div>
    </div>
  );
}
