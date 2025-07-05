import { Resend } from "resend";
import { render } from "@react-email/components";

import { VerificationEmail } from "@/components/emails/email-verification";
import { ForgotPasswordEmail } from "@/components/emails/forgot-password";
import { RESEND_DOMAIN, SITE_URL } from "./constants";

const from = `SiteOf <noreply@${RESEND_DOMAIN}>`;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationMail({ email, token }: { email: string; token: string }) {
  const url = `${SITE_URL}/activate?token=${token}`;
  const emailHtml = await render(VerificationEmail({ url }));

  return await resend.emails.send({
    from,
    to: email,
    subject: "Just one quick thing, verify your email",
    html: emailHtml,
  });
}

export async function sendForgotPasswordMail({ email, token }: { email: string; token: string }) {
  const url = `${SITE_URL}/reset-password?token=${token}`;
  const emailHtml = await render(ForgotPasswordEmail({ url }));

  return await resend.emails.send({
    from,
    to: email,
    subject: "Reset your password",
    html: emailHtml,
  });
}
