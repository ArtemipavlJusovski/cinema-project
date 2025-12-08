import React from "react";

interface MovieCardProps {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  description,
  posterUrl,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition">
      <img src={posterUrl} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
