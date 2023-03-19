import { Formik, Field, Form, ErrorMessage } from "formik";
import { contactValidationClient } from "@/config/yup";
import { sendContactForm } from "@/utilities/api";

const errorFieldClasses = "ring-1 ring-red-500 focus:ring-red-500";

export default function ContactForm() {
  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validationSchema={contactValidationClient}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await sendContactForm(values);
        setSubmitting(false);
      }}
    >
      {({ dirty, touched, isValid, errors, isSubmitting }) => {
        return (
          <Form className="mx-auto">
            <div className="relative">
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className={errors.name && touched.name && errorFieldClasses}
              />
              <ErrorMessage
                component="div"
                name="name"
                className="absolute top-0 right-0 bg-red-500 px-2 py-0 text-xs text-white"
              />
            </div>

            <div className="relative">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={errors.email && touched.email && errorFieldClasses}
              />
              <ErrorMessage
                component="div"
                name="email"
                className="absolute top-0 right-0 bg-red-500 px-2 py-0 text-xs text-white"
              />
            </div>

            <div className="relative">
              <Field
                name="message"
                as="textarea"
                placeholder="Message"
                className={
                  errors.message && touched.message && errorFieldClasses
                }
              />
              <ErrorMessage
                component="div"
                name="message"
                className="absolute top-0 right-0 bg-red-500 px-2 py-0 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              disabled={!dirty || !isValid || isSubmitting}
              className="block w-full bg-myDark py-3 px-6 font-sans uppercase text-white duration-200 hover:bg-myLime hover:text-myDark disabled:cursor-not-allowed disabled:bg-myDark/50 disabled:text-white"
            >
              Send{isSubmitting && "ing..."}
            </button>
            {/* {console.log(isSubmitting)} */}
            {/* {console.log(errors)} */}
            {/* {console.log(dirty)} */}
            {/* {console.log(touched)} */}
          </Form>
        );
      }}
    </Formik>
  );
}
