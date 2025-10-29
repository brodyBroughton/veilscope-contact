// app/api/contact/route.js

import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // ensures this route is always treated dynamically (no caching)

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: "Email and message are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "Website Contact"}" <${process.env.FROM_EMAIL}>`,
      to: process.env.SUPPORT_TO,
      subject: `New contact form submission: ${topic || "General"} from ${name || "Anonymous"}`,
      replyTo: email,
      text: `Topic: ${topic || "General"}\n\nMessage:\n${message}`,
      html: `<p><strong>Topic:</strong> ${topic || "General"}</p><p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    return new Response(
      JSON.stringify({ ok: true, message: "Email sent" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
