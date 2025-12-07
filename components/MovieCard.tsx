import React from "react";
import Link from "next/link";

type MovieCardProps = {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
};

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  description,
  posterUrl,
}) => {
  return (
    <Link href={`/movies/${id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 cursor-pointer hover:scale-105 transition-transform">
        <img className="w-full h-64 object-cover" src={posterUrl} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
            {title}
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
