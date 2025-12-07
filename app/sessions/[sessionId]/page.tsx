"use client";

import { useState } from "react";

export default function SessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const { sessionId } = params;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Пример занятых мест — позже возьмём из БД
  const bookedSeats = ["1-3", "1-4", "2-5", "5-7"];

  // Раскладываем sessionId
  const [movieId, date, time] = sessionId.split("-");

  const rows = 8;
  const seatsPerRow = 10;

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return; // Нельзя выбирать занятые

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Бронирование сеанса
        </h1>

        <p className="mt-2 text-gray-700 dark:text-gray-300">
          <strong>Фильм ID:</strong> {movieId}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Дата:</strong> {date}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Время:</strong> {time}
        </p>

        {/* Схема зала */}
        <div className="mt-10 flex flex-col gap-4">
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {[...Array(seatsPerRow)].map((_, seatIndex) => {
                const seatId = `${rowIndex + 1}-${seatIndex + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    disabled={isBooked}
                    onClick={() => toggleSeat(seatId)}
                    className={`w-10 h-10 rounded-md transition-colors font-semibold
                      ${
                        isBooked
                          ? "bg-red-600 text-white cursor-not-allowed"
                          : isSelected
                          ? "bg-green-600 text-white"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      }
                    `}
                  >
                    {seatIndex + 1}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Выбранные места */}
        <div className="mt-6">
          <p className="text-gray-700 dark:text-gray-300">
            Выбранные места:{" "}
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "нет"}
          </p>

          <button
            className={`mt-3 px-6 py-3 rounded-xl text-white transition ${
              selectedSeats.length > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedSeats.length === 0}
          >
            Подтвердить выбор
          </button>
        </div>
      </div>
    </div>
  );
}
