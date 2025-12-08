import React from "react";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

const movies = [
  {
    id: "1",
    title: "Интерстеллар",
    description: "Фантастический фильм о путешествиях в космосе.",
    posterUrl: "/posters/interstellar.jpg",
  },
  {
    id: "2",
    title: "Начало",
    description: "Фильм о сновидениях и манипуляции сознанием.",
    posterUrl: "/posters/inception.jpg",
  },
  {
    id: "3",
    title: "Джокер",
    description: "История становления легендарного злодея.",
    posterUrl: "/posters/joker.jpg",
  },
];

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Фильмы
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              description={movie.description}
              posterUrl={movie.posterUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
