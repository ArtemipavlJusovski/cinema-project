// app/admin/movies/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase"; // путь к твоему supabase.ts

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
}

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("movies")
        .select("*")
        .order("title", { ascending: true });

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setMovies(data || []);
      setLoading(false);
    }

    fetchMovies();
  }, []);

  if (loading) return <div className="p-10 text-white">Загрузка...</div>;
  if (error) return <div className="p-10 text-red-500">Ошибка: {error}</div>;
  if (movies.length === 0)
    return <div className="p-10 text-white">Фильмы не найдены</div>;

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-5">Список фильмов</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/admin/movies/${movie.id}`}>
            <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer">
              <img
                src={movie.poster}
                alt={movie.title}
                className="rounded-lg mb-3 w-full h-64 object-cover"
              />
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-400">Жанр: {movie.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
