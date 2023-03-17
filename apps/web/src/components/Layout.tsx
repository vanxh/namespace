import clsx from "clsx";

import { manrope } from "@/lib/fonts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center min-h-screen w-[100vw] bg-gradient-to-b from-transparent via-purple-200/5 to-blue-300/7 bg-opacity-50",
        manrope.className
      )}
    >
      {children}
    </div>
  );
}
