// app/admin/movies/[id]/add-session.tsx
"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabase";

interface Props {
  movieId: string;
  onSessionAdded: () => void;
}

export default function AddSession({ movieId, onSessionAdded }: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("sessions").insert([
      {
        movie_id: movieId,
        date,
        time,
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      setDate("");
      setTime("");
      onSessionAdded(); // вызываем обновление списка сеансов
    }

    setLoading(false);
  }

  return (
    <div className="mb-5">
      <h3 className="text-xl font-semibold mb-2">Добавить сеанс</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded p-1 mr-2"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border rounded p-1 mr-2"
      />
      <button
        onClick={handleAdd}
        disabled={loading || !date || !time}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        {loading ? "Добавляем..." : "Добавить"}
      </button>
    </div>
  );
}
