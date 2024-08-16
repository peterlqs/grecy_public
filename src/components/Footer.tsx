"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-center absolute bottom-0">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Made with 🍚 by{" "}
        <Link
          href="https://twitter.com/nplongquan"
          className="text-xs hover:underline underline-offset-4 text-primary"
        >
          Quan (Peter) Nguyen
        </Link>
      </p>
    </footer>
  );
}
