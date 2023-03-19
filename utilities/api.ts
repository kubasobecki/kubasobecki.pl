export const sendContactForm = async (
  values,
  { setSubmitting, resetForm, setStatus }
) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(values),
  };

  try {
    setSubmitting(true);
    const res = await fetch("/api/contact", options);
    const resData = await res.json();
    setSubmitting(false);

    if (res.ok) resetForm();

    setStatus({
      ok: res.ok,
      message: resData.message,
    });
  } catch (error) {
    console.log(error.message);
  }
};
