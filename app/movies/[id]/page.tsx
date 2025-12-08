import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";

const movies = [
  {
    id: "1",
    title: "Интерстеллар",
    description: "Фантастический фильм о путешествиях в космосе.",
    posterUrl: "/posters/interstellar.jpg",
    sessions: [
      { date: "2025-02-01", times: ["12:00", "16:00", "20:00"] },
      { date: "2025-02-02", times: ["10:00", "14:00", "18:30"] },
    ],
  },
  {
    id: "2",
    title: "Начало",
    description: "Фильм о сновидениях и манипуляции сознанием.",
    posterUrl: "/posters/inception.jpg",
    sessions: [
      { date: "2025-02-01", times: ["11:00", "15:00", "19:00"] },
      { date: "2025-02-03", times: ["13:30", "17:30", "21:00"] },
    ],
  },
  {
    id: "3",
    title: "Джокер",
    description: "История становления легендарного злодея.",
    posterUrl: "/posters/joker.jpg",
    sessions: [
      { date: "2025-02-02", times: ["12:15", "17:00", "22:00"] },
      { date: "2025-02-05", times: ["14:00", "20:00"] },
    ],
  },
];

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = movies.find((m) => m.id === id);
  if (!movie) return notFound();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <img
          className="w-full h-96 object-cover rounded-lg mb-6"
          src={movie.posterUrl}
          alt={movie.title}
        />

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {movie.title}
        </h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          {movie.description}
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Расписание сеансов
          </h2>

          <div className="space-y-6">
            {movie.sessions.map((session) => (
              <div key={session.date}>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  📅 {new Date(session.date).toLocaleDateString("ru-RU")}
                </h3>

                <div className="flex flex-wrap gap-3 mt-2">
                  {session.times.map((time) => {
                    const sessionId = `${movie.id}-${session.date}-${time}`;
                    return (
                      <Link
                        key={time}
                        href={`/movies/${movie.id}/sessions/${sessionId}`}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        {time}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
