"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlignRight } from "lucide-react";
import { defaultLinks } from "@/config/nav";
import { ModeToggle } from "./ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute top-0 w-full px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center gap-1" href="#">
        <img src="/logo.svg" alt="Greci" width={40} height={40} />
        <h1 className="font-semibold text-xl text-primary">GroceryOut</h1>
      </Link>

      {/* Mobile Menu Button */}
      <div className="ml-auto lg:hidden flex items-center">
        <ModeToggle />
        <Button variant={"ghost"} onClick={() => setOpen(!open)}>
          <AlignRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Desktop Navigation (hidden on mobile) */}
      <nav className="hidden lg:ml-auto lg:flex gap-4 sm:gap-6 items-center">
        <ModeToggle />

        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            pathname === "/" ? "text-primary" : ""
          }`}
          href="/"
        >
          Home
        </Link>

        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            pathname === "/compare" ? "text-primary" : ""
          }`}
          href="/compare"
        >
          Compare
        </Link>
        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            pathname === "/feedback" ? "text-primary" : ""
          }`}
          href="https://docs.google.com/forms/d/e/1FAIpQLSeGLbn3m5hmEwinE-zAnixpMoDaMUMX3uU_r98OULQPZuWRqQ/viewform?usp=sf_link"
        >
          Feedback
        </Link>
      </nav>

      {/* Mobile Navigation (shown when open is true) */}
      {open && (
        <nav className="absolute top-14 left-0 w-full bg-muted p-4 shadow-md">
          <Link
            className={`text-lg font-medium hover:underline underline-offset-4 block mb-2 ${
              pathname === "/" ? "text-primary" : ""
            }`}
            href="/"
          >
            Home
          </Link>

          <Link
            className={`text-lg font-medium hover:underline underline-offset-4 block mb-2 ${
              pathname === "/compare" ? "text-primary" : ""
            }`}
            href="/compare"
          >
            Compare
          </Link>
          <Link
            className={`text-lg font-medium hover:underline underline-offset-4 block mb-2 ${
              pathname === "/feedback" ? "text-primary" : ""
            }`}
            href="https://docs.google.com/forms/d/e/1FAIpQLSeGLbn3m5hmEwinE-zAnixpMoDaMUMX3uU_r98OULQPZuWRqQ/viewform?usp=sf_link"
          >
            Feedback
          </Link>
        </nav>
      )}
    </header>
  );
}
