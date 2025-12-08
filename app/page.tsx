import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center text-center p-8">
      <div className="absolute inset-0">
        <img
          src="/posters/cinema-background.jpg"
          alt="Cinema Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Добро пожаловать в наш кинотеатр!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Выбирайте фильмы, сеансы и бронируйте места онлайн
        </p>
        <Link
          href="/movies"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xl"
        >
          Смотреть фильмы
        </Link>
      </div>
    </div>
  );
}
