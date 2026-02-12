// app/admin/movies/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import AddSession from "./add-session"; // корректный путь

interface Session {
  id: string;
  movie_id: string;
  date: string;
  time: string;
}

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  sessions: Session[];
}

interface Props {
  params: { id: string };
}

export default function AdminMovieDetail({ params }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Вынесли функцию наружу
  async function fetchMovie() {
    setLoading(true);
    setError(null);

    const { data: movieData, error: movieError } = await supabase
      .from("movies")
      .select("*")
      .eq("id", params.id)
      .single();

    if (movieError) {
      setError(movieError.message);
      setLoading(false);
      return;
    }

    const { data: sessionsData, error: sessionsError } = await supabase
      .from("sessions")
      .select("*")
      .eq("movie_id", params.id)
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (sessionsError) {
      setError(sessionsError.message);
      setLoading(false);
      return;
    }

    setMovie({
      ...movieData,
      sessions: sessionsData || [],
    });

    setLoading(false);
  }

  useEffect(() => {
    fetchMovie();
  }, [params.id]);

  if (loading) return <div className="p-10 text-white">Загрузка...</div>;
  if (error) return <div className="p-10 text-red-500">Ошибка: {error}</div>;
  if (!movie) return <div className="p-10 text-white">Фильм не найден</div>;

  const sessionsByDate = movie.sessions.reduce(
    (acc: Record<string, string[]>, session) => {
      if (!acc[session.date]) acc[session.date] = [];
      acc[session.date].push(session.time);
      return acc;
    },
    {}
  );

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-5">{movie.title}</h1>
      <img
        src={movie.poster}
        alt={movie.title}
        className="rounded-lg mb-5 w-64"
      />
      <h2 className="text-2xl mb-3">Жанр: {movie.genre}</h2>

      {/* Добавление нового сеанса */}
      <AddSession movieId={movie.id} onSessionAdded={fetchMovie} />

      <h2 className="text-2xl mb-3">Сеансы</h2>
      <ul>
        {Object.entries(sessionsByDate).map(([date, times]) => (
          <li key={date}>
            <strong>{date}</strong>: {times.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
