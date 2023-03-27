export const sendContactForm = async (
  values,
  { setSubmitting, resetForm, setStatus }
) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(values),
  };

  setSubmitting(true);
  const res = await fetch("/api/contact", options);
  // Errors are handled server-side
  const resData = await res.json();
  setSubmitting(false);
  if (res.ok) resetForm();
  setStatus({ ok: res.ok, message: resData.message });
};

export const fetchProjects = async () => {
  try {
    const res = await fetch("/api/projects");
    if (!res.ok) throw new Error("An error occurred, could not get projects");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
