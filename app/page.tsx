import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section
        className="h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/posters/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-6xl font-extrabold mb-6">
            Твой кинотеатр онлайн
          </h1>

          <p className="text-xl max-w-2xl text-gray-300">
            Лучшие фильмы, удобный выбор мест и быстрая оплата — всё в одном
            месте
          </p>

          <Link
            href="/movies"
            className="mt-10 px-10 py-4 bg-red-600 hover:bg-red-700 rounded-xl text-2xl font-bold transition"
          >
            Выбрать фильм
          </Link>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="py-20 px-8 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">
          Почему выбирают нас
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Feature
            title="🎟 Удобное бронирование"
            text="Выбирай места в один клик"
          />
          <Feature
            title="🍿 Как в кинотеатре"
            text="Реальный выбор рядов и мест"
          />
          <Feature
            title="⚡ Быстро и просто"
            text="Фейковая оплата без заморочек"
          />
        </div>
      </section>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-8 text-center hover:scale-105 transition">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}
