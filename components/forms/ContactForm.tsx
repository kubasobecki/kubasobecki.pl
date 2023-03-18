import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

interface Values {
  name: string;
  email: string;
  message: string;
}

const formValidationSchema = Yup.object({
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
});

const errorFieldClasses = "ring-1 ring-red-500 focus:ring-red-500";

const ErrorMessage = ({ touched, message }) =>
  touched &&
  message && (
    <div className="absolute top-0 right-0 bg-red-500 px-2 py-0 text-xs text-white">
      {message}
    </div>
  );

export default function ContactForm() {
  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      // validateOnChange={false}
      validationSchema={formValidationSchema}
      onSubmit={async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ dirty, isValid, isSubmitting, errors, touched, values }) => {
        return (
          <Form className="mx-auto">
            <div className="relative">
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className={errors.name && touched.name && errorFieldClasses}
              />
              <ErrorMessage message={errors.name} touched={touched.name} />
            </div>

            <div className="relative">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={errors.email && touched.email && errorFieldClasses}
              />
              <ErrorMessage message={errors.email} touched={touched.email} />
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
                message={errors.message}
                touched={touched.message}
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

            {JSON.stringify(values)}
          </Form>
        );
      }}
    </Formik>
  );
}
