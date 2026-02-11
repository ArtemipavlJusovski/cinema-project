import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-800 p-6 space-y-6">
        <h2 className="text-2xl font-bold">🎬 Admin</h2>

        <nav className="flex flex-col space-y-3">
          <Link href="/admin" className="hover:text-red-400">
            Dashboard
          </Link>
          <Link href="/admin/movies" className="hover:text-red-400">
            Фильмы
          </Link>
          <Link href="/admin/sessions" className="hover:text-red-400">
            Сеансы
          </Link>
          <Link href="/admin/orders" className="hover:text-red-400">
            Заказы
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
