import { useFormik } from "formik";
import { contactValidationSchemaClient } from "@/config/yup";
import debounce from "lodash/debounce";
import { sendContactForm } from "@/utilities/api";
import ConfirmationMessage from "./ConfirmationMessage";
import { useEffect, useMemo } from "react";

const errorFieldClasses = "ring-1 ring-red-500 focus:ring-red-500";
const errorMessageClasses =
  "absolute top-0 right-0 bg-red-500 px-2 py-0 text-xs text-white";

export default function ContactForm() {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    validateForm,
    dirty,
    isValid,
    status,
    isSubmitting,
  } = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: contactValidationSchemaClient,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: sendContactForm,
  });

  const debouncedValidate = useMemo(
    () => debounce(validateForm, 500),
    [validateForm]
  );

  useEffect(() => {
    debouncedValidate(values);
  }, [values, debouncedValidate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          className={errors.name && touched.name && errorFieldClasses}
        />
        {errors.name && touched.name && (
          <div className={errorMessageClasses}>{errors.name}</div>
        )}
      </div>

      <div className="relative">
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className={errors.email && touched.email && errorFieldClasses}
        />
        {errors.email && touched.email && (
          <div className={errorMessageClasses}>{errors.email}</div>
        )}
      </div>

      <div className="relative">
        <textarea
          id="message"
          name="message"
          placeholder="Message"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.message}
          className={errors.name && touched.message && errorFieldClasses}
        />
        {errors.message && touched.message && (
          <div className={errorMessageClasses}>{errors.message}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={!dirty || !isValid || isSubmitting}
        className="block w-full bg-myDark py-3 px-6 font-sans uppercase text-white duration-200 hover:bg-myLime hover:text-myDark disabled:cursor-not-allowed disabled:bg-myDark/50 disabled:text-white dark:bg-myLime dark:text-black dark:hover:bg-white dark:disabled:bg-myLime/50 dark:disabled:text-black"
      >
        Send{isSubmitting && "ing..."}
      </button>
      <ConfirmationMessage status={status} timeout={3000} />
    </form>
  );
}
