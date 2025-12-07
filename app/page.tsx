import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Фоновое изображение */}
      <img
        src="/posters/main-bg.jpg"
        alt="Cinema background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Тёмное затемнение */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">
          Добро пожаловать в CinemaX
        </h1>

        <p className="mt-6 text-xl md:text-2xl max-w-2xl opacity-90">
          Лучшие фильмы, удобное расписание, быстрый выбор мест. Начните
          путешествие в мир кино прямо сейчас!
        </p>

        <Link
          href="/movies"
          className="mt-10 px-8 py-4 bg-red-600 hover:bg-red-700 transition text-xl rounded-xl shadow-xl"
        >
          Перейти к фильмам
        </Link>
      </div>
    </div>
  );
}
