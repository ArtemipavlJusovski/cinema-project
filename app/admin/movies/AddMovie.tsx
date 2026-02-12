"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("movies")
      .insert([{ title, poster, genre }]);

    if (error) {
      setMessage(`Ошибка: ${error.message}`);
    } else {
      setMessage("Фильм добавлен!");
      setTitle("");
      setPoster("");
      setGenre("");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 text-white bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Добавить новый фильм</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Название фильма"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          placeholder="Ссылка на постер"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          placeholder="Жанр"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 p-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? "Сохраняем..." : "Добавить фильм"}
        </button>
      </form>
      {message && <p className="mt-3 text-green-400">{message}</p>}
    </div>
  );
}
