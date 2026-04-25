import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { question, context } = await req.json();

    console.log("=== QUESTION ===", question);
    console.log("=== CONTEXT ===", context?.slice(0, 200));

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2, // 🔹 more consistent output
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant that answers questions strictly based on the provided document.

Rules:
- Only use the document content
- Do NOT make up information
- If the answer is not present, say: "The document does not contain this information"
- Keep answers clear and structured
- Avoid repetition
          `,
        },
        {
          role: "user",
          content: `
DOCUMENT:
${context}

QUESTION:
${question}

Respond in this format:
- Short summary (2-3 lines)
- Key points (bullet points)
          `,
        },
      ],
    });

    return NextResponse.json({
      answer: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Chat failed" });
  }
}
