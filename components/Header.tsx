"use client";

import { useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur z-50 flex items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-red-500">
          Apollo Cinema
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl hover:text-red-500"
        >
          ☰
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
