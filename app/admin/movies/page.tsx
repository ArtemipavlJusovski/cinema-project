const movies = [
  { id: "1", title: "Интерстеллар" },
  { id: "2", title: "Начало" },
  { id: "3", title: "Джокер" },
];

export default function AdminMoviesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🎥 Фильмы</h1>

      <button className="mb-6 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700">
        + Добавить фильм
      </button>

      <div className="space-y-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
          >
            <span>{movie.title}</span>

            <div className="space-x-3">
              <button className="px-3 py-1 bg-blue-600 rounded">Edit</button>
              <button className="px-3 py-1 bg-red-600 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
