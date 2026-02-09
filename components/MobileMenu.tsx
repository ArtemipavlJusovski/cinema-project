"use client";

import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <>
      {/* Затемнение фона */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      )}

      {/* Само меню */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-zinc-900 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Меню</h2>
            <button onClick={onClose} className="text-2xl hover:text-red-500">
              ✕
            </button>
          </div>

          {/* Навигация */}
          <nav className="flex flex-col gap-4 text-lg">
            <Link href="/" onClick={onClose} className="hover:text-red-500">
              🎬 Главная
            </Link>

            <Link
              href="/movies"
              onClick={onClose}
              className="hover:text-red-500"
            >
              🍿 Фильмы
            </Link>

            <Link
              href="/order"
              onClick={onClose}
              className="hover:text-red-500"
            >
              🛒 Корзина
            </Link>

            <Link
              href="/profile"
              onClick={onClose}
              className="hover:text-red-500"
            >
              👤 Профиль
            </Link>
          </nav>

          {/* Низ */}
          <div className="mt-auto text-sm text-zinc-400">
            © 2025 Apollo Cinema
          </div>
        </div>
      </div>
    </>
  );
}
