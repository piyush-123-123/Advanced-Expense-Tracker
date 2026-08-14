export const generateExpenseFromText = async (text) => {
  const response = await fetch("/api/parse-expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate expense");
  }

  return data;
};