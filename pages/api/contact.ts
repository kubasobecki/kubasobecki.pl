// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mailOptions, transporter } from "@/config/nodemailer";
import { contactValidationSchemaServer } from "@/config/yup";
import { generateEmailContent } from "@/utilities/generators";

export default async function contactFormHandler(req, res) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Bad request 💩" });

  const formData = req.body;

  try {
    // Validate form data with Yup, will throw error if not valid
    await contactValidationSchemaServer.validate(formData);

    // Send email with NodeMailer https://nodemailer.com/
    await transporter.sendMail({
      ...mailOptions,
      replyTo: formData.email,
      subject: "Message from kubasobecki.pl",
      ...generateEmailContent(formData),
    });

    // Send success response
    res.status(200).json({ message: "Message sent successfully ;-)" });
  } catch (error) {
    if (error.inner) {
      res
        .status(400)
        .json({ message: "Form validation failed, check your inputs" });
    } else if ((error.responseCode = 535)) {
      res
        .status(400)
        .json({ message: "Failed to send message, try again later" });
    }
  }
}
