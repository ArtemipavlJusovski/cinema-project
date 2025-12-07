import { notFound } from "next/navigation";

const movies = [
  {
    id: "1",
    title: "Интерстеллар",
    posterUrl: "/posters/interstellar.jpg",
    sessions: [
      { date: "2025-02-01", times: ["12:00", "16:00", "20:00"] },
      { date: "2025-02-02", times: ["10:00", "14:00", "18:30"] },
    ],
  },
  {
    id: "2",
    title: "Начало",
    posterUrl: "/posters/inception.jpg",
    sessions: [
      { date: "2025-02-01", times: ["11:00", "15:00", "19:00"] },
      { date: "2025-02-03", times: ["13:30", "17:30", "21:00"] },
    ],
  },
  {
    id: "3",
    title: "Джокер",
    posterUrl: "/posters/joker.jpg",
    sessions: [
      { date: "2025-02-02", times: ["12:15", "17:00", "22:00"] },
      { date: "2025-02-05", times: ["14:00", "20:00"] },
    ],
  },
];

// ---------------------------------------------

export default function SessionPage({
  params,
}: {
  params: { id: string; sessionId: string };
}) {
  const movie = movies.find((m) => m.id === params.id);

  if (!movie) return notFound();

  // sessionId у нас выглядит так: "2025-02-01_16:00"
  const [date, time] = params.sessionId.split("_");

  const session = movie.sessions.find((s) => s.date === date);

  if (!session || !session.times.includes(time)) return notFound();

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {movie.title}
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          🎬 Сеанс: <b>{time}</b> <br />
          📅 Дата: <b>{new Date(date).toLocaleDateString("ru-RU")}</b>
        </p>

        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover rounded-lg my-6"
        />

        <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-bold mb-4">Выбор мест</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Здесь скоро появится интерактивный зал 🎫
          </p>
        </div>
      </div>
    </div>
  );
}
