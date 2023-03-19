export const sendContactForm = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch("/api/contact", options);

  const resData = await res.json();

  console.log(resData);

  return resData;
};
