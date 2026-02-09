import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/send-email
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, movie, date, time, seats, total } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Cinema <tickets@yourdomain.com>",
      to: email,
      subject: "Your Ticked 🎬",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your e-Ticket</h2>

          <p><b>Фильм:</b> ${movie}</p>
          <p><b>Дата:</b> ${date}</p>
          <p><b>Время:</b> ${time}</p>
          <p><b>Места:</b> ${seats}</p>
          <p><b>Сумма:</b> ${total} €</p>

          <hr style="margin: 20px 0;" />

          <p>Thank you! Have a nice view! 🍿</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
