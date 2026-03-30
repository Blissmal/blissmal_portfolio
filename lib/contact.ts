"use server"

import { resend } from "@/lib/resend"

export async function sendContactEmail(formData: FormData) {
  const name = (formData.get("firstname") || "") + " " + (formData.get("lastname") || "");
  const email = formData.get("email-address") as string;
  const phone = formData.get("phone-number") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`, // Replace with your verified domain in production
      to: "malutibethuel@gmail.com",
      subject: `New contact form submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}