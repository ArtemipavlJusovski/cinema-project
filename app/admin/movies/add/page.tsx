"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabase";

export default function AddMoviePage() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { data, error } = await supabase.from("movies").insert({
      title,
      poster,
      genre,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTitle("");
      setPoster("");
      setGenre("");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-5">Добавить новый фильм</h1>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-3">
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="URL постера"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          className="p-2 rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="Жанр"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Добавляем..." : "Добавить фильм"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Фильм добавлен!</p>}
      </form>
    </div>
  );
}
