"use client";

export default function Button({ children, className = "", ...props }: any) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg
         font-semibold transition
         bg-[var(--brand-600)] text-white shadow-md hover:bg-[var(--brand-700)]
         focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]
         active:scale-[0.97]` + className
      }
    >
      {children}
    </button>
  );
}

