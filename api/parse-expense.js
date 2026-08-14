import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { text } = request.body;

    if (!text || !text.trim()) {
      return response.status(400).json({
        error: "Expense text is required",
      });
    }

    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

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
- "today" means the current date.
- "yesterday" means one day before the current date.
- "tomorrow" means one day after the current date.
- Do not return markdown.
- Do not return any explanation.
`;

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API error:", data);

      if (geminiResponse.status === 429) {
        return response.status(429).json({
          error: "AI limit reached. Please try again later.",
        });
      }

      return response.status(geminiResponse.status).json({
        error:
          data?.error?.message || "Gemini API request failed",
      });
    }

    const textOutput =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textOutput) {
      throw new Error("Gemini returned no text");
    }

    const cleanText = textOutput
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanText);

    return response.status(200).json(result);
  } catch (error) {
    console.error("Server error:", error);

    return response.status(500).json({
      error: "Failed to process expense",
    });
  }
}