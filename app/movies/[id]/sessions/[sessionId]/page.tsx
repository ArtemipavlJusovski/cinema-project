"use client";

import { use, useState } from "react";

interface SessionPageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = use(params);

  const [movieId, date, time] = sessionId.split("-");

  const rows = 8;
  const seatsPerRow = 12;

  const rowLetters = "ABCDEFGH".split("");

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const occupiedSeats = ["B-5", "B-6", "C-7", "D-4"]; // Пример (позже заменим на БД)

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return; // Нельзя выбирать занятые

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen p-10 flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-2">Выбор мест</h1>

      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        Фильм ID: <b>{movieId}</b> · Дата: <b>{date}</b> · Время: <b>{time}</b>
      </p>

      {/* Экран */}
      <div className="w-full max-w-4xl mb-10">
        <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-t-xl"></div>
        <p className="text-center text-sm mt-2 text-gray-500">Экран</p>
      </div>

      {/* Схема зала */}
      <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow-xl">
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const rowLetter = rowLetters[rowIndex];

            return (
              <div key={rowLetter} className="flex items-center gap-3">
                {/* Буква ряда */}
                <span className="w-6 text-center font-semibold">
                  {rowLetter}
                </span>

                {/* Места */}
                <div className="flex gap-2">
                  {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                    const seatId = `${rowLetter}-${seatIndex + 1}`;

                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        className={`
                          w-10 h-10 rounded
                          transition shadow
                          ${
                            isOccupied
                              ? "bg-red-500 cursor-not-allowed"
                              : isSelected
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-500"
                          }
                        `}
                      >
                        {seatIndex + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Буква ряда (справа) */}
                <span className="w-6 text-center font-semibold">
                  {rowLetter}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Легенда */}
      <div className="mt-10 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-400 dark:bg-gray-600 rounded"></div>
          Свободно
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-600 rounded"></div>
          Выбрано
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-500 rounded"></div>
          Занято
        </div>
      </div>

      {/* Подвал – выбор */}
      <div className="mt-10 p-6 bg-gray-800 rounded-xl text-white w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-3">Выбраны места:</h2>
        {selectedSeats.length === 0 ? (
          <p className="text-gray-300">Пока ничего не выбрано</p>
        ) : (
          <p className="font-bold">{selectedSeats.join(", ")}</p>
        )}
        {/* Кнопка подтверждения */}
        <button
          disabled={selectedSeats.length === 0}
          onClick={() => {
            const query = new URLSearchParams({
              sessionId,
              seats: selectedSeats.join(","),
            });

            window.location.href = `/order/confirm?${query.toString()}`;
          }}
          className={`
    mt-6 px-6 py-3 rounded-xl text-white text-lg font-semibold transition
    ${
      selectedSeats.length === 0
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}
