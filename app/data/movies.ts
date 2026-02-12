// app/data/movies.ts
export interface Movie {
  id: string;
  title: string;
  poster: string;
  sessions: Record<string, string[]>;
}

export const movies: Movie[] = [
  {
    id: "interstellar",
    title: "Interstellar",
    poster: "/posters/interstellar.jpg",
    sessions: {
      "2025-02-01": ["12:00", "15:00", "18:00"],
      "2025-02-02": ["13:00", "16:00", "19:00"],
    },
  },
  {
    id: "inception",
    title: "Inception",
    poster: "/posters/inception.jpg",
    sessions: {
      "2025-02-01": ["12:30", "15:30", "18:30"],
      "2025-02-02": ["13:30", "16:30", "19:30"],
    },
  },
  {
    id: "tenet",
    title: "Tenet",
    poster: "/posters/tenet.jpg",
    sessions: {
      "2025-02-01": ["14:00", "17:00", "20:00"],
      "2025-02-02": ["15:00", "18:00", "21:00"],
    },
  },
];
