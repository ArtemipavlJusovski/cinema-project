"use client";

import { useState } from "react";

type Order = {
  id: string;
  movie: string;
  date: string;
  time: string;
  seats: string[];
  hall: string;
  total: number;
};

type Tab = "profile" | "orders" | "settings";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("Artem Jusovski");
  const [email, setEmail] = useState("artem@gmail.com");

  const orders: Order[] = [
    {
      id: "ORD-23891",
      movie: "Интерстеллар",
      date: "01.02.2025",
      time: "20:00",
      seats: ["A5", "A6"],
      hall: "Зал 3",
      total: 1200,
    },
    {
      id: "ORD-55219",
      movie: "Джокер",
      date: "05.02.2025",
      time: "18:30",
      seats: ["C3"],
      hall: "IMAX",
      total: 600,
    },
  ];

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-[280px_1fr] gap-8">
        {/* SIDEBAR */}
        <aside className="bg-zinc-900 rounded-2xl p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative group w-32 h-32 rounded-full overflow-hidden bg-zinc-800 mb-4">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                  Фото
                </div>
              )}

              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition text-sm">
                Изменить
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-zinc-400 text-sm">{email}</p>
          </div>

          <nav className="mt-8 space-y-2">
            <SidebarButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            >
              Профиль
            </SidebarButton>

            <SidebarButton
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            >
              Заказы
            </SidebarButton>

            <SidebarButton
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            >
              Настройки
            </SidebarButton>
          </nav>

          <button className="mt-8 w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700">
            Выйти
          </button>
        </aside>

        {/* CONTENT */}
        <main>
          {activeTab === "profile" && (
            <section>
              <h1 className="text-3xl font-bold mb-6">Мой профиль</h1>

              <div className="bg-zinc-900 rounded-xl p-6 space-y-4 max-w-xl">
                <div>
                  <label className="text-sm text-zinc-400">Имя</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full bg-zinc-800 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full bg-zinc-800 rounded-lg px-4 py-2"
                  />
                </div>

                <button className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-500">
                  Сохранить
                </button>
              </div>
            </section>
          )}

          {activeTab === "orders" && (
            <section>
              <h1 className="text-3xl font-bold mb-6">Мои билеты</h1>

              {orders.length === 0 ? (
                <div className="text-zinc-500">У вас пока нет покупок</div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-zinc-900 rounded-xl p-6 grid md:grid-cols-[1fr_auto] gap-4"
                    >
                      <div>
                        <h3 className="text-xl font-semibold">{order.movie}</h3>
                        <p className="text-zinc-400 text-sm">
                          {order.date} • {order.time} • {order.hall}
                        </p>
                        <p className="text-zinc-400 text-sm">
                          Места: {order.seats.join(", ")}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Заказ #{order.id}
                        </p>
                      </div>

                      <div className="text-right flex flex-col justify-between">
                        <p className="text-lg font-bold">{order.total} ₽</p>
                        <span className="inline-block text-sm px-3 py-1 rounded-full bg-green-600/20 text-green-400">
                          Оплачено
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === "settings" && (
            <section>
              <h1 className="text-3xl font-bold mb-6">Настройки</h1>

              <div className="bg-zinc-900 rounded-xl p-6 max-w-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span>Уведомления</span>
                  <input type="checkbox" defaultChecked />
                </div>

                <div className="flex justify-between items-center">
                  <span>Маркетинговые письма</span>
                  <input type="checkbox" />
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function SidebarButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg transition ${
        active ? "bg-red-600" : "hover:bg-zinc-800 text-zinc-300"
      }`}
    >
      {children}
    </button>
  );
}
