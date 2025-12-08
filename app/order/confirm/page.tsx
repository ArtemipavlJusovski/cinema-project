"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();

  const movie = params.get("movie");
  const date = params.get("date");
  const time = params.get("time");
  const seats = params.get("seats");
  const total = params.get("total");
  const method = params.get("method");

  function pay() {
    const sessionId = Date.now(); // фейковый ID транзакции

    router.push(
      `/order/success?movie=${movie}&date=${date}&time=${time}&seats=${seats}&total=${total}&method=${method}&session=${sessionId}`
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <div className="bg-zinc-900 p-8 rounded-2xl max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Подтверждение заказа
        </h1>

        <p className="text-lg mb-2">
          <b>Фильм:</b> {movie}
        </p>
        <p className="text-lg mb-2">
          <b>Дата:</b> {date}
        </p>
        <p className="text-lg mb-2">
          <b>Время:</b> {time}
        </p>
        <p className="text-lg mb-2">
          <b>Места:</b> {seats}
        </p>
        <p className="text-lg mb-2">
          <b>Цена:</b> {total} €
        </p>
        <p className="text-lg mb-6">
          <b>Оплата:</b> {method}
        </p>

        <button
          onClick={pay}
          className="mt-4 w-full py-4 bg-green-600 hover:bg-green-700 rounded-xl text-xl"
        >
          Оплатить →
        </button>
      </div>
    </div>
  );
}
