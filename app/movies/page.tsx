import MovieCard from "@/components/MovieCard";

const movies = [
  {
    id: "1",
    title: "Интерстеллар",
    description: "Фантастический фильм о космосе.",
    posterUrl: "/posters/interstellar.jpg",
  },
  {
    id: "2",
    title: "Начало",
    description: "Фильм о сновидениях.",
    posterUrl: "/posters/inception.jpg",
  },
  {
    id: "3",
    title: "Джокер",
    description: "История становления злодея.",
    posterUrl: "/posters/joker.jpg",
  },
];

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">🎬 Сейчас в кино</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description}
            posterUrl={movie.posterUrl}
          />
        ))}
      </div>
    </div>
  );
}
