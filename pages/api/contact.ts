// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mailOptions, transporter } from "@/config/nodemailer";
import { contactValidationSchemaServer } from "@/config/yup";
import { generateEmailContent } from "@/utilities/generators";
import type { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";

export default async function contactFormHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Bad request 💩" });

  const formData = req.body;

  try {
    // Validate form data with Yup, will throw error if not valid
    await contactValidationSchemaServer.validate(formData);
    console.log(formData);

    // Send email with NodeMailer https://nodemailer.com/
    await transporter.sendMail({
      ...mailOptions,
      replyTo: formData.email,
      subject: "Message from kubasobecki.pl",
      ...generateEmailContent(formData),
    });

    // Send success response
    res.status(200).json({ message: "Message sent successfully ;-)" });
  } catch (error: any) {
    if (error.name === "ValidationError")
      res.status(406).json({ message: "Failed to send, check your inputs" });
    else if (error.responseCode === 535)
      res.status(503).json({ message: "Failed to send, try again later" });
    else res.status(400).json({ message: "Bad request" });
  }
}
