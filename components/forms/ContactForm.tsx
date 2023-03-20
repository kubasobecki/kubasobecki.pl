import { Formik, Field, Form, ErrorMessage } from "formik";
import { contactValidationSchemaClient } from "@/config/yup";
import debounce from "lodash/debounce";
import { sendContactForm } from "@/utilities/api";
import ConfirmationMessage from "./ConfirmationMessage";
import { useEffect, useMemo, useRef } from "react";

const errorFieldClasses = "ring-1 ring-red-500 focus:ring-red-500";
const errorMessageClasses =
  "absolute top-0 right-0 bg-red-500 px-2 py-0 text-xs text-white";

export default function ContactForm() {
  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validationSchema={contactValidationSchemaClient}
      validateOnMount={true}
      validateOnChange={false}
      onSubmit={sendContactForm}
    >
      {({
        dirty,
        touched,
        isValid,
        errors,
        isSubmitting,
        status,
        validateField,
      }) => {
        return (
          <Form>
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
                className={errorMessageClasses}
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
                className={errorMessageClasses}
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
                className={errorMessageClasses}
              />
            </div>

            <button
              type="submit"
              disabled={!dirty || !isValid || isSubmitting}
              className="block w-full bg-myDark py-3 px-6 font-sans uppercase text-white duration-200 hover:bg-myLime hover:text-myDark disabled:cursor-not-allowed disabled:bg-myDark/50 disabled:text-white dark:bg-myLime dark:text-black dark:hover:bg-white dark:disabled:bg-myLime/50 dark:disabled:text-black"
            >
              Send{isSubmitting && "ing..."}
            </button>
            <ConfirmationMessage status={status} timeout={3000} />
          </Form>
        );
      }}
    </Formik>
  );
}
