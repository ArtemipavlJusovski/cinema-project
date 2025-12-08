"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function SuccessPage() {
  const params = useSearchParams();

  const movieId = params.get("movie");
  const date = params.get("date");
  const time = params.get("time");
  const seats = params.get("seats");
  const total = params.get("total");
  const sessionId = params.get("session");

  const [email, setEmail] = useState("");

  // ============================================
  // 1) Генерация PDF билета
  // ============================================
  async function generatePDF() {
    const ticket = document.getElementById("pdf-ticket");
    if (!ticket) return;

    const canvas = await html2canvas(ticket);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [600, 800],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 600, 800);
    pdf.save("ticket.pdf");
  }

  // ============================================
  // 2) Отправка билета на email
  // ============================================
  async function sendEmail() {
    if (!email) {
      alert("Введите email!");
      return;
    }

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        movieId,
        date,
        time,
        seats,
        total,
      }),
    });

    if (res.ok) {
      alert("Билет отправлен на email!");
      setEmail("");
    } else {
      alert("Ошибка при отправке письма.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <div className="max-w-lg w-full bg-zinc-900 p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-green-400 drop-shadow-lg">
          Покупка успешна! 🎉
        </h1>

        <p className="text-lg mb-2">
          <b>Фильм:</b> {movieId}
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
        <p className="text-lg mb-6">
          <b>Сумма:</b> {total} €
        </p>

        <div className="flex justify-center mb-8">
          <QRCode
            value={`ticket-${sessionId}-${seats}`}
            size={160}
            bgColor="#ffffff"
          />
        </div>

        {/* КНОПКА PDF */}
        <button
          onClick={generatePDF}
          className="px-8 py-4 text-xl rounded-xl bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(0,120,255,0.8)] transition w-full mb-6"
        >
          Скачать PDF 🎫
        </button>

        {/* EMAIL */}
        <div className="flex flex-col gap-4 mt-6">
          <input
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl text-black"
          />

          <button
            onClick={sendEmail}
            className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 shadow-lg transition"
          >
            Отправить билет на Email ✉️
          </button>
        </div>
      </div>

      {/* СКРЫТЫЙ БИЛЕТ ДЛЯ PDF */}
      <div id="pdf-ticket" className="hidden">
        <div className="p-8 bg-white text-black rounded-xl w-[600px]">
          <h2 className="text-2xl font-bold mb-4">Ваш билет</h2>

          <p>
            <b>Фильм:</b> {movieId}
          </p>
          <p>
            <b>Дата:</b> {date}
          </p>
          <p>
            <b>Время:</b> {time}
          </p>
          <p>
            <b>Места:</b> {seats}
          </p>
          <p>
            <b>Цена:</b> {total} €
          </p>

          <div className="mt-6 bg-white p-2 inline-block">
            <QRCode
              value={`ticket-${sessionId}-${seats}`}
              size={140}
              bgColor="#ffffff"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
