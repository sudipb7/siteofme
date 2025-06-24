import { Resend } from "resend";
import { SITE_URL } from "./constants";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = SITE_URL;
const fromEmail = `no-reply@${process.env.NEXT_PUBLIC_RESEND_DOMAIN}`;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/activate?key=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};
