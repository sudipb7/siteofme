import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_SITE_URL;
const fronEmail = `mail@${process.env.NEXT_PUBLIC_RESEND_DOMAIN}`;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/activate?key=${token}`;

  await resend.emails.send({
    from: fronEmail,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`;

  await resend.emails.send({
    from: fronEmail,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};
