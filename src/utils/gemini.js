import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const getTodayDate = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

export const generateExpenseFromText = async (text) => {
  const today = getTodayDate();

  const prompt = `
Convert this expense description into JSON.

Current date in India: ${today}

Expense:
"${text}"

Return ONLY valid JSON in exactly this format:

{
  "money": "",
  "description": "",
  "category": "",
  "date": ""
}

Rules:
- money must contain only the numeric amount.
- description should be a short description of the expense.
- category must be exactly one of: Food, Travel, Shopping, Bills.
- date must be in YYYY-MM-DD format.
- Use the Current date in India as the reference date.
- "today" means the Current date.
- "yesterday" means one day before the Current date.
- "tomorrow" means one day after the Current date.
- Do not return markdown.
- Do not return any explanation.
`;

  const response = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
  });

  return JSON.parse(response.output_text);
};