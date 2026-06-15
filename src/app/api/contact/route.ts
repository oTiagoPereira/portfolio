import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "re_...") return null;
  return new Resend(key);
}

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Contact validation failed:", parsed.error.flatten(), "body:", body);
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const resend = getResend();
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resend || !contactEmail) {
      console.error("Resend API key or CONTACT_EMAIL is missing/invalid");
      return NextResponse.json(
        { error: "Configuração de e-mail incompleta" },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      subject: `Novo contato: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #eeeeee; border-radius: 8px;">
          <h2 style="color: #333333; border-bottom: 2px solid #ff5600; padding-bottom: 10px;">Nova mensagem do Portfólio</h2>

          <div style="margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>Nome:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>E-mail:</strong> <a href="mailto:${email}" style="color: #ff5600; text-decoration: none;">${email}</a></p>
          </div>

          <div style="margin-top: 25px; background-color: #ffffff; padding: 15px; border-radius: 6px; border-left: 4px solid #ff5600;">
            <p style="margin: 0; white-space: pre-wrap; color: #555555; line-height: 1.6;">${message}</p>
          </div>

          <div style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center;">
            <p>Este e-mail foi enviado automaticamente através do formulário de contato do seu portfólio.</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erro ao enviar e-mail" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Internal server error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
