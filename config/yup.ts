import * as Yup from "yup";

export const contactValidationSchemaClient = Yup.object({
  name: Yup.string()
    .required("Enter your name")
    .max(32, "Must be 32 characters or less"),
  email: Yup.string()
    .required("Enter your email")
    // .email("Invalid email address") // this does poor job hence regex
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    )
    .max(64, "Must be 64 characters or less"),
  message: Yup.string()
    .required("Enter your message")
    .min(4, "Must be 4 characters or more")
    .max(1000, "Must be 1000 characters or less"),
  recaptcha: Yup.string().required(),
});

export const contactValidationSchemaServer = Yup.object({
  name: Yup.string().required().max(32),
  email: Yup.string()
    .required()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .max(64),
  message: Yup.string().required().min(4).max(1000),
  recaptcha: Yup.string().required(),
});
