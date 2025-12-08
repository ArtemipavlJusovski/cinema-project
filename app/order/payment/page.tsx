"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [method, setMethod] = useState("");

  const movie = params.get("movie");
  const date = params.get("date");
  const time = params.get("time");
  const seats = params.get("seats");
  const total = params.get("total");

  function continueToConfirm() {
    if (!method) {
      alert("Выберите способ оплаты!");
      return;
    }

    router.push(
      `/order/confirm?movie=${movie}&date=${date}&time=${time}&seats=${seats}&total=${total}&method=${method}`
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Выберите способ оплаты</h1>

      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-lg space-y-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="card"
            onChange={(e) => setMethod(e.target.value)}
          />
          💳 Банковская карта
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="paypal"
            onChange={(e) => setMethod(e.target.value)}
          />
          🅿 PayPal
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="apple"
            onChange={(e) => setMethod(e.target.value)}
          />
          🍏 Apple Pay
        </label>

        <button
          onClick={continueToConfirm}
          className="mt-6 w-full py-4 bg-green-600 hover:bg-green-700 rounded-xl text-xl"
        >
          Далее →
        </button>
      </div>
    </div>
  );
}
