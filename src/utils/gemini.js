export const generateExpenseFromText = async (text) => {
  const response = await fetch("/api/parse-expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const responseText = await response.text();

  let data = {};

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("Invalid JSON response:", responseText);
      throw new Error("Server returned an invalid response");
    }
  }

  if (!response.ok) {
    throw new Error(
      data.error || `Request failed with status ${response.status}`
    );
  }

  if (!data.money || !data.category || !data.date) {
    throw new Error("AI returned incomplete expense data");
  }

  return data;
};