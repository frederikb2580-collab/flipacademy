import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export async function sendWelcomeEmail(to: string, name: string) {
  return getResend().emails.send({
    from: process.env.EMAIL_FROM ?? "FlipAcademy <noreply@flipacademy.dk>",
    to,
    subject: "Velkommen til FlipAcademy!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 16px;">
        <h1 style="font-size: 28px; margin-bottom: 16px;">Velkommen, ${name}!</h1>
        <p style="color: #a0a0a0; line-height: 1.6;">
          Tak fordi du har købt lifetime adgang til FlipAcademy.
          Du har nu fuld adgang til alle kurser og moduler.
        </p>
        <div style="margin: 32px 0;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard"
             style="background: linear-gradient(135deg, #7c3aed, #3b82f6); color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Gå til dit dashboard
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          Husk at forbinde din Discord for at få adgang til communityet.
        </p>
      </div>
    `,
  });
}

export async function sendOrderConfirmation(
  to: string,
  name: string,
  courseTitle: string,
  amount: number
) {
  return getResend().emails.send({
    from: process.env.EMAIL_FROM ?? "FlipAcademy <noreply@flipacademy.dk>",
    to,
    subject: `Ordrebekræftelse - ${courseTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 16px;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Ordrebekræftelse</h1>
        <p style="color: #a0a0a0;">Hej ${name}, tak for dit køb!</p>
        <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; margin: 24px 0;">
          <p style="margin: 0; color: #a0a0a0;">Kursus</p>
          <p style="margin: 4px 0 16px; font-size: 18px; font-weight: 600;">${courseTitle}</p>
          <p style="margin: 0; color: #a0a0a0;">Beløb</p>
          <p style="margin: 4px 0 0; font-size: 18px; font-weight: 600;">${amount} DKK</p>
        </div>
        <a href="${process.env.NEXTAUTH_URL}/dashboard"
           style="background: linear-gradient(135deg, #7c3aed, #3b82f6); color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Start dit kursus
        </a>
      </div>
    `,
  });
}
