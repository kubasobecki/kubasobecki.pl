// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mailOptions, transporter } from "@/config/nodemailer";
import { contactValidationServer } from "@/config/yup";
import { generateEmailContent } from "@/utilities/generators";

export default async function contactFormHandler(req, res) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Bad request 💩" });

  const formData = req.body;

  try {
    // Validate form data with Yup, will throw error if not valid
    await contactValidationServer.validate(formData);

    // Send email with NodeMailer https://nodemailer.com/
    await transporter.sendMail({
      ...mailOptions,
      subject: "Message from kubasobecki.pl",
      ...generateEmailContent(formData),
    });

    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    // Send error response
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: "Form validation failed. Check your inputs",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Message could not be sent. Try again later.",
      });
    }
  }
}
