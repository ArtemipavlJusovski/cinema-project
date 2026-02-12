"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabase";

interface Props {
  movieId: string;
}

export default function AddSession({ movieId }: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { data, error } = await supabase.from("sessions").insert({
      movie_id: movieId,
      date,
      time,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setDate("");
      setTime("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-5 max-w-sm">
      <h2 className="text-xl font-bold">Добавить сеанс</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 rounded text-black"
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-2 rounded text-black"
        required
      />
      <button
        type="submit"
        className="bg-green-600 p-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Добавляем..." : "Добавить сеанс"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Сеанс добавлен!</p>}
    </form>
  );
}
